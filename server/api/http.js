import * as service from './service/list';

export function addList(req, res) {
  console.log(req.body);
  console.log('==========');
  service.addList(req.body)
  .then((list) => res.json(list))
  .catch(err => {
    res.status(400);
    res.json({ error: err, list: req.body });
  });
}
