import React,{useState, useEffect, Fragment} from 'react';
import {Input, Form, Dropdown, Grid, Radio, Button, Icon, Header, Image, Label, Checkbox} from 'semantic-ui-react';
import './PropertyDetails.css'

import {validateNumeric} from "../../Utility/ValidateInputs"

const ERROR_MESSAGE_INPUT = "This field is mandatory"
const ERROR_MESSAGE_DROPDOWN = "Please select a value"
const ERROR_MESSAGE_FURNISHING_SEMI = "Select atleast 3 furnishings"
const ERROR_MESSAGE_FURNISHING_FULL = "Select atleast 5 furnishings"

const areaUnitList = [
    { key: 'm', text: 'sq.ft.', value: 'sq.ft.' },
    { key: 'f', text: 'sq.m.', value: 'sq.m.' },
    { key: 'o', text: 'sq.yards', value: 'sq.yards' },
    { key: 'b', text: 'acres', value: 'acres' },
    { key: 'c', text: 'hectares', value: 'hectares' }
];

const furnishing = [
    { key: 'm', text: 'Furnished', value: "1" },
    { key: 'f', text: 'SemiFurnished', value: "2" },
    { key: 'o', text: 'Unfurnished', value: "3" }
];

const carParking = [
    { key: 'z', text: '0', value: '0' },
    { key: 'm', text: '1', value: '1' },
    { key: 'f', text: '2', value: '2' },
    { key: 'o', text: '3', value: '3' },
    { key: 'a', text: '4', value: '4' },
    { key: 'i', text: '4+', value: '4+' }
];

const ageOfProperty = [
    { key: 'm', text: '0-1 year old property', value: '0-1 year old' },
    { key: 'f', text: '1-5 years old property', value: '1-5 years old' },
    { key: 'o', text: '5-10 years old property', value: '5-10 years old' },
    { key: 'a', text: '10-20 years old property', value: '10-20 years old' },
    { key: 'b', text: '20-30 years old property', value: '20-30 years old' },
    { key: 'c', text: '30+ years old property', value: '30+ years old' }
];

const addOtherRooms = [
    { key: 'm', text: 'Pooja Room', value: "1"},
    { key: 'f', text: 'Study Room', value: '2'},
    { key: 'o', text: 'Guest Room', value: "3"},
    { key: 's', text: 'Servant Room', value: "4"},
    { key: 't', text: 'Service Area', value: "5"}
]

const openSidesList = [
    { key: 'a', text: '0', value: "0" },
    { key: 'm', text: '1', value: "1" },
    { key: 'f', text: '2', value: "2" },
    { key: 'o', text: '3', value: "3" },
    { key: 's', text: '4', value: "4" }
]

const availabilityList = [
    { key: 'm', text: 'Ready to Move - Resale', value: 'Ready to Move - Resale' },
    { key: 'o', text: 'Ready to Move - New Property', value: 'Ready to Move - New Property' },
    { key: 'f', text: 'Under Construction', value: 'Under Construction' }
];

const possessionByList = [
    { key: 'a', text: 'Within 3 Months', value: 'Within 3 Months' },
    { key: 'b', text: 'Within 6 Months', value: 'Within 6 Months' },
    { key: 'c', text: 'Within a Year', value: 'Within a Year' },
    { key: 'd', text: 'Within 2 Years', value: 'Within 2 Years' },
    { key: 'e', text: 'Within 3 Years', value: 'Within 3 Years' },
    { key: 'f', text: 'Within 4 Years', value: 'Within 4 Years' },
    { key: 'g', text: 'Within 5 Years', value: 'Within 5 Years' }
];

const elevatorList = [
    { key: 'a', text: 'Present', value: true },
    { key: 'b', text: 'Not Present', value: false }
]

