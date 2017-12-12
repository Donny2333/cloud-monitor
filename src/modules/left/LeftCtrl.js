import { URL_CFG } from '@/api'
import _ from 'lodash'

export default class LeftCtrl {
  constructor(EChartsFactory, $interval) {
    console.log('LeftCtrl mounted.')
    let that = this

    that = that || {}
    that.charts = []

    const charts = [
      {
        type: 'gauge',
        id: 0,
        title: '系统健康度',
        dataSource: URL_CFG.api + 'systemstate/statistics',
        localSource: 'json/system_health.json',
        style: {
          height: '100%',
          width: '100%'
        }
      },
      {
        type: 'pie',
        id: 1,
        title: '主机状态',
        dataSource: URL_CFG.api + 'hoststate/statistics',
        localSource: 'json/host_state.json',
        style: {
          height: '100%',
          width: '100%'
        }
      },
      {
        type: 'pie',
        id: 3,
        title: '虚拟机状态',
        dataSource: URL_CFG.api + 'vm/statistics',
        localSource: 'json/vm_state.json',
        style: {
          height: '100%',
          width: '100%'
        }
      }
    ]

    function reload() {
      charts.map(function(chart) {
        var newChart = EChartsFactory(chart.type)

        _.merge(newChart, chart)
        newChart.update(chart)
        that.charts.push(newChart)
      })
    }

    reload()

    // $interval(function() {
    //   reload()
    // }, 30000)
  }
}
