import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Knob} from '@enact/ui/Slider';

/**
 * Knob for the MediaSlider in {@link goldstone/VideoPlayer}.
 *
 * @function MediaKnob
 * @memberof goldstone/VideoPlayer
 * @ui
 * @private
 */
const MediaKnob = ({preview, previewProportion, value, style, ...rest}) => {

	const MediaKnobStyle = useCallback(() => {
		if (!preview) {
			return style;
		}

		return {
			...style,
			'--ui-slider-proportion-end-knob': previewProportion
		};
	}, [style, preview, previewProportion]);

	return (
		<Knob
			{...rest}
			style={MediaKnobStyle(style, preview, previewProportion)}
			proportion={preview ? previewProportion : value}
			value={preview ? previewProportion : value}
		/>
	);
};

MediaKnob.propTypes = {
	preview: PropTypes.bool,
	previewProportion: PropTypes.number,
	value: PropTypes.number
};

export default MediaKnob;
export {
	MediaKnob
};
