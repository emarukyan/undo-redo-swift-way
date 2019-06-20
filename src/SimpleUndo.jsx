import React from 'react'
import Undoable from './undoable'

export default class SimpleUndo extends React.Component {
    undoable = new Undoable();
    state = { counter: 0 };
  
    setCounter = counter => this.setState({ counter })
  
    setWithTracking = (oldValue, newValue) => {
      this.undoable.registerUndoWithCommit({
        callback: this.setCounter,
        oldValue,
        newValue
      });
      this.setCounter(newValue);
    }
  
    decrement = () => {
      const { counter } = this.state
      this.setWithTracking(counter, counter - 1)
    };
  
    increment = () => {
      const { counter } = this.state
      this.setWithTracking(counter, counter + 1)
    };
  
    render() {
      return (
        <div>
          <h1>State: {this.state.counter}</h1>
          <p>
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
          </p>
          <p>
            <button onClick={() => this.undoable.redo()}>REDO ({this.undoable.redoCount()})</button>
          </p>
          <p>
            <button onClick={() => this.undoable.undo()}>UNDO ({this.undoable.undoCount()})</button>
          </p>
        </div>
      );
    }
  }