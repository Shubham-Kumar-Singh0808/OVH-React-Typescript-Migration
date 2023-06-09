import React, { useState } from 'react'
import AddEditCandidateTemplate from '../AddEditCandidateTemplate/AddEditCandidateTemplate'

const AddCandidate = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [aadharNumber, setAadharNumber] = useState<string>('')
  const [panNumber, setPanNumber] = useState<string>('')
  const [appliedFor, setAppliedFor] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const firstNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value?.trim())
  }

  const lastNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value?.trim())
  }

  return (
    <AddEditCandidateTemplate
      firstName={firstName}
      firstNameChangeHandler={firstNameChangeHandler}
      lastName={lastName}
      lastNameChangeHandler={lastNameChangeHandler}
    />
  )
}

export default AddCandidate
