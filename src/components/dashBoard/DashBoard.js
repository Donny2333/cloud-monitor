export default class DashBoard {
  constructor() {
    return {
      restrict: 'E',
      template: require('./DashBoard.html'),
      replace: true,
      bindToController: true,
      scope: {},
      link: function (scope, element, attrs, ctrl) {

      },
      controller: () => {},
      controllerAs: 'DashBoardCtrl'
    }
  }
}
