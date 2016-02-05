import socketClient from 'socket.io-client'

export default function (store) {
  const io = socketClient.connect('http://localhost:3000')

  io.on('event-change', (change) => {
    console.log('socket captured change:')
    console.log(change)
    // let state = store.getState()
    // if (!change.old_val) {
    //   store.dispatch(actions.addEventSuccess(change.new_val))
    // } else if (!change.new_val) {
    //   store.dispatch(actions.deleteEventSuccess(change.old_val))
    // } else {
    //   store.dispatch(actions.editEventSuccess(change.new_val))
    // }
  })

  return io
}
