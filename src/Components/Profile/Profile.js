import React, { useContext, useState, useEffect } from 'react'
import { Header, Segment, Table, Image, Button, Grid, Icon } from 'semantic-ui-react'
import userIcon from "../ColorIcons/userIcon-2.svg"
import viewIcon from "../../static/Icons/GeneralIcons/viewPropertyIcon.svg"
import postPropertyIcon from "../../static/Icons/GeneralIcons/postPropertyIcon.svg"
import loginIcon from "../../static/Icons/GeneralIcons/loginIcon.svg"
import {Link} from 'react-router-dom'
import EditProfile from "./EditProfile"
import {ViewContext} from "../ViewContext"
import Authentication from "../Authentication/Authentication"
import InfoPageButton from "../UI/InfoPages/InfoPageButton"
import "./Profile.css"
import axios from "axios"
import PropertyCard from "../ListProperty/Property/PropertyCard"


const Profile = (props) => {

    const {authenticatedUserProps} = useContext(ViewContext)
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps

    const [viewPropertyPosted, setViewPropertyPosted] = useState(false)
    const [propertyLoading, setPropertyLoading] = useState(false)
    const [propertyPostedList, setPropertyPostedList] = useState([])
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const [propertiesLoading, setPropertiesLoading] = useState(false)
    
    const trigger = (
        <Button floated="right" color="orange">
            <Icon name='pencil' />EDIT PROFILE
        </Button>
    )

    useEffect(() => {
        fetchProfileProperties()
    }, [])

    const fetchProfileProperties = () => {
        setPropertiesLoading(true)
        axios.get(`/profiles/getProperties/1`).then(res => {
            console.log(res.data, "PRINTING PROFILE RESPONSE")
            setPropertyPostedList(res.data)
            setPropertiesLoading(false)
            for(let data of res.data){
                console.log(data.id, data.photos_list)
            }
        }).catch(err => {
            setPropertiesLoading(false)
            console.log(err, err.response)
        })
    }

    const authTrigger = (
        <Button color="purple" size="large" style={{
                display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Image src={loginIcon} style={{height: 35, width: 35, marginRight: 12}} />
            <div>LOGIN / REGISTER</div>
        </Button>
    )

    return (
        (!!authenticatedUser && Object.keys(authenticatedUser).length === 0) ?
            <Segment style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                <div style={{fontWeight: 700, fontSize: 25, marginBottom: 24}}>
                    You are not logged in
                </div>
                <Authentication trigger={authTrigger} />
            </Segment>
        :
        <Grid>
            <Grid.Column width={16} stretched>
                <Header as="h2" dividing>Profile</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8} stretched>
                <Segment>
                    <Grid verticalAlign="middle">
                        <Grid.Column mobile={9} tablet={9} computer={10}>
                            <div style={{display: "flex", alignItems: "center"}}> 
                                <Image circular src={userIcon} style={{cursor: "pointer", display: "inline-block", marginRight: 16, width: 110}} />
                                <div>
                                    <div style={{fontWeight: 700, marginBottom: 14}} id="topic-font-3">
                                        {`${authenticatedUser.first_name} ${authenticatedUser.last_name}`}
                                    </div>
                                    {authenticatedUser.designation === "Owner" ? 
                                        <span id="content-font-1" style={{backgroundColor: "#00b5ad", padding: "5px 10px", 
                                                color: "white", fontWeight: 600, textTransform: "uppercase"}}>
                                            {authenticatedUser.designation}
                                        </span>
                                    :
                                        <span id="content-font-1" style={{backgroundColor: "#fbbd08", padding: "5px 10px", 
                                                color: "white", fontWeight: 600, textTransform: "uppercase"}}>
                                            {authenticatedUser.designation}
                                        </span>
                                    }
                                </div>                    
                            </div>
                        </Grid.Column>
                        <Grid.Column mobile={7} tablet={7} computer={6} >
                            <EditProfile trigger={trigger} authenticatedUserProps={authenticatedUserProps}/>
                        </Grid.Column>
                    </Grid>         
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8} stretched>
                <Segment>
                    <Header id="topic-font-3">Contact Information</Header>
                    <Table basic='very' celled unstackable>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={8}><Header as='h4' id="content-font-1">Email Address</Header></Table.Cell>
                                <Table.Cell id="content-font-1">{authenticatedUser.email}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Header as='h4' id="content-font-1">Contact Number</Header></Table.Cell>
                                <Table.Cell id="content-font-1">{authenticatedUser.contact_no}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header id="topic-font-3">User Activity</Header>
                    <Table basic='very' celled unstackable>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={8}><Header as='h4' id="content-font-1">Properties Sold</Header></Table.Cell>
                                <Table.Cell id="content-font-1">{authenticatedUser.properties_sold}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Header as='h4' id="content-font-1">Properties Posted</Header></Table.Cell>
                                <Table.Cell id="content-font-1">{authenticatedUser.properties_posted}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8} stretched>
                <Segment>
                    <Header id="topic-font-3">Company Information</Header>
                    <Table basic='very' celled unstackable>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={8}><Header as='h4' id="content-font-1">Company Name</Header></Table.Cell>
                                <Table.Cell id="content-font-1">{!!authenticatedUser.company_name ? authenticatedUser.company_name : "Unknown"}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Header as='h4' id="content-font-1">Company Address</Header></Table.Cell>
                                <Table.Cell id="content-font-1">{!!authenticatedUser.company_address ? authenticatedUser.company_address : "Unknown"}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
            </Grid.Column>
            <Grid.Column width={16}>
                <Header as="h2" dividing>Properties Posted</Header>
                <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: 14}}>
                {
                    (viewPropertyPosted && !propertyLoading) ?
                        (authenticatedUser.properties_posted === 0) ?
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <InfoPageButton icon={postPropertyIcon} message="You haven`t posted any properties yet"
                                buttonIcon={postPropertyIcon} buttonMessage="POST A PROPERTY" buttonLink="/post-property" />
                        </div>
                        :
                            <div>
                                <div>
                                    <Header as="h3" style={{textAlign: "center", margin: 10}}>
                                        {propertyPostedList.length} property ads posted by you</Header>
                                </div>
                                <div>
                                {propertyPostedList.length !== 0 && propertyPostedList.map(property => 
                                    <div key={property.id} style={{maxWidth: 900, padding: 14}}>
                                        <PropertyCard property={property} />
                                    </div>
                                )}
                                </div>
                            </div>
                    :
                        <Button style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 28}}
                                size="large" color="purple" onClick={() => setViewPropertyPosted(true)}>
                            <Image src={viewIcon} style={{height: 35, width: 35, marginRight: 10}} />
                            <div>View Properties Posted By You</div>
                        </Button>
                }
                </div>
            </Grid.Column>
        </Grid>
    )
}

export default Profile;