export default class EChartsFactory {
  constructor(Http) {
    let eChart = {}
    eChart.type = {}

    // 柱状图
    eChart.type.bar = function() {
      let that = this

      that.update = function(where) {
        Http.get(that.dataSource).then(
          function(res) {
            var xAxisData = []
            var series = []
            var legendData = []
            var option
            var temp = {}

            res.data.y.map(function(_y) {
              temp[_y] = []

              res.data.data.map(function(item) {
                temp[_y].push(item[_y])
              })

              series.push({
                name: _y,
                type: 'bar',
                stack: '总量',
                data: temp[_y]
              })

              legendData.push(_y)
            })

            res.data.data.map(function(item) {
              xAxisData.push(item[res.data.x])
            })

            option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: legendData,
                textStyle: {
                  color: '#929292'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '0',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: xAxisData,
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#929292'
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#929292'
                    }
                  }
                }
              ],
              series: series
            }

            that.data = option
            return (where.data = option)
          },
          function(err) {
            console.log(err)
          }
        )
      }
    }

    // 折线图
    eChart.type.line = function() {
      let that = this

      that.update = function(where) {
        Http.get(that.dataSource).then(
          function(res) {
            var xAxisData = []
            var series = []
            var seriesData = []
            var option

            res.data.data.map(function(item) {
              xAxisData.push(item[res.data.x])
              seriesData.push(item[res.data.y])
            })

            series.push({
              name: '',
              type: 'line',
              data: seriesData
            })

            option = {
              tooltip: {
                trigger: 'axis',
                position: function(pt) {
                  return [pt[0], '10%']
                }
              },
              toolbox: {
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              legend: {
                data: ''
              },
              xAxis: {
                data: xAxisData
              },
              yAxis: {},
              series: series,
              color: ['#3398DB']
            }

            that.data = option
            return where.push(that)
          },
          function(err) {
            console.log(err)
          }
        )
      }
    }

    // 仪表盘
    eChart.type.gauge = function() {
      let that = this

      that.update = function(where) {
        let option = {
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            },
            show: false
          },
          textStyle: {
            fontSize: '100px'
          },
          series: [
            {
              type: 'gauge',
              name: that.title || '',
              detail: {
                formatter: '{value}',
                textStyle: {
                  fontSize: 25,
                  fontWeight: 'bolder'
                }
              },
              data: [],
              title: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  width: 20,
                  color: [[0.2, '#ff9510'], [0.8, '#2483cf'], [1, '#57c550']]
                }
              },
              splitLine: {
                length: 20
              },
              axisLabel: {
                textStyle: {
                  fontSize: 10
                }
              }
            }
          ]
        }

        Http.get(that.dataSource).then(
          res => {
            option.series[0].data = [
              {
                name: '系统健康度',
                value: res.data.systemstate
              }
            ]

            that.data = option
            return (where.data = option)
          },
          _ => {
            Http.get(that.localSource).then(function(res) {
              option.series[0].data = res.data.data

              that.data = option
              return (where.data = option)
            })
          }
        )
      }
    }

    // 饼图
    eChart.type.pie = function() {
      let that = this
      let option = {
        color: ['#57c550', '#ff9510', '#f45938'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: that.title,
            type: 'pie',
            radius: [40, 55],
            center: ['50%', '50%'],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      }

      that.update = function(where) {
        Http.get(that.dataSource).then(
          res => {
            option.series[0].data = [
              {
                name: '运行',
                value: res.data.normal
              },
              {
                name: '故障',
                value: res.data.abnormal
              },
              {
                name: '停止',
                value: res.data.poweroff
              }
            ]

            that.data = option
            that.total = res.data.normal + res.data.abnormal + res.data.poweroff
            that.normal = res.data.normal
            that.abnormal = res.data.abnormal
            that.poweroff = res.data.poweroff
            return (where.data = option)
          },
          _ => {
            Http.get(that.localSource).then(function(res) {
              res.data = res.data.data[0]

              option.series[0].data = [
                {
                  name: '运行',
                  value: res.data.normal
                },
                {
                  name: '故障',
                  value: res.data.abnormal
                },
                {
                  name: '停止',
                  value: res.data.poweroff
                }
              ]

              that.data = option
              that.total =
                res.data.normal + res.data.abnormal + res.data.poweroff
              that.normal = res.data.normal
              that.abnormal = res.data.abnormal
              that.poweroff = res.data.poweroff
              return (where.data = option)
            })
          }
        )
      }
    }

    // 地图
    eChart.type.map = function() {
      let that = this

      that.update = function(where) {
        Http.get(that.dataSource).then(
          res => {
            var series = []
            var seriesData = []

            res.data.y.map(function(_y) {
              seriesData = []

              res.data.data.map(function(item) {
                seriesData.push({
                  name: item.country,
                  value: item[_y]
                })
              })

              series.push({
                name: _y,
                type: 'map',
                mapType: 'LHK', // 自定义扩展图表类型
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
                data: seriesData
              })
            })

            var option = {
              legend: {
                orient: 'vertical',
                left: 'right',
                data: res.data.y,
                textStyle: {
                  color: '#929292'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{a}:{c}<br/>'
              },
              toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                  dataView: { readOnly: false },
                  restore: {},
                  saveAsImage: {}
                }
              },
              visualMap: {
                min: 50,
                max: 50000,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                  color: ['lightskyblue', 'yellow', 'orangered']
                }
              },
              series: series
            }

            that.data = option
            return (where.data = option)
          },
          _ => {
            // console.log(err);
          }
        )
      }
    }

    return type => {
      type = type.toLowerCase()
      return new eChart.type[type]()
    }
  }
}
