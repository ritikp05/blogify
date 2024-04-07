import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';


const CreateBlog = () => {

    const [loading, setLoading] = useState(false);
    const [error, Seterror] = useState("");
    const [userData, setUserdata] = useState({
        title: "",
        description: "",
        photo: null,
        category: "technology",
    })


    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setUserdata((prev) => {
            return { ...prev, [name]: value }

        })
        console.log(userData)
    }

    function handlefile(e) {
        if (e.target.files && e.target.files.length > 0) {

            const img = e.target.files[0];
            setUserdata((prev) => {
                return { ...prev, photo: img }
            })

        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!(userData.title && userData.description && userData.photo && userData.category)) {
            alert("Please enter all fields");
            return
        }
        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:4400/api/blog/create",
                userData,
                {
                    headers: {

                        "Content-Type": 'multipart/form-data',
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
            console.log(data.msg)
            setLoading(true)
            navigate("/");
            window.location.reload;
        } catch (err) {
            Seterror(err.message);
            console.log(error)
            console.log(err);
        }

    }
    return (<>
        <div className="flex justify-center items-center mt-20">

            {
                loading ? <Loader error={error} /> :

                    <form onSubmit={handleSubmit} className="bg-gray-100 p-8 flex flex-col gap-3 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-3xl font-semibold mb-4  text-center font-Bitter tracking-widest">Create Blog Post</h2>

                        <TextField onChange={handleChange} name='title' value={userData.title} placeholder="Titile" variant="standard" className="border  border-gray-300 rounded-md px-4  focus:outline-none focus:border-blue-500 w-full mb-4" />
                        <TextField onChange={handleChange} name='description' value={userData.description} placeholder="Description" variant="standard" className="border border-gray-300  rounded-md px-4 py-2 resize-none focus:outline-none focus:border-blue-500 w-full mb-4" />
                        <input type="file" id='category' name="photo" placeholder="Upload photo" onChange={handlefile}
                            className="mt-2 py-2 focus:outline-none w-full mb-4" />
                        <div className="flex items-center gap-4 mb-4">
                            <label htmlFor="category" className="text-lg">Choose a category:</label>

                            <select onChange={handleChange} id='category' name='category' value={userData.category}
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                                <option value="technology">Technology</option>
                                <option value="travel">Travel</option>
                                <option value="food">Food</option>
                                <option value="fitness">Fitness</option>

                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">Create</button>

                    </form>
            }
        </div>

    </>
    )
}

export default CreateBlog