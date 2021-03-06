import test from 'tape'

import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { incrementAsync, fetchData } from './sagas';
import { getPosts } from "./APIs";

const iterator = fetchData()

test('incrementAsync Saga Test', (assert) => {
  const gen = incrementAsync()
  
  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )
  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )
  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )
  
  assert.deepEqual(
    iterator.next().value,
    call(getPosts),
    "fetchProducts should yield an Effect call(getPosts)"
  )
  
  assert.end()
})
