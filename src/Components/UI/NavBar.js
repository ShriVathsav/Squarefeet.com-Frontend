import React, { useState, useContext, useEffect } from 'react'
import { Menu, Segment, Container, Image, Button, Dropdown, Header, Divider, Icon, TransitionablePortal, Portal } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import {Link} from 'react-router-dom'
import Authentication from "../Authentication/Authentication"
import AithDup from "../Authentication/AithDup"
import SideDrawer from "./SideDrawer"
import hamburgerMenu from "../ColorIcons/hamburgerMenu.svg"
import "./NavBar.css"
import userIcon from "../ColorIcons/userIcon-2.svg"
import {ViewContext} from "../ViewContext"
import PortalMain from "./PortalMain"
import postPropertyIcon from "../../static/Icons/GeneralIcons/postPropertyIcon.svg"
import searchPropertyIcon from "../../static/Icons/GeneralIcons/searchPropertyIcon.svg"
import loginIcon from "../../static/Icons/GeneralIcons/loginIcon.svg"

const NavBar = (props) => {
    const [open, setOpen] = useState(false)
    
    const portalOpenProps = useState(false)
    const [portalOpen, setPortalOpen] = portalOpenProps

    const {authenticatedUserProps} = useContext(ViewContext)
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps
    
    const [sideBarOpen, setSideBarOpen] = props.sideBarOpenProps

    const trigger = (
        <Button color="purple" style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 21px"}} >
            <Image src={loginIcon} style={{height: 30, width: 30, marginRight: 10}} />
            <span>LOGIN / REGISTER</span>
        </Button>
    )

    const dropdownTrigger = (
        <Image avatar src={userIcon} style={{width: 45, height: 45, marginLeft: 5}}/>
    )

    const dropdownOptions = [
        { key: 'user', text: 'Account', icon: 'user' },
        { key: 'settings', text: 'Settings', icon: 'settings' },
        { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
    ]

    useEffect(() => console.log(authenticatedUser, sideBarOpen, "AUTHENTICATED USER"))

    const signOut = () => {
        localStorage.clear()
        setAuthenticatedUser({})
        setPortalOpen(true)
    }

    const portalProps = {
        portalOpenProps: portalOpenProps,
        icon: "sign-out",
        header: "Sign Out",
        message: "You have been logged out."
    }

    return (
        <Segment color="olive" inverted style={{borderRadius: 0, padding: "5px", position: "fixed", top: 0, width: "100%", zIndex: 120}}>
            <div style={{margin: "0px 16px"}}>
                <PortalMain {...portalProps} />
                <Menu color="olive" inverted secondary>
                    <Menu.Item>                      
                        <Link to={"/"}>
                            <div style={{display: "flex"}}>
                                <Image src={mainIcon} size="mini" style={{marginRight: 10}}/>
                                <div style={{display: "flex", alignItems: "flex-end"}}>
                                    <span style={{fontSize: 25, fontWeight: 700}}>SquareFeet</span>
                                    <span style={{fontSize: 16}}>.com</span>
                                </div>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Menu position='right' id="draw-button" >
                        <Menu.Item>
                            <Icon name="grid layout" onClick={() => setSideBarOpen(prev => !prev)}
                                size="big" style={{cursor: "pointer"}} />
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position='right' id="right-menu">
                        <Menu.Item as={Link} to={"/post-property"}>
                            <Button color="purple" style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 21px"}} >
                                <Image src={postPropertyIcon} style={{height: 30, width: 30, marginRight: 10}} />
                                <span>POST PROPERTY</span>
                            </Button>
                        </Menu.Item>
                        <Menu.Item as={Link} to={"/"} style={{margin: 0}}>
                            <Button color="purple" style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 21px"}} >
                                <Image src={searchPropertyIcon} style={{height: 30, width: 30, marginRight: 10}} />
                                <span>SEARCH PROPERTY</span>
                            </Button>
                        </Menu.Item>
                        <Menu.Item style={{padding: "0px 13px"}}>
                            {
                                (!!authenticatedUser && Object.keys(authenticatedUser).length === 0) ?
                                    <Authentication trigger={trigger}/>
                                :
                                    <Dropdown trigger={dropdownTrigger} icon={false}>                                    
                                        <Dropdown.Menu>                                            
                                            <Dropdown.Item key="profile" text="Account" icon="user" 
                                                as={Link} to={`/profile`} /> 
                                            <Dropdown.Item key="signout" text="Sign Out" icon="sign out" 
                                                onClick={signOut} />
                                        </Dropdown.Menu>
                                    </Dropdown>
                            }                            
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        </Segment>
    )
}

export default NavBar;