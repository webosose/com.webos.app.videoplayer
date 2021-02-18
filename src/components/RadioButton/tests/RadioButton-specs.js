'use strict';
import {RadioButtonBase} from '../RadioButton';
import React from 'react';
import {mount} from 'enzyme';

describe('RadioButton', () => {
	it('should have \'Icon\' when \'icon\' prop is provided', () => {
		const expected = 'circle';
		const button = mount(
			<RadioButtonBase icon={expected}>
				{expected}
			</RadioButtonBase>);
		const actual = button.find('RadioButtonBase').prop('icon');
		expect(actual).toBe(expected);
	});
	it('should have \'item\' when \'children\' prop is provided', () => {
		const expected = 'RadioButton';
		const button = mount(
			<RadioButtonBase >
				{expected}
			</RadioButtonBase>);
		const actual = button.find('RadioButtonBase').prop('children');
		expect(actual).toBe(expected);
	});
	it('should have \'True\' when \'disabled\' prop is provided', () => {
		const expected = true;
		const button = mount(
			<RadioButtonBase disabled>
				RadioButton
			</RadioButtonBase>);
		const actual = button.find('RadioButtonBase').prop('disabled');
		expect(actual).toBe(expected);
	});
	it('should have \'False\' when \'disabled\' prop is not provided',  () => {
		const button = mount(<RadioButtonBase>RadioButton</RadioButtonBase>);
		expect(button.find('RadioButtonBase').prop('disabled')).toBeFalsy();
	});
	it('should have default \'size is small\' when \'size\' prop is not provided', function () {
		const button = mount(<RadioButtonBase />);
		expect(button.find('RadioButtonBase').prop('size')).toBeFalsy();
	});
	it('should have \'size is large\' when \'size="large"\' prop is provided', function () {
		const button = mount(<RadioButtonBase size="large" />);
		expect(button.find('RadioButtonBase').prop('size')).toBeTruthy();
	});
	it('should have \'True\' when \'slot\' prop is provided', function () {
		const button = mount(<RadioButtonBase slot="slotBefore" />);
		expect(button.find('RadioButtonBase').prop('slot')).toBeTruthy();
	});
	it('should have \'False\' when \'slot\' prop is not provided', function () {
		const button = mount(<RadioButtonBase />);
		expect(button.find('RadioButtonBase').prop('slot')).toBeFalsy();
	});
});
