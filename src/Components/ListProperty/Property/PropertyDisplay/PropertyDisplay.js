import React, {Fragment, useState, useEffect, useContext} from 'react';
import { Segment, Container, Header, Icon, Image, Grid, Button } from 'semantic-ui-react';
import DisplayHeader from './DisplayComponents/DisplayHeader';
import DisplayDetails from "./DisplayDetails";
import ImageViewer from './DisplayComponents/ImageViewer';
import axios from 'axios'
import {PropertyDisplayContext} from "../../../PropertyDisplayContext"
import {AppContext} from "../../../AppContext"
import FullPageLoader from "../../../UI/FullPageLoader"
import InfoPageButton from "../../../UI/InfoPages/InfoPageButton"
import pageNotExist1 from "../../../../static/Icons/GeneralIcons/pageNotExistIcon1.svg"
import pageNotExist2 from "../../../../static/Icons/GeneralIcons/pageNotExistIcon2.svg"
import homePageIcon from "../../../../static/Icons/GeneralIcons/homePageIcon.svg"


let timer

const PropertyDisplay = (props) => {

    const propertyDisplayContext = useContext(PropertyDisplayContext)
    const {unitSelectedProps} = useContext(AppContext)

    const [property, setProperty] = useState(null)
    const shortListProps = useState(false)    
    const loadingProps = useState(false)
    const headerHeightProps = useState(0)

    const [loading, setLoading] = loadingProps


    useEffect(() => {
        setLoading(true)
        axios.get(`/properties/${props.match.params.id}`).then(res => {
            console.log(res.data, "PRINTING PROPERTY DISPLAYH RESPONSE")
            setProperty(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err, err.response)
        })
    }, [])

    const propsPassed = {loadingProps, shortListProps, property, headerHeightProps}

    return(
        <Fragment>  
            {!loading ?
                <>
                    {property ?
                        <>
                            <DisplayHeader {...propsPassed}/>
                            <Container >
                                <DisplayDetails  property={property} propsPassed={propsPassed} />
                            </Container>
                        </>
                    :
                        <>
                            <InfoPageButton icon={pageNotExist1} message="The page you are looking for doesnot exist." 
                                buttonIcon={homePageIcon} buttonMessage="GO TO HOMEPAGE" buttonLink="/" />
                        </>
                    }
                </>
                :
                <FullPageLoader />
            }
        </Fragment>  
    )
}

export default PropertyDisplay;