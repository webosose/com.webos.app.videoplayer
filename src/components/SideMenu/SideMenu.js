import React from 'react';

import css from './SideMenu.module.less';

const SideMenu = ({children}) => {
	return (
		<div className={css.container}>
			{children}
		</div>
	);
};

export default SideMenu;
