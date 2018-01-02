import Future from 'fluture'
import axios from 'axios'
import { curry, compose, filter, concat, length, prop, propEq, drop, head, take } from 'ramda'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import DaysListContainer from '../DaysList/DaysListContainer'
import GraphContainer from '../Graph/GraphContainer'
import Spinner from '../Spinner/Spinner'

export default class ApiDataContainer extends React.PureComponent {
    static propTypes = {
        city: PropTypes.string,
    }

    state = {
        isLoading: true,
        data: [],
        day: 0,
        city: this.props.city,
        mapSrc: `https://www.google.com/maps/embed/v1/place?key=AIzaSyAxorTm_gngUP-0yAZS-SnLN1CPTu8M2Eo&q=${this.props.city}`,
        errorMsg: false,
    }

    componentDidMount() {
        this.weatherAjaxRequest(this.state.city)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.city !== nextProps.city) {
            this.setState({ city: nextProps.city, day: 0 })

            this.weatherAjaxRequest(nextProps.city)

            return true
        }

        return false
    }

    /**
    * Method that we send to the 'DayItemView' component
    * for getting day weather array when component is clicked.
    * @param {array} arr - array of values.
    * */

    DayItemClick = (childId) => {
        this.setState({ day: childId })
    }

    weatherAjaxRequest = (city) => {
    /**
     * We are getting unsized array.
     * [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ...]
     *
     */
        this.setState({ isLoading: true })

        const getData = Future.encaseP(axios.get)

        const unsizedList = getData(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=b0982525d17583189a85452554eb7afe`)
            .map(res => res.data.list.map(obj => (
                {
                    ...obj,
                    data: obj.dt_txt.split(' ')[0],
                    time: take(5, obj.dt_txt.split(' ')[1]),
                }
            ))).chain((lel) => {
                const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAxorTm_gngUP-0yAZS-SnLN1CPTu8M2Eo&q=${this.state.city}`
                this.setState({ errorMsg: false, mapSrc: src, isLoading: false })
                // this.setState({ isLoading: false })
                return Future.of(lel)
            })

        /**
         * This function distributes not sorted weather API data by days.
         * @param {array} arr - array for grouping data.
         * @param {react method} setState - pass structured data to react component's state.
         * @param {array} res - data from API.
         */

        const sortByDaysFunc = (arr, setState, res) => {
            const getDay = compose(propEq('data'), prop('data'), head)

            const getRelativeToDayData = filter(getDay(res))

            const groupedData = concat(arr, [getRelativeToDayData(res)])

            const relativeDataLen = length(getRelativeToDayData(res))

            const removeFromRes = compose(drop(relativeDataLen))

            const resWithoutCurrentDay = removeFromRes(res)

            if (resWithoutCurrentDay.length) {
                sortByDaysFunc(groupedData, this.setState.bind(this), resWithoutCurrentDay)
            } else setState({ data: groupedData })
        }

        unsizedList.fork(
            // reject
            () => this.setState({ errorMsg: true }),
            // resolve
            (() => curry(sortByDaysFunc)([], this.setState.bind(this)))(),
        )

    /**
     * In the end we have a sorted array with six day-objects.
     * They have have info about the weather
     * for every 3 hour (0:00, 3:00, 6:00 ...).
     *
     * [[{…}, {…}, {…}], [{…}, {…}, {…}], [{…}, {…}, {…}] ...]
     */
    }

    render() {
        if (this.state.errorMsg) {
            return (
                <h1 style={{ textAlign: 'center' }}>
                    There is no the city you are looking for in our database
                </h1>
            )
        }
        if (this.state.isLoading) {
            return <Spinner />
        }
        return (
            <Fragment>
                <section id="weather">
                    <div className="column__days-forecast">
                        <DaysListContainer
                            days={this.state.data}
                            DayItemClick={this.DayItemClick}
                        />
                    </div>
                    <div className="column__visual-info">
                        <GraphContainer
                            day={this.state.day === 0 ? this.state.data[0] : this.state.day}
                        />
                        <div className="map">
                            <iframe
                                className="map"
                                title="map"
                                tabIndex="-1"
                                src={this.state.mapSrc}
                            />
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

