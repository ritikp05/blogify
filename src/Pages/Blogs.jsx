
import { useEffect, useState } from "react";
import Blog from "../component/Blog";
import Loader from "../component/Loader";
import fetchData from "../assets/constants/fetchData";

const Blogs = ({ category, loading, Setloading }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, Seterr] = useState("");

  useEffect(() => {
    fetchData(`/api/blog/category/${category}`, "GET","Blogs")
      .then((res) => {
        console.log(res.blogs);
        setBlogs(res.blogs);
        Setloading(false);
      })
      .catch((err) => {

        console.log(err);
        Seterr(err.message);
      });
  }, [category]);

  return (
    <>
      {loading ? (
        <Loader error={error} />
      ) : (
        <div className="flex  mt-3  justify-center gap-10  items-center flex-wrap">
          {blogs.length > 0 &&
            blogs.map((data) => {
              return <Blog blog={data} key={data._id} />;
            })}
        </div>
      )}
    </>
  );
};

export default Blogs;
