import React, {useState, useEffect, useContext} from 'react';
import {Button, Grid, Header, Image, Segment, Container, Popup} from "semantic-ui-react";
import PostProperty from "./PostProperty"
import postPropertyIcon from '../../static/Icons/GeneralIcons/postPropertyIcon.svg'
import thumbsUp from '../ColorIcons/thumbsUp.svg'
import viewPropertyIcon from '../../static/Icons/GeneralIcons/viewPropertyIcon.svg'
import "./PostProperty.css"
import axios from "axios"
import InfoPageButton from "../UI/InfoPages/InfoPageButton"
import PortalMain from "../UI/PortalMain"

const CreatePropertyAd = (props) => {

    const [createdSuccess, setCreatedSuccess] = useState(false)
    const [createdPropertyId, setCreatedPropertyId] = useState("")
    const preSignedUrlListProp = useState([])
    const portalOpenProps = useState(false)
    const [portalOpen, setPortalOpen] = portalOpenProps
    const [portalMessage, setPortalMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const createPropertyAd = (params) => {
        setLoading(true)
        axios.post('/properties', params).then(res => {
            console.log(res)
            setLoading(false)
            setCreatedSuccess(true)
            setCreatedPropertyId(res.data.id)
        }).catch(err => {
            setLoading(false)
            setPortalOpen(true)
            setPortalMessage("An error has occured while posting your ad. Please try again later")
            console.log(err, err.response)
        })
    }

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
                <div>POST PROPERTY FOR SALE</div>
            </div>   
            {!createdSuccess ? 
                <PostProperty submitHandler={createPropertyAd} mode="create" 
                    loading={loading} preSignedUrlListProp={preSignedUrlListProp} />
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