import React from 'react'
import { FaMoon } from 'react-icons/fa6';

const Theme = () => {
  return (
    <button className='text-neutral-100 text-lg w-10 h-10 rounded-full bg-neutral-800/80 flex items-center justify-center'>
      <FaMoon />
    </button>
  );
}

export default Theme;