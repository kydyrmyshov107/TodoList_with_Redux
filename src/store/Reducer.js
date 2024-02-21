const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "DELETE_ALL":
      return [];
    case "TOGGLE_COMPLETED":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

    case "EDIT":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, ...action.payload.newData };
        }
        return todo;
      });

    default:
      return state;
  }
};

export default reducer;
