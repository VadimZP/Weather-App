import React from 'react';
import DayItem from './DayItem';

const R = require('ramda');

let [compose, map, prop, head] = [R.compose, R.map, R.prop, R.head];

function sortData() {

    const days = this.props.days;

    const date = map(compose(prop('data'), head))(days);

    const convertToString = (el) => {

        let d = new Date(...el.split(','));

        d.setDate(d.getDate());

        return d.toDateString();
    }

    const weekDays = map(compose(R.take(3), convertToString), date);

    const temprtOfEveryHour = map(R.path(['main', 'temp']));

    const temperaturesOfEachDay = map(temprtOfEveryHour, days);
    
    const maxOrMin = (minOrMax, arr) => Math[minOrMax](...arr);

    const curriedMaxOrMin = R.curry(maxOrMin);
     
    const minTemprt = map(curriedMaxOrMin('min'), temperaturesOfEachDay);

    const maxTemprt = map(curriedMaxOrMin('max'), temperaturesOfEachDay);
    
    const frequentWeather = map(
        compose(
           map(prop('icon')), map(head), map(R.prop('weather') ) 
        ), days
    ); 


    var arr = ["10n", "13n", "13d", 3, 3, 3, 3, 3, 3, 4, "01d", "01d", "03d", 1, "13n", "10n", "10n"];

    var sorted = arr.sort();

    var obj = {};
    
    var tempArray = [];

    sorted.forEach((val, i, arr) => {

        if (arr[i] != arr[i + 1]) {
            tempArray.push(arr[i]);
            obj[tempArray.length] = tempArray;
            tempArray = [];   
        } else {
            tempArray.push(arr[i]);
        }

    });

    const numsArr = Object.keys(obj).map(el => +el);

    const getCommon = obj[Math.max(...numsArr)];

    console.log(getCommon);



/*
    let j = 0;

    for (let i = 0; i < days.length; i++) {
        maxMinTemprt.push({});

        const tempArr = [];
        const tempArrWeather = [];
        const weather = {};

        Object.keys(days[i]).forEach(key => {
            tempArr.push(days[i][key].main.temp);
            tempArrWeather.push(days[i][key].weather[0].icon);
        });

        maxMinTemprt[j].min = Math.min(...tempArr);
        maxMinTemprt[j].max = Math.max(...tempArr);

        let getDate = days[i].hours0.dt_txt.split(' ')[0];
        let weekDay = new Date(...getDate.split(',')).getDay();

        getFrequentValue(tempArrWeather, weather);

        frequentWeather.push(weather[Math.max(...Object.keys(weather))][0]);
        date.push(getDate);
        weekDays.push(getWeekDayName(weekDay));

        j++;
    }

    function getWeekDayName(day) {
        if (day === 0) return 'Sunday';
        if (day === 1) return 'Monday';
        if (day === 2) return 'Tuesday';
        if (day === 3) return 'Wednesday';
        if (day === 4) return 'Thursday';
        if (day === 5) return 'Friday';
        if (day === 6) return 'Saturday';
    }

    function getFrequentValue(arg, obj) {
        let removed = [];

        const val = arg[0];

        while (arg.indexOf(val) !== -1) {
            removed.push(
                arg.splice(arg.indexOf(val), 1)[0]
            );
        }

        obj[removed.length] = removed;

        arg.length && getFrequentValue(arg, obj);
    } */
    
    const daysList = this.props.days.map((item, i) =>
        <DayItem
            onClick={this.handleClick}
            days={days[i]}
            key={i}
            id={i}
            weatherImg={frequentWeather[i]}
            date={date[i]}
            dayOfTheWeek={weekDays[i]}
            minTemp={minTemprt[i]}
            maxTemp={maxTemprt[i]}
        />);

    return daysList
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