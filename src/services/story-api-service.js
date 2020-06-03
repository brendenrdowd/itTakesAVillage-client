import config from "../config";
import TokenService from "./token-service";

const StoryApiService = {
  postStory(story) {
    // added return
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

  editStory(story) {
    // Error: Empty .update() call detected! Update data does no…ry. Table: itav_stories. Columns: resolved,issue.
    return fetch(`${config.API_ENDPOINT}/story/${story.id}`, {
      method: "PATCH",
      body: JSON.stringify(story),
      headers: {
        authorization: `bearer ${config.API_ENDPOINT}`,
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteStory(story) {
    return fetch(`${config.API_ENDPOINT}/story/${story.id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        authorization: `bearer ${config.API_ENDPOINT}`,
      }.then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      ),
    });
  },
};

export default StoryApiService;

//create a function that reaches out to the backend
