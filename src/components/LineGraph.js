import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts'
import io from 'socket.io-client';
import { Spinner, Container, Row, Col } from 'react-bootstrap'

import TradeObject from './TradeObject'

import './styles/charts.css';

let socket = io.connect("https://trading-api.blixter.me");

class LineGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'realtime',
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    width: 2
                },

                title: {
                    text: 'Value per Gram in SEK',
                    align: 'left'
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime',
                    range: 45000,
                    labels: {
                        formatter: value => {
                            const categoryTime = new Date(value);
                            const hours = categoryTime.getHours();
                            const minutes = categoryTime.getMinutes();
                            const minutesString = minutes === 0
                                ? `${minutes}0`
                                : minutes < 10
                                    ? `0${minutes}`
                                    : minutes;
                            const seconds = categoryTime.getSeconds();
                            const secondsString = seconds === 0
                                ? `${seconds}0`
                                : seconds < 10
                                    ? `0${seconds}`
                                    : seconds;

                            return `${hours}:${minutesString}:${secondsString}`;
                        },
                        hideOverlappingLabels: false
                    },
                },
                yaxis: {
                    min: 100,
                    max: 500
                },
                legend: {
                    show: false
                }
            },
            series: [{
                name: "",
                data: []
            }]
        }
    }


    componentDidMount() {
        // this.intervals()
        socket.on('connect', () => {
            console.log("Connected");
        });

        socket.on('stocks', (socketData) => {
            ApexCharts.exec('realtime', 'updateSeries', [{
                name: socketData[0].name,
                data: socketData[0].data,
            }, {
                name: socketData[1].name,
                data: socketData[1].data,
            }])
            this.props.setGoldValue(socketData[0].data.slice(-1)[0].y);
            this.props.setSilverValue(socketData[1].data.slice(-1)[0].y);
        })
    }

    componentWillUnmount() {
        socket.on('disconnect', () => {
            console.log("Disconnected");
        });
        socket.off();
    }

    render() {
        if (!this.props.goldValue || !this.props.silverValue) {
            return (
                <React.Fragment>
                    <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="500" />
                    </div>
                    <Container>
                        <Row ClassName="justify-content-md-center">
                            <Col></Col>
                            <Col md="auto">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="500" />
                </div>
                <TradeObject 
                    silverValue={this.props.silverValue}
                    goldValue={this.props.goldValue}
                    setBalance={this.props.setBalance}
                    setDepot={this.props.setDepot}
                    setTradeAlert={this.props.setTradeAlert}
                />
            </React.Fragment>
        );
    }

}

export default LineGraph