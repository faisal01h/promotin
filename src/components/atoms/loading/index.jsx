import React from 'react'
import "./loading.scss"

function Loading({top, color, addClass, ...rest}) {

    return(
        
        <div className={"lds-ellipsis "+addClass} {...rest}>
            <div style={{top: top, backgroundColor: color}}></div>
            <div style={{top: top, backgroundColor: color}}></div>
            <div style={{top: top, backgroundColor: color}}></div>
            <div style={{top: top, backgroundColor: color}}></div>
        </div>
        
    
    
    )

}

export default Loading