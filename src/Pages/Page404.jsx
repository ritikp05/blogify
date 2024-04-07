import { Link } from "react-router-dom";

const Page404 = () => {
  return (<>
    <div className="flex items-center gap-1 justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Page</h1>
        <p className="text-lg text-gray-700">Oops! Page not found.</p>
        <Link to="/" className="text-blue-500 text-xl mt-4  hover:text-blue-700">
          Go back to Home
        </Link>
      
      </div>
    </div>
  </>
  )
}

export default Page404;