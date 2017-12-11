// import Monitor from '@/services/Monitor'
// import Http from '@/services/Http'
// import { $interval } from 'angular'

export default class RightCtrl {
  constructor() {
    console.log('RightCtrl mounted.')
    // var that = this

    // that.detail = {
    //   disaster: 0,
    //   serious: 0,
    //   warning: 0,
    //   information: 0
    // }

    // that.usageList = [
    //   {
    //     title: 'CPU使用情况',
    //     color: '#58c84d',
    //     detail: {
    //       totalName: '总数',
    //       totalValue: 100,
    //       usageName: '已分配',
    //       usageValue: 0
    //     }
    //   },
    //   {
    //     title: '内存使用情况',
    //     color: '#ff9b0a',
    //     detail: {
    //       totalName: '总数',
    //       totalValue: 100,
    //       usageName: '已分配',
    //       usageValue: 0
    //     }
    //   },
    //   {
    //     title: '存储使用情况',
    //     color: '#09c8f4',
    //     detail: {
    //       totalName: '总数',
    //       totalValue: 100,
    //       usageName: '已分配',
    //       usageValue: 0
    //     }
    //   }
    // ]

    // function reload() {
    //   Monitor.alarm().then(
    //     res => {
    //       that.detail = {
    //         disaster: res.data.disaster,
    //         serious: res.data.serious,
    //         warning: res.data.warning,
    //         information: res.data.information
    //       }
    //     },
    //     _ => {
    //       Http.get('src/common/json/alarm.json').then(function(res) {
    //         that.detail = res.data.data[0]
    //       })
    //     }
    //   )

    //   Monitor.hypervisors().then(
    //     res => {
    //       that.usageList[0].detail.totalValue = res.data.vcpus && 240
    //       that.usageList[0].detail.usageValue = res.data.vcpus_used

    //       that.usageList[1].detail.totalValue = res.data.memory_mb
    //       that.usageList[1].detail.usageValue = res.data.memory_mb_used

    //       that.usageList[2].detail.totalValue = res.data.local_gb
    //       that.usageList[2].detail.usageValue = res.data.local_gb_used
    //     },
    //     _ => {
    //       Http.get('src/common/json/hypervisors.json').then(function(res) {
    //         that.usageList = res.data.data
    //       })
    //     }
    //   )
    // }

    // reload()

    // $interval(function() {
    //   reload()
    // }, 30000)
  }
}
