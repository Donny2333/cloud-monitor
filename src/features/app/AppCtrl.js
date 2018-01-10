import * as CounterActions from '@/redux/actions/counter'

export default class AppCtrl {
  constructor($ngRedux, $scope, Monitor) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, CounterActions)(
      this
    )
    $scope.$on('$destroy', unsubscribe)
    this.init($ngRedux, Monitor)
  }

  mapStateToThis(state) {
    return {
      detail: state.counter
    }
  }

  init($ngRedux, Monitor) {
    Monitor.detail().then(res => {
      this.set(res.data.result)
    })
  }
}
