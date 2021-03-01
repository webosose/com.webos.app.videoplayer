import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {selectSrc} from '../resolution';
import classes from './Image.module.less';

/**
 * A basic image component designed to display images conditionally based on screen size.
 *
 * Example:
 * ```
 * const src = {
 *   'hd': 'http://lorempixel.com/64/64/city/1/',
 *   'fhd': 'http://lorempixel.com/128/128/city/1/',
 *   'uhd': 'http://lorempixel.com/256/256/city/1/'
 * };
 *
 * <Image className={css.myImage} src={src} sizing="fill" />
 * ```
 *
 * `ui/Image` is based on the `div` element, but it uses `img` to provide `onError` and `onLoad`
 * events. The image that you see on screen is a `background-image` from the `div` element, not the
 * `img` element.
 *
 * > If you need a naturally sized image, you can use the native `<img>` element instead.
 *
 * @class Image
 * @memberof goldstone/Image
 * @ui
 * @public
 */

const Image = ({alt, children, className, onLoad, onError, placeholder, sizing, src, style}) => {

	const getImageSrc = () => {
		const imageSrc = selectSrc(src) || placeholder;
		if (!imageSrc) {
			return null;
		}
		if (placeholder && placeholder !== imageSrc) {
			return `url(${imageSrc}), url(${placeholder})`;
		}
		return `url(${imageSrc})`;
	};

	const backgroundImage = getImageSrc();
	let cx = classNames.bind(classes);
	let imageContainer = cx({
		[classes.image]:true,
		[classes.fit]: sizing === 'fit',
		[classes.fill]: sizing === 'fill'
	});
	imageContainer = className + ' ' + imageContainer;

	return (
		<div
			role="img"
			draggable="false"
			className={imageContainer}
			aria-label={['aria-label'] || alt}
			style={{...style, backgroundImage:backgroundImage}}
		>
			{children}
			<img
				className={classes.img}
				src={backgroundImage}
				alt={alt}
				onLoad={onLoad}
				onError={onError}
			/>
		</div>
	);
};

Image.propTypes = {
	/**
		 * String value for the alt attribute of the image.
		 *
		 * @type {String}
		 * @public
		 */
	alt:PropTypes.string,

	/**
		 * The aria-label for the image.
		 *
		 * If unset, it defaults to the value of `alt`.
		 *
		 * @type {String}
		 * @public
		 * @memberof ui/Image.Image.prototype
		 */
	'aria-label':PropTypes.string,

	/**
		 * Node for the children of an `Image`. Useful for overlays.
		 *
		 * @type {Node}
		 * @public
		 */
	children: PropTypes.node,

	/**
		 * Called if the image has an error.
		 *
		 * @type {Function}
		 * @public
		 */
	onError: PropTypes.func,

	/**
		 * Called once the image is loaded.
		 *
		 * @type {Function}
		 * @public
		 */
	onLoad: PropTypes.func,

	/**
		 * A placeholder image to be displayed before the image is loaded.
		 *
		 * For performance purposes, it should be pre-loaded or be a data url. If `src` is
		 * unset, this value will be used as the `background-image`.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
	placeholder: PropTypes.string,

	/**
		 * Used to set the `background-size` of an `Image`.
		 *
		 * * `'fill'` - sets `background-size: cover`
		 * * `'fit'` - sets `background-size: contain`
		 * * `'none'` - uses the image's natural size
		 *
		 * @type {String}
		 * @default 'fill'
		 * @public
		 */
	sizing: PropTypes.oneOf(['fit', 'fill', 'none']),

	/**
		 * String value or Object of values used to determine which image will appear on
		 * a specific screenSize.
		 *
		 * @type {String|Object}
		 * @public
		 */
	src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	/**
		 * Used to set the `allignment` of an `Image` and `Title`.
		 *
		 * * `'horizontal'` - sets `image` and `title` horizontally
		 * * `'vertical'` - sets `image` and `title` vertically
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
	type: PropTypes.oneOf(['horizontal', 'vertical'])
};

Image.defaultProps = {
	placeholder: '',
	sizing: 'fill',
	type:'horizontal'
};

export default Image;
