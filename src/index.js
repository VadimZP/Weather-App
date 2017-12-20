import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import FetchData from './api';


const SearchForm = (props) => {

    let input = null;

    const getCity = () => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=metric&APPID=589954fc426476988cc0be8d6ed03349`)
            .then(res => console.log(res))
    }

    return (
        <form className="search-form">
            <div className="form-group">
                <input type="text"
                    className="form-control" id="city_input"
                    placeholder="Enter city"
                    ref={city => input = city}
                />
                <button type='button' className="btn btn-primary" onClick={props.onClick.bind(null, 'london')}>Search</button>
            </div>
        </form>
    )

}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.getCityFromSearchInput = this.getCityFromSearchInput.bind(this);
    }

    getCityFromSearchInput(city) {
        this.setState({ city });
    }

    render() {
        const isValidCity = this.state.city !== undefined;
        return (
            isValidCity ? 
                <Fragment>
                    <SearchForm onClick={this.getCityFromSearchInput}/>
                    <FetchData city={this.state.city}/>
                </Fragment> 
                :
                <SearchForm onClick={this.getCityFromSearchInput}/>
        )

       /*  return (
            <Fragment>
                <SearchForm onClick={this.getCityFromSearchInput}/>
                <FetchData city={this.state.city}/>
            </Fragment>
        ) */
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
