import axios from "axios";
const BaseUrl=import.meta.env.VITE_BASE_URL
export default async function fetchData(url, method, page, userdata) {
  if (method === "GET" && page === "Blogs") {
    const { data } = await axios.get(BaseUrl+url);
    console.log(data);
    return data;
  }
  if (method === "POST" && page === "Register") {
    const response = await axios.post(BaseUrl+url, userdata);
    return response;
  }
  if (method === "POST" && page === "Login") {
    const response = await axios.post(BaseUrl+url, userdata);
    return response;
  }
  if (method == "POST" && page === "CreateBlog") {
    const data = await axios.post(
      BaseUrl+url,
      userdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return data;
  }

  if (method === "PUT" && page === "UpdateBlog") {
    const data = await axios.put(
      BaseUrl+url,
      userdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return data;
  }
  if(method==="GET" && page === "SingleBlog"){
    const  data  = await axios.get(BaseUrl+url)
        return data
  } 
  if(method==="DELETE" && page === "SingleBlog"){
    const data = await axios.delete(BaseUrl+url,
    {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    }
)
return data
  }
if(method==="PUT" && page === "ChangePassword"){

  const data = await axios.put(
    BaseUrl+url,
    userdata,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );

  return data;
}

if(method==="POST" && page ==="ConfirmEmail"){
  const response= await axios.post(
    BaseUrl+url,
    userdata
  );
  return response;

}
if(method==="PUT" && page ==="ResetPassword"){
  const response= await axios.put(
    BaseUrl+url,
    userdata
  );
  return response;

}
}