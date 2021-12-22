import React, { useState, useContext } from 'react'
import { Header, Segment, Label, Form, Button, Grid, Icon } from 'semantic-ui-react'
import userIcon from "../ColorIcons/userIcon-2.svg"
import {Link} from 'react-router-dom'

import {removeSpacesFromTextInput, validatePhone} from "../Utility/ValidateInputs"

const ERROR_MESSAGE_INPUT = "This field is mandatory"
const LAST_NAME_LENGTH_ERROR = "Last Name must contain 3 or more characters"

const EditProfileForm = (props) => {

    const {
        profileContactNumber, profileFirstName, profileLastName, profileCompanyName, 
            profileCompanyAddress, editProfileErrorProps
    } = props

    const [contactNumber, setContactNumber] = profileContactNumber
    const [firstName, setFirstName] = profileFirstName
    const [lastName, setLastName] = profileLastName
    const [companyName, setCompanyName] = profileCompanyName
    const [companyAddress, setCompanyAddress] = profileCompanyAddress
    const [editProfileError, setEditProfileError] = editProfileErrorProps

    return (
        <Form style={{margin: "14px 0px"}}>
            {(!!editProfileError && editProfileError.length !== 0) && 
                <div style={{backgroundColor: "#FF5733", padding: "8px 14px", marginBottom: 14, borderRadius: 3}}>
                    {editProfileError.map(err => <div key={err}>{err}</div>)}
                </div>
            }  
            <Grid>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' value={firstName}
                            onChange={(event) => {event.target.value !== " " && setFirstName(removeSpacesFromTextInput(event.target.value))}}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Last Name</label>
                        <input placeholder='Last Name' value={lastName}
                            onChange={(event) => {event.target.value !== " " && setLastName(removeSpacesFromTextInput(event.target.value))}}/>
                        {lastName === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                        {(lastName !== "" && lastName.length < 3) && <Label basic color='red' pointing>{LAST_NAME_LENGTH_ERROR}</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Contact Number</label>
                        <input placeholder='Contact Number' value={contactNumber}
                            onChange={(event) => {event.target.value === "" ? setContactNumber(event.target.value) : validatePhone(event.target.value) && setContactNumber(parseInt(event.target.value))}}/>
                        {contactNumber === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field>
                        <label>Company name</label>
                        <input placeholder='Company Name' value={companyName}
                            onChange={(event) => {event.target.value !== " " && setCompanyName(removeSpacesFromTextInput(event.target.value))}}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field>
                        <label>Company Address</label>
                        <input placeholder='Company Address' value={companyAddress}
                            onChange={(event) => {event.target.value !== " " && setCompanyAddress(removeSpacesFromTextInput(event.target.value))}}/>
                    </Form.Field>
                </Grid.Column>
            </Grid>
        </Form>
    )
}

export default EditProfileForm