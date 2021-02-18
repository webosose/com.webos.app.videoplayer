import React from 'react';
import {shallow} from 'enzyme';
import Slider from './../Slider';

describe('Slider', () => {

	const onActivate = jest.fn();
	const onChange = jest.fn();

	it('activateOnSelect is false', () => {
		const slider = shallow(
			<Slider
				activateOnSelect={false}
				backgroundProgress={0.5}
				disabled={false}
				knobStep={1}
				max={10}
				min={0}
				noFill={false}
				onActivate={onActivate}
				onChange={onChange}
				orientation={'horizontal'}
				step={1}
			/>
		);
		const value = slider.find('SliderBehaviorDecorator').prop('activateOnSelect');
		expect(value).toBeFalsy();
	});

	it('backgroundProgress is undefined by default', () => {
		const slider = shallow(
			<Slider />
		);

		const value = slider.find('SliderBehaviorDecorator').prop('backgroundProgress');
		expect(value).toBe(undefined);
	});

	it('orientation  is horizontal by default', () => {
		const slider = shallow(
			<Slider />
		);

		const value = slider.find('SliderBehaviorDecorator').prop('orientation');
		expect(value).toBe('horizontal');
	});

});
