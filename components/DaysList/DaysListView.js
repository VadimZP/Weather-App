import React from 'react'
import PropTypes from 'prop-types'

import DayItemView from './components/DayItem/DayItemView'

DaysListView.propTypes = {
    sorted: PropTypes.object,
    days: PropTypes.arrayOf(PropTypes.array),
    handleClick: PropTypes.func,
}

export default function DaysListView(props) {
    /** This check we use for a jest testing cause async props are undefined */

    const DayItemsArr = props.days ? props.days.map((item, i) =>

        (<DayItemView
            onClick={props.handleClick}
            days={props.days[i]}
            id={i}
            key={props.sorted.id[i]}
            weatherImg={props.sorted.getCommonWeather[i]}
            date={props.sorted.date[i]}
            dayOfTheWeek={props.sorted.weekDays[i]}
            minTemp={props.sorted.minTemprt[i]}
            maxTemp={props.sorted.maxTemprt[i]}
        />)) : ''

    return (
        <ul>{DayItemsArr}</ul>
    )
}
