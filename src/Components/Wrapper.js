import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';

import {Switch, Route} from 'react-router-dom'

import EditPropertyAd from './PostProperty/EditPropertyAd';
import CreatePropertyAd from './PostProperty/CreatePropertyAd';
import Layout from './UI/Layout';
import ListProperty from "./ListProperty/ListProperty";
import DisplayPage from "./SearchProperty/DisplayPage"
import PropertyDisplay from './ListProperty/Property/PropertyDisplay/PropertyDisplay';
import Profile from "./Profile/Profile"
import {Context} from "../context/Context"
import Footer from "./UI/Footer"
import Error404Page from "./UI/Error404Page"

let timer

const Wrapper = () => {
    const {screenWidthProps} = useContext(Context) 
    const [screenWidth, setScreenWidth] = screenWidthProps

    useEffect(() => {
        const func = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                setScreenWidth(window.innerWidth)
            }, 1000)
        }    
        window.addEventListener('resize', func)  
        return () => window.removeEventListener("resize", func)    
    }, [])

    return (   
        <div id="App">
            <Layout/>
            <div id="main" style={{marginTop: 82}}>
                <Container>
                    <Switch>
                        <Route path="/post-property" ><CreatePropertyAd/></Route>
                        <Route path="/editProperty/:id" component={EditPropertyAd} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/list-properties/:city" component={ListProperty} />
                        <Route path="/" exact component={DisplayPage} />
                        <Route path="/property-display/:id" component={PropertyDisplay} />
                        <Route component={Error404Page} />
                    </Switch>                 
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default Wrapper;
