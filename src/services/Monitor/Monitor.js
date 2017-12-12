import { URL_CFG } from '@/api'

export default class EChartsFactory {
  constructor(Http) {
    return {
      systemState: function() {
        return Http.get(URL_CFG.api + 'systemstate/statistics')
      },
      hostHealth: function() {
        return Http.get(URL_CFG.api + 'hosthealth/statistics/32')
      },
      hostState: function() {
        return Http.get(URL_CFG.api + 'hoststate/statistics')
      },
      vm: function() {
        return Http.get(URL_CFG.api + 'vm/statistics')
      },
      alarm: function() {
        return Http.get(URL_CFG.api + 'alarm/statistics')
      },
      hypervisors: function() {
        return Http.get(URL_CFG.api + 'hypervisors/statistics')
      },
      cpu: function() {
        return Http.get(URL_CFG.api + 'cpu/topn')
      },
      mem: function() {
        return Http.get(URL_CFG.api + 'mem/topn')
      },
      vm_cpu: function() {
        return Http.get(URL_CFG.api + 'vm_cpu/topn')
      },
      vm_mem: function() {
        return Http.get(URL_CFG.api + 'vm_mem/topn')
      }
    }
  }
}
