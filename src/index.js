import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import Navbar from './Navbar';
import FetchData from './api';
import Graph from './Graph';

ReactDOM.render(
    <div>
        <FetchData/>
    </div>,
    document.getElementById('root')
);


