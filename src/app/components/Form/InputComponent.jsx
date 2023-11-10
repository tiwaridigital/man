import React from 'react';

const InputComponent = ({ name, placeholder }) => {
  return (
    <>
      {/*Input*/}
      <div
        className="flex mt-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text" name={name}
          className="block flex-1 border-0 outline-none bg-transparent py-1.5 pl-3 text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
      {/*Input*/}
    </>
  )
}

export default InputComponent
