import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

import Counter from './Counter'
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = (type, payload) => store.dispatch({type, payload})

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Counter
        value={store.getState()}
        onDecrement={() => action('DECREMENT')}
        loadData={() => {
          return action('FETCH_REQUESTED', 'SOME_URL')
        }}
      />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
