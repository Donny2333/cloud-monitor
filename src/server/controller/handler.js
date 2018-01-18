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
  res.json({
    title: 'monitor',
    body: 'detail'
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
