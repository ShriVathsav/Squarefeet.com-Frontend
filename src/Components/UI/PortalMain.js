import React, { useState } from 'react'
import { Portal, Segment, Divider, Icon, Button, Header } from 'semantic-ui-react'
import "./PortalMain.css"

const PortalMain = (props) => {

    const {portalOpenProps, icon, header, message} = props

    const [portalOpen, setPortalOpen] = portalOpenProps

    return (
        <Portal open={portalOpen} onOpen={() => setPortalOpen(true)} 
                onClose={() => setPortalOpen(false)} >
            <Segment id="portal-segment" >
                <div id="portal-header">
                    <Header icon={icon} content={header} />
                </div>
                <Divider style={{margin: 0}}/>
                <div id="portal-content">
                    {message}
                </div>
                <Divider style={{margin: 0}} />
                <div style={{backgroundColor: "#f9fafb", textAlign: "right"}} id="portal-action">
                    <Button color='red' onClick={() => setPortalOpen(false)}><Icon name='remove' />Close</Button>
                </div>
            </Segment>
        </Portal> 
    )
}

export default PortalMain;