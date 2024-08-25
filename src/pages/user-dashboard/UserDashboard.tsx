import React from 'react'
import CustomLayout from '../../components/layout/CustomLayout'

type Props = {}

const UserDashboard = (props: Props) => {
  return (
    <CustomLayout>
    <div className="p-5">
      <h1 className='text-3xl font-semibold'>Hello user 👋</h1>
    </div>
    </CustomLayout>
  )
}

export default UserDashboard