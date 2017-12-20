import React, {Fragment} from 'react';
import axios from 'axios';

import DaysListContainer from './DaysList';
import Graph from './Graph';

const $ = window.$;

const R = require('ramda');
const Future = require('fluture');

let [compose, filter, concat, merge, length, prop, propEq, drop, head] = 
    
    [R.compose, R.filter, R.concat, R.merge, R.length, R.prop, R.propEq, R.drop, R.head];


const SearchForm = () => {

 /*    const autocomplete = () => {
        let listGroup = $("<ul></ul>").addClass("list-group");
        let findListGroup = $('ul.list-group');

        if(!input.length ) {
            findListGroup.remove()
        } 

        axios
            .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input.value}&language=en&sensor=false&types=(cities)&key=AIzaSyBcfMe4GBiDBR3-Xe4g0_ikJtENnQhNE8Y`)
            .then(res => res.data.predictions.map(city => {
            
                let liElem = $(`<li class='list-group-item'>${city.description}</li>`)

                $.contains( $('.form-group')[0], $('ul.list-group')[0] ) ?  
                    listGroup.append(liElem) : listGroup.insertAfter(input).append(liElem) 
        })) 

} */

}

export default class FetchData extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            day: 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(childId) {
        this.setState({
            day: childId
        })
    }


    componentDidMount() {

        /** 
                   We are getting unsized array.
                   [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ...]
        */

        const getData = Future.encaseP(axios.get);

        const usizedList = getData(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&units=metric&APPID=589954fc426476988cc0be8d6ed03349`)
            .map(res => res.data.list.map(obj => (
                {...obj, 
                    data: obj.dt_txt.split(' ')[0],
                    time: obj.dt_txt.split(' ')[1]
                }
            )))


        /**
        * This function distributes not sorted weather API data by days.
        * @param {array} arr - array for grouping data.
        * @param {react method} setState - pass structured data to react component's state.
        * @param {array} res - data from API.
        */

        const sortByDaysFunc = (arr, setState, res) => {

            'use strict';

            const getDay = compose(propEq('data'), prop('data'), head);

            const getRelativeToDayData = filter(getDay(res));

            const groupedData = concat(arr, [getRelativeToDayData(res)]);

            const relativeDataLen = length(getRelativeToDayData(res));

            const removeFromRes = compose(drop(relativeDataLen));

            const resWithoutCurrentDay = removeFromRes(res);

            resWithoutCurrentDay.length
                ? sortByDaysFunc(groupedData, this.setState.bind(this), resWithoutCurrentDay)
                : setState({ data: groupedData });
        }

        usizedList.fork(
            console.error, 
            R.curry(sortByDaysFunc)([], this.setState.bind(this))
        );

          /** 
                    In the end we have a sorted array with six day-objects.
                    They have have info about weather for every 3 hour (0:00, 3:00, 6:00 ...).

                    [[{…}, {…}, {…}], [{…}, {…}, {…}], [{…}, {…}, {…}] ...]
          */
}

render() {
    return ( 
        <Fragment>
            <Graph day={this.state.day === 0 ? this.state.data[0] : this.state.day}/>
            <DaysListContainer days={this.state.data} onClick={this.handleClick}/>
        </Fragment>
        );
    }
}