import React from 'react'
import { Redirect } from 'react-router-dom'

const ProtectRoute = ({
  children,
  callback,
  redirectTo,
}: {
  children: JSX.Element
  callback: (token: string | null) => boolean
  redirectTo: string
}): JSX.Element => {
  // console.log(JSON.stringify(localStorage))
  const token = localStorage.getItem('token')
  // console.log(token)

  return callback(token) ? children : <Redirect to={redirectTo} />
}

export default ProtectRoute
