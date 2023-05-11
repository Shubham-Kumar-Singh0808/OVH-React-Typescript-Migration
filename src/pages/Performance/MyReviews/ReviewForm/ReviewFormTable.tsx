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
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const ReviewFormTable = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedEmpId, setSelectedEmpId] = useState<number>(Number(employeeId))
  const dispatch = useAppDispatch()
  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )
  const isButtonsVisible = useTypedSelector(
    reduxServices.myReview.selectors.isButtonsVisible,
  )
  const appraisalFormId = useTypedSelector(
    reduxServices.myReview.selectors.appraisalFormId,
  )
  const saveEmployeeAppraisalFormHandler = () => {
    dispatch(
      reduxServices.myReview.saveAppraisalForm({
        adjustedAvgRating: null,
        appraisalCycle: {
          active: true,
          appraisalDuration: appraisalForm.appraisalCycle.appraisalDuration,
          appraisalEndDate: appraisalForm.appraisalCycle.appraisalEndDate,
          appraisalStartDate: appraisalForm.appraisalCycle.appraisalStartDate,
          appraisalType: appraisalForm.appraisalCycle.appraisalType,
          cycleStartedFlag: appraisalForm.appraisalCycle.cycleStartedFlag,
          description: appraisalForm.appraisalCycle.description,
          fromDate: appraisalForm.appraisalCycle.fromDate,
          id: appraisalForm.appraisalCycle.id,
          level: appraisalForm.appraisalCycle.level,
          name: appraisalForm.appraisalCycle.name,
          servicePeriod: appraisalForm.appraisalCycle.servicePeriod,
          toDate: appraisalForm.appraisalCycle.toDate,
        },
        avgRatingsDtos: appraisalForm.avgRatingsDtos,
        employee: appraisalForm.employee,
        kra: appraisalForm?.kra,
        appraisalFormStatus: null,
        closedBy: null,
        closedOn: null,
        closedStatus: null,
        closedSummary: null,
        discussionOn: null,
        discussionSummary: null,
        empAvgRating: null,
        empAvgRatingName: null,
        empDepartmentName: null,
        empDesignationName: null,
        finalFeedback: null,
        finalRating: null,
        finalRatingName: null,
        formRating: null,
        formStatus: 'SAVE',
        formStatusvalue: 0,
        iAgreeFlag: null,
        id: appraisalForm.id,
        kpis: null,
        manager1Name: null,
        openForDiscussionFlag: null,
        overallAvgRating: 'NaN',
        overallAvgRatingName: null,
        pendingWith: null,
        requestDiscussion: false,
      }),
    )
    dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
    dispatch(reduxServices.myReview.getReviewComments(appraisalFormId))
  }
  const submitAppraisalFormHandler = () => {
    dispatch(
      reduxServices.myReview.submitAppraisalFormForRating({
        adjustedAvgRating: null,
        appraisalCycle: {
          active: true,
          appraisalDuration: appraisalForm.appraisalCycle.appraisalDuration,
          appraisalEndDate: appraisalForm.appraisalCycle.appraisalEndDate,
          appraisalStartDate: appraisalForm.appraisalCycle.appraisalStartDate,
          appraisalType: appraisalForm.appraisalCycle.appraisalType,
          cycleStartedFlag: appraisalForm.appraisalCycle.cycleStartedFlag,
          description: appraisalForm.appraisalCycle.description,
          fromDate: appraisalForm.appraisalCycle.fromDate,
          id: appraisalForm.appraisalCycle.id,
          level: appraisalForm.appraisalCycle.level,
          name: appraisalForm.appraisalCycle.name,
          servicePeriod: appraisalForm.appraisalCycle.servicePeriod,
          toDate: appraisalForm.appraisalCycle.toDate,
        },
        appraisalFormStatus: null,
        avgRatingsDtos: appraisalForm.avgRatingsDtos,
        closedBy: null,
        closedOn: null,
        closedStatus: null,
        closedSummary: null,
        discussionOn: null,
        discussionSummary: null,
        empAvgRating: null,
        empAvgRatingName: null,
        empDepartmentName: null,
        empDesignationName: null,
        employee: appraisalForm.employee,
        finalFeedback: null,
        finalRating: null,
        finalRatingName: null,
        formRating: null,
        formStatus: 'SUBMIT',
        formStatusvalue: 0,
        iAgreeFlag: null,
        id: appraisalForm.id,
        kpis: null,
        kra: appraisalForm.kra,
        manager1Name: null,
        openForDiscussionFlag: null,
        overallAvgRating: 'NaN',
        overallAvgRatingName: null,
        pendingWith: null,
        requestDiscussion: false,
      }),
    )
    dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
    dispatch(reduxServices.myReview.getReviewComments(appraisalFormId))
  }
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
      {/* {isButtonsVisible && ( */}
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            className="btn-ovh me-1"
            color="success"
            onClick={saveEmployeeAppraisalFormHandler}
          >
            Save
          </CButton>
          <CButton
            color="success "
            className="btn-ovh"
            disabled
            onClick={submitAppraisalFormHandler}
          >
            Submit
          </CButton>
        </CCol>
      </CRow>
      {/* )} */}
    </>
  )
}

export default ReviewFormTable
