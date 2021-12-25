import React, {useEffect, useState, useContext} from 'react';
import { Segment, Header, Button, Table, Image, Grid, Divider } from 'semantic-ui-react';
import Authentication from "../../../../Authentication/Authentication"
import { ViewContext } from '../../../../ViewContext';
import userIcon from "../../../../ColorIcons/userIcon-2.svg"
import loginIcon from "../../../../../static/Icons/GeneralIcons/loginIcon.svg"
import axios from 'axios';

let ownerDetailsDiv

const DisplayOwnerDetails = (props) => {

    const {authenticatedUserProps} = useContext(ViewContext)
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps
    const {screenWidth, property} = props
    const [postedUser, setPostedUser] = useState({})

    const propertyDetailsHeight = props.propertyDetailsHeightProps[0]
    const featuresHeight = props.featuresHeightProps[0]
    const locationDetailsHeight = props.locationDetailsHeightProps[0]
    const [ownerDetailsHeight, setOwnerDetailsHeight] = props.ownerDetailsHeightProps

    useEffect(() => {
        ownerDetailsDiv = document.getElementById("OwnerDetails")
    }, [])

    useEffect(() => setOwnerDetailsHeight(ownerDetailsDiv.offsetHeight), [screenWidth])

    const trigger = (
        <Button color="purple" size="large" style={{
                display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Image src={loginIcon} style={{height: 35, width: 35, marginRight: 12}} />
            <div>LOGIN / REGISTER</div>
        </Button>
    )

    useEffect(() => {
        if(!!authenticatedUser && Object.keys(authenticatedUser).length !== 0){
            axios.get(`/profiles/${property.profile_id}`).then(res => {
                console.log(res.data)
                setPostedUser(res.data)
            })
        }
    }, [authenticatedUser])

    return(
        <div id="OwnerDetails">
            <Header id="topic">
                Contact Details
            </Header>
            {(!!authenticatedUser && Object.keys(authenticatedUser).length === 0) ?
            <Segment style={{display: "flex", alignItems: "center", justifyContent: "center", 
                    flexDirection: "column", padding: 20}}>
                <div style={{fontWeight: 700, fontSize: 18, marginBottom: 24}}>
                    Please Sign In to view Contact Details
                </div>
                <Authentication trigger={trigger}/>
            </Segment>
            :
            <Segment>
                <Grid>
                    <Grid.Column mobile={16} tablet={6} computer={6} stretched>
                        <div style={{display: "flex", alignItems: "center"}}> 
                            <Image circular src={userIcon} style={{cursor: "pointer", display: "inline-block", marginRight: 16, width: 110}} />
                            <div>
                                <div style={{fontWeight: 700, marginBottom: 14}} id="topic-font-3">
                                    {(!!postedUser.first_name ? postedUser.first_name : "") + " " + postedUser.last_name}
                                </div>
                                {property.poster_designation === "Owner" ? 
                                    <span id="content-font-1" style={{backgroundColor: "#00b5ad", padding: "5px 10px", 
                                            color: "white", fontWeight: 600, textTransform: "uppercase"}}>
                                        {property.poster_designation}
                                    </span>
                                :
                                    <span id="content-font-1" style={{backgroundColor: "#fbbd08", padding: "5px 10px", 
                                            color: "white", fontWeight: 600, textTransform: "uppercase"}}>
                                        {property.poster_designation}
                                    </span>
                                }
                            </div>                    
                        </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={10} stretched>
                        <Header id="topic-font-3" style={{marginBottom: 0}}>Contact Information</Header>
                        <Table basic='very' celled unstackable>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={8}><Header as='h4' id="content-font-1">Email</Header></Table.Cell>
                                    <Table.Cell id="content-font-1">{postedUser.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><Header as='h4' id="content-font-1">Contact Number</Header></Table.Cell>
                                    <Table.Cell id="content-font-1">{postedUser.contact_no}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    </Grid>
                    <Divider />
                    <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Header id="topic-font-3" style={{marginBottom: 0}}>User Activity</Header>
                        <Table basic='very' celled unstackable>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={8}><Header as='h4' id="content-font-1">Properties Sold</Header></Table.Cell>
                                    <Table.Cell id="content-font-1">{postedUser.properties_sold}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><Header as='h4' id="content-font-1">Properties Posted</Header></Table.Cell>
                                    <Table.Cell id="content-font-1">{postedUser.properties_posted}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8} stretched>
                        <Header id="topic-font-3" style={{marginBottom: 0}}>Company Information</Header>
                        <Table basic='very' celled unstackable>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={8}><Header as='h4' id="content-font-1">Company Name</Header></Table.Cell>
                                    <Table.Cell id="content-font-1">{!!postedUser.company_name ? postedUser.company_name : "Unknown"}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><Header as='h4' id="content-font-1">Company Address</Header></Table.Cell>
                                    <Table.Cell id="content-font-1">{!!postedUser.company_address ? postedUser.company_address : "Unknown"}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Segment>
            }
        </div>
    )
}

export default DisplayOwnerDetails;