import React, {useState, Fragment, useEffect} from 'react';
import {Grid, Header, Comment, Divider, Image} from "semantic-ui-react"
import {v4 as uuidv4} from "uuid"

import {otherRoomsConstant, furnishingItemsConstant, amenitiesConstants, moreAmenitiesConstants} from "../../../../Utility/Constants"

import wifi2 from '../../../../Icons/FeatureIcons/wifi-2.svg';
import gym2 from '../../../../Icons/FeatureIcons/gym-2.svg';
import airCondition2 from '../../../../Icons/FeatureIcons/airconditioning-2.svg';
import intercom2 from '../../../../Icons/FeatureIcons/intercom-2.svg';
import security2 from '../../../../Icons/FeatureIcons/security-2.svg';
import pool2 from '../../../../Icons/FeatureIcons/swimming-pool-2.svg';
import park2 from '../../../../Icons/FeatureIcons/park-2.svg';
import fireAlarm2 from '../../../../Icons/FeatureIcons/fire-alarm-2.svg';
import fengShui2 from '../../../../Icons/FeatureIcons/fengshui-2.svg';
import maintenance2 from '../../../../Icons/FeatureIcons/maintenance-2.svg';
import cctv2 from '../../../../Icons/FeatureIcons/cctv-2.svg';

import clubHouse2 from "../../../../Icons/FeatureIcons/MoreAmenitiesIcons/club-house-2.svg"
import privateTerrace2 from "../../../../Icons/FeatureIcons/MoreAmenitiesIcons/private-terrace-2.svg"
import rainWaterHarvesting2 from "../../../../Icons/FeatureIcons/MoreAmenitiesIcons/rain-water-harvesting-2.svg"
import shoppingCentre2 from "../../../../Icons/FeatureIcons/MoreAmenitiesIcons/shopping-centre-2.svg"
import wasteDisposal2 from "../../../../Icons/FeatureIcons/MoreAmenitiesIcons/waste-disposal-2.svg"
import waterPurifier2 from "../../../../Icons/FeatureIcons/MoreAmenitiesIcons/water-purifier-2.svg"

import widthOfFacingRoad from "../../../../ColorIcons/widthOfFacingRoad.svg";
import overLooking from "../../../../ColorIcons/overlooking.svg";
import flooring from "../../../../ColorIcons/flooring.svg";
import waterStorage from "../../../../ColorIcons/waterStorage.svg";
import waterSource from "../../../../ColorIcons/waterSource.svg";

//=====FURNISHING ICONS=====

import airConditioner from '../../../../FurnishingIcons/airConditioner.svg'
import bulb from '../../../../FurnishingIcons/bulb.svg'
import bed from '../../../../FurnishingIcons/bed.svg'
import cupBoard from '../../../../FurnishingIcons/cupboard.svg'
import curtain from '../../../../FurnishingIcons/curtain.svg'
import diningTable from '../../../../FurnishingIcons/dinner.svg'
import fan from '../../../../FurnishingIcons/fan.svg'
import modularKitchen from '../../../../FurnishingIcons/modularKitchen.svg'
import oven from '../../../../FurnishingIcons/oven.svg'
import refrigerator from '../../../../FurnishingIcons/refrigerator.svg'
import sofa from '../../../../FurnishingIcons/sofa.svg'
import stove from '../../../../FurnishingIcons/stove.svg'
import television from '../../../../FurnishingIcons/television.svg'
import wardrobe from '../../../../FurnishingIcons/wardrobe.svg'
import washingMachine from '../../../../FurnishingIcons/washing-machine.svg'
import waterHeater from '../../../../FurnishingIcons/waterHeater.svg'
import gatedSociety from '../../../../ColorIcons/gatedSociety.svg'
import cornerProperty from '../../../../ColorIcons/cornerProperty.svg'

let featuresDiv

let images ={clubHouse2,privateTerrace2,rainWaterHarvesting2,shoppingCentre2,wasteDisposal2,waterPurifier2,
    wifi2,gym2,airCondition2,intercom2,security2,pool2,park2,fireAlarm2,fengShui2,maintenance2,cctv2,
    airConditioner,bulb,bed,cupBoard,curtain,diningTable,fan,modularKitchen,oven,sofa,refrigerator,stove,television,
    wardrobe,washingMachine,waterHeater}


const amenitiesConstantList = amenitiesConstants()
const moreAmenitiesConstantList = moreAmenitiesConstants()

const DisplayFeatures = (props) => {

    const {property, properType, screenWidth} = props
    const furnishingConstant = furnishingItemsConstant()

    const otherRooms = () => {
        const otherRooms = JSON.parse(property.other_rooms_list)
        return otherRooms?.map(r => {
            return {icon: otherRoomsConstant[r.name-1].icon, label: otherRoomsConstant[r.name-1].name, value: "Presence of", subType: ["Apartment", "Land", "House"]}
        })
    }

    const moreFeatures = [
        {icon: overLooking, label: "Overlooking", value: property.overlooking, subType: ["Apartment", "Land", "House"]},
        {icon: waterSource, label: "Water Source", value: property.water_source, subType: ["Apartment", "Land", "House"]},
        {icon: waterStorage, label: "Water Storage", value: property.capacity_of_water_storage+" litres", subType: ["Apartment", "House"]},
        {icon: widthOfFacingRoad, label: "Width of Facing Road", value: property.width_of_facing_road+" " + property.width_of_facing_road_unit, subType: ["Apartment", "Land", "House"]},
        {icon: flooring, label: "Flooring Type", value: property.flooring_type ? property.flooring_type : "Others", subType: ["Apartment", "House"]},
        {icon: gatedSociety, label: "In a Gated Society", value: property.gated_society ? "Present" : "Not Present", subType: ["Apartment", "Land", "House"]},
        {icon: cornerProperty, label: "Is a Corner Property?", value: property.corner_property ? "Yes" : "No", subType: ["Apartment", "Land", "House"]},
        ...otherRooms()
    ]

    const {clubHouse2,privateTerrace2,rainWaterHarvesting2,shoppingCentre2,wasteDisposal2,waterPurifier2,
        wifi2,gym2,airCondition2,intercom2,security2,pool2,park2,fireAlarm2,fengShui2,maintenance2,cctv2,
        airConditioner,bulb,bed,cupBoard,curtain,diningTable,fan,modularKitchen,oven,sofa,refrigerator,stove,television,
        wardrobe,washingMachine,waterHeater} = images

    console.log(properType, "propertype")

    useEffect(() => {
        featuresDiv = document.getElementById("Features")
        console.log(JSON.parse(property.amenities_list))
    }, [])

    const propertyDetailsHeight = props.propertyDetailsHeightProps[0]
    const [featuresHeight, setFeaturesHeight] = props.featuresHeightProps

    useEffect(() => setFeaturesHeight(featuresDiv.offsetHeight), [screenWidth])

    return(
        <div id="Features">
            <Header id="topic">Features</Header>
            <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}   >
                {moreFeatures.map(features => (
                    features.subType.includes(properType) &&
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
            <Divider section/>
            {property.property_type !== "Land" &&
                <Fragment>
                    {property.amenities_list && <Header id="sub-topic">Amenities</Header>}
                    <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>
                        {property.amenities_list && [...JSON.parse(property.amenities_list)].map(item => (
                            <div key={item.name} id="card-grid-column" >
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <Image src={amenitiesConstantList[item.name].icon2} id="icons-responsive"/>
                                    <div style={{marginLeft: 7}}>
                                        <div id="card-value" style={{wordBreak: "break-all", lineHeight: "1.4em"}}>
                                            {amenitiesConstantList[item.name].name}  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {property.more_amenities_list && [...JSON.parse(property.more_amenities_list)].map(item => (
                            <div key={item.name} id="card-grid-column" >
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <Image src={moreAmenitiesConstantList[item.name].icon2} id="icons-responsive"/>
                                    <div style={{marginLeft: 7}}>
                                        <div id="card-value" style={{wordBreak: "break-all", lineHeight: "1.4em"}}>
                                            {moreAmenitiesConstantList[item.name].name}  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Divider section />
                    {property.furnishing !== "2" &&                    
                    <>
                        <Header id="sub-topic">Furnishing Details</Header>
                        <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>
                            {JSON.parse(property.furnishings_list).map(item => (
                                <div key={item.name} id="card-grid-column" >
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Image src={furnishingConstant[item.name].icon} id="icons-responsive"/>
                                        <div style={{marginLeft: 7}}>
                                            <div id="card-value" style={{wordBreak: "break-all", lineHeight: "1.4em", fontWeight: 500}}>
                                                {furnishingConstant[item.name].name}  
                                            </div>
                                            <div id="card-label" style={{lineHeight: "1.2em", fontWeight: 700}}>
                                                {(item.quantity === 0 && item.active === true) ? "Present" : item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}            
                        </div>
                    </>
                    }
                </Fragment>
            }
        </div>
    )
}

export default DisplayFeatures;