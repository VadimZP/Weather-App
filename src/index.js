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
        this.input = null
    }

    autocomplete(input){
        let cityDivInDOM = $('.city-autocomplete');

        if (cityDivInDOM.hasClass('hidden')) cityDivInDOM.removeClass('hidden');

        axios
            .get(`https://api.teleport.org/api/cities/?search=${input.value}&limit=1`)
            .then(res => res.data._embedded['city:search-results'].map(city => {

                let placeName = city.matching_full_name.split(',')[0].replace(/City/g, '');
                cityDivInDOM.text(`${placeName}`);

                return placeName
            }))
            .then((placeName) => {
                placeName === 'undefined' && (placeName = ' ')
                
                cityDivInDOM.text(`${placeName}`)
            })
            .then(() => !input.value.length &&  $('.city-autocomplete').addClass('hidden') )

    } 

    render() {
        return (
            <form className="search-form">
                <div className="form-group">
                    <input type="text"
                        className="form-control" id="city_input"
                        placeholder="Enter city"
                        // ref={(input) => { this.input = input; }} 
                        onChange={(e) => {

                            this.setState({ city: e.target.value })
                            this.autocomplete(e.target)
                            }
                        }
                        onKeyDown={(e) => {
                            if(e.keyCode === 13 && $('.city-autocomplete').hasClass('active')) {
                                this.setState({city: $('.city-autocomplete').text()}) 
                                e.target.value = $('.city-autocomplete').text();
                                $('.city-autocomplete').removeClass('active')
                                $('.city-autocomplete').addClass('hidden')
                            }
                            if(e.keyCode === 38) {
                                this.input.focus()
                                $('.city-autocomplete').removeClass('active')
                            }
                           if(e.keyCode === 40)  {$('.city-autocomplete').addClass('active')} else{
                                $('.city-autocomplete').removeClass('active')
                                }
                            }
                        }
                    />
                    <input type='submit'
                     className="btn btn-primary" 
                     onClick={(e)=>{
                     
                        e.preventDefault()
                        
                        this.props.onClick(this.state.city)
                        }} 
                    value='Search'/>
                </div>
                <div className='city-autocomplete hidden'></div>
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
