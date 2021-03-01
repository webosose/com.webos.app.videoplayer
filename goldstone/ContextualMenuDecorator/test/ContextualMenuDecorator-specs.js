import React from 'react';
import {shallow} from 'enzyme';
import ContextualMenuDecorator from './../ContextualMenuDecorator';

describe('Contextual popup component', () => {
	let ContextualMenu;
	beforeEach(() => {
		const mockedComponent = jest.fn();
		ContextualMenu = ContextualMenuDecorator(mockedComponent);
	});
	const popupProps = {
		style: {width: '1000px'}
	};
	it('Contextual menu  renders as expected!!!', () => {
		const wrapper = shallow(<ContextualMenu
			popupProps={popupProps}
			menuItems={['Option 1', 'Option 2']}
			direction={'below'}
		>
			Contextual Button
		</ContextualMenu>);
		expect(wrapper).toMatchSnapshot();
	});
	it('Contextual menu enable by default', () => {
		const wrapper = shallow(<ContextualMenu
			popupProps={popupProps}
			menuItems={['Option 1', 'Option 2']}
			direction={'below'}
		>
			Contextual Button
		</ContextualMenu>);
		const value = wrapper.find('PureComponent').prop('disabled');
		expect(value).toBeFalsy();
	});

	it('Contextual menu is not open by default', () => {
		const wrapper = shallow(<ContextualMenu
			popupProps={popupProps}
			menuItems={['Option 1', 'Option 2']}
			direction={'below'}
		>
			Contextual Button
		</ContextualMenu>);
		const value = wrapper.find('PureComponent').prop('open');
		expect(value).toBeFalsy();
	});
});
