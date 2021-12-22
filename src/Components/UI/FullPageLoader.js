import React from 'react'
import { Loader, Segment, Dimmer, Image, Container } from 'semantic-ui-react'
import loadingImage from "../../static/Images/LoadingImage.png"

const FullPageLoader = () => {

    return (
        <Container>
            <Segment style={{height: "70vh"}}>
                <Dimmer active inverted style={{zIndex: 10}} >
                    <Loader size='huge'>Loading</Loader>
                </Dimmer>
                {[1,2,3,4].map(item => 
                    <Image src={loadingImage} style={{height: "25%", width: "100%", 
                        paddingBottom: item !== 4 ? 14 : 0}} key={item} />  
                )}
            </Segment>
        </Container>
    )
}

export default FullPageLoader;