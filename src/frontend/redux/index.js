import angular from 'angular'
import ngRedux from 'ng-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index.js'

export default angular
  .module('services.Redux', [ngRedux])
  .config(['$ngReduxProvider', $ngReduxProvider => {
    $ngReduxProvider.createStoreWith(rootReducer, [thunk])
  }]).name
