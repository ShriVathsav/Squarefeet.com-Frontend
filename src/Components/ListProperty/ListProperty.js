import React, {useState, Fragment, useEffect, useContext} from 'react';
import { Grid, Button, Segment, Image, Modal, Icon } from 'semantic-ui-react';
import PropertyCard from "./Property/PropertyCard";
import Filters from "./Filters/Filters";
import {Context} from '../../context/Context'
import PaginationItem from "../UI/PaginationItem"
import {Link} from 'react-router-dom'

import axios from 'axios'

import qs from 'qs'

import filterIcon from "../OtherIcons/filter.svg"
import filterIcon1 from "../../static/Icons/GeneralIcons/filterIcon1.svg"
import filterIcon2 from "../../static/Icons/GeneralIcons/filterIcon2.svg"
import FullPageLoader from '../UI/FullPageLoader';
import InfoPageButton from '../UI/InfoPages/InfoPageButton';
import searchPropertyIcon from "../../static/Icons/GeneralIcons/searchPropertyIcon.svg"

let timer
const PER_PAGE = 5
let propertyCountVar

const ListProperty = (props) => {

    const propertyContext = useContext(Context)
        
    const {
        propertyListProps, filteredPropertyListProps, propertyForProps, localityProps, cityProps, bedroomFilterProp,
        propertyTypeFilterProp, postedByFilterProp, propertyStatusFilterProp, amenitiesFilterProp, furnishingFilterProp,
        minPriceFilterProp, maxPriceFilterProp, minRentFilterProp, maxRentFilterProp, minAreaFilterProp, maxAreaFilterProp,
    } = propertyContext

    const [propertyList, setPropertyList] = propertyListProps
    const [filteredPropertyList, setFilteredPropertyList] = filteredPropertyListProps
    const [propertyFor, setPropertyFor] = propertyForProps
    const [locality, setLocality] = localityProps
    const [city, setCity] = cityProps
    
    const [minPrice, setMinPrice] = minPriceFilterProp
    const [maxPrice, setMaxPrice] = maxPriceFilterProp
    const [minRent, setMinRent] = minRentFilterProp
    const [maxRent, setMaxRent] = maxRentFilterProp
    const [minArea, setMinArea] = minAreaFilterProp
    const [maxArea, setMaxArea] = maxAreaFilterProp
    const pageNumberProp = useState(1)
    const totalPagesProp = useState(50)
    const [pageNumber, setPageNumber] = pageNumberProp
    const [totalPages, setTotalPages] = totalPagesProp
    const [propertyCount, setPropertyCount] = useState(0)

    const [loading, setLoading] = useState(true)

    const [open, setOpen] = React.useState(false)

    const shootRequest = (a, pg=pageNumber) => {
        const {locality, type} = a
        setPropertyFor(type)
        setLocality(locality)
        setCity(props.match.params.city)
        axios.get("/properties", {
            params: {
                type,
                locality,
                city: props.match.params.city,
                page: pg,
                bedrooms: (() => {
                    let arr = [0]
                    for(const i of bedroomFilterProp[0]){
                        if(i.active){
                            if(i.name === "7+"){
                                arr.push(8,9,10,11,12,13,14,15,16,17,18,19,20)
                            }else {
                                arr.push(i.name)
                            }
                        }
                    }
                    return arr
                })(),
                apartmentType: (() => {
                    let subPropertyArr = []
                    propertyTypeFilterProp[0].forEach(i => i.active && subPropertyArr.push(i.key))
                    return subPropertyArr
                })(),
                postedBy: (() => {
                    let postedByArr = []
                    postedByFilterProp[0].forEach(i => i.active && postedByArr.push(i.name))
                    return postedByArr
                })(),
                propertyStatus: (() => {
                    let propertyStatusArr = []
                    propertyStatusFilterProp[0].forEach(i => i.active && propertyStatusArr.push(i.key))
                    return propertyStatusArr
                })(),
                furnishing: (() => {
                    let furnishingArr = []
                    furnishingFilterProp[0].forEach(i => i.active && furnishingArr.push(i.key))
                    return furnishingArr
                })(),
                minBudget: type === "Sale" ? (!!minPrice ? minPrice : 500000): (!!minRent ? minRent : 1000),
                maxBudget: type === "Sale" ? (!!maxPrice ? maxPrice : 1000000000): (!!maxRent ? maxRent : 1000000),
                minArea,
                maxArea,
            }
        }).then(res => {
            console.log(res, "PROPERTY RESPONSE")
            setLoading(false)
            if(res.data.props){
                setPropertyList(res.data.props)
                setFilteredPropertyList(res.data.props)
                setTotalPages(Math.ceil(res.data.propertyCount / PER_PAGE))
                setPropertyCount(res.data.propertyCount)
            }
        })
    }

    useEffect(() => {
        const a = qs.parse(props.location.search, { ignoreQueryPrefix: true })
        shootRequest(a)
    }, [pageNumber])

    const itemsPresent = (arr1, arr2) => {
        for(const i of arr1){
            if(arr2.includes(i)){
                return true
            }
        }
        return false
    }

    const iterAmenities = (item) => {
        let validate = true
        amenitiesFilterProp[0].map(i => {
            if(i.active){
                if(i.name === "Parking"){
                    validate = validate && item.reserved_parking
                } else if(i.name === "Elevator"){
                    validate = validate && item.presence_of_elevator
                } else if(i.name === "Security Personnel"){
                    validate = validate && item.amenities.filter(it => it.name === "Security Personnel").length !== 0
                } else if(i.name === "Power Backup"){
                    validate = validate && item.power_backup
                } else if(i.name === "Swimming Pool"){
                    validate = validate && item.amenities.filter(it => it.name === "Swimming Pool").length !== 0
                }
            }
        })
        return validate
    }

    const applyFilters2 = () => {
        setFilteredPropertyList(propertyList.filter(item => {
            let valid = true
            const areaCompare = item.property_type === "Land" ? item.plot_area : item.super_builtup_area
            valid = valid && (areaCompare >= minArea && areaCompare <= maxArea)
            if(item.list_property_for === "Rent"){
                const priceCompare = item.rent
                valid = valid && (priceCompare >= minRent && priceCompare <= maxRent)
            } else {
                const priceCompare = item.price
                valid = valid && (priceCompare >= minPrice && priceCompare <= maxPrice)
            }
            valid = valid && (item.property_type === "Land" ? true : bedroomFilterProp[0].filter(i => {
                    if(i.name === "7+" && i.active){
                        return item.bedrooms > 7
                    } else {
                        return i.name === item.bedrooms && i.active
                    }
                }).length!==0)
            //valid = valid && propertyTypeFilterProp[0].filter(i => i.name === item.apartment_type && i.active).length!==0
            valid = valid && postedByFilterProp[0].filter(i => i.name === item.poster_designation && i.active).length!==0
            valid = valid && (item.list_property_for === "Rent" ? true : propertyStatusFilterProp[0].filter(i => i.name === item.transaction_type && i.active).length!==0)
            valid = valid && (item.property_type === "Land" ? true : furnishingFilterProp[0].filter(i => i.name === item.furnishing && i.active).length!==0)
            valid = valid && (item.property_type === "Land" ? true : iterAmenities(item))
            //if(bedroomFilterProp[0].length !== 0) valid = valid && bedroomFilterProp[0].includes(item.bedrooms)
            //if(propertyTypeFilterProp[0].length !== 0) valid = valid && propertyTypeFilterProp[0].includes(item.apartment_type);
            //if(postedByFilterProp[0].length !== 0) valid = valid && postedByFilterProp[0].includes(item.poster_designation)
            //if(propertyStatusFilterProp[0].length !== 0 && item.list_property_for !== "Rent") valid = valid && propertyStatusFilterProp[0].includes(item.availability)
            //if(amenitiesFilterProp[0].length !== 0) valid = valid && itemsPresent(amenitiesFilterProp[0], item.amenities)
            //if(furnishingFilterProp[0].length !== 0) valid = valid && furnishingFilterProp[0].includes(item.furnishing)
            return valid
        }))
    }

    const applyFilters = () => {
        const a = qs.parse(props.location.search, { ignoreQueryPrefix: true })
        setPageNumber(1)
        shootRequest(a, 1)
    }

    const filterProps = {bedroomFilterProp, propertyTypeFilterProp, 
        postedByFilterProp, propertyStatusFilterProp, amenitiesFilterProp, furnishingFilterProp, applyFilters}

    return(
        <Fragment>
            {!loading ?
                <Fragment>
                    <Grid>
                        <Grid.Column mobile={16} tablet={16} computer={4} id="filter-content">
                            <Filters applyFilters={applyFilters}/>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={12}>
                            <Segment>
                                <div style={{fontSize: 22}}>
                                    {propertyCount} Properties found
                                </div>
                            </Segment>
                            {(propertyCount !== 0 && propertyList.length !== 0) ?
                            <>
                                <div style={{textAlign: "center"}}>
                                    <PaginationItem pageNumberProp={pageNumberProp} totalPagesProp={totalPagesProp}/>
                                </div>
                                {propertyList.map(property => {console.log(property); return(<PropertyCard key={property.id} property={property} />)})}
                                <div style={{textAlign: "center"}}>
                                    <PaginationItem pageNumberProp={pageNumberProp} totalPagesProp={totalPagesProp}/>
                                </div>
                            </>
                            :
                            <div style={{textAlign: "center"}}>
                                <InfoPageButton message="No properties match your search. Unable to find results? Try posting a property and search for it." 
                                    icon={searchPropertyIcon} buttonLink="/"
                                    buttonIcon={searchPropertyIcon} buttonMessage="SEARCH PROPERTY"  />
                            </div>
                            }
                        </Grid.Column>
                    </Grid>
                    <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} size="mini"
                        style={{maxWidth: "80%"}} dimmer="blurring" trigger={
                                <Button circular color="purple" id="floating-button" size="large" style={{padding: 10}} >
                                    <Image src={filterIcon1} />
                                </Button>
                            } id="modal">
                        <Modal.Content >
                            <Filters applyFilters={applyFilters} />
                            {/*<Button color='twitter' size="big" style={{borderRadius: 0, height: 60}} fluid>Apply Filters</Button>*/}
                        </Modal.Content>
                    </Modal>
                </Fragment>
                :
                <FullPageLoader />
            }
        </Fragment>
    )
}

export default ListProperty;