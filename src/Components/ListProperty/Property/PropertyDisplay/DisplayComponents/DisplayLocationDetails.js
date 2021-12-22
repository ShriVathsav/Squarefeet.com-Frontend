import React, {useEffect, useState} from 'react';
import {Grid, Header, Icon, Segment} from "semantic-ui-react";

let map
let marker
const google = window.google
let locationDetailsDiv

const DisplayLocationDetails = (props) => {

    const {property, screenWidth} = props
    const [latitude, longitude] = property.location.split(",")

    useEffect(() => {
        map = new google.maps.Map(document.getElementById("map"),{
            zoom: 15,
            center: new google.maps.LatLng(latitude, longitude),
            maptypeId: google.maps.MapTypeId.ROADMAP
        })

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map
        })

        locationDetailsDiv = document.getElementById("LocationDetails")
    }, [])

    const propertyDetailsHeight = props.propertyDetailsHeightProps[0]
    const featuresHeight = props.featuresHeightProps[0]
    const [locationDetailsHeight, setLocationDetailsHeight] = props.locationDetailsHeightProps

    useEffect(() => setLocationDetailsHeight(locationDetailsDiv.offsetHeight), [screenWidth])

    return(
        <div id="LocationDetails">
        <Header id="topic">Location Details</Header>
            <Segment>
                <Header id="topic-font-3" dividing style={{fontWeight: 700, marginTop: 9}}>Property Address</Header>
                <div id="topic-font-3" style={{margin: "20px 0px 40px 0px"}}>
                    {property.door_no && "No. " + property.door_no}, {property.project_name}, {property.street}, {property.locality}, {property.landmark && property.landmark}, {property.city}
                </div>
                <Header dividing id="topic-font-3" style={{margin: "25px 0px 20px 0px"}}>
                    View Location on Map
                </Header>
                <div id="map" style={{backgroundColor: "red", height: 500}}></div>
            </Segment>
        </div>
    )
}

export default DisplayLocationDetails;