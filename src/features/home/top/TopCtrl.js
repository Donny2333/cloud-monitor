export default class TopCtrl {
  constructor($interval) {
    this.title = '大数据计算云'
    $interval(() => {
      this.datetime = new Date()
    }, 1000)
  }
}
