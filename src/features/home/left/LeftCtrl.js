import * as CounterActions from '@/redux/actions/counter'

export default class LeftCtrl {
  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      value: state.counter
    }
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

  constructor($ngRedux, $scope, Monitor, Http) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, CounterActions)(
      this
    )

    $scope.$on('$destroy', unsubscribe)

    this.init(Http)
    this.load(Monitor)

    this.countsOfHost = {
      label: '物理云主机数',
      value: 124
    }

    this.systemHealth = {
      label: '系统健康度',
      value: 78
    }
  }

  init(Http) {
    Http.load('json/hypervisors.json').then(res => {
      this.usage = res.data.result
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
