import { compose, map, curry, prop, head, take, path } from 'ramda';

import React from 'react';
import PropTypes from 'prop-types';

import DayItem from './DayItem';

/** This function retrieves data to show weather */

function DaysList(props) {
    return (
        <ul>{
            props.days.map((item, i) =>
                (<DayItem
                    onClick={props.handleClick}
                    days={props.days[i]}
                    id={i}
                    key={props.sort.id[i]}
                    weatherImg={props.sort.getCommonWeather[i]}
                    date={props.sort.date[i]}
                    dayOfTheWeek={props.sort.weekDays[i]}
                    minTemp={props.sort.minTemprt[i]}
                    maxTemp={props.sort.maxTemprt[i]}
                />))
        }
        </ul>
    );
}

DaysList.propTypes = {
    sort: PropTypes.object,
    days: PropTypes.arrayOf(PropTypes.array),
    handleClick: PropTypes.func,
};

class DaysListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.props.onClick;

        this.state = {};
    }

    sort() {
        const { days } = this.props;

        /** Get YYYY-MM-DD from every day */

        const date = map(compose(prop('data'), head))(days);

        /**
         * To retrieve weekday name we need to covert Date obj to string
         * @param {string} str - data string YY-MM-DDDD.
         * */

        const convertToString = (str) => {
            const d = new Date(...str.split(','));

            d.setDate(d.getDate());

            return d.toDateString();
        };

        const weekDays = map(compose(take(3), convertToString), date);


        /** Get day temperature and then compute max and min value */

        const temprtOfEveryHour = map(path(['main', 'temp']));

        const temperaturesOfEachDay = map(temprtOfEveryHour, days);

        const maxOrMin = (minOrMax, arr) => Math[minOrMax](...arr);

        const curriedMaxOrMin = curry(maxOrMin);

        const minTemprt = map(curriedMaxOrMin('min'), temperaturesOfEachDay);

        const maxTemprt = map(curriedMaxOrMin('max'), temperaturesOfEachDay);


        /** Get image of common weather during the day */

        const weatherImgs = map(compose(map(prop('icon')), map(head), map(prop('weather'))), days);


        /**
         * Function for getting the value with the most occurrences in a list.
         * @param {array} arr - array of values.
         * */

        function commonVal(arr) {
            const sorted = arr.sort();

            const obj = {};
            let tempArray = [];

            sorted.forEach((val, i, array) => {
                if (array[i] !== array[i + 1]) {
                    tempArray.push(array[i]);
                    obj[tempArray.length] = tempArray;
                    tempArray = [];
                } else {
                    tempArray.push(array[i]);
                }
            });
            const numsArr = Object.keys(obj).map(el => +el);
            const getCommon = obj[Math.max(...numsArr)][0];

            return getCommon;
        }

        const getCommonWeather = map(arr => commonVal(arr), weatherImgs);

        const id = [1, 2, 3, 4, 5, 6];

        return {
            date,
            minTemprt,
            maxTemprt,
            getCommonWeather,
            weekDays,
            id,
        };
    }

    render() {
        return (<DaysList
            handleClick={this.handleClick}
            days={this.props.days}
            sort={this.sort()}
        />);
    }
}

DaysListContainer.propTypes = {
    days: PropTypes.arrayOf(PropTypes.array),
    onClick: PropTypes.func,
};

export default DaysListContainer;
