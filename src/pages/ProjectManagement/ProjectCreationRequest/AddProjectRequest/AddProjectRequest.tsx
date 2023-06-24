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
import OToast from '../../../../components/ReusableComponent/OToast'

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

  const [projectManager, setProjectManager] = useState<string>('')
  const [projectName, setProjectName] = useState<string>('')
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [descriptionError, setDescriptionError] = useState(false)
  const [customerContactName, setCustomerContactName] = useState<string>('')
  const [billingContactName, setBillingContactName] = useState<string>('')
  const [isAddBtnEnable, setIsAddBtnEnable] = useState(false)
  const [checkListValid, setCheckListValid] = useState<boolean>(false)
  const [isAddMilestoneButtonEnabled, setIsAddMileStoneButtonEnabled] =
    useState(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [billingContactPersonEmailError, setBillingContactPersonEmailError] =
    useState<boolean>(false)
  const [checkList, setCheckList] = useState(checkListDetails)
  const [emailErrorMsgCC, setEmailErrorMsgCC] = useState(false)
  const [emailErrorMsgBCC, setEmailErrorMsgBCC] = useState(false)

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

  useEffect(() => {
    if (
      projectRequest.client !== '' &&
      projectRequest.client != null &&
      projectRequest.projectName !== '' &&
      projectRequest.projectName != null &&
      projectRequest.projectContactPerson !== '' &&
      projectRequest.projectContactPerson !== null &&
      projectRequest.projectContactEmail !== null &&
      projectRequest.projectContactEmail !== '' &&
      projectRequest.type !== '' &&
      projectRequest.type != null &&
      projectRequest.managerId !== -1 &&
      projectRequest.managerId != null &&
      projectRequest.startdate !== '' &&
      projectRequest.startdate != null &&
      projectRequest.platform !== '' &&
      projectRequest.platform != null &&
      projectRequest.domain !== '' &&
      projectRequest.domain != null &&
      projectRequest.technology !== '' &&
      projectRequest.technology != null &&
      projectRequest.description?.length > 57 &&
      projectRequest.description?.length > 57 != null &&
      !emailError &&
      !billingContactPersonEmailError
    ) {
      setIsAddBtnEnable(true)
    } else {
      setIsAddBtnEnable(false)
    }
  }, [projectRequest])

  const handleClear = () => {
    setProjectManager('')
    setProjectName('')
    setProjectRequest(initProjectRequest)
    setShowEditor(false)
    setShowEditor(false)
    setEmailErrorMsgCC(false)
    setEmailErrorMsgBCC(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setDescriptionError(false)
    setCustomerContactName('')
    setBillingContactName('')
    setCheckList(
      checkList.map((item) => {
        return { ...item, answer: '', comments: '' }
      }),
    )
  }

  const handleSubmitProjectRequest = async () => {
    const payload = {
      ...projectRequest,
      model: projectRequest.model.toUpperCase(),
      type: projectRequest.type.toUpperCase(),
      bcc: projectRequestMailIds.bcc,
      cc: projectRequestMailIds.cc,
      chelist: checkList,
      projectRequestMilestoneDTO:
        projectRequest.type === 'FixedBid'
          ? projectMileStone.map((item) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { buttonType, id, ...rest } = item
              return { ...rest }
            })
          : [],
    }
    const addProjectCreationRequestResultAction = await dispatch(
      reduxServices.addProjectCreationRequest.addProjectRequest(payload),
    )
    if (
      reduxServices.addProjectCreationRequest.addProjectRequest.fulfilled.match(
        addProjectCreationRequestResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="            
            Project request added successfully"
          />,
        ),
      )
      dispatch(
        reduxServices.projectCreationRequest.getAllProjectRequestList({
          endIndex: 20,
          multiSearch: '',
          firstIndex: 0,
        }),
      )
    }
  }

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
        <CRow className="justify-content-end">
          <AddProjectRequestForm
            projectRequest={projectRequest}
            setProjectRequest={setProjectRequest}
            checkList={checkList}
            setCheckList={setCheckList}
            projectMileStone={projectMileStone}
            setProjectMileStone={setProjectMileStone}
            projectManager={projectManager}
            setProjectManager={setProjectManager}
            projectName={projectName}
            setProjectName={setProjectName}
            showEditor={showEditor}
            setShowEditor={setShowEditor}
            descriptionError={descriptionError}
            customerContactName={customerContactName}
            setCustomerContactName={setCustomerContactName}
            billingContactName={billingContactName}
            setBillingContactName={setBillingContactName}
            setCheckListValid={setCheckListValid}
            setDescriptionError={setDescriptionError}
            checkListValid={checkListValid}
            setIsAddMileStoneButtonEnabled={setIsAddMileStoneButtonEnabled}
            isAddMilestoneButtonEnabled={isAddMilestoneButtonEnabled}
            setEmailError={setEmailError}
            setBillingContactPersonEmailError={
              setBillingContactPersonEmailError
            }
            emailError={emailError}
            billingContactPersonEmailError={billingContactPersonEmailError}
            emailErrorMsgCC={emailErrorMsgCC}
            emailErrorMsgBCC={emailErrorMsgBCC}
            setEmailErrorMsgCC={setEmailErrorMsgCC}
            setEmailErrorMsgBCC={setEmailErrorMsgBCC}
          />

          <CRow className="mb-3 align-items-center">
            <CCol sm={{ span: 6, offset: 3 }}>
              <CButton
                className="btn-ovh me-1"
                color="success"
                data-testid="add-project"
                onClick={handleSubmitProjectRequest}
                disabled={
                  !isAddBtnEnable ||
                  emailErrorMsgBCC ||
                  emailErrorMsgCC ||
                  (projectRequest.type === 'FixedBid' &&
                    !isAddMilestoneButtonEnabled) ||
                  checkListValid === false
                }
              >
                Add
              </CButton>
              <CButton
                color="warning"
                className="btn-ovh"
                data-testid="clear-project"
                onClick={handleClear}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CRow>
      </OCard>
    </>
  )
}

export default AddProjectRequest
