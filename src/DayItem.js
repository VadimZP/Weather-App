import React from 'react';
import PropTypes from 'prop-types';

export default function DayItem(props) {
    return (
        <div
            className="card"
            id={props.id}
            role="button"
            tabIndex="0"
            onClick={() => props.onClick(props.days)}
            onKeyDown={() => props.onClick(props.days)}
            onFocus={() => props.onClick(props.days)}
        >
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={`http://openweathermap.org/img/w/${props.weatherImg}.png`} style={{ width: 50, height: 50 }} alt="weather" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{props.dayOfTheWeek}</p>
                        <p><b>Data</b>: {props.date}</p>
                        <p>
                            <b>Min</b>: {props.minTemp}°C
                            <b>Max</b>: {props.maxTemp}°C
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

DayItem.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object),
    date: PropTypes.string,
    dayOfTheWeek: PropTypes.string,
    minTemp: PropTypes.number,
    maxTemp: PropTypes.number,
    weatherImg: PropTypes.string,
    id: PropTypes.number,
    onClick: PropTypes.func,
};
