export default class CountBoard {
  constructor() {
    return {
      restrict: 'E',
      template: require('./CountBoard.html'),
      replace: true,
      bindToController: true,
      scope: {
        chart: '='
      },
      link: (scope, element, attrs, ctrl) => {},
      controller: () => {},
      controllerAs: 'CountBoardCtrl'
    }
  }
}
