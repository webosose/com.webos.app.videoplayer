import EnactPropTypes from '@enact/core/internal/prop-types';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ComponentOverride from '@enact/ui/ComponentOverride';
import _propTypes from '@enact/core/internal/prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Icon from '../Icon';
import Image from '../Image/Image';
import {Marquee} from '../Marquee';
import classes from './ImageItem.module.less';

const defaultPlaceholder =
	'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
	'9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
	'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
	'4NCg==';

function _objectWithoutProperties (source, excluded) {
	if (source == null) return {};
	let target = _objectWithoutPropertiesLoose(source, excluded);
	let key, i;
	if (Object.getOwnPropertySymbols) {
		let sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}

function _objectWithoutPropertiesLoose (source, excluded) {
	if (source == null) return {};
	let target = {};
	let sourceKeys = Object.keys(source);
	let key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}

const ImageItemBase = ({children, orientation, placeholder, src, showSelection, SelectionComponent, imageIconComponent, itemSize, imageIconSrc, label, selected, ...rest}) => {

	const isHorizontal = orientation === 'horizontal';
	const Component = isHorizontal ? Row : Column;
	const hasImageIcon = imageIconSrc && orientation === 'vertical';

	const imageComponent = <Image>
		{showSelection ? (
			<div className={classes.selectionContainer}>
				{SelectionComponent ? (
					<SelectionComponent />
				) : (
						<Icon className={classes.selectionIcon}>check</Icon>
					)}
			</div>
		) : null}
	</Image>;

	// Adapts ComponentOverride to work within Cell since both use the component prop
	function ImageOverride (_ref) {
		let _refRest = _objectWithoutProperties(_ref, ['imageComponent', 'children']);
		return ComponentOverride({..._refRest, component: imageComponent});
	}

	let cx = classNames.bind(classes);
	delete rest.imageComponent
	return (
		<Component
			className={cx({
				[classes.imageItem]: true,
				[classes.vertical]: !isHorizontal,
				[classes.horizontal]: isHorizontal,
				[classes.selected]: selected
			})}
			data-webos-voice-intent="Select"
			selected={selected} {...rest}
		>
			<Cell
				className={classes.image}
				imageComponent={imageComponent}
				component={ImageOverride}
				placeholder={placeholder}
				shrink={isHorizontal}
				src={src}
			/>
			{children && <Cell
				className={classes.caption}
				shrink={!isHorizontal}
				align={isHorizontal ? 'center' : undefined}
			>
				<Row className={classes.captions}>
					{hasImageIcon ? (
						<Cell
							className={classes.imageIcon}
							component={imageIconComponent}
							src={imageIconSrc}
							shrink
						/>
					) : null}
					<Cell>
						<Marquee className={classes.caption} marqueeOn="hover">{children}</Marquee>
						<Marquee className={classes.label} marqueeOn="hover">{label}</Marquee>
					</Cell>
				</Row>
			</Cell>}
		</Component>
	);
};

ImageItemBase.propTypes = {
	/**
	 * The caption displayed with the image.
	 *
	 * @type {Node}
	 * @public
	 */
	children: PropTypes.node,

	/**
		 * The voice control intent.
		 *
		 * @type {String}
		 * @default 'Select'
		 * @memberof goldstone/ImageItem.ImageItemBase.prototype
		 * @public
		 */
	'data-webos-voice-intent': PropTypes.string,

	/**
		 * The component used to render the image icon component.
		 *
		 * @type {Component}
		 * @default sandstone/Image.Image
		 * @private
		 */
	imageIconComponent: EnactPropTypes.component,

	/**
		 * Source for the image icon.
		 * String value or Object of values used to determine which image will appear on
		 * a specific screenSize.
		 * This feature is only valid when `orientation` is `'vertical'.
		 *
		 * @type {String|Object}
		 * @private
		 */
	imageIconSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

	/**
	 * The component used to render the image component.
	 *
	 * @type {Component|Element}
	 * @public
	 */
	imageComponent: _propTypes.componentOverride,

	/**
		 * A secondary caption displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
	label: PropTypes.string,

	/**
	 * The layout orientation of the component.
	 *
	 * @type {('horizontal'|'vertical')}
	 * @default 'vertical'
	 * @public
	 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	/**
	 * A placeholder image to be displayed before the image is loaded.
	 *
	 * @type {String}
	 * @public
	 */
	placeholder: PropTypes.string,

	/**
	 * Applies a selected visual effect to the image.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	selected: PropTypes.bool,

	/**
		 * The custom selection component to render. A component can be a stateless functional
		 * component, `kind()` or React component. The following is an example with custom selection
		 * kind.
		 *
		 * Usage:
		 * ```
		 * const SelectionComponent = kind({
		 *   render: () => <div>custom selection component</div>
		 * });
		 *
		 * <ImageItem selectionComponent={SelectionComponent} />
		 * ```
		 *
		 * @type {Function}
		 * @public
		 */
	selectionComponent: PropTypes.func,

	/**
		 * Shows a selection component with a centered icon. When `selected` is true, a check mark is shown.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
	showSelection: PropTypes.bool,
	/**
	 * String value or Object of values used to determine which image will appear on a specific
	 * screenSize.
	 *
	 * @type {String|Object}
	 * @public
	 */
	src: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

ImageItemBase.defaultProps = {
	'data-webos-voice-intent': 'Select',
	imageComponent: Image,
	imageIconComponent: Image,
	orientation: 'vertical',
	placeholder: defaultPlaceholder,
	selected: false
};

ImageItemBase.displayName = 'ImageItem';

export default ImageItemBase;
