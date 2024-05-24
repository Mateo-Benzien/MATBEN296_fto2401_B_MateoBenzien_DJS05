//Store Creation
//The store will maintain the state and provide methods to interact with it.

function createStore(reducer) {
    let state;
    let listeners = [];
  
    const getState = () => state;
  
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
  
    dispatch({}); // Initialize the state
  
    return { getState, dispatch, subscribe };
  }
  
  //Reducer
//The reducer function will define how the state changes in response to actions.

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 };
    case 'SUBTRACT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

//Action Dispatching
//create action creators to dispatch actions to the store.

const addAction = () => ({ type: 'ADD' });
const subtractAction = () => ({ type: 'SUBTRACT' });
const resetAction = () => ({ type: 'RESET' });

//Subscribing to State Changes
//log the state changes to the console by subscribing to state updates.

const store = createStore(counterReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// Initial State Verification
console.log(store.getState()); // Should log: { count: 0 }

// Incrementing the Counter
store.dispatch(addAction()); // Should log: { count: 1 }
store.dispatch(addAction()); // Should log: { count: 2 }

// Decrementing the Counter
store.dispatch(subtractAction()); // Should log: { count: 1 }

// Resetting the Counter
store.dispatch(resetAction()); // Should log: { count: 0 }







//for the testing

//node tallyAppStore.js
