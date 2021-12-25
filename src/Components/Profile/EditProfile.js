import React, { useState, useContext } from 'react'
import { Header, Segment, Modal, Image, Button, Grid, Icon } from 'semantic-ui-react'
import userIcon from "../ColorIcons/userIcon-2.svg"
import {Link} from 'react-router-dom'
import EditProfileForm from './EditProfileForm'
import {validateEmail} from "../Utility/ValidateInputs"
import axios from 'axios'


const EditProfile = (props) => {

    const {authenticatedUserProps} = props
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps

    const [successMessage, setSuccessMessage] = useState(false)
    const editProfileErrorProps = useState([])
    const [editProfileLoading, setEditProfileLoading] = useState(false)
    const [editProfileError, setEditProfileError] = editProfileErrorProps
    const [open, setOpen] = useState(false)
    const profileContactNumber = useState(authenticatedUser.contact_no)
    const profileFirstName = useState(authenticatedUser.first_name || "")
    const profileLastName = useState(authenticatedUser.last_name)
    const profileCompanyName = useState(authenticatedUser.company_name || "")
    const profileCompanyAddress = useState(authenticatedUser.company_address || "")

    const formProps = {
        profileContactNumber, profileFirstName, profileLastName, profileCompanyName, 
            profileCompanyAddress, editProfileErrorProps
    }

    const editProfile = () => {
        if(isEditProfileFormValid){
            setEditProfileLoading(true)
            axios.put(`/profiles/${authenticatedUser.id}`, {
                contact_no: profileContactNumber[0],
                first_name: profileFirstName[0],
                last_name: profileLastName[0],
                company_name: profileCompanyName[0],
                company_address: profileCompanyAddress[0],
            }).then(res => {
                console.log(res)
                if(res.data.errors){
                    setEditProfileLoading(false)
                    setEditProfileError(res.data.errors)
                } else {
                    setEditProfileLoading(false)
                    !!res.data.user && setAuthenticatedUser(res.data.user)
                    setSuccessMessage(true)
                }
            }).catch(err => {
                setEditProfileLoading(false)
                console.log(err, err.response)
            })
        }
        setEditProfileLoading(false)
    }

    const isEditProfileFormValid = () => {
        return profileLastName[0] !== "" && profileLastName[0].length > 3 && profileContactNumber[0] !== ""
    }

    return (
        <Modal open={open} trigger={props.trigger} onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)} size="small" closeOnDimmerClick={false}>
            <Header icon='pencil' content='Edit Profile' />
            <Modal.Content>
                {successMessage && 
                    <div style={{backgroundColor: "#21ba45", width: "100%", padding: 14, borderRadius: 5, fontSize: 16, color: "white"}}>
                        Changes have been made successfully
                    </div>
                }
                <EditProfileForm {...formProps}/>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)} disabled={editProfileLoading}>
                    <Icon name='remove' /> Close
                </Button>
                <Button color='green' onClick={editProfile} loading={editProfileLoading}>
                    <Icon name='checkmark' /> Save
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditProfile;