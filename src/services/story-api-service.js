import config from "../config";

const StoryApiService = {
  postStory(story) {
    fetch(`${config.API_NOTES}`, {
      // fetch(`${config.API_ENDPOINT}/story`, {
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
};

export default StoryApiService;
