import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import FetchData from './api';
import SearchForm from './SearchForm';

const $ = window.$;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {city: null};

        this.getCityFromSearchInput = this.getCityFromSearchInput.bind(this);
    }

    getCityFromSearchInput(city) {

        function edit(val) {
            let str = 
            $.trim(val)
                .toLowerCase()
                .replace(/[0-9]/g, '')
                .replace(/^[a-z\d,]*\-?[a-z\d,]*$ /g, '')
                .replace(/\s+/g, ' ');

            console.log(str);
            return (
                str === null || str === ''
                    ? 'not valid' : str
            )

        }

        const editedValue = edit(city);

        if (editedValue === 'not valid') return;
        
        this.setState({ city: editedValue })  
    }

    render() {
        const isValidCity = this.state.city !== null;

        return (
            isValidCity ? 
                <Fragment>
                    <SearchForm onClick={this.getCityFromSearchInput}/>
                    <FetchData city={this.state.city}/>
                </Fragment> 
                :
                <SearchForm onClick={this.getCityFromSearchInput}/>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
