/**
 * Provides Progress Bar component as per the Y21 UX specs.
 *
 * @example
 * <ProgressBar progress={0.5} backgroundProgress={0.75} />
 *
 * @module goldstone/ProgressBar
 * @exports ProgressBar
 * @exports ProgressBarBase
 * @exports ProgressBarDecorator
 * @exports ProgressBarTooltip
 */
import ComponentOverride from '@enact/ui/ComponentOverride';
import UiProgressBar from './ProgressBarBase/ProgressBarBase';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import generateClassNames from '../util/generateClassNames';
import Skinnable from '../Skinnable';
import {ProgressBarTooltip} from './ProgressBarTooltip';
import classNames from 'classnames';
import componentCss from './ProgressBarComponent.module.less';
/**
 * Renders a goldstone(based on Y21 and Sandstone)-styled progress bar.
 *
 * @function ProgressBar
 * @memberof goldstone/ProgressBar
 * @ui
 * @public
 */
const ProgressBarComponent = ({backgroundProgress, className, highlighted, orientation, disabled, progress, tooltip, ...rest}) => {
	const ProgressBarComponentClassNames = generateClassNames(componentCss, {
		highlighted,
		radial: (orientation === 'radial'),
		fillOverHalf: (progress > 0.5),
		loadOverHalf: (backgroundProgress > 0.5)
	});
	return (
		<UiProgressBar
			{...rest}
			disabled={disabled}
			backgroundProgress={backgroundProgress}
			orientation={orientation}
			progress={progress}
			css={componentCss}
			className={classNames({
				[className]: true,
				[componentCss.progressBar]: true,
				[ProgressBarComponentClassNames]: true
			})}
		>
			<ComponentOverride
				component={tooltip}
				orientation={orientation}
				percent
				proportion={progress}
				visible
			/>
		</UiProgressBar>
	);
};

ProgressBarComponent.propTypes = {
	backgroundProgress: PropTypes.number,
	disabled: PropTypes.bool,
	highlighted: PropTypes.bool,
	orientation: PropTypes.string,
	progress: PropTypes.number,
	progressAnchor: PropTypes.number,
	tooltip: PropTypes.bool
};

ProgressBarComponent.defaultProps = {
	/**
	 * The proportion of the loaded portion of the progress bar.
	 *
	 * * Valid values are between `0` and `1`.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	backgroundProgress: 0,
	/**
	 * Highlights the filled portion.
	 *
	 * @type {Boolean}
	 * @public
	 */
	highlighted: false,
	/**
	 * The orientation of the slider.
	 *
	 * @type {('horizontal'|'vertical'|'radial')}
	 * @default 'horizontal'
	 * @public
	 */
	orientation: 'horizontal',
	/**
	 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	progress: 0,
	/**
	 * A number between `0` and `1` indicating the proportion of Progress bar to get Started(initial point).
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	progressAnchor: 0,
	/**
	 * Enables the built-in tooltip.
	 *
	 * To customize the tooltip, pass either a custom tooltip component or an instance of
	 * [ProgressBarTooltip]{@link ProgressBar.ProgressBarTooltip} with additional
	 * props configured.
	 *
	 * The provided component will receive the following props from `ProgressBar`:
	 *
	 * * `orientation`  - The value of `orientation`
	 * * `percent`      - Always `true` indicating the value should be presented as a percentage
	 *                    rather than an absolute value
	 * * `progress`     - The `value` as a proportion between `min` and `max`
	 * * `visible`      - Always `true` indicating that the tooltip should be visible
	 *
	 * Usage:
	 * ```
	 * <ProgressBar
	 *   tooltip={
	 *     <ProgressBarTooltip position="after" />
	 *   }
	 * />
	 * ```
	 *
	 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
	 * [Slottable]{@link ui/Slottable} for more information on how slots can be used.
	 *
	 * Usage:
	 * ```
	 * <ProgressBar>
	 *   <ProgressBarTooltip position="after" />
	 * </ProgressBar>
	 * ```
	 *
	 * @type {Boolean|Component|Element}
	 * @public
	 */
	tooltip: false
};
const ProgressBarDecorator = compose(
	Slottable({slots: ['tooltip']}),
	Skinnable
);
const ProgressBar = React.memo(ProgressBarDecorator(ProgressBarComponent));

export default ProgressBar;
export {
	ProgressBar,
	ProgressBarComponent,
	ProgressBarDecorator,
	ProgressBarTooltip
};
