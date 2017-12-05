import React from 'react';
import axios from 'axios';

import DaysList from './DaysList';
import Graph from './Graph';

const R = require('ramda');
const Future = require('fluture');

let [compose, filter, map, concat, merge, length, prop, propEq, drop, head] = 
    
    [R.compose, R.filter, R.map, R.concat, R.merge, R.length, R.prop, R.propEq, R.drop, R.head];

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

        /* 
                   We are getting unsized array.

                   [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ...]
        */

        const getData = Future.encaseP(axios.get);

        const usizedList = getData('http://api.openweathermap.org/data/2.5/forecast?id=687700&units=metric&APPID=589954fc426476988cc0be8d6ed03349')
            .map(res => res.data.list.map(obj => (
                 merge(obj, {
                    data: obj.dt_txt.split(' ')[0],
                    time: obj.dt_txt.split(' ')[1]
                })
            )))

        const sortByDaysFunc = (arr, setState, res) => {

            'use strict';

            const getDay = compose(propEq('data'), prop('data'), head);

            const getRelativeData = filter(getDay(res));

            const sortedData = concat(arr, [getRelativeData(res)]);

            const relativeDataLen = length(getRelativeData(res));

            const removeFromRes = compose(drop(relativeDataLen));

            const resWithoutCurrentDay = removeFromRes(res);

            resWithoutCurrentDay.length
                ? sortByDaysFunc(sortedData, this.setState.bind(this), resWithoutCurrentDay)
                : setState({ data: sortedData });
        }

        usizedList.fork(
            console.error, 
            R.curry(sortByDaysFunc)([], this.setState.bind(this))
        );


          /* 
                    In the end we have a sorted array with six day-objects.
                    They have have info about weather for every 3 hour (0:00, 3:00, 6:00 ...).

                    [[{…}, {…}, {…}], [{…}, {…}, {…}], [{…}, {…}, {…}] ...]
          */

       /*  axios.get('http://api.openweathermap.org/data/2.5/forecast?id=687700&units=metric&APPID=589954fc426476988cc0be8d6ed03349')
            .then(res => {

                const data = res.data.list;
                const sortedData = [{}];

                // console.log(R.filter(sameDay, data));

                let j = 0;
                let k = 0;

                for (let i = 1, len = data.length; i < len; i++) {
                   
                    let prevVal = data[i - 1].dt_txt.split(' ');
                    let currentVal = data[i].dt_txt.split(' ');

                    // console.log(currentVal);

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
            }); */
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