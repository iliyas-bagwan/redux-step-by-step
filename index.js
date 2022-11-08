const redux = require("redux")
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require("redux-logger")
const logger = reduxLogger.createLogger()


const CAKE_ORDERED = 'CAKE_ORDERED'
const CREATE_CAKE = 'CREATE_CAKE'
const ICECREAM_ORDERED = 'ICECREAME_ORDERED'
const RESTOCKED_ICECREAM = 'RESTOCKED_ICECREAM'

function orderCake(){
    return {
        type:CAKE_ORDERED,
        payload:1
    }
}

function createCake(qty = 1){
   return {
     type: CREATE_CAKE,
    payload: qty
}
}

function orderIceCream(){
    return {
        type:ICECREAM_ORDERED,
        payload:1
    }
}

function  restockedIceCream(qty = 1) {
    return {
        type: RESTOCKED_ICECREAM,
        payload: qty
    }
}




// const initialState = {
//     numOfCakes: 10,
//     numOfIceCream: 20,
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case CAKE_ORDERED:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - action.payload
//             }
//         case CREATE_CAKE:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes +action.payload
//             }
//         case ICECREAM_ORDERED:
//             return {
//                 ...state,
//                 numOfIceCream: state.numOfIceCream - action.payload
//             }
//         case RESTOCKED_ICECREAM:
//             return {
//                 ...state,
//                 numOfIceCream: state.numOfIceCream + action.payload
//             }

//             default:
//                 return state
//     }
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
            }
        case CREATE_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
   
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
   
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - action.payload
            }
        case RESTOCKED_ICECREAM:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload
            }

        default:
            return state
    }
}

const rootReducer = redux.combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(() => {})



// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(createCake(3))

const actions = bindActionCreators({orderCake, createCake, orderIceCream, restockedIceCream}, store.dispatch);
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.createCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockedIceCream(3)




unsubscribe()