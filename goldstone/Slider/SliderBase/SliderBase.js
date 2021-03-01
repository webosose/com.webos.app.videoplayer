import EnactPropTypes from '@enact/core/internal/prop-types';
import Changeable from '@enact/ui/Changeable';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import {KnobBase} from './Knob';
import PositionDecorator from './PositionDecorator';
import componentCss from './SliderBase.module.less';
import {calcProportion} from '../../util/calcProportion';
import classNames from 'classnames';
import generateClassNames from '../../util/generateClassNames';

const SliderBase = (props) => {
	const {
		backgroundProgress,
		css,
		disabled,
		orientation,
		noFill,
		pressed,
		progressBarComponent,
		progressAnchor,
		tooltipComponent,
		...rest
	} = props;
	delete rest.knobComponent;
	const calcPercentage = ({max, min, value = min}) => calcProportion(min, max, value);
	const calCulatedStyle = ({max, min, value = min}) => {
		let proportion = calcProportion(min, max, value);

		return {
			...rest.style,
			'--ui-slider-proportion-end-knob': proportion
		};
	};
	const appendedClassName = [componentCss.slider, generateClassNames(componentCss, {orientation, disabled, noFill, pressed}), generateClassNames(css, {orientation, disabled, noFill, pressed}), rest.className];
	delete rest.className;
	return (

		<div
			className={classNames(appendedClassName, componentCss.slider, css.slider)}
			style={calCulatedStyle(props)}
			disabled={disabled}
			{...rest}
		>

			<ComponentOverride
				className={classNames({[css.progressBar]: true, [componentCss.progressBar]: true})}
				backgroundProgress={backgroundProgress}
				component={progressBarComponent}
				orientation={orientation}
				progress={calcPercentage(props)}
				progressAnchor={progressAnchor}
			>
				<ComponentOverride
					className={classNames({[css.knob]: true, [componentCss.knob]: true})}
					component={KnobBase}
					disabled={disabled}
					orientation={orientation}
					proportion={calcPercentage(props)}
					tooltipComponent={tooltipComponent}
					value={props.value}
				/>
			</ComponentOverride>
		</div >
	);

};

SliderBase.propTypes = {
	progressBarComponent: EnactPropTypes.componentOverride.isRequired,
	backgroundProgress: PropTypes.number,
	css: PropTypes.object,
	disabled: PropTypes.bool,
	knobComponent: EnactPropTypes.componentOverride,
	max: PropTypes.number,
	min: PropTypes.number,
	noFill: PropTypes.bool,
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	pressed: PropTypes.bool,
	progressAnchor: PropTypes.number,
	step: PropTypes.number,
	tooltipComponent: EnactPropTypes.componentOverride,
	value: PropTypes.number

};
SliderBase.defaultProps = {
	disabled: false,
	knobComponent: KnobBase,
	min: 0,
	max: 100,
	noFill: false,
	orientation: 'horizontal',
	progressAnchor: 0,
	step: 1
};
const SliderDecorator = compose(
	Changeable,
	PositionDecorator,
	Touchable({activeProp: 'pressed'})
);
const Slider = SliderDecorator(SliderBase);

export default Slider;

export {
	KnobBase,
	Slider,
	SliderBase,
	SliderDecorator
};
