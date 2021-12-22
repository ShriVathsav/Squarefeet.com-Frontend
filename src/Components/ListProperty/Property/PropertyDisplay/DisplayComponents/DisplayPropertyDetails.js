import React, {useState, Fragment, useEffect, useContext} from 'react';
import {Grid, Header, Icon, Segment, Image, Comment, Divider, Popup, Dropdown, Table} from "semantic-ui-react";
import {v4 as uuidv4} from 'uuid';
import ImageViewerModal from './ImageViewerModal'
import "./DisplayPropertyDetails.css";
import DisplayLocationDetails from "./DisplayLocationDetails"
import {transactionTypeConstant, furnishingFilterList, subPropertyTypeConstant, generateSuperScript} from "../../../../Utility/Constants"

import {propertyDisplayConvert} from "../../../../Utility/NumberConverter"
import {AppContext} from "../../../../AppContext"

import builtupArea from '../../../../ColorIcons/builtupArea.svg';
import openSides from '../../../../ColorIcons/openSides.svg';
import bookingAdvance from '../../../../ColorIcons/bookingAdvance.svg';
import furnishing from '../../../../ColorIcons/furnishing.svg';
import landArea from '../../../../ColorIcons/landArea.svg';
import carpetArea from '../../../../ColorIcons/carpetArea.svg';
import age from "../../../../ColorIcons/propertyAge.svg";
import facing from "../../../../ColorIcons/facing.svg";
import bathroom from "../../../../ColorIcons/bathroom.svg";
import price from "../../../../ColorIcons/propertyPrice.svg";
import superArea from "../../../../ColorIcons/superBuiltUpArea.svg";
import bedroom from "../../../../ColorIcons/bedroom.svg";
import balcony from "../../../../ColorIcons/balcony.svg";
import boundaryWall from "../../../../ColorIcons/boundaryWall.svg";
import propertyType from "../../../../ColorIcons/propertyType.svg";
import floors from "../../../../ColorIcons/stairs.svg";
import elevator from "../../../../ColorIcons/elevator.svg";
import parking from "../../../../ColorIcons/parking.svg";
import twoWheelerParking from "../../../../ColorIcons/twoWheelerParking.svg";
import propertyStatus from "../../../../ColorIcons/propertyStatus.svg";
import maintenance from "../../../../ColorIcons/stairs.svg";
import transactionType from "../../../../ColorIcons/transactionType.svg";
import ownership from "../../../../ColorIcons/propertyOwnership.svg";
import powerBackup from "../../../../ColorIcons/powerBackup.svg";

import emptyImage from "../../../../ColorIcons/MainIcon/emptyImage.png"

import {convertArea} from "../../../../Utility/AreaConvert"

import DisplayFeatures from './DisplayFeatures';

//let images = {wifi2,gym2,airCondition2,intercom2,security2,pool2,park2,fireAlarm2,fengShui2,maintenance2,cctv2}

const areaOptions = [
    { key: 'm', text: 'sq.ft.', value: 'sq.ft.' },
    { key: 'f', text: 'sq.m.', value: 'sq.m.' },
    { key: 'o', text: 'sq.yards', value: 'sq.yards' },
    { key: 'b', text: 'acres', value: 'acres' },
    { key: 'c', text: 'hectares', value: 'hectares' }
]

let propertyDetailsDiv

const DisplayPropertyDetails = (props) => {

    const {property, shortListProps} = props
    const {unitSelectedProps} = useContext(AppContext)
    const [areaUnit, setAreaUnit] = unitSelectedProps
    //const [loading, setLoading] = props.loadingProps    
    const [shortList, setShortList] = shortListProps

    const properType = property.property_type

    const subPriceJsx = (function() {
        if(property.property_type === "Land"){
            return <span> {parseInt(property.price/convertArea(property.plot_area, areaUnit))} per {areaUnit}</span>
        } else {
            return <span> {parseInt(property.price/convertArea(property.super_builtup_area, areaUnit))} per {areaUnit}</span>
        }
    }())

    // RENDER PRICE POPUP
    const pricePopUpConditions = [
        {id: 1, label: "Rate per " + areaUnit, value: (<strong>&#x20b9; {subPriceJsx}</strong>), 
                condition: property.list_property_for === "Sale"},
        {id: 2, label: "Rental Basis", value: (<strong>Per Month</strong>), 
                condition: property.list_property_for === "Rent"},
        {id: 3, label: "Brokerage", value: (<strong>{property.brokerage + " % " + (property.brokerage_negotiable ? "Negotiable" : "Non-Negotiable")}</strong>), 
                condition: property.poster_designation === "Broker"},
        {id: 4, label: "All prices Inclusive", value: (<strong>{property.all_prices_inclusive ? "Yes" : "No"}</strong>), 
                condition: true},
        {id: 5, label: "Security Deposit", value: (<strong>&#x20B9; {property.security_deposit}</strong>), 
                condition: property.list_property_for === "Rent"},
        {id: 6, label: "Price Negotiable", value: (<strong>{property.price_negotiable ? "Yes" : "No"}</strong>), 
                condition: property.list_property_for === "Sale"},
        {id: 7, label: "Rent Negotiable", value: (<strong>{property.rent_negotiable ? "Yes" : "No"}</strong>), 
                condition: property.list_property_for === "Rent"},
        {id: 8, label: "Maintenance", value: (<strong>&#x20B9; {property.maintenance} {property.maintenance_unit}</strong>), 
                condition: property.property_type === "Apartment"},
        {id: 9, label: "Undivided Share", value: (<strong>{convertArea(property.undivided_share, areaUnit) + " " + areaUnit}</strong>), 
                condition: !!property.undivided_share},
        {id: 10, label: "Number of Apartments", value: (<strong>{property.number_of_flats}</strong>), 
                condition: !!property.number_of_flats}   
    ]

    // PRICE POPUP

    const pricePopup = (
        <Popup style={{paddingTop: 0, paddingBottom: 0}}
               trigger={
                    <span id="card-label" style={{fontWeight: 200, marginLeft: 7, cursor: "pointer"}}>
                        <Icon name="info circle" style={{marginRight: 2}}/>
                        More Details
                    </span>
                }
               flowing hoverable position="bottom center">
            <Table compact basic={"very"} unstackable>
                {pricePopUpConditions.map(item => item.condition &&
                    <Table.Row key={item.id}>
                        <Table.Cell><span  id="card-label">{item.label}</span></Table.Cell>
                        <Table.Cell textAlign="right"><span id="card-label">{item.value}</span></Table.Cell>
                    </Table.Row>
                )}
            </Table>
        </Popup>
    )
    
    // CUSTOM DROPDOWN FOR AREA UNITS

    const areaDropdown = (
        <Dropdown text={areaUnit} id="card-label" inline>
            <Dropdown.Menu>
                {areaOptions.map(item => 
                    <Dropdown.Item className={areaUnit === item.value ? "active" : ""} key={item.key} onClick={() => setAreaUnit(item.value)}>
                        <span id="card-label" >{item.text}</span></Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )

    // JSX RENDERING

    const jsxGenerator = {
        priceJsx: (
            <div>
                <span style={{display: "inline"}}>&#x20B9; {propertyDisplayConvert(property.price)}</span>
                {pricePopup}                
            </div>
        ),
        rentJsx: (
            <div>
                <span>&#x20B9; </span>{propertyDisplayConvert(property.rent)}
                <span id="card-label-2" style={{fontWeight: 200}}> per month</span>
                {pricePopup}
            </div>
        ),
        propertyTypeJsx: (function() {
            if(property.property_type === "Apartment"){
                return property.apartment_type 
            } else if(property.property_type === "Land"){
                return "Residential Land"
            } else if(property.property_type === "House"){
                return "Independent House / Villa"
            } else{
                return property.property_type
            }
        }()),
        propertyStatusJsx: (
            <div>
                {property.availability}
            </div>
        ),
        superBuiltUpAreaJsx: (
            <div>
                {convertArea(property.super_builtup_area, areaUnit)}&nbsp;&nbsp;
                <Dropdown id="card-label" style={{fontWeight: 200}} inline options={areaOptions} value={areaUnit}
                    onChange={(event, data) => setAreaUnit(data.value)} defaultValue={areaOptions[0].value} />
                {/*<span id="card-label" style={{fontWeight: 200}}> sq.ft.</span>*/}
            </div>
        ),
        builtUpAreaJsx: (
            <div>
                {convertArea(property.builtup_area, areaUnit)}&nbsp;&nbsp;
                {areaDropdown}
            </div>
        ),
        carpetAreaJsx: (
            <div>
                {convertArea(property.carpet_area, areaUnit)}&nbsp;&nbsp;
                {areaDropdown}
            </div>
        ),
        plotAreaJsx: (
            <div>
                {convertArea(property.plot_area, areaUnit)}&nbsp;&nbsp;
                {areaDropdown}
            </div>
        ),
        configurationJsx: (
            <div>
                {property.bedrooms} BHK
            </div>
        ),
        floorsJsx: (
            <Fragment>
                {property.property_type === "Apartment" &&
                    <div>
                        {property.property_on_floor === 0 ? "Ground" : property.property_on_floor}
                        <span id="card-label-2" style={{fontWeight: 200}}>
                            {property.property_on_floor !== 0 && <sup>{generateSuperScript(property.property_on_floor)}</sup>} out of </span>
                        {property.total_floors}
                        <span id="card-label-2" style={{fontWeight: 200}}> floors</span>
                    </div>
                }
                {property.property_type === "House" &&
                    <div>
                        {property.total_floors}
                    </div>
                }
            </Fragment>
        ),
        propertyAgeJsx: (
            <div>
                {property.property_age}
            </div>
        ),
        possessionByJsx: (
            <div>
                {property.possession_by}
            </div>
        ),
        floorsAllowedJsx: (
            <div>
                {property.floors_allowed_for_construction}
            </div>
        ),
        parkingJsx: (
            <div>
                {property.reserved_parking ? 
                    `${property.closed_parking} Closed, ${property.open_parking} Open` 
                        : "Not Present"}
            </div>
        ),
        bookingAdvanceJsx: (
            <div>
                &#x20B9; {property.booking_advance}
            </div>
        )
    }

    // FETCHING DETAILS
    
    const propDetailsArray2 = [
        {id: 0, icon: price, label: "Price", value: jsxGenerator.priceJsx, subType: ["Apartment", "Land", "Sale", "House"]},
        {id: 1, icon: price, label: "Rent", value: jsxGenerator.rentJsx, subType: ["Apartment", "Rent", "House"]},
        {id: 2, icon: propertyType, label: "Property Type", value: subPropertyTypeConstant[property.sub_property_type || 0].name, subType: ["Apartment", "Land", "Sale", "Rent", "House"]},
        {id: 3, icon: propertyStatus, label: "Status", value: jsxGenerator.propertyStatusJsx, subType: ["Apartment", "Sale", "House"]},
        {id: 4, icon: landArea, label: "Land Area", value: jsxGenerator.plotAreaJsx, subType: ["Land", "Sale", "House", "Rent"]},
        {id: 5, icon: superArea, label: "Super Builtup Area", value: jsxGenerator.superBuiltUpAreaJsx, subType: ["Apartment", "Sale", "Rent", "House"]},
        {id: 6, icon: builtupArea, label: "BuiltUp Area", value: jsxGenerator.builtUpAreaJsx, subType: ["Apartment", "Sale", "Rent", "House"]},
        {id: 7, icon: carpetArea, label: "Carpet Area", value: jsxGenerator.carpetAreaJsx, subType: ["Apartment", "Sale", "Rent", "House"]},
        {id: 8, icon: floors, label: "Floors", value: jsxGenerator.floorsJsx, subType: ["Apartment", "Sale", "Rent", "House"]},
        {id: 9, icon: floors, label: "Floors allowed for Construction", value: jsxGenerator.floorsAllowedJsx, subType: ["Land", "Sale"]},
        {id: 10, icon: age, label: "Possession By", value: property.possession_by, subType: ["Land", "Rent", "Sale"]},
        {id: 11, icon: age, label: "Possession By", value: property.possession_by, subType: ["Apartment", "Rent"]},
        {id: 12, icon: age, label: property.availability !== "Under Construction" ? "Property Age" : "Possession By", 
                value: property.availability !== "Under Construction" ? property.property_age : property.possession_by, subType: ["Apartment", "Sale", "House"]},
        {id: 13, icon: bookingAdvance, label: "Booking Advance", value: jsxGenerator.bookingAdvanceJsx, subType: ["Land", "Apartment", "Sale", "Rent", "House"]},
        {id: 14, icon: openSides, label: "Number of Open Sides", value: property.open_sides, subType: ["Land", "Sale", "Rent", "House"]}
    ]

    const propDetailsArray = {
        priceObj: {icon: price, label: "Price", value: property.price + " Cr"},
        propertyTypeObj: {icon: propertyType, label: "Property Type", value: "Residential Apartment"},
        statusObj: {icon: propertyStatus, label: "Status", value: "Ready to Move"},
        superBuiltUpAreaObj: {icon: superArea, label: "SuperBuiltUp Area", value: "2000 sq.ft."},
        builtUpAreaObj: {icon: superArea, label: "BuiltUp Area", value: "2000 sq.ft."},
        plotAreaObj: {icon: superArea, label: "Plot Area", value: "2000 sq.ft."},
        carpetAreaObj: {icon: carpetArea, label: "Carpet Area", value: "1900 sq.ft."},
        totalFloorsObj: {icon: floors, label: "Total Floors", value: "10"},
        propertyOnFloorObj: {icon: superArea, label: "Property on Floor", value: "3"},
        floorsAllowedObj: {icon: superArea, label: "Floors allowed for Construction", value: "4"},
        possessionByObj: {icon: age, label: "Possession By", value: "10"},
        propertyAgeObj: {icon: age, label: "Property Age", value: "10"}
    }

    const featuresArray = [
        {icon: bedroom, label: "Bedrooms", value: property.bedrooms, subType: ["Apartment", "House", "Sale", "Rent"]},
        {icon: bathroom, label: "Bathroms", value: property.bathrooms, subType: ["Apartment", "House", "Sale", "Rent"]},
        {icon: balcony, label: "Balconies", value: property.balconies, subType: ["Apartment", "House", "Sale", "Rent"]},
        {icon: facing, label: "Facing", value: property.facing, subType: ["Apartment", "Land", "House", "Sale", "Rent"]},
        {icon: parking, label: "Car Parking", value: jsxGenerator.parkingJsx, subType: ["Apartment", "House", "Sale", "Rent"]},
        {icon: twoWheelerParking, label: "Two Wheeler Parking", value: property.two_wheeler_parking ? "Present" : "Not Present", subType: ["Apartment", "House", "Sale", "Rent"]},
        {icon: transactionType, label: "Transaction Type", value: transactionTypeConstant[property.transaction_type].name, subType: ["Apartment", "Land", "House", "Sale", "Rent"]},
        {icon: elevator, label: "Elevator", value: property.presence_of_elevator === true ? "Present" : "Not present", subType: ["Apartment", "House"]},
        {icon: ownership, label: "Property Ownership", value: property.ownership, subType: ["Apartment", "Land", "House", "Sale"]},
        {icon: powerBackup, label: "Power Backup", value: property.power_backup, subType: ["Apartment", "House", "Sale", "Rent"]},
        {icon: furnishing, label: "Furnishing", value: furnishingFilterList[property.furnishing-1].name, subType: ["Apartment", "House", "Sale", "Rent"]},
        {icon: boundaryWall, label: "Boundary Wall", value: property.boundary_wall ? "Present" : "Not Present", subType: ["Land", "Sale"]}
    ]

    useEffect(() => {
        propertyDetailsDiv = document.getElementById("PropertyDetails")
    }, [])

    const [propertyDetailsHeight, setPropertyDetailsHeight] = props.propertyDetailsHeightProps
    const {screenWidth} = props

    useEffect(() => {
        setPropertyDetailsHeight(propertyDetailsDiv.offsetHeight)
    }, [screenWidth])

    useEffect(() => console.log(propertyDetailsHeight, "PROPDETAILS HEIGHR"))

    const dispImage = (
        <div style={{position: "relative"}} id="card-image-3" >
            <Image
                fluid rounded style={{cursor: "pointer", display: "inline-flex", height: "100%"}}
                label={{
                    as: 'a',
                    color: shortList ? "red" : "orange",
                    content: shortList ? "Shortlisted" : 'Shortlist',
                    icon: 'star',
                    size: "medium",
                    ribbon: true,
                    onClick: (e) => {e.stopPropagation(); setShortList(prev => !prev);}
                }}
                src={emptyImage}
            />
            <div style={{width: "100%", height: "15%", display: "flex", flexDirection: "row-reverse", alignItems: "center", bottom: 0,
                    cursor: "pointer",  backgroundColor: "black", opacity: 0.8, borderRadius: ".3125em", position: "absolute",  }} >
                <span style={{color: "white", marginRight: 25}} >No Photos Available</span>
                <Icon inverted name='picture' style={{marginRight: 7}}/>
            </div>
        </div>
    )

    return(
            <div id="PropertyDetails">
                <Grid >
                    <Grid.Column mobile={16} tablet={6} computer={6} stretched>
                        {property.photos.length === 0 ?
                            <div>
                                {dispImage}
                            </div>
                        :
                            <div style={{display: "inline-flex"}}>
                                <ImageViewerModal shortListProps={props.shortListProps} property={property} triggerObj="dispImage"/>
                            </div>
                        }
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={10}>
                        <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>
                            {
                                propDetailsArray2.map(details => (
                                    (details.subType.includes(properType) && details.subType.includes(property.list_property_for)) &&
                                    <div style={{width: "50%"}} id="card-grid-column2" key={details.id}>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Image src={details.icon} id="icons-responsive"/>
                                            <div style={{marginLeft: 7}}>
                                                <div id="card-value" style={{wordBreak: "break-all", lineHeight: "1.4em"}}>
                                                    {details.value}
                                                </div>
                                                <div id="card-label" style={{lineHeight: "1.2em"}}>{details.label}</div>
                                                {details.label === "Area" &&
                                                    <Fragment>
                                                        <div id="card-value" style={{wordBreak: "break-all", lineHeight: "1.4em"}}>1900 sq.ft.</div>
                                                        <div id="card-label" style={{lineHeight: "1.2em"}}>BuiltUp Area</div>
                                                    </Fragment>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    </Grid.Column>
                    <Divider style={{width: "100%", margin: "0px 14px"}} section />
                    <Grid.Column width={16}>
                        <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>
                            {featuresArray.map(features => (
                                (features.subType.includes(properType) && features.subType.includes(property.list_property_for)) &&
                                <div key={features.label} id="card-grid-column" >
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <Image src={features.icon} id="icons-responsive"/>
                                        <div style={{marginLeft: 7}}>
                                            <div id="card-value" style={{wordBreak: "break-all", lineHeight: "1.4em"}}>
                                                {features.value}  
                                            </div>
                                            <div id="card-label" style={{lineHeight: "1.2em"}}>{features.label}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <Divider section />
                    </Grid.Column>
                    <Grid.Column width={16} >                
                        <Header as='h2' attached='top' id="sub-topic">
                            About Property
                        </Header>
                        <Segment attached>
                            <div id="description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                                {property.property_description}
                            </div>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
    )
}

export default DisplayPropertyDetails;