import React from 'react'

export const Pdf = (props) => {

    console.log(props)
    

    return (
        <div style={{position: 'absolute', width:'100%', height: '100%'}}>
            <object 
                        width="100%" 
                        height="100%" 
                        target="_blank"
                        data={props.url} 
                        type="application/pdf"
            />
        </div>
    )
}
