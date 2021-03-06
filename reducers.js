export const onIncrement = () => ({ type: 'INCREMENT' })
export const onIncrementAsync = () => ({ type: 'INCREMENT_ASYNC'})

export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    case 'FETCH_SUCCEEDED':
      console.log('success')
      return state
    case 'FETCH_FAILED':
      console.log('fail')
      return state
      case 'SHOW_CONGRATULATION':
      console.log('SHOW_CONGRATULATION')
      return state
    default:
      return state
  }
}
