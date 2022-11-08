const redux = require('redux')
const createStore = redux.createStore



const CAKE_ORDERED = 'CAKE_ORDERED';
const RESTOCK_CAKES = 'RESTOCK_CAKES';





function orderCake(qty = 1) {
    return {
        type:CAKE_ORDERED,
        payload:qty
    }
}

function cakesRestock(qty = 1){
    return {
        type: RESTOCK_CAKES,
        payload: qty
    }
}

const initialState = {
    numberOfCakes: 15,
    anotherProperties: {}
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - action.payload
            }
        case RESTOCK_CAKES:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload
            }
        default:
            return state
    }

}

const store = createStore(reducer);
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => { console.log('Current State', store.getState()) });

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(cakesRestock(3))
unsubscribe()


