import React from 'react'
import Leftbar from './Components/Leftbar/page'

export default function Page() {
  return (
    <div className='grid grid-cols-5 gap-1'>
      <div className=' p-4 text-center'>
        <Leftbar/>
      </div>
      <div className='bg-gray-500 p-4 text-center col-span-3'>2</div>
      <div className='bg-gray-300 p-4 text-center'>3</div>
    </div>
  )
}


