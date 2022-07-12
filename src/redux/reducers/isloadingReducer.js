export const isloadingReducer = (prevState = false, action) => {
    let {type,payload} = action
    switch(type){
        case "change_loading":
            let newState = payload;
            return newState
        
        default:
            return prevState
    }
};