import { delay } from 'redux-saga';
import { call, all, put, takeEvery, takeLatest, select, take} from 'redux-saga/effects';
import { getPosts } from './APIs';

// worker Saga: 비동기 증가 태스크를 수행할겁니다.
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT'})
}
// watcher Saga
// export function* watchIncrementAsync() {
//   // 모든 'INCREMENT_ASYNC' action을 바라본다.
//   // 만약 takeLatest를 이용한다면
//   // 마지막 action만 실행되고 나머지는 cancel된다.
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }

export function* helloSaga() {
  console.log('Hello Sagas!')
}

//worker
export function* fetchData(action) {
  try {
    const data = yield call(getPosts, action.payload)
    yield put({type: "FETCH_SUCCEEDED", data})
  } catch (error) {
    yield put({type: "FETCH_FAILED", error})
  }
}
// watcher saga
export function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}

export function* watchIncrementAsync() {
  while (true) {
    yield take('INCREMENT_ASYNC')
    yield call(incrementAsync)
  }
}

function* watchAndLog() {
  // pust 방식
  // yield takeEvery('*', function* logger(action) {
  //   const state = yield select()
  //
  //   console.log('action', action)
  //   console.log('state after', state)
  // })
  
  // pull 방식
  while (true) {
    const action = yield take('*')
    const state = yield select()
    
    console.log('action', action)
    console.log('state after', state)
  }
}

function* watchClickIncrementButton() {
  let action;
  for(let i = 0; i < 3; i++) {
    action = yield take('INCREMENT')
  }
  console.log('action', action)
  yield put({type: 'SHOW_CONGRATULATION'})
}

// 모든 Saga들을 한번에 시작하기 위한 단일 entry point 입니다.
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData(),
    watchAndLog(),
    watchClickIncrementButton(),
  ])
}