import React from 'react';
import DayItem from './DayItem';

const R = require('ramda');

let [compose, map, curry, prop, head, take, path] = 

    [R.compose, R.map, R.curry, R.prop, R.head, R.take, R.path];


/** This function retrieves data for showing weather */

function sortData() {

    const days = this.props.days;

    console.log(days);

    /** Get YYYY-MM-DD from every day */

    const date = map(compose(prop('data'), head))(days);


    /** To retrieve weekday name we need to covert Date obj to string */

    const convertToString = (el) => {

        let d = new Date(...el.split(','));

        d.setDate(d.getDate());

        return d.toDateString();
    }

    const weekDays = map(compose(take(3), convertToString), date);


    /** Get day temperature and then compute max and min value */
    
    const temprtOfEveryHour = map(path(['main', 'temp']));

    const temperaturesOfEachDay = map(temprtOfEveryHour, days);
    
    const maxOrMin = (minOrMax, arr) => Math[minOrMax](...arr);

    const curriedMaxOrMin = curry(maxOrMin);
     
    const minTemprt = map(curriedMaxOrMin('min'), temperaturesOfEachDay);

    const maxTemprt = map(curriedMaxOrMin('max'), temperaturesOfEachDay);
    

    /** Get image of common weather during the day */

    const weatherImgs = map(
        compose(
           map(prop('icon')), map(head), map(prop('weather') ) 
        ), days
    ); 

    function commonVal(arr) {
        const sorted = arr.sort();

        let obj = {};

        let tempArray = [];

        sorted.forEach((val, i, arr) => {
            if (arr[i] !== arr[i + 1]) {
                tempArray.push(arr[i]);
                obj[tempArray.length] = tempArray;
                tempArray = [];
            } else {
                tempArray.push(arr[i]);
            }
        });

        const numsArr = Object.keys(obj).map(el => +el);

        const getCommon = obj[Math.max(...numsArr)][0];

        return getCommon;
    }

    const getCommonWeather = map(arr => commonVal(arr), weatherImgs);
 
    const daysList = this.props.days.map((item, i) =>

        <DayItem
            onClick={this.handleClick}
            days={days[i]}
            key={i}
            id={i}
            weatherImg={getCommonWeather[i]}
            date={date[i]}
            dayOfTheWeek={weekDays[i]}
            minTemp={minTemprt[i]}
            maxTemp={maxTemprt[i]}
        />);

    return daysList;
}

class DaysList extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.props.onClick;
    }

    render() {
        return <ul>{sortData.call(this)}</ul>;
    }
}

export default DaysList;