import ImageItemBase from './ImageItemBase';
import ImageItemDecorator from './ImageItemDecorator';

/**
 * A goldstone-styled image item, Marquee and Spottable applied.
 *
 * Usage:
 * ```
 * <ImageItem
 *  caption="image0"
 *  src="http://placehold.it/300x300/9037ab/ffffff&text=Image0"
 *  subCaption="sub-image0"
 * />
 * ```
 *
 * @class ImageItem
 * @memberof goldstone/ImageItem
 * @extends goldstone/ImageItem.ImageItemBase
 * @mixes goldstone/ImageItem.ImageItemDecorator
 * @see {@link goldstone/ImageItem.ImageItemBase}
 * @ui
 * @public
 */
const ImageItem = ImageItemDecorator(ImageItemBase);
ImageItem.displayName = 'ImageItem';

export default ImageItem;
