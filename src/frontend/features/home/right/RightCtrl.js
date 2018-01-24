export default class RightCtrl {
  constructor($interval, Monitor, Http) {
    this.usage = {}

    this.init(Http)
    this.load(Monitor)
  }

  init(Http) {
    Http.load('json/top5_cpu_usage.json').then(res => {
      this.usage.cpu = {
        label: 'CPU利用率TOP5',
        data: res.data.result,
        unit: '%'
      }
    })

    Http.load('json/top5_memory_usage.json').then(res => {
      this.usage.memory = {
        label: '内存利用率TOP5',
        data: res.data.result,
        unit: '%'
      }
    })

    Http.load('json/top5_network_usage.json').then(res => {
      this.usage.network = {
        label: '网络流量TOP5',
        data: res.data.result.map(obj => {
          return Object.assign({}, obj, {
            number: (obj.value / res.data.result[0].value * 90)
          })
        }),
        number: true
      }
    })

    Http.load('json/top5_load_usage.json').then(res => {
      this.usage.load = {
        label: '系统负载TOP5',
        data: res.data.result.map(obj => {
          return Object.assign({}, obj, {
            number: (obj.value / res.data.result[0].value * 90).toFixed(2)
          })
        }),
        number: true
      }
    })
  }

  load(Monitor) {
    Monitor.topN({
      metric: 'hardware.cpu.util'
    }).then(
      res => {
        this.usage.cpu.data = res.data.result
      },
      err => {
        console.log(err)
      }
    )

    Monitor.topN({
      metric: 'hardware.memory.util'
    }).then(
      res => {
        this.usage.memory.data = res.data.result
      },
      err => {
        console.log(err)
      }
    )

    Monitor.topN({
      metric: 'hardware.network.io.bytes'
    }).then(
      res => {
        this.usage.network.data = res.data.result.map(obj => {
          return Object.assign({}, obj, {
            number: obj.value / res.data.result[0].value * 90
          })
        })
      },
      err => {
        console.log(err)
      }
    )

    Monitor.topN({
      metric: 'hardware.cpu.load.5min'
    }).then(
      res => {
        this.usage.load.data = res.data.result.map(obj => {
          return Object.assign({}, obj, {
            number: obj.value / res.data.result[0].value * 90
          })
        })
      },
      err => {
        console.log(err)
      }
    )
  }
}

RightCtrl.$inject = ['$interval', 'Monitor', 'Http']
