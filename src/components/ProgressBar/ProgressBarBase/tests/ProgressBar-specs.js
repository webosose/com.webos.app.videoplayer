import React from 'react';
import {mount, shallow} from 'enzyme';
import ProgressBar from '../ProgressBarBase';
import componentCss from './ProgressBarBase.module.less';
import classNames from 'classNames';

describe('ProgressBar Specs', () => {
	test('should have width of 0.5', () => {
		const progressBar = mount(
			<ProgressBar
				progress={0.5}
				css={componentCss}
				className={classNames({
					[componentCss.progressBar]: true
				})}
			/>
		);
		const style = progressBar.find(`.${componentCss.progressBar}`).at(1).prop('style');
		const expected = 0.5;
		const actual = style['--ui-progressbar-proportion-end'];
		expect(actual).toBe(expected);
	});
	test('should have background width of 0.75', () => {
		const progressBar = mount(
			<ProgressBar
				backgroundProgress={0.75}
				css={componentCss}
				className={classNames({
					[componentCss.progressBar]: true
				})}
			/>
		);
		const style = progressBar.find(`.${componentCss.progressBar}`).at(1).prop('style');
		const expected = 0.75;
		const actual = style['--ui-progressbar-proportion-end-background'];
		expect(actual).toBe(expected);
	});
	test('should have height of 0.5', () => {
		const progressBar = mount(
			<ProgressBar
				progress={0.5}
				orientation="vertical"
				css={componentCss}
				className={classNames({

					[componentCss.progressBar]: true

				})}
			/>
		);

		const style = progressBar.find(`.${componentCss.progressBar}`).at(1).prop('style');
		const expected = 0.5;
		const actual = style['--ui-progressbar-proportion-end'];
		expect(actual).toBe(expected);
	});
	test('should have background height of 0.75', () => {
		const progressBar = mount(
			<ProgressBar
				progress={0.5}
				backgroundProgress={0.75}
				orientation="vertical"
				css={componentCss}
				className={classNames({
					[componentCss.progressBar]: true
				})}
			/>
		);
		const style = progressBar.find(`.${componentCss.progressBar}`).at(1).prop('style');
		const expected = 0.75;
		const actual = style['--ui-progressbar-proportion-end-background'];
		expect(actual).toBe(expected);
	});
	it('should have \'False\' when \'disabled\' prop is  not provided', function () {
		const progressBar = shallow(<ProgressBar
			progress={0.5}
			backgroundProgress={0.75}
			orientation="vertical"
			css={componentCss}
			className={classNames({[componentCss.progressBar]: true})}
		/>);
		expect(progressBar.find(`.${componentCss.progressBar}`).prop('disabled')).toBeFalsy();
	});
	it('should have \'True\' when \'disabled\' prop is provided', function () {
		const progressBar = shallow(<ProgressBar
			disabled
			progress={0.5}
			backgroundProgress={0.75}
			orientation="vertical"
			css={componentCss}
			className={classNames({[componentCss.progressBar]: true})}
		/>);
		expect(progressBar.find(`.${componentCss.progressBar}`).prop('disabled')).toBeTruthy();
	});
});
