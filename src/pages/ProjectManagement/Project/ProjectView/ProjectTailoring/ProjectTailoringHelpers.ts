import {
  OutgoingSaveProjectTailoringDocument,
  OutgoingSaveProjectTailoringDocumentInitial,
  ProcessHeadAndSubHeadIndexes,
  ProcessHeadDTO,
  ProcessSubHeadDTO,
  ProjectTailoringStatusEnum,
  ShowHideSubProcessesProps,
  TailoringRequiredSelectOptions,
  TailoringSQAApprovedSelectOptions,
  UpdateProjectTailorDataSliceActionProps,
  UpdateProjectTailoringDataType,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

export const processedString = (count: string | null): string => {
  return count ? count : 'N/A'
}

export const initialShowHideSubProcesses: ShowHideSubProcessesProps = {
  processHeadId: -1,
  processIndex: -1,
}

export const sqaFeatureId = 280
export const managerFeatureId = 281

//sorts the subProcesses in the ascending order based on order to render the data
export const sortSubProcessesInAscendingOrder = (
  list: ProcessSubHeadDTO[],
): ProcessSubHeadDTO[] => {
  const newList = [...list]
  return newList.sort((a, b) => a.order - b.order)
}

export const getSubProcessProcessHeadIndexFromHeadList = (
  list: ProcessHeadDTO[],
  processHeadId: number,
  processSubHeadId: number,
): ProcessHeadAndSubHeadIndexes => {
  //copying the existing data in new array
  const processHeadCopy = [...list]
  // finding the location of process in which the sub process is being edited
  const processIndex = processHeadCopy.findIndex(
    (process) => process.processHeadId === processHeadId,
  )
  if (processIndex !== -1) {
    //copying subProcesses data
    const thisProcessSubProcesses = [
      ...processHeadCopy[processIndex].processSubHeadsDto,
    ]
    // finding the location of the subProcess
    const subProcessIndex = thisProcessSubProcesses.findIndex(
      (subProcess) => subProcess.processSubHeadId === processSubHeadId,
    )
    if (subProcessIndex !== -1) {
      // returning the process head and subhead indices
      return {
        processHeadIndex: processIndex,
        processSubHeadIndex: subProcessIndex,
      }
    }
  }
  // the entered process / sub process is not in the list
  return {
    processHeadIndex: undefined,
    processSubHeadIndex: undefined,
  }
}

// this function used to update manager entered data in the process head list
export const updateManagerInputDataInList = (
  processHeadList: ProcessHeadDTO[],
  data: UpdateProjectTailorDataSliceActionProps,
): ProcessHeadDTO[] => {
  const { processHeadId, processSubHeadId, value, updateType } = data
  // getting the indices of process Head and its sub head
  const { processHeadIndex, processSubHeadIndex } =
    getSubProcessProcessHeadIndexFromHeadList(
      processHeadList,
      processHeadId,
      processSubHeadId,
    )
  const processHeadListCopy = [...processHeadList]
  if (processHeadIndex !== undefined && processSubHeadIndex !== undefined) {
    //copying the subprocess list
    const processSubHeadListCopy = [
      ...processHeadListCopy[processHeadIndex].processSubHeadsDto,
    ]
    // updating the value at the correct index
    if (updateType === UpdateProjectTailoringDataType.Select) {
      // if tailoring status is changed
      processSubHeadListCopy[processSubHeadIndex] = {
        ...processSubHeadListCopy[processSubHeadIndex],
        specificToProject: value,
      }
    } else {
      // if justification is changed
      processSubHeadListCopy[processSubHeadIndex] = {
        ...processSubHeadListCopy[processSubHeadIndex],
        comments: value === '' || undefined ? null : value,
      }
    }
    // updating the process head dto list
    processHeadListCopy[processHeadIndex] = {
      ...processHeadListCopy[processHeadIndex],
      processSubHeadsDto: processSubHeadListCopy,
    }
  }
  // returning the updated list
  return processHeadListCopy
}

// this function used to update sqa entered in the process head list
export const updateSQAEnteredDataInList = (
  processHeadList: ProcessHeadDTO[],
  data: UpdateProjectTailorDataSliceActionProps,
): ProcessHeadDTO[] => {
  const { processHeadId, processSubHeadId, value, updateType } = data
  // getting the indices of process Head and its sub head
  const { processHeadIndex, processSubHeadIndex } =
    getSubProcessProcessHeadIndexFromHeadList(
      processHeadList,
      processHeadId,
      processSubHeadId,
    )
  const processHeadListCopy = [...processHeadList]
  if (processHeadIndex !== undefined && processSubHeadIndex !== undefined) {
    //copying the subprocess list
    const processSubHeadListCopy = [
      ...processHeadListCopy[processHeadIndex].processSubHeadsDto,
    ]
    // updating the value at the correct index
    if (updateType === UpdateProjectTailoringDataType.Select) {
      // if select option is changed
      processSubHeadListCopy[processSubHeadIndex] = {
        ...processSubHeadListCopy[processSubHeadIndex],
        sqaApproval: value,
      }
    } else {
      // if justification is changed
      processSubHeadListCopy[processSubHeadIndex] = {
        ...processSubHeadListCopy[processSubHeadIndex],
        sqaComments: value === '' ? null : value,
      }
    }
    // updating the process head dto list
    processHeadListCopy[processHeadIndex] = {
      ...processHeadListCopy[processHeadIndex],
      processSubHeadsDto: processSubHeadListCopy,
    }
  }
  // returning the updated list
  return processHeadListCopy
}

// once the manager has submitted the document, he/she cannot edit the document until the sqa approves/rejects it
export const isManagerAllowedToEdit = (tailorStatus: string): boolean => {
  return tailorStatus !== ProjectTailoringStatusEnum.submitted
}

// used to get the final data for document initially submitted by manager that is to be submitted to the api
export const getSaveProjectTailoringDocumentInitialManagerFinalData = (
  list: ProcessHeadDTO[],
  projectId: string,
  tailorStatus: ProjectTailoringStatusEnum,
): OutgoingSaveProjectTailoringDocumentInitial => {
  return {
    processHeaddto: list,
    projectId,
    tailoringStatus: tailorStatus.toString(),
  }
}

// for the documents that are submitted by managers, approved/rejected by managers
export const getSaveProjectTailoringDocumentFinalData = (
  list: ProcessHeadDTO[],
  projectId: string,
  tailorStatus: ProjectTailoringStatusEnum,
  id: number,
): OutgoingSaveProjectTailoringDocument => {
  return {
    ...getSaveProjectTailoringDocumentInitialManagerFinalData(
      list,
      projectId,
      tailorStatus,
    ),
    id,
    rejectComments: null,
  }
}

export const getEnumValueForTailorStatus = (
  tailor: string,
): ProjectTailoringStatusEnum => {
  if (tailor === ProjectTailoringStatusEnum.saveForManager.toString()) {
    return ProjectTailoringStatusEnum.saveForManager
  }
  if (tailor === ProjectTailoringStatusEnum.approved.toString()) {
    return ProjectTailoringStatusEnum.approved
  }
  if (tailor === ProjectTailoringStatusEnum.rejected.toString()) {
    return ProjectTailoringStatusEnum.rejected
  }
  if (tailor === ProjectTailoringStatusEnum.updated.toString()) {
    return ProjectTailoringStatusEnum.updated
  }
  if (tailor === ProjectTailoringStatusEnum.submitted.toString()) {
    return ProjectTailoringStatusEnum.submitted
  }
  return ProjectTailoringStatusEnum.initial
}

// to check if the manager submit button must be enabled. For selected yes/waived off they must write justification
export const checkManagerSubmitButtonEnabled = (
  processHeadList: ProcessHeadDTO[],
) => {
  for (let i = 0; i < processHeadList?.length; i++) {
    // filtering the list based on options selected - yes / waived off along with comments
    const subProcessesFilteredList = processHeadList[
      i
    ].processSubHeadsDto.filter(
      (subProcess) =>
        (subProcess.specificToProject ===
          TailoringRequiredSelectOptions.WaivedOff.toString() ||
          subProcess.specificToProject ===
            TailoringRequiredSelectOptions.Yes.toString()) &&
        (subProcess.comments === null ||
          subProcess.comments.trim().length < 50),
    )
    if (subProcessesFilteredList.length > 0) {
      //button must be disabled
      return false
    }
  }
  // button must be enabled
  return true
}

// to check if approve button of sqa is enabled or not
export const checkSQAApprovedButtonEnabled = (
  processHeadList: ProcessHeadDTO[],
): boolean => {
  // filtering the list based on options selected - approved
  for (let i = 0; i < processHeadList?.length; i++) {
    const subProcessesFilteredList = processHeadList[
      i
    ].processSubHeadsDto.filter(
      (subProcess) =>
        subProcess.sqaApproval !== null &&
        subProcess.sqaApproval === TailoringSQAApprovedSelectOptions.Rejected,
    )
    if (subProcessesFilteredList.length > 0) {
      // button is disabled
      return false
    }
  }
  //button is enabled
  return true
}

export const getProcessedDescription = (
  desc: string | null,
): string | undefined => {
  return desc ? desc : undefined
}

export const checkSQARejectedButtonEnabled = (
  processHeadList: ProcessHeadDTO[],
) => {
  // filtering the list based on options selected - rejected
  for (let i = 0; i < processHeadList?.length; i++) {
    const subProcessesFilteredList = processHeadList[
      i
    ].processSubHeadsDto.filter(
      (subProcess) =>
        subProcess.sqaApproval !== null &&
        subProcess.sqaApproval === TailoringSQAApprovedSelectOptions.Rejected,
    )
    const commentsNotGivenList = subProcessesFilteredList.filter(
      (subProcess) =>
        subProcess.sqaComments === null ||
        subProcess.sqaComments.trim().length < 10,
    )
    if (commentsNotGivenList.length > 0) {
      // button is disabled
      return false
    }
  }
  //button is enabled
  return true
}
