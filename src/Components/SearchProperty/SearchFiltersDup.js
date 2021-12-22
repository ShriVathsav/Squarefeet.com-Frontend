import React, {Fragment, useState} from 'react'
import { Input, Menu, Segment, Button, Popup, Checkbox } from 'semantic-ui-react'

import Drop from "./Drop"

const SearchBar = (props) => {
  const [activeMenu, setActiveMenu] = useState('buy')

  const handleItemClick = (e, { name }) => setActiveMenu(name)

  const propertyTypeFilter = [
      {key: 1, name: "Residential Apartment"},
      {key: 2, name: "Independent / Builder Floor"},
      {key: 3, name: "Studio Apartment"},
      {key: 4, name: "Serviced Apartment"},
      {key: 5, name: "Independent House / Villa"},
      {key: 6, name: "Residential Land"}
  ]

    return (
      <div>
        <Popup on='click' trigger={<Button content='Button' />} position="bottom right" >
            <Menu secondary vertical>
                {propertyTypeFilter.map(item => 
                    <Menu.Item name="menu" onClick={handleItemClick} 
                        style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                        <Checkbox style={{marginRight: 8}}/>{item.name}
                    </Menu.Item>
                )}
                
                <Menu.Item name="menu" onClick={handleItemClick} 
                    style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                    <Checkbox style={{marginRight: 8}}/> Menu
                </Menu.Item>
                <Menu.Item name="menu" onClick={handleItemClick} 
                    style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                    <Checkbox style={{marginRight: 8}}/> Menu
                </Menu.Item>
            </Menu>
        </Popup>
      </div>
    )
}

export default SearchBar