import React, {Fragment, useState, useEffect} from 'react'
import { Input, Menu, Segment, Button, Popup, Checkbox, Dropdown, Divider,Icon } from 'semantic-ui-react'

import Drop from "./Drop"

const propertyTypeFilterList = [
    {key: 1, name: "Residential Apartment", active: true},
    {key: 2, name: "Independent / Builder Floor", active: true},
    {key: 3, name: "Studio Apartment", active: true},
    {key: 4, name: "Serviced Apartment", active: true},
    {key: 5, name: "Independent House / Villa", active: true},
    {key: 6, name: "Residential Land", active: true}
  ]
  
  const constructionStatusFilter = [
    {key: 1, name: "Resale Property", active: true},
    {key: 2, name: "New Property", active: true},
    {key: 3, name: "Under Construction", active: true}
  ]
  
  const configurationFilterList = [
    {key: 1, name: "1 BHK", active: true},
    {key: 2, name: "2 BHK", active: true},
    {key: 3, name: "3 BHK", active: true},
    {key: 4, name: "4 BHK", active: true},
    {key: 5, name: "5 BHK", active: true},
    {key: 6, name: "6 BHK", active: true},
    {key: 7, name: "7 BHK", active: true},
    {key: 8, name: "7+ BHK", active: true},
  ]
  
  const postedByFilterList = [
    {key: 1, name: "Owner", active: true},
    {key: 2, name: "Broker", active: true}
  ]

