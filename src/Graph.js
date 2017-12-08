/* import React from 'react';
import { Group } from '@vx/group';
import { scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max } from 'd3-array'; */

import React from 'react';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveBasis, curveMonotoneX } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';
import { extent, max, min } from 'd3-array';

const Graph = props => {
    const day = props.day; 

    console.log(day);

    const kek = [];

    if (day !== undefined) {
        let j = 0;
    
            Object.keys(day).forEach(key => {
                let hours = day[key].dt_txt.split(' ')[1].slice(0, 2);

                kek.push({});
                kek[j].hour = +hours;
                kek[j].temprt = ~~day[key].main.temp;
                j++;
            });
    }

    /* const width = 750;
    const height = 400;
    const margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 80,
    };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => d.hour;
    const y = d => d.temprt;

    const xScale = scaleLinear({
        range: [0, xMax],
        domain: extent(data, x)
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [-10, max(data, y)],
    });

    return (
        <svg width={width} height={height}>

            <Group top={margin.top} left={margin.left}>

                <LinePath
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    x={x}
                    y={y}
                    stroke={"black"}
                    strokeWidth={2}
                />

                <AxisLeft
                    scale={yScale}
                    top={0}
                    left={0}
                    label={'Temperature'}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                />

                <AxisBottom
                    scale={xScale}
                    top={yMax}
                    label={'Hours'}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                    tickValues={data.map(obj => obj.hour)}
                    tickFormat={(value, index) => `${value}:00`}
                />

            </Group>
        </svg>
    ); */

    const data = genDateValue(15);
    console.log(data);
    // accessors
    const x = d => d.date;
    const y = d => d.value;
    
    const width = 1200;
    const height = 400;
    const margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 80,
    };
      // bounds
      const xMax = width - margin.left - margin.right;
      const yMax = height - margin.top - margin.bottom;
    
      // scales
      const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, x),
      });
      const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
        nice: true,
      });
    
      return (
        <svg style={{borderBottom: '1px solid #000'}} width={width} height={height}>
        <LinearGradient id="gradient" to="#EFEEFC" from="#CBC8EF" />
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            stroke='#f1f1f1'
            fill={`url(#gradient)`}
          />
          <Group top={margin.top}>
          
            <LinePath
              data={data}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              stroke='#7e20dc'
              strokeWidth={2}
              curve={curveMonotoneX}
              glyph={(d,i) => {
                return (
                  <g key={`line-point-${i}`}>
                    <GlyphDot>
                      <text
                        x={xScale(x(d))}
                        y={yScale(y(d))}
                        dx={10}
                        fill={"white"}
                        stroke={"black"}
                        strokeWidth={1}
                        fontSize={11}
                      >
                        {data[i].value + 
                            '  |  8:00'}
                      </text>
                    </GlyphDot>
                   
                    <GlyphDot
                      cx={xScale(x(d))}
                      cy={yScale(y(d))}
                      r={4}
                      fill='red'
                    />
                  </g>
                );
              }}
            />
          </Group>
        </svg>
      );
    }

export default Graph;
