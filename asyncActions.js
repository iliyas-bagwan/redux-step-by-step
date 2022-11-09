const redux =require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const thunk = require('redux-thunk').default
const axios = require('axios')
const reduxLogger = require("redux-logger")
const logger = reduxLogger.createLogger()



const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILED = 'FETCH_USER_FAILED'

const initialState = {
    loading: false,
    users:[],
    error:''
}

function fetchUserRequested() {
    return {
        type:FETCH_USER_REQUESTED
    }
}

function fetchUserSuccess(users) {
    return {
        type: FETCH_USER_SUCCESS,
        payload:users
    }
}

function fetchUserFailed(error) {
    return {
        type: FETCH_USER_FAILED,
        payload:error
    }
}

function reducer(state = initialState, action) {
    switch(action.type){
        case FETCH_USER_REQUESTED:
            return {
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading:false,
                users: action.payload,
                error:''
            }
        case FETCH_USER_FAILED:
            return {
                loading:false,
                users:[],
                error: action.payload
            }
        default:
            return state
    }
}

function fetchUser(){

    return function (dispatch) {
        dispatch(fetchUserRequested())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((resp) => {
            const users = resp.data.map((user) => user.name)
            dispatch(fetchUserSuccess(users))

        })
        .catch((error)=>{
            dispatch(fetchUserFailed(error.message))

        })
    }

}

const store = createStore(reducer, applyMiddleware(thunk, logger))
store.subscribe(()=>{ })

store.dispatch(fetchUser())

