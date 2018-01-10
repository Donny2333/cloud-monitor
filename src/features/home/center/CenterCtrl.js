export default class CenterCtrl {
  constructor($interval) {
    const equipData = n => {
      let list = []
      let i = 0
      for (; i < n; i++) {
        list[i] = Math.random() * 100
      }
      return list
    }

    const init = () => {
      this.data = {
        num_excellent: Math.ceil(Math.random() * 100),
        num_good: Math.ceil(Math.random() * 100),
        num_poor: Math.ceil(Math.random() * 100),
        detail: equipData(36)
      }
    }

    init()

    $interval(() => {
      init()
    }, 10000)

    this.label = '物理云主机健康度'
  }
}

CenterCtrl.$inject = ['$interval']
