import React, {useState} from 'react'

import {propertyTypeFilterList, amenitiesFilterList, constructionStatusFilter, 
    configurationFilterList, postedByFilterList, furnishingFilterList} from "./Utility/Constants"

export const Context = React.createContext({
    propertyListProps: [],
    filteredPropertyListProps: [],
    propertyForProps: [],
    localityProps: [],
    cityProps: [],
    bedroomFilterProp: [],
    propertyTypeFilterProp: [],
    postedByFilterProp: [],
    propertyStatusFilterProp: [],
    amenitiesFilterProp: [],
    furnishingFilterProp: [],
    minPriceFilterProp: [],
    maxPriceFilterProp: [],
    minAreaFilterProp: [],
    maxAreaFilterProp: [],
    unitSelectedProps: [],

    screenWidthProps: [],
    authenticatedUserProps: [],

    activeMenuProps: [],
    propertyDetailsHeightProps: [], 
    featuresHeightProps: [], 
    locationDetailsHeightProps: [], 
    ownerDetailsHeightProps: []
})

const ContextProvider = props => {

    useEffect(() => {
        const token = localStorage.getItem("SquareFeetToken")
        !!token && 
        axios.get("/auth", {headers: {
            "Authorization": `bearer ${token}`
        }}).then(res => {
            console.log(res)
            authenticatedUserProps[1](res.data)
        }).catch((err) => {
            console.dir(err)
            localStorage.clear()
            authenticatedUserProps[1]({})
        })
    }, [])

    //APP CONTEXT
    const propertyListProps = useState([])
    const filteredPropertyListProps = useState([])
    const localityProps = useState("")
    const cityProps = useState("")
    const propertyForProps = useState("")
    const bedroomFilterProp = useState(configurationFilterList)
    const propertyTypeFilterProp = useState(propertyTypeFilterList)
    const postedByFilterProp = useState(postedByFilterList)
    const propertyStatusFilterProp = useState(constructionStatusFilter)
    const amenitiesFilterProp = useState(amenitiesFilterList)
    const furnishingFilterProp = useState(furnishingFilterList)
    const minPriceFilterProp = useState(500000)
    const maxPriceFilterProp = useState(1000000000)
    const minRentFilterProp = useState(1000)
    const maxRentFilterProp = useState(1000000)
    const minAreaFilterProp = useState(100)
    const maxAreaFilterProp = useState(10000)
    const unitSelectedProps = useState("sq.ft.")

    //VIEW CONTEXT
    const screenWidthProps = useState(window.innerWidth)
    const authenticatedUserProps = useState({})

    //PROPERTY DISPLAY CONTEXT
    const activeMenuProps  = useState("PropertyDetails")
    const propertyDetailsHeightProps = useState(0)
    const featuresHeightProps = useState(0)
    const locationDetailsHeightProps = useState(0)
    const ownerDetailsHeightProps = useState(0)

    const initialValues = {
        propertyListProps, filteredPropertyListProps, propertyForProps, localityProps, cityProps, bedroomFilterProp,
        propertyTypeFilterProp, postedByFilterProp, propertyStatusFilterProp, amenitiesFilterProp, furnishingFilterProp,
        minPriceFilterProp, maxPriceFilterProp, minAreaFilterProp, maxAreaFilterProp, minRentFilterProp, 
        maxRentFilterProp, unitSelectedProps,

        screenWidthProps, authenticatedUserProps,

        activeMenuProps, propertyDetailsHeightProps, featuresHeightProps, 
        locationDetailsHeightProps, ownerDetailsHeightProps
    }

    return (
        <Context.Provider value={initialValues}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider