import React, {useState, useEffect, Fragment} from 'react'
import { Button, Header, Icon, Modal, Segment, Image, Popup, Label } from 'semantic-ui-react'
import ImageViewer from './ImageViewer'
import leftArrow from '../../../../Icons/leftArrow3.svg'
import rightArrow from '../../../../Icons/rightArrow3.svg'
import delete2 from '../../../../Icons/delete2.svg'

import shortlist from '../../../../Icons/DisplayPropertyIcons/shortlist.svg'
import shortlist2 from '../../../../Icons/DisplayPropertyIcons/shortlist-2.svg' 

import "./ImageViewerModal.css"

const imageArrowStyle = {
    cursor: "pointer", position: "absolute", top: 230
}

const ImageViewerModal = (props) => {
    const [open, setOpen] = useState(false)

    const currentIndexProps = useState(0)
    const [currentIndex, setCurrentIndex] = currentIndexProps

    const [shortList, setShortList] = props.shortListProps
    const {photos} = props.property

    const imagesProps = useState(photos)
    const firstImageProps = useState(photos[0])

    const [firstImage, setFirstImage] = firstImageProps
    const [images, setImages] = imagesProps

    const {triggerObj} = props

  
    const nextProperty = () => {
      let newIndex;
      if(currentIndex !== images.length-1){
          newIndex = currentIndex+1;
          setCurrentIndex(newIndex)
          setFirstImage(images[newIndex])
      }
    }

    const prevProperty = () => {
        let newIndex;
        if(currentIndex !== 0){
            newIndex = currentIndex-1;
            setCurrentIndex(newIndex)
            setFirstImage(images[newIndex])
        }
    }

    const segment2 = (
        <Segment id="display-property-image" 
              style={{ maxWidth: 430, cursor: "pointer", paddingRight: 3, position: "relative"}} >
          <div style={{float: "right"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Image src={shortList ? shortlist2 : shortlist}  size="mini" style={{marginBottom: 5, marginRight: !shortList && 15.53}}
                    onClick={(e) => {e.stopPropagation(); setShortList(prev => !prev);}}/>
                {shortList && <Label color='red' horizontal style={{margin: 0, opacity: 0.6, fontSize: 10}}>Shortlisted</Label>}
              </div>
          </div>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' id="shortlist-icon" 
              id="display-property-image" style={{cursor: "pointer"}}/>
        </Segment>
    )

    const segment = (
        <Fragment>
          <Image id="display-property-image" src='https://react.semantic-ui.com/images/wireframe/image.png'
              style={{ maxWidth: 430, cursor: "pointer"}} />
          <div style={{float: "right"}} id="shortlist-icon">
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Image src={shortList ? shortlist2 : shortlist}  size="mini" style={{marginBottom: 5, marginRight: !shortList && 15.53}}
                    onClick={(e) => {e.stopPropagation(); setShortList(prev => !prev);}}/>
                {shortList && <Label color='red' horizontal style={{margin: 0, opacity: 0.6, fontSize: 10}}>Shortlisted</Label>}
              </div>
          </div>
        </Fragment>
    )

    const dispImage = (
        <div style={{position: "relative", display: "inline-flex"}} id="card-image-3" >
            <Image
                fluid rounded style={{cursor: "pointer", display: "inline-flex", height: "100%"}}
                label={{
                    as: 'a',
                    color: shortList ? "red" : "orange",
                    content: shortList ? "Shortlisted" : 'Shortlist',
                    icon: 'star',
                    size: "medium",
                    ribbon: true,
                    onClick: (e) => {e.stopPropagation(); setShortList(prev => !prev);}
                }}
                src={photos[0].path}
            />
            <div style={{width: "100%", height: "15%", display: "flex", flexDirection: "row-reverse", alignItems: "center", bottom: 0,
                    cursor: "pointer",  backgroundColor: "black", opacity: 0.8, borderRadius: ".3125em", position: "absolute",  }} >
                <span style={{color: "white", marginRight: 25}} >{images.length} {images.length === 1 ? "Photo": "Photos"}</span>
                <Icon inverted name='picture' style={{marginRight: 7}}/>
            </div>
        </div>
    )

    const dispImage2 = (
        <div style={{position: "relative", display: "inline-flex"}} id="card-image-2">
            <Image
                fluid rounded style={{cursor: "pointer", display: "inline-flex", height: "100%"}}
                label={{
                    as: 'a',
                    color: shortList ? "red" : "orange",
                    content: shortList ? "Shortlisted" : 'Shortlist',
                    icon: 'star',
                    size: "medium",
                    ribbon: true,
                    onClick: (e) => {e.stopPropagation(); setShortList(prev => !prev);}
                }}
                src={photos[0].path}
            />
            <div style={{width: "100%", height: "20%", display: "flex", flexDirection: "row-reverse", alignItems: "center", bottom: 0,
                    position: "absolute", backgroundColor: "black", opacity: 0.8, borderRadius: ".3125em", cursor: "pointer" }} >
                <span style={{color: "white", marginRight: 25}} >{images.length} {images.length === 1 ? "Photo": "Photos"}</span>
                <Icon inverted name='picture' style={{marginRight: 7}}/>
            </div>
        </div>
    )

    //src='https://react.semantic-ui.com/images/wireframe/image.png'

    useEffect(() => {
      return (() => {
        console.log("UNMOUNTING IMAGE VIEWER")
        setFirstImage(images[0])
      })
    }, [])

    return (
        <Modal basic onClose={() => {setOpen(false); setFirstImage(photos[0])}} onOpen={() => setOpen(true)} open={open} closeOnDimmerClick={false}
                size='fullscreen' trigger={eval(triggerObj)} 
                style={{left: 0, right: 0, width: "100%", position: "relative"}}>
            <Image src={leftArrow} size="mini" style={{...imageArrowStyle, left: 0}} onClick={prevProperty}/>
            <Image src={rightArrow} size="mini" style={{...imageArrowStyle, right: 0}} onClick={nextProperty}/>
            <Image src={delete2} size="mini" style={{position: "absolute", right: 0, top: 0, cursor: "pointer"}} onClick={() => {setOpen(false); setFirstImage(images[0]); setCurrentIndex(0)}}/>
            <Modal.Content image style={{paddingTop: 0, display: "flex", justifyContent: "center"}}>
                <Image src={firstImage.path} size="big" style={{height: 420}}/>
            </Modal.Content>
            <Modal.Content style={{ display: "flex", justifyContent: "center"}}>
                <ImageViewer imagesProps={imagesProps} firstImageProps={firstImageProps} 
                  prevProperty={prevProperty} nextProperty={nextProperty} currentIndexProps={currentIndexProps} />
            </Modal.Content>
        </Modal>
    )
}

export default ImageViewerModal;