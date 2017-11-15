import React from 'react';
import axios from 'axios';

import DaysList from './DaysList';
import Graph from './Graph';

export default class FetchData extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            day: 0
        };

        this.handleClick= this.handleClick.bind(this);
    }

    handleClick(childId) {
        this.setState({
            day: childId
        })
    }

    componentDidMount() {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?id=687700&units=metric&APPID=589954fc426476988cc0be8d6ed03349')
            .then(res => {
                const data = res.data.list;
                const sortedData = [{}];

                let j = 0;
                let k = 0;

                for (let i = 1, len = data.length; i < len; i++) {
                    let prevVal = data[i - 1].dt_txt.split(' ');
                    let currentVal = data[i].dt_txt.split(' ');

                    if (currentVal[0] === prevVal[0]) {
                        sortedData[j][`hours${k++}`] = data[i - 1];
                    } else {
                        sortedData[j][`hours${k++}`] = data[i - 1];
                        sortedData.push({});
                        j++;
                        k = 0;
                    }
                }
                this.setState({
                    data: sortedData
                });
            })
            .catch(function (error) {
                console.log(error);
            });
}


render() {
    return ( 
        <div>
            <Graph day={this.state.day === 0 ? this.state.data[0] : this.state.day}/>
            <DaysList days={this.state.data} onClick={this.handleClick}/>
        </div>
        );
    }
}