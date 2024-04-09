import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";




const SingleBlog = () => {
    const [blog, setBlog] = useState([])
    const { id } = useParams()
    const navigate = useNavigate();

    async function getsingleBlog() {
        const { data } = await axios.get(`http://localhost:4400/api/blog/${id}`)
        console.log(data)
        setBlog(data.blog)
    }

    useEffect(() => {
        getsingleBlog()
    }, [])

    async function Handeldelete() {
        try {

            const res = await axios.delete(`http://localhost:4400/api/blog/delete/${id}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            )
            console.log(res);
            navigate("/");
            window.location.reload;
        } catch (err) {
            console.log(err);
        }
    }

    return (<>
        <div className="flex flex-col justify-center items-start gap-1 w-full sm:mt-20 mt-8">
            <div className="flex justify-between ml-2 w-11/12  items-center">

                <div className="flex  gap-1 items-center sm:ml-10">
                    <FaRegUserCircle className="text-base" />
                    <h1 className="tracking-widest mb-1">{blog?.userId?.name}</h1>
                </div>
                <div className="flex flex-col sm:flex-row  items-center  mb-1 gap-1 sm:gap-4 mr-2">

                    <button className=" rounded-xl font-Bubbler  tracking-widest One text-blue-500 text-xl">
                        <Link to={`/update/${id}`}>
                        <FaEdit />
                        </Link>
                    </button>

                    <button className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-xl font-Bubbler text-base tracking-widest One text-white"
                        onClick={Handeldelete}>
                       <RiDeleteBinLine />
                    </button>
                </div>

            </div>
            <h1 className="font-bold sm:ml-10 text-lg">{blog?.title}</h1>
            <img src={blog?.image} alt="image" className="sm:w-11/12 w-full mx-auto" />
            <p className="mx-2 sm:mx-10  font-Bubbler One">{blog?.description}</p>
        </div>
    </>

    )
}

export default SingleBlog