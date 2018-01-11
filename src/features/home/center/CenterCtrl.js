export default class CenterCtrl {
  constructor($ngRedux, Http) {
    this.init(Http)

    // $ngRedux.subscribe(() => {
    //   let state = $ngRedux.getState()
    //   this.data = {
    //     num_excellent: state.counter.num_excellent,
    //     num_good: state.counter.num_good,
    //     num_poor: state.counter.num_poor,
    //     detail: state.counter.detail
    //   }
    // })
  }

  init(Http) {
    this.label = '物理云主机健康度'

    Http.load('json/host_health.json').then(res => {
      this.data = res.data.result
    })
  }

  static equipData(n) {
    let list = []
    let i = 0
    for (; i < n; i++) {
      list[i] = {
        name: `vm_${i}`,
        score: (Math.random() * 100).toFixed(0)
      }
    }
    return list
  }
}

CenterCtrl.$inject = ['$ngRedux', 'Http']
