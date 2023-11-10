import React, { useState } from 'react'
import Select from 'react-select'

const Modal = ({ open, setOpen, options }) => {
  // const options = [
  //   { value: 'mangadex', label: 'Mangadex' },
  //   { value: 'asuratoon', label: 'Asuratoon' },
  //   { value: 'toonily', label: 'Toonily' },
  //   { value: 'nettruyen', label: 'Nettruyen' },
  //   { value: 'blogtruyen', label: 'Blogtruyen' },
  // ]

  return (
    <>
      {open && (
        <div
          className='relative z-10'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='flex flex-col justify-between relative h-[70vh] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 mx-auto w-full sm:ml-4 sm:mt-0 sm:text-left'>
                      <h3
                        className='text-xl font-semibold leading-6 mb-2 text-gray-900 text-center'
                        id='modal-title'
                      >
                        Select Source Website
                      </h3>
                      <div className='mt-4'>
                        <Select
                          options={options}
                          placeholder='Select Source...'
                          //   onChange={handleActions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                  >
                    Deactivate
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
