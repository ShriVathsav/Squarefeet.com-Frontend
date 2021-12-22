import React, {Fragment, useState, useEffect} from 'react'
import { Input, Menu, Segment, Button, Popup, Checkbox, Dropdown, Divider,Icon } from 'semantic-ui-react'

import {inWords, display} from '../Utility/NumberConverter'

const SearchFilters = (props) => {
    const [activeMenu, setActiveMenu] = useState('buy')
    const [clicked, setClicked] = useState(false)
    const [clicked2, setClicked2] = useState(false)
    const [clicked3, setClicked3] = useState(false)
    const [clicked4, setClicked4] = useState(false)

    const {iter, minPriceList, maxPriceList} = props

    const handleItemClick = (e, { name }) => setActiveMenu(name)

    useEffect(() => {
        let a = function(event){
            var pol = document.getElementById('pol');
            if(event.target != pol && event.target.parentNode != pol){
                pol.style.display = 'none';
                setClicked(false)
            }
        }
        window.addEventListener('click', a)
        return () => {
            window.removeEventListener('click', a)
        }
    }, [])

    return (
        <div style={{margin: "7px 7px 7px 7px"}}>     
            {iter.label !== "Budget" ?
                <Dropdown trigger={<Button onClick={(e, d) => {setClicked(prev => !prev)}} style={{borderRadius: 0}}>
                                        {iter.label} <Icon name={clicked ? "caret up" : "caret down"} style={{margin: "0 0 0 0.5em"}}/>
                                    </Button>}
                    open={clicked} icon={null} floating>
                    <Dropdown.Menu id="pol">
                        <Dropdown.Header icon='filter' content={iter.label} />
                        <Dropdown.Menu scrolling >
                            {iter.stateObj[0].map(item => 
                                <Dropdown.Item key={item.key} onClick={() => iter.alterState(item.key)}
                                    style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                                    <Checkbox checked={item.active} style={{marginRight: 8}}/>{item.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown.Menu>            
                </Dropdown>
            :
            <Dropdown trigger={<Button onClick={(e, d) => {setClicked(prev => !prev)}} style={{borderRadius: 0}}>
                            Budget <Icon name={clicked4 ? "caret up" : "caret down"} style={{margin: "0 0 0 0.3em"}}/>
                        </Button>}
                open={clicked} icon={null} floating compact>
                <Dropdown.Menu id="pol">
                    <div style={{padding: "1em 1em 0 1em", textAlign: "center", fontSize: 12, fontWeight: 700}}>
                        BUDGET
                        <br />
                        &#x20B9; {display(iter.stateObj[0].stateObj[0])} - &#x20B9; {display(iter.stateObj[1].stateObj[0])}
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div>
                            <div style={{padding: "0em 1em 1em 1em", fontSize: 11, fontWeight: 700}}>
                                <Icon name="filter" />MIN BUDGET
                            </div>
                            <Dropdown.Menu scrolling style={{height: "100%"}}>                        
                                {minPriceList.map(item => 
                                    <Dropdown.Item key={item.key} onClick={() => iter.stateObj[0].stateObj[1](item.value)} 
                                        className={(iter.stateObj[0].stateObj[0] === item.value) ? "active" : ""}
                                        style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                                        {item.text}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </div>
                        <div>
                            <div style={{padding: "0em 1em 1em 1em", fontSize: 11, fontWeight: 700}}>
                                <Icon name="filter" />MAX BUDGET
                            </div>
                            <Dropdown.Menu scrolling style={{height: "100%"}}>
                                {maxPriceList.map(item => 
                                    <Dropdown.Item key={item.key} onClick={() => iter.stateObj[1].stateObj[1](item.value)}
                                        className={iter.stateObj[1].stateObj[0] === item.value ? "active" : ""}
                                        style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "7px 14px"}}>
                                        {item.text}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </div>
                    </div>
                    </Dropdown.Menu>                     
                </Dropdown>
            }
        </div>
    )
}

export default SearchFilters