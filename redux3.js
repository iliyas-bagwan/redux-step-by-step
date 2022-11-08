const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers


const CAKE_ORDERED = 'CAKE_ORDERED';
const RESTOCK_CAKES = 'RESTOCK_CAKES';

const PIZZA_ORDERED = 'PIZZA_ORDERED'
const RESTOCK_PIZZA = 'RESTOCK_PIZZA'






function orderCake(qty = 1) {
    return {
        type: CAKE_ORDERED,
        payload: qty
    }
}

function cakesRestock(qty = 1) {
    return {
        type: RESTOCK_CAKES,
        payload: qty
    }
}

function orderPizza(qty = 1){
    return {
        type: PIZZA_ORDERED,
        payload: qty
    }
}

function restockPizza(qty = 1){
    return {
        type: RESTOCK_PIZZA,
        payload: qty
    }
}

const initialCakeState = {
    numberOfCakes: 12,
}

const initialPizzaState = {
    numberOfPizza: 10
}

const cakeReducer =  (state = initialCakeState, action) => {
    switch(action.type) {
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

const pizzaReducer = (state = initialPizzaState, action) => {
    switch(action.type) {
        case PIZZA_ORDERED:
            return {
                ...state,
                numberOfPizza: state.numberOfPizza - action.payload
            }
        case RESTOCK_PIZZA:
            return {
                ...state,
                numberOfPizza: state.numberOfPizza + action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake:cakeReducer,
    pizza:pizzaReducer
})

const store = createStore(rootReducer);
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => { console.log('Current State', store.getState()) });

const actions = bindActionCreators({ orderCake, cakesRestock, orderPizza, restockPizza }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.cakesRestock(3)
actions.orderPizza()
actions.orderPizza()
actions.orderPizza()
actions.restockPizza(3)
unsubscribe()