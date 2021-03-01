import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Slider from '../../Slider';

import MediaKnob from './MediaKnob';
import MediaSliderDecorator from './MediaSliderDecorator';

import css from './VideoPlayer.module.less';

/**
 * The base component to render a customized [Slider]{@link goldstone/Slider.Slider} for use in
 * [VideoPlayer]{@link goldstone/VideoPlayer.VideoPlayer}.
 *
 * @function MediaSliderBase
 * @memberof goldstone/VideoPlayer
 * @ui
 * @private
 */
const MediaSliderBase = ({children, forcePressed, preview, previewProportion, visible, ...rest}) => {
	return (
		<div className={classNames({[css.sliderFrame]: true, [css.hidden]: !visible})}>
			<Slider
				{...rest}
				tooltip={children}
				aria-hidden="true"
				className={classNames({[css.pressed]: forcePressed, [css.mediaSlider]: true})}
				css={css}
				knobComponent={
					<MediaKnob preview={preview} previewProportion={previewProportion} />
				}
				max={1}
				min={0}
				step={0.00001}
			/>
		</div>
	);
};
MediaSliderBase.displayName = 'MediaSlider';
MediaSliderBase.propTypes = {
	/**
	 * When `true`, the knob will expand. Note that Slider is a controlled
	 * component. Changing the value would only affect pressed visual and
	 * not the state.
	 *
	 * @type {Boolean}
	 * @public
	 */
	forcePressed: PropTypes.bool,

	/**
	 * Allow moving the knob via pointer or 5-way without emitting `onChange` events
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	preview: PropTypes.bool,

	/**
	 * The position of the knob when in `preview` mode
	 *
	 * @type {Number}
	 * @public
	 */
	previewProportion: PropTypes.number,

	/**
	 * The visibility of the component. When `false`, the component will be hidden.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	visible: PropTypes.bool
};
MediaSliderBase.defaultProps = {
	preview: false,
	visible: true
};

const MediaSlider = memo(
	MediaSliderDecorator(MediaSliderBase),
	(prevProp, nextProp) => {
		if (!prevProp.visible && prevProp.visible === nextProp.visible &&
			(prevProp.value !== nextProp.value)
		) {
			return true;
		}

		return false;
	}
);

export default MediaSlider;
export {
	MediaSlider,
	MediaSliderBase
};
