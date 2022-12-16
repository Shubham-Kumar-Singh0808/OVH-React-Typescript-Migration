import {
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { ITForm } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ITDeclarationFormViewTable = ({
  viewDeclarationForm,
}: {
  viewDeclarationForm: ITForm[]
}): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">
          Deduction available for Salaried employees under Income Tax Act 1961{' '}
        </h4>
      </CCardHeader>
      <CTable striped responsive className="mt-3 align-middle alignment">
        <CTableHead>
          <CTableRow className="text-start">
            <CTableHeaderCell scope="col">Sections</CTableHeaderCell>
            <CTableHeaderCell scope="col">Investment</CTableHeaderCell>
            <CTableHeaderCell scope="col">Saving Amount</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody></CTableBody>
      </CTable>
    </>
  )
}

export default ITDeclarationFormViewTable
