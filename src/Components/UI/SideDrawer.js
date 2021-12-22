import React, { useState, useContext } from 'react'
import { Menu, Header, Dropdown, Image, Icon } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import userIcon from "../ColorIcons/userIcon-2.svg"
import {Link} from 'react-router-dom'
import Authentication from "../Authentication/Authentication"
import "./SideDrawer.css"
import BackDrop from "./BackDrop"
import {ViewContext} from "../ViewContext"
import PortalMain from "./PortalMain"
import viewIcon from "../../static/Icons/GeneralIcons/viewPropertyIcon.svg"
import loginIcon from "../../static/Icons/GeneralIcons/loginIcon.svg"
import searchPropertyIcon from "../../static/Icons/GeneralIcons/searchPropertyIcon.svg"
import postPropertyIcon from "../../static/Icons/GeneralIcons/postPropertyIcon.svg"

const SideDrawer = (props) => {

    const {authenticatedUserProps} = useContext(ViewContext)
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps
    
    const portalOpenProps = useState(false)
    const [portalOpen, setPortalOpen] = portalOpenProps
    const [sideBarOpen, setSideBarOpen] = props.sideBarOpenProps

    const trigger = (
        <span>
            <span style={{fontSize: 17, fontWeight: 700, marginRight: 4}}>
                Hello {authenticatedUser.first_name + " " + authenticatedUser.last_name}
            </span>
        </span>
    )

    const authTrigger = (
        <Menu.Item id="drawer-items" link >
            <div style={{display: "flex", alignItems: "center"}}>
                <Image src={loginIcon} style={{height: 35, width: 35, marginRight: 15}} />
                <div>LOGIN / REGISTER</div>
            </div>
        </Menu.Item>
    )

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
        <div>
            <BackDrop sideBarOpenProps={props.sideBarOpenProps}/>
            <PortalMain {...portalProps} />
            <div id="side-drawer" style={{padding: 0}}>
                <Menu style={{border: "none", borderRadius: 0}} vertical fluid>
                    <Menu.Item>
                        <Image src={mainIcon}
                            style={{marginLeft: "auto", marginRight: "auto", width: 70}} />
                    </Menu.Item>
                    {
                        (!!authenticatedUser && Object.keys(authenticatedUser).length === 0) ?
                        <>
                            <Menu.Item style={{textAlign: "center", width: "100%", fontSize: 20}}>
                                You are not Signed In
                            </Menu.Item>
                            <Authentication trigger={authTrigger} />
                        </>
                        :
                        <>
                            <Menu.Item style={{justifyContent: "center", width: "100%"}}>
                                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}} >
                                <Image avatar src={userIcon} style={{width: 45, height: 45, marginBottom: 15}}/>
                                <Dropdown inline trigger={trigger}>                                    
                                    <Dropdown.Menu>                                            
                                        <Dropdown.Item key="profile" text="Account" icon="user" 
                                            onClick={() => setSideBarOpen(false)} as={Link} to={`/profile`} /> 
                                        <Dropdown.Item key="signout" text="Sign Out" icon="sign out" 
                                            onClick={() => {signOut(); }} />
                                    </Dropdown.Menu>
                                </Dropdown>
                                </div>
                            </Menu.Item>
                            <Menu.Item id="drawer-items" as={Link} to={"/profile"} onClick={() => setSideBarOpen(false)} link>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src={viewIcon} style={{height: 35, width: 35, marginRight: 15}} />
                                    <div>VIEW PROFILE</div>
                                </div>
                            </Menu.Item>
                            <Menu.Item id="drawer-items" onClick={() => signOut()} link>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src={loginIcon} style={{height: 35, width: 35, marginRight: 15}} />
                                    <div>SIGN OUT</div>
                                </div>
                            </Menu.Item>
                        </>
                    }
                    <Menu.Item id="drawer-items" as={Link} to={"/"} onClick={() => setSideBarOpen(false)} link>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src={searchPropertyIcon} style={{height: 35, width: 35, marginRight: 15}} />
                            <div>SEARCH PROPERTY</div>
                        </div>
                    </Menu.Item>
                    <Menu.Item id="drawer-items" as={Link} to={"/post-property"} onClick={() => setSideBarOpen(false)} link>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src={postPropertyIcon} style={{height: 35, width: 35, marginRight: 15}} />
                            <div>POST PROPERTY</div>
                        </div>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default SideDrawer;