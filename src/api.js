import React from 'react';
import axios from 'axios';

import DaysList from './DaysList';

export default class FetchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        setTimeout(() => {
            axios.get('http://api.openweathermap.org/data/2.5/forecast?id=687700&units=metric&APPID=589954fc426476988cc0be8d6ed03349')
                .then(res => {
                    const data = res.data.list;
                    const sortedData = [];

                    let j = 0;
                    let k = 0;

                    for (let i = 1; i < data.length; i++) {
                        if (!sortedData.length) sortedData.push({});

                        let prevVal = data[i - 1].dt_txt.split(' ');
                        let currentVal = data[i].dt_txt.split(' ');

                        if (currentVal[0] === prevVal[0]) {
                            sortedData[j][`hours${k++}`] = data[i - 1];
                        } else {
                            sortedData[j][`hours${k++}`] = data[i - 1];
                            sortedData.push({});
                            j++;
                            k = 0;
                            sortedData[j][`hours${k++}`] = data[i];
                        }
                    }
                    this.setState({ data: sortedData });

                    console.log(sortedData);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 3000)

    }


    render() {
        return (<DaysList days={this.state.data} />);
    }
}