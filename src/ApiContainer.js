import Future from 'fluture';
import axios from 'axios';
import { curry, compose, filter, concat, length, prop, propEq, drop, head } from 'ramda';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DaysListContainer from './DaysList';
import Graph from './Graph';

class ApiDataContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            day: 0,
            city: this.props.city,
            mapSrc: `https://www.google.com/maps/embed/v1/place?key=AIzaSyAxorTm_gngUP-0yAZS-SnLN1CPTu8M2Eo&q=${this.props.city}`,
            errorMsg: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.weatherAjaxRequest = this.weatherAjaxRequest.bind(this);
    }

    componentDidMount() {
        this.weatherAjaxRequest(this.state.city);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.city !== nextProps.city) {
            const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAxorTm_gngUP-0yAZS-SnLN1CPTu8M2Eo&q=${nextProps.city}`;

            this.setState({ city: nextProps.city, mapSrc: src });

            this.weatherAjaxRequest(nextProps.city);

            return true;
        }
        return false;
    }

    handleClick(childId) {
        this.setState({ day: childId });
    }

    weatherAjaxRequest(city) {
    /**
     * We are getting unsized array.
     * [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ...]
     *
     */

        const getData = Future.encaseP(axios.get);

        const usizedList = getData(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=b0982525d17583189a85452554eb7afe`)
            .map(res => res.data.list.map(obj => (
                {
                    ...obj,
                    data: obj.dt_txt.split(' ')[0],
                    time: obj.dt_txt.split(' ')[1],
                }
            )));

        /**
         * This function distributes not sorted weather API data by days.
         * @param {array} arr - array for grouping data.
         * @param {react method} setState - pass structured data to react component's state.
         * @param {array} res - data from API.
         */

        const sortByDaysFunc = (arr, setState, res) => {
            const getDay = compose(propEq('data'), prop('data'), head);

            const getRelativeToDayData = filter(getDay(res));

            const groupedData = concat(arr, [getRelativeToDayData(res)]);

            const relativeDataLen = length(getRelativeToDayData(res));

            const removeFromRes = compose(drop(relativeDataLen));

            const resWithoutCurrentDay = removeFromRes(res);

            if (resWithoutCurrentDay.length) {
                sortByDaysFunc(groupedData, this.setState.bind(this), resWithoutCurrentDay);
            } else setState({ data: groupedData });
        };

        usizedList.fork(
            // reject
            () => this.setState({ errorMsg: true }),
            // resolve
            (() => {
                this.setState({ errorMsg: false });
                return curry(sortByDaysFunc)([], this.setState.bind(this));
            })(),
        );

    /**
     * In the end we have a sorted array with six day-objects.
     * They have have info about weather
     * for every 3 hour (0:00, 3:00, 6:00 ...).
     *
     * [[{…}, {…}, {…}], [{…}, {…}, {…}], [{…}, {…}, {…}] ...]
     */
    }

    render() {
        if (this.state.errorMsg) {
            return (
                <h1 style={{ textAlign: 'center' }}>There is no the city you are looking for in our database</h1>
            );
        }
        return (
            <Fragment>
                <iframe
                    className="map"
                    title="map"
                    width="100%"
                    height="300"
                    tabIndex="-1"
                    src={this.state.mapSrc}
                />
                <Graph day={this.state.day === 0 ? this.state.data[0] : this.state.day} />
                <DaysListContainer
                    days={this.state.data}
                    onClick={this.handleClick}
                />
            </Fragment>
        );
    }
}

ApiDataContainer.propTypes = {
    city: PropTypes.string,
};

export default ApiDataContainer;