const SearchFilters = (props) => {
    const [activeMenu, setActiveMenu] = useState('buy')
    const [clicked, setClicked] = useState(false)
    const [clicked2, setClicked2] = useState(false)
    const [clicked3, setClicked3] = useState(false)
    const [clicked4, setClicked4] = useState(false)

    const handleItemClick = (e, { name }) => setActiveMenu(name)

    const [propertyTypeFilter, setPropertyTypeFilter] = props.propertyTypeFilterProps
    const [postedByFilter, setPostedByFilter] = props.postedByFilterProps
    const [maxBudgetFilter, setMaxBudgetFilter] = props.maxBudgetFilterProps
    const [minBudgetFilter, setMinBudgetFilter] = props.minBudgetFilterProps
    const [configurationFilter, setConfigurationFilter] = props.configurationFilterProps

    useEffect(() => {
        window.addEventListener('click',function(event){
            var pol = document.getElementById('pol');
            console.log(pol)
            if(event.target != pol && event.target.parentNode != pol){
                pol.style.display = 'none';
                setClicked(false)
            }
      })
    }, [])

    const alterPropertyType = (id) => {
        setPropertyTypeFilter(prev => {
            return [...prev].map(item => {
                return (item.key !== id) ? {...item} : {...item, active: !item.active}
            })            
        })
    }

    const alterPostedBy = (id) => {
        setPostedByFilter(prev => {
            return [...prev].map(item => {
                return (item.key !== id) ? {...item} : {...item, active: !item.active}
            })            
        })
    }

    const alterConfiguration = (id) => {
        setConfigurationFilter(prev => {
            return [...prev].map(item => {
                return (item.key !== id) ? {...item} : {...item, active: !item.active}
            })            
        })
    }


    useEffect(() => console.log(propertyTypeFilter),[propertyTypeFilter])

    return (
      <div>
        <Dropdown trigger={<Button onClick={(e, d) => {setClicked(prev => !prev)}}>
                                Property Type <Icon name={clicked ? "caret up" : "caret down"} style={{margin: "0 0 0 0.3em"}}/>
                            </Button>}
            open={clicked} icon={null} floating>
            <Dropdown.Menu id="pol">
                <Dropdown.Header icon='filter' content='Property Type' />
                <Dropdown.Menu scrolling >
                    {propertyTypeFilter.map(item => 
                        <Dropdown.Item key={item.key} onClick={() => alterPropertyType(item.key)}
                            style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                            <Checkbox checked={item.active} style={{marginRight: 8}}/>{item.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown.Menu>            
        </Dropdown>

        <Dropdown trigger={<Button onClick={(e, d) => {setClicked2(prev => !prev)}}>
                                Construction Status <Icon name={clicked2 ? "caret up" : "caret down"} style={{margin: "0 0 0 0.3em"}}/>
                            </Button>}
            open={clicked2} icon={null} floating>
            <Dropdown.Menu>
            <Dropdown.Header icon='filter' content='Construction Status' />
            <Dropdown.Menu scrolling >
                {constructionStatusFilter.map(item => 
                    <Dropdown.Item key={item.key} onClick={() => alterPropertyType(item.key)}
                        style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                        <Checkbox checked={item.active} style={{marginRight: 8}}/>{item.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
            </Dropdown.Menu>            
        </Dropdown>

        <Dropdown trigger={<Button onClick={(e, d) => {setClicked2(prev => !prev)}}>
                                Configuration <Icon name={clicked2 ? "caret up" : "caret down"} style={{margin: "0 0 0 0.3em"}}/>
                            </Button>}
            open={clicked2} icon={null} floating>
            <Dropdown.Menu>
            <Dropdown.Header icon='filter' content='Configuration' />
            <Dropdown.Menu scrolling >
                {configurationFilter.map(item => 
                    <Dropdown.Item key={item.key} onClick={() => alterConfiguration(item.key)}
                        style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                        <Checkbox checked={item.active} style={{marginRight: 8}}/>{item.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
            </Dropdown.Menu>            
        </Dropdown>

        <Dropdown trigger={<Button onClick={(e, d) => {setClicked3(prev => !prev)}}>
                                Posted By <Icon name={clicked3 ? "caret up" : "caret down"} style={{margin: "0 0 0 0.3em"}}/>
                            </Button>}
            open={clicked3} icon={null} floating>
            <Dropdown.Menu>
            <Dropdown.Header icon='filter' content='Posted By' />
            <Dropdown.Menu scrolling >
                {postedByFilter.map(item => 
                    <Dropdown.Item key={item.key} onClick={() => alterPostedBy(item.key)}
                        style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                        <Checkbox checked={item.active} style={{marginRight: 8}}/>{item.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
            </Dropdown.Menu>            
        </Dropdown>

        <Dropdown trigger={<Button onClick={(e, d) => {setClicked4(prev => !prev)}}>
                                Budget <Icon name={clicked4 ? "caret up" : "caret down"} style={{margin: "0 0 0 0.3em"}}/>
                            </Button>}
            open={clicked4} icon={null} floating compact>
            <Dropdown.Menu>
                budget
            <div style={{display: "flex", flexDirection: "row"}}>
                <div>
                    <div style={{padding: 14, fontSize: 11, fontWeight: 700}}>
                        <Icon name="filter" />MIN BUDGET
                    </div>
                    <Dropdown.Menu scrolling compact >                        
                        {configurationFilter.map(item => 
                            <Dropdown.Item
                                style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                                {item.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </div>
                <div>
                    <div style={{padding: 14, fontSize: 11, fontWeight: 700}}>
                        <Icon name="filter" />MAX BUDGET
                    </div>
                    <Dropdown.Menu scrolling >
                        {configurationFilter.map(item => 
                            <Dropdown.Item
                                style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                                {item.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </div>
            </div>
            </Dropdown.Menu>                     
        </Dropdown>







        <Popup on='click' trigger={<Button content='Button' />} position="bottom right" >
            <Menu secondary vertical>
                {propertyTypeFilter.map(item => 
                    <Menu.Item name="menu" onClick={handleItemClick} 
                        style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                        <Checkbox style={{marginRight: 8}}/>{item.name}
                    </Menu.Item>
                )}
            </Menu>
        </Popup>
      </div>
    )
}

export default SearchFilters