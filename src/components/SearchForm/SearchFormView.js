import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'

const { $ } = window

export default class SearchFormView extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    static autocomplete(input) {
        const cityDiv = $('.city-autocomplete')

        if (cityDiv.hasClass('hidden')) cityDiv.removeClass('hidden')

        /**
         * Teleport API provides city autocomplete JSON object.
         * @param {number} &limit - get only one variant of the city to autcomplete.
         *
         * Example:
         *  {
         *    matching_alternate_names: (2) [{…}, {…}]
         *    matching_full_name: "Lviv, Lviv, Ukraine"
         *  }
         * */
        axios.get(`https://api.teleport.org/api/cities/?search=${input.value}&limit=1`)

            .then(res => res.data._embedded['city:search-results'].map((city) => {
                // Remove "City" word from autocomplete cities, for example New York City
                let placeName = city.matching_full_name.split(',')[0].replace(/City/g, '')

                if (placeName === 'undefined') (placeName = ' ')

                cityDiv.text(`${placeName}`)

                if (!input.value.length) cityDiv.addClass('hidden')

                return placeName
            }))
    }

    state = { city: null }


    onClick = (e) => {
        e.preventDefault()
        this.props.onClick(this.state.city)
    }

    changeCityValueState = (e) => {
        this.setState({ city: e.target.value })
        SearchFormView.autocomplete(e.target)
    }

    keyEvents = (e) => {
        const cityDiv = $('.city-autocomplete')

        // 'Enter' key
        if (e.keyCode === 13 && cityDiv.hasClass('active')) {
            this.setState({ city: cityDiv.text() })
            e.target.value = cityDiv.text()

            cityDiv.removeClass('active')
            cityDiv.addClass('hidden')
        }

        // 'Arrow up' key
        if (e.keyCode === 38) cityDiv.removeClass('active')

        // 'Arrow down' key
        if (e.keyCode === 40) {
            cityDiv.addClass('active')
        } else {
            cityDiv.removeClass('active')
        }
    }

    render() {
        return (
            <form className="search-form">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="city_input"
                        placeholder="Enter city"
                        autoComplete="off"
                        onChange={this.changeCityValueState}
                        onKeyDown={this.keyEvents}
                    />
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Search"
                        onClick={this.onClick}
                    />
                </div>
                <div className="city-autocomplete hidden" />
            </form>
        )
    }
}
