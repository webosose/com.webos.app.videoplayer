import React from 'react';
import PropTypes from 'prop-types';
import Skinnable from '../Skinnable';
import css from './ContextualPopup.module.less';
import classNames from 'classnames';
import {generateClassNames} from '../internal/util';


/**
 * An SVG arrow for {@link golddstone/ContextualPopupDecorator/ContextualPopup.ContextualPopup}.
 *
 * @class ContextualPopupArrow
 * @memberof goldstone/ContextualPopupDecorator
 * @ui
 * @private
 */
const ContextualPopupArrow = function ({direction, ...rest}) {
	const appendClassName = classNames(css.arrow, direction);
	return (
		<svg {...rest} className={appendClassName} viewBox="0 0 30 30">
			<path d="M15 2 L0 20 L30 20 Z" className={css.arrowFill} />
		</svg>
	);
};

ContextualPopupArrow.propTypes = {
	direction: PropTypes.oneOf(['above', 'below', 'left', 'right'])
};

ContextualPopupArrow.defaultProps = {
	direction: 'below'
};

const ContextualPopupRoot = Skinnable('div');

/**
 * A popup component used by
 * [ContextualPopupDecorator]{@link goldstone/ContextualPopupDecorator.ContextualPopupDecorator} to
 * wrap its
 * [popupComponent]{@link goldstone/ContextualPopupDecorator.ContextualPopupDecorator.popupComponent}.
 *
 * `ContextualPopup` is usually not used directly but is made available for unique application use
 * cases.
 *
 * @class ContextualPopup
 * @memberof goldstone/ContextualPopupDecorator
 * @ui
 * @public
 */
const ContextualPopupBase = function ({direction, arrowPosition, containerPosition, containerRef, children, showArrow, ...rest}) {
	delete rest.direction;
	const arrowDirection = (dir) => {
		const [arrowDir] = dir.split(' ');
		return arrowDir;
	};
	const generateClassNamesButton = generateClassNames(css, {fixedSize: direction === 'above' || direction === 'below'});

	return (
		<ContextualPopupRoot aria-live="off" role="alert" {...rest} className={css.contextualPopup}>
			<div
				className={classNames({[generateClassNamesButton]: true, [css.container]: true})}
				style={containerPosition}
				ref={containerRef}
			>
				{children}
			</div>
			{showArrow ? <ContextualPopupArrow direction={arrowDirection(direction)} style={arrowPosition} /> : null}
		</ContextualPopupRoot>
	);
};

ContextualPopupBase.propTypes = {
	/**
	 * Style object for arrow position.
	 *
	 * @type {Object}
	 * @public
	 */
	arrowPosition: PropTypes.shape({
		bottom: PropTypes.number,
		left: PropTypes.number,
		right: PropTypes.number,
		top: PropTypes.number
	}),
	/**
	 * Child component for popup.
	 *
	 * @type {Object}
	 * @public
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Style object for container position.
	 *
	 * @type {Object}
	 * @public
	 */
	containerPosition: PropTypes.shape({
		bottom: PropTypes.number,
		left: PropTypes.number,
		right: PropTypes.number,
		top: PropTypes.number,
		width: PropTypes.number
	}),
	/**
	 * Called with the reference to the container node.
	 *
	 * @type {Function}
	 * @public
	 */
	containerRef: PropTypes.func,
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
	 * Shows the arrow.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	showArrow: PropTypes.bool
};

ContextualPopupBase.defaultProps = {
	direction: 'below center'
};

export default ContextualPopupBase;
export {
	ContextualPopupBase as ContextualPopup,
	ContextualPopupBase,
	ContextualPopupArrow
};
