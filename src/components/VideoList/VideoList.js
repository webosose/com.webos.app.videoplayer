import React from 'react'
import PropTypes from 'prop-types';

import ImageItem from '../ImageItem';


const VideoList = ({videoList, handleNavigate}) => {
    return (
        videoList && videoList.map((item, index) => (
            <div key={`${item.title}-${index}`} onClick={() => {handleNavigate('/videoplayer', item)}}>
                <ImageItem title={item.title} thumbnail={item.thumbnail} />
            </div>
        ))
    )
}

VideoList.propTypes = {
    videoList: PropTypes.array,
    handleNavigate: PropTypes.func.isRequired
}

VideoList.default = {
    videoList: []
}


export default VideoList
