export default class MainCtrl {
  constructor(Monitor, $interval) {
    console.log('MainCtrl mounted.')
    var that = this

    that = that || {}
    that.data = []

    function equipData(n) {
      for (var i = 0, list = []; i < n; i++) {
        list[i] = Math.random() * 20 + 78
      }
      return list
    }

    function reload() {
      Monitor.hostHealth().then(
        res => {
          that.data = [].concat(
            res.data.json,
            equipData(32 - res.data.json.length)
          )
        },
        _ => {
          that.data = equipData(32)
        }
      )
    }

    reload()

    // $interval(function() {
    //   reload()
    // }, 5000)
  }
}
