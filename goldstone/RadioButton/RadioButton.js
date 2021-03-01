import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import Icon from '../Icon';
import Item from '../Item';
import componentCss from './RadioButton.module.less';
import classNames from 'classnames';
import generateClassNames from '../util/generateClassNames';
import {MarqueeDecorator} from '../Marquee';
import TooltipDecorator from '../TooltipDecorator';
import Skinnable from '../Skinnable';
function RadioButtonBase ({
	children,
	icon,
	className,
	size,
	...rest
}) {
	const buttonIcon = (typeof icon === 'string' && Icon) ? (<Icon slot="slotBefore" size="tiny" className={componentCss.icon}>{icon}</Icon>) : icon;
	const RadioButtonClassNames = generateClassNames(componentCss, {
		icon
	});
	return (
		<Item
			data-webos-voice-intent="SelectRadioItem"
			size={size}
			{...rest}
			css={componentCss}
			className={classNames({
				[className]: true,
				[componentCss.radioItem]:true,
				[RadioButtonClassNames]: true
			})}
		>
			{buttonIcon}
			{children}
		</Item>
	);
}
RadioButtonBase.propTypes = {
	css: PropTypes.object,
	icon: PropTypes.node,
	size: PropTypes.string
};
RadioButtonBase.defaultProps = {
	icon: 'circle'
};
const RadioItemDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
	MarqueeDecorator({className: componentCss.marquee}),
	TooltipDecorator,
	Skinnable
);
const RadioButton = React.memo(RadioItemDecorator(RadioButtonBase));
export default RadioButton;
export {
	RadioButton,
	RadioButtonBase,
	RadioItemDecorator
};
