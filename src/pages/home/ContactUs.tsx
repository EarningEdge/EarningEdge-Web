import { Link } from 'react-router-dom'
const ContactUs = ({firstName}:{firstName:string}) => {
  return (
    <div className="text-white mt-2 border-[0.4px] border-darkStroke p-2  flex-col md:flex-row rounded-md flex md:space-x-1 md:items-center py-4 space-y-1 md:space-y-0">
    <h1>Hi {firstName.charAt(0).toUpperCase()+firstName.slice(1)}! </h1>
    <p> Have any queries?</p>
    <p>
      Feel free to{" "}
      <Link
        className="bg-white text-black px-3 py-2 rounded-md"
        to={"/contact"}
      >
        Contact us
      </Link>
    </p>
  </div>
  )
}

export default ContactUs