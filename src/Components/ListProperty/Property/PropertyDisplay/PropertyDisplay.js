import React, {Fragment, useState, useEffect, useContext} from 'react';
import { Segment, Container, Header, Icon, Image, Grid, Button } from 'semantic-ui-react';
import DisplayHeader from './DisplayComponents/DisplayHeader';
import DisplayDetails from "./DisplayDetails";
import ImageViewer from './DisplayComponents/ImageViewer';
import axios from 'axios'
import {PropertyDisplayContext} from "../../../PropertyDisplayContext"
import {AppContext} from "../../../AppContext"
import FullPageLoader from "../../../UI/FullPageLoader"
import InfoPageButton from "../../../UI/InfoPages/InfoPageButton"
import pageNotExist1 from "../../../../static/Icons/GeneralIcons/pageNotExistIcon1.svg"
import pageNotExist2 from "../../../../static/Icons/GeneralIcons/pageNotExistIcon2.svg"
import homePageIcon from "../../../../static/Icons/GeneralIcons/homePageIcon.svg"

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

let timer

const PropertyDisplay = (props) => {

    const propertyDisplayContext = useContext(PropertyDisplayContext)
    const {unitSelectedProps} = useContext(AppContext)

    const propertyProp = useState(null)
    const [property, setProperty] = propertyProp
    const shortListProps = useState(false)    
    const loadingProps = useState(false)
    const headerHeightProps = useState(0)

    const imageListProps = useState([])
    const [imageList, setImageList] = imageListProps
    const [loading, setLoading] = loadingProps

    const getImages = async(property) => {
        const localImageList = []
        if(property.photos_list){
            for (let image of JSON.parse(property.photos_list)) {
                const signedUrl = await getPresignedUrls(image)
                console.log(signedUrl, "SIGNED URL BOOK DISPLAY")
                localImageList.push(signedUrl)
            }   
        }
        setImageList(localImageList)
    }

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

    useEffect(() => {
        setLoading(true)
        axios.get(`/properties/${props.match.params.id}`).then(res => {
            console.log(res.data, "PRINTING PROPERTY DISPLAYH RESPONSE")
            setProperty(res.data)
            getImages(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err, err.response)
        })
    }, [])

    const propsPassed = {loadingProps, shortListProps, property, headerHeightProps}

    return(
        <Fragment>  
            {!loading ?
                <>
                    {property ?
                        <>
                            <DisplayHeader {...propsPassed}/>
                            <Container >
                                <DisplayDetails propertyProp={propertyProp} propsPassed={propsPassed}
                                    imageListProps={imageListProps} />
                            </Container>
                        </>
                    :
                        <>
                            <InfoPageButton icon={pageNotExist1} message="The page you are looking for doesnot exist." 
                                buttonIcon={homePageIcon} buttonMessage="GO TO HOMEPAGE" buttonLink="/" />
                        </>
                    }
                </>
                :
                <FullPageLoader />
            }
        </Fragment>  
    )
}

export default PropertyDisplay;