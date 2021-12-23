import React, {useState, Fragment, useEffect} from 'react';
import { Segment, Menu, Header, Icon, Image, Grid, Button } from 'semantic-ui-react';
import rightArrow from '../../../../Icons/next2.svg'
import leftArrow from '../../../../Icons/previous2.svg'

const sliderSegmentStyle = {
    width:60, position: "absolute", zIndex: 1,top: 0, bottom: 0, margin: 0, cursor: "pointer", alignItems: "center",
    border: "none", boxShadow: "none", borderRadius: 0, height: "100%", display: "flex", justifyContent: "center"
}

const mainSegmentStyle = {
    overflow: "hidden", position: "relative", paddingTop: 0, paddingBottom: 0
}

const ImageViewer = (props) => {

    const {imagesProps, firstImageProps, prevProperty, nextProperty, currentIndexProps} = props;

    const [images, setImages] = imagesProps
    const [firstImage, setFirstImage] = firstImageProps
    const [currentIndex, setCurrentIndex] = currentIndexProps

    const [multiplier, setMultiplier] = useState(0)
    const [leadIndex, setLeadIndex] = useState(0)
    const [trailIndex, setTrailIndex] = useState(0)
    const [leadIndexFull, setLeadIndexFull] = useState(true)
    const [divWidth, setDivWidth] = useState(0)
    const [noOfThumbs, setNoOfThumbs] = useState(0)

    let wid
    let noOfThumbsInit
    let trailIndexInit

    useEffect(() => {
        wid = document.getElementById("mydiv").offsetWidth -120
        noOfThumbsInit = Math.ceil(wid/150)
    })

    useEffect(() => {        
        setDivWidth(wid)
        setNoOfThumbs(noOfThumbsInit)
    }, [])

    useEffect(() => {
        if(currentIndex === trailIndex+noOfThumbs-1 && leadIndexFull){
            setMultiplier((prevMul) => prevMul - (noOfThumbs * 150 - wid))
            setLeadIndexFull(false)
        }
        else if(currentIndex === leadIndex && leadIndexFull === true){
            return;
        }
        else if(currentIndex === leadIndex && leadIndexFull === false){
            setMultiplier((prevMul) => prevMul + (noOfThumbs * 150 - wid))
            setLeadIndexFull(true)
        }
        else if(currentIndex > trailIndex+noOfThumbs-1 && trailIndex+noOfThumbs <= images.length-1){
            setMultiplier((-150 * (currentIndex-noOfThumbs+1)- (noOfThumbs * 150 - wid)))
            setLeadIndexFull(false)
            setLeadIndex(currentIndex-noOfThumbs+1)
            setTrailIndex(currentIndex-noOfThumbs+1)
        }
        else if(currentIndex < leadIndex && leadIndex !== 0){
            setMultiplier(-150 * currentIndex)
            setLeadIndexFull(true)
            setLeadIndex(currentIndex)
            setTrailIndex(currentIndex)
        }
    }, [firstImage])

    const leftSliderClick = () => {
        if(leadIndex !== 0){
            setLeadIndex(prev => prev - 1)
            setTrailIndex(prev => prev - 1)
            setMultiplier((prevMul) => prevMul + 150)
        }
        else if(leadIndex === 0 && leadIndexFull === false){
            setLeadIndexFull(true)
            setMultiplier((prevMul) => {console.log(prevMul + (noOfThumbs * 150 - wid), "left"); return prevMul + (noOfThumbs * 150 - wid);})
        }
    }

    const rightSliderClick = () => {
        if(trailIndex+noOfThumbs <= images.length-1){
            setLeadIndex(prev => prev  + 1)
            setTrailIndex(prev => prev  + 1)
            setMultiplier((prevMul) => prevMul - 150)
        }
        else if(trailIndex+noOfThumbs === images.length-1){
            setLeadIndexFull(false)
            setMultiplier((prevMul) => {console.log(prevMul - (noOfThumbs * 150 - wid), "right"); return prevMul - (noOfThumbs * 150 - wid);})
        }
    }

    const selectIndex = (propertyItem) => {
        return images.findIndex(x => x === propertyItem)
    }

    return(
        <Fragment>            
            <Segment compact style={{...mainSegmentStyle, paddingLeft: 60, paddingRight: 60}} id="mydiv">  
                <Segment style={{...sliderSegmentStyle, left: 0}} onClick={leftSliderClick}>
                    <Image src={leftArrow} />
                </Segment>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="card-slider" style={{transform: `translateX(${multiplier}px`}}>
                        {
                            images.map(propertyItem => {
                                let styleArr;
                                styleArr = propertyItem !== firstImage ? {opacity: 0.5, transform: "scale(0.85)"} :{opacity: 1, transform: "scale(1)"}
                                return <div style={{width: 150}} key={propertyItem}>
                                            <Image src={propertyItem} size="small" key={propertyItem.index} 
                                                onClick={() => {setFirstImage(propertyItem); setCurrentIndex(selectIndex(propertyItem))}} 
                                                style={{...styleArr, cursor: "pointer", maxHeight: 150, width: 150, display: "inline-flex",
                                                transition: "opacity 300ms linear, transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)",
                                                border: "1px solid gray"}}/>
                                        </div>
                            })
                        }
                    </div> 
                </div>                             
                <Segment style={{...sliderSegmentStyle, right:0}} onClick={rightSliderClick}>
                    <Image src={rightArrow} />
                </Segment>          
            </Segment>
        </Fragment>
    )
}

export default ImageViewer;