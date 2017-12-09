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

	/** Don't render if data wasn't fetch */

	if (props.day === undefined) return null;


	/**
	  * Extract temperature and time properties from day array objects,
	  * then put these data in object.
      * @param {array} day - array of day's weather for each 3 hour.
      * */

	const getHoursAndTemperature = (day) => {

		const createObj = (obj) => {
			let hours = +obj.time.slice(0, 2);

			return { date: hours, temp: obj.main.temp }
		}

		return day.map(createObj)
	}

	const data = getHoursAndTemperature(props.day);



	/** Graph config  */

	const x = d => d.date;
	const y = d => d.temp;

	const width = 1200;
	const height = 400;
	const margin = {
		top: 60,
		bottom: 60,
		left: 80,
		right: 80,
	};

	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;

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
		<svg style={{ borderBottom: '1px solid #000' }} width={width} height={height}>
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
					glyph={(d, i) => {
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
								   {data[i].temp}
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
