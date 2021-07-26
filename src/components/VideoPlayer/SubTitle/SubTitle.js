import Menu from '../Menu';

const SubTitle = ({data, handleNavigate, handleSelect, position}) => {
	const menuLevel = data.level;
	const menuItems = data.items;

	return (!data.disable &&
	<Menu
		handleNavigate={handleNavigate}
		handleSelect={handleSelect}
		heading={menuLevel !== '' ? menuItems[menuLevel].children.heading : data.heading}
		list={menuLevel !== '' ? menuItems[menuLevel].children.items : menuItems}
		radioIndex={menuLevel !== '' && menuItems[menuLevel].children.index}
		subHeading={menuLevel !== '' ? menuItems[menuLevel].children.subHeading : ''}
		type={menuLevel !== '' ? menuItems[menuLevel].children.type : data.type}
		{...{position}}
	/>
	);
};

export default SubTitle;
