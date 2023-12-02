import React, { useEffect, useMemo, useState } from 'react'
import { statuses } from '@/lib/filterData'
const Status = ({ selectedStatus, setSelectedStatus, onChange, show }) => {
  const handleChange = async (e) => {
    console.log('selectedStatus handleChange called')
    if (e.target.checked) {
      /*
       * if checked => set value into state
       */
      setSelectedStatus(e.target.value)
    } else {
      /*
       * if Not Checked => Remoce value From state
       */
      setSelectedStatus(null)
    }
  }

  useEffect(() => {
    // This effect will run whenever selectedGenres changes
    onChange()
  }, [selectedStatus])

  return (
    <>
      {show && (
        <div className='flex flex-col h-[50px] absolute w-full z-50'>
          <div
            className={`flex flex-wrap md:justify-center gap-1 p-1 text-white ${
              !show && 'opacity-0'
            } bg-teal-500 rounded-md transition-opacity duration-300 ease-in-out`}
          >
            {statuses.map((status, idx) => {
              return (
                <div
                  key={idx}
                  className='flex items-center pt-1 px-2 text-[14px] w-[49%] md:w-auto'
                >
                  <div className='inline-flex items-center'>
                    <label
                      className='relative flex items-center p-2 rounded-full cursor-pointer'
                      htmlFor='checkbox-2'
                      data-ripple-dark='true'
                    >
                      <input
                        type='checkbox'
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                        id='checkbox-2'
                        // onChange={(e) => handleChange(e)}
                        onChange={(e) => handleChange(e)}
                        value={status.label}
                        checked={selectedStatus === status.label}
                      />
                      <div className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-3.5 w-3.5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          stroke='currentColor'
                          strokeWidth='1'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </div>
                    </label>
                  </div>
                  <p>{status.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Status
