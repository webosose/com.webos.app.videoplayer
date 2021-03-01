import ForwardRef from '@enact/ui/ForwardRef';
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Marquee from '../../Marquee';
import css from './VideoPlayer.module.less';

/**
 * MediaTitle {@link goldstone/VideoPlayer}.
 *
 * @function MediaTitle
 * @memberof goldstone/VideoPlayer
 * @ui
 * @private
 */
const MediaTitleBase = ({children, id, infoVisible, forwardRef, title, visible}) => {
	const childrenClassName = classNames({[css.infoComponents]: true, [css[infoVisible ? 'visible' : 'hidden']]: true});
	const titleClassName = classNames({[css.title]: true, [css.infoVisible]: true});
	return (
		<div className={classNames({[css[visible ? 'visible' : 'hidden']]: true, [css.titleFrame]: true})} id={id + '_mediaTitle'} ref={forwardRef}>
			<Marquee id={id + '_title'} className={titleClassName} marqueeOn="render">
				{title}
			</Marquee>
			<div id={id + '_info'} className={childrenClassName}>  {/* tabIndex={-1} */}
				{children}
			</div>
		</div>
	);
};

MediaTitleBase.displayName = 'MediaTitle';
MediaTitleBase.propTypes = {
	/**
	 * DOM id for the component. Also define ids for the title and node wrapping the `children`
	 * in the forms `${id}_title` and `${id}_info`, respectively.
	 *
	 * @type {String}
	 * @required
	 * @public
	 */
	id: PropTypes.string.isRequired,

	/**
	 * Anything supplied to `children` will be rendered. Typically this will be informational
	 * badges indicating aspect ratio, audio channels, etc., but it could also be a description.
	 *
	 * @type {Node}
	 * @public
	 */
	children: PropTypes.node,

	/**
	 * Forwards a reference to the MediaTitle component.
	 *
	 * @type {Function}
	 * @private
	 */
	forwardRef: PropTypes.func,

	/**
	 * Control whether the children (infoComponents) are displayed.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	infoVisible: PropTypes.bool,

	/**
	 * A title string to identify the media's title.
	 *
	 * @type {Node}
	 * @public
	 */
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

	/**
	 * Setting this to false effectively hides the entire component. Setting it to `false` after
	 * the control has rendered causes a fade-out transition. Setting to `true` after or during
	 * the transition makes the component immediately visible again, without delay or transition.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	// This property uniquely defaults to true, because it doesn't make sense to have it false
	// and have the control be initially invisible, and is named "visible" to match the other
	// props (current and possible future). Having an `infoVisible` and a `hidden` prop seems weird.
	visible: PropTypes.bool
};
MediaTitleBase.defaultProps = {
	infoVisible: false,
	visible: true
};

const MediaTitle = ForwardRef(memo(MediaTitleBase));
export default MediaTitle;
export {
	MediaTitle,
	MediaTitleBase
};
