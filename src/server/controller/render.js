const echo = (req, res) => {
  res.sendfile('index.html')
}

const msg = (req, res) => {
  res.json({
    title: 'hello',
    body: 'welcome'
  })
}

module.exports = {
  echo,
  msg
}
