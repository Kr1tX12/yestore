import React from 'react'

const ErrorMessage = ({ errorMessage }: {errorMessage: string | null }) => {
  return (
    errorMessage && <p className="text-red-400">{errorMessage}</p>
  )
}

export default ErrorMessage