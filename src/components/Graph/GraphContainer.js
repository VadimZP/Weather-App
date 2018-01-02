import React from 'react'
import PropTypes from 'prop-types'

import GraphView from './GraphView'


export default class GraphContainer extends React.Component {
   static propTypes = {
       displayLegend: true,
       day: PropTypes.arrayOf(PropTypes.object),
   }

   state = {
       chartData: {
           labels: null,
           datasets: [
               {
                   data: null,
                   fill: 'start',
                   backgroundColor: null,
               },
           ],
       },
       chartOptions: {
           scales: {
               yAxes: [{
                   gridLines: {
                       display: false,
                   },
                   ticks: {
                       beginAtZero: true,
                   },
               }],
               xAxes: [{
                   gridLines: {
                       display: false,
                   },
               }],
           },
           legend: {
               display: this.props.displayLegend,
           },
           tooltips: {
               intersect: false,
           },
       },
   }


   componentWillReceiveProps(nextProps) {
       if (this.props.day !== nextProps.day) {
           const { chartData } = this.state

           const time = nextProps.day.map(obj => obj.time)
           const temp = nextProps.day.map(obj => obj.main.temp)

           const { ctx } = this.el.chart_instance

           const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0)
           gradientStroke.addColorStop(0, '#80b6f4')
           gradientStroke.addColorStop(1, '#f49080')

           const gradientFill = ctx.createLinearGradient(500, 0, 100, 0)
           gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0.6)')
           gradientFill.addColorStop(1, 'rgba(244, 144, 128, 0.6)')

           const obj = {
               data: temp,
               fill: 'start',
               backgroundColor: gradientFill,
           }

           this.setState({ chartData: { ...chartData, labels: time, datasets: [obj] } })

           return true
       }

       return false
   }


   getElem = (el) => {
       this.el = el
   }

   render() {
       return (
           <GraphView
               chartOptions={this.state.chartOptions}
               chartData={this.state.chartData}
               getElem={this.getElem}
           />
       )
   }
}

