import React from 'react'
import { Image} from 'semantic-ui-react'
import searchPropertyIcon from '../../static/Icons/GeneralIcons/searchPropertyIcon.svg'

import SearchBar from "./SearchBar"
import "./SearchProperty.css"

const DisplayPage = (props) => {
    return (
        <div>
            <div id="page-title">
                <Image src={searchPropertyIcon} style={{height: 45, width: 45, marginRight: 10}} />
                <div>SEARCH PROPERTY</div>
            </div>
            <SearchBar history={props.history}/>
        </div>
    )
}

export default DisplayPage