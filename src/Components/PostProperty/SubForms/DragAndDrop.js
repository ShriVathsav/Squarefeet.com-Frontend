import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import {Card, Icon, Image, Segment, Divider, Form, Dropdown, Popup, Header} from 'semantic-ui-react';

import { v4 as uuidv4 } from 'uuid';


import deleteIcon from '../../Icons/delete-icon.svg';
import coverPhoto from '../../Icons/gallery.svg';

const tags = [
    { key: 'a', text: 'Building', value: 'Building' },
    { key: 'b', text: 'Entrance', value: 'Entrance' },
    { key: 'c', text: 'Hall', value: 'Hall' },
    { key: 'd', text: 'Bedroom', value: 'Bedroom' },
    { key: 'e', text: 'Bathroom', value: 'Bathroom' },
    { key: 'f', text: 'Kitchen', value: 'Kitchen' },
    { key: 'g', text: 'Balcony', value: 'Balcony' },
    { key: 'h', text: 'Dining Room', value: 'Dining Room' },
    { key: 'i', text: 'Property Layout', value: 'Property Layout' },
    { key: 'j', text: 'Layout Map', value: 'Location Map' },
    { key: 'k', text: 'Floor Plan', value: 'Floor Plan' },
    { key: 'l', text: 'Others', value: 'Others' }
]

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: "pointer"
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center"
};

const thumb = {
    display: 'inline-flex',
    width: 150,
    height: 150,
    padding: 0,
    boxSizing: 'border-box',

};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    position: "relative",
    textAlign: "center",
    color: "white",
    
};

const img = {
    display: 'block',
    width: '100%',
    height: '100%'
};

const topRight = {
    position: "absolute",
    top: "8px",
    right: "8px",
    cursor: "pointer",
    height: 25,
    width: 25
}

const topLeft = {
    position: "absolute",
    top: "8px",
    left: "8px",
    cursor: "pointer",
    color: "white",
    height: 25,
    width: 25
}

const DragAndDrop = (props) => {

    const {files, uploadImage, uploadedImagesProp, deletedImagesProp, inMemoryImagesProp,
        imageBlobListProp, preSignedUrlListProp} = props

    console.log(preSignedUrlListProp)
    const iconSelect = useRef(0);
    const [uploadedImages, setUploadedImages] = uploadedImagesProp
    const [deletedImages, setDeletedImages] = deletedImagesProp
    const [inMemoryImages, setInMemoryImages] = inMemoryImagesProp
    const [imageBlobList, setImageBlobList] = imageBlobListProp
    const [preSignedUrlList, setPreSignedUrlList] = preSignedUrlListProp
    const [delImage, setDelImage] = useState(true)

    const {getRootProps,
            getInputProps,
            fileRejections,
            isDragActive,
            isDragAccept,
            isDragReject} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            uploadImage((prevFiles) => {
                let acceptedList = [...prevFiles]
                console.log(acceptedFiles, "ACCEPTED FILES")
                const n = acceptedFiles.map((file, index) => {
                    setInMemoryImages(prev => {
                        prev.push(URL.createObjectURL(file))
                        return prev
                    })
                    setImageBlobList(prev => {
                        prev.push(file)
                        return prev
                    })
                    /*Object.assign(file, {
                        id: uuidv4(),
                        tag: "Others",
                        cover_photo: true
                    })*/
                })
                acceptedList.push(...n)
                return acceptedList;
            });
        }
    });

    const fileRejectionItems = fileRejections.map(({ file, errors}) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => {
                    return (
                        <li key={e.code}>{e.message}</li>
                    )
                })}
            </ul>
        </li>
    ));

    useEffect(() => console.log(imageBlobList, uploadedImages, deletedImages, inMemoryImages, preSignedUrlList))

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    useEffect(() => console.log("mounting"),[])
    useEffect(() => {console.log("mounting and unmounting"); return () => console.log("unmount")})

    const inMemoryImageDelete = (index) => {
        console.log("DELETING IN MEMORY IMAGES")
        setInMemoryImages(prev => {
            prev.splice(index, 1)
            return prev
        })
        setImageBlobList(prev => {
            prev.splice(index, 1)
            return prev
        })
        setDelImage(prev => !prev)
    }

    const uploadedImageDelete = (index) => {
        console.log("DELETING UPLOADED IMAGES")
        setDeletedImages(prev => {
            prev.push(uploadedImages[index])
            return prev
        })
        setUploadedImages(prev => {
            prev.splice(index, 1)
            return prev
        })
        setPreSignedUrlList(prev => {
            prev.splice(index, 1)
            return prev
        })
        setDelImage(prev => !prev)
    }

    const onTagSelect = (tags) => {
        uploadImage([...files].map(file => {
            return {
                ...file,
                tag: tags
            }
        }))
    }

    const thumbs = (imageUrlList, deleteFunction) => imageUrlList.map((file, index) => (
        <Segment compact style={{margin: 10, padding: 5, align: "center"}} key={index}>
            <div style={thumb}>
                <div style={thumbInner}>
                    <Image style={img} src={file}/>
                    <Popup style={{opacity: 0.7, padding: '0.5em'}} inverted
                        trigger={<Image style={topRight} src={deleteIcon} onClick={() => deleteFunction(index)} />}
                        content='Remove Picture' position='bottom right'
                    />
                    <Popup style={{opacity: 0.7, padding: '0.5em'}} inverted
                        trigger={<Image style={topLeft} src={coverPhoto} />}
                        content='Set as Cover Picture' position='bottom left'
                    />
                </div>
            </div>
            <Form>
                <Form.Field required>
                    <label>Tag As</label>
                    <div>
                        <Dropdown fluid selection placeholder='Select choice' 
                            value={file.tag} onChange={(event, data) => onTagSelect(data.value)} scrolling options={tags} />
                    </div>
                </Form.Field>
            </Form>
        </Segment>
    ));

    /*useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);*/

    return (
        <div>
            <div {...getRootProps({style})} >
                <input {...getInputProps()} />
                Drag and Drop Or Click to upload
            </div>
            <div style={thumbsContainer}>
                {thumbs(preSignedUrlList, uploadedImageDelete)}
                {thumbs(inMemoryImages, inMemoryImageDelete)}
            </div>
            {fileRejectionItems}
        </div>
    );
}

export default DragAndDrop;