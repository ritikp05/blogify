import { useState } from "react";
import Blogs from "./Blogs"


const Home = () => {
  const [category, setCategory] = useState("all")
  const [loading, Setloading] = useState(true)
 
  const categroy = [
    { id: 1, name: "all" }, { id: 2, name: "technology" }, { id: 3, name: "travel" }, { id: 4, name: "food" }
  ]



  return (
  <> 
  


      <div className="flex flex-col justify-center gap-9 mt-10">
        {
          !loading &&
          <div className="flex mt-5  sm:justify-evenly  justify-center flex-wrap gap-5 mx-5 sm:mx:0 sm:gap-0 ">
            {
              categroy.map((data) => {
                return <button key={data.id} className={` px-3 py-1 rounded-3xl sm:text-base text-sm   uppercase font-Bitter ${data.name === category ? " bg-yellow-400 text-blue " : " text-white bg-gray-500"}`} onClick={() => setCategory(data.name)}> {data.name}</button>
              })
            }
          </div>
        }
        <Blogs category={category}
          loading={loading}
          Setloading={Setloading}
          />
      </div>
    </>
  )
}

export default Home