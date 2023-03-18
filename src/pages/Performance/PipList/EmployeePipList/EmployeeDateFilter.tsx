import React from 'react'
import EmployeePipList from './EmployeePipList'
import EmployeePIPListContext from './EmployeePIPListContext'
import EmployeePIPClearenceCertificate from '../EmployeePIPClearenceCertificate/EmployeePIPClearenceCertificate'

const EmployeeDateFilter = () => {
  return (
    <EmployeePIPListContext>
      <EmployeePipList />
      <EmployeePIPClearenceCertificate />
    </EmployeePIPListContext>
  )
}

export default EmployeeDateFilter
