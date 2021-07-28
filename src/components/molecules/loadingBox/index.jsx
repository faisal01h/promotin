import React from 'react'
import './loadingBox.scss'

const LoadingBox = ({ height, width, borderRadius, margin, addClass, ...rest }) => {

    if(borderRadius == "") {
        borderRadius = "7px";
    }

    return (
        <div style={{height: height, width: width, borderRadius: borderRadius, margin: margin}} className={"default-loadingbox "+addClass} {...rest}>

        </div>
    )
}

export default LoadingBox;