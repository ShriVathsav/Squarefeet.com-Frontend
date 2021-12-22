import React, { useState, Fragment, useRef } from 'react'
import { Rail, Sticky, Segment, Header, Image, Ref, Grid } from 'semantic-ui-react'
import SideDrawer from "./SideDrawer"
import NavBar from "./NavBar"
import "./NavBar.css"

const Layout = (props) => {
    const sideBarOpenProps = useState(false);
    const [sideBarOpen, setSideBarOpen] = sideBarOpenProps

    let contextRef = useRef()

    return (
        <Fragment>
            <NavBar sideBarOpenProps={sideBarOpenProps}/>
            {sideBarOpen && <SideDrawer sideBarOpenProps={sideBarOpenProps}/>}
        </Fragment>
    )
}

export default Layout;