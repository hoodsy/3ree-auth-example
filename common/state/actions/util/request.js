import 'es6-promise'
import fetch from 'isomorphic-fetch'

export default function createRequestPromise(method, data, endpoint) {
  const isPostRequest = (method === 'post')
  const props = {
    method,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (isPostRequest)
    props['body'] = JSON.stringify(data)
  return fetch(endpoint, props)
  .then(checkStatus)
  .then(res => (isPostRequest) ? res.json() : res.text())
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 400)
    return res
  else {
    const err = new Error(res)
    err.status = res.statusText
    throw err
  }
}
