/**
 * Provides components for displaying and controlling marqueed text.
 *
 * @example
 * <Marquee marqueeOn="render">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Marquee>
 *
 * @see ui/Marquee
 * @module Goldstone/Marquee
 * @exports Marquee
 * @exports MarqueeBase
 * @exports MarqueeController
 * @exports MarqueeDecorator
 */

import {forProp, forward, handle, stop} from '@enact/core/handle';
import generateClassNames from '../../util/generateClassNames';
import classNames from 'classnames';

import React from 'react';
import PropTypes from 'prop-types';

import componentCss from './Marquee.module.less';

const isEventSource = (ev) => ev.target === ev.currentTarget;

/*
* Function to handle marquee onTransitionEnd
*/
const onMarqueeComplete = handle(
	forProp('animating', true),
	isEventSource,
	stop,
	(ev, props) => forward('onMarqueeComplete', {type: 'onMarqueeComplete'}, props)
).finally(() => {
	console.log('This will log at the end no matter what happens within the handler above');
});

class MarqueeBase extends React.PureComponent {
	constructor () {
		super();
		this.handleMarqueeComplete = onMarqueeComplete.bind(this);
	}

	/*
	* Function to add aria-label property in to parent div
	*/
	ariaLabel = ({'aria-label': aria, children, distance, willAnimate}) => {
		if (aria == null && willAnimate && distance > 0) {
			return React.Children.map(children, c => typeof c === 'string' && c)
				.filter(Boolean)
				.join(' ') || aria;
		} else {
			return aria;
		}
	};

	/*
	* Function to add basic animation style classes using generateClassNames method
	*/
	appendClassName = ({animating, willAnimate}) => {
		return classNames(generateClassNames(componentCss, {
			animate: (!!animating),
			text: true,
			willAnimate: (!!willAnimate)
		}));
	};

	/*
	* Function to add following styles in to div
	* --ui-marquee-spacing: The spacing node used between the repeated content(PropTypes.number)
	* direction: `'rtl`' or `'ltr`'
	* textAlign: `'left`' or `'right`' Or `'center`'
	* textOverflow: `'clip'` or `'ellipsis'`
	* transitionDuration: PropTypes.number
	*/
	clientStyle = ({alignment, animating, distance, overflow, rtl, spacing, speed}) => {
		// If the components content directionality doesn't match the context, we need to set it
		// inline
		const direction = rtl ? 'rtl' : 'ltr';
		const sideProperty = rtl ? 'left' : 'right';
		const style = {
			'--ui-marquee-spacing': spacing,
			direction,
			textAlign: alignment,
			textOverflow: overflow
		};

		if (animating) {
			const duration = distance / speed;

			style[sideProperty] = `${distance}px`;
			style.transitionDuration = `${duration}s`;
		} else {
			style[sideProperty] = 0;
		}

		return style;
	};

	/*
	* Function to check whether the animation loop should continue or not
	*/
	duplicate = ({distance, willAnimate}) => {
		return willAnimate && distance > 0;
	};

	/*
	* Function to add --ui-marquee-offset propery in to marquee content
	*/
	applyOffset = (node) => {
		const {distance, spacing, rtl} = this.props;
		if (!node || !global.IntersectionObserver) return;

		const root = node.parentNode;
		new global.IntersectionObserver(function (entries, observer) {
			const {left, right} = entries[0].boundingClientRect;
			const {left: rootLeft, right: rootRight} = entries[0].rootBounds;

			const textWidth = rtl ? rootRight - right : left - rootLeft;
			const offset = distance - (textWidth + spacing);

			node.style.setProperty('--ui-marquee-offset', offset);

			observer.disconnect();
		}, {root}).observe(node);
	};

