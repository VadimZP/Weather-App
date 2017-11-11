import React from 'react';
import PropTypes from 'prop-types';

const DayItem = props => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={`http://openweathermap.org/img/w/${props.weatherImg}.png`} style={{width: 50, height: 50}} alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{props.dayOfTheWeek}</p>
                        <p>{props.date}</p>
                        <p>{props.minTemp} {props.maxTemp}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

DayItem.propTypes = {
    date: PropTypes.string,
    dayOfTheWeek: PropTypes.string,
    minTemp: PropTypes.number,
    maxTemp: PropTypes.number
}

const DaysList = props => {
    const days = props.days;
    const maxMinTemprt = [];
    const date = [];
    const weekDays = [];
    const frequentWeather = [];

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
    }

    const daysList = props.days.map((item, i) => 
                        <DayItem 
                            key={i} 
                            weatherImg={frequentWeather[i]}
                            date={date[i]} 
                            dayOfTheWeek={weekDays[i]} 
                            minTemp={maxMinTemprt[i].min} 
                            maxTemp={maxMinTemprt[i].max} 
                        />);

    return <ul>{daysList}</ul>;
}

export default DaysList;