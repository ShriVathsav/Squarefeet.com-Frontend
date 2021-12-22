import React,{useState, useEffect, useRef} from 'react';
import {Form, Divider, Button, Icon, Header, Label, Input, Grid, Popup, TransitionablePortal, Segment} from 'semantic-ui-react';
import {removeSpacesFromTextInput} from "../../Utility/ValidateInputs"
import PortalMain from "../../UI/PortalMain"
import axios from "axios"
require("dotenv").config()

const ERROR_MESSAGE_INPUT = "This field is mandatory"
const ERROR_MESSAGE_DROPDOWN = "Please select a value"

const google = window.google
console.log(google)

let map
let marker

const apiKey = process.env.REACT_APP_MAPS_API_KEY

const Location = (props) => {

    const inputRef = useRef()

    const [step, setStep] = props.step

    const portalOpenProps = useState(false)
    const [portalOpen, setPortalOpen] = portalOpenProps

    const {houseNoProp, streetNameProp, localityProp, cityProp, landmarkProp, projectNameProp, postalCodeProp, stateProp,
        administrativeAreaProp, subLocalityProp, latitudeProp, longitudeProp, addressProp, locationValidProp} = props

    const [houseNo, setHouseNo] = houseNoProp
    const [streetName, setStreetName] = streetNameProp
    const [locality, setLocality] = localityProp
    const [subLocality, setSubLocality] = subLocalityProp
    const [administrativeArea, setAdministrativeArea] = administrativeAreaProp
    const [city, setCity] = cityProp
    const [landmark, setLandmark] = landmarkProp
    const [projectName, setProjectName] = projectNameProp
    const [locationValid, setLocationValid] = locationValidProp;
    const [latitude, setLatitude] = latitudeProp
    const [longitude, setLongitude] = longitudeProp
    const [address, setAddress] = addressProp
    const [state, setState] = stateProp
    const [postalCode, setPostalCode] = postalCodeProp
    const [error, setError] = useState(false)

    const formValid = () => {
        const valid = streetName !== "" && locality !== "" && city !== "" && subLocality !== "" &&
            (!error && address !== "")
        setLocationValid(valid)
    }

    useEffect(() => formValid())

    useEffect(() => {
        if(!!google){
            let autoComplete = new google.maps.places.Autocomplete(
                document.getElementById("autocomplete"),
                {
                    componentRestrictions: {country: "in"}
                }
            )

            autoComplete.addListener("place_changed", () => {
                let place = autoComplete.getPlace()
                console.log(place)
                setAddress(place)

                //showUserLocationOnMap(place.geometry.location.lat(), place.geometry.location.lng())
            })

            map = new google.maps.Map(document.getElementById("map"),{
                zoom: 15,
                center: new google.maps.LatLng((!latitude && 13.0827), (!longitude && 80.2707)),
                maptypeId: google.maps.MapTypeId.ROADMAP
            })

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map
            })

            map.addListener('click', function(mapsMouseEvent) {
                const [lat, lng] = [mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng()]
                setLatitude(lat)
                setLongitude(lng)
                //coordinatesToAddress(lat, lng)
            })
            
            google.maps.event.addListener(marker, 'dragend', function(){
                console.log("lat: "+marker.position.lat())
                console.log("lng: "+marker.position.lng())
            })
        } else {
            setError(true)
            setPortalOpen(true)
        }
    }, [])

    const portalProps = {
        portalOpenProps: portalOpenProps,
        icon: "time",
        header: "An error has occured",
        message: "An error has occured. Please try again later."
    }

    const showUserLocationOnMap = (lati, longi) => {
        marker.setPosition(new google.maps.LatLng(lati, longi))
        /*map.setCenter({
            lat : lati,
            lng : longi
        })*/
        map.setCenter(new google.maps.LatLng(lati, longi));
    }    

    const coordinatesToAddress = (lat, lng) => {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + apiKey)
            .then(res => {
                if(res.data.error_message){
                    console.log(res.data)
                    setError(true)
                    setPortalOpen(true)
                } else {
                    console.log(res.data.results[0])
                    setAddress(res.data.results[0].formatted_address)
                    //console.log(inputRef.current.value)
                    console.log(res.data.results[0].formatted_address)
                    inputRef.current.value = res.data.results[0].formatted_address
                    //document.getElementById("autocomplete").focus()
                    let addressItems = {
                        locality: "",
                        sublocality: "",
                        houseNumber: "",
                        roadName: "",
                        administrativeArea: "",
                        city: "",
                        state: "",
                        postalCode: ""
                    }
                    res.data.results[0].address_components.map(item => {
                        console.log(item.types)
                        if(item.types.includes("sublocality_level_1")){
                            addressItems.locality = item.short_name
                        } else if(item.types.includes("locality")){
                            addressItems.administrativeArea = item.short_name
                        } else if(item.types.includes("sublocality") && !item.types.includes("sublocality_level_1")){
                            console.log(item.short_name)
                            if(addressItems.sublocality === ""){
                                addressItems.sublocality = item.short_name
                            } else {
                                addressItems.sublocality += `, ${item.short_name}`
                            }
                        } else if(item.types.includes("street_number") || item.types.includes("premise")){
                            addressItems.houseNumber = item.short_name
                        } else if(item.types.includes("route")){
                            addressItems.roadName = item.short_name
                        } else if(item.types.includes("administrative_area_level_2")){
                            addressItems.city = item.short_name
                        } else if(item.types.includes("postal_code")){
                            addressItems.postalCode = item.short_name
                        } else if(item.types.includes("administrative_area_level_1")){
                            addressItems.state = item.short_name
                        }                        
                    })
                    setLocality(addressItems.locality)
                    setSubLocality(addressItems.sublocality)
                    setHouseNo(addressItems.houseNumber)
                    setStreetName(addressItems.roadName)
                    setAdministrativeArea(addressItems.administrativeArea)
                    setCity(addressItems.city)
                    setPostalCode(addressItems.postalCode)
                    setState(addressItems.state)
                }
            })
            .catch(error => {
                console.log(error, "ERROR MESSAGE")
                setPortalOpen(true)
            })
    }

    useEffect(() => {
        if(latitude !== "" && longitude !== ""){
            coordinatesToAddress(latitude, longitude)
            showUserLocationOnMap(latitude, longitude)
            console.log("EXECUTING WHEN CHANFGE")
        }        
    }, [latitude, longitude])

    useEffect(() => console.log(address, "PRINTING ADDRESS"))

    const getLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude
                const lng = pos.coords.longitude
                setLatitude(lat)
                setLongitude(lng)
                //coordinatesToAddress(lat, lng)
                //showUserLocationOnMap(lat, lng)
                console.log(lat, lng)                
            },
            err => {
                console.log(err.message)
                setPortalOpen(true)
            })
        }
        else{
            console.log("BROWSER DOESNT SUPPOI")
            setPortalOpen(true)
        }
    }

    return(
        <Form>
            <PortalMain {...portalProps} />
            <Header as='h2' textAlign="center">
                <Header.Content>Location</Header.Content>
                <Header.Subheader>Fill in necessary location details</Header.Subheader>
            </Header>
            <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                Enter the Property Address
            </Header>
            <Grid>
                {!error &&
                <Grid.Column width={16}>
                    <Form.Field required>
                        <label>Location</label>            
                        <div style={{display: "flex"}}>
                            <input id="autocomplete" ref={inputRef} style={{width: "80%", marginRight: 7}}/>
                            <Popup content='Get your Current Location' inverted style={{opacity: 0.7}} trigger={
                                <Button color="red" onClick={getLocation} style={{borderRadius: 0, width: "30%"}}>
                                    <Icon name='map marker alternate' />LOCATION
                                </Button>
                            } />
                        </div>
                        {!address && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                }
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field>
                        <label>House No.</label>
                        <input placeholder='Eg. No 28A' value={houseNo}
                            onChange={(event) => {event.target.value !== " " && setHouseNo(removeSpacesFromTextInput(event.target.value))}}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field>
                        <label>Project /Flat /House Name</label>
                        <input placeholder='Eg. Sea View Apartments' value={projectName}
                            onChange={(event) => setProjectName(removeSpacesFromTextInput(event.target.value))}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field>
                        <label>Landmark</label>
                        <input placeholder='Eg. Near the shopping mall' value={landmark}
                            onChange={(event) => setLandmark(removeSpacesFromTextInput(event.target.value))}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Road / Street name</label>
                        <input placeholder='Eg. Ramaswamy Road' value={streetName}
                            onChange={(event) => setStreetName(removeSpacesFromTextInput(event.target.value))}/>
                        {streetName === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Sub-Locality</label>
                        <input placeholder='Eg. Srinivasa Avenue' value={subLocality}
                            onChange={(event) => setSubLocality(removeSpacesFromTextInput(event.target.value))}/>
                        {subLocality === "" && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Locality</label>
                        <input placeholder='Eg. Delhi Central' value={locality + ((!!locality && !!administrativeArea) ? " , " : "") + administrativeArea}
                            disabled={(!!locality || !!administrativeArea)} onChange={(event) => setLocality(removeSpacesFromTextInput(event.target.value))}/>
                        {(!locality && !administrativeArea) && <Label basic color='red' pointing>{ERROR_MESSAGE_INPUT}</Label>}
                    </Form.Field>
                </Grid.Column>
            </Grid>
            {!error &&
            <>
                <Header as='h5' dividing style={{margin: "42px 0px 28px"}}>
                    Select Location on Map
                </Header>  
                <div id="map" style={{backgroundColor: "red", height: 500}}></div>
            </>
            }
            <br/><br/>
            <Button.Group size="big" widths='2'>
                <Button basic icon color="purple" labelPosition="left" onClick={() => setStep(1)}>Previous<Icon name='left arrow' /></Button>
                <Button icon color="purple" labelPosition="right" onClick={() => {locationValid && setStep(3)}}>Next<Icon name='right arrow' /></Button>
            </Button.Group>
            <br/><br/>
        </Form>
    )
}

export default Location;