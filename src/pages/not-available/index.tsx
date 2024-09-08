import CustomLayout from "../../components/layout/custom-layout/CustomLayout"

const index = ({servicename}:{servicename?:string}) => {
  return (
    <CustomLayout>
        <section className="flex h-screen items-center justify-center flex-col">
            <img className="h-52 w-52 object-cover" src="/vector.jpg"/>
            <h1 className=" font-semibold text-center text-3xl text-blue-400">
               {servicename} will be available soon!
            </h1>
        </section>
    </CustomLayout>
  )
}

export default index