import React, {useState, useEffect, useContext} from 'react';
import {Button, Grid, Header, Image, Segment, Container, Popup} from "semantic-ui-react";
import PostProperty from "./PostProperty"
import "./PostProperty.css"
import postPropertyIcon from '../../static/Icons/GeneralIcons/postPropertyIcon.svg'
import pageNotExist1 from '../../static/Icons/GeneralIcons/pageNotExistIcon1.svg'
import thumbsUp from '../ColorIcons/thumbsUp.svg'
import viewPropertyIcon from '../../static/Icons/GeneralIcons/viewPropertyIcon.svg'
import homePageIcon from '../../static/Icons/GeneralIcons/homePageIcon.svg'
import FullPageLoader from "../UI/FullPageLoader"
import InfoPageButton from "../UI/InfoPages/InfoPageButton"
import {furnishingItemsConstant, amenitiesConstants, moreAmenitiesConstants} from "../Utility/Constants"
import axios from "axios"
import AWS from 'aws-sdk'
import PortalMain from "../UI/PortalMain"

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
})

const s3Bucket = process.env.REACT_APP_BUCKET_NAME
const region = process.env.REACT_APP_BUCKET_REGION
const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_BUCKET_NAME},
    signatureVersion: 'v4',
    region: process.env.REACT_APP_BUCKET_REGION
})

const EditPropertyAd = (props) => {

    const [property, setProperty] = useState(null)
    const preSignedUrlListProp = useState([])
    const [preSignedUrlList, setPreSignedUrlList] = preSignedUrlListProp
    const [loading, setLoading] = useState(false)
    const [editedSuccess, setEditedSuccess] = useState(false)
    const [editedPropertyId, setEditedPropertyId] = useState("")
    const portalOpenProps = useState(false)
    const [portalOpen, setPortalOpen] = portalOpenProps
    const [portalMessage, setPortalMessage] = useState("")

    const editPropertyAd = (params) => {
        setLoading(true)
        axios.put(`/properties/${props.match.params.id}`, params).then(res => {
            console.log(res)
            setLoading(false)
            setEditedSuccess(true)
            setEditedPropertyId(res.data.id)
        }).catch(err => {
            setLoading(false)
            setEditedSuccess(false)
            setPortalOpen(true)
            setPortalMessage("An error has occured while updating your ad. Please try again later")
            console.log(err, err.response)
        })
    }

    const getPresignedUrls = async(image) => {
        return new Promise((resolve,reject) => {
            const myBucket2 = s3Bucket
            const myKey = image
            const signedUrlExpireSeconds = 60 * 5
            const params = {
                Bucket: myBucket2,
                Key: myKey,
                Expires: signedUrlExpireSeconds
            }
            myBucket.getSignedUrl('getObject', params, (err, url) => {
                if (err) reject(err);
                resolve(url);
            });
        })
    }

    const prepareAndSetProperty = async(data) => {
        const imagesList = []
        if(data.photos_list){
            const dataImagesList = JSON.parse(data.photos_list)
            for (let image of dataImagesList) {
                const signedUrl = await getPresignedUrls(image)
                imagesList.push(signedUrl)
            }
        }

        setPreSignedUrlList(imagesList)

        const furnishingsList = furnishingItemsConstant()
        const amenitiesList = amenitiesConstants()
        const moreAmenitiesList = moreAmenitiesConstants()

        JSON.parse(data.furnishings_list).map(furnishing => {
            furnishingsList[furnishing.name].active = true
            furnishingsList[furnishing.name].number = furnishing.quantity
        })

        const otherRooms = []
        JSON.parse(data.other_rooms_list).map(otherRoom => {
            otherRooms.push(otherRoom.name)
        })

        JSON.parse(data.amenities_list).map(amenity => {
            amenitiesList[amenity.name].active = true
        })

        JSON.parse(data.more_amenities_list).map(moreAmenity => {
            moreAmenitiesList[moreAmenity.name].active = true
        })

        data.furnishings_list = furnishingsList
        data.other_rooms_list = otherRooms
        data.amenities_list = amenitiesList
        data.more_amenities_list = moreAmenitiesList        

        setProperty(data)
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`/properties/${props.match.params.id}`).then(res => {
            console.log(res.data)
            prepareAndSetProperty(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err, err.response)
        })
    }, [])

    const portalProps = {
        portalOpenProps: portalOpenProps,
        icon: "time",
        header: "An error has occured",
        message: portalMessage
    }

    return(
        <div>
            <PortalMain {...portalProps} />
            <div id="page-title">
                <Image src={postPropertyIcon} style={{height: 45, width: 45, marginRight: 10}} />
                <div>EDIT POSTED PROPERTY</div>
            </div>
            {loading ?
                <FullPageLoader />
            :
                <>
                {property ?
                    <>
                    {!editedSuccess ?
                        <PostProperty submitHandler={editPropertyAd} property={property}
                            loading={loading} preSignedUrlListProp={preSignedUrlListProp} mode="edit" />
                    :
                        <div style={{textAlign: "center"}}>
                            <InfoPageButton icon={thumbsUp} message="Property has been updated successfully"
                                buttonIcon={viewPropertyIcon} buttonMessage="VIEW PROPERTY" 
                                buttonLink={`/property-display/${editedPropertyId}`} />
                        </div>
                    }
                    </>
                :
                    <InfoPageButton icon={pageNotExist1} message="The page you are looking for doesnot exist."
                        buttonIcon={homePageIcon} buttonMessage="GO TO HOMEPAGE" buttonLink="/" />
                }
                </>
            }
        </div>
    )
}

export default EditPropertyAd