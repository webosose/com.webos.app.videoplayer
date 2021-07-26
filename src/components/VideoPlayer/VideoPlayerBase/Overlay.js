import Touchable from '@enact/ui/Touchable';
import {memo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './VideoPlayer.module.less';

/**
 * Overlay {@link goldstone/VideoPlayer}. This covers the Video piece of the
 * {@link goldstone/VideoPlayer} to prevent unnecessary VideoPlayer repaints due to mouse-moves.
 * It also acts as a container for overlaid elements, like the {@link goldstone/Spinner}.
 *
 * @function
 * @memberof goldstone/VideoPlayer
 * @ui
 * @public
 */
const OverlayBase = ({bottomControlsVisible, children, ...rest}) => {
	return (
		<div
			className={classNames({[css.overlay]: true, [css['high-contrast-scrim']]: bottomControlsVisible})}
			{...rest}
		>
			{children}
		</div>
	);
};

OverlayBase.displayName = 'Overlay';
OverlayBase.propTypes = {
	bottomControlsVisible: PropTypes.bool,
	children: PropTypes.node
};

const Overlay = memo(Touchable(OverlayBase));
export default Overlay;
export {
	Overlay,
	OverlayBase
};
