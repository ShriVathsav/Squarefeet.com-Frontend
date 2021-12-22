import React, { useState } from 'react'
import { Image, Segment, Divider, Icon, Button, Header } from 'semantic-ui-react'
import {Link} from "react-router-dom"
import errorIcon from "../ColorIcons/MainIcon/error404.svg"
import errorIcon2 from "../ColorIcons/MainIcon/error404-2.svg"
import InfoPageButton from './InfoPages/InfoPageButton'
import homePageIcon from "../../static/Icons/GeneralIcons/homePageIcon.svg"

const Error404Page = (props) => {

    return (
        <div style={{textAlign: "center"}}>
            <InfoPageButton icon={errorIcon2} message="Uh Oh! It seems you are lost." 
                buttonLink="/" buttonIcon={homePageIcon} buttonMessage="GO TO HOMEPAGE" />
        </div>
    )
}

export default Error404Page;