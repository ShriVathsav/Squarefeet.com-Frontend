import React, { useState } from 'react'
import { Menu, Segment, Modal, Input, Button } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import {Link} from 'react-router-dom'
import Login from "./Login"
import Register from "./Register"

const Authentication = (props) => {
    
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const [open, setOpen] = useState(false)

    const [activeItem, setActiveItem] = useState("bio")
    return (
        <Modal dimmer="blurring" size="tiny"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Login / Register</Button>}
        >
            <Modal.Content>
            <div>
        <Menu attached='top' tabular>
          <Menu.Item
            name='bio' style={{width: "50%", margin: "0 0 -1px 0", textAlign: "center", justifyContent: "center"}}
            active={activeItem === 'bio'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='photos' style={{width: "50%", margin: "0 0 -1px 0", textAlign: "center", justifyContent: "center"}}
            active={activeItem === 'photos'}
            onClick={handleItemClick}
          />

        </Menu>

        <Segment attached='bottom'>
          <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </div>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)} positive>
                Ok
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default Authentication;