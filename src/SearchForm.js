import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

const $ = window.$;

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { city: null }
        this.autocomplete = this.autocomplete.bind(this)
    }

    autocomplete(input) {
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
            .then(() => !input.value.length && cityDivInDOM.addClass('hidden'))

    }

    render() {
        return (
            <form className="search-form">
                <div className="form-group">
                    <input type="text"
                        className="form-control" id="city_input"
                        placeholder="Enter city"
                        autoComplete="off"
                        onChange={(e) => {
                            this.setState({ city: e.target.value })
                            this.autocomplete(e.target)
                            }
                        }
                        onKeyDown={(e) => {
                            if (e.keyCode === 13 && $('.city-autocomplete').hasClass('active')) {
                                this.setState({ city: $('.city-autocomplete').text() })
                                e.target.value = $('.city-autocomplete').text();
                                $('.city-autocomplete').removeClass('active')
                                $('.city-autocomplete').addClass('hidden')
                            }
                            if (e.keyCode === 38) {
                                $('.city-autocomplete').removeClass('active')
                            }
                            if (e.keyCode === 40) { $('.city-autocomplete').addClass('active') } else {
                                $('.city-autocomplete').removeClass('active')
                            }
                        }
                        }
                    />
                    <input type='submit'
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.preventDefault()
                            this.props.onClick(this.state.city)
                        }}
                        value='Search' />
                </div>
                <div className='city-autocomplete hidden'></div>
            </form>
        )
    }
}
