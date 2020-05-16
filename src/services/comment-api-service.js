import config from "../config";

const CommentApiService = {


  postComment(comment, storyId, userId) {
    const package = { comment, storyId, userId }
    fetch(`${config.API_ENDPOINT}/comment`, {
      method: "POST",
      body: JSON.stringify(package),
      headers: {
        authorization: `bearer ${config.API_ENDPOINT}`,
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

  getCommentsByStoryId(storyId) {
    return fetch(`${config.API_ENDPOINT}/story/${storyId}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${config.API_ENDPOINT}`,
        "content-type": "application/json"
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
  },

  editComment(comment) {
    return fetch(`${config.API_ENDPOINT}/comment/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(comment),
      headers: {
        authorization: `bearer ${config.API_ENDPOINT}`,
        "content-type": "application/json"
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
  },

  deleteComment(comment) {
    return fetch(`${config.API_ENDPOINT}/comment/${id}`, {
      method: "DELETE",
      body: JSON.stringify(comment)
      
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
  },

}


export default CommentApiService