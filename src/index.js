import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import './index.css';

import App from './App'; 
import App2 from './App2'; 
import Navbar from './Navbar';
import FetchData from './api';

ReactDOM.render(
    <div>
        <HashRouter>
            <div>
                <Navbar/>
                <Route path='/app1' component={App} />
                <Route path='/app2' component={App2} />
            </div>
        </HashRouter>
        <FetchData/>
    </div>,
    document.getElementById('root')
);


