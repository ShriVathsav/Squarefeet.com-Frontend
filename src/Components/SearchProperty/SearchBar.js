import React, {Fragment, useState, useEffect, useContext} from 'react'
import { Input, Menu, Segment, Button, Popup, Checkbox } from 'semantic-ui-react'
import "./SearchBar.css"
import {priceOptions, rentOptions} from "../Utility/BudgetListCalculate"

import SearchFilters from "./SearchFilters"
import SearchInput from "./SearchInput"
import {Context} from "../../context/Context"

const SearchBar = (props) => {

    const context = useContext(Context)

    const {
        localityProps, cityProps, bedroomFilterProp, propertyTypeFilterProp, postedByFilterProp, 
        minPriceFilterProp, maxPriceFilterProp, minRentFilterProp, maxRentFilterProp
    } = context

    const activeMenuProps = useState('Sale')
    const [activeMenu, setActiveMenu] = activeMenuProps
    const addressInputProps = useState("")
    const [minPrice, setMinPrice] = minPriceFilterProp
    const [maxPrice, setMaxPrice] = maxPriceFilterProp
    const [minRent, setMinRent] = minRentFilterProp
    const [maxRent, setMaxRent] = maxRentFilterProp

    const [minPriceList, setMinPriceList] = useState([])
    const [maxPriceList, setMaxPriceList] = useState([])

    useEffect(() => {
        if(activeMenu === "Sale"){
            setMinPriceList(priceOptions(500000, maxPrice))
            setMaxPriceList(priceOptions(minPrice, 1000000000))
        }
    }, [minPrice, maxPrice, activeMenu])

    useEffect(() => {
        if(activeMenu === "Rent"){
            setMinPriceList(rentOptions(1000, maxRent))
            setMaxPriceList(rentOptions(minRent, 1000000))
        }
    }, [minRent, maxRent, activeMenu])

    const propsPassed = [
        {
            stateObj: propertyTypeFilterProp,
            label: "Property Type",
            alterState(id){
              this.stateObj[1](prev => {
                  return [...prev].map(item => {
                      return (item.key !== id) ? {...item} : {...item, active: !item.active}
                  })            
              })
          }
        }, 
        {
            stateObj: postedByFilterProp,
            label: "Posted By",
            alterState(id){
              this.stateObj[1](prev => {
                  return [...prev].map(item => {
                      return (item.key !== id) ? {...item} : {...item, active: !item.active}
                  })            
              })
          }
        },
        {
            stateObj: bedroomFilterProp,
            label: "Configuration",
            alterState(id){
              this.stateObj[1](prev => {
                  return [...prev].map(item => {
                      return (item.key !== id) ? {...item} : {...item, active: !item.active}
                  })            
              })
          }
        },
        {
            label: "Budget",
            stateObj: [
                {
                    stateObj: activeMenu === "Sale" ? minPriceFilterProp : minRentFilterProp,
                    label: "Min Budget",
                    alterState(id){
                        this.stateObj[1](prev => {
                            return [...prev].map(item => {
                                return (item.key !== id) ? {...item} : {...item, active: !item.active}
                            })            
                        })
                    }
                },
                {
                    stateObj: activeMenu === "Sale" ? maxPriceFilterProp : maxRentFilterProp,
                    label: "Max Budget",
                    alterState(id){
                        this.stateObj[1](prev => {
                            return [...prev].map(item => {
                                return (item.key !== id) ? {...item} : {...item, active: !item.active}
                            })            
                        })
                    }
                }
            ]
        }
    ]

    const handleItemClick = (e, { name }) => {
        setActiveMenu(name)
    }

    const propsPassed2 = {
        cityProps, localityProps, typeInputProps: activeMenuProps, addressInputProps, minPriceFilterProp, 
        maxPriceFilterProp, minRentFilterProp, maxRentFilterProp, history: props.history
    }

    return (
        <div id="search-bar-main">
            <Menu attached='top' tabular size='massive'>
                <Menu.Item name='Sale' active={activeMenu === 'Sale'} onClick={handleItemClick}>
                    <span style={{fontWeight: 700}}>BUY</span>
                </Menu.Item> 
                <Menu.Item name='Rent' active={activeMenu === 'Rent'} onClick={handleItemClick}>
                    <span style={{fontWeight: 700}}>RENT</span>
                </Menu.Item> 
            </Menu>

            <Segment attached='bottom'>
            <SearchInput {...propsPassed2}/>
            <div style={{display: "flex", marginTop: 14, flexFlow: "row wrap", flexDirection: "row"}}>
                {propsPassed.map(iter => 
                    <SearchFilters key={iter.label} iter={iter} minPriceList={minPriceList} maxPriceList={maxPriceList} />
                )}
            </div>
            </Segment>       
        </div>
    )
}

export default SearchBar