import {combineReducers} from 'redux';
import SignReduce from './signReduce.js';
import LoginReduce from './LoginReduce.js';
import HomeReduce from './HomeReduce.js';
import LoadingReduce from './LoadingReduce.js';
import NavReduce from './navReduce.js';
import UserReduce from './userReduce.js';
import BankReduce from './BankReduce.js';

const rootReduce = combineReducers({
    SignReduce,
    LoginReduce,
    HomeReduce,
    LoadingReduce,
    NavReduce,
    UserReduce,
    BankReduce,
})

export default rootReduce;