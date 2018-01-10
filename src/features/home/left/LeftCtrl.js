export default class LeftCtrl {
  constructor($ngRedux, $scope, Monitor, Http) {
    this.init(Http)
    this.load(Monitor)

    $ngRedux.subscribe(() => {
      let state = $ngRedux.getState()
      this.countsOfHost.value = state.counter.sum
      this.systemHealth.value = state.counter.system_score
    })
  }

  bytesToSize(mebibytes, unit) {
    const k = 1000 // or 1024
    const sizes = ['MB', 'GB', 'TB', 'PB']
    const i = Math.floor(Math.log(mebibytes) / Math.log(k))

    if (mebibytes === 0) {
      return {
        value: 0,
        unit: sizes[0]
      }
    }
    return {
      value: (mebibytes / Math.pow(k, i)).toPrecision(3),
      unit: sizes[i]
    }
  }

  init(Http) {
    Http.load('json/hypervisors.json').then(res => {
      this.usage = res.data.result
    })

    Http.load('json/counts_of_host.json').then(res => {
      this.countsOfHost = {
        label: '物理云主机数',
        value: res.data.result.value
      }
    })

    Http.load('json/system_health.json').then(res => {
      this.systemHealth = {
        label: '系统健康度',
        value: res.data.result.value
      }
    })
  }

  load(Monitor) {
    Monitor.rs_statics().then(
      res => {
        this.usage.cpu.detail.total.value = res.data.vcpus
        this.usage.cpu.detail.usage.value = res.data.vcpus_used
        this.usage.cpu.detail.percent = res.data.vcpus_used / res.data.vcpus

        this.usage.memory.detail = {
          total: {
            value: this.bytesToSize(res.data.memory_mb).value,
            unit: this.bytesToSize(res.data.memory_mb).unit
          },
          usage: {
            value: this.bytesToSize(res.data.memory_mb_used).value,
            unit: this.bytesToSize(res.data.memory_mb_used).unit
          },
          percent: res.data.memory_mb_used / res.data.memory_mb
        }

        this.usage.disk.detail = {
          total: {
            value: this.bytesToSize(res.data.local_gb).value,
            unit: this.bytesToSize(res.data.local_gb).unit
          },
          usage: {
            value: this.bytesToSize(res.data.local_gb_used).value,
            unit: this.bytesToSize(res.data.local_gb_used).unit
          },
          percent: res.data.local_gb_used / res.data.local_gb
        }
      },
      err => {
        console.log(err)
      }
    )
  }
}
