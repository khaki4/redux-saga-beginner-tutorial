/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { onIncrement, onIncrementAsync } from './reducers'

const Counter = ({ value, onDecrement, onIncrementAsync, loadData, state, onIncrement }) =>
      <div>
        <button onClick={() => onIncrementAsync()}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {state} times
        </div>
        <button onClick={loadData}>
          Load Data
        </button>
      </div>

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return ({state: state})
  },
  { onIncrement, onIncrementAsync }
)(Counter)
