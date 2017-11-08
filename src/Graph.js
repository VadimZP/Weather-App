import React from 'react';
import { appleStock } from '@vx/mock-data';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max } from 'd3-array';

export default function Graph(props) {
    const data = [{hour:15, time: 1}, {hour:20, time: 1}, {hour:10, time: 1}];
    const width = 750;
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
    const y = d => d.time;


    const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, x)
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
      });
    
    
    return (
      <svg width={width} height={height}>
      <LinearGradient
        from='#fbc2eb'
        to='#a6c1ee'
        id='gradient'
      />

      <Group top={margin.top} left={margin.left}>

        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          fill={"url(#gradient)"}
          stroke={""}
        />

        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label={'Close Price ($)'}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />

        <AxisBottom
          scale={xScale}
          top={yMax}
          label={'Years'}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />

      </Group>
    </svg>
    );
}