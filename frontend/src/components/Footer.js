import React from 'react'


const footerStyle = {
    position: "fixed",
    left: "0",
    bottom: "0",
    backgroundColor: "black",
    color: "white",
    width: "100%",
    textAlign: "center",
    padding: "15px",
    height: "55px"
}

export default function Footer() {

    let year = new Date().getFullYear();

    return (
        <div>
            <div style={footerStyle} className=' pb-3'>
                <p>{year} - All rights are reversed - DHARMENDRA PRAJAPATI</p>
            </div>
        </div>
    )
}
