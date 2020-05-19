import config from "../config";

const StoryApiService = {
  postStory(story) {
    // added return
    // return fetch(`${config.API_ENDPOINT}`, {
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

  //add delete and edit story functions
  getStoryById(id) {
    return fetch(`${config.API_ENDPOINT}/story/${id}`, {
      method: "GET",
      headers: {
        //authorization: `bearer ${config.API_ENDPOINT}`
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default StoryApiService;
