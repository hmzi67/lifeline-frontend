import React from "react";
import ImageError1 from "../../assets/images/error/error_mountain.svg"
import ImageError2 from "../../assets/images/error/error_people.svg"
import ImageError3 from "../../assets/images/error/error_robot.svg"
import ImageError4 from "../../assets/images/error/error_monster.svg"
import {Link} from "react-router-dom";

type ErrorType = 'error1' | 'error2' | 'error3' | 'error4'

interface ErrorPageProp {
  type: ErrorType
}

const ErrorPage: React.FC<ErrorPageProp> = ({ type }) => {
  const getErrorContent = () => {
    switch (type) {
      case 'error1':
        return { image: ImageError1 }
      case 'error2':
        return { image: ImageError2 }
      case 'error3':
        return { image: ImageError3 }
      case 'error4':
        return { image: ImageError4 }
      default:
        return {
          image: ImageError3
        }
    }
  }

  const { image } = getErrorContent()

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-16 flex justify-center">
              <img
                  src={image}
                  alt="404 Error Illustration"
                  className="w-full max-w-md sm:max-w-lg h-auto object-contain drop-shadow-lg"
              />
            </div>

            <Link to={"/"}  className={type === "error4" ? "bg-teal-200 hover:bg-teal-300 text-gray-800 font-bold py-2 px-4 rounded-full border-b-2 border-teal-500 hover:border-teal-600 transition duration-300 ease-in-out" : "hidden"}>
              Bring Me Home
            </Link>
          </div>


        </main>
      </div>
  )
}


export default ErrorPage
