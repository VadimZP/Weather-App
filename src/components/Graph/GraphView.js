import React from 'react'
import PropTypes from 'prop-types'

import { Group } from '@vx/group'
import { LinePath } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { LinearGradient } from '@vx/gradient'

GraphView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.object,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    x: PropTypes.func,
    y: PropTypes.func,
    glyphDot: PropTypes.func,
}

export default function GraphView(props) {
    return (
        <svg style={{ borderBottom: '1px solid #000' }} width={props.width} height={props.height}>
            <LinearGradient id="gradient" to="#EFEEFC" from="#CBC8EF" />
            <rect
                x={0}
                y={0}
                width={props.width}
                height={props.height}
                stroke="#f1f1f1"
                fill="url(#gradient)"
            />
            <Group top={props.margin.top}>

                <LinePath
                    data={props.data}
                    xScale={props.xScale}
                    yScale={props.yScale}
                    x={props.x}
                    y={props.y}
                    stroke="#7e20dc"
                    strokeWidth={2}
                    curve={curveMonotoneX}
                    glyph={(d, i) => (props.glyphDot(d, i))}
                />
            </Group>
        </svg>
    )
}
