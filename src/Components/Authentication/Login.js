import React, { useState } from 'react'
import { Message, Segment, Label, Form, Button } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import {Link} from 'react-router-dom'
import {removeSpacesFromTextInput, removeSpacesFromPasswordInput, validateEmail} from "../Utility/ValidateInputs"

const ERROR_MESSAGE_INPUT = "This field is mandatory"
const EMAIL_VALID_ERROR = "Not a valid Email"
const LOGIN_ERROR = "Invalid Credentials"


const Login = (props) => {

    const [email, setEmail] = props.loginEmail
    const [password, setPassword] = props.loginPassword
    const [errors, setErrors] = props.loginError
    const [formvalid, setFormValid] = props.loginFormValid

    return (
        <Form>            
            {(!!errors && errors.length !== 0) && 
                <Message style={{marginBottom: 14, borderRadius: 3}} color='red'>
                    {errors.map(err => <div key={err}>{err}</div>)}
                </Message>
            }            
            <Form.Field required>
                <label>Email</label>
                <input placeholder='Username or Email' value={email}
                    onChange={(event) => {event.target.value !== " " && setEmail(removeSpacesFromPasswordInput(event.target.value))}}/>
                {email === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                {(email !== "" && !validateEmail(email)) && <Label basic color='red' pointing>{EMAIL_VALID_ERROR}</Label>}
            </Form.Field>
            <Form.Field required>
                <label>Password</label>
                <input placeholder='Enter Password' value={password} type="password"
                    onChange={(event) => {event.target.value !== " " && setPassword(removeSpacesFromPasswordInput(event.target.value))}}/>
                {password === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
            </Form.Field>
        </Form>
    )
}

export default Login;