import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import {BrowserRouter, Switch} from 'react-router-dom'
import ContextProvider from "../context/Context"

import Wrapper from "./Wrapper"

let timer

const App = () => {

  return (
    <div id="App"> 
        <BrowserRouter>
            <ContextProvider>
                <Wrapper />
            </ContextProvider>
         </BrowserRouter>
    </div>
  );
}

export default App;
