import React from 'react';
import PropTypes from 'prop-types';

import {IconButtonDecorator as UiIconButtonDecorator} from '@enact/ui/IconButton';
import Pure from '@enact/ui/internal/Pure';
import Spottable from '@enact/spotlight/Spottable';
import compose from 'ramda/src/compose';

import {ButtonBase} from '../Button';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

const IconButtonBase = ({children, ...rest}) => {
	return (
		<ButtonBase {...rest} minWidth={false} icon={children} iconOnly />
	);
};

IconButtonBase.propTypes = {
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
	 * Child component for Icon.
	 *
	 * @type {String}
	 * @public
	 */
	children: PropTypes.string
};

IconButtonBase.defaultProps = {
	backgroundOpacity: 'transparent',
	children: 'search'
};

const IconButtonDecorator = compose(
	Pure,
	TooltipDecorator({tooltipDestinationProp: 'decoration'}),
	UiIconButtonDecorator,
	Spottable,
	Skinnable
);

const IconButton = React.memo(IconButtonDecorator(IconButtonBase));

export default IconButton;
export {
	IconButton,
	IconButtonBase,
	IconButtonDecorator
};
