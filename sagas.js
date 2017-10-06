import { delay } from 'redux-saga';
import { call, all, put, takeEvery, takeLatest} from 'redux-saga/effects';

// worker Saga: 비동기 증가 태스크를 수행할겁니다.
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT'})
}

// watcher Saga
export function* watchIncrementAsync() {
  // 모든 'INCREMENT_ASYNC' action을 바라본다.
  // 만약 takeLatest를 이용한다면
  // 마지막 action만 실행되고 나머지는 cancel된다.
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* helloSaga() {
  console.log('Hello Sagas!')
}

// 모든 Saga들을 한번에 시작하기 위한 단일 entry point 입니다.
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}