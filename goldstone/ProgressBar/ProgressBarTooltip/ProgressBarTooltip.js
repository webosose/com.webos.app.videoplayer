import {memoize} from '@enact/core/util';
import ilib from '@enact/i18n';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import NumFmt from 'ilib/lib/NumFmt';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../../TooltipDecorator/Tooltip';
import generateClassNames from '../../util/generateClassNames/generateClassNames';
import css from './ProgressBarTooltip.module.less';

const verticalPositions = ['before', 'after', 'left', 'right'];
const isVerticalModeRadial = (orientation, position) => orientation === 'radial' && verticalPositions.includes(position);
// prop-type validator that warns on invalid orientation + position
/* istanbul ignore next */
const validatePosition = (base) => (props, key, componentName, location, propFullName, ...rest) => {
	const {position} = props;
	let result = base(props, key, componentName, location, propFullName, ...rest);

	if (!result && position) {
		const orientation = props.orientation || 'horizontal';
		const hasVerticalValue = verticalPositions.includes(position);
		if (
			(orientation === 'vertical' && !hasVerticalValue) ||
			(orientation === 'horizontal' && hasVerticalValue)
		) {
			result = new Error(
				`'${key}' value '${position}' is not a valid value for the orientation '${orientation}'`
			);
		}
	}

	return result;
};

const memoizedPercentFormatter = memoize((/* locale */) => new NumFmt({
	type: 'percentage',
	useNative: false
}));

const getDefaultPosition = (orientation) => orientation === 'horizontal' ? 'above' : 'before';

// Returns an array of keywords with horizontal first and vertical second
const getSide = (orientation, position) => {
	position = position || getDefaultPosition(orientation);

	if (orientation === 'horizontal') {
		switch (position) {
			case 'above':
			case 'below':
				return ['auto', position];
			case 'above after':
			case 'above before':
			case 'above center':
			case 'above left':
			case 'above right':
			case 'below after':
			case 'below before':
			case 'below center':
			case 'below left':
			case 'below right':
				return position.split(' ').reverse();
			default:
				// invalid values for horizontal so use defaults
				return ['auto', 'above'];
		}
	} else if (orientation === 'vertical') {
		switch (position) {
			case 'after':
			case 'before':
			case 'left':
			case 'right':
				return [position, 'above'];
			default:
				// invalid values for horizontal so use defaults
				return ['before', 'auto'];
		}
	} else {
		switch (position) {
			case 'above':
			case 'below':
				return ['auto', position];
			case 'above after':
			case 'above before':
			case 'above center':
			case 'above left':
			case 'above right':
			case 'below after':
			case 'below before':
			case 'below center':
			case 'below left':
			case 'below right':
				return position.split(' ').reverse();
			case 'after':
			case 'before':
			case 'left':
			case 'right':
				return [position, 'above'];
			default:
				// invalid values for radial so use defaults
				return ['auto', 'above'];
		}
	}
};
const ProgressBarTooltipBase = (props) => {
	const childrens = ({children, proportion, percent}) => {
		if (percent) {
			const formatter = memoizedPercentFormatter(ilib.getLocale());

			return formatter.format(Math.round(proportion * 100));
		}

		return children;
	};
	const orientationClassNames = ({orientation, position, proportion}) => {
		const [h, v] = getSide(orientation, position);

		return generateClassNames(css, {
			orientation,

			above: (v === 'above' && !isVerticalModeRadial(orientation, position)),
			below: (v === 'below' && !isVerticalModeRadial(orientation, position)),
			before: (h === 'before'),
			after: (h === 'after'),
			center: (h === 'center'),
			left: (h === 'left' || (h === 'auto' && proportion <= 0.5)),
			right: (h === 'right' || (h === 'auto' && proportion > 0.5))
		}
		);
	};
	const arrowAnchor = ({orientation, position, rtl}) => {
		if (orientation === 'vertical' || isVerticalModeRadial(orientation, position)) return 'middle';

		const [h] = getSide(orientation, position);
		switch (h) {
			case 'auto':
				return 'center';
			case 'before':
				return rtl ? 'right' : 'left';
			case 'after':
				return rtl ? 'left' : 'right';
			case 'left':
			case 'right':
			case 'center':
				return h;
		}
	};
	const direction = ({orientation, position, rtl}) => {
		const [h, v] = getSide(orientation, position);

		let dir = 'right';
		if (orientation === 'vertical' || isVerticalModeRadial(orientation, position)) {
			if (
				// forced to the left
				h === 'left' ||
				// LTR before
				(!rtl && h === 'before') ||
				// RTL after
				(rtl && h === 'after')
			) {
				dir = 'left';
			}
		} else {
			dir = v !== 'below' ? 'above' : 'below';
		}
		return dir;
	};

	return (
		props.visible && <Tooltip
			style={{'--tooltip-progress-proportion': props.proportion}}
			className={classNames(css.tooltips, orientationClassNames(props))}
			arrowAnchor={arrowAnchor(props)}
			direction={direction(props)} css={css}
		>
			{childrens(props)}
		</Tooltip>
	);

};
const ProgressBarTooltip = React.memo(I18nContextDecorator(
	{rtlProp: 'rtl'},
	ProgressBarTooltipBase
));

ProgressBarTooltip.defaultSlot = 'tooltip';
ProgressBarTooltip.propTypes = {
	orientation: PropTypes.oneOf(['horizontal', 'vertical', 'radial']),
	position: validatePosition(PropTypes.oneOf([
		// horizontal or radial
		'above',
		'above before',
		'above left',
		'above center',
		'above after',
		'above right',
		'below',
		'below left',
		'below before',
		'below center',
		'below right',
		'below after',
		'left',
		'before',
		'right',
		'after'
	])),
	proportion: PropTypes.number,
	rtl: PropTypes.bool,
	visible: PropTypes.bool
};

ProgressBarTooltip.defaultProps = {
	orientation: 'horizontal',
	percent: false,
	proportion: 0,
	visible: false
};
export default ProgressBarTooltip;
export {
	ProgressBarTooltip,
	ProgressBarTooltipBase
};


