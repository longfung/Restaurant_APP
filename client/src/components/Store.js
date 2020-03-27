import React, {useReducer} from 'react'

const initialState = {
    ownerId: 0,
    restaurant: null,
    userMode: 1,
}

const store = React.createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const reducer = (state, action) => {
        debugger;
        switch (action.type) {
            case 'setOwnerId':
                return {...state, ownerId: action.value}
            case 'setUserMode':
                return {...state, userMode: action.value};
            case 'setRestaurant':
                return {...state, restaurant: action.value}
            default:
                return state
        }
    }    
    const [state, dispatch] = useReducer(reducer, initialState);

//   return <Provider value={{ state, dispatch }}>{children}</Provider>;
  return ( 
    <Provider value={{state, dispatch}}>{children}</Provider>);
};

export { store, StateProvider }