import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react-pro'
import React, { useMemo, useState } from 'react'
import ReviewFormEntry from '../../MyReviews/ReviewForm/ReviewFormEntry'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { KPI } from '../../../../types/Performance/MyReview/myReviewTypes'

const ManagerAppraisalTable = (): JSX.Element => {
  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const [selectedEmpId, setSelectedEmpId] = useState<number>(Number(employeeId))
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [KPIDetails, setKPIDetails] = useState<KPI[]>()
  const sortedAppraisalKPI = useMemo(() => {
    if (appraisalForm?.kra) {
      return appraisalForm?.kra
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    }
    return []
  }, [appraisalForm?.kra])
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
          {sortedAppraisalKPI &&
            sortedAppraisalKPI?.map((kra, index) => (
              <ReviewFormEntry
                id={kra.id}
                key={index}
                selectedEmployeeId={Number(selectedEmpId)}
                setSelectedEmployeeId={setSelectedEmpId}
                isIconVisible={isIconVisible}
                setIsIconVisible={setIsIconVisible}
                employeeKRA={kra}
                KPIDetails={KPIDetails}
                setKPIDetails={setKPIDetails}
              />
            ))}
        </CTableBody>
      </CTable>
      {appraisalForm.appraisalFormStatus !== 'NotSubmittedByYou' ||
      appraisalForm.formStatus === 'COMPLETED' ? (
        ''
      ) : (
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              //   onClick={saveEmployeeAppraisalFormHandler}
            >
              Save
            </CButton>
            <CButton
              color="success "
              className="btn-ovh"
              //   onClick={submitAppraisalFormHandler}
              //   disabled={!isSubmitButtonDisabled}
            >
              Submit
            </CButton>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default ManagerAppraisalTable
