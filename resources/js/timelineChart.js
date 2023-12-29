import { mergedOptionsWithJsonConfig } from './helpers'

const timelineChart = () => {
    return {
        chart: null,

        init() {
            setTimeout(() => {
                this.drawChart(this.$wire)
            }, 0)
        },

        drawChart(component) {
            if (this.chart) {
                this.chart.destroy()
            }

            const title = component.get('timelineChartModel.title');
            const animated = component.get('timelineChartModel.animated') || false;
            const dataLabels = component.get('timelineChartModel.dataLabels') || {};
            const data = component.get('timelineChartModel.data');
            const onPointClickEventName = component.get('timelineChartModel.onPointClickEventName');
            const sparkline = component.get('timelineChartModel.sparkline');
            const jsonConfig = component.get('timelineChartModel.jsonConfig');

            const series = [{
                name: title,
                // data: data.map(item => item.value),
                data: data,
            }]

            const categories = component.get('timelineChartModel.xAxis.categories').length > 0
                ? component.get('timelineChartModel.xAxis.categories')
                : data.map(item => item.title)

            const options = {
                series: series,

                chart: {
                    type: 'rangeBar',
                    height: '100%',

                    ...sparkline,

                    zoom: {enabled: false},

                    toolbar: {show: false},

                    animations: {enabled: animated},

                    events: {
                        markerClick: function(event, chartContext, { dataPointIndex }) {
                            if (!onPointClickEventName) {
                                return
                            }

                            const point = data[dataPointIndex]
                            component.call('onPointClick', point)
                        }
                    }
                },

                dataLabels: dataLabels,

                stroke: component.get('timelineChartModel.stroke') || {},

                theme: component.get('timelineChartModel.theme') || {},

                title: {
                    text: title,
                    align: 'center'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        distributed: true,

                    }
                },

                xaxis: {
                    type: 'datetime'
                    // labels: component.get('timelineChartModel.xAxis.labels'),
                    // categories: categories,
                },

                yaxis: component.get('timelineChartModel.yAxis') || {},

                tooltip: {
                    enabled: true,
                    //enabledOnSeries: undefined,
                    //shared: true,
                    followCursor: false,
                    intersect: false,
                    inverseOrder: false,
                    custom: function ({series, seriesIndex, dataPointIndex, w}) {
                        let units = w.config.series[seriesIndex].data[dataPointIndex].extras.units ?? ''
                        let unitstr = w.config.series[seriesIndex].data[dataPointIndex].extras.unitstr ?? ''
                        let extype = w.config.series[seriesIndex].data[dataPointIndex].extras.type ?? ''
                        if (extype.length > 45) {
                            extype = extype.substring(0, 45) + '...'
                        }
                        let start = w.globals.seriesRangeStart[seriesIndex][dataPointIndex]
                        let end = w.globals.seriesRangeEnd[seriesIndex][dataPointIndex]
                        let startdate = new Date(start)
                        //correct js applying timezone when creating date object
                        startdate.setMinutes(startdate.getMinutes() + startdate.getTimezoneOffset())
                        return (
                            '<div class="arrow_box">' +
                            "<span>" +
                            startdate.toLocaleDateString(undefined, {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })
                            + ': ' +
                            (end - start) / 60 / 1000 + ' Minutes, ' + units + ' ' + unitstr +
                            "<br>" +
                            extype +
                            "</span>" +
                            '</div>'
                        );
                    },
                    fillSeriesColor: false,
                    //theme: 'light',
                    style: {
                        fontSize: '12px',
                        fontFamily: undefined
                    },
                    onDatasetHover: {
                        highlightDataSeries: false,
                    },
                    // x: {
                    //     show: true,
                    //     format: 'HH:mm',
                    //     formatter: function(val, obj){
                    //         let customStuff = 0;
                    //         if (obj) {
                    //             //console.log("val", val)
                    //             console.log("obj", obj)
                    //             customStuff = obj.dataPointIndex;
                    //         }
                    //
                    //         return customStuff;
                    //     },
                    // },
                    // y: {
                    //     formatter: undefined,
                    //     title: {
                    //         formatter: (seriesName) => seriesName,
                    //     },
                    // },
                    // z: {
                    //     formatter: undefined,
                    //     title: 'Size: '
                    // },
                    marker: {
                        show: true,
                    },
                    // items: {
                    //     display: flex,
                    // },
                    fixed: {
                        enabled: false,
                        position: 'topRight',
                        offsetX: 0,
                        offsetY: 0,
                    },
                },

                annotations: {
                    points: component.get('timelineChartModel.markers').map(item => {
                            return {
                                x: item.title,
                                y: item.value,
                                marker: {
                                    size: 6,
                                    fillColor: '#fff',
                                    strokeColor: item.strokeColor,
                                    radius: 2,
                                },
                                label: {
                                    offsetY: 0,
                                    style: {
                                        color: item.textColor,
                                        background: item.textBackgroundColor,
                                    },
                                    text: item.text || '',
                                }
                            }
                        }
                    )
                },
            };

            this.chart = new ApexCharts(this.$refs.container, mergedOptionsWithJsonConfig(options, jsonConfig));
            this.chart.render();
        }
    }
}


export default timelineChart
