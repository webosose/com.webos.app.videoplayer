import React from 'react';
import {mount} from 'enzyme';
import ProgressBarComponent from '../ProgressBarComponent';
import componentCss from '../ProgressBarComponent.module.less';
import classNames from 'classNames';

describe('ProgressBarComponent Specs', () => {
	test('should only show tooltip/Component override component when tooltip is true', () => {
		const progressBar = mount(
			<ProgressBarComponent
				tooltip
				backgroundProgress={0.4}
				orientation={'horizontal'}
				progress={0.8}
				css={componentCss}
				className={classNames({[componentCss.progressBar]: true})}
			/>
		);
		const expected = 1;
		const actual = progressBar.find('ComponentOverride').length;
		expect(actual).toBe(expected);
	});
	test('counting number of divs in component', () => {
		const progressBar = mount(
			<ProgressBarComponent
				tooltip
				backgroundProgress={0.4}
				orientation={'horizontal'}
				progress={0.8}
				css={componentCss}
				className={classNames({
					[componentCss.progressBar]: true
				})}
			/>
		);
		expect(progressBar.find('div').length).toEqual(4);
	});
});
