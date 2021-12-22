import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Input, Label, Segment, Button, Icon, Form } from 'semantic-ui-react'
import qs from 'qs'

const google = window.google

let addressItems

const SearchInput = (props) => {

    const {cityProps, localityProps, typeInputProps, addressInputProps, minPriceFilterProp, 
        maxPriceFilterProp, minRentFilterProp, maxRentFilterProp, history} = props

    const [localityInput, setLocalityInput] = localityProps
    const [cityInput, setCityInput] = cityProps
    const [addressInput, setAddressInput] = addressInputProps
    const [typeInput, setTypeInput] = typeInputProps
    const [errorMessage, setErrorMessage] = useState("")
    const [mainInputValue, setMainInputValue] = useState("")

    useEffect(() => {
        let autoComplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            {
                types: ['(regions)'],
                componentRestrictions: {country: "in"}
            }
        )

        autoComplete.addListener("place_changed", () => {
            let place = autoComplete.getPlace()
            console.log(place, "PLACE PLACE")
            setAddressInput(place.formatted_address)
            addressItems = {
                locality: "",
                city: ""
            }
            place.address_components && place.address_components.map(item => {
                console.log(item.types)
                if(item.types.includes("sublocality_level_1")){
                    addressItems.locality = item.short_name
                } else if(item.types.includes("administrative_area_level_2")){
                    addressItems.city = item.short_name
                }
            })
            setLocalityInput(addressItems.locality)
            setCityInput(addressItems.city)
            console.log(addressItems)
            //showUserLocationOnMap(place.geometry.location.lat(), place.geometry.location.lng())
        })
    }, [])

    const formSubmit = () => {
        if(mainInputValue === "" || addressInput === ""){
            setErrorMessage("Please enter a value")
        } else if(cityInput === ""){
            setErrorMessage("Entry must contain a city")
        } else {
            const queryStr = qs.stringify({
                type: typeInput,
                locality: localityInput
            })
            props.history.push(`/list-properties/${cityInput ? cityInput : "Chennai"}?${queryStr}`)
        }
    }

    return (
        <>
            <Input type='text' placeholder='Search...' action size="large" fluid 
                onChange={e => setMainInputValue(e.target.value)} onKeyPress={(e) => e.keyCode === 13 && e.preventDefault()}>
                <input id="autocomplete" />
                <div style={{width: "20%"}}>
                    <Button fluid style={{borderRadius: 0}} type='submit' color="red"size="large"
                        onClick={formSubmit}><Icon name="search" id="search-icon" />
                        <span id="search-button">SEARCH</span>
                    </Button>
                </div>            
            </Input>
            {errorMessage && <Label basic color='red' pointing>{errorMessage}</Label>}
        </>
    )
}

export default SearchInput