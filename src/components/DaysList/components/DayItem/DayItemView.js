import React from 'react'
import PropTypes from 'prop-types'

DayItemView.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object),
    date: PropTypes.string,
    dayOfTheWeek: PropTypes.string,
    minTemp: PropTypes.number,
    maxTemp: PropTypes.number,
    weatherImg: PropTypes.string,
    id: PropTypes.number,
    getWeather: PropTypes.func,
}

export default function DayItemView(props) {
    return (
        <div
            className="day"
            id={props.id}
            role="button"
            tabIndex="0"
            onClick={() => props.getWeather(props.days)}
            onKeyDown={() => props.getWeather(props.days)}
            onFocus={() => props.getWeather(props.days)}
        >
            <p className="weekday"><b>{props.dayOfTheWeek}</b></p>
            <img
                src={`http://openweathermap.org/img/w/${props.weatherImg}.png`}
                style={{ width: 50, height: 50 }}
                alt="weather"
            />
            <p className="temperature">
                <b>Max: </b>{props.maxTemp}°C <br /><b>Min: </b>{props.minTemp}°C
            </p>
            <p className="date">{props.date}</p>
        </div>
    )
}
