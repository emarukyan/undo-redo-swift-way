class Undoable {
    pendingUndoableActions = [];
    pendingRedoableActions = [];
    past = [];
    future = [];
  
    actionChecker(action) {
      if (typeof action.callback !== 'function' || typeof action.oldValue === 'undefined') {
        throw new Error('WTF!!?')
      }
    }
  
    debugInfo() {
      console.log('----- DEBUG INFO -----')
      console.log('futures:', this.future.length, this.future);
      console.log('past:', this.past.length, this.past);
    }
  
    registerUndo(action) {
      this.actionChecker(action)
      if(this.pendingUndoableActions.find(pAction => pAction.callback === action.callback)) {
          return
      }
      this.pendingUndoableActions.push(action);
    }
  
    registerRedo(action) {
      this.actionChecker(action)
      this.pendingRedoableActions.push(action);
    }
  
    registerRedoWithCommit(action) {
      this.registerRedo(action)
      this.commitPendingRedos()
    }
  
    registerUndoWithCommit(action) {
      this.registerUndo(action);
      this.commitPendingUndos();
    }
  
    commitPendingRedos() {
      if (!this.pendingRedoableActions.length) {
        return
      }
      this.future.push([...this.pendingRedoableActions]);
      this.pendingRedoableActions = [];
      this.debugInfo()
    }
  
    commitPendingUndos() {
      if (!this.pendingUndoableActions.length) {
        return
      }
      this.past.push([...this.pendingUndoableActions]);
      this.pendingUndoableActions = [];
      this.debugInfo()
    }
  
    undo() {
      this.commitPendingUndos();
  
      if (this.past.length === 0) {
        return;
      }
      const actions = this.past.pop();
  
      actions.forEach(action => {
        const { callback, oldValue } = action
        callback(oldValue)
        this.registerRedo(action)
      });
      this.commitPendingRedos()
    }
  
    redo() {
      this.commitPendingRedos()
      if (this.future.length === 0) {
        return
      }
      const actions = this.future.pop()
  
      actions.forEach(action => {
        console.log('action', action)
        const { callback, newValue } = action
        callback(newValue)
        this.registerUndo(action)
      });
      this.commitPendingUndos()
    }
  
    redoCount() {
      return this.future.length;
    }
  
    undoCount() {
      return this.past.length;
    }

    resetActions() {
        this.pendingRedoableActions = []
        this.pendingUndoableActions = []
        this.past = []
        this.future = []
    }
  }
  
  export default Undoable
