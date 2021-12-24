import React, {useState, useEffect} from 'react'
import axios from "axios"

export const ViewContext = React.createContext({
    screenWidthProps: [],
    authenticatedUserProps: []
})

const ViewContextProvider = props => {

    const screenWidthProps = useState(window.innerWidth)
    const authenticatedUserProps = useState({})

    useEffect(() => {
        const token = localStorage.getItem("SquareFeetToken")
        !!token && 
        axios.get("/auth", {headers: {
            "Authorization": `bearer ${token}`
        }}).then(res => {
            console.log(res)
            authenticatedUserProps[1](res.data)
        }).catch((err) => {
            localStorage.clear()
            authenticatedUserProps[1]({})
            console.dir(err, err.response)
        })
    }, [])

    const initialValues = {
        screenWidthProps, authenticatedUserProps
    }

    return (
        <ViewContext.Provider value={initialValues}>
            {props.children}
        </ViewContext.Provider>
    )
}

export default ViewContextProvider