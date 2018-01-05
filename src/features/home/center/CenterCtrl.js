export default class CenterCtrl {
  constructor() {
    const that = this
    that.data = []

    const equipData = n => {
      for (var i = 0, list = []; i < n; i++) {
        list[i] = Math.random() * 20 + 78
      }
      return list
    }

    that.data = equipData(32)
    that.label = '物理云主机健康度'
    console.log('CenterCtrl mounted.')
  }
}