	render () {
		const {className, children, clientRef, ...rest} = this.props;
		delete rest.alignment;
		delete rest.animating;
		delete rest.distance;
		delete rest.onMarqueeComplete;
		delete rest.overflow;
		delete rest.rtl;
		delete rest.spacing;
		delete rest.speed;
		delete rest.willAnimate;

		return (
			<div
				{...rest}
				aria-label={this.ariaLabel(this.props)}
				className={classNames({
					[className]: true,
					[componentCss.marquee]: true
				})
				}
			>
				<div
					className={classNames({
						[this.appendClassName(this.props)]: true
					})
					}
					ref={clientRef}
					style={this.clientStyle(this.props)}
					onTransitionEnd={this.handleMarqueeComplete}
				>
					{children}
					{this.duplicate(this.props) ? (
						<React.Fragment>
							<div
								className={
									classNames({
										[className]: true,
										[componentCss.spacing]: true
									})
								}
								ref={this.applyOffset}
							/>
							{children}
						</React.Fragment>
					) : null}
				</div>
			</div>
		);
	}
}

MarqueeBase.propTypes = /** @lends ui/Marquee.MarqueeBase.prototype */ {

	/**
	 * Text alignment value of the marquee
	 *
	 * Valid values are:
	 *
	 * * `'left'`,
	 * * `'right'`, and
	 * * `'center'`
	 *
	 * @type {String}
	 * @public
	 */
	alignment: PropTypes.oneOf(['left', 'right', 'center']),

	/**
	 * Applies animating styles such as removing the ellipsis.
	 *
	 * @type {Boolean}
	 * @public
	 */
	animating: PropTypes.bool,

	/**
	 * Sets the value of the `aria-label` attribute for the wrapped component.
	 *
	 * @memberof ui/Marquee.MarqueeBase.prototype
	 * @type {String}
	 * @public
	 */
	'aria-label': PropTypes.string,

	/**
	 * The text or a set of components that should be marqueed
	 *
	 * This prop may be empty in some cases, which is OK.
	 *
	 * @type {Node}
	 * @public
	 */
	children: PropTypes.node,

	/**
	 * Called when mounting or unmounting with a reference to the client node
	 *
	 * @type {Function}
	 * @public
	 */
	clientRef: PropTypes.func,

	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal Elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `marquee` - The root component class
	 * * `animate` - Applied to the inner content node when the text is animating
	 * * `spacing` - The spacing node used between the repeated content
	 * * `text` - The inner content node
	 * * `willAnimate` - Applied to the inner content node shortly before animation
	 *
	 * @type {Object}
	 * @public
	 */
	css: PropTypes.object,

	/**
	 * Distance to animate the marquee
	 *
	 * Usually, the `distance` is the width of the text minus the width of the container
	 *
	 * @type {Number}
	 * @public
	 */
	distance: PropTypes.number,

	/**
	 * Called when the marquee completes its animation
	 *
	 * @type {Function}
	 * @public
	 */
	onMarqueeComplete: PropTypes.func,

	/**
	 * Text overflow setting. Either `'clip'` or `'ellipsis'`
	 *
	 * @type {('clip'|'ellipsis')}
	 * @public
	 */
	overflow: PropTypes.oneOf(['clip', 'ellipsis']),

	/**
	 * `true` if the directionality of the content is right-to-left
	 *
	 * @type {Boolean}
	 * @public
	 * @default false
	 */
	rtl: PropTypes.bool,

	/**
	 * Amount of spacing, in pixels, between the instances of the content
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	spacing: PropTypes.number,

	/**
	 * Speed of marquee animation in pixels/second.
	 *
	 * @type {Number}
	 * @public
	 */
	speed: PropTypes.number,

	/**
	 * Indicates the marquee will animate soon.
	 *
	 * Should be used by the component to prepare itself for animation such as promoting
	 * composite layers for improved performance.
	 *
	 * @type {Boolean}
	 * @public
	 * @default false
	 */
	willAnimate: PropTypes.bool
};

MarqueeBase.defaultProps = {
	spacing: 0,
	rtl: false,
	willAnimate: false
};

export default MarqueeBase;
export {
	MarqueeBase
};
