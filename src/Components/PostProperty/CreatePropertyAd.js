import React, {useState, useEffect, useContext} from 'react';
import {Button, Grid, Header, Image, Segment, Container, Popup} from "semantic-ui-react";
import PostProperty from "./PostProperty"
import postPropertyIcon from '../../static/Icons/GeneralIcons/postPropertyIcon.svg'
import thumbsUp from '../ColorIcons/thumbsUp.svg'
import viewPropertyIcon from '../../static/Icons/GeneralIcons/viewPropertyIcon.svg'
import "./PostProperty.css"
import axios from "axios"
import InfoPageButton from "../UI/InfoPages/InfoPageButton"

const CreatePropertyAd = (props) => {

    const [createdSuccess, setCreatedSuccess] = useState(false)
    const [createdPropertyId, setCreatedPropertyId] = useState("")
    const preSignedUrlListProp = useState([])

    const createPropertyAd = (params) => {
        axios.post('/properties', params).then(res => {
            console.log(res)
            setCreatedSuccess(true)
            setCreatedPropertyId(res.data.id)
        }).catch(err => {
            //setPortalOpen(true)
            //setPortalMessage("An error has occured while posting property. Please try again later")
            console.log(err, err.response)
        })
    }

    return(
        <div>
            <div id="page-title">
                <Image src={postPropertyIcon} style={{height: 45, width: 45, marginRight: 10}} />
                <div>POST PROPERTY FOR SALE</div>
            </div>   
            {!createdSuccess ? 
                <PostProperty submitHandler={createPropertyAd} mode="create" preSignedUrlListProp={preSignedUrlListProp} />
            :
                <div style={{textAlign: "center"}}>
                    <InfoPageButton icon={thumbsUp} message="Property has been posted successfully"
                        buttonIcon={viewPropertyIcon} buttonMessage="VIEW PROPERTY" 
                        buttonLink={`/property-display/${createdPropertyId}`} />
                </div>
            }
        </div>
    )
}

export default CreatePropertyAd