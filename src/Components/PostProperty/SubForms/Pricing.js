import React,{useState, useEffect, Fragment} from 'react';
import {Input, Form, Grid, Dropdown, Radio, Button, Icon, Header, Label} from 'semantic-ui-react';
import {inWords, propertyDisplayConvert} from '../../Utility/NumberConverter'
import {validateNumeric} from "../../Utility/ValidateInputs"

const ERROR_MESSAGE_INPUT = "This field is mandatory"
const ERROR_MESSAGE_DROPDOWN = "Please select a value"


const ownership = [
    { key: 'm', text: 'Freehold', value: 'Freehold' },
    { key: 'f', text: 'Leasehold', value: 'Leasehold' },
    { key: 'o', text: 'Power of Attorney', value: 'Power of Attorney' },
    { key: 'b', text: 'Cooperative Society', value: 'Cooperative Society' }
];

const maintenance = [
    { key: 'm', text: 'Monthly', value: 'Monthly' },
    { key: 'f', text: 'Annually', value: 'Annually' },
    { key: 'o', text: 'One Time', value: 'One Time' }
];

const negotiableOptions = [
    { key: 'm', text: 'Negotiable', value: true },
    { key: 'f', text: 'Non-Negotiable', value: false }
]

const Pricing = (props) => {
    const [step, setStep] = props.step

    const {ownerShipProp, expectedPriceProp, allPricesInclusiveProp, priceNegotiableProp, brokerageProp, rentNegotiableProp,
        youAreProps, bookingAdvanceProp, maintenanceChargesProp, expectedRentalProp, securityDepositProp, maintenanceUnitProp,
        brokerageNegotiableProp, expectedRentProp, propertyTypeProps, pricingValidProp, listPropertyForProps} = props

    const [ownerShip, setOwnerShip] = ownerShipProp
    const [expectedPrice, setExpectedPrice] = expectedPriceProp
    const [allPricesInclusive, setAllPricesInclusive] = allPricesInclusiveProp
    const [priceNegotiable, setPriceNegotiable] = priceNegotiableProp
    const [bookingAdvance, setBookingAdvance] = bookingAdvanceProp
    const [maintenanceCharges, setMaintenanceCharges] = maintenanceChargesProp
    const [maintenanceUnit, setMaintenanceUnit] = maintenanceUnitProp
    const [expectedRental, setExpectedRental] = expectedRentalProp
    const [brokerage, setBrokerage] = brokerageProp
    const [pricingValid, setPricingValid] = pricingValidProp
    const [securityDeposit, setSecurityDeposit] = securityDepositProp
    const [expectedRent, setExpectedRent] = expectedRentProp
    const [rentNegotiable, setRentNegotiable] = rentNegotiableProp
    const [brokerageNegotiable, setBrokerageNegotiable] = brokerageNegotiableProp

    useEffect(() => console.log(ownerShip, expectedPrice, allPricesInclusive, priceNegotiable,
        bookingAdvance, maintenanceCharges, expectedRental));

    
    const formValid = () => {
        let valid;
        if(listPropertyForProps === "Sale"){
            valid = (ownership !== "" && expectedPrice !== "" && bookingAdvance !== "" && 
                (propertyTypeProps === "Apartment" ? maintenanceCharges !== "" : true) && (youAreProps === "Broker" ? brokerage !== "": true))
        } else if(listPropertyForProps === "Rent"){
            valid = (expectedRent !== "" && bookingAdvance !== "" && securityDeposit !== "" &&
                (propertyTypeProps === "Apartment" ? maintenanceCharges !== "" : true) && (youAreProps === "Broker" ? brokerage !== "": true))
        }
        setPricingValid(valid)
    }

    useEffect(() => formValid())

    useEffect(() => {
        console.log(expectedPrice)
    })

    return(
        <Form>
            <Header as='h2' textAlign="center">
                <Header.Content>Pricing</Header.Content>
            </Header>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Price Details
            </Header>
            <Grid>
                {listPropertyForProps !== "Rent" &&
                <Fragment>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Ownership</label>
                            <Dropdown fluid selection value={ownerShip} options={ownership}
                                placeholder='Ownership' onChange={(event, data) => setOwnerShip(data.value)}
                            />
                            {ownerShip === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <Form.Field required>
                            <label>Expected Price</label>
                            <Input value={expectedPrice} placeholder='Expected price'
                                action={
                                    <Dropdown button basic floating options={negotiableOptions} 
                                        value={priceNegotiable} onChange={(event, data) => setPriceNegotiable(data.value)} />
                                }
                                icon='rupee sign' iconPosition='left'
                                onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10**9) && setExpectedPrice(event.target.value.trim())): setExpectedPrice(event.target.value.trim())}
                            />
                            {expectedPrice === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                            <div style={{marginTop: 7}}>{expectedPrice !== "" && inWords(expectedPrice)}</div>
                        </Form.Field>
                    </Grid.Column>
                </Fragment>
                }
                {listPropertyForProps === "Rent" && 
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field required>
                        <label>Expected Rent (per month)</label>
                        <Input value={expectedRent} placeholder='Expected Rent'
                            action={
                                <Dropdown button basic floating options={negotiableOptions} 
                                    value={rentNegotiable} onChange={(event, data) => setRentNegotiable(data.value)} />
                            }
                            type="number" min="0" icon='rupee sign' iconPosition='left'
                            onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10**6) && setExpectedRent(event.target.value.trim())): setExpectedRent(event.target.value.trim())}
                        />
                        {expectedRent === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                        <div style={{marginTop: 7}}>{expectedRent !== "" && propertyDisplayConvert(expectedRent)}</div>
                    </Form.Field>
                </Grid.Column>
                }
            </Grid>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                More price details
            </Header>
            <Grid>
                {listPropertyForProps === "Rent" &&
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Security Deposit</label>
                        <Input icon='rupee sign' iconPosition='left'
                                placeholder='Security Deposit' value={securityDeposit}
                                onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10**9) && setSecurityDeposit(event.target.value.trim())): setSecurityDeposit(event.target.value.trim())}/>
                        {securityDeposit === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                }
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Booking Advance</label>
                        <Input icon='rupee sign' iconPosition='left'
                                placeholder='Booking Advance' value={bookingAdvance}
                                onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10**9) && setBookingAdvance(event.target.value.trim())): setBookingAdvance(event.target.value.trim())}/>
                        {bookingAdvance === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field>
                        <label>All prices inclusive</label>
                        <Radio toggle checked={allPricesInclusive} onChange={() => setAllPricesInclusive(!allPricesInclusive)}/>
                    </Form.Field>
                </Grid.Column>
                {propertyTypeProps === "Apartment" &&
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Maintenance</label>
                            <Input icon='rupee sign' iconPosition='left' value={maintenanceCharges}
                                action={
                                    <Dropdown button basic floating options={maintenance} value={maintenanceUnit}
                                        onChange={(e, data) => setMaintenanceUnit(data.value)} defaultValue='Monthly'/>
                                }
                                placeholder='Maintenance'
                                onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10**9) && setMaintenanceCharges(event.target.value.trim())): setMaintenanceCharges(event.target.value.trim())}
                            />
                            {maintenanceCharges === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                }
                {(propertyTypeProps !== "Land" && listPropertyForProps !== "Rent") &&
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Form.Field>
                            <label>Expected Rental</label>
                            <Input icon='rupee sign' iconPosition='left' placeholder='Expected Rental' 
                                value={expectedRental} 
                                onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10**9) && setExpectedRental(event.target.value.trim())): setExpectedRental(event.target.value.trim())}/>
                        </Form.Field>
                    </Grid.Column>
                }
                {youAreProps === "Broker" &&
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Brokerage (%)</label>
                        <Input value={brokerage} placeholder='Brokerage'
                            action={
                                <Dropdown button basic floating options={negotiableOptions} defaultValue={true}
                                    value={brokerageNegotiable} onChange={(event, data) => setBrokerageNegotiable(data.value)} />
                            }
                            icon='percent' iconPosition='left'
                            onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 100) && setBrokerage(event.target.value.trim())): setBrokerage(event.target.value.trim())}
                        />
                        {brokerage === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>                        
                </Grid.Column>
                }
            </Grid>
            <br/><br/>
            <Button.Group size="big" widths='2'>
                <Button basic icon color="purple" labelPosition="left" onClick={() => setStep(3)}>Previous<Icon name='left arrow' /></Button>
                <Button icon color="purple" labelPosition="right" onClick={() => {pricingValid && setStep(5)}}>Next<Icon name='right arrow' /></Button>
            </Button.Group>
            <br/><br/>
        </Form>
    )
}

export default Pricing;