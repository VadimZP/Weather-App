import React from 'react';

import axios from 'axios';

const { $ } = window;

export default class SearchForm extends React.Component {
    static autocomplete(input) {
        const cityDiv = $('.city-autocomplete');

        if (cityDiv.hasClass('hidden')) cityDiv.removeClass('hidden');

        axios
            .get(`https://api.teleport.org/api/cities/?search=${input.value}&limit=1`)
            .then(res => res.data._embedded['city:search-results'].map((city) => {
                // Remove "City" word from autocomplete cities, for example New York City
                let placeName = city.matching_full_name.split(',')[0].replace(/City/g, '');

                if (placeName === 'undefined') (placeName = ' ');

                cityDiv.text(`${placeName}`);

                if (!input.value.length) cityDiv.addClass('hidden');

                return placeName;
            }));
    }

    constructor(props) {
        super(props);

        this.state = {
            city: null,
        };
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
                        onChange={(e) => {
                            this.setState({ city: e.target.value });
                            SearchForm.autocomplete(e.target);
                        }}
                        onKeyDown={(e) => {
                            const cityDiv = $('.city-autocomplete');

                            if (e.keyCode === 13 && cityDiv.hasClass('active')) {
                                this.setState({ city: cityDiv.text() });
                                e.target.value = cityDiv.text();

                                cityDiv.removeClass('active');
                                cityDiv.addClass('hidden');
                            }

                            if (e.keyCode === 38) cityDiv.removeClass('active');
                            if (e.keyCode === 40) {
                                cityDiv.addClass('active');
                            } else {
                                cityDiv.removeClass('active');
                            }
                        }}
                    />
                    <input
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.onClick(this.state.city);
                        }}
                        value="Search"
                    />
                </div>
                <div className="city-autocomplete hidden" />
            </form>
        );
    }
}
