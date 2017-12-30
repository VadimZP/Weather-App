import React from 'react'
import PropTypes from 'prop-types'

import DayItemView from './components/DayItem/DayItemView'

DaysListView.propTypes = {
    sorted: PropTypes.object,
    days: PropTypes.arrayOf(PropTypes.array),
    DayItemClick: PropTypes.func,
}

export default function DaysListView({ DayItemClick, days, sorted }) {
    /** This check we use for a jest testing cause async props are undefined */

    const DayItemsArr = days ? days.map((item, i) =>

        (<DayItemView
            getWeather={DayItemClick}
            days={days[i]}
            id={i}
            key={sorted.ids[i]}
            weatherImg={sorted.getCommonWeather[i]}
            date={sorted.date[i]}
            dayOfTheWeek={sorted.weekDays[i]}
            minTemp={sorted.minTemprt[i]}
            maxTemp={sorted.maxTemprt[i]}
        />)) : ''

    return (
        <ul>{DayItemsArr}</ul>
    )
}
