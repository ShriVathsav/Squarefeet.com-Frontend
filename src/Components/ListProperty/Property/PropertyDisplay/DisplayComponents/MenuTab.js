import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom"
import {Grid, Menu} from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link'
import {PropertyDisplayContext} from "../../../../PropertyDisplayContext"

const MenuTab = (props) => {

    const {activeMenuProps, propertyDetailsHeightProps, featuresHeightProps, locationDetailsHeightProps, 
        ownerDetailsHeightProps} = useContext(PropertyDisplayContext)

    const [activeMenu, setActiveMenu] = activeMenuProps

    const handleItemClick = (name) => {
        setActiveMenu(name)
    }
    
    return(
        <Menu pointing secondary size="large" id="main-menu" >
            <Menu.Item active={activeMenu === 'PropertyDetails'} style={{maxWidth: "25%", textAlign: "center", display: "flex", justifyContent: "center"}}
                    onClick={() => handleItemClick("PropertyDetails")} id="menu-font">
                <div>PROPERTY DETAILS</div>
            </Menu.Item>
            <Menu.Item active={activeMenu === 'Features'} style={{maxWidth: "25%", textAlign: "center", display: "flex", justifyContent: "center"}}
                    onClick={() => handleItemClick("Features")} id="menu-font">
                FEATURES
            </Menu.Item>
            <Menu.Item active={activeMenu === 'LocationDetails'} style={{maxWidth: "25%", textAlign: "center", display: "flex", justifyContent: "center"}}
                    onClick={() => handleItemClick("LocationDetails")} id="menu-font">
                LOCATION DETAILS
            </Menu.Item>
            <Menu.Item active={activeMenu === 'OwnerDetails'} style={{maxWidth: "25%", textAlign: "center", display: "flex", justifyContent: "center"}}
                    onClick={() => handleItemClick("OwnerDetails")} id="menu-font">
                CONTACT DETAILS
            </Menu.Item>
        </Menu>
    )
}

export default MenuTab;