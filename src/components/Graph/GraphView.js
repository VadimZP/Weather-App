import React from 'react'
import PropTypes from 'prop-types'

import { Line } from 'react-chartjs-2'

GraphView.propTypes = {
    chartData: PropTypes.object,
    chartOptions: PropTypes.object,
    getElem: PropTypes.func,
}

export default function GraphView({ chartData, chartOptions, getElem }) {
    if (chartData === undefined) return ''

    return (
        <div className="weather-graph">
            <Line
                data={chartData}
                options={chartOptions}
                ref={el => getElem(el)}
            />
        </div>
    )
}

