import React,{useState, Fragment, useEffect, useContext} from 'react';
import { Image, Button} from 'semantic-ui-react'
import PortalMain from "../UI/PortalMain"

import {Context} from "../../context/Context"

import axios from 'axios'

import jsonFormData from'json-form-data'
import postPropertyIcon from '../../static/Icons/GeneralIcons/postPropertyIcon.svg'

import BasicDetails from './SubForms/BasicDetails';
import Features from './SubForms/Features';
import Location from './SubForms/Location';
import Pricing from './SubForms/Pricing';
import PropertyDetails from './SubForms/PropertyDetails';

import {furnishingItemsConstant, furnishingItemsConstantForAutoFormFill,
    generateAmenitiesConstantsForAutoFill, generateMoreAmenitiesConstantsForAutoFill, 
    amenitiesConstants, moreAmenitiesConstants, constructionStatusFilter} from "../Utility/Constants"

let formData = new FormData();

const MainForm = (props) => {

    const property = props.property || {}

    const {authenticatedUserProps} = useContext(Context)
    const [authenticatedUser, setAuthenticatedUser] = authenticatedUserProps
    const [open, setOpen] = useState(false)

    const portalOpenProps = useState(false)
    const [portalOpen, setPortalOpen] = portalOpenProps
    const [portalMessage, setPortalMessage] = useState("")
    const [postedPropertyId, setPostedPropertyId] = props.postedPropertyIdProps
    const [postedSuccess, setPostedSuccess] = props.postedSuccessProps

    // BASIC DETAILS STATE MANAGEMENT
    const youAreProp = useState(property.poster_designation || "");
    const listPropertyForProp = useState(property.list_property_for || "");
    const propertyTypeProp = useState(property.property_type || "");
    const apartmentTypeProp = useState(property.sub_property_type || "");
    const subPropertyTypeProp = useState(property.sub_property_type || "");
    const basicDetailsValidProp = props.basicDetailsValidProp
    const basicDetailsProps = {youAreProp, listPropertyForProp, propertyTypeProp, apartmentTypeProp, 
        subPropertyTypeProp, basicDetailsValidProp, handleClick: props.handleClick}


    // LOCATION STATE MANAGEMENT
    const latlong = property.location ? property.location.split(",") : []
    const houseNoProp = useState(property.door_no || "");
    const streetNameProp = useState(property.street || "");
    const localityProp = useState(property.locality || "");
    const subLocalityProp = useState(property.location || "");
    const administrativeAreaProp = useState("");
    const landmarkProp = useState(property.landmark || "");
    const cityProp = useState(property.city || "");
    const latitudeProp = useState(latlong[0] || "");
    const longitudeProp = useState(latlong[1] || "");
    const addressProp = useState(property.address || "");
    const stateProp = useState(property.state || "");
    const postalCodeProp = useState(property.postal_code || "");
    const projectNameProp = useState(property.project_name || "");
    const locationValidProp = props.locationValidProp
    const locationProps = {houseNoProp, streetNameProp, localityProp, cityProp, latitudeProp, longitudeProp, administrativeAreaProp,
        postalCodeProp, stateProp, subLocalityProp, addressProp, landmarkProp, projectNameProp, locationValidProp, handleClick: props.handleClick}

    // PROPERTY DETAILS STATE MANAGEMENT
    const superBuiltUpAreaProp = useState(property.super_builtup_area || "");
    const builtUpAreaProp = useState(property.builtup_area || "");
    const carpetAreaProp = useState(property.carpet_area || "");
    const bedroomsProp = useState(property.bedrooms || "");
    const bathroomsProp = useState(property.bathrooms || "");
    const balconiesProp = useState(property.balconies || "");
    const otherRoomsProp = useState(property.other_rooms_list || []);
    const furnishingDetProp = useState(property.furnishing || "");
    const furnishingItemsProp = useState(property.furnishings_list || []);
    const totalFloorProp = useState(property.total_floors || "");
    const propertyOnFloorProp = useState(property.property_on_floor || "");
    const reservedParkingProp = useState(property.reserved_parking || false);
    const closedParkingProp = useState(property.closed_parking || "");
    const openParkingProp = useState(property.open_parking || "");
    const twoWheelerParkingProp = useState(property.two_wheeler_parking || "");
    const propertyAgeProp = useState(property.property_age || "");
    const availabilityProp = useState(property.availability || "");
    const possessionByProp = useState(property.possession_by || "");
    const undividedShareProp = useState(property.undivided_share || "");
    const numberOfFlatsProp = useState(property.number_of_flats || "");
    const elevatorProp = useState(property.presence_of_elevator || "");
    const plotAreaProp = useState(property.plot_area || "");
    const floorsAllowedProp = useState(property.floors_allowed_for_construction || "");
    const openSidesProp = useState(property.open_sides || "");
    const areaUnitProp = useState(property.area_unit || "sq.ft.");
    const propertyDetailsValidProp = props.propertyDetailsValidProp
    const propertyDetailsProps = {superBuiltUpAreaProp, builtUpAreaProp, carpetAreaProp, bedroomsProp, bathroomsProp, twoWheelerParkingProp,
        balconiesProp, otherRoomsProp, furnishingDetProp,furnishingItemsProp, totalFloorProp, propertyOnFloorProp, reservedParkingProp,
        closedParkingProp, openParkingProp, propertyAgeProp, availabilityProp, possessionByProp, undividedShareProp, areaUnitProp,
        numberOfFlatsProp, elevatorProp,plotAreaProp, floorsAllowedProp, openSidesProp, propertyTypeProps: propertyTypeProp[0],
        propertyDetailsValidProp, listPropertyForProps: listPropertyForProp[0], handleClick: props.handleClick}


    // PRICING STATE MANAGEMENT
    const ownerShipProp = useState(property.ownership || "");
    const expectedPriceProp = useState(property.price || "");
    const expectedRentProp = useState(property.rent || "");
    const allPricesInclusiveProp = useState(property.all_prices_inclusive || false);
    const priceNegotiableProp = useState(property.price_negotiable || true);
    const bookingAdvanceProp = useState(property.booking_advance || "");
    const maintenanceChargesProp = useState(property.maintenance || "");
    const maintenanceUnitProp = useState(property.maintenance_unit || "Monthly");
    const expectedRentalProp = useState(property.expected_rental || "");
    const brokerageProp = useState(property.brokerage || "");
    const securityDepositProp = useState(property.security_deposit || "");
    const rentNegotiableProp = useState(property.rent_negotiable || true);
    const brokerageNegotiableProp = useState(property.brokerage_negotiable || true);
    const pricingValidProp = props.pricingValidProp
    const pricingProps = {ownerShipProp, expectedPriceProp, allPricesInclusiveProp, priceNegotiableProp, rentNegotiableProp,
        bookingAdvanceProp, maintenanceChargesProp, expectedRentalProp, pricingValidProp, expectedRentProp, maintenanceUnitProp,
        securityDepositProp ,propertyTypeProps: propertyTypeProp[0], listPropertyForProps: listPropertyForProp[0], 
        brokerageNegotiableProp, youAreProps: youAreProp[0], handleClick: props.handleClick, brokerageProp}


    // FEATURES STATE MANAGEMENT
    const amenitiesProp = useState(property.amenities_list || []);
    const moreAmenitiesProp = useState(property.more_amenities_list || []);
    const cornerPropertyProp = useState(property.corner_property || false);
    const gatedSocietyProp = useState(property.gated_society || false);
    const facingProp = useState(property.facing || "");
    const facingRoadProp = useState(property.width_of_facing_road || "");
    const widthOfFacingRoadUnitProp = useState(property.width_of_facing_road_unit || "feet");
    const flooringTypeProp = useState(property.flooring_type || "");
    const powerBackupProp = useState(property.power_backup || "");
    const waterStorageProp = useState(property.capacity_of_water_storage || "")
    const waterSourceProp = useState(property.water_source || "");
    const boundaryWallProp = useState(property.boundary_wall || "");
    const overlookingProp = useState(property.overlooking || "");
    const propertyDescriptionProp = useState(property.property_description || "");
    const featuresValidProp = props.featuresValidProp
    const featuresProps = {amenitiesProp, moreAmenitiesProp, cornerPropertyProp, gatedSocietyProp,
        facingProp, facingRoadProp, flooringTypeProp, powerBackupProp, waterStorageProp, waterSourceProp, widthOfFacingRoadUnitProp,
        overlookingProp, propertyDescriptionProp, featuresValidProp, propertyTypeProps: propertyTypeProp[0],
        listPropertyForProps: listPropertyForProp[0], handleClick: props.handleClick, boundaryWallProp,
        uploadedImagesProp: props.uploadedImagesProp, deletedImagesProp: props.deletedImagesProp,
        inMemoryImagesProp: props.inMemoryImagesProp, imageBlobListProp: props.imageBlobListProp,
        preSignedUrlListProp: props.preSignedUrlListProp}

    useEffect(() => {
        if(props.mode === "create"){
            furnishingItemsProp[1](furnishingItemsConstant())
            amenitiesProp[1](amenitiesConstants())
            moreAmenitiesProp[1](moreAmenitiesConstants())
        }
    }, [])

    useEffect(() => {
        if(furnishingDetProp[0] === 2){
            furnishingItemsProp[1](furnishingItemsConstant())
        }
    }, [furnishingDetProp[0]])

    useEffect(() => {
        if(youAreProp[0] === "Owner"){
            brokerageProp[1]("")
        } else if(youAreProp[0] === "Broker"){

        }
    }, [youAreProp[0]])

    useEffect(() => {
        if(listPropertyForProp[0] === "Sale"){
            expectedRentProp[1]("")
            securityDepositProp[1]("")
        } else if(listPropertyForProp[0] === "Rent"){
            undividedShareProp[1]("")
            availabilityProp[1]("")
            expectedPriceProp[1]("")
            expectedRentalProp[1]("")
            ownerShipProp[1]("")
        }
    }, [listPropertyForProp[0]])

    useEffect(() => {
        if(propertyTypeProp[0] === "Apartment"){
            plotAreaProp[1]("")
            openSidesProp[1]("")
            floorsAllowedProp[1]("")
            boundaryWallProp[1]("")
        } else if(propertyTypeProp[0] === "House"){
            floorsAllowedProp[1]("")
            numberOfFlatsProp[1]("")
            undividedShareProp[1]("")
            propertyOnFloorProp[1]("")
            boundaryWallProp[1]("")
            maintenanceChargesProp[1]("")
        } else if(propertyTypeProp[0] === "Land"){
            superBuiltUpAreaProp[1]("")
            builtUpAreaProp[1]("")
            carpetAreaProp[1]("")
            bedroomsProp[1]("")
            bathroomsProp[1]("")
            balconiesProp[1]("")
            otherRoomsProp[1]([])
            furnishingDetProp[1](2)
            totalFloorProp[1]("")
            propertyOnFloorProp[1]("")
            reservedParkingProp[1]("")
            closedParkingProp[1]("")
            openParkingProp[1]("")
            twoWheelerParkingProp[1]("")
            propertyAgeProp[1]("")
            availabilityProp[1]("")
            undividedShareProp[1]("")
            numberOfFlatsProp[1]("")
            elevatorProp[1]("")
            maintenanceChargesProp[1]("")
            flooringTypeProp[1]("")
            powerBackupProp[1]("")
            waterStorageProp[1]("")
        }
    }, [propertyTypeProp[0]])
    
    const prepareAmenities = () => {
        const array1 = amenitiesProp[0].filter(item => item.active === true).map(item => {return {name: item.id}})
        return array1
    }

    const prepareMoreAmenities = () => {
        const array2 = moreAmenitiesProp[0].filter(item => item.active === true).map(item => {return {name: item.id}})
        return array2
    }
    
    const propertyFormFields = {
        "property": {
            "property_type": propertyTypeProp[0],
            "sub_property_type": subPropertyTypeProp[0],
            "poster_designation": youAreProp[0],
            "list_property_for": listPropertyForProp[0],
            "location": `${latitudeProp[0]},${longitudeProp[0]}`,
            "sub_locality": subLocalityProp[0],
            "state": stateProp[0],
            "postal_code": postalCodeProp[0],
            "address": addressProp[0],
            "geographic_coordinates": "",
            "locality": localityProp[0],
            "city": cityProp[0],
            "landmark": landmarkProp[0],
            "street": streetNameProp[0],
            "door_no": houseNoProp[0],
            "project_name": projectNameProp[0],
            "super_builtup_area": superBuiltUpAreaProp[0],
            "plot_area": plotAreaProp[0],
            "carpet_area": carpetAreaProp[0],
            "builtup_area": builtUpAreaProp[0],
            "undivided_share": undividedShareProp[0],
            "bedrooms": bedroomsProp[0],
            "bathrooms": bathroomsProp[0],
            "balconies": balconiesProp[0],
            "furnishing": propertyTypeProp[0] === "Land" ? 2 : furnishingDetProp[0],
            "total_floors": totalFloorProp[0],
            "property_on_floor": propertyOnFloorProp[0],
            "floors_allowed_for_construction": floorsAllowedProp[0],
            "number_of_flats": numberOfFlatsProp[0],
            "presence_of_elevator": elevatorProp[0],
            "reserved_parking": reservedParkingProp[0],
            "closed_parking": closedParkingProp[0],
            "open_parking": openParkingProp[0],
            "two_wheeler_parking" : true,
            /*"availability": (function(){
                if (availabilityProp[0] === "Ready to Move - Resale" 
                    || availabilityProp[0] === "Ready to Move - New Property") {
                        return 'Ready to Move'
                } else {return availabilityProp[0]}
              }()),*/
            "availability": availabilityProp[0],
            "property_age": propertyAgeProp[0],
            "possession_by": possessionByProp[0],
            "ownership": ownerShipProp[0],
            "price": expectedPriceProp[0],
            "booking_advance": bookingAdvanceProp[0],
            "maintenance": maintenanceChargesProp[0],
            "maintenance_unit": maintenanceUnitProp[0],
            "expected_rental": expectedRentalProp[0],
            "all_prices_inclusive": allPricesInclusiveProp[0],
            "price_negotiable": priceNegotiableProp[0],
            "brokerage": brokerageProp[0],
            "rent": expectedRentProp[0],
            "security_deposit": securityDepositProp[0],
            "water_source": waterSourceProp[0],
            "overlooking": overlookingProp[0],
            "capacity_of_water_storage": waterStorageProp[0],
            "corner_property": cornerPropertyProp[0],
            "gated_society": gatedSocietyProp[0],
            "facing": facingProp[0],
            "width_of_facing_road": facingRoadProp[0],
            "flooring_type": flooringTypeProp[0],
            "power_backup": powerBackupProp[0],
            "property_description": propertyDescriptionProp[0],
            "posting_status": "Active",
            "boundary_wall": boundaryWallProp[0],
            "transaction_type" : (function(){
                if (listPropertyForProp[0] === "Rent") {
                    return 3
                } else if(propertyTypeProp[0] === "Land" || availabilityProp[0] === "Ready to Move - Resale"){
                    return 0
                }else if (availabilityProp[0] === "Ready to Move - New Property"){
                    return 1
                }else if(availabilityProp[0] === "Under Construction") {
                    return 2
                }
              }()),
            "open_sides": openSidesProp[0],
            "width_of_facing_road_unit": widthOfFacingRoadUnitProp[0],            
            "rent_negotiable": rentNegotiableProp[0],
            "brokerage_negotiable": brokerageNegotiableProp[0],
            "profile_id": authenticatedUser.id,
            "amenities_list": JSON.stringify(propertyTypeProp[0] === "Land" ? [] : prepareAmenities()),
            "more_amenities_list": JSON.stringify(propertyTypeProp[0] === "Land" ? [] : prepareMoreAmenities()),
            "furnishings_list": JSON.stringify(furnishingItemsProp[0].filter(item => item.active === true).map(item => {return {active: item.active, quantity: item.number, name: item.id}})),
            "other_rooms_list": JSON.stringify(otherRoomsProp[0].map(item => {return {name: item}})),
        },
        "amenities": propertyTypeProp[0] === "Land" ? [] : prepareAmenities(),
        "furnishings": furnishingItemsProp[0].filter(item => item.active === true).map(item => {return {active: item.active, quantity: item.number, name: item.id}}),
        "other_rooms": otherRoomsProp[0].map(item => {return {name: item}}),
        "photos": []
    }

    const formDataConvert = () => {
        var options = {
            initialFormData: new FormData(),
            showLeafArrayIndexes: true,
            includeNullValues: false,
            mapping: function(value) {
                if (typeof value === 'boolean') {
                    return +value ? '1': '0';
                }
                return value;
            }
        };
        var formData = jsonFormData(propertyFormFields, options);
        for (var pair of formData.entries()) {
        }
        return formData
    }

    const formSubmitHandler = () => {
        if(basicDetailsValidProp[0] && locationValidProp[0] && propertyDetailsValidProp[0] && pricingValidProp[0] && featuresValidProp[0]){
            if(!!authenticatedUser && Object.keys(authenticatedUser).length === 0){
                setPortalOpen(true)
                setPortalMessage("You are not logged in. Please Sign In to post property.")
            } else {
                axios.post('/properties', formDataConvert()).then(res => {
                    console.log(res)
                    setPostedSuccess(true)
                    setPostedPropertyId(res.data.id)
                }).catch(err => {
                    setPortalOpen(true)
                    setPortalMessage("An error has occured while posting property. Please try again later")
                    console.log(err, err.response)
                })
            }
        }
    }

    const portalProps = {
        portalOpenProps: portalOpenProps,
        icon: "time",
        header: "An error has occured",
        message: portalMessage
    }

    useEffect(() => {
        if(props.fillFormProp[0] === true){
            youAreProp[1]("Broker");
            listPropertyForProp[1]("Sale");
            propertyTypeProp[1]("Apartment");
            subPropertyTypeProp[1]("1");
            apartmentTypeProp[1]("1");

            houseNoProp[1]("");
            streetNameProp[1]("");
            localityProp[1]("");
            subLocalityProp[1]("");
            administrativeAreaProp[1]("");
            landmarkProp[1]("Near the Hospital");
            cityProp[1]("");
            latitudeProp[1]("13.0736305");
            longitudeProp[1]("80.27641969999999");
            addressProp[1]("");
            stateProp[1]("");
            postalCodeProp[1]("");
            projectNameProp[1]("Marvelous Builders");

            superBuiltUpAreaProp[1]("2500.2");
            builtUpAreaProp[1]("2100");
            carpetAreaProp[1]("1970");
            bedroomsProp[1]("4");
            bathroomsProp[1]("3");
            balconiesProp[1]("3");
            otherRoomsProp[1](["1", "2", "3"]);
            furnishingDetProp[1]("1");
            furnishingItemsProp[1](furnishingItemsConstantForAutoFormFill);
            totalFloorProp[1]("5");
            propertyOnFloorProp[1]("4");
            reservedParkingProp[1](true);
            closedParkingProp[1]("1");
            openParkingProp[1]("1");
            twoWheelerParkingProp[1](true);
            propertyAgeProp[1]("0 - 1 year old");
            availabilityProp[1]("Ready to Move - New Property");
            possessionByProp[1]("Within 6 Months");
            undividedShareProp[1]("970");
            numberOfFlatsProp[1]("20");
            elevatorProp[1](true);
            plotAreaProp[1]("0");
            floorsAllowedProp[1]("");
            openSidesProp[1]("");

            ownerShipProp[1]("Freehold");
            expectedPriceProp[1]("25000000");
            expectedRentProp[1]("");
            allPricesInclusiveProp[1](true);
            priceNegotiableProp[1](true);
            bookingAdvanceProp[1]("500000");
            maintenanceChargesProp[1]("5000");
            expectedRentalProp[1]("60000");
            brokerageProp[1]("2");
            securityDepositProp[1]("");
            rentNegotiableProp[1](true);
            brokerageNegotiableProp[1](true);

            amenitiesProp[1](generateAmenitiesConstantsForAutoFill());
            moreAmenitiesProp[1](generateMoreAmenitiesConstantsForAutoFill());
            cornerPropertyProp[1](true);
            gatedSocietyProp[1](false);
            facingProp[1]("East");
            facingRoadProp[1]("50");
            flooringTypeProp[1]("Vitrified");
            powerBackupProp[1]("Full");
            waterStorageProp[1]("13000")
            waterSourceProp[1]("Municipal Corporation");
            boundaryWallProp[1]("");
            overlookingProp[1]("Main Road");
            propertyDescriptionProp[1]("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        }
        console.log(props.fillFormProp, "FILL FORM PROP CHANGED")
        props.fillFormProp[1](false)
    }, [props.fillFormProp])

    const renderForm = () => {
        switch(props.stepProps[0]){
            case 1:
                return <BasicDetails {...basicDetailsProps} step={props.stepProps}/>
            case 2:
                return <Location {...locationProps} step={props.stepProps}/>
            case 3:
                return <PropertyDetails {...propertyDetailsProps} step={props.stepProps}/>
            case 4:
                return <Pricing {...pricingProps} step={props.stepProps}/>
            case 5:
                return <Features {...featuresProps} step={props.stepProps}/>
        }
    }

    const formSubmitHandler2 = () => {
        console.log(basicDetailsValidProp[0], locationValidProp[0], propertyDetailsValidProp[0], pricingValidProp[0], featuresValidProp[0])
        if(basicDetailsValidProp[0] && locationValidProp[0] && propertyDetailsValidProp[0] && pricingValidProp[0] && featuresValidProp[0]){         
            //axios.post('/properties', propertyFormFields).then(res => console.log(res))
            if(!!authenticatedUser && Object.keys(authenticatedUser).length === 0){
                setPortalOpen(true)
                setPortalMessage("You are not logged in. Please Sign In to post property.")
            } else {
                props.submitHandler(propertyFormFields.property)
            }
        }
    }

    return(
        <Fragment>
            <PortalMain {...portalProps} />
            {renderForm()}
            {props.stepProps[0] === 5 &&
                <Button fluid size="large" color="purple" onClick={formSubmitHandler2} loading={props.loading}
                        style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
                   <Image src={postPropertyIcon} style={{height: 35, width: 35, marginRight: 12}} />
                   <div>{(props.mode === "edit") ? "UPDATE PROPERTY AD" : "POST PROPERTY FOR SALE"}</div>
                </Button>
            }
        </Fragment>
    )
}

export default MainForm; 