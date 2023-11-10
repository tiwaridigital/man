'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton(){
  const { pending } = useFormStatus()

  return (
    <button className='bg-amber-50' type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}
