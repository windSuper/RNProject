import {StackNav} from '../container/Main.js';


const navReducer = (state , action) => {
    let nextState;
    switch (action.type) {
        default:
            nextState = StackNav.router.getStateForAction(action, state);
            break;
    }
    return nextState || state
};

export default navReducer;