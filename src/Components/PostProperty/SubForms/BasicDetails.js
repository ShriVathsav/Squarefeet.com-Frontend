import React,{useState, useEffect} from 'react';
import {Icon, Form, Grid, Button, Header, Segment, Image, Label, Dropdown} from 'semantic-ui-react';
import owner from '../../Icons/BasicDetailsIcons/owner.svg'
import owner2 from '../../Icons/BasicDetailsIcons/owner-2.svg'
import broker from '../../Icons/BasicDetailsIcons/broker.svg'
import broker2 from '../../Icons/BasicDetailsIcons/broker-2.svg'
import land from '../../Icons/BasicDetailsIcons/residentialLand.svg'
import land2 from '../../Icons/BasicDetailsIcons/residentialLand-2.svg'
import house from '../../Icons/BasicDetailsIcons/house.svg'
import house2 from '../../Icons/BasicDetailsIcons/house-2.svg'
import apartment from '../../Icons/BasicDetailsIcons/apartment.svg'
import apartment2 from '../../Icons/BasicDetailsIcons/apartment-2.svg'

const imageStyle = {width: 60, display: "inline-block", marginBottom: "0.5em"}

const ERROR_MESSAGE_DROPDOWN = "Please select a value"

const listProperty = [
    { key: 'm', text: 'Sale', value: 'Sale' },
    { key: 'f', text: 'Rent', value: 'Rent' }
];

const typeOfApartment = [
    { key: 'm', text: 'Residential Apartment', value: "1" },
    { key: 'f', text: 'Independant/Builder Floor', value: "2" },
    { key: 'a', text: 'Studio Apartment', value: "3" },
    { key: 'b', text: 'Serviced Apartment', value: "4" }
];


const BasicDetails = (props) => {

    const [step, setStep] = props.step

    const {youAreProp, listPropertyForProp, propertyTypeProp, apartmentTypeProp, subPropertyTypeProp, basicDetailsValidProp} = props

    const [youAre, setYouAre] = youAreProp;
    const [listPropertyFor, setListPropertyFor] = listPropertyForProp;
    const [propertyType, setPropertyType] = propertyTypeProp;
    const [apartmentType, setApartmentType] = apartmentTypeProp;
    const [subPropertyType, setSubPropertyType] = subPropertyTypeProp
    const [basicDetailsValid, setBasicDetailsValid] = basicDetailsValidProp;

    const formValid = () => {
        const valid = youAre !== "" && listPropertyFor !== "" && !(listPropertyFor === "Rent" && propertyType === "Land") && 
            !(propertyType === "Apartment" && apartmentType === "")
        setBasicDetailsValid(valid)
        //return valid
    }

    useEffect(() => formValid())

    return(
        <div>
            <Header as='h2' textAlign="center">
                <Header.Content>Basic Details</Header.Content>
                <Header.Subheader>Fill in the basic details and find tenants and buyers quickly.</Header.Subheader>
            </Header>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Basic Details
            </Header>
                <Form>
                    <Grid>
                        <Grid.Column width={16}>
                            <Form.Field required inline>                        
                                <label style={{display: "block"}}>You Are</label>                            
                                <Grid columns={2} textAlign="center">
                                    <Grid.Column>
                                        <span id="iconhover" style={{"cursor": "pointer"}} onClick={()  => {setYouAre("Owner")}}>
                                            <Image src={youAre==="Owner" ? owner2 : owner} style={imageStyle} centered/>
                                            <p>Owner</p>
                                        </span>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <span id="iconhover" style={{"cursor": "pointer"}} onClick={() => setYouAre("Broker")}>
                                            <Image src={youAre==="Broker" ? broker2 : broker} style={imageStyle} centered/>
                                            <p>Broker</p>
                                        </span>
                                    </Grid.Column>
                                </Grid>
                                {youAre === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Form.Field required>
                                <label>List Property for</label>
                                <Dropdown fluid selection options={listProperty}
                                    placeholder='Select' value={listPropertyFor}
                                    onChange={(event, data) => setListPropertyFor(data.value)}
                                />
                                {listPropertyFor === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                            </Form.Field>                    
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Form.Field required>
                                <label>Property type</label>
                                <Grid columns={3} textAlign="center">
                                    <Grid.Column>
                                        <span id="iconhover" style={{"cursor": "pointer"}}
                                            onClick={()  => setPropertyType("Apartment")}>
                                            <Image src={propertyType==="Apartment" ? apartment2 : apartment} style={imageStyle} centered/>
                                            <p>Flat / Apartment</p>
                                        </span>
                                    </Grid.Column>
                                    {listPropertyFor !== "Rent" &&
                                    <Grid.Column>
                                        <span id="iconhover" style={{"cursor": "pointer"}}
                                            onClick={() => {setPropertyType("Land"); setSubPropertyType(4)}}>
                                            <Image src={propertyType==="Land" ? land2 : land} style={imageStyle} centered/>
                                            <p>Residential Land</p>
                                        </span>
                                    </Grid.Column>
                                    }
                                    <Grid.Column>
                                        <span id="iconhover" style={{"cursor": "pointer"}}
                                            onClick={()  => {setPropertyType("House"); setSubPropertyType(5)}}>
                                            <Image src={propertyType==="House" ? house2 : house} style={imageStyle} centered/>
                                            <p>House / Villa</p>
                                        </span>
                                    </Grid.Column>
                                </Grid>
                                {(propertyType === "" || (listPropertyFor === "Rent" && propertyType === "Land"))
                                    && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                            </Form.Field>
                        </Grid.Column>
                    
                    {propertyType === "Apartment" &&
                        <Grid.Column width={16}>
                            <Form.Field required>
                                <label>Type of Apartment</label>
                                <Dropdown fluid required selection options={typeOfApartment} placeholder='Select'
                                    value={apartmentType} onChange={(event, data) => {setApartmentType(data.value); setSubPropertyType(data.value)}}
                                />
                                {apartmentType === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                            </Form.Field>
                        </Grid.Column>
                    }
                    </Grid>
                </Form>
                <br/><br/>
                <Button.Group size="big" widths='2' >
                    <Button icon color="purple" labelPosition="right" onClick={() => {basicDetailsValid && setStep(2)}}>
                        Get Started!<Icon name='right arrow' />
                    </Button>
                </Button.Group>
                <br/><br/>
        </div>
    )
}

export default BasicDetails;