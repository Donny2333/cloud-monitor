import * as CounterActions from '@/redux/actions/counter'

export default class AppCtrl {
  constructor($ngRedux, $scope, $interval, Monitor) {
    const unsubscribe = $ngRedux.connect(AppCtrl.mapStateToThis, CounterActions)(
      this
    )
    $scope.$on('$destroy', unsubscribe)

    this.init($ngRedux, Monitor)
  }

  static mapStateToThis(state) {
    return {
      detail: state.counter
    }
  }

  init($ngRedux, Monitor) {
    Monitor.detail().then(res => {
      this.set(res.data.result || {})
    }, err => {
      console.log(err)
    })
  }
}

AppCtrl.$inject = ['$ngRedux', '$scope', '$interval', 'Monitor']
