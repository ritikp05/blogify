import axios from "axios";

export default async function fetchData(url, method) {
try{

    if(method === "GET")
    {
          const {data}= await axios.get(url);
        console.log(data);
        return data;
    }
}catch(Err){
    console.log(Err);
}
 
}

