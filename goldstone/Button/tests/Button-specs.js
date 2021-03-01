'use strict';
import {ButtonBase} from '../Button';
import React from 'react';
import {shallow} from 'enzyme';

describe('Button', function () {
	it('should have \'False\' when \'disabled\' prop is  not provided', function () {
		const button = shallow(<ButtonBase />);
		expect(button.find('ButtonBase').prop('disabled')).toBeFalsy();
	});
	it('should have \'True\' when \'disabled\' prop is provided', function () {
		const button = shallow(<ButtonBase disabled />);
		expect(button.find('ButtonBase').prop('disabled')).toBeTruthy();
	});
	it('should have \'False\' when \'selected\' prop is not provided', function () {
		const button = shallow(<ButtonBase />);
		expect(button.find('ButtonBase').prop('selected')).toBeFalsy();
	});
	it('should not have \'Icon\' when \'iconOnly\' prop is not provided', function () {
		const button = shallow(<ButtonBase />);
		expect(button.find('ButtonBase').prop('iconOnly')).toBeFalsy();
	});
	it('should have \'Search Icon\' when \'icon\' prop is provided', function () {
		const button = shallow(<ButtonBase icon="search" />);
		expect(button.find('ButtonBase').prop('icon')).toBeTruthy();
	});
	it('should not have \'Search Icon\' when \'icon\' prop is not provided', function () {
		const button = shallow(<ButtonBase />);
		expect(button.find('ButtonBase').prop('icon')).toBeFalsy();
	});
	it('should have default \'iconPosition is before\' when \'iconPosition\' prop is provided', function () {
		const button = shallow(<ButtonBase />);
		expect(button.find('ButtonBase').hasClass('iconPosition')).toBeTruthy();
	});
});
