import React, { useState } from 'react'
import AddNewEmployee from '..'
import ShiftConfiguration from '../ShiftConfiguration/ShiftConfiguration'

const NewEmployeeLandingPage = (): JSX.Element => {
  const [toggleShift, setToggleShift] = useState<boolean>(true)
  return (
    <>
      {toggleShift ? (
        <>
          <AddNewEmployee setToggleShift={setToggleShift} />
        </>
      ) : (
        <>
          <ShiftConfiguration setToggleShift={setToggleShift} />
        </>
      )}
    </>
  )
}

export default NewEmployeeLandingPage
