import React, {Fragment, useState, useEffect, useContext} from 'react';
import { Segment, Divider, Header, Icon, Image, Grid, Button } from 'semantic-ui-react';
import DisplayPropertyDetails from './DisplayComponents/DisplayPropertyDetails';
import DisplayFeatures from './DisplayComponents/DisplayFeatures';
import DisplayLocationDetails from './DisplayComponents/DisplayLocationDetails';
import DisplayOwnerDetails from './DisplayComponents/DisplayOwnerDetails';
import ImageViewer from './DisplayComponents/ImageViewer';
import axios from 'axios'
import {Context} from '../../../../context/Context'
import editPropertyIcon from '../../../../static/Icons/GeneralIcons/editPropertyIcon.svg'
import deletePropertyIcon from '../../../../static/Icons/GeneralIcons/deletePropertyIcon.svg'
import propertySoldIcon1 from '../../../../static/Icons/GeneralIcons/propertySoldIcon1.svg'
import "./DisplayDetails.css"
import {Link} from "react-router-dom"

let masterSegment
let timer

const DisplayDetails = (props) => {

    const {propsPassed, propertyProp, imageListProps} = props    
    const [property, setProperty] = propertyProp
    const properType = property.property_type
    const [headerHeight, setHeaderHeight] = propsPassed.headerHeightProps

    const {screenWidthProps, authenticatedUserProps, activeMenuProps, propertyDetailsHeightProps, 
        featuresHeightProps, locationDetailsHeightProps, ownerDetailsHeightProps} = useContext(Context)
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps
    const [archiveLoading, setArchiveLoading] = useState(false)
    const [markAsSoldLoading, setMarkAsSoldLoading] = useState(false)
    const screenWidth = screenWidthProps[0]    

    const heightProps = {        
        activeMenuProps, propertyDetailsHeightProps ,featuresHeightProps ,locationDetailsHeightProps, ownerDetailsHeightProps
    }
    const [activeMenu, setActiveMenu] = activeMenuProps

    useEffect(() => {
        masterSegment = document.getElementById("master-segment")
    }, [])

    const getHeader = () => propsPassed.headerHeightProps

    const getHash = () => {
        const offset = Math.abs(masterSegment.getBoundingClientRect().top - (headerHeight + 68 + 14))
        if(offset >= 0 && offset <= propertyDetailsHeightProps[0] + 28){
            setActiveMenu("PropertyDetails")
        } else if(offset > propertyDetailsHeightProps[0] + 28 && offset <= propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56){            
            setActiveMenu("Features")
        } else if(offset > propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 && offset <= propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 + locationDetailsHeightProps[0] + 56){
            setActiveMenu("LocationDetails")
        } else if(offset > propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 + locationDetailsHeightProps[0] + 56 && offset <= propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 + locationDetailsHeightProps[0] + 56 + ownerDetailsHeightProps[0] + 28){
            setActiveMenu("OwnerDetails")
        }
    }

    useEffect(() => {
        const offset = Math.abs(masterSegment.getBoundingClientRect().top - headerHeight - 68 - 14)
        if(activeMenu === "PropertyDetails" && !(offset >= 0 && offset <= propertyDetailsHeightProps[0] + 28)){
            window.scrollTo(0, 0)
        } else if(activeMenu === "Features" && !(offset > propertyDetailsHeightProps[0] + 28 && offset <= propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56)){
            window.scrollTo(0, propertyDetailsHeightProps[0] + 30)
        } else if(activeMenu === "LocationDetails" && !(offset > propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 && offset <= propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 + locationDetailsHeightProps[0] + 56)){
            window.scrollTo(0, propertyDetailsHeightProps[0] + 30 + featuresHeightProps[0] + 60)
        } else if(activeMenu === "OwnerDetails" && !(offset > propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 + locationDetailsHeightProps[0] + 56 && offset <= propertyDetailsHeightProps[0] + 28 + featuresHeightProps[0] + 56 + locationDetailsHeightProps[0] + 56 + ownerDetailsHeightProps[0] + 28)){
            window.scrollTo(0, propertyDetailsHeightProps[0] + 30 + featuresHeightProps[0] + 60 + locationDetailsHeightProps[0] + 60)
        }
    }, [activeMenu])

    useEffect(() => {
        const func = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                getHash()
            }, 500)
        } 
        window.addEventListener('scroll', func)  
        return () => window.removeEventListener("scroll", func)    
    })

    const changePropertyStatus = (status) => {
        const params = {
            id: property.id,
            posting_status: status
        }
        if(status === "Archived"){
            setArchiveLoading(true)
        } else if(status === "Sold"){
            setMarkAsSoldLoading(true)
        }
        axios.put(`/properties/${property.id}`, params).then(res => {
            console.log(res)
            setProperty(res.data)
            setArchiveLoading(false)
            setMarkAsSoldLoading(false)
        }).catch(err => {
            setArchiveLoading(false)
            setMarkAsSoldLoading(false)
            console.log(err, err.response)
        })
    }

    const deleteProperty = () => {
        axios.delete(`/properties/${property.id}`).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err, err.response)
        })
    }

    return(
        <Segment style={{marginTop: (headerHeight + 5)}} id="master-segment"> 
            <DisplayPropertyDetails  {...propsPassed} {...heightProps} screenWidth={screenWidth}
                imageListProps={imageListProps} />
            <Divider section/>          
            <DisplayFeatures property={property} properType={properType} {...heightProps} screenWidth={screenWidth}/>
            <Divider section/>
            <DisplayLocationDetails property={property} {...heightProps} screenWidth={screenWidth}/>            
            <Divider section />
            <DisplayOwnerDetails property={property} {...heightProps} screenWidth={screenWidth}/>
            {
                (!!authenticatedUser && Object.keys(authenticatedUser).length !== 0 && authenticatedUser.id === property.profile_id) &&
                <div style={{margin: "56px 14px 14px 14px"}}>
                    <Grid >
                        <Grid.Column mobile={16} tablet={8} computer={8} style={{display: "flex"}} className="d-flex align-center justify-center" >
                            <Button size="large" color='green' as={Link} to={`/editProperty/${property.id}`}
                                    className="d-flex align-center justify-center" style={{display: "flex"}}
                                    disabled={["Archived", "Sold"].includes(property.posting_status)} >
                                <Image src={editPropertyIcon} style={{width: 35, height: 35, marginRight: 10}} />
                                <div>EDIT PROPERTY</div>
                            </Button>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8} style={{display: "flex"}} className="d-flex align-center justify-center" >
                            <Button size="large" color='red' className="d-flex align-center justify-center"
                                    style={{display: "flex"}} loading={archiveLoading} disabled={property.posting_status === "Archived"}
                                    onClick={() => changePropertyStatus("Archived")} >
                                <Image src={deletePropertyIcon} style={{width: 35, height: 35, marginRight: 10}} />
                                <div>{property.posting_status === "Archived" ? "ARCHIVED" : "ARCHIVE PROPERTY"}</div>
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={16} style={{display: "flex"}} className="d-flex align-center justify-center" >
                            <Button size="large" color='purple' className="d-flex align-center justify-center"
                                    style={{display: "flex"}} loading={markAsSoldLoading} disabled={property.posting_status === "Sold"}
                                    onClick={() => changePropertyStatus("Sold")} >
                                <Image src={propertySoldIcon1} style={{width: 35, height: 35, marginRight: 13}} />
                                <div>{property.posting_status === "Sold" ? "SOLD" : "MARK PROPERTY AS SOLD"}</div>
                            </Button>
                        </Grid.Column>
                    </Grid>
                </div>
            }
        </Segment>  
    )
}

export default DisplayDetails;