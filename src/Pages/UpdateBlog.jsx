import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextareaAutosize } from "@mui/material";
import { toast } from "react-toastify";
import fetchData from "../assets/constants/fetchData";
import Loader from "../component/Loader"

const UpdateBlog = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, Seterror] = useState("");

  const [userData, setUserdata] = useState({
    title: "",
    description: "",
    photo: null,
    category: "food",
  });

  async function getBlog() {
    const {data}=await fetchData(`/api/blog/${id}`,"GET","UpdateBlog")
    setUserdata((prev) => {
      return {
        ...prev,
        title: data.blog.title,
        description: data.blog.description,
        photo: data.blog.image,
        category: data.blog.category,
      };
    });
  }

  useEffect(() => {
    getBlog();
  }, [id]);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserdata((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(userData);
  }

  function handlefile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const img = e.target.files[0];
      setUserdata((prev) => {
        return { ...prev, photo: img };
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const data = await fetchData(
        `/api/blog/update/${id}`,
        "PUT",
        "UpdateBlog",
        userData
      );
      setLoading(false);
      toast.success("Blog updated successfully");
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
      Seterror(err.response.data.msg);
    }
  }

  return (
    <div className="flex justify-center w-full mb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100  mt-8 p-8 flex flex-col gap-3 rounded-lg shadow-lg w-full sm:w-1/2"
      >
        <h2 className="text-3xl font-semibold mb-4  text-center font-Bitter tracking-widest">
          Edit Blog Post
        </h2>

        <TextareaAutosize
          onChange={handleChange}
          name="title"
          value={userData.title}
          placeholder="Titile"
          variant="standard"
          className="border border-gray-300 rounded-md px-4 focus:outline-none resize-none focus:border-blue-500 w-full mb-4"
        />
        <TextareaAutosize
          onChange={handleChange}
          name="description"
          value={userData.description}
          maxRows={10}
          placeholder="Description"
          variant="standard"
          className="border border-gray-300  rounded-md px-4 py-2 resize-none  focus:outline-none focus:border-blue-500 w-full mb-4"
        />
        <input
          type="file"
          id="category"
          name="photo"
          accept="image/*"
          title="Upload photo"
          onChange={handlefile}
          className="mt-2 py-2 focus:outline-none w-full mb-4"
        />
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="category" className="text-lg">
            Choose a category:
          </label>

          <select
            onChange={handleChange}
            id="category"
            name="category"
            value={userData.category}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="technology">Technology</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="fitness">Fitness</option>
          </select>
        </div>
        {loading ? (
         <div className="-mt-40"> <Loader error={error} /></div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateBlog;
