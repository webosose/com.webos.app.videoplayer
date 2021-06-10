import {IconButton} from '../IconButton';
import React from 'react';
import {mount} from 'enzyme';


describe('BaseIconButton', function () {
	it('should not be \'clickable\' when \'disabled\' prop is provided', function () {
		const iconButton = mount(<IconButton disabled />);
		expect(iconButton.find('IconButtonBase').prop('disabled')).toBeTruthy();
	});
	it('should be \'clickable\' when \'disabled\' prop is not provided', function () {
		const iconButton = mount(<IconButton />);
		expect(iconButton.find('IconButtonBase').prop('disabled')).toBeFalsy();
	});
	it('should be \'False\' when \'selected\' prop is not provided', function () {
		const iconButton = mount(<IconButton />);
		expect(iconButton.find('IconButtonBase').prop('selected')).toBeFalsy();
	});
	it('should be \'True\' when \'selected\' prop is  provided', function () {
		const iconButton = mount(<IconButton selected />);
		expect(iconButton.find('IconButtonBase').prop('selected')).toBeTruthy();
	});
	it('Renders \'transparent\' when backgroundOpacity is transparent', function () {
		const expected = 'transparent';
		const iconButton = mount(
			<IconButton backgroundOpacity={expected} />);
		const actual = iconButton.find('IconButtonBase').prop('backgroundOpacity');
		expect(actual).toBe(expected);
	});
	it('Renders \'opaque\' when backgroundOpacity is opaque', function () {
		const expected = 'opaque';
		const iconButton = mount(
			<IconButton backgroundOpacity={expected} />);
		const actual = iconButton.find('IconButtonBase').prop('backgroundOpacity');
		expect(actual).toBe(expected);
	});
	it('Renders \'small\'  button when size is small', function () {
		const expected = 'small';
		const iconButton = mount(
			<IconButton size={expected} />);
		const actual = iconButton.find('IconButtonBase').prop('size');
		expect(actual).toBe(expected);
	});
	it('Renders \'large\'  button when size is large', function () {
		const expected = 'large';
		const iconButton = mount(
			<IconButton size={expected} />);
		const actual = iconButton.find('IconButtonBase').prop('size');
		expect(actual).toBe(expected);
	});
});
