import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Menu, Header, Icon, Label, Dropdown, Grid, Button } from 'semantic-ui-react'
import {AppContext} from '../../AppContext'
import {propertyTypeFilterList, amenitiesFilterList, constructionStatusFilter, 
    configurationFilterList, postedByFilterList, furnishingFilterList} from "../../Utility/Constants"
import {priceOptions, rentOptions, areaOptions} from '../../Utility/BudgetListCalculate'

let time, prices;
const Filters = (props) => {
    const propertyContext = useContext(AppContext)    

    const {
        propertyForProps, bedroomFilterProp, propertyTypeFilterProp, postedByFilterProp, propertyStatusFilterProp, 
        amenitiesFilterProp, furnishingFilterProp, minPriceFilterProp, maxPriceFilterProp, minRentFilterProp, 
        maxRentFilterProp, minAreaFilterProp, maxAreaFilterProp,
    } = propertyContext

    const {applyFilters} = props

    const [bedroomFilter, setBedroomFilter] = bedroomFilterProp
    const [propertyTypeFilter, setPropertyTypeFilter] = propertyTypeFilterProp
    const [postedByFilter, setPostedByFilter] = postedByFilterProp
    const [propertyStatusFilter, setPropertyStatusFilter] = propertyStatusFilterProp
    const [amenitiesFilter, setAmenitiesFilter] = amenitiesFilterProp
    const [furnishingFilter, setFurnishingFilter] = furnishingFilterProp

    const [minPrice, setMinPrice] = minPriceFilterProp
    const [maxPrice, setMaxPrice] = maxPriceFilterProp

    const [minRent, setMinRent] = minRentFilterProp
    const [maxRent, setMaxRent] = maxRentFilterProp

    const [minPriceList, setMinPriceList] = useState([])
    const [maxPriceList, setMaxPriceList] = useState([])

    const [minArea, setMinArea] = minAreaFilterProp
    const [maxArea, setMaxArea] = maxAreaFilterProp

    const [minAreaList, setMinAreaList] = useState([])
    const [maxAreaList, setMaxAreaList] = useState([])

    const [clearFilter, setClearFilter] = useState(false)

    useEffect(() => {
        if(clearFilter === true){
            applyFilters()
            setClearFilter(false)
        }
    }, [clearFilter])

     useEffect(() => {
        var acc = document.getElementsByClassName("accordion");
        var i;    
        
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                var panel = this.nextElementSibling;
                if (panel.style.minHeight) {
                    console.log(panel.style.minHeight, "open")
                    clearTimeout(time)
                    panel.style.maxHeight = 0;
                    panel.style.minHeight = null;
                    panel.style.overflow = "hidden"
                    console.log(panel.style)
                    this.children[1].className = "chevron down icon"
                } else {
                    console.log(panel.style.minHeight, "close")
                    panel.style.minHeight = (panel.scrollHeight + 14) + "px";
                    if(panel){time = setTimeout(() => panel.style.overflow = "visible", 300)}
                    this.children[1].className = "chevron up icon"
                } 
            });
        }
    }, [])

    useEffect(() => {
        if(propertyForProps[0] === "Sale"){
            setMinPriceList(priceOptions(500000, maxPrice))
            setMaxPriceList(priceOptions(minPrice, 1000000000))
        }
    }, [minPrice, maxPrice])

    useEffect(() => {
        if(propertyForProps[0] === "Rent"){
            setMinPriceList(rentOptions(1000, maxRent))
            setMaxPriceList(rentOptions(minRent, 1000000))
        }
    }, [minRent, maxRent])

    useEffect(() => {
        setMinAreaList(areaOptions(100, maxArea))
        setMaxAreaList(areaOptions(minArea, 10000))
    }, [minArea, maxArea])

    const addOrRemoveFilters = (prev, val) => {
        if(prev.includes(val)){
            return prev.filter(p => p !== val)
        }
        let prevs = [...prev]
        prevs.push(val)
        return prevs
    }

    const alterFilterState = (id, stateObj) => {
        stateObj[1](prev => {
            return [...prev].map(item => {
                return (item.key !== id) ? {...item} : {...item, active: !item.active}
            })            
        })
    }

    const clearFilterFunc = () => {
        setPropertyTypeFilter(propertyTypeFilterList)
        setAmenitiesFilter(amenitiesFilterList)
        setPropertyStatusFilter(constructionStatusFilter)
        setBedroomFilter(configurationFilterList)
        setPostedByFilter(postedByFilterList)
        setFurnishingFilter(furnishingFilterList)
        setMinArea(100)
        setMaxArea(10000)
        setMaxPrice(1000000000)
        setMinPrice(500000)
        setMaxRent(1000000)
        setMinRent(1000)
        setClearFilter(true)
    }

    return (
        <Menu vertical fluid style={{paddingLeft: 14, paddingRight: 14}}>

            <Menu.Item id="menu-item">
                <Button color='purple' size="big" onClick={applyFilters}
                    style={{borderRadius: 0, height: 50, marginBottom: 14}} fluid>Apply Filters</Button>
                <Button basic color='purple' icon labelPosition='left' onClick={clearFilterFunc}>
                    <Icon name='delete' />Clear Filters
                </Button>
            </Menu.Item>
            

            {/* BUDGET FILTER */}

            <Menu.Item id="menu-item" className="accordion">
                <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                    Budget
                </span>
                <Icon name="chevron down" />
            </Menu.Item>
            {(propertyForProps[0] === "Sale" || propertyForProps[0] === "") ?
                <div className="menu-subitem">
                    <div style={{width: "50%", paddingRight: 7, display: "inline-block"}}>
                        <label style={{fontWeight: 700, marginBottom: 20}}>Min Budget (&#x20B9;)</label>
                        <Dropdown compact fluid placeholder='Min' onChange={(event, data) => setMinPrice(parseInt(data.value))}
                            value={minPrice} selection options={minPriceList} />
                    </div>
                    <div style={{width: "50%", paddingLeft: 7, display: "inline-block"}}>
                        <label style={{fontWeight: 700, marginBottom: 20}}>Max Budget (&#x20B9;)</label>
                        <Dropdown compact fluid placeholder='Max' onChange={(event, data) => setMaxPrice(parseInt(data.value))}
                            value={maxPrice} selection options={maxPriceList} />
                    </div>
                </div>
                :
                <div className="menu-subitem">
                    <div style={{width: "50%", paddingRight: 7, display: "inline-block"}}>
                        <label style={{fontWeight: 700, marginBottom: 20}}>Min Budget (&#x20B9;)</label>
                        <Dropdown compact fluid placeholder='Min' onChange={(event, data) => setMinRent(parseInt(data.value))}
                            value={minRent} selection options={minPriceList} />
                    </div>
                    <div style={{width: "50%", paddingLeft: 7, display: "inline-block"}}>
                        <label style={{fontWeight: 700, marginBottom: 20}}>Max Budget (&#x20B9;)</label>
                        <Dropdown compact fluid placeholder='Max' onChange={(event, data) => setMaxRent(parseInt(data.value))}
                            value={maxRent} selection options={maxPriceList} />
                    </div>
                </div>
            }

            {/* BEDROOMS FILTER */}

            <Menu.Item id="menu-item" className="accordion">
                <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                    No. of Bedrooms
                </span>
                <Icon name="chevron down" />
            </Menu.Item>
            <div className="menu-subitem">
                {bedroomFilter.map((item, ind) => 
                <Label as='a' onClick={() => alterFilterState(ind + 1, bedroomFilterProp)} key={ind}
                    size="large" color={item.active && 'blue'} style={{margin: 4, borderRadius: "2em"}}>{item.name} BHK</Label>
                )}
            </div>

            {/* PROPERTY TYPE FILTER */}

            <Menu.Item id="menu-item" className="accordion">
                <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                    Property Type
                </span>
                <Icon name="chevron down" />
            </Menu.Item>
            <div className="menu-subitem">
                {propertyTypeFilter.map((item, ind) => 
                <Label as='a' onClick={() => alterFilterState(ind, propertyTypeFilterProp)}
                    size="large" color={item.active && 'blue'} style={{margin: 4, borderRadius: "2em"}}>{item.name}</Label>
                )}
            </div>

            {/* AREA FILTER */}

            <Menu.Item id="menu-item" className="accordion">
                <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                    Area
                </span>
                <Icon name="chevron down" />
            </Menu.Item>
            <div className="menu-subitem">
                <div style={{width: "50%", paddingRight: 7, display: "inline-block"}}>
                    <label style={{fontWeight: 700, marginBottom: 20}}>Min Area (sq.ft.)</label>
                    <Dropdown compact fluid placeholder='Min' onChange={(event, data) => setMinArea(parseInt(data.value))}
                        value={minArea} selection options={minAreaList} />
                </div>
                <div style={{width: "50%", paddingLeft: 7, display: "inline-block"}}>
                    <label style={{fontWeight: 700, marginBottom: 20}}>Max Area (sq.ft.)</label>
                    <Dropdown compact fluid placeholder='Max' onChange={(event, data) => setMaxArea(parseInt(data.value))}
                        value={maxArea} selection options={maxAreaList} />
                </div>
            </div>

            {/* POSTED BY FILTER */}

            <Menu.Item id="menu-item" className="accordion">
                <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                    Posted By
                </span>
                <Icon name="chevron down" />
            </Menu.Item>
            <div className="menu-subitem">
                {postedByFilter.map((item, ind) => 
                <Label as='a' onClick={() => alterFilterState(ind + 1, postedByFilterProp)}
                    size="large" color={item.active && 'blue'} style={{margin: 4, borderRadius: "2em"}}>{item.name}</Label>
                )}
            </div>

            {/* PROPERTY STATUS FILTER */}

            {propertyForProps[0] !== "Rent" &&
            <Fragment>
                <Menu.Item id="menu-item" className="accordion">
                    <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                        Property Status
                    </span>
                    <Icon name="chevron down" />
                </Menu.Item>
                <div className="menu-subitem">
                    {propertyStatusFilter.map((item, ind) => 
                    <Label as='a' onClick={() => alterFilterState(ind, propertyStatusFilterProp)}
                        size="large" color={item.active && 'blue'} style={{margin: 4, borderRadius: "2em"}}>{item.name}</Label>
                    )}
                </div>

            </Fragment>
            }

            {/* AMENITIES FILTER */}
            {/*
            <Menu.Item id="menu-item" className="accordion">
                <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                    Amenities
                </span>
                <Icon name="chevron down" />
            </Menu.Item>
            <div className="menu-subitem">
                {amenitiesFilter.map((item, ind) => 
                <Label as='a' onClick={() => alterFilterState(ind + 1, amenitiesFilterProp)}
                    size="large" color={item.active ? 'blue': ""} style={{margin: 4, borderRadius: "2em"}}>{item.name}</Label>
                )}
            </div>
            <div className="menu-subitem">
                <Label as='a' onClick={() => setAmenitiesFilter(prev => addOrRemoveFilters(prev, "Resale"))}
                    size="large" style={{margin: 4, borderRadius: "2em"}}>Parking</Label>
                <Label as='a' onClick={() => setAmenitiesFilter(prev => addOrRemoveFilters(prev, "Resale"))}
                    color='blue' size="large" style={{margin: 4, borderRadius: "2em"}}>Elevator</Label>
                <Label as='a' onClick={() => setAmenitiesFilter(prev => addOrRemoveFilters(prev, "Resale"))}
                    size="large" style={{margin: 4, borderRadius: "2em"}}>Security Personnel</Label>
                <Label as='a' onClick={() => setAmenitiesFilter(prev => addOrRemoveFilters(prev, "Resale"))}
                    size="large" style={{margin: 4, borderRadius: "2em"}}>Power Backup</Label>
                <Label as='a' onClick={() => setAmenitiesFilter(prev => addOrRemoveFilters(prev, "Resale"))}
                    size="large" style={{margin: 4, borderRadius: "2em"}}>Swimming Pool</Label>
            </div>
            */}

            {/* FURNISHING FILTER */}

            <Menu.Item id="menu-item" className="accordion">
                <span style={{cursor: "pointer", display: "inline"}} id="menu-header">
                    Furnishing
                </span>
                <Icon name="chevron down" />
            </Menu.Item>
            <div className="menu-subitem">
                {furnishingFilter.map((item, ind) => 
                <Label as='a' onClick={() => alterFilterState(ind, furnishingFilterProp)}
                    size="large" color={item.active && 'blue'} style={{margin: 4, borderRadius: "2em"}}>{item.name}</Label>
                )}
            </div>
        </Menu>
    )
}

export default Filters;