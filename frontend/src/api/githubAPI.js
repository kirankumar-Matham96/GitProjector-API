import axios from "axios";

class GithubApis {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };

    this.URL = import.meta.env.VITE_URL;
  }

  //   authenticate user with github token
  getGithhubAccess = async ({ githubToken, authToken }) => {
    try {
      this.headers["Authorization"] = authToken;
      const options = {
        headers: this.headers,
        data: JSON.stringify(githubToken),
      };
      const resp = await axios.get(`${this.URL}/repos/login`, options);
      return resp.data;
    } catch (error) {
    }
  };

  getAllRepos = async () => {
    try {
      const options = {
        headers: this.headers,
      };
      const resp = await axios.get(`${this.URL}/repos/all`, options);
      return resp.data;
    } catch (error) {
    }
  };
}

export default new GithubApis();