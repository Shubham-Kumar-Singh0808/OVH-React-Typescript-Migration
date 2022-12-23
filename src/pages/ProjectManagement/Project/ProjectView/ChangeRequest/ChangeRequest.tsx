import React, { useState } from 'react'
import ChangeRequestTable from './ChangeRequestTable'
import AddEditChangeRequest from './AddEditChangeRequest'
import OAddButton from '../../../../../components/ReusableComponent/OAddButton'

const ChangeRequest = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OAddButton addButtonHandler={() => setToggle('addChangeRequest')} />
          <ChangeRequestTable />
        </>
      )}
      {toggle === 'addChangeRequest' && (
        <AddEditChangeRequest setToggle={setToggle} />
      )}
    </>
  )
}

export default ChangeRequest
