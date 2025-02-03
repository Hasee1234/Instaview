import React from 'react'

export default function Page() {
  return (
    <div className='grid grid-cols-5 gap-1'>
      <div className='bg-gray-300 p-4 text-center'>1</div>
      <div className='bg-gray-500 p-4 text-center col-span-3'>2</div>
      <div className='bg-gray-300 p-4 text-center'>3</div>
    </div>
  )
}
