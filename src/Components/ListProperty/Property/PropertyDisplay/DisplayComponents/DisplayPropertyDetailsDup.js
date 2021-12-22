import React, {useState, Fragment, useEffect} from 'react';
import {Grid, Header, Icon, Segment, Image, Comment, Divider, Popup, Button, Table} from "semantic-ui-react";
import {v4 as uuidv4} from 'uuid';
import ImageViewerModal from './ImageViewerModal'
import "./DisplayPropertyDetails.css";

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
import propertyStatus from "../../../../ColorIcons/propertyStatus.svg";
import maintenance from "../../../../ColorIcons/stairs.svg";
import transactionType from "../../../../ColorIcons/transactionType.svg";
import ownership from "../../../../ColorIcons/propertyOwnership.svg";
import powerBackup from "../../../../ColorIcons/powerBackup.svg";



import DisplayFeatures from './DisplayFeatures';

//let images = {wifi2,gym2,airCondition2,intercom2,security2,pool2,park2,fireAlarm2,fengShui2,maintenance2,cctv2}


const DisplayPropertyDetails = (props) => {

    const {property} = props
    //const [loading, setLoading] = props.loadingProps

    const properType = property.property_type

    const propDetailsArray2 = [
        {icon: price, label: "Price", value: property.price + " Cr", subType: ["Apartment", "Land"]},
        {icon: propertyType, label: "Property Type", value: property.property_type === "Apartment" ? property.apartment_type : property.property_type, subType: ["Apartment", "Land"]},
        {icon: propertyStatus, label: "Status", value: property.availability, subType: ["Apartment"]},
        {icon: superArea, label: "Area", value: property.super_builtup_area+" sq.ft.", builtUpValue: "1900 sq.ft.", subType: ["Apartment"]},
        {icon: superArea, label: "Plot Area", value: property.plot_area+"v sq.ft.", subType: ["Land"]},
        {icon: carpetArea, label: "Carpet Area", value: property.carpet_area+" sq.ft.", subType: ["Apartment"]},
        {icon: floors, label: "Floors", totalValue: property.total_floors, propOnValue: property.property_on_floor, subType: ["Apartment"]},
        {icon: floors, label: "Floors allowed for Construction", value: property.floors_allowed_for_construction, subType: ["Land"]},
        {icon: age, label: "Possession By", value: property.possession_by, subType: ["Land"]},
        {icon: age, label: property.availability === "Resale" ? "Property Age" : "Possession By", 
                value: property.availability === "Resale" ? property.property_age : property.possession_by, subType: ["Apartment"]}
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
        {icon: bedroom, label: "Bedrooms", value: property.bedrooms, subType: ["Apartment"]},
        {icon: bathroom, label: "Bathroms", value: property.bathrooms, subType: ["Apartment"]},
        {icon: balcony, label: "Balconies", value: property.balconies, subType: ["Apartment"]},
        {icon: facing, label: "Facing", value: property.facing, subType: ["Apartment", "Land"]},
        {icon: parking, label: "Parking", value: property.reserved_parking, subType: ["Apartment"]},
        {icon: transactionType, label: "Transaction Type", value: "Resale", subType: ["Apartment", "Land"]},
        {icon: elevator, label: "Elevator", value: property.presence_of_elevator === true ? "Present" : "Not present", subType: ["Apartment"]},
        {icon: ownership, label: "Property Ownership", value: property.ownership, subType: ["Apartment", "Land"]},
        {icon: powerBackup, label: "Power Backup", value: property.power_backup, subType: ["Apartment"]},
        {icon: boundaryWall, label: "Boundary Wall", value: "property.boundary_wall", subType: ["Land"]}
    ]

    

    useEffect(() => console.log(property.amenities))

    const pricePopup = (
        <Popup style={{paddingTop: 0, paddingBottom: 0}}
               trigger={<div style={{display:"inline-block", cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;View Price Details</div>}
               flowing hoverable position="bottom center">
            <Table compact basic={"very"}>
                <Table.Row>
                    <Table.Cell>Rate per sq ft</Table.Cell>
                    <Table.Cell textAlign="right"><strong>&#x20b9; 27000 per sq ft</strong></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Brokerage</Table.Cell>
                    <Table.Cell textAlign="right"><strong>1% Non-nego</strong></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>All Prices Inclusive</Table.Cell>
                    <Table.Cell textAlign="right"></Table.Cell>
                </Table.Row>
            </Table>
        </Popup>
    )

    return(
        <Segment id="main-segment" style={{marginTop: 0}}>
            <Grid>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                    <ImageViewerModal shortListProps={props.shortListProps}/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={10} computer={10}>
                    <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>
                        {
                            propDetailsArray2.map(details => (
                                details.subType.includes(properType) &&
                                <div style={{width: "50%"}} id="card-grid-column" >
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <Image src={details.icon} id="icons-responsive"/>
                                        <div style={{marginLeft: 7}}>
                                            <div id="card-value" style={{wordBreak: "break-all", lineHeight: "1.4em"}}>
                                                {details.label === "Floors" ?
                                                    <span>{details.propOnValue}<sup>th</sup> out of {details.totalValue} floors</span>
                                                : (details.label !== "Price") ?
                                                    <span>{details.value}</span> : <span style={{display: "inline"}} >{details.value}</span>
                                                }
                                                {details.label === "Price" && pricePopup}
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
                        
                            {/*
                            propDetailsArray2.map(details => (
                                details.subType.includes(properType) &&
                                
                                <Grid.Column mobile={8} tablet={8} computer={8} key={details.label}>
                                    <Comment.Group>
                                        <Comment>
                                            <Comment.Avatar as='a' src={details.icon} style={{width: "3em"}}/>
                                            <Comment.Content>
                                                <Comment.Text>
                                                    {details.label === "Floors" ?
                                                        <Header as='h4'>{details.propOnValue}<sup>th</sup> out of {details.totalValue} floors</Header>
                                                    : (details.label !== "Price") ?
                                                        <Header as='h4' >{details.value}</Header> : <Header as='h3' style={{display: "inline"}} >{details.value}</Header>
                                                    }
                                                    {details.label === "Price" && pricePopup}
                                                </Comment.Text>
                                                <Comment.Text>{details.label}</Comment.Text>
                                                {details.label === "Area" &&
                                                <Fragment>
                                                    <Comment.Text><Header as='h4'>1900 sq.ft.</Header></Comment.Text>
                                                    <Comment.Text> BuiltUp Area</Comment.Text>
                                                </Fragment>
                                                }
                                            </Comment.Content>
                                        </Comment>
                                    </Comment.Group> 
                                </Grid.Column>
                                

                                
                            ))
                            */}
                            
                        
                    </div>






                    <Grid>
                        <Grid.Column>
                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar as='a' src={maintenance} style={{width: "3em"}}/>
                                    <Comment.Content>
                                        <Comment.Text>Maintenance  : &nbsp;
                                            <Header as='h5'style={{display: "inline"}}>&#x20b9; 5,000/- (Monthly)</Header>
                                        </Comment.Text>
                                        <Comment.Text>
                                            <Header as='h5'style={{display: "inline"}}>Price Negotiable</Header>
                                        </Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
            <Divider section />
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Grid>
                    {featuresArray.map(features => (
                        features.subType.includes(properType) &&
                        <Grid.Column mobile={8} tablet={8} computer={4} key={features.label}>
                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar as='a' src={features.icon} style={{width: "3em"}}/>
                                    <Comment.Content>
                                        <Comment.Text><Header as='h4'>{features.value}</Header></Comment.Text>
                                        <Comment.Text>{features.label}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                        </Grid.Column>
                    ))}
                </Grid>
            </div>
            <Divider section />
            <div>
                <Header as='h2' attached='top'>
                    Property Description
                </Header>
                <Segment attached>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </Segment>
            </div>
            <Divider section/>
            
            <DisplayFeatures property={property} properType={properType}/>

            <Header as="h2">Location Details</Header>
            <Header as="h3">Property Address</Header>
            <Segment>
                No. 25, Santa Clara, Santa Monica, California.
            </Segment>
            <Divider section />
            <Header as="h2">Owner Details</Header>
            <br/>
        </Segment>
    )
}

export default DisplayPropertyDetails;