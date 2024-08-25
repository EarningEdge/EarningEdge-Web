type Props = {}

const UserSignup = (props: Props) => {
  const handleEmailSubmit = () => {
    

    window.location.href = "/confirm-email"
  }

  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">Create an<br /> <b>Account</b></h1>
        <p>Email</p>
        <input type="email" className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full" placeholder="name@company.com"/>
        <button className="text-xl rounded-md font-semibold bg-white text-black p-3" onClick={handleEmailSubmit}>
          Next
        </button>
      </div>
    </div>
  )
}

export default UserSignup