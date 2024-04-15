import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Blog = ({blog}) => {
  return (<>
    <Link to={`/blog/${blog?._id}`}>
      <div className="flex flex-col gap-1 h-auto w-64  mx-auto shadow-3xl shadow-white  bg-slate-100 rounded-3xl pt-4 p-2">
        <img src={blog?.image} alt="image" className="w-64 h-52 rounded-xl" />
        <h1 className="font-semibold font-serif break-words ">{blog?.title?.substring(0, 50)}...</h1>
        <p className="text-gray-500 text-sm font-sans break-words">{blog?.description?.substring(0, 100)}...........</p>
        <div className="flex justify-between gap-1 items-center">
        <div className="flex items-center gap-1">
            <FaRegUserCircle className="text-base" />
          <h1 className="tracking-widest">{blog?.userId?.name}</h1>
           </div>
        <p className="text-sm text-gray-400">{blog?.views} views</p>
        </div>
      </div>
    </Link>
  </>
  )
}

export default Blog