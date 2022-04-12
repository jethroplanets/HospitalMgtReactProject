export const initialState = {
  basket: [],
  user: null,
  apiKey: "http://localhost:4000",
  products: [],

};

const reducer = (state, action) => {
  switch (action.type) {
  

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    
    default:
      return state;
  }
};

export default reducer;
