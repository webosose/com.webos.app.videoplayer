/**
 * A new basic progress bar component that can display the progress of something in a horizontal or
 * vertical bar format.
 *
 * A secondary independent progress indicator can be displayed, to indicate
 * an additional degree of information, often used as a background loading progress.
 *
 * @module ui/ProgressBar
 * @exports ProgressBar
 */
import clamp from 'ramda/src/clamp';
import PropTypes from 'prop-types';
import React from 'react';
import {validateRange} from '../../internal/validators';
import componentCss from './ProgressBarBase.module.less';
import generateClassNames from '../../util/generateClassNames/generateClassNames';
import classNames from 'classnames';

const progressToProportion = (value) => clamp(0, 1, value);
const calcBarStyle = (prop, anchor, value = anchor, startProp, endProp) => {
	let start = Math.min(anchor, value);
	let end = Math.max(anchor, value) - start;

	if (__DEV__) {
		validateRange(start, 0, 1, 'ProgressBar', prop, 'min', 'max');
		validateRange(end, 0, 1, 'ProgressBar', prop, 'min', 'max');
	}

	return {
		[startProp]: progressToProportion(start),
		[endProp]: progressToProportion(end)
	};
};
const ProgressBar = ({backgroundProgress, children, css, orientation, progress, progressAnchor, ...rest}) => {
	const appendedClassName = [componentCss.progressBar, generateClassNames(css, {orientation}), generateClassNames(componentCss, {orientation}), rest.className];
	delete rest.className;
	let styler = {
		...calcBarStyle(
			'backgroundProgress',
			progressAnchor,
			backgroundProgress,
			'--ui-progressbar-proportion-start-background',
			'--ui-progressbar-proportion-end-background'
		),
		...calcBarStyle(
			'progress',
			progressAnchor,
			progress,
			'--ui-progressbar-proportion-start',
			'--ui-progressbar-proportion-end'
		)
	};
	return (
		<div role="progressbar" className={classNames(appendedClassName)} style={styler} {...rest}>
			<div className={classNames({[css.bar]: true, [componentCss.bar]: true})} >
				<div className={classNames({[css.load]: true, [componentCss.load]: true})} />
				<div className={classNames({[css.fill]: true, [componentCss.fill]: true})} />
			</div>
			{children}
		</div>

	);
};
ProgressBar.propTypes = {
	/**
		 * The backgroundProgress is proportion of the loaded portion of the progress bar.
		 *
		 * * Valid values are between `0` and `1`.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
	backgroundProgress: PropTypes.number,
	/**
		 * The contents to be displayed with(within) progress bar.
		 *
		 * @type {Node}
		 * @public
		 */
	children: PropTypes.node,
	/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.(from top Wrapper component)
		 *
		 * The following classes are supported:
		 *
		 * * `progressBar` - The root component class
		 * * `bar`         - The background node (the empty part of the progressBar)
		 * * `fill`        - The foreground of the progress bar (`progress`)
		 * * `load`        - The `backgroundProgress` node
		 * * `horizontal`  - Applied when `orientation` is `'horizontal'`
		 * * `vertical`    - Applied when `orientation` is `'vertical'`
		 *
		 * @type {Object}
		 * @public
		 */
	css: PropTypes.object,
	/**
		 * Customizes the component by disabling when it is true.
		 *
		 * @type {Object}
		 * @public
		 */
	disabled: PropTypes.bool,
	/**
		 * will highlight ProgressBar fill area when it is true.
		 *
		 * @type {bool}
		 * @public
		 */
	highlighted: PropTypes.bool,
	/**
		 * Sets the orientation of the slider.
		 *
		 * Allowed values include:
		 *
		 * * `'horizontal'` - A left and right orientation
		 * * `'vertical'` - An up and down orientation
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
	orientation: PropTypes.string,
	/**
		 * The proportion of the filled portion of the progress bar.
		 *
		 * * Valid values are between `0` and `1`.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
	progress: PropTypes.number,
	/**
		 * Sets the point, as a proportion between 0 and 1, from which the progress bar is filled.
		 *
		 * Applies to both the progress bar's `value` and `backgroundProgress`. In both cases,
		 * setting the value of `progressAnchor` will cause the progress bar to fill from that point
		 * down, when `value` or `backgroundProgress` is proportionally less than the anchor, or up,
		 * when `value` or `backgroundProgress` is proportionally greater than the anchor, rather
		 * than always from the start of the progress bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
	progressAnchor: PropTypes.number
};

ProgressBar.defaultProps = {
	backgroundProgress: 0,
	orientation: 'horizontal',
	progress: 0,
	progressAnchor: 0
};
const ProgressBarBase = React.memo(ProgressBar);
export default ProgressBarBase;
export {
	ProgressBarBase
};
