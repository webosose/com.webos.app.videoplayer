'use strict';
import {Button} from '../BaseButton';
import React from 'react';
import {shallow} from 'enzyme';


describe('Button', function () {
	it('should not be \'clicked\' the button when \'disabled\' prop is provided', function () {
		const button = shallow(<Button disabled />);
		expect(button.find('ButtonBase').prop('disabled')).toBeTruthy();
	});
	it('should be \'clicked\' the button when \'disabled\' prop is not provided', function () {
		const button = shallow(<Button />);
		expect(button.find('ButtonBase').prop('disabled')).toBeFalsy();
	});
	it('should have \'False\' when \'selected\' prop is not provided', function () {
		const button = shallow(<Button />);
		expect(button.find('ButtonBase').prop('selected')).toBeFalsy();
	});
	it('should have \'False\' when \'pressed\' prop is not provided', function () {
		const button = shallow(<Button />);
		expect(button.find('ButtonBase').prop('pressed')).toBeFalsy();
	});
	it('should have \'True\' when \'pressed\' prop is provided', function () {
		const button = shallow(<Button pressed />);
		expect(button.find('ButtonBase').prop('pressed')).toBeTruthy();
	});
	it('should have \'True\' when \'minWidth\' prop is not provided', function () {
		const button = shallow(<Button />);
		expect(button.find('ButtonBase').prop('minWidth')).toBeTruthy();
	});
	it('should have \'False\' when \'minWidth\' prop is provided', function () {
		const button = shallow(<Button minWidth={false} />);
		expect(button.find('ButtonBase').prop('minWidth')).toBeFalsy();
	});
});
