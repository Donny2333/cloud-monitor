const Gnocchi = require('../service').Gnocchi

const topN = (req, res) => {
  res.json({
    title: 'monitor',
    body: 'topN',
    metric: req.params.metric,
    num: req.params.num
  })
}

const detail = async (req, res) => {
  let details = []
  for (let i = 0; i < 108; i++) {
    details.push({
      name: `host_${i}`,
      score: Math.random() * 100
    })
  }
  res.json({
    code: 200,
    msg: '请求成功',
    result: {
      sum: 128,
      system_score: 90,
      num_excellent: 25,
      num_good: 7,
      num_poor: 3,
      details: details
    }
  })
}

const rsStatics = (req, res, next) => {
  const gnocchi = new Gnocchi()

  gnocchi
    .getStatics()
    .then(
      resp => {
        res.json(resp.hypervisor_statistics)
      },
      err => {
        throw err
      }
    )
    .catch(err => {
      res.send(err)
    })
}

module.exports = {
  topN,
  detail,
  rsStatics
}
