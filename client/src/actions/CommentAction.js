import * as CommentApi from '../api/CommentRequest';

export const getComments = (postId) => async (dispatch) => {
  dispatch({ type: "COMMENT_FETCH_START" });
  try {
    const { data } = await CommentApi.getComments(postId);
    dispatch({ type: "COMMENT_FETCH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "COMMENT_FETCH_FAIL" });
  }
};

export const createComment = (commentData) => async (dispatch) => {
  dispatch({ type: "COMMENT_CREATE_START" });
  try {
    const { data } = await CommentApi.createComment(commentData);
    dispatch({ type: "COMMENT_CREATE_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "COMMENT_CREATE_FAIL" });
  }
};
