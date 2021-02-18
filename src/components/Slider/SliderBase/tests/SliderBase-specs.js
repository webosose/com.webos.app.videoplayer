import ComponentOverride from '@enact/ui/ComponentOverride';
import React from 'react';
import {mount} from 'enzyme';
import {SliderBase} from './../SliderBase';
import ProgressBar from './../../../ProgressBar/ProgressBarBase/ProgressBarBase';
import componentCss from '../ProgressBarComponent.module.less';
import {ProgressBarTooltip} from './../../../ProgressBar';

describe('SliderBase component', () => {

	it('SliderBase renders as expected!!!', () => {
		const wrapper = mount(
			<SliderBase
				disabled={false}
				css={componentCss}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);
		expect(wrapper).toMatchSnapshot();
	});

	it('the sliderbar is disabled ', () => {
		const wrapper = mount(
			<SliderBase
				disabled={false}
				css={componentCss}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('.slider').prop('disabled');
		expect(value).toBeFalsy();
	});

	it('the sliderbar is enable ', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('.slider').prop('disabled');
		expect(value).toBeTruthy();
	});

	it('the orientation is horizontal ', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('orientation');
		expect(value).toBe('horizontal');
	});
	it('the orientation is vertical', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('orientation');
		expect(value).toBe('vertical');
	});

	it('the noFill value is false', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('noFill');
		expect(value).toBeFalsy();
	});


	it('the noFill value is true', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('noFill');
		expect(value).toBeTruthy();
	});

	it('the min value is zero by default', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('min');
		expect(value).toBe(0);
	});

	it('the max value is 100 by default', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('max');
		expect(value).toBe(100);
	});

	it('the max value is 50', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				max={50}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('max');
		expect(value).toBe(50);
	});

	it('the min value is 50', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				min={50}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('min');
		expect(value).toBe(50);
	});

	it('default value of progressAnchor is zero ', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				min={50}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('progressAnchor');
		expect(value).toBe(0);
	});

	it('the value of progressAnchor is 50 ', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				progressAnchor={50}
				min={50}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('progressAnchor');
		expect(value).toBe(50);
	});

	it('by default the value of step is 1 ', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				progressAnchor={50}
				min={50}
				noFill
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('step');
		expect(value).toBe(1);
	});

	it('by default the value of step is 50 ', () => {
		const wrapper = mount(
			<SliderBase
				disabled
				css={componentCss}
				orientation={'vertical'}
				progressAnchor={50}
				min={50}
				noFill
				step={50}
				progressBarComponent={
					<ProgressBar
						css={componentCss}
					/>
				}
				tooltipComponent={
					<ComponentOverride
						component={ProgressBarTooltip}
						visible
					/>
				}
			/>


		);

		const value = wrapper.find('SliderBase').prop('step');
		expect(value).toBe(50);
	});

});
