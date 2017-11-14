import React from 'react';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max } from 'd3-array';

const Graph = props => {
    const day = props.firstDay; 
    const data = [];

    if (day !== undefined) {
        let j = 0;
    
            Object.keys(day).forEach(key => {
                let hours = day[key].dt_txt.split(' ')[1].slice(0, 2);
                let minutes = day[key].dt_txt.split(' ')[1].slice(3, 5);

                data.push({});
                data[j].hour = +hours;
                data[j].temprt = ~~day[key].main.temp;
                j++;
            });
    }



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
    const y = d => d.temprt;

    const xScale = scaleLinear({
        range: [0, xMax],
        domain: extent(data, x)
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
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
    );
}



export default Graph;

/* export default class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {
        console.log( Object.keys(this.props.firstDay));
     }

    render() {
        return (
            makeGrapgh.call(this)
        )
    }
} */

/* const Graph = props => {
   
}

// export default Graph;

const dataFromApi = this.props.firstDay;
const data = [];

console.log(dataFromApi);

// if(index === null) index = 0;



/*   let j = 0;



for (let i = 0; i < dataFromApi.length; i++) {

    Object.keys(dataFromApi[i]).forEach(key => {
        let hours = dataFromApi[i][key].dt_txt.split(' ')[1].slice(0, 2);
        let minutes = dataFromApi[i][key].dt_txt.split(' ')[1].slice(3, 5);

        data.push({});
        data[j].hour = +hours;
        data[j].temprt = ~~dataFromApi[i][key].main.temp;
        j++;
    });
}
*/

/* function makeGrapgh() {


    const dataFromApi = this.props.firstDay;
    const data = [];
    

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
    const y = d => d.temprt;

    const xScale = scaleLinear({
        range: [0, xMax],
        domain: extent(data, x)
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
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
    );

} */