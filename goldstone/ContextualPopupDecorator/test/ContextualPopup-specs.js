import React from 'react';
import {mount} from 'enzyme';
import {ContextualPopup} from './../ContextualPopup';
import {ContextualPopupArrow} from './../ContextualPopup';
import ri from '@enact/ui/resolution';

describe('Contextual popup component', () => {
	it('Contextual popup  renders as expected!!!', () => {
		const wrapper = mount(
			<ContextualPopup style={{textAlign: 'center', marginTop: ri.unit(198, 'rem')}} showArrow>
				{['Option 1', 'Option 2']}
			</ContextualPopup>);
		expect(wrapper).toMatchSnapshot();
	});
	it('ContextualPopupArrow component is loaded when showArrow is true', () => {
		const wrapper = mount(
			<ContextualPopup style={{textAlign: 'center', marginTop: ri.unit(198, 'rem')}} showArrow >
				{['Option 1', 'Option 2']}
			</ContextualPopup>);
		expect(wrapper.find('ContextualPopupArrow').length).toBe(1);
	});
	it('ContextualPopupArrow component is not loaded when showArrow is false', () => {
		const wrapper = mount(
			<ContextualPopup style={{textAlign: 'center', marginTop: ri.unit(198, 'rem')}}>
				{['Option 1', 'Option 2']}
			</ContextualPopup>);
		expect(wrapper.find('ContextualPopupArrow').length).toBe(0);
	});
	it('Contextual popup always render Skinnable div', () => {
		const wrapper = mount(
			<ContextualPopup style={{textAlign: 'center', marginTop: ri.unit(198, 'rem')}}>
				{['Option 1', 'Option 2']}
			</ContextualPopup>);
		expect(wrapper.find('Skinnable').length).toBe(1);
	});
});

describe('ContextualPopupArrow  component', () => {
	it('ContextualPopupArrow  renders as expected!!!', () => {
		const wrapper = mount(<ContextualPopupArrow direction="below" />);
		expect(wrapper).toMatchSnapshot();
	});
	it('ContextualPopupArrow  component always return svg component', () => {
		const wrapper = mount(<ContextualPopupArrow direction="below" />);
		expect(wrapper.find('svg').length).toBe(1);
	});
});
