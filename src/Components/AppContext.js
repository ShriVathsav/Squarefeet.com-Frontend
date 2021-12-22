import React, {useState} from 'react'

import {propertyTypeFilterList, amenitiesFilterList, constructionStatusFilter, 
    configurationFilterList, postedByFilterList, furnishingFilterList} from "./Utility/Constants"

export const AppContext = React.createContext({
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
    unitSelectedProps: []
})

const AppContextProvider = props => {
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

    const initialValues = {
        propertyListProps, filteredPropertyListProps, propertyForProps, localityProps, cityProps, bedroomFilterProp,
        propertyTypeFilterProp, postedByFilterProp, propertyStatusFilterProp, amenitiesFilterProp, furnishingFilterProp,
        minPriceFilterProp, maxPriceFilterProp, minAreaFilterProp, maxAreaFilterProp, minRentFilterProp, 
        maxRentFilterProp, unitSelectedProps
    }

    return (
        <AppContext.Provider value={initialValues}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider