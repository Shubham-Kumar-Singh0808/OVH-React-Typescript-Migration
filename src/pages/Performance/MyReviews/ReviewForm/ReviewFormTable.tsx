import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import ReviewFormEntry from './ReviewFormEntry'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ReviewFormTable = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedEmpId, setSelectedEmpId] = useState<number>(Number(employeeId))

  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )
  const isButtonsVisible = useTypedSelector(
    reduxServices.myReview.selectors.isButtonsVisible,
  )

  return (
    <>
      <CTable responsive striped className="mt-3 align-middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell>KRA Name</CTableHeaderCell>
            <CTableHeaderCell>Weightage(%)</CTableHeaderCell>
            <CTableHeaderCell>No.of KPIs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {appraisalForm &&
            appraisalForm?.kra?.map((kra, index) => (
              <ReviewFormEntry
                id={kra.id}
                key={index}
                selectedEmployeeId={Number(selectedEmpId)}
                setSelectedEmployeeId={setSelectedEmpId}
                isIconVisible={isIconVisible}
                setIsIconVisible={setIsIconVisible}
                employeeKRA={kra}
              />
            ))}
        </CTableBody>
      </CTable>
      {isButtonsVisible && (
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton className="btn-ovh me-1" color="success">
              Save
            </CButton>
            <CButton color="success " className="btn-ovh" disabled>
              Submit
            </CButton>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default ReviewFormTable
