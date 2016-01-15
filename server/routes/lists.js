import * as service from '../api/lists'

export function addList(req, res) {
  service.addList(req.body)
  .then((list) => res.json(list))
  .error(err => {
    res.status(400)
    res.json({ error: err, list: req.body })
  })
}

export function getLists(req, res) {
  service.getLists()
  .then((lists) => res.json(lists))
  .error(err => {
    res.status(400)
    res.json({ error: err })
  })
}
