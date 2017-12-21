import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import FetchData from './api';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {city: 'london'}
    }

    render() {
        return (
            <form className="search-form">
                <div className="form-group">
                    <input type="text"
                        className="form-control" id="city_input"
                        placeholder="Enter city"
                        onChange={(e) => {
                             this.setState({
                                 city: e.target.value
                             })
                            }
                         }
                        // ref={input => console.log(input)}
                    />
                    <button type='button' className="btn btn-primary" onClick={this.props.onClick.bind(null, this.state.city)}>Search</button>
                </div>
            </form>
        )
    }
}

// function SearchForm (props) {

    //     let city = null;
    //     let arg 
    //     // arg должен быть State

    //    /*  function changeF () {
    //         arg = (city !== null && city.value !== ' ') ? city.value : 'london'
    //     } */
    //    render() {
    //         return 
    //    }


// }

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {city: null};

        this.getCityFromSearchInput = this.getCityFromSearchInput.bind(this);
    }

    getCityFromSearchInput(city) {
        this.setState({ city });
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
