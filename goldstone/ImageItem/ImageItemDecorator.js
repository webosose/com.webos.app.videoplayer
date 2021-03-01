import Spottable from '@enact/spotlight/Spottable';
import compose from 'ramda/src/compose';
import {MarqueeController} from '../Marquee';
import Skinnable from '../Skinnable';

/**
 * Sandstone-specific ImageItem behaviors to apply to
 * [ImageItem]{@link goldstone/ImageItem.ImageItem}.
 *
 * @hoc
 * @memberof goldstone/ImageItem
 * @mixes goldstone/Marquee.MarqueeController
 * @mixes spotlight/Spottable.Spottable
 * @mixes goldstone/Skinnable.Skinnable
 * @public
 */
const ImageItemDecorator = compose(
	MarqueeController({marqueeOnFocus: true}),
	Spottable,
	Skinnable
);

export default ImageItemDecorator;
