const commentReducer = (
  state = { comments: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "COMMENT_FETCH_START":
      return { ...state, loading: true, error: false };
    case "COMMENT_FETCH_SUCCESS":
      return { ...state, comments: action.data, loading: false };
    case "COMMENT_FETCH_FAIL":
      return { ...state, loading: false, error: true };

    case "COMMENT_CREATE_START":
      return { ...state, loading: true };
    case "COMMENT_CREATE_SUCCESS":
      return {
        ...state,
        comments: [action.data, ...state.comments],
        loading: false,
      };
    case "COMMENT_CREATE_FAIL":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default commentReducer;
