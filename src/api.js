import React from 'react';
import axios from 'axios';

import DaysList from './DaysList';
import Graph from './Graph';

const R = require('ramda');
const Future = require('fluture');

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
                 R.merge(obj, {
                    data: obj.dt_txt.split(' ')[0],
                    time: obj.dt_txt.split(' ')[1]
                })
            )))

            
        const wrapper = () => {

            let sortedData = [];

            

            return function sortByDaysFunc(res) {

                const getDay = R.compose(R.propEq('data'), R.prop('data'), R.head);

                const getRelativeData = R.filter(getDay(res));

                sortedData.push(getRelativeData(res))

                // console.log(getRelativeData(res));

                const relativeDataLen = R.length(getRelativeData(res));

                const removeFromRes = R.compose(R.drop(relativeDataLen));

                const resWithoutCurrentDay = removeFromRes(res);

                console.log(sortedData)
            
                // sortByDaysFunc(resWithoutCurrentDay)
               
            }


        }

    /*     const sortByDaysFunc = (res) => {


        }  */ 

        usizedList.fork(console.error, wrapper());

        axios.get('http://api.openweathermap.org/data/2.5/forecast?id=687700&units=metric&APPID=589954fc426476988cc0be8d6ed03349')
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

                 /* 
                    In the end we have a sorted array with six day-objects.
                    They have have info about weather for every 3 hour (0:00, 3:00, 6:00 ...).

                    [{
                    hours0 (mean 0:00): {dt: 1512313200, main: {…}, weather: Array(1), clouds: {…}, wind: {…}, …}
                    hours1 (mean 3:00):{dt: 1512324000, main: {…}, weather: Array(1), clouds: {…}, wind: {…}, …}
                    hours2 (mean 6:00):{dt: 1512334800, main: {…}, weather: Array(1), clouds: {…}, wind: {…}, …}
                    ...
                    }, {}, {}, {}, {}, {}]
                */

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