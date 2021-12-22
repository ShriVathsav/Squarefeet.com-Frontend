import React, {useEffect, useState} from 'react'

export const PropertyDisplayContext = React.createContext({
    activeMenuProps: [],
    propertyDetailsHeightProps: [], 
    featuresHeightProps: [], 
    locationDetailsHeightProps: [], 
    ownerDetailsHeightProps: []
})

const PropertyDisplayContextProvider = props => {
    
    const activeMenuProps  = useState("PropertyDetails")
    const propertyDetailsHeightProps = useState(0)
    const featuresHeightProps = useState(0)
    const locationDetailsHeightProps = useState(0)
    const ownerDetailsHeightProps = useState(0)

    const initialValues = {
        activeMenuProps, propertyDetailsHeightProps, featuresHeightProps, 
        locationDetailsHeightProps, ownerDetailsHeightProps
    }

    return (
        <PropertyDisplayContext.Provider value={initialValues}>
            {props.children}
        </PropertyDisplayContext.Provider>
    )
}

export default PropertyDisplayContextProvider