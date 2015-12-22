import * as service from './service/list';

export function addList(req, res) {
  service.addList(req.body)
  .then((list) => res.json(list))
  .catch(err => {
    res.status(400);
    res.json({ error: err, list: req.body });
  });
}

export function getLists(req, res) {
  service.getLists()
  .then((lists) => res.json(lists))
  .catch(err => {
    res.status(400);
    res.json({error: err});
  });
}
