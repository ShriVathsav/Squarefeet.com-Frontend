import React, { useState } from 'react'
import { Menu, Segment, Icon, Image, Button, Modal, Header } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import {Link} from 'react-router-dom'
import Authentication from "../Authentication/Authentication"
import AithDup from "../Authentication/AithDup"
import SideDrawer from "./SideDrawer"
import hamburgerMenu from "../ColorIcons/hamburgerMenu.svg"
import "./NavBar.css"

const Footer = (props) => {

    return (
        <Segment color="olive" inverted style={{borderRadius: 0, padding: 25, width: "100%", marginTop: 30}}>
                <div id="menu" >
                    <div style={{width: "100%"}}>
                        <Link to="/">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <Image src={mainIcon} size="mini" style={{marginRight: 7}}/>
                                <div style={{display: "flex", alignItems: "flex-end", color: "white"}}>
                                    <span style={{fontSize: 25, fontWeight: 700}}>SquareFeet</span>
                                    <span style={{fontSize: 16}}>.com</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div style={{marginTop: 14, textAlign: "center", fontSize: 16, fontWeight: 700}}>
                        Made with <Icon color="red" name="heart" /> by Shrivaathsav S
                    </div>
                    <div style={{marginTop: 14, textAlign: "center", fontSize: 16, fontWeight: 700}}>
                        Copyrights <Icon color="purple" name="copyright" />{new Date().getFullYear()} SquareFeet.com. All Rights are Reserved.
                    </div>
                </div>
        </Segment>
    )
}

export default Footer;