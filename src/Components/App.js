import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import {BrowserRouter, Switch} from 'react-router-dom'

import PostProperty from './PostProperty/PostProperty';
import Layout from './UI/Layout';
import ListProperty from "./ListProperty/ListProperty";
import DisplayPage from "./SearchProperty/DisplayPage"
import PropertyDisplay from './ListProperty/Property/PropertyDisplay/PropertyDisplay';
import Profile from "./Profile/Profile"
import AppContextProvider from "./AppContext"
import ViewContextProvider from "./ViewContext"

import Wrapper from "./Wrapper"

let timer

const App = () => {

  return (
    <div id="App"> 
        <BrowserRouter>

                <ViewContextProvider>
                    <Wrapper />
                </ViewContextProvider>

         </BrowserRouter>
    </div>
  );
}

export default App;
