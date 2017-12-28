import { URL_CFG } from '@/api'

export default class EChartsFactory {
  constructor(Http) {
    return {
      systemState: () => {
        return Http.get(URL_CFG.api + 'systemstate/statistics')
      },
      hostHealth: () => {
        return Http.get(URL_CFG.api + 'hosthealth/statistics/32')
      },
      hostState: () => {
        return Http.get(URL_CFG.api + 'hoststate/statistics')
      },
      vm: () => {
        return Http.get(URL_CFG.api + 'vm/statistics')
      },
      alarm: () => {
        return Http.get(URL_CFG.api + 'alarm/statistics')
      },
      hypervisors: () => {
        return Http.get(URL_CFG.api + 'hypervisors/statistics')
      },
      cpu: () => {
        return Http.get(URL_CFG.api + 'cpu/topn')
      },
      mem: () => {
        return Http.get(URL_CFG.api + 'mem/topn')
      },
      vm_cpu: () => {
        return Http.get(URL_CFG.api + 'vm_cpu/topn')
      },
      vm_mem: () => {
        return Http.get(URL_CFG.api + 'vm_mem/topn')
      }
    }
  }
}
