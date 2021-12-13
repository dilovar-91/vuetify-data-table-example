import axios from "axios";

export default axios.create({
  baseURL: "http://parser/",
  headers: {
    "Content-type": "application/json"
  }
});
