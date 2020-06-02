import React, { useReducer } from "react";
import i18next from "i18next";

const initialState = {

};

const store = React.createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "setOwnerId":
        return {
          ...state,
          ownerId: action.value.id,
          username: action.value.username,
        };
      case "setUserMode":
        return { ...state, userMode: action.value };
      case "setRestaurant":
        return { ...state, restaurant: action.value };
      case "setCategoryId":
        return { ...state, categoryId: action.value };
      case "setMenuDescription":
        return { ...state, menuDescription: action.value };
      case "setMenuFormat":
        return { ...state, menuFormat: action.value };
      case "setLocale":
        i18next.changeLanguage(action.value);
        return { ...state, locale: action.value };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //   return <Provider value={{ state, dispatch }}>{children}</Provider>;
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
