export default class RightCtrl {
  constructor() {
    console.log('RightCtrl mounted.')
    let that = this
    that.charts = [
      {
        label: 'CPU最大利用率TOP5',
        data: [
          {
            name: 'DJY-A01-CMP01',
            value: 50
          },
          {
            name: 'DJY-A01-CMP02',
            value: 42
          },
          {
            name: 'DJY-A01-CMP03',
            value: 35
          },
          {
            name: 'DJY-A01-CMP04',
            value: 28
          },
          {
            name: 'DJY-A01-CMP05',
            value: 20
          }
        ]
      }
    ]
  }
}
