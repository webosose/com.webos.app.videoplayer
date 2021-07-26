import PropTypes from 'prop-types';
import Skinnable from '../../../../goldstone/Skinnable';
import Icon from '../../../../goldstone/Icon';
import iconMap from './FeedbackIcons.js';
import classNames from 'classnames';

import css from './Feedback.module.less';

/**
 * Feedback Icon for {@link goldstone/VideoPlayer.Feedback}.
 *
 * @function FeedbackIcon
 * @memberof sandstone/VideoPlayer
 * @mixes sandstone/Skinnable
 * @ui
 * @private
 */
const FeedbackIconBase = ({children, className}) => {
	return (
		children && <Icon className={`${classNames({[css.icon]: true})} ${className}`}>{children && iconMap[children] && iconMap[children].icon}</Icon>
	);
};

FeedbackIconBase.displayName = 'FeedbackIcon';
FeedbackIconBase.propTypes = {
	/**
	 * Refers to one of the following possible media playback states.
	 * `'play'`, `'pause'`, `'rewind'`, `'slowRewind'`, `'fastForward'`, `'slowForward'`,
	 * `'jumpBackward'`, `'jumpForward'`, `'jumpToStart'`, `'jumpToEnd'`, `'stop'`.
	 *
	 * @type {String}
	 * @public
	 */
	children: PropTypes.oneOf(Object.keys(iconMap))
};

const FeedbackIcon = Skinnable(FeedbackIconBase);
export default FeedbackIcon;
export {
	FeedbackIcon,
	FeedbackIconBase
};
