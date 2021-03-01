/**
 * A decorator for adding contextual menus to components.
 *
 * @module goldstone/ContextualMenuDecorator
 * @exports ContextualMenuDecorator
 */

import {handle, forward, forProp} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import Repeater from '@enact/ui/Repeater';
import Toggleable from '@enact/ui/Toggleable';
import React from 'react';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import ContextualPopupDecorator from '../ContextualPopupDecorator';
import Item from '../Item';
import Skinnable from '../Skinnable';
import classNames from 'classnames';
import css from './ContextualMenuDecorator.module.less';

/**
 * Default config for {@link goldstone/ContextualMenuDecorator.ContextualMenuDecorator}
 *
 * @type {Object}
 * @hocconfig
 * @memberof goldstone/ContextualMenuDecorator.ContextualMenuDecorator
 */
const defaultConfig = {
	noSkin: false,
	openProp: 'selected'
};

const handleOpen = handle(
	forward('onClick'),
	forProp('open', false),
	forward('onOpen')
);

const ContextualMenuDecoratorBase = hoc(defaultConfig, (config, Wrapped) => {
	// we might not need Skinnable at all here. If we want to skin the popup and it's defined as a
	// private component in this module, we can wrap it with skinnable and style it as needed there.
	const Component = Skinnable(
		ContextualPopupDecorator(
			{...config, noArrow: true},
			Wrapped
		)
	);

	return class  extends React.PureComponent {
		constructor () {
			super();
			this.handleOnOpen = handleOpen.bind(this);
		}
		render () {
			let {popupProps, menuItems, ...rest} = this.props;
			delete rest.menuItems;
			delete rest.onOpen;
			const popupPropsElement = {
				children: menuItems,
				childComponent: Item,
				component: 'div',
				...popupProps
			};
			const appendedClassName = classNames(css, 'popup', 'container');
			return (
				<Component
					{...rest}
					className={appendedClassName}
					onClick={this.handleOnOpen}
					popupComponent={Repeater}
					popupProps={popupPropsElement}
				/>
			);
		}
	};
});

ContextualMenuDecoratorBase.propTypes = {
	/**
	 * Direction of ContextualPopup.
	 *
	 * Can be one of: `'up'`, `'down'`, `'left'`, or `'right'`.
	 *
	 * @type {('up'|'down'|'left'|'right')}
	 * @default 'down'
	 * @public
	 */
	direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),
	/**
	 * The contents of the popup.
	 *
	 * @type {Object}
	 * @required
	 * @public
	 */
	menuItems: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.shape({
			children: PropTypes.string.isRequired,
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}))
	]),
	/**
	 * Called when the close button is clicked.
	 *
	 * @type {Function}
	 * @public
	 */
	nClose: PropTypes.func,
	/**
	 * Called when the open button is clicked.
	 *
	 * @type {Function}
	 * @public
	 */
	onOpen: PropTypes.func,
	/**
	 * Styles fpr popup.
	 *
	 * @type {String}
	 * @public
	 */
	popupClassName: PropTypes.string,
	/**
	 * Props for the popup
	 *
	 * @type {Object}
	 * @public
	 */
	popupProps: PropTypes.object
};

ContextualMenuDecoratorBase.defaultProps = {
	direction: 'below'
};


const ContextualMenuDecorator = compose(
	Toggleable({
		activate: 'onOpen',
		deactivate: 'onClose',
		prop: 'open',
		toggle: null
	}),
	ContextualMenuDecoratorBase
);

export default ContextualMenuDecorator;
export {
	ContextualMenuDecorator
};
