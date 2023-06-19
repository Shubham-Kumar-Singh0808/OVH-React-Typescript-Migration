import {
  IncomingMyReviewAppraisalForm,
  IncomingMyReviewKRA,
  IncomingPerformanceRating,
  MyReviewAppraisalFormStatus,
  MyReviewFormStatus,
  MyReviewKPI,
  MyReviewKraKpiIndexes,
  MyReviewUpdateRoleEnum,
  MyReviewUpdateTypeEnum,
  UpdateMyReviewFieldsDTO,
} from '../../../types/Performance/MyReview/myReviewTypes'

export const initialMyReviewKRA: IncomingMyReviewKRA = {
  id: -1,
  name: '',
  description: null,
  count: -1,
  designationKraPercentage: -1,
  kpis: [],
}

export const initialPerformanceRating: IncomingPerformanceRating = {
  label: null,
  id: -1,
  rating: -1,
}

export const getKpiKraIndexesFromList = (
  kraList: IncomingMyReviewKRA[],
  kraId: number,
  kpiId: number,
): MyReviewKraKpiIndexes => {
  // searching for kra
  const searchedKraIndex = kraList.findIndex((kra) => kra.id === kraId)
  if (searchedKraIndex !== -1) {
    // if kra is found
    //searching for kpi in that kra
    const searchedKpiIndex = kraList[searchedKraIndex].kpis.findIndex(
      (kpi) => kpi.id === kpiId,
    )
    if (searchedKpiIndex !== -1) {
      // if kpi is found
      // returning the indices of the kra and kpi found
      return {
        kraIndex: searchedKraIndex,
        kpiIndex: searchedKpiIndex,
      }
    }
  }
  // don't exist. returing undefined
  return {
    kraIndex: undefined,
    kpiIndex: undefined,
  }
}

export const getFinalRatingValue = (ratingString: number): number | null => {
  return ratingString === initialPerformanceRating.rating ? null : +ratingString
}

export const getFinalCommentsValue = (comments: string): string | null => {
  return comments.trim().length === 0 ? null : comments
}

export const getUpdatedMyReviewKraList = (
  initialKraList: IncomingMyReviewKRA[],
  allData: UpdateMyReviewFieldsDTO,
): IncomingMyReviewKRA[] => {
  // destructuring the incoming data
  const { data, updateType, updateRole } = allData
  const { kraId, kpiId, updatedValue } = data

  // getting the indexes of the updated kpi and its kra
  const { kraIndex, kpiIndex } = getKpiKraIndexesFromList(
    initialKraList,
    kraId,
    kpiId,
  )
  const kraListCopy = [...initialKraList]
  // if the kra and its kpi exist
  if (kraIndex !== undefined && kpiIndex !== undefined) {
    const kpiListCopy = kraListCopy[kraIndex].kpis
    // if we are to update for the employee
    if (updateRole === MyReviewUpdateRoleEnum.employee) {
      // if employee rating is to be updated
      if (updateType === MyReviewUpdateTypeEnum.Rating) {
        kpiListCopy[kpiIndex] = {
          ...kpiListCopy[kpiIndex],
          employeeRating: getFinalRatingValue(+updatedValue),
        }
      } else {
        // if employee comments is to be updated
        kpiListCopy[kpiIndex] = {
          ...kpiListCopy[kpiIndex],
          employeeFeedback: getFinalCommentsValue(updatedValue),
        }
      }
    }
    // if we are to update for manager
    else if (updateRole === MyReviewUpdateRoleEnum.manager) {
      // if manager rating is to be updated
      if (updateType === MyReviewUpdateTypeEnum.Rating) {
        kpiListCopy[kpiIndex] = {
          ...kpiListCopy[kpiIndex],
          managerRating: getFinalRatingValue(+updatedValue),
        }
      } else {
        // if manager comments is to be updated
        kpiListCopy[kpiIndex] = {
          ...kpiListCopy[kpiIndex],
          managerFeedback: getFinalCommentsValue(updatedValue),
        }
      }
    }
    kraListCopy[kraIndex] = {
      ...kraListCopy[kraIndex],
      kpis: kpiListCopy,
    }
    return kraListCopy
  }
  return kraListCopy
}

// it returns true if the conditions are satisfied i.e. the button is enabled
export const checkIfEmployeeSubmitButtonIsEnabled = (
  kraList: IncomingMyReviewKRA[],
): boolean => {
  for (let i = 0; i < kraList.length; i++) {
    // checking if any other data that is required is missing or not
    const notSatisfiedKPIs = kraList[i].kpis.filter(
      (kpi) =>
        kpi.employeeRating === null ||
        kpi.employeeFeedback === null ||
        kpi.employeeFeedback.trim().length < 50,
    )
    if (notSatisfiedKPIs.length > 0) {
      // some required data is not entered by the employee
      return false
    }
  }
  return true
}

// it returns true if the conditions are satisfied i.e. the button is enabled
export const checkIfManagerSubmitButtonIsEnabled = (
  kraList: IncomingMyReviewKRA[],
): boolean => {
  for (let i = 0; i < kraList.length; i++) {
    // checking if any other data that is required is missing or not
    const notSatisfiedKPIs = kraList[i].kpis.filter(
      (kpi) =>
        kpi.managerRating === null ||
        kpi.managerFeedback === null ||
        kpi.managerFeedback.trim().length < 50,
    )
    if (notSatisfiedKPIs.length > 0) {
      // some required data is not entered by the manager
      return false
    }
  }
  return true
}

// once the manager has submitted the ratings, the employee can see this even after completion
export const canEmployeeViewAfterManagerSubmit = (
  myReviewFormStatus: string,
  appraisalFormStatus: string | null,
): boolean => {
  return (
    (myReviewFormStatus === MyReviewFormStatus.pendingagreement ||
      myReviewFormStatus === MyReviewFormStatus.openForDiscussion ||
      myReviewFormStatus === MyReviewFormStatus.completed) &&
    appraisalFormStatus !== MyReviewAppraisalFormStatus.NotSubmittedByYou
  )
}

export const getKpisOfKraByKraIndex = (
  list: IncomingMyReviewAppraisalForm,
  kraIndex: number,
): MyReviewKPI[] => {
  return list.kra[kraIndex].kpis
}

export const generateMyReviewTestId = (data: string): string => {
  return `myReview-${data}`
}

export const myReviewTestComments =
  'This is testComment.This is testComment.This is testComment.This is testComment.This is testComment.This is testComment.'
