import * as CounterActions from '@/redux/actions/counter'

export default class AppCtrl {
  constructor($ngRedux, $scope, Monitor) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, CounterActions)(
      this
    )
    $scope.$on('$destroy', unsubscribe)
  }

  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      value: state.counter
    }
  }
}
