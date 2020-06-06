import config from "../config";
import TokenService from "./token-service";

const CommentApiService = {
  // Allows user to post, edit, and delete comments as well as get comments by story id
  postComment(userId, comment, storyId) {
    return fetch(`${config.API_ENDPOINT}/comment`, {
      method: "POST",
      body: JSON.stringify({ comment, author: userId, story: storyId }),
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
      return res.json();
    });
  },
//chage endpoints for the RESTful api
  getCommentsByStoryId(storyId) {
    return fetch(`${config.API_ENDPOINT}/comment/${storyId}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
  },

  editComment(comment) {
    return fetch(`${config.API_ENDPOINT}/comment/edit/${comment.id}`, {
      method: "PATCH",
      body: JSON.stringify(comment),
      headers: {
        //Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
  },

  deleteComment(comment) {
    return fetch(`${config.API_ENDPOINT}/comment/${comment.id}`, {
      method: "DELETE",
      body: JSON.stringify(comment),
      headers: {
        //Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      }

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
  },

}


export default CommentApiService
