import React from 'react';
import {shallow} from 'enzyme';
import Image from '../Image';

describe('Image', () => {

	test('should display `title` prop', () => {
		const title = 'title';
		const subject = shallow(
			<Image title={title} />
		);
		const expected = title;
		const actual = subject.text();

		expect(actual).toBe(expected);
	});

	test('should display `secondary text` prop when provided', () => {
		const secondaryText = 'secondaryText';
		const title = 'title';
		const subject = shallow(
			<Image title={title} secondaryText={secondaryText} />
		);
		const expected = secondaryText;
		const actual = subject.find('.text').text();

		expect(actual).toBe(expected);
	});

	test('should not display `secondary text` prop when not provided', () => {

		const title = 'title';
		const subject = shallow(
			<Image title={title} />
		);
		const actual = subject.find('.text');
		expect(actual).toHaveLength(0);
	});

	test('should support `vertical` styling when `type="vertical"`', () => {
		const title = 'title';
		const subject = shallow(
			<Image title={title} type="vertical" />
		);
		const actual = subject.find('.vertical_image_container');
		expect(actual).toHaveLength(1);
	});

	test('should omit `vertical` styling when `type="horizontal"`', () => {
		const title = 'title';
		const subject = shallow(
			<Image title={title} type="horizontal" />
		);
		const actual = subject.find('.vertical_image_container');
		expect(actual).toHaveLength(0);
	});

	test('should omit `.disabled` when `disabled` by default', () => {
		const title = 'title';
		const subject = shallow(
			<Image title={title} type="horizontal" />
		);

		const actual = subject.find('.disabled');
		expect(actual).toHaveLength(0);
	});

	test('should include `.disabled` when `disabled` prop is provided', () => {
		const title = 'title';
		const subject = shallow(
			<Image title={title} type="horizontal" disabled />
		);

		const actual = subject.find('.disabled');
		expect(actual).toHaveLength(1);
	});

	test('should include `.fill` as default when `sizing` prop is not provided', () => {
		const title = 'title';
		const subject = shallow(
			<Image title={title} type="horizontal" />
		);

		const actual = subject.find('.fill');
		expect(actual).toHaveLength(1);
	});

	test('should support `.fit` class when `sizing=fit` is provided', () => {
		const title = 'title';
		const subject = shallow(
			<Image title={title} sizing="fit" />
		);

		const actual = subject.find('.fit');
		expect(actual).toHaveLength(1);
	});
});