const PropertyDetails = (props) => {

    const [step, setStep] = props.step

    const [propertyOnFloorList, setPropertyOnFloorList] = useState([]);
    const [totalFloorList, setTotalFloorList] = useState([]);

    //  DESTRUCTURING PROPS
    const {superBuiltUpAreaProp, builtUpAreaProp, carpetAreaProp, bedroomsProp, bathroomsProp, propertyDetailsValidProp, areaUnitProp,
        balconiesProp, otherRoomsProp, furnishingDetProp, furnishingItemsProp,  totalFloorProp, propertyOnFloorProp, reservedParkingProp,
        closedParkingProp, openParkingProp, propertyAgeProp, availabilityProp, possessionByProp, undividedShareProp, openSidesProp,
        twoWheelerParkingProp, numberOfFlatsProp, elevatorProp, plotAreaProp, floorsAllowedProp, propertyTypeProps, listPropertyForProps} = props;

    const [superBuiltUpArea, setSuperBuiltUpArea] = superBuiltUpAreaProp;
    const [builtUpArea, setBuiltUpArea] = builtUpAreaProp;
    const [carpetArea, setCarpetArea] = carpetAreaProp;
    const [bedrooms, setBedrooms] = bedroomsProp;
    const [bathrooms, setBathrooms] = bathroomsProp;
    const [balconies, setBalconies] = balconiesProp;
    const [otherRooms, setOtherRooms] = otherRoomsProp;
    const [furnishingDet, setFurnishingDet] = furnishingDetProp;
    const [furnishingItems, setFurnishingItems] = furnishingItemsProp;
    const [totalFloor, setTotalFloor] = totalFloorProp;
    const [propertyOnFloor, setPropertyOnFloor] = propertyOnFloorProp;
    const [reservedParking, setReservedParking] = reservedParkingProp;
    const [closedParking, setClosedParking] = closedParkingProp;
    const [openParking, setOpenParking] = openParkingProp
    const [twoWheelerParking, setTwoWheelerParking] = twoWheelerParkingProp
    const [propertyAge, setPropertyAge] = propertyAgeProp;
    const [availability, setAvailability] = availabilityProp;
    const [possessionBy, setPossessionBy] = possessionByProp;
    const [undividedShare, setUndividedShare] = undividedShareProp;
    const [numberOfFlats, setNumberOfFlats] = numberOfFlatsProp;
    const [elevator, setElevator] = elevatorProp;
    const [plotArea, setPlotArea] = plotAreaProp;
    const [floorsAllowed, setFloorsAllowed] = floorsAllowedProp;
    const [openSides, setOpenSides] = openSidesProp;
    const [areaUnit, setAreaUnit] = areaUnitProp;
    const [propertyDetailsValid, setPropertyDetailsValid] = propertyDetailsValidProp;

    const furnishingItemsValid = () => {
        let count = 0
        for (const item of furnishingItems){
            if(item.active === true){
                count += 1
            }
        }
        if(furnishingDet === 0){
            return count < 5 ? true : false
        } else if (furnishingDet === 1){
            return count < 3 ? true : false
        } else {
            return false
        }
    }

    const formValid = () => {
        let valid = true
        let valid2 = true
        if(propertyTypeProps === "Apartment" || propertyTypeProps === "House") {
            valid2 =  (superBuiltUpArea !== "" && builtUpArea !== "" && carpetArea !== "" && bedrooms !== "" && bathrooms !== "" && bathrooms !== "" && furnishingDet !== "" &&
                totalFloor !== "" && (propertyTypeProps === "Apartment" ? propertyOnFloor !== "" : true) && (availability !== "" && ((availability === "Resale" && propertyAge !== "") || (availability === "Under Construction" && possessionBy !== ""))) && 
                (reservedParking === false ? true : ((closedParking !== "" && openParking !== "") && (closedParking !== "0" || openParking !== "0")))) ? true : false

            valid = superBuiltUpArea !== "" && builtUpArea !== "" && carpetArea !== "" && elevator !== "" &&
            bedrooms !== "" && !furnishingItemsValid() &&
                bathrooms !== "" && balconies !== "" && furnishingDet !== "" && totalFloor !== "" && twoWheelerParking !== "" &&
                ((!reservedParking ? true : ((closedParking !== "" && openParking !== "") && (closedParking !== 0 || openParking !== 0))) ? true : false)
                && (listPropertyForProps === "Rent" ? true : (availability !== "" && propertyAge !== "")) && ((availability === "Under Construction" || listPropertyForProps === "Rent") ? possessionBy !== "" : true)
            if(propertyTypeProps === "Apartment"){
                valid = valid && propertyOnFloor !== ""
            } else if(propertyTypeProps === "House"){
                valid = valid && plotArea !== ""
            }
        }
        else if(propertyTypeProps === "Land"){
            valid = plotArea !== "" && possessionBy !== "" && floorsAllowed !== ""
        }
        setPropertyDetailsValid(valid)
    }

    const calculateFloors = (max, floors = []) => {
        for (let i = 0; i <= max; i++) {
            floors.push({ key: i, text: i, value: i.toString() })
        }
        return floors;
    }

    const addOrRemoveFurnishings = (entity, value = 0) => {
        setFurnishingItems(prev => {
            return [...prev].map(item => {
                let val
                if(entity.type === "input"){
                    val = {number: item.number + value, active: item.number + value !== 0}
                }else{
                    val = {active: !item.active}
                }
                return (item.id !== entity.id) ? {...item} : {...item, ...val}
            })            
        })
    }    

    useEffect(() => {
        setTotalFloorList(calculateFloors(40));
    }, []);

    useEffect(() => {
        setPropertyOnFloorList(calculateFloors(totalFloor));
    }, [totalFloor]);

    useEffect(() => formValid())

    return(
        <Form>
            <Header as='h2' textAlign="center">
                <Header.Content>Property Details</Header.Content>
                <Header.Subheader>Fill in all details so that your property gets discovered more.</Header.Subheader>
            </Header>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Area Details
            </Header>
            
            <Grid>
            {propertyTypeProps !== "Apartment" &&
                <Fragment>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Land Area</label>
                            <Input value={plotArea} placeholder='Land Area' fluid
                                action={
                                    <Dropdown button basic floating options={areaUnitList}  
                                        value={areaUnit} onChange={(event, data) => setAreaUnit(data.value)}/>
                                }
                                onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10000) && setPlotArea(event.target.value.trim())): setPlotArea(event.target.value.trim())}
                            />
                            {plotArea === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Number of Open Sides</label>
                            <Dropdown fluid selection value={openSides} options={openSidesList} placeholder='Select' 
                                onChange={(event, data) => setOpenSides(data.value)}
                            />
                            {openSides === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                </Fragment>
            }
            {propertyTypeProps !== "Land" &&
            <Fragment>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Super BuiltUp Area</label>
                        <Input value={superBuiltUpArea} placeholder='Super BuiltUp Area' fluid
                            action={
                                <Dropdown button basic floating options={areaUnitList}  
                                    value={areaUnit} onChange={(event, data) => setAreaUnit(data.value)}/>
                            }
                            onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10000) && setSuperBuiltUpArea(event.target.value.trim())): setSuperBuiltUpArea(event.target.value.trim())}
                        />
                        {!superBuiltUpArea && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                {(propertyTypeProps === "Apartment" && listPropertyForProps === "Sale") &&
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field>
                        <label>Undivided Share (UDS)</label>
                        <Input value={undividedShare} placeholder='Undivided Share' fluid
                            action={
                                <Dropdown button basic floating options={areaUnitList}  
                                    value={areaUnit} onChange={(event, data) => setAreaUnit(data.value)}/>
                            }
                            onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10000) && setUndividedShare(event.target.value.trim())): setUndividedShare(event.target.value.trim())}
                        />
                    </Form.Field>
                </Grid.Column>
                }
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>BuiltUp Area</label>
                        <Input value={builtUpArea} placeholder='BuiltUp Area' fluid
                            action={
                                <Dropdown button basic floating options={areaUnitList}  
                                    value={areaUnit} onChange={(event, data) => setAreaUnit(data.value)}/>
                            }                            
                            onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10000) && setBuiltUpArea(event.target.value.trim())): setBuiltUpArea(event.target.value.trim())}
                        />
                        {!builtUpArea && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                        {(superBuiltUpArea !== "" && parseFloat(builtUpArea) > parseFloat(superBuiltUpArea)) && 
                            <Label basic color='red' pointing>Builtup Area cannot be greater than Super Builtup Area</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Carpet Area</label>
                        <Input value={carpetArea} placeholder='Carpet Area' fluid
                            action={
                                <Dropdown button basic floating options={areaUnitList}  
                                    value={areaUnit} onChange={(event, data) => setAreaUnit(data.value)}/>
                            }
                            onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10000) && setCarpetArea(event.target.value.trim())): setCarpetArea(event.target.value.trim())}
                        />
                        {carpetArea === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                        {(builtUpArea !== "" && parseFloat(carpetArea) > parseFloat(builtUpArea)) && 
                            <Label basic color='red' pointing>Carpet Area cannot be greater than Builtup Area</Label>}
                    </Form.Field>
                </Grid.Column>
                </Fragment>
                }
                
            </Grid>
            
            {propertyTypeProps !== "Land" &&
                <Fragment>
                    <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                        Configuration Details
                    </Header>
                    <Grid columns={3}>
                        <Grid.Column>
                            <Form.Field required>
                                <label>Bedrooms</label>
                                <Input value={bedrooms} placeholder='Bedrooms'
                                    onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 1, 20) && setBedrooms(parseInt(event.target.value.trim()))): setBedrooms(event.target.value.trim())}
                                />
                                {bedrooms === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field required>
                                <label>Bathrooms</label>
                                <Input value={bathrooms} placeholder='Bathrooms'
                                    onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 1, 20) && setBathrooms(parseInt(event.target.value.trim()))): setBathrooms(event.target.value.trim())}
                                />
                                {bathrooms === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field required>
                                <label>Balconies</label>
                                <Input value={balconies} placeholder='Balconies'
                                    onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 20) && setBalconies(parseInt(event.target.value.trim()))): setBalconies(event.target.value.trim())}
                                />
                                {balconies === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                            </Form.Field>
                        </Grid.Column>
                    </Grid>
                    <Grid>
                        <Grid.Column>
                            <Form.Field>
                                <label>Add other rooms</label>
                                <Dropdown placeholder='Add other rooms' fluid multiple selection options={addOtherRooms}
                                    value={otherRooms} onChange={(_, data) => setOtherRooms(data.value)}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid>
                    <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                        Furnishing Details
                    </Header>
                    <Grid>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Form.Field required>
                                <label>Furnishing Details</label>
                                <Dropdown fluid selection options={furnishing} value={furnishingDet}
                                    placeholder='Select' onChange={(event, data) => setFurnishingDet(data.value)}
                                />
                                {furnishingDet === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                            </Form.Field>
                        </Grid.Column>
                    </Grid>
                    {(furnishingDet === "1" || furnishingDet === "2") &&
                    <>
                    <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap", marginTop: 28}}>
                        {furnishingItems.map(items => (
                            <div id="furnishing-item" key={items.label} style={{display: "flex", flexDirection: "row", alignItems: "center", padding: 7}} >
                                <div style={{width: "22%"}}>
                                    <Image src={items.icon} size="mini" 
                                        style={{width: 40, height: 40, margin: 0}} />
                                </div>
                                <div style={{width: "40.5%", marginLeft: 3}}  id="furn-text">{items.name}</div>
                                
                                <div style={{width: "37.5%"}} >
                                    {items.type === "input" ?
                                    <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap", alignItems: "center", justifyContent: "center"}}>
                                        <Icon name="plus circle" style={{cursor: "pointer"}} id="icon-hover"
                                            onClick={() => addOrRemoveFurnishings(items, 1)}/>
                                        <span id="furn-text">{items.number}</span>
                                        <Icon name="minus circle" id="icon-hover" style={{cursor: "pointer"}}
                                                onClick={() => items.number > 0 && addOrRemoveFurnishings(items, -1)}/>
                                    </div>
                                    :
                                    <div style={{textAlign: "center"}}>
                                        <div id="furnishing-checkbox">
                                            <Checkbox checked={items.active} onChange={() => addOrRemoveFurnishings(items)} />
                                        </div>
                                        <div id="furnishing-radio">
                                            <Radio toggle checked={items.active} onChange={() => addOrRemoveFurnishings(items)} />
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    {furnishingItemsValid() && <Label basic color='red' pointing>
                    {furnishingDet === 0 ? ERROR_MESSAGE_FURNISHING_FULL : ERROR_MESSAGE_FURNISHING_SEMI}</Label>}
                    </>
                    }
                </Fragment>
            } 
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Floor Details
            </Header>
            <Grid>
                {propertyTypeProps !== "Land" ?
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Total Floors</label>
                            <Dropdown fluid search selection placeholder='Select' value={totalFloor}
                                options={totalFloorList} onChange={(event, data) => setTotalFloor(data.value)}
                            />
                            {totalFloor === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                :
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Floors allowed for Construction</label>
                            <Dropdown fluid search selection placeholder='Select' value={floorsAllowed} type="number"
                                options={totalFloorList} onChange={(event, data) => setFloorsAllowed(data.value)}
                            />
                        </Form.Field>
                    </Grid.Column>
                }
                {propertyTypeProps === "Apartment" &&
                <Fragment>
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Property on Floor</label>
                            <Dropdown fluid search selection placeholder='Select' value={propertyOnFloor}
                                options={propertyOnFloorList} onChange={(event, data) => setPropertyOnFloor(data.value)}
                            />
                            {propertyOnFloor === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field>
                            <label>Number of Flats</label>
                            <input placeholder='Number of Flats' value={numberOfFlats} type="number"
                                   onChange={(event) => event.target.value <= 10000 && setNumberOfFlats(event.target.value)}/>
                        </Form.Field>
                    </Grid.Column>
                </Fragment>
                }
                {propertyTypeProps !== "Land" &&
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Elevator</label>
                        <Dropdown fluid selection value={elevator} options={elevatorList}
                            placeholder='Select' onChange={(event, data) => setElevator(data.value)}
                        />
                        {elevator === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                    </Form.Field>
                </Grid.Column>
                }
            </Grid>
            {propertyTypeProps !== "Land" &&
            <Fragment>
                <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                    Parking Details
                </Header>
                <Grid>
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Do you have Reserved Car Parking Space?</label>
                        </Form.Field>
                        <Radio toggle checked={reservedParking} style={{display: "block"}} onChange={() => {setReservedParking(prev => !prev); setClosedParking(""); setOpenParking("")}}/>
                        {(closedParking === 0 && openParking === 0) && <Label basic color='red' pointing>Please select atleast one parking feature</Label>}
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Two wheeler Parking</label>
                            <Dropdown fluid selection value={twoWheelerParking} options={elevatorList}
                                placeholder='Select' onChange={(event, data) => setTwoWheelerParking(data.value)}
                            />
                            {twoWheelerParking === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                </Grid>
                {reservedParking &&
                    <Fragment>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Form.Field required>
                                    <label>Closed Car Parking</label>
                                    <Input value={closedParking} placeholder='Closed Parking'
                                        onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 20) && setClosedParking(parseInt(event.target.value.trim()))): setClosedParking(event.target.value.trim())}
                                    />
                                    {closedParking === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field required>
                                    <label>Open Car Parking</label>
                                    <Input value={openParking} placeholder='Oper Parking'
                                        onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 20) && setOpenParking(parseInt(event.target.value.trim()))): setOpenParking(event.target.value.trim())}
                                    />
                                    {openParking === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                                </Form.Field>
                            </Grid.Column>
                            
                        </Grid>
                    </Fragment>
                }
                
            </Fragment>
            }
            <Grid>
                {(propertyTypeProps !== "Land" && listPropertyForProps === "Sale") &&
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Availability</label>
                        <Dropdown fluid selection options={availabilityList} value={availability}
                            placeholder='Availability' onChange={(event, data) => {setAvailability(data.value); data.value === "Ready to Move - New Property" && setPropertyAge("0-1 year old")}}
                        />
                        {availability === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                    </Form.Field>
                </Grid.Column>
                }
                {availability === "Ready to Move - Resale" &&
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Age of Property</label>
                        <Dropdown fluid selection options={ageOfProperty} placeholder='Age of Property'
                            value={propertyAge} onChange={(event, data) => setPropertyAge(data.value)}
                        />
                        {propertyAge === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                    </Form.Field>
                </Grid.Column>
                }
                {(availability === "Under Construction" || propertyTypeProps === "Land" || listPropertyForProps === "Rent") &&
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Possession By</label>
                        <Dropdown fluid selection options={possessionByList} value={possessionBy}
                            placeholder='Possession By' onChange={(event, data) => setPossessionBy(data.value)}
                        />
                        {possessionBy === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                    </Form.Field>
                </Grid.Column>
                }
            </Grid>
            <br/><br/>
            <Button.Group size="big" widths='2'>
                <Button basic icon color="purple" labelPosition="left" onClick={() => setStep(2)}>Previous<Icon name='left arrow' /></Button>
                <Button icon color="purple" labelPosition="right" onClick={() => {propertyDetailsValid && setStep(4)}}>Next<Icon name='right arrow' /></Button>
            </Button.Group>
            <br/><br/>
        </Form>
    )
}

export default PropertyDetails;