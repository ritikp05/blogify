import axios from "axios";
export default async function fetchData(url, method, page, userdata) {
  if (method === "GET" && page === "Blogs") {
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  }
  if (method === "POST" && page === "Register") {
    const response = await axios.post(url, userdata);
    return response;
  }
  if (method === "POST" && page === "Login") {
    const response = await axios.post(url, userdata);
    return response;
  }
}
