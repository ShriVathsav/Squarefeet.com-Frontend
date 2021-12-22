import React, { useState } from 'react'
import { Menu, Segment, Container, Image, Button } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import {Link} from 'react-router-dom'
import Authentication from "../Authentication/Authentication"
import "./SideDrawer.css"

const style = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.5,
    zIndex: 100,
    height: "100%",
    width: "100%"
}

const BackDrop = (props) => {

    const [sideBarOpen, setSideBarOpen] = props.sideBarOpenProps

    return (
        <div id="backdrop" style={{...style}} onClick={() => setSideBarOpen(prev => !prev)}>
        </div>
    )
}

export default BackDrop;