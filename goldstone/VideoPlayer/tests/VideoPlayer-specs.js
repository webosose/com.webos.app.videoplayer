import React from 'react';
import {shallow} from 'enzyme';
import {VideoPlayer} from '../VideoPlayer';

describe('VideoPlayer', () => {
	test(
		'should render `Video Player`',
		() => {
			const subject = shallow(
				<VideoPlayer />
			);
			const videoWrapper = subject.find('.videoPlayer');
			const expected = true;
			const actual = videoWrapper.exists();
			expect(expected).toBe(actual);
		}
	);

	test(
		'should render `video`',
		() => {
			const subject = shallow(
				<VideoPlayer />
			);
			const videoWrapper = subject.find('.videoPlayer');

			let videoPlayer =  videoWrapper.children().children();
			const expected = 3;
			const actual = videoPlayer.length;

			expect(expected).toBe(actual);
		}
	);
});
