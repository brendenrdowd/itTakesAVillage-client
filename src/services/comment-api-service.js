import config from "../config";

const CommentApiService = {
  postComment(comment) {
    fetch(`${config.API_NOTES}`, {
      // fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        // authorization: `bearer ${config.API_ENDPOINT}`,
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
};

export default CommentApiService;
