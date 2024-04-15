import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import fetchData from "../assets/constants/fetchData";
import { toast } from "react-toastify";
import Loader from "../component/Loader";

const SingleBlog = () => {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();
  const [loading, Setloading] = useState(true);
  const [error, Seterror] = useState("");
  const navigate = useNavigate();

  async function getsingleBlog() {
    try {
      Setloading(true);
      const response = await fetchData(`/api/blog/${id}`, "GET", "SingleBlog");
      Setloading(false);

      setBlog(response.data.blog);
    } catch (err) {
      Setloading(false);
      Seterror(err);
    }
  }

  useEffect(() => {
    getsingleBlog();
  }, []);

  async function Handeldelete() {
    try {
      const response = await fetchData(
        `/api/blog/delete/${id}`,
        "DELETE",
        "SingleBlog"
      );

      toast.success(response.data.msg);
      navigate("/");
      window.location.reload;
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  }

  return (
    <>
      {loading ? (
        <Loader error={error} />
      ) : (
        <div>
          {" "}
          <div className="flex flex-col  justify-center items-start gap-1 w-full sm:mt-20 mt-8">
            <h1 className="font-bold sm:ml-10 mt-2 mb-2 text-lg">
              {blog?.title}
            </h1>
            <img
              src={blog?.image}
              alt="image"
              className="sm:w-11/12 w-full mx-auto"
            />
            <p className="mx-2 sm:mx-10  font-Bubbler One">
              {blog?.description}
            </p>
          </div>
          <div className="flex justify-between  mt-5 bg-gray-200 py-3 gap-1 items-center sm:ml-10">
            <div className="flex items-center gap-1">
              <FaRegUserCircle className="text-base" />
              <h1 className="tracking-widest mb-1">{blog?.userId?.name}</h1>
            </div>
            <div className="flex flex-row items-center  mb-1  gap-4 mr-2">
              <button className=" rounded-xl font-Bubbler  tracking-widest One text-blue-500 text-xl">
                <Link to={`/update/${id}`}>
                  <FaEdit />
                </Link>
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-xl font-Bubbler text-base tracking-widest One text-white"
                onClick={Handeldelete}
              >
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
