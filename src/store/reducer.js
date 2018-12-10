const initialState ={
    developerName : null
};

const reducer = (state = initialState,action) =>{
    const newState ={...state};
    if(action.type === 'UPDATE_DEVELOPER'){
        newState.developerName= action.val
    }
    return newState;
}

export default reducer;