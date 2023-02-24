import React, { useEffect, useState } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import AddProjectRequestForm from './AddProjectRequestForm'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  AddProjectRequestDetails,
  Chelist,
  ProjectRequestMilestoneDTO,
} from '../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'

const AddProjectRequest = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectManagement.getProjectClients())
    dispatch(reduxServices.projectManagement.getAllDomains())
    dispatch(reduxServices.projectManagement.getAllManagers())
    dispatch(reduxServices.projectManagement.getAllPlatforms())
    dispatch(reduxServices.addProjectCreationRequest.getProjectRequestMailIds())
    dispatch(reduxServices.addProjectCreationRequest.getCheckList())
    dispatch(
      reduxServices.newEmployee.reportingManagersService.getAllReportingManagers(),
    )
  }, [dispatch])
  const projectRequestMailIds = useTypedSelector(
    reduxServices.addProjectCreationRequest.selectors.projectRequestMailIds,
  )
  const checkListDetails = {} as Chelist[]
  const [checkList, setCheckList] = useState(checkListDetails)
  const projectRequestMilestoneDTODetails = {} as ProjectRequestMilestoneDTO[]
  const initProjectRequest = {
    bcc: projectRequestMailIds.bcc,
    billingContactPerson: '',
    billingContactPersonEmail: '',
    cc: projectRequestMailIds.cc,
    chelist: checkListDetails,
    client: '',
    description: '',
    domain: '',
    enddate: '',
    intrnalOrNot: false,
    managerId: 0,
    model: '',
    platform: '',
    projectContactEmail: '',
    projectContactPerson: '',
    projectName: '',
    projectRequestMilestoneDTO: projectRequestMilestoneDTODetails,
    requiredResources: '',
    startdate: '',
    status: 'Pending Approval',
    technology: '',
    type: '',
  } as AddProjectRequestDetails

  const [projectRequest, setProjectRequest] = useState(initProjectRequest)
  const [projectMileStone, setProjectMileStone] = useState<
    ProjectRequestMilestoneDTO[]
  >([
    {
      id: Math.floor(Math.random() * 10000),
      billable: '',
      comments: '',
      effort: '',
      fromDate: '',
      milestonePercentage: '',
      title: '',
      toDate: '',
      buttonType: 'Add',
    },
  ])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Request Project"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1 add-project-back-btn"
              data-testid="toggle-back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <AddProjectRequestForm
          setToggle={setToggle}
          projectRequest={projectRequest}
          setProjectRequest={setProjectRequest}
          checkList={checkList}
          setCheckList={setCheckList}
          projectMileStone={projectMileStone}
          setProjectMileStone={setProjectMileStone}
        />
      </OCard>
    </>
  )
}

export default AddProjectRequest
