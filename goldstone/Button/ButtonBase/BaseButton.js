import EnactPropTypes from '@enact/core/internal/prop-types';
import Touchable from '@enact/ui/Touchable';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import generateClassNames from '../../util/generateClassNames';
import componentCss from './Button.module.less';

function ButtonBase ({css, className, decoration, disabled, icon, iconComponent: Icon, iconOnly,  minWidth, pressed, selected, size, children, ...rest}) {

	const buttonBaseClassNames = generateClassNames(componentCss, {hasIcon: (!!icon), minWidth, pressed, selected, size});
	const buttonIcon = (typeof icon === 'string' && Icon) ? (<Icon size={size} className={componentCss.icon}>{icon}</Icon>) : icon;

	return (
		<button
			aria-disabled={disabled}
			title={iconOnly ? icon : ''}
			disabled={disabled}
			className={classNames({[className]: true, [componentCss.button]:true, [buttonBaseClassNames]:true})}
			{...rest}
		>
			{decoration && <div className={css.decoration}>{decoration}</div>}
			<div className={classNames({[css.bg]: true, [componentCss.bg]: true, [selected && componentCss.selectedButtonBackground]: true})} />
			<div className={classNames({[css.client]: true, [componentCss.client]: true, [selected && componentCss.selectedButtonForeground]: true})}>
				{buttonIcon}{!iconOnly && children}
			</div>
		</button>
	);
}

ButtonBase.propTypes = {
	/**
	 * The caption displayed.
	 *
	 * @type {Node}
	 * @public
	 */
	children: PropTypes.node,
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
	 * Additional DOM nodes which may be necessary for decorating the Button.
	 *
	 * @type {Node}
	 * @private
	 */
	decoration: PropTypes.node,
	/**
	 * Applies the `disabled` class.
	 *
	 * When `true`, the button is shown as disabled.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	disabled: PropTypes.bool,
	/**
	 * The icon displayed within the Button.
	 *
	 * The icon will be displayed before the natural reading order of the text, regardless
	 * of locale. Any string that is valid for its {@link ui/Button.Button.iconComponent} is
	 * valid here. If `icon` is specified as a string and `iconButton` is undefined, the icon is
	 * not rendered.
	 *
	 * This also supports a custom icon, in the form of a DOM node or a Component,
	 * with the caveat that if you supply a custom icon, you are responsible for sizing and
	 * locale positioning of the custom component.
	 *
	 * @type {Node}
	 * @public
	 */
	icon: PropTypes.node,
	/**
	 * The component used to render the [icon]{@link ui/Button.ButtonBase.icon}.
	 *
	 * This component will receive the `size` property set on the Button as well as the `icon`
	 * class to customize its styling. If [icon]{@link ui/Button.ButtonBase.icon} is not a
	 * string, this property is not used.
	 *
	 * @type {Component}
	 * @public
	 */
	iconComponent: EnactPropTypes.component,
	/**
	 * Show only the Icon.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	iconOnly: PropTypes.bool,
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
	 * Indicates the component is depressed.
	 *
	 * Applies the `pressed` CSS class which can be customized by
	 * [theming]{@link /docs/developer-guide/theming/}.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	pressed: PropTypes.bool,
	 /**
	 * Indicates the component is selected.
	 *
	 * Applies the `selected` CSS class which can be customized by
	 * [theming]{@link /docs/developer-guide/theming/}.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	selected: PropTypes.bool,
	/**
	 * The size of the button.
	 *
	 * @type {('large'|'small')}
	 * @default 'small'
	 * @public
	 */
	size: PropTypes.string
};

ButtonBase.defaultProps = {
	disabled: false,
	iconOnly: false,
	minWidth: true,
	pressed: false,
	selected: false
};

const ButtonDecorator = Touchable({activeProp: 'selected'});
const Button = React.memo(ButtonDecorator(ButtonBase));
export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
