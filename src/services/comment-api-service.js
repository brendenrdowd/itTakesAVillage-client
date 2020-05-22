import config from "../config";
import TokenService from "./token-service";

const CommentApiService = {
  postComment(comment) {
    fetch(`${config.API_ENDPOINT}/comment`, {
      method: "POST",
      body: JSON.stringify(comment),
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
  getCommentsByStoryId(storyId) {
    return fetch(`${config.API_ENDPOINT}/story/${storyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

//add delete comment & edit comment
export default CommentApiService;
