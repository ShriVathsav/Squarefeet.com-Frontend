import React, {useState, Fragment, useEffect} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {subPropertyTypeConstant, generateSuperScript} from "../../Utility/Constants"
import ImageViewerModal from "./PropertyDisplay/DisplayComponents/ImageViewerModal"

import {propertyDisplayConvert} from "../../Utility/NumberConverter"

import "./PropertyCard.css";

import {Card, Image, Icon, Grid, Segment, Button, Header, Divider, Comment, Form, Item} from 'semantic-ui-react';
import compass2 from "../../Icons/compass.svg";
import bathroom from "../../Icons/bath.svg";
import price from "../../Icons/money.svg";
import area from "../../Icons/floor-plan.svg";
import age from "../../Icons/calendar.svg";
import bedroom from "../../Icons/bed.svg";
import favoriteActive from "../../Icons/favorite-active.svg";
import favorite from "../../Icons/favorite.svg";
import postedOn from "../../Icons/sticky-notes.svg";

import propertyPrice from "../../ColorIcons/propertyPrice.svg";
import superArea from "../../ColorIcons/superBuiltUpArea.svg";
import room from "../../ColorIcons/bedroom.svg";
import propertyType from "../../ColorIcons/propertyType.svg";
import floors from "../../ColorIcons/stairs.svg";
import propertyAge from "../../ColorIcons/propertyAge.svg";
import facing from "../../ColorIcons/facing.svg";

import postedBy1 from "../../ColorIcons/clip.svg";
import postedBy2 from "../../ColorIcons/share-post.svg";

import emptyImage from "../../ColorIcons/MainIcon/emptyImage.png";
import AWS from "aws-sdk"

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
})

const s3Bucket = process.env.REACT_APP_BUCKET_NAME
const region = process.env.REACT_APP_BUCKET_REGION
const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_BUCKET_NAME},
    signatureVersion: 'v4',
    region
})

const PropertyCard = (props) => {

    const shortListProps = useState(false)

    const [shortList, setShortList] = shortListProps
    const [imageList, setImageList] = useState([])
    const {property} = props

    const jsxGenerator = {
        priceJsx: (
            <div>
                <span>&#x20B9; </span>{propertyDisplayConvert(property.price)}
                {property.property_type === "Land" ? 
                    <span id="card-labels-2" style={{fontWeight: 200}}> @ {parseInt(property.price/property.plot_area)} / sq.ft.</span>
                :
                    <span id="card-labels-2" style={{fontWeight: 200}}> @ {parseInt(property.price/property.super_builtup_area)} / sq.ft.</span>
                }
            </div>
        ),
        rentJsx: (
            <div>
                <span>&#x20B9; </span>{propertyDisplayConvert(property.rent)}
                <div id="card-labels-2" style={{fontWeight: 200}}> per month</div>
            </div>
        ),
        propertyTypeJsx: (
            <div>
                {subPropertyTypeConstant[property.sub_property_type].name}
            </div>
        ),
        superBuiltUpAreaJsx: (
            <div>
                {property.super_builtup_area}<span id="card-labels-2" style={{fontWeight: 200}}> sq.ft.</span>
            </div>
        ),
        plotAreaJsx: (
            <div>
                {property.plot_area}<span id="card-labels-2" style={{fontWeight: 200}}> sq.ft.</span>
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
                        {property.property_on_floor !== 0 ? property.property_on_floor : "Ground"}
                            <span id="card-labels-2" style={{fontWeight: 200}}>
                                <sup>{property.property_on_floor !== 0 && generateSuperScript(property.property_on_floor)}</sup> out of </span>
                            {property.total_floors}
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
        )
    }

    const generator = [
        {id: 1, icon: propertyPrice, label: "Price", value: jsxGenerator.priceJsx, belongsTo: ["Apartment", "House", "Land", "Sale"]},
        {id: 2, icon: propertyPrice, label: "Rent", value: jsxGenerator.rentJsx, belongsTo: ["Apartment", "House", "Rent"]},
        {id: 3, icon: propertyType, label: "Property Type", value: jsxGenerator.propertyTypeJsx, belongsTo: ["Apartment", "House", "Land", "Sale", "Rent"]},
        {id: 4, icon: superArea, label: "Super Area", value: jsxGenerator.superBuiltUpAreaJsx, belongsTo: ["Apartment", "House", "Sale", "Rent"]},
        {id: 5, icon: superArea, label: "Plot Area", value: jsxGenerator.plotAreaJsx, belongsTo: ["Land", "Sale"]},
        {id: 6, icon: room, label: "Configuration", value: jsxGenerator.configurationJsx, belongsTo: ["Apartment", "House", "Sale", "Rent"]},
        {id: 7, icon: floors, label: "Floors", value: jsxGenerator.floorsJsx, belongsTo: ["Apartment", "House", "Sale", "Rent"]},
        {id: 8, icon: propertyAge, label: "Property Age", value: jsxGenerator.propertyAgeJsx, belongsTo: ["Apartment", "House", "Sale"]},
        {id: 9, icon: propertyAge, label: "Possession By", value: jsxGenerator.possessionByJsx, belongsTo: ["Apartment", "House", "Rent"]},
        {id: 10, icon: propertyAge, label: "Possession By", value: jsxGenerator.possessionByJsx, belongsTo: ["Land", "Sale"]},
        {id: 11, icon: floors, label: "Floors Allowed", value: jsxGenerator.floorsAllowedJsx, belongsTo: ["Land", "Sale"]},
    ]

    useEffect(() => console.log(property, "PROPERTY"))

    useEffect(() => {
        (async() => {
            const localImageList = []
            if(property.photos_list){
                for (let image of JSON.parse(property.photos_list)) {
                    const signedUrl = await getPresignedUrls(image)
                    console.log(signedUrl, "SIGNED URL BOOK DISPLAY")
                    localImageList.push(signedUrl)
                }   
            }
            setImageList(localImageList)
        })()
    }, [])

    const getPresignedUrls = async(image) => {
        //const s3 = new AWS.S3()
        console.log(image, "PRINTING IMAGE FOR WHICH PRESIGNED URL IS GEN")
        return new Promise((resolve,reject) => {
            const bucketName = s3Bucket
            const myKey = image
            const signedUrlExpireSeconds = 60 * 5
            const params = {
                Bucket: bucketName,
                Key: myKey,
                Expires: signedUrlExpireSeconds
            }
            myBucket.getSignedUrl('getObject', params, (err, url) => {
                if (err) {
                    console.log(err, "ERROR GEN PRESIGNED URLS")
                    reject(err)
                }
                resolve(url);
            });
        })
    }

    const dispImage2 = (
        <div style={{position: "relative", display: "inline-flex"}} id="card-image-2">
            <Image
                fluid rounded style={{cursor: "pointer", display: "inline-flex"}}
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
            <div style={{width: "100%", height: "20%", display: "flex", flexDirection: "row-reverse", alignItems: "center", bottom: 0,
                    position: "absolute", backgroundColor: "black", opacity: 0.8, borderRadius: ".3125em", cursor: "pointer" }} >
                <span style={{color: "white", marginRight: 25}} >No Photos Available</span>
                <Icon inverted name='picture' style={{marginRight: 7}}/>
            </div>
        </div>
    )

    return(
        <Fragment>
            <Card fluid raised>
                <Card.Content>
                <Grid>
                        <Grid.Column mobile={16} tablet={6} computer={6} stretched>
                            {/*<Segment fluid></Segment>*/}
                            {(!property.photos_list || JSON.parse(property.photos_list).length === 0) ?
                                <div>
                                    {dispImage2}
                                </div>
                            :
                                <div style={{display: "inline-flex"}}>
                                    <ImageViewerModal shortListProps={shortListProps} 
                                        property={{photos: imageList, id: property.id}} triggerObj="dispImage2"/>
                                </div>
                            }
                            {/*<Image src={"https://paranoidandroid.co/assets/wallpapers/2018/submerged_desktop_thumb.jpg"} size='massive' fluid/>*/}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={10} computer={10} id="card-content">
                            <div id="card-header">
                                {(property.property_type === "Land" ? subPropertyTypeConstant[property.sub_property_type].name : (property.bedrooms + " Bedroom " + subPropertyTypeConstant[property.sub_property_type].name)) + " for " + property.list_property_for + " in " + property.locality}
                            </div>

                            <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>

                                 {/*
                                {generator.map(item =>
                                    item.value !== "" &&
                                    <div key={item.id} style={{width: "33%"}} id="element-grid">
                                        <Comment.Group>
                                            <Comment>
                                                <Comment.Avatar as='a' src={item.icon} id="icons-responsives"/>
                                                <Comment.Content id="card-info-content">
                                                    <Comment.Text><div id="card-values">{item.value}</div></Comment.Text>
                                                    <Comment.Text><div id="card-labels">{item.label}</div></Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        </Comment.Group>
                                    </div>
                                )}
                                */}
                                {generator.map(item =>
                                    (item.belongsTo.includes(property.property_type) && item.belongsTo.includes(property.list_property_for)) &&
                                    <div key={item.id} style={{width: "33%"}} id="element-grid" >
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Image src={item.icon} id="icons-responsives"/>
                                            <div style={{marginLeft: 7}}>
                                                <div id="card-values" style={{wordBreak: "break-all", hyphens: "manual", lineHeight: "1.4em"}}>{item.value}</div>
                                                <div id="card-labels" style={{wordBreak: "break-all", hyphens: "manual", lineHeight: "1.2em"}}>{item.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>



                        </Grid.Column>
                </Grid>
            </Card.Content>
            <Divider style={{margin: "0px 14px"}} />

            <div style={{display: "flex", flexFlow: "row wrap", alignItems: "center", padding: "0px 7px"}}>
                <div id="extra-content-grid" style={{width: "50%", alignItems: "center", justifyContent: "flex-start"}}>
                    {/*<Comment.Group>
                        <Comment>
                            <Comment.Avatar src={postedBy1} id="icons-responsives"/>
                            <Comment.Content id="card-extra-content">
                                <Comment.Actions>
                                    <Comment.Action id="card-labels">Posted on May 23, 2020</Comment.Action>
                                </Comment.Actions>
                                <Comment.Text><Header as="h3" id="card-values">Individual Consultant</Header></Comment.Text>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>*/}

                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Image src={postedBy1} id="icons-responsives"/>
                            <div style={{marginLeft: 9}}>
                                <div id="card-labels" style={{lineHeight: "1.2em", marginTop: 0, marginBottom: 6}}>
                                    Posted on {moment(new Date(property.created_at)).format('ll')}
                                </div>
                                
                                {property.poster_designation === "Owner" ? 
                                    <span id="card-values" style={{backgroundColor: "#00b5ad", padding: "5px 10px", 
                                            color: "white", fontWeight: 600, textTransform: "uppercase"}}>
                                        {property.poster_designation}
                                    </span>
                                :
                                    <span id="card-values" style={{backgroundColor: "#fbbd08", padding: "5px 10px", 
                                            color: "white", fontWeight: 600, textTransform: "uppercase"}}>
                                        {property.poster_designation}
                                    </span>
                                }
                                
                            </div>
                        </div>
                </div>
                <div id="extra-content-grid"  style={{width: "50%", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                    <Image src={shortList? favoriteActive : favorite} style={{"cursor": "pointer"}}
                        onClick={() => setShortList(prev => !prev)} size="mini" id="card-favorite"/>
                    <Button id="card-button" color="purple" as={Link} to={`/property-display/${property.id}`}>
                        <Icon name='call' />View Details</Button>
                </div>
            </div>

            {/*
            <Card.Content extra>
                <Grid columns={2}>
                    <Grid.Column id="element-grid">
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src={postedBy1} id="icons-responsives"/>
                                <Comment.Content>
                                    <Comment.Actions>
                                        <Comment.Action id="card-labels">Posted on May 23, 2020</Comment.Action>
                                    </Comment.Actions>
                                    <Comment.Text><Header as="h3" id="card-values">Individual Consultant</Header></Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    </Grid.Column>
                    <Grid.Column id="element-grid">
                        <Button floated="right" size='mini' color="blue">View Owner Details</Button>
                        <Image src={shortList? favoriteActive : favorite} style={{"margin-right": 20, "cursor": "pointer"}}
                            onClick={() => setShortList(prev => !prev)} floated="right" size="mini"/>
                    </Grid.Column>
                    </Grid>
                </Card.Content>
                */}
            </Card>
        {/*
        <Card fluid raised>
            <Card.Content>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={8} computer={6} stretched>
                        
                        <Image src={"https://paranoidandroid.co/assets/wallpapers/2018/submerged_desktop_thumb.jpg"} size='massive' fluid/>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={10}>
                        <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Header>10 Bedroom Independent House in Delhi Central</Header>
                            </Grid.Column>
                        </Grid.Row>
                        </Grid>
                        <Grid columns="equal">
                        <Grid.Row>
                            <Grid.Column>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar as='a' src={price} />
                                        <Comment.Content>
                                            <Comment.Text><Header>1.25 Cr</Header></Comment.Text>
                                            <Comment.Text>Price</Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Grid.Column>
                            <Grid.Column>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar as='a' src={area} />
                                        <Comment.Content>
                                            <Comment.Text><Header>2000 sq.ft.</Header></Comment.Text>
                                            <Comment.Text>Area</Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Grid.Column>
                            <Grid.Column>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar as='a' src={bedroom} />
                                        <Comment.Content>
                                            <Comment.Text><Header>10 BHK</Header></Comment.Text>
                                            <Comment.Text>Rooms</Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar as='a' src={compass2} />
                                        <Comment.Content>
                                            <Comment.Text><Header>South</Header></Comment.Text>
                                            <Comment.Text>Facing</Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Grid.Column>
                            <Grid.Column><Comment.Group>
                                <Comment>
                                    <Comment.Avatar as='a' src={age} />
                                    <Comment.Content>
                                        <Comment.Text><Header>5 Years</Header></Comment.Text>
                                        <Comment.Text>Age of Property</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group></Grid.Column>
                            <Grid.Column><Comment.Group>
                                <Comment>
                                    <Comment.Avatar as='a' src={bathroom} />
                                    <Comment.Content>
                                        <Comment.Text><Header>5</Header></Comment.Text>
                                        <Comment.Text>Bathrooms</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group></Grid.Column>
                        </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Card.Content>
            <Card.Content extra>
                <Grid columns={2}>
                    <Grid.Column>
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src={postedOn} />
                                <Comment.Content>
                                    <Comment.Actions>
                                        <Comment.Action>Posted on May 23, 2020</Comment.Action>
                                    </Comment.Actions>
                                    <Comment.Text><Header as="h3">Individual Consultant</Header></Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    </Grid.Column>
                    <Grid.Column>
                <Button floated="right" size='large' color="blue">View Owner Details</Button>
                <Image size="mini" src={favorite} style={{"margin-right": 20, "cursor": "pointer"}} floated="right"/>
                </Grid.Column></Grid>
            </Card.Content>
        </Card>
    */}
        </Fragment>
    )
}

export default PropertyCard;