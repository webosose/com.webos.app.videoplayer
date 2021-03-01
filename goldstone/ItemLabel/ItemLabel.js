import React, {useState} from 'react'
import classes from './ItemLabel.module.less';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

export default function ItemLabel({items, iconType, ...rest}) {

    const [selectedList, setSelectedList] = useState(false);
    const [index, setindex] = useState(null);

    const onClickListItem = (index) => {
        setSelectedList(true);
        setindex(index);
    }
    
    return (
        <div className={classes.itemLabel}>
            <ul className={classes.list}>
            {items.map((item, indx) => (<li className={
                classNames({[classes.listItem] : true, [classes.selected]:selectedList && indx == index,[classes.disabled]:item.disabled})
                } key={indx} onClick={() => onClickListItem(indx)}>
                <span className={classes.listItemName}>{item.name}</span>
                {item.secondary && <span className={classes.listItemSecondary}>{item.secondary}</span>}
                <span className={classes.selectedIcon}><Icon size='small' className={classes.icon}>check</Icon></span>
                </li>) )}
            </ul>
           
        </div>
    )

}
