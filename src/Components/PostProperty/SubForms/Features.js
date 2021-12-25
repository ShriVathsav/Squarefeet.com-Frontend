import React, {useState, Fragment, useEffect} from 'react';
import DragAndDrop from "./DragAndDrop";
import {Header, Modal, Button, Icon, Grid, Form, Image, Dropdown, Radio, Input, TextArea, Label, Accordion} from "semantic-ui-react";
import {validateNumeric, removeSpacesFromTextInput} from "../../Utility/ValidateInputs"
import multiply from '../../Icons/multiply.svg'

const ERROR_MESSAGE_INPUT = "This field is mandatory"
const ERROR_MESSAGE_DROPDOWN = "Please select a value"


const moreAmenitiesList = [
    { key: 'a', text: 'Rain Water Harvesting', value: 'Rain Water Harvesting' },
    { key: 'b', text: 'Private Terrace', value: 'Private Terrace' },
    { key: 'c', text: 'Shopping Centre', value: 'Shopping Centre' },
    { key: 'd', text: 'Club House', value: 'Club House' },
    { key: 'e', text: 'Water Purifier', value: 'Water Purifier' },
    { key: 'f', text: 'Waste Disposal', value: 'Waste Disposal' }
]

const facingList = [
    { key: 'a', text: 'North', value: 'North' },
    { key: 'b', text: 'South', value: 'South' },
    { key: 'c', text: 'East', value: 'East' },
    { key: 'd', text: 'West', value: 'West' },
    { key: 'e', text: 'North-East', value: 'North-East' },
    { key: 'f', text: 'North-West', value: 'North-West' },
    { key: 'g', text: 'South-East', value: 'South-East' },
    { key: 'h', text: 'South-West', value: 'South-West' }
]

const facingRoadList = [
    { key: 'a', text: 'Feet', value: 'feet' },
    { key: 'b', text: 'Metre', value: 'metre' }
]
const flooringTypeList = [
    { key: 'a', text: 'Vitrified', value: 'Vitrified' },
    { key: 'b', text: 'Marble', value: 'Marble' },
    { key: 'c', text: 'Ceramic', value: 'Ceramic' },
    { key: 'd', text: 'Wood', value: 'Wood' },
    { key: 'e', text: 'Mosaic', value: 'Mosaic' },
    { key: 'f', text: 'Granite', value: 'Granite' },
    { key: 'g', text: 'Spartex', value: 'Spartex' },
    { key: 'h', text: 'Cement', value: 'Cement' },
    { key: 'i', text: 'Vinyl', value: 'Vinyl' },
    { key: 'j', text: 'Others', value: 'Others' }
]

const powerBackupList = [
    { key: 'a', text: 'None', value: 'None' },
    { key: 'b', text: 'Partial', value: 'Partial' },
    { key: 'c', text: 'Full', value: 'Full' }
]

const waterSourceList = [
    { key: 'a', text: 'Municipal Corporation', value: 'Municipal Corporation' },
    { key: 'b', text: 'BoreWell / Tank', value: 'BoreWell / Tank' }
]

const overlookingList = [
    { key: 'a', text: 'Park / Garden', value: 'Park / Garden' },
    { key: 'b', text: 'Main Road', value: 'Main Road' },
    { key: 'c', text: 'Club', value: 'Club' },
    { key: 'd', text: 'Pool', value: 'Pool' },
    { key: 'e', text: 'Others', value: 'Others' }
]

const boundaryWallList = [
    { key: 'a', text: 'Yes', value: true },
    { key: 'b', text: 'No', value: false }
]

const Features = (props) => {

    const [step, setStep] = props.step

    const {amenitiesProp, moreAmenitiesProp, cornerPropertyProp, gatedSocietyProp, widthOfFacingRoadUnitProp,
        facingProp, facingRoadProp, flooringTypeProp, powerBackupProp, waterStorageProp, waterSourceProp,
        overlookingProp, propertyDescriptionProp, boundaryWallProp, propertyTypeProps, featuresValidProp,
        uploadedImagesProp, deletedImagesProp, inMemoryImagesProp, imageBlobListProp} = props

    const [amenities, setAmenities] = amenitiesProp
    const [moreAmenities, setMoreAmenities] = moreAmenitiesProp
    const [cornerProperty, setCornerProperty] = cornerPropertyProp
    const [gatedSociety, setGatedSociety] = gatedSocietyProp
    const [facing, setFacing] = facingProp
    const [facingRoad, setFacingRoad] = facingRoadProp
    const [flooringType, setFlooringType] = flooringTypeProp
    const [powerBackup, setPowerBackup] = powerBackupProp
    const [waterStorage, setWaterStorage] = waterStorageProp
    const [waterSource, setWaterSource] = waterSourceProp
    const [boundaryWall, setBoundaryWall] = boundaryWallProp
    const [overlooking, setOverlooking] = overlookingProp
    const [widthOfFacingRoadUnit, setWidthOfFacingRoadUnit] = widthOfFacingRoadUnitProp
    const [propertyDescription, setPropertyDescription] = propertyDescriptionProp
    const [featuresValid, setFeaturesValid] = featuresValidProp;
    const [imageModalOpen, setImageModalOpen] = useState(false);    

    const [displayMoreAmenities, setDisplayMoreAmenities] = useState(false)

    const amenitiesCount = () => {
        let count = 0
        for(const item of amenities){
            if(item.active === true){
                count += 1
            }
        }
        return count
    }

    const moreAmenitiesCount = () => {
        let count = 0
        for(const item of moreAmenities){
            if(item.active === true){
                count += 1
            }
        }
        return count
    }

    const addOrRemoveAmenities = (id) => {
        setAmenities(prev => {
            return [...prev].map(item => {
                return (item.id !== id) ? {...item} : {...item, active: !item.active}
            })
            
        })
    }

    const addOrRemoveMoreAmenities = (id) => {
        setMoreAmenities(prev => {
            return [...prev].map(item => {
                return (item.id !== id) ? {...item} : {...item, active: !item.active}
            })
            
        })
    }

    const formValid = () => {
        let valid, valid2
        valid2 = waterSource !== "" && overlooking !== "" && !(propertyTypeProps !== "Land" && waterStorage === "") && facing !== "" && 
            facingRoad !== "" && !(propertyTypeProps !== "Land" && powerBackup === "") && propertyDescription.length >= 30 && !(propertyTypeProps === "Land" && boundaryWall === "")

        valid = waterSource !== "" && overlooking !== "" && facing !== "" && facingRoad !== "" && propertyDescription.length >= 30
        if(propertyTypeProps !== "Land"){
            valid = valid && waterStorage !== "" && powerBackup !== ""
        } else {
            valid = valid && boundaryWall !== ""
        }
        setFeaturesValid(valid)
    }

    useEffect(() => formValid())

    return(
        <Form>
            <Header as='h2' textAlign="center">
                <Header.Content>Features</Header.Content>
            </Header>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Upload Images
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Field>
                            <label>Add Photos (Recommended)</label>
                        </Form.Field>
                            <Modal closeOnDimmerClick size="large" open={imageModalOpen} style={{maxWidth: "95%"}}
                            onClose={() => setImageModalOpen(false)} onOpen={() => setImageModalOpen(true)} 
                            trigger={<Button basic color='purple' style={{padding: 17, borderRadius: 0}}>
                                        <Icon name='images' /> Click here to Upload Images
                                    </Button>} >
                            <Header icon='image' content='Upload Images' />
                            <Grid columns={1} style={{margin: 10}}>
                                <Grid.Column>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <DragAndDrop uploadedImagesProp={props.uploadedImagesProp}
                                                deletedImagesProp={props.deletedImagesProp}
                                                inMemoryImagesProp={props.inMemoryImagesProp} imageBlobListProp={props.imageBlobListProp}
                                                preSignedUrlListProp={props.preSignedUrlListProp} />
                                            <p>We recommend minimum image size to be 10KB and maximum size to be 5MB. Accepted file formats are png, jpg, jpeg.</p>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Grid.Column>
                            </Grid>
                            <Modal.Actions>
                                <Button color="purple" onClick={() => setImageModalOpen(false)} >
                                    Proceed <Icon name='right chevron' />
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        <span style={{float: "right"}}>
                            {props.uploadedImagesProp[0].length + props.inMemoryImagesProp[0].length} / 20 photos uploaded</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {propertyTypeProps !== "Land" &&
            (
            <Fragment>
                <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                    Amenities
                </Header>
                <Grid>                
                    <Form.Field style={{width: "100%"}}>
                        <label style={{display: "inline"}}>Amenities</label>
                        <div style={{float: "right"}}>{amenitiesCount()} Amenities selected</div>
                    </Form.Field>               
                    <Grid.Row textAlign="center">
                        {
                        amenities.map(amenity => (
                            <Grid.Column mobile={8} tablet={4} computer={4} textAlign="center" style={{padding: 20}} key={amenity.name}>
                                <span style={{cursor: "pointer"}} onClick={() => addOrRemoveAmenities(amenity.id)}>
                                    <Image src={amenity.active ? amenity.icon2 : amenity.icon1} centered style={{height: 50, width: 50}}/>
                                    {amenity.name}
                                </span>
                            </Grid.Column>
                        ))
                        }
                    </Grid.Row>
                </Grid>
            </Fragment>
            )}
            {propertyTypeProps === "Apartment" &&
                <Grid>
                    <Form.Field style={{width: "100%"}}>
                        <div onClick={() => setDisplayMoreAmenities(prev => !prev)} style={{display: "inline", cursor: "pointer"}}>
                            <Icon name={displayMoreAmenities ? "chevron down": "chevron right"}  />
                            <label style={{fontWeight: 700, cursor: "pointer"}}>Add More Amenities</label>
                        </div>
                        <div style={{float: "right"}}>{moreAmenitiesCount()} more Amenities selected</div>
                    </Form.Field> 
                    {displayMoreAmenities &&
                        <Grid.Row textAlign="center">
                            {
                            moreAmenities.map(amenity => (
                                <Grid.Column mobile={8} tablet={4} computer={4} textAlign="center" style={{padding: 20}} key={amenity.name}>
                                    <span style={{cursor: "pointer"}} onClick={() => addOrRemoveMoreAmenities(amenity.id)}>
                                        <Image src={amenity.active ? amenity.icon2 : amenity.icon1} centered style={{height: 50, width: 50}}/>
                                        {amenity.name}
                                    </span>
                                </Grid.Column>
                            ))
                            }
                        </Grid.Row>
                    }
                </Grid>
            }
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Features
            </Header>
            <Grid>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Water Source</label>
                        <Dropdown fluid selection value={waterSource} options={waterSourceList}
                            placeholder='Select' onChange={(event, data) => setWaterSource(data.value)}
                        />
                        {waterSource === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Overlooking</label>
                        <Dropdown fluid selection value={overlooking} options={overlookingList}
                            placeholder='Overlooking' onChange={(event, data) => setOverlooking(data.value)}
                        />
                        {overlooking === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                    </Form.Field>
                </Grid.Column>
                {propertyTypeProps !== "Land" &&
                    <Grid.Row>
                        <Grid.Column mobile={8} tablet={8} computer={8}>
                            <Form.Field required>
                                <label>Capacity of Water storage (in Litres)</label>
                                <input placeholder='Capacity of Water Storage' value={waterStorage}
                                       onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 10**9) && setWaterStorage(event.target.value.trim())): setWaterStorage(event.target.value.trim())}/>
                                {waterStorage === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                }
                {propertyTypeProps === "Land" &&
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Is Boundary Wall made ?</label>
                            <Dropdown fluid selection value={boundaryWall} options={boundaryWallList}
                                placeholder='Select' onChange={(event, data) => setBoundaryWall(data.value)}
                            />
                            {boundaryWall === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                }
            </Grid>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Some more features
            </Header>
            <Grid>
                <Grid.Column width={8}>
                    <Form.Field>
                        <label>Is a Corner Property ?</label>
                        <Radio toggle checked={cornerProperty} onChange={() => setCornerProperty(!cornerProperty)}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Form.Field>
                        <label>In a Gated Society ?</label>
                        <Radio toggle checked={gatedSociety} onChange={() => setGatedSociety(!gatedSociety)}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Facing</label>
                        <Dropdown fluid selection value={facing} options={facingList}
                            placeholder='Select' onChange={(event, data) => setFacing(data.value)}
                        />
                        {facing === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Width of facing road</label>
                        <Input value={facingRoad} placeholder='Select' fluid
                            action={
                                <Dropdown button basic floating options={facingRoadList} 
                                    value={widthOfFacingRoadUnit} onChange={(event, data) => setWidthOfFacingRoadUnit(data.value)} />
                            }
                            onChange={(event) => event.target.value !== "" ? (validateNumeric(event.target.value, 0, 1000) && setFacingRoad(event.target.value.trim())): setFacingRoad(event.target.value.trim())}
                        />
                        {facingRoad === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                {propertyTypeProps !== "Land" &&
                <Fragment>
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field>
                            <label>Flooring Type</label>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Dropdown fluid selection value={flooringType} options={flooringTypeList} style={{verticalAlign: "middle"}}
                                    placeholder='Select' onChange={(event, data) => setFlooringType(data.value)}
                                />
                                {flooringType !== "" && <Image src={multiply} onClick={() => setFlooringType("")}
                                        style={{marginLeft: 10, width: 9, cursor: "pointer"}} />}
                            </div>
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Power Backup</label>
                            <Dropdown fluid selection value={powerBackup} options={powerBackupList}
                                placeholder='Select' onChange={(event, data) => setPowerBackup(data.value)}
                            />
                            {powerBackup === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_DROPDOWN}</Label>}
                        </Form.Field>
                    </Grid.Column>
                </Fragment>
                }
            </Grid>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Property Description
            </Header>
            <Grid>
                <Grid.Column width={16}>                        
                    <Form.Field required>
                        <label>Describe the Property (5000 characters max.)</label>
                        <TextArea value={propertyDescription}
                            onChange={(event) => event.target.value.length < 5000 && setPropertyDescription(removeSpacesFromTextInput(event.target.value))}
                                    placeholder='Tell us more' style={{ minHeight: 200 }}/>
                        {propertyDescription.length <= 30 && <Label basic color='red' pointing>Describe the Property in a minimum of 30 characters</Label>}
                    </Form.Field>                        
                </Grid.Column>
            </Grid>
            <br/><br/>
            <Button.Group size="big" widths='2'>
                <Button basic icon color="purple" labelPosition="left" onClick={() => setStep(4)}>
                    Previous<Icon name='left arrow' /></Button>
            </Button.Group>
            <br/><br/>
        </Form>
    )
}

export default Features;