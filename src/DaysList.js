import React from 'react';
import PropTypes from 'prop-types';

function DayItem(props) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
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

export default function DaysList(props) {

    const days = props.days;
    const maxMinTemprt = [];
    const date = [];
    const weekDays = [];
    

    let j = 0;

    for (let i = 0; i < days.length; i++) {
        maxMinTemprt.push({});

        const tempArr = [];

        for (let key in days[i]) {
            tempArr.push(days[i][key].main.temp);
        }

        maxMinTemprt[j].min = Math.min(...tempArr);
        maxMinTemprt[j].max = Math.max(...tempArr);

        let getDate = days[i].hours0.dt_txt.split(' ')[0];
        let weekDay = new Date(...getDate.split(',')).getDay();

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

    const daysList = props.days.map((item, i) => 
                        <DayItem 
                            key={i} 
                            date={date[i]} 
                            dayOfTheWeek={weekDays[i]} 
                            minTemp={maxMinTemprt[i].min} 
                            maxTemp={maxMinTemprt[i].max} 
                        />);

    return <ul>{daysList}</ul>;
}

