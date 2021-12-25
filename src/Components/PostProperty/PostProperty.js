import React, { useState, Fragment, useEffect } from 'react';
import { Step, Grid, Segment, Header, Image, Icon, Button } from 'semantic-ui-react';
import MainForm from './MainForm';
import {v4 as uuidv4} from "uuid"
import AWS from "aws-sdk"

import basicDetails from '../Icons/StepIcons/basicdetails.svg'
import locationDetails from '../Icons/StepIcons/locationDetails.svg'
import propertyDetails from '../Icons/StepIcons/propertyDetails.svg'
import pricingDetails from '../Icons/StepIcons/pricingDetails.svg'
import features from '../Icons/StepIcons/features.svg'
require("dotenv").config()

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

const PostProperty = (props) => {

    const stepProps = useState(1);

    const basicDetailsValidProp = useState(false);
    const locationValidProp = useState(false);
    const propertyDetailsValidProp = useState(false);
    const pricingValidProp = useState(false);
    const featuresValidProp = useState(false);

    const postedSuccessProps = useState(false)
    const [postedSuccess, setPostedSuccess] = postedSuccessProps
    const postedPropertyIdProps = useState(false)
    const [postedPropertyId, setPostedPropertyId] = postedPropertyIdProps

    const [basicDetailsValid, setBasicDetailsValid] = basicDetailsValidProp
    const [locationValid, setLocationValid] = locationValidProp
    const [propertyDetailsValid, setPropertyDetailsValid] = propertyDetailsValidProp
    const [pricingValid, setPricingValid] = pricingValidProp
    const [featuresValid, setFeaturesValid] = featuresValidProp
    const fillFormProp = useState(false)

    const uploadedImagesProp = useState(props.property ? JSON.parse(props.property?.photos_list) : []);
    const deletedImagesProp = useState([]);
    const inMemoryImagesProp = useState([]);
    const imageBlobListProp = useState([]);
    
    const [step, setStep] = stepProps

    const handleClick = (pest) => {
        switch(pest){
            case 1:
                setStep(1);
            case 2:
                basicDetailsValid && setStep(2);
            case 3:
                locationValid && setStep(3);
            case 4:
                propertyDetailsValid && setStep(4);
            case 5:
                pricingValid && setStep(5);
        }
        
    }

    const uploadImageToS3 =  async(data) => { 
        const objectKeysArray = []     
        for(const file of imageBlobListProp[0]){
            const objectKey = uuidv4() + " - " + file.name
            const params = {                    
                Body: file,
                Bucket: s3Bucket,
                Key: objectKey,
                ContentType: file.type
            }
            try{
                const res = await myBucket.putObject(params).promise()
                objectKeysArray.push(objectKey)
            } catch(err){
                //this.error = true
                //this.errorMessage = "An error occured"
                console.log(err, err.response)
                return
            }
            //let imagesList = this.uploadImageToS3()
        }
        const imagesList = [...uploadedImagesProp[0], ...objectKeysArray]
        data.photos_list = JSON.stringify(imagesList)
        console.log(data, imagesList)
        props.submitHandler(data)
    }

    const propsPassed = {stepProps, basicDetailsValidProp, locationValidProp, propertyDetailsValidProp, 
        pricingValidProp, featuresValidProp, handleClick, postedPropertyIdProps, postedSuccessProps,
        submitHandler: uploadImageToS3, fillFormProp, property: props.property, mode: props.mode,
        uploadedImagesProp, deletedImagesProp, inMemoryImagesProp, imageBlobListProp,
        preSignedUrlListProp: props.preSignedUrlListProp, loading: props.loading}

    useEffect(() => {
        if(basicDetailsValid === false){
            setLocationValid(false)
        }
    }, [basicDetailsValid])

    useEffect(() => {
        if(locationValid === false){
            setPropertyDetailsValid(false)
        }
    }, [locationValid])

    useEffect(() => {
        if(propertyDetailsValid === false){
            setPricingValid(false)
        }
    }, [propertyDetailsValid])

    useEffect(() => {
        if(pricingValid === false){
            setFeaturesValid(false)
        }
    }, [pricingValid])

    const stack = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            return true
        } else {
            return false
        }
    }   
    
    const fillForm = () => {
        fillFormProp[1](true)
    }

    return (
        <Grid>
            {props.mode === "create" &&
            <Grid.Column width={16}>
                <div style={{textAlign: "center"}} >
                    <div style={{fontSize: 12, marginBottom: 7}} >
                        Testing out this app? Click the below button to fill the form for you.
                    </div>
                    <Button color="purple" style={{borderRadius: "16px"}}
                        onClick={fillForm} >CLICK TO FILL THE FORM</Button>
                </div>
            </Grid.Column>
            }
            <Grid.Column style={{}} mobile={16} tablet={5} computer={5} id="step-grid">
                <Step.Group fluid vertical={!stack()} unstackable={stack()} id="mydiv">
                    <Step active={step === 1} link onClick={() => setStep(1)} id="step-item">
                        <Image src={basicDetails} size="mini" id="image"/>
                        <Step.Content>
                            <Step.Title id="step-title" style={{color: step === 1 ? "#a333c8": ""}}>Basic Details</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={step === 2} link onClick={() => basicDetailsValid && setStep(2)} id="step-item" >
                        <Image src={locationDetails} size="mini" id="image"/>
                        <Step.Content>
                            <Step.Title id="step-title" style={{color: step === 2 ? "#a333c8": ""}}>Location</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={step === 3} link onClick={() => locationValid && setStep(3)} id="step-item" >
                        <Image src={propertyDetails} size="mini" id="image"/>
                        <Step.Content style={{display: "flex", flexDirection: "row", flexFlow: "row wrap"}}>
                            <Step.Title id="step-title" style={{color: step === 3 ? "#a333c8": ""}}>Property Details</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={step === 4} link onClick={() => propertyDetailsValid && setStep(4)} id="step-item">
                        <Image src={pricingDetails} id="image" />
                        <Step.Content>
                            <Step.Title id="step-title" style={{color: step === 4 ? "#a333c8": ""}}>Pricing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={step === 5} link onClick={() => pricingValid && setStep(5)} id="step-item">
                        <Image src={features} size="mini" id="image" />
                        <Step.Content>
                            <Step.Title id="step-title" style={{color: step === 5 ? "#a333c8": ""}}>Features</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </Grid.Column>
            <Grid.Column style={{}} mobile={16} tablet={11} computer={11} id="form-grid"> 
                <Segment >
                    <MainForm {...propsPassed}/>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default PostProperty;