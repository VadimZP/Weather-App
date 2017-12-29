import React from 'react'
import PropTypes from 'prop-types'

import { GlyphDot } from '@vx/glyph'
import { scaleTime, scaleLinear } from '@vx/scale'
import { extent, max, min } from 'd3-array'

import GraphView from './GraphView'

GraphContainer.propTypes = {
    day: PropTypes.arrayOf(PropTypes.object),
}

export default function GraphContainer(props) {
    /** Don't render if data wasn't fetched */

    if (props.day === undefined) return null

    /**
     * Extract temperature and time properties from day array objects,
     * then put these data in object.
     * @param {array} day - array of day's weather for each 3 hour.
     * */

    const getHoursAndTemperature = (day) => {
        const createObj = (obj) => {
            const hours = +obj.time.slice(0, 2)

            return { time: hours, temp: obj.main.temp }
        }

        return day.map(createObj)
    }

    const data = getHoursAndTemperature(props.day)

    /** Graph config  */

    const x = d => d.time
    const y = d => d.temp

    const width = 1200
    const height = 400
    const margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 80,
    }

    const xMax = width - 30
    const yMax = height - margin.top - margin.bottom

    const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, x),
    })

    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [min(data, y), max(data, y)],
        nice: true,
    })

    const glyphDot = (d, i) => (
        <g key={`line-point-${i}`}>
            <GlyphDot>
                <text
                    x={xScale(x(d))}
                    y={yScale(y(d))}
                    dx={10}
                    fill="white"
                    stroke="black"
                    strokeWidth={1}
                    fontSize={11}
                    style={{ display: 'block', backgroundColor: 'red' }}
                >
                    {`${data[i].temp} °C`}
                </text>
            </GlyphDot>
            <GlyphDot
                cx={xScale(x(d))}
                cy={yScale(y(d))}
                r={4}
                fill="red"
            />
        </g>)

    return (
        <GraphView
            data={data}
            width={width}
            height={height}
            margin={margin}
            x={x}
            y={y}
            yScale={yScale}
            xScale={xScale}
            glyphDot={glyphDot}
        />
    )
}
