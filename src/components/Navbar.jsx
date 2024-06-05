import React from 'react'

const navbar = () => {
  return (
    <nav>
        <div className="navbar flex justify-around bg-indigo-900 text-white py-5">
            <div className="logo">
                <a href="#" className='font-bold'>Todo-Planner</a>
            </div>

            <ol className='flex gap-10 mx-9'>
                <li className='cursor-pointer hover:font-bold transition-all'><a href="#">Your Todo Planner</a></li>
            </ol>
        </div>
    </nav>
  )
}

export default navbar