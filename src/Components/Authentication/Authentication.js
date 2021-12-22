import React, { useState, useContext } from 'react'
import { Menu, Segment, Modal, Header, Button } from 'semantic-ui-react'
import mainIcon from "../ColorIcons/MainIcon/mainIcon-3.svg"
import {Link} from 'react-router-dom'
import Login from "./Login"
import Register from "./Register"
import "./Authentication.css"
import axios from "axios"
import {ViewContext} from "../ViewContext"

const validateEmail = (email) => {
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
}

const Authentication = (props) => {
    
    const {authenticatedUserProps} = useContext(ViewContext)
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps
    
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState("login")

    const loginEmail = useState("")
    const loginPassword = useState("")
    const loginError = useState([])
    const [loginLoading, setLoginLoading] = useState(false)

    const registerEmail = useState("")
    const registerFirstName = useState("")
    const registerLastName = useState("")
    const registerContactNumber = useState("")
    const registerPassword = useState("")
    const registerConfirmPassword = useState("")
    const registerDesignation = useState("Owner")
    const registerError = useState([])
    const [registerLoading, setRegisterLoading] = useState(false)

    const loginFormValid = useState(false)
    const registerFormValid = useState(false)

    const loginParams = {
        email: loginEmail[0],
        password: loginPassword[0]
    }

    const registerParams = {
        email: registerEmail[0],
        password: registerPassword[0],
        contact_no: registerContactNumber[0],
        first_name: registerFirstName[0],
        last_name: registerLastName[0],
        designation: registerDesignation[0]
    }

    const isRegisterFormValid = () => {
        return registerEmail[0] !== "" && validateEmail(registerEmail[0]) && registerLastName[0] !== "" && registerLastName[0].length > 3 && 
            registerContactNumber[0] !== "" && registerPassword[0] !== "" && registerPassword[0].length > 8 && registerConfirmPassword[0] !== "" &&
            registerConfirmPassword[0] === registerPassword[0]
    }

    const isLoginFormValid = () => {
        return loginEmail[0] !== "" && validateEmail(loginEmail[0]) && loginPassword[0] !== ""
    }

    const loginHandler = () => {
        if(isLoginFormValid()){
            setLoginLoading(true)
            axios.post("/login", {...loginParams}).then((res) => {
                console.log(res)
                if(res.data.errors){
                    setLoginLoading(false)
                    loginError[1](res.data.errors)
                } else {
                    setAuthenticatedUser(res.data.user)
                    setLoginLoading(false)
                    localStorage.setItem("SquareFeetToken", res.data.token)    
                }
                //res.data.user && setOpen(false)
            }).catch(err => {
                setLoginLoading(false)
                loginError[1](["An error occured."])
                console.log(err, err.response)
            })
        }
    }

    const registerHandler = () => {
        if(isRegisterFormValid()){
            console.log(registerParams)
            setRegisterLoading(true)
            axios.post("/profiles", {...registerParams}).then((res) => {
                console.log(res)
                if(res.data.errors){
                    setRegisterLoading(false)
                    registerError[1](res.data.errors)
                } else {
                    setAuthenticatedUser(res.data.user)
                    setRegisterLoading(false)
                    localStorage.setItem("SquareFeetToken", res.data.token)    
                }
            }).catch(err => {
                setRegisterLoading(false)
                registerError[1](["An error occured."])
                console.log(err, err.response)
            })
        }
    }

    const loginProps = {loginEmail, loginPassword, loginFormValid, loginError}
    const registerProps = {registerEmail ,registerFirstName, registerLastName, registerFormValid,
        registerContactNumber, registerPassword, registerConfirmPassword, registerDesignation, registerError}

    return (
        <Modal size="tiny" closeIcon centered={false} onClose={() => setOpen(false)} id="modal"
                onOpen={() => setOpen(true)} open={open} trigger={props.trigger} >
            <Modal.Content>
                <div>
                    <Menu attached='top' tabular>
                    <Menu.Item active={activeItem === 'login'} onClick={() => setActiveItem("login")}
                        style={{width: "50%", margin: "0 0 -1px 0", textAlign: "center", justifyContent: "center"}}>
                        <div style={{fontSize: 19, fontWeight: 700}}>LOGIN</div>
                    </Menu.Item>
                    <Menu.Item active={activeItem === 'register'} onClick={() => setActiveItem("register")}
                        style={{width: "50%", margin: "0 0 -1px 0", textAlign: "center", justifyContent: "center"}}>
                        <div style={{fontSize: 19, fontWeight: 700}}>REGISTER</div>
                    </Menu.Item>
                    </Menu>

                    <Segment attached='bottom' style={{padding: 0}}>
                        <Modal.Content scrolling style={{padding: 14, maxHeight: "calc(60vh)"}}>
                        {activeItem === "login" && 
                            <Login {...loginProps} />
                        }
                        {activeItem === "register" && 
                            <Register {...registerProps} />
                        }
                        </Modal.Content>
                    </Segment>
                </div>
            </Modal.Content>
            <Modal.Actions>
                {activeItem === "login" ? 
                    <Button onClick={loginHandler} color="olive" fluid id="action-button" 
                            loading={loginLoading} size="large">
                        LOGIN
                    </Button>
                :
                    <Button onClick={registerHandler} color="olive" fluid id="action-button"
                            loading={registerLoading} size="large">
                        CREATE ACCOUNT
                    </Button>
                }                
            </Modal.Actions>
        </Modal>
    )
}

export default Authentication;