import {memo} from 'react';
import PropTypes from 'prop-types';
import {secondsToPeriod, secondsToTime} from './util';
import css from './VideoPlayer.module.less';

/**
 * Times {@link goldstone/VideoPlayer}.
 *
 * @function Times
 * @memberof goldstone/VideoPlayer
 * @ui
 * @private
 */
const TimesBase = ({current, formatter, noCurrentTime, noTotalTime, total, ...rest}) => {
	const currentPeriod = secondsToPeriod(current);
	const currentReadable = secondsToTime(current, formatter);
	const noSeparator = noCurrentTime || noTotalTime;
	const totalPeriod = secondsToPeriod(total);
	const totalReadable = secondsToTime(total, formatter);

	return (
		<div {...rest}>
			{
				!noCurrentTime && <time className={css.currentTime} dateTime={currentPeriod}>{currentReadable}</time>
			}
			{
				!noSeparator && <span className={css.separator}>/</span>
			}
			{
				!noTotalTime && <time className={css.totalTime} dateTime={totalPeriod}>{totalReadable}</time>
			}
		</div>
	);
};

TimesBase.displayName = 'Times';
TimesBase.propTypes = {
	/**
	 * An instance of a Duration Formatter from i18n. {@link i18n/ilib/lib/DurationFmt.DurationFmt}
	 *
	 * @type {Object}
	 * @required
	 * @public
	 */
	formatter: PropTypes.object.isRequired,

	/**
	 * The current time in seconds of the video source.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	current: PropTypes.number,

	/**
	 * Removes the current time.
	 *
	 * @type {Boolean}
	 * @public
	 */
	noCurrentTime: PropTypes.bool,

	/**
	 * Removes the total time.
	 *
	 * @type {Boolean}
	 * @public
	 */
	noTotalTime: PropTypes.bool,

	/**
	 * The total time (duration) in seconds of the loaded video source.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	total: PropTypes.number
};

TimesBase.defaultProps = {
	current: 0,
	total: 0
};

const Times = memo(TimesBase);

export default Times;
export {
	Times,
	TimesBase
};
