import * as CounterActions from '@/redux/actions/counter'

export default class LeftCtrl {
  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      value: state.counter
    }
  }

  constructor($ngRedux, $scope, Monitor) {
    let that = this

    const unsubscribe = $ngRedux.connect(this.mapStateToThis, CounterActions)(
      this
    )

    $scope.$on('$destroy', unsubscribe)

    Monitor.rs_statics().then(res => {
      console.log(res.data)
    })

    that.countsOfHost = {
      label: '物理云主机数',
      value: 124
    }

    that.systemHealth = {
      label: '系统健康度',
      value: 78
    }

    that.usageList = [
      {
        title: 'CPU资源使用率',
        color: '#0098ff',
        detail: {
          totalName: '总数',
          totalValue: 100,
          totalUnit: '核',
          usageName: '已使用',
          usageValue: 30,
          usageUnit: '核',
          percent: '0'
        }
      },
      {
        title: '内存资源使用率',
        color: '#58c84d',
        detail: {
          totalName: '总数',
          totalValue: 100,
          totalUnit: 'GB',
          usageName: '已分配',
          usageValue: 20,
          usageUnit: 'GB',
          percent: '0'
        }
      },
      {
        title: '存储资源使用率',
        color: '#ff9b0a',
        detail: {
          totalName: '总数',
          totalValue: 100,
          totalUnit: 'GB',
          usageName: '已分配',
          usageValue: 40,
          usageUnit: 'GB',
          percent: '0'
        }
      }
    ]
  }
}
