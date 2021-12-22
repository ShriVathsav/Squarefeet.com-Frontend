import React, {useState, useEffect, useContext} from 'react';
import {Button, Grid, Header, Icon, Segment, Container, Popup} from "semantic-ui-react";
import moment from "moment"
import MenuTab from "./MenuTab";
import "./DisplayHeader.css"
import shortlist from '../../../../Icons/DisplayPropertyIcons/shortlist.svg'
import shortlist2 from '../../../../Icons/DisplayPropertyIcons/shortlist-2.svg'
import PropertyCard from '../../PropertyCard';
import {ViewContext} from "../../../../ViewContext"
import {AppContext} from "../../../../AppContext"
import {convertArea} from "../../../../Utility/AreaConvert"
import {propertyDisplayConvert} from "../../../../Utility/NumberConverter"
import {subPropertyTypeConstant} from "../../../../Utility/Constants"

let masterHeader
const DisplayHeader = (props) => {

    const [shortList, setShortList] = props.shortListProps
    const {unitSelectedProps} = useContext(AppContext)
    const [areaUnit, setAreaUnit] = unitSelectedProps
    const {property} = props

    const {screenWidthProps} = useContext(ViewContext) 
    const screenWidth = screenWidthProps[0]
    const [headerHeight, setHeaderHeight] = props.headerHeightProps

    useEffect(() => {
        masterHeader = document.getElementById("master-header")
    }, [])

    useEffect(() => setHeaderHeight(masterHeader.offsetHeight), [screenWidth])

    useEffect(() => console.log(headerHeight, 'HEADER HEIGHT'), [headerHeight])

    const stack = () => {
        console.log("screen width", screenWidth)
        return screenWidth <= 767 ? true : false
        //return (window.matchMedia("(max-width: 767px)").matches) ? true : false
    } 

    const jsxGenerator = {
        priceJsx: (function() {
            let str = ""
            if(property.list_property_for === "Sale"){
                if(property.property_type === "Land"){
                    return <span> @ {parseInt(property.price/convertArea(property.plot_area, areaUnit))} / {areaUnit}</span>
                } else {
                    return <span> @ {parseInt(property.price/convertArea(property.super_builtup_area, areaUnit))} / {areaUnit}</span>
                }
            } else {
                return "per month"
            }
        }()),
        subHeaderJsx: (function() {
            const renderer = (property.list_property_for === "Sale") ? 
                <strong style={{textTransform: "uppercase", backgroundColor: "blue", padding: "3px 6px", color: "white"}}>
                    {property.list_property_for}</strong>
            :
                <strong style={{textTransform: "uppercase", backgroundColor: "#db2828", padding: "3px 6px", color: "white"}}>
                    {property.list_property_for}</strong>
            return (
                <div style={{marginTop: 5}}>
                    {subPropertyTypeConstant[property.sub_property_type || 0].name} for {renderer}
                </div>
            )
        }())
    }

    return(
        <div style={{position: "fixed", top: 66, width: "100%", zIndex: 100, paddingTop: "27px", backgroundColor: "white"}} id="master-header">
            <Container>
                <Segment style={{margin: 0, borderRadius: 0 }} id="segment-header-main">            
                    <Grid>
                        <Grid.Column mobile={6} tablet={4} computer={4}>
                            <Header>
                            {!stack() && <Icon name="rupee sign" />}
                                <Header.Content id="display-header-main">
                                    {stack() && <span>&#x20B9; </span>}
                                    {property.list_property_for === "Rent" ? propertyDisplayConvert(property.rent) : propertyDisplayConvert(property.price)}
                                    <Header.Subheader id="subheader" style={{marginTop: 7}}>
                                        {jsxGenerator.priceJsx}
                                        <div id="posted-by" className="posted-by-header" >
                                            Posted on {moment(new Date(property.created_at)).format('ll')}
                                        </div>
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column mobile={10} tablet={7} computer={7}>
                            <Header as='h3' id="display-header">
                                {property.property_type !== "Land" ? 
                                    (!stack() ? <span>{property.bedrooms} Bedrooms {property.bathrooms} Bathrooms</span> : <span>{property.bedrooms} BHK {property.bathrooms} Bath</span>)
                                    :
                                    convertArea(property.plot_area, areaUnit) + " " + areaUnit
                                }
                                <Header.Subheader id="subheader">
                                    {jsxGenerator.subHeaderJsx}
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>  
                        <Grid.Column mobile={16} tablet={5} computer={5} verticalAlign="middle" id="shortlist-button">                    
                            <div style={{float: "right"}} >
                            {!stack() &&
                                <Button basic={!shortList} color="red" floated="right" style={{borderRadius: 0, margin: "0px 0px 7px 0px"}}
                                    onClick={() => setShortList(prev => !prev)} size="large">
                                    <Icon name={shortList ? "star" : "star outline"} color={shortList ? "yellow" : ""} style={{zIndex: 2}}/>
                                    {shortList ? "Shortlisted" : "Shortlist"}
                                </Button>
                            }
                                <div id="posted-by" >
                                    Posted on {moment(new Date(property.created_at)).format('ll')}
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid>
                    <div style={{overflow: "hidden"}}>
                        <MenuTab/>
                    </div>                    
                </Segment>
            </Container>
        </div>
    )
}

export default DisplayHeader;