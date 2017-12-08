import React from 'react';
import PropTypes from 'prop-types';

export default class DayItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: (this.props.id === 0 ? this.props.days : null)
        }
    }

    render() {
        return (
            <div className="card" id={this.props.id} onClick={this.props.onClick.bind(null, this.props.days)}>
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={`http://openweathermap.org/img/w/${this.props.weatherImg}.png`} style={{width: 50, height: 50}} alt="weather" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{this.props.dayOfTheWeek}</p>
                            <p>{this.props.date}</p>
                            <p>{this.props.minTemp} {this.props.maxTemp}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DayItem.propTypes = {
    days: PropTypes.array,
    date: PropTypes.string,
    dayOfTheWeek: PropTypes.string,
    minTemp: PropTypes.number,
    maxTemp: PropTypes.number
}