import React, { useEffect, useState } from 'react'
import { Label, Segment, Form, Message, Radio } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import {Link} from 'react-router-dom'
import {removeSpacesFromTextInput, removeSpacesFromPasswordInput, validatePhone, validateEmail} from "../Utility/ValidateInputs"

const ERROR_MESSAGE_INPUT = "This field is mandatory"
const PASSWORD_LENGTH_ERROR = "Password must contain a minimum of 8 characters"
const PASSWORD_MATCH_ERROR = "Passwords don`t match"
const EMAIL_VALID_ERROR = "Not a valid Email"
const EMAIL_EXISTS_ERROR = "Email already exists"
const LAST_NAME_LENGTH_ERROR = "Last Name must contain 3 or more characters"

const Register = (props) => {

    const {registerEmail ,registerFirstName, registerLastName, registerDesignation, 
        registerContactNumber, registerPassword, registerConfirmPassword, registerError} = props

    const [email, setEmail] = registerEmail
    const [firstName, setFirstName] = registerFirstName
    const [lastName, setLastName] = registerLastName
    const [contactNumber, setContactNumber] = registerContactNumber
    const [password, setPassword] = registerPassword
    const [confirmPassword, setConfirmPassword] = registerConfirmPassword
    const [youAre, setYouAre] = registerDesignation
    const [errors, setErrors] = registerError
    const [formvalid, setFormValid] = props.registerFormValid

    const contactNumberKey = (e) => {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) { 
            return
        } else {
            e.preventDefault()
        }
    }

    

    return (
        <Form>
            {(!!errors && errors.length !== 0) && 
                <Message style={{marginBottom: 14, borderRadius: 3}} color='red'>
                    {errors.map(err => <div>{err}</div>)}
                </Message>
            }  
            <Form.Field required>
                <label>Email</label>
                <input placeholder='Username or Email' value={email}
                    onChange={(event) => {event.target.value !== " " && setEmail(removeSpacesFromPasswordInput(event.target.value))}}/>
                {email === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                {(email !== "" && !validateEmail(email)) && <Label basic color='red' pointing>{EMAIL_VALID_ERROR}</Label>}
            </Form.Field>
            <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' value={firstName}
                    onChange={(event) => {event.target.value !== " " && setFirstName(removeSpacesFromTextInput(event.target.value))}}/>
            </Form.Field>
            <Form.Field required>
                <label>Last Name</label>
                <input placeholder='Last name' value={lastName}
                    onChange={(event) => {event.target.value !== " " && setLastName(removeSpacesFromTextInput(event.target.value))}}/>
                {lastName === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                {(lastName !== "" && lastName.length < 3) && <Label basic color='red' pointing>{LAST_NAME_LENGTH_ERROR}</Label>}
            </Form.Field>
            <Form.Field required>
                <label>Contact Number</label>
                <input placeholder='Contact Number' value={contactNumber}
                    onChange={(event) => {event.target.value === "" ? setContactNumber(event.target.value) : validatePhone(event.target.value) && setContactNumber(parseInt(event.target.value))}}/>
                {contactNumber === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
            </Form.Field>
            <Form.Field required>
                <label>Password</label>
                <input placeholder='Password' value={password} type="password"
                    onChange={(event) => {event.target.value !== " " && setPassword(removeSpacesFromPasswordInput(event.target.value))}}/>
                {password === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                {(password !== "" && password.length < 9) && <Label basic color='red' pointing>{PASSWORD_LENGTH_ERROR}</Label>}
            </Form.Field>
            <Form.Field required>
                <label>Confirm Password</label>
                <input placeholder='Confirm Password' value={confirmPassword} type="password"
                    onChange={(event) => {event.target.value !== " " && setConfirmPassword(removeSpacesFromPasswordInput(event.target.value))}}/>
                {confirmPassword === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                {(confirmPassword !== "" && confirmPassword !== password) && <Label basic color='red' pointing>{PASSWORD_MATCH_ERROR}</Label>}
            </Form.Field>
            <Form.Field required>
                <label>You Are</label>
            </Form.Field>
            <Radio style={{width: "50%"}} label='Owner' name='radioGroup'
                value='Owner' checked={youAre === "Owner"} onChange={() => setYouAre("Owner")} />
            <Radio style={{width: "50%"}} label='Broker' name='radioGroup' 
                value='Broker' checked={youAre === "Broker"} onChange={() => setYouAre("Broker")} />
            
        </Form>
    )
}

export default Register;