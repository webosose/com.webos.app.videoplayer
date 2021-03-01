import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import classNames from 'classnames';

import Icon from '../Icon';
import {Marquee} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './ActionGuide.module.less';

const ActionGuideBase = ({children, icon, ...rest}) => {
	const appendedClassName = classNames([componentCss.actionGuide, rest.className]);
	delete rest.className;
	return (
		<div {...rest} className={appendedClassName}>
			<Icon size="small" className={componentCss.icon}>{icon}</Icon>
			<Marquee className={componentCss.label} marqueeOn="render" alignment="center">{children}</Marquee>
		</div>
	);
};

ActionGuideBase.propTypes = {
	/**
		* The contents for the action guide.
		*
		* @type {String}
		* @public
	*/
	children: PropTypes.string,

	/**
		* The icon displayed within the action guide.
		*
		* @type {String}
		* @default 'arrowsmalldown'
		* @public
	*/
	icon: PropTypes.string
};

ActionGuideBase.defaultProps = {
	icon: 'arrowsmalldown'
};

const ActionGuideDecorator = compose(
	Pure,
	Skinnable
);

const ActionGuide = ActionGuideDecorator(ActionGuideBase);

export default ActionGuide;
export {
	ActionGuide,
	ActionGuideBase,
	ActionGuideDecorator
};
