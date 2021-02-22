import Marquee from '../Marquee';
import React from 'react';

import css from './ImageItem.module.less';

const ImageItem = ({title, thumbnail}) => {
	return (
		<>
			<div className={css.container}>
				<img src={thumbnail} className={css.thumbnail} alt="thumbnail" />
			</div>
			<Marquee marqueeOn="render" className={css.titleText} alignment="center">{title}</Marquee>
		</>
	);
};

export default ImageItem;
