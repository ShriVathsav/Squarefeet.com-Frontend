import React, { useState } from 'react'
import { Image, Segment, Divider, Icon, Button, Header } from 'semantic-ui-react'
import {Link} from "react-router-dom"

const InfoPageButton = (props) => {

    return (
        <div style={{textAlign: "center", height: "60vh", display: "flex", alignItems: "center", 
                justifyContent: "center", flexDirection: "column"}}>
            <Image src={props.icon} size="small" style={{display: "block", margin: "0 auto"}}/>
            <Header as="h3" style={{margin: 30}}>
                {props.message}
            </Header>
            <Button size="large" color="purple" as={Link} to={props.buttonLink} style={{padding: "11px 21px"}} >
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
                    <Image src={props.buttonIcon} style={{height: 35, width: 35, marginRight: 10}} />
                    <div>{props.buttonMessage}</div>
                </div>
            </Button>
        </div>
    )
}

export default InfoPageButton;