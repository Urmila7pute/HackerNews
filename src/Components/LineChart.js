import React, { Component } from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsId: null,
            chartData: {}
        }
    }
    componentDidMount() {
        const { chartData } = this.props;
        this.drawChart(chartData);
    }

     componentDidUpdate  (prevProps)  {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
        this.drawChart(this.props);
        }
    }

    drawChart() {
        const { chartData } = this.props;
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.value,
                    borderColor: [
                        'rgba(44, 130, 201, 1)'
                    ],
                    lineTension: 0, // for Line
                    radius: 4,// point radius
                    pointBackgroundColor: 'rgba(44, 130, 201, 1)',//point color
                    fill: false // in should not fill the color/data
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Votes',
                            fontColor: 'black',
                            fontSize: 16,
                            fontStyle: "bold",
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'ID',
                            fontColor: 'black',
                            fontSize: 16,
                            fontStyle: "bold"

                        }
                    }]
                }
            }
        })
    }

    render() {
        const { chartData } = this.props;
        const classes = makeStyles({
            canvas: {
                width: 900,
                height: 100,
            }

        });
        return (
            <div >
                <canvas id="myChart" className={classes.canvas} ></canvas>
            </div>
        );
    }
}

export default LineChart;
