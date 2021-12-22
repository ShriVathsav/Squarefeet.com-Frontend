import React, {useState, Fragment} from 'react';
import {Grid, Header, Comment, Divider, Image} from "semantic-ui-react";

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


let images ={clubHouse2,privateTerrace2,rainWaterHarvesting2,shoppingCentre2,wasteDisposal2,waterPurifier2,
    wifi2,gym2,airCondition2,intercom2,security2,pool2,park2,fireAlarm2,fengShui2,maintenance2,cctv2,
    airConditioner,bulb,bed,cupBoard,curtain,diningTable,fan,modularKitchen,oven,sofa,refrigerator,stove,television,
    wardrobe,washingMachine,waterHeater}


const DisplayFeatures = (props) => {

    const {property, properType} = props

    const moreFeatures = [
        {icon: overLooking, label: "Overlooking", value: property.overlooking, subType: ["Apartment", "Land"]},
        {icon: waterSource, label: "Water Source", value: property.water_source, subType: ["Apartment", "Land"]},
        {icon: waterStorage, label: "Water Storage", value: property.capacity_of_water_storage+" litres", subType: ["Apartment"]},
        {icon: widthOfFacingRoad, label: "Width of Facing Road", value: property.width_of_facing_road+" ft.", subType: ["Apartment", "Land"]},
        {icon: flooring, label: "Flooring Type", value: property.flooring_type, subType: ["Apartment"]},
        {icon: flooring, label: "Gated Society", value: property.facing, subType: ["Apartment", "Land"]},
        {icon: flooring, label: "Corner Property", value: property.facing, subType: ["Apartment", "Land"]}
    ]

    const {clubHouse2,privateTerrace2,rainWaterHarvesting2,shoppingCentre2,wasteDisposal2,waterPurifier2,
        wifi2,gym2,airCondition2,intercom2,security2,pool2,park2,fireAlarm2,fengShui2,maintenance2,cctv2,
        airConditioner,bulb,bed,cupBoard,curtain,diningTable,fan,modularKitchen,oven,sofa,refrigerator,stove,television,
        wardrobe,washingMachine,waterHeater} = images

    console.log(properType, "propertype")
    return(
        <Fragment>
            <Header as="h2">Features</Header>

            <div style={{marginLeft: 20, marginRight: 20, display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>
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

            <div style={{marginLeft: 20, marginRight: 20}}>
                <Grid>
                    {moreFeatures.map(features => (
                        features.subType.includes(properType) &&
                        <Grid.Column mobile={8} tablet={8} computer={4} key={features.label}>
                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar as='a' src={features.icon} style={{width: "3em"}} />
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

            <Divider section/>

            <Header as="h2">Amenities</Header>
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Grid>
                    {property.amenities.map(item => (
                        <Grid.Column mobile={8} tablet={8} computer={4} key={item.name}>
                            <Header as='h4' image={eval(item.label)} content={item.name} />
                        </Grid.Column>
                    ))}
                </Grid>
            </div>

            <Divider section />

            <Header as="h2">Furnishing Details</Header>
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Grid>
                    {property.furnishings.map(item => (
                        <Grid.Column mobile={8} tablet={8} computer={4} key={item.name}>
                            <Header as='h4' image={eval(item.name)} content={item.name} />
                        </Grid.Column>
                    ))}
                </Grid>
            </div>
        </Fragment>
    )
}

export default DisplayFeatures;