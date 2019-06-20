import React from 'react'
import Undoable from './undoable'

export default class AdvancedUndo extends React.Component {
    undoable = new Undoable();
    state = { counter: 0, color: 'red' };

    setCounter = counter => this.setState({ counter })
    setColor = color => this.setState({ color })

    setWithTracking = (oldValue, newValue) => {
        this.undoable.registerUndo({
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

    turn = (newColor) => {
        const { color } = this.state
        this.undoable.registerUndo({
            callback: this.setColor,
            newValue: newColor,
            oldValue: color
        })
        this.setColor(newColor)
    }

    commit= () => {
        this.undoable.commitPendingUndos()
        this.forceUpdate()
    }

    render() {
        return (
            <div>
                <hr />
                <h1>Advanced UndoRedo: groupped actions</h1>
                <h2 style={{ color: this.state.color }}>State: {this.state.counter}, color: {this.state.color}</h2>
                <p>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={() => this.turn('green')}>Green</button>
                    <button onClick={() => this.turn('red')}>Red</button>
                    <button onClick={() => this.turn('blue')}>Blue</button>
                </p>
                <p>
                <button onClick={this.commit}>Commit!</button>
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