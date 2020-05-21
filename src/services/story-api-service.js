import config from "../config";
import TokenService from "./token-service";

const StoryApiService = {
  postStory(story) {
    // added return
    // return fetch(`${config.API_ENDPOINT}`, {
    return fetch(`${config.API_ENDPOINT}/story`, {
      method: "POST",
      body: JSON.stringify(story),
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

  getAllStories() {
    return fetch(`${config.API_ENDPOINT}/story`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  //add delete and edit story functions
  getStoryById(id) {
    return fetch(`${config.API_ENDPOINT}/story/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default StoryApiService;
