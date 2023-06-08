import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import ReviewFormEntry from './ReviewFormEntry'
import EmployeeViewButtons from './EmployeeViewButtons'
import ManagerViewButtons from './ManagerViewButtons'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { KPI } from '../../../../types/Performance/MyReview/myReviewTypes'

const ReviewFormTable = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedEmpId, setSelectedEmpId] = useState<number>(Number(employeeId))
  const [KPIDetails, setKPIDetails] = useState<KPI[]>()
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(false)
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

  const updatedAppraisalForm = useTypedSelector(
    reduxServices.myReview.actions.updateKPI,
  )
  useEffect(() => {
    if (KPIDetails) {
      setIsSubmitButtonDisabled(true)
    } else {
      setIsSubmitButtonDisabled(false)
    }
  }, [KPIDetails])
  console.log(appraisalForm.kra)
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
        kra: appraisalForm.kra,
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
    dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
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
        formStatus: 'SAVE',
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
        kra: appraisalForm.kra,
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
        formStatus: 'SUBMIT',
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

  // eslint-disable-next-line sonarjs/no-identical-functions
  const saveManagerAppraisalFormHandler = () => {
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
        kra: appraisalForm.kra,
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
        formStatus: 'PENDING',
        formStatusvalue: appraisalForm.formStatusvalue,
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
    // dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
    // dispatch(reduxServices.myReview.getReviewComments(appraisalFormId))
    // dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
  }
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
  console.log(appraisalForm?.formStatusvalue)

  const submitManagerAppraisalFormHandler = () => {
    console.log('testing')
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
      <>
        {Number(appraisalForm?.formStatusvalue) >= 1 ? (
          ''
        ) : (
          <ManagerViewButtons
            saveManagerAppraisalFormHandler={saveManagerAppraisalFormHandler}
            submitManagerAppraisalFormHandler={
              submitManagerAppraisalFormHandler
            }
            // isSubmitButtonDisabled={isSubmitButtonDisabled}
          />
        )}
        {Number(appraisalForm?.formStatusvalue) >= 1 ? (
          ''
        ) : (
          <EmployeeViewButtons
            saveEmployeeAppraisalFormHandler={saveEmployeeAppraisalFormHandler}
            submitAppraisalFormHandler={submitAppraisalFormHandler}
            isSubmitButtonDisabled={isSubmitButtonDisabled}
          />
        )}
      </>
    </>
  )
}

export default ReviewFormTable
