import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import FetchData from './api';

const $ = window.$;

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {city: null}
        this.autocomplete = this.autocomplete.bind(this)
    }

    autocomplete(input){
        let cityDiv = $(`<div class='city-autocomplete'></div>`);
        let cityDivInDOM = $('.city-autocomplete');

        axios
            .get(`https://api.teleport.org/api/cities/?search=${input.value}&limit=1`)
            .then(res => res.data._embedded['city:search-results'].map(city => {

                let placeName = city.matching_full_name.split(',')[0].replace(/City/g, '');

                cityDiv.text(`${placeName}`);

                return placeName
            }))
            .then((placeName) => {
                $('.search-form').find(cityDivInDOM)[0] !== undefined 
                ? cityDivInDOM.text(`${placeName[0]}`)
                : cityDiv.insertAfter($('.form-group'))
            })
            .then(() => !input.value.length &&  $('.city-autocomplete').remove() )

    } 

    render() {
        return (
            <form className="search-form">
                <div className="form-group">
                    <input type="text"
                        className="form-control" id="city_input"
                        placeholder="Enter city"
                        onChange={(e) => {
                            this.setState({city: e.target.value})
                            this.autocomplete(e.target)
                        }
                    }
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
