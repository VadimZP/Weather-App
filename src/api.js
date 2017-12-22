import React, { Fragment} from 'react';
import DaysListContainer from './DaysList';
import Graph from './Graph';

import axios from 'axios';

const $ = window.$;

const R = require('ramda');
const Future = require('fluture');

let [compose, filter, concat, merge, length, prop, propEq, drop, head] = 
    
    [R.compose, R.filter, R.concat, R.merge, R.length, R.prop, R.propEq, R.drop, R.head];


// const SearchForm = () => {

        

// }

export default class FetchData extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            day: 0,
            city: this.props.city
        };

        this.handleClick = this.handleClick.bind(this);
        this.weatherAjaxRequest = this.weatherAjaxRequest.bind(this)
    }

    handleClick(childId) {
        this.setState({day: childId})
    }

    weatherAjaxRequest(city) {
        /** 
            We are getting unsized array.
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ...]
        */

        const getData = Future.encaseP(axios.get);
        
                const usizedList = getData(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=b0982525d17583189a85452554eb7afe`)
                    .map(res => res.data.list.map(obj => {
                       console.log(res);
                       return {...obj, 
                            data: obj.dt_txt.split(' ')[0],
                            time: obj.dt_txt.split(' ')[1]
                        }
            }))
        
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

    componentWillReceiveProps(nextProps) {
        if (this.state.city !== nextProps.city) {
                this.setState({city: nextProps.city})
                this.weatherAjaxRequest(nextProps.city)
                return true
            } else {
                return false
            } 
    } 
 
    componentDidMount() {
        this.weatherAjaxRequest(this.state.city)
    }

render() {
    return ( 
        <Fragment>
            <iframe className='map' width='100%' height='300' src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAxorTm_gngUP-0yAZS-SnLN1CPTu8M2Eo&q=${this.state.city}`}></iframe>
            <Graph day={this.state.day === 0 ? this.state.data[0] : this.state.day}/>
            <DaysListContainer days={this.state.data} onClick={this.handleClick}/>
        </Fragment>
        );
    }
}