/**
 * Provides GoldStone slider components and behaviors.
 *
 */
import {forKey, forProp, forward, forwardWithPrevent, handle} from '@enact/core/handle';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Slottable from '@enact/ui/Slottable';
import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBarBase/ProgressBarBase';
import UiSlider from './SliderBase/SliderBase';
import PropTypes from 'prop-types';
import anyPass from 'ramda/src/anyPass';
import compose from 'ramda/src/compose';
import {ProgressBarTooltip} from '../ProgressBar';
import Skinnable from '../Skinnable';
import {validateSteppedOnce} from '../internal/validators';
import {SliderBehaviorDecorator} from './SliderBehaviorDecorator';
import {
	handleDecrement,
	handleIncrement
} from './utils';
import componentCss from './Slider.module.less';
import generateClassNames from '../util/generateClassNames';
import classNames from 'classnames';


/**
 * Range-selection input component.
 *
 * @class SliderBase
 * @extends ui/Slider.SliderBase
 * @memberof Goldstone/Slider
 * @ui
 * @public
 */


/**
 * The amount to increment or decrement the value.
 *
 * It must evenly divide into the range designated by `min` and `max`.
 *
 * @type {Number}
 * @default 1
 * @public
 */
const keyUP = handle(
	forProp('disabled', false),
	forwardWithPrevent('onKeyUp'),
	forProp('activateOnSelect', true),
	forKey('enter'),
	forward('onActivate')    // calls event.preventDefault() to prevent the `keypress` event

).finally(() => {
	console.log('This will log at the end no matter what happens within the handler above');
});

const blur = handle(
	forward('onBlur'),
	forProp('active', true),
	forward('onActivate')
).finally(() => {
	console.log('This will log at the end no matter what happens within the handler above');
});

/**
 * Called when a key is released while the slider is focused.
 *
 * When the enter key is released and `activateOnSelect` is enabled, the slider will be
 * activated to enable incrementing or decrementing the value via directional keys. This
 * default behavior can be prevented by calling `preventDefault()` on the event passed to
 * this callback.
 *
 * @type {Function}
 * @public
 */

const keyDown = handle(
	forProp('disabled', false),
	forwardWithPrevent('onKeyDown'),
	anyPass([
		handleIncrement,
		handleDecrement
	])
).finally(() => {
	console.log('This will log at the end no matter what happens within the handler above');
});
class SliderBase extends React.PureComponent {
	constructor () {
		super();
		this.handleKeyDown = keyDown.bind(this);
		this.handdleKeyUp = keyUP.bind(this);
		this.handleBlur = blur.bind(this);
	}

	tooltipComponent = ({tooltip}) => tooltip === true ? ProgressBarTooltip : tooltip;
	appendClassName = ({activateOnFocus, active}) => (
		classNames(generateClassNames(componentCss, {
			activateOnFocus: (!!activateOnFocus),
			active: (!!active)
		}))
	);

	knobStep= validateSteppedOnce(props => props.knobStep, {
		component: 'Slider',
		stepName: 'knobStep',
		valueName: 'max'
	});
	step=validateSteppedOnce(props => props.step, {
		component: 'Slider',
		valueName: 'max'
	});
	render () {
		let {className, focused, disabled, ...rest} = this.props;
		return (

			<UiSlider
				{...rest}
				disabled={disabled}
				onKeyDown={this.handleKeyDown}
				onKeyUp={this.handdleKeyUp}
				onBlur={this.handleBlur}
				css={componentCss}
				className={classNames({
					[className]: true,
					[componentCss.slider]: true,
					[this.appendClassName(this.props)]: true
				})}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
						className={classNames({
							// [className]: true,
							[componentCss.slider]: true,
							[this.appendClassName(this.props)]: true
						})}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={this.tooltipComponent(this.props)}
						className={classNames({
							[className]: true,
							[componentCss.tooltip]: true,
							[this.appendClassName(this.props)]: true
						})}

						visible={focused}
					/>
				}
			/>

		);

	}
}

SliderBase.propTypes = {
	activateOnSelect: PropTypes.bool,
	active: PropTypes.bool,
	css: PropTypes.object,
	focused: PropTypes.bool,
	knobStep: PropTypes.number,
	max: PropTypes.number,
	min: PropTypes.number,
	onActivate: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	step: PropTypes.number,
	tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),
	/**
	 * The value of the slider.
	 *
	 * Defaults to the value of `min`.
	 *
	 * @type {Number}
	 * @public
	 */
	value: PropTypes.number
};

SliderBase.defaultProps = {
	activateOnSelect: false,
	active: false,
	disabled: false,
	max: 100,
	min: 0,
	step: 1,
	rest: {value: 0}
};

const SliderDecorator = compose(
	Changeable,
	SliderBehaviorDecorator,
	Spottable,
	Slottable({slots: ['knob', 'tooltip']}),
	Skinnable
);
const Slider = React.memo(SliderDecorator(SliderBase));
export default Slider;
export {
	Slider,
	SliderBase,
	SliderDecorator,
	ProgressBarTooltip as SliderTooltip
};

