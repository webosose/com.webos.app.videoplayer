import React from 'react'
import PropTypes from 'prop-types';
import mscLogo from '../../../assets/icons/msc.svg';
import storageLogo from '../../../assets/icons/storage.svg';
import css from './DeviceList.module.less';

const DeviceList = ({deviceList, handleAction}) => {
    return (
            deviceList && deviceList.length > 0 && deviceList.map((parentItem, parentIndex) => (
                parentItem && parentItem.deviceList.length > 0 && parentItem.deviceList.map((childItem, childIndex) => {
                    return (
                        <div key={`${parentItem.uri}-${childIndex}-${parentIndex}`} onClick={() => handleAction(childItem.uri)} className={css.container}>
                            <div>
                                <img src={parentItem.uri === 'msc' ? mscLogo : storageLogo} alt="thumbnail" />
                            </div>
                            <div className={css.rightContainer}>{childItem.name}</div>
                        </div>
                    )
                })
            ))
    )
}

DeviceList.propTypes = {
    deviceList: PropTypes.array,
    handleAction: PropTypes.func.isRequired
}

DeviceList.default = {
    deviceList: []
}

export default DeviceList;
