import config from "../config";

const StoryApiService = {
  postStory(story) {

    return fetch(`${config.API_ENDPOINT}/story`, {
      method: "POST",
      body: JSON.stringify(story),
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
 
  getStoryById(id) {
    return fetch(`${config.API_ENDPOINT}/story/${id}`, {
      method: "GET",
      body: JSON.stringify(id),
      headers: {
        //authorization: `bearer ${config.API_ENDPOINT}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  editStory(story) {
    return fetch(`${config.API_ENDPOINT}/story/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(story),
      headers: {
        // authorization: `bearer ${config.API_ENDPOINT}`
      }
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    })
  },

  deleteStory(story) {
    return fetch(`${config.API_ENDPOINT}/story/${id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        // authorization: `bearer ${config.API_ENDPOINT}`
      }
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    })
  }
}

export default StoryApiService;


//create a function that reaches out to the backend 