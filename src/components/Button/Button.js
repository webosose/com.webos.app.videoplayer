import Spottable from '@enact/spotlight/Spottable';
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from './ButtonBase/BaseButton';
import {cap} from '@enact/core/util';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import classNames from 'classnames';
import {generateClassNames} from '../internal/util';
import {IconBase} from '../Icon';
import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';
import componentCss from './Button.module.less';

const Icon = Skinnable(IconBase);

function ButtonBase ({backgroundOpacity, color, className, icon, iconOnly, iconPosition, minWidth, size, ...rest}) {
	const buttonBaseClassNames = generateClassNames(componentCss, {backgroundOpacity: backgroundOpacity || (iconOnly ? 'transparent' : 'opaque'), hasColor:color, color, iconOnly, iconPosition: `icon${cap(iconPosition)}`, size});
	const buttonMinWidth = minWidth != null ? minWidth : !iconOnly;
	return (
		<UiButtonBase
			data-webos-voice-intent="Select"
			css={componentCss}
			className={classNames({[className]: true, [componentCss.button]:true, [buttonBaseClassNames]:true})}
			icon={icon}
			iconComponent={Icon}
			iconOnly={iconOnly}
			minWidth={buttonMinWidth}
			size={size}
			{...rest}
		/>
	);
}

ButtonBase.propTypes = {
	/**
	 * The background opacity of this button.
	 *
	 * Valid values are:
	 * * `'translucent'`,
	 * * `'lightTranslucent'`, and
	 * * `'transparent'`.
	 *
	 * @type {('translucent'|'lightTranslucent'|'transparent')}
	 * @public
	 */
	backgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),
	/**
	 * The color of the underline beneath button's content.
	 *
	 * Accepts one of the following color names, which correspond with the colored buttons on a
	 * standard remote control: `'red'`, `'green'`, `'yellow'`, `'blue'`.
	 *
	 * @type {('red'|'green'|'yellow'|'blue')}
	 * @public
	 */
	color: PropTypes.oneOf(['red', 'green', 'yellow', 'blue']),
	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `button` - The root class name
	 * * `bg` - The background node of the button
	 * * `large` - Applied to a `size='large'` button
	 * * `selected` - Applied to a `selected` button
	 * * `small` - Applied to a `size='small'` button
	 *
	 * @type {Object}
	 * @public
	 */
	// `transparent` and `client` were intentionally excluded from the above documented
	// exported classes as they do not appear to provide value to the end-developer, but are
	// needed by IconButton internally for its design guidelines.
	// Same for `pressed` which is used by Dropdown to nullify the key-press activate animation.
	css: PropTypes.object,
	/**
	 * The icon displayed within the IconButton.
	 *
	 * If not specified, `children` is used as the icon value instead.
	 *
	 * @type {String}
	 * @public
	 */
	icon: PropTypes.string,
	/**
	 * Show only the Icon.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	iconOnly: PropTypes.bool,
	/**
	 * Specifies on which side (`'before'` or `'after'`) of the text the icon appears.
	 *
	 * @type {('before'|'after')}
	 * @default 'before'
	 * @public
	 */
	iconPosition: PropTypes.oneOf(['before', 'after']),
	/**
	 * Enforces a minimum width for the component.
	 *
	 * Applies the `minWidth` CSS class which can be customized by
	 * [theming]{@link /docs/developer-guide/theming/}.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	minWidth: PropTypes.bool,
	/**
	 * The size of the button.
	 *
	 * @type {('large'|'small')}
	 * @default 'small'
	 * @public
	 */
	size: PropTypes.oneOf(['large', 'small'])
};

ButtonBase.defaultProps = {
	backgroundOpacity: 'opaque',
	iconPosition: 'before',
	size: 'small'
};

const IconButtonDecorator = (WrappedComponent) => {
	return class iconButtonDecorator extends React.Component {
		render () {
			const iconOnly = ({children}) => (React.Children.toArray(children).filter(Boolean).length === 0);
			return <WrappedComponent {...this.props} {...iconOnly} />;
		}
	};
};

const ButtonDecorator = compose(
	Pure,
	IconButtonDecorator,
	TooltipDecorator({tooltipDestinationProp: 'decoration'}),  // Future note: This should eventually be conditionally applied via hooks (after refactoring)
	MarqueeDecorator({className: componentCss.marquee}),
	UiButtonDecorator,
	Spottable,
	Skinnable
);

const Button = React.memo(ButtonDecorator(ButtonBase));

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
