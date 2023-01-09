import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import AddProjectMileStone from './AddProjectRequestChildComponents/AddProjectMileStone'
import AddCheckList from './AddProjectRequestChildComponents/AddCheckList'
import OAutoComplete from '../../../../components/ReusableComponent/OAutoComplete'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import { priceModelList } from '../../../../constant/constantData'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { GetList } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  GetAutoCompleteList,
  GetOnSelect,
  ProjectClients,
} from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import {
  AddProjectRequestDetails,
  Chelist,
  ProjectRequestMilestoneDTO,
} from '../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'
import { listComposer, showIsRequired } from '../../../../utils/helper'
import { ClientOrganization } from '../../Project/ProjectComponent/ClientOrganization'
import { ProjectName } from '../../Project/ProjectComponent/ProjectName'
import OInputField from '../../../../components/ReusableComponent/OInputField'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { dateFormat } from '../../../../constant/DateFormat'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddProjectRequestForm = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [projectManager, setProjectManager] = useState<string>('')
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [customerContactName, setCustomerContactName] = useState<string>('')
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const [billingContactName, setBillingContactName] = useState<string>('')
  const [billingContactEmail, setBillingContactEmail] = useState<string>('')
  const [checkListValid, setCheckListValid] = useState<boolean>(false)
  const [isAddMilestoneButtonEnabled, setIsAddMileStoneButtonEnabled] =
    useState(false)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const [showTotalEffort, setShowTotalEffort] = useState<number>(0)
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
  const checkListDetails = {} as Chelist[]
  const [checkList, setCheckList] = useState(checkListDetails)
  const [projectRequestMailIdCC, setProjectRequestMailIdCC] =
    useState<string>('')
  const [projectRequestMailIdBbc, setProjectRequestMailIdBbc] =
    useState<string>('')

  const projectRequestMailIds = useTypedSelector(
    reduxServices.addProjectCreationRequest.selectors.projectRequestMailIds,
  )
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
  const [projectName, setProjectName] = useState<string>('')
  const [isAddBtnEnable, setAddBtn] = useState(false)
  console.log(projectRequestMailIds.bcc)
  const [descriptionError, setDescriptionError] = useState(false)

  const projectClients = useTypedSelector(
    reduxServices.projectManagement.selectors.projectClients,
  )

  const platforms = useTypedSelector(
    reduxServices.projectManagement.selectors.platForms,
  )

  const checkListItems = useTypedSelector(
    reduxServices.addProjectCreationRequest.selectors.checkList,
  )

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
      projectRequest.model !== '' &&
      projectRequest.model != null &&
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
      projectRequest.description?.length > 156 &&
      projectRequest.description?.length > 156 != null &&
      checkListValid
    ) {
      setAddBtn(true)
    } else {
      setAddBtn(false)
    }
  }, [projectRequest])

  useEffect(() => {
    if (checkListItems) setCheckList(checkListItems)
  }, [checkListItems])

  const clientOrganizationList = projectClients
    ?.filter((filterClient: ProjectClients) => filterClient.name != null)
    .map((mapClient) => {
      return {
        id: mapClient.id,
        name: mapClient.name == null ? '' : mapClient.name,
      } as GetAutoCompleteList
    })

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(projectRequest.startdate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(projectRequest.enddate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsGreaterThanStart(moment(end).isBefore(start))
  }, [projectRequest.startdate, projectRequest.enddate])

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const handleAddProjectRequestClientSelect = (value: GetOnSelect) => {
    setProjectRequest({
      ...projectRequest,
      client: value.name,
    })
  }

  const handleAddProjectName = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      projectName: value,
    })
  }

  const handleAddProjectPriceModel = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      type: value,
    })
  }

  const handleIsInternalStatus = (intrnalOrNot: boolean) => {
    setProjectRequest({
      ...projectRequest,
      intrnalOrNot,
    })
  }

  const handleAddProjectType = (value: string) => {
    setProjectRequest({ ...projectRequest, model: value })
  }

  const onHandleProjectRequestEndDate = (value: Date) => {
    setProjectRequest({
      ...projectRequest,
      enddate: moment(value).format(dateFormat),
    })
  }

  const projectTypeList: GetList[] = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Support' },
  ]

  const reportingManagersList = useTypedSelector(
    reduxServices.newEmployee.reportingManagersService.selectors
      .reportingManagersList,
  )

  const domainList = useTypedSelector(
    reduxServices.projectManagement.selectors.domains,
  )

  const projectManagers = reportingManagersList?.map((manager) => {
    return {
      id: manager.id,
      name: manager.fullName,
    } as GetAutoCompleteList
  })

  const handleAddProjectManager = (value: GetOnSelect) => {
    setProjectRequest({ ...projectRequest, managerId: value.id })
    setProjectManager(value.name)
  }

  const onHandleProjectRequestStartDate = (value: Date) => {
    setProjectRequest({
      ...projectRequest,
      startdate: moment(value).format(dateFormat),
    })
  }

  const onHandleRequiredResource = (requiredResources: string) => {
    setProjectRequest((prevState) => {
      return { ...prevState, ...{ requiredResources } }
    })
  }

  const onHandleTechnology = (technology: string) => {
    setProjectRequest((prevState) => {
      return { ...prevState, ...{ technology } }
    })
  }

  const onHandleAddProjectCustomerContactName = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      projectContactPerson: value.replace(/[^a-z\s]$/gi, ''),
    })
  }

  const onHandleAddProjectCustomerEmail = (value: string) => {
    setProjectRequest({ ...projectRequest, projectContactEmail: value })
  }

  const onHandleAddProjectBillingContactName = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      billingContactPerson: value.replace(/[^a-z\s]$/gi, ''),
    })
  }

  const onHandleAddProjectBillingContactEmail = (value: string) => {
    setProjectRequest({ ...projectRequest, billingContactPersonEmail: value })
  }
  const handleAddProjectPlatform = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      platform: value,
    })
  }

  const handleAddProjectDomain = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      domain: value,
    })
  }

  const handleProjectRequestMailIdCC = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectRequest({
      ...projectRequest,
      cc: e.target.value,
    })
    setProjectRequestMailIdCC(e.target.value)
  }
  const handleProjectRequestMailIdBbc = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectRequest({
      ...projectRequest,
      bcc: e.target.value,
    })
    setProjectRequestMailIdBbc(e.target.value)
  }

  useEffect(() => {
    setProjectRequestMailIdCC(projectRequestMailIds.cc)
  }, [projectRequestMailIds])

  useEffect(() => {
    setProjectRequestMailIdBbc(projectRequestMailIds.bcc)
  }, [projectRequestMailIds])

  const classNameStyle = 'col-sm-3 col-form-label text-end'
  const projectDomains = listComposer(domainList as [], 'id', 'name')

  const projectPlatforms = listComposer(platforms as [], 'id', 'name')

  const handleSubmitProjectRequest = async () => {
    const payload = {
      ...projectRequest,
      model: projectRequest.model.toUpperCase(),
      type: projectRequest.type.toUpperCase(),
      bcc: projectRequestMailIds.bcc,
      cc: projectRequestMailIds.cc,
      chelist: checkList,
      projectRequestMilestoneDTO: projectMileStone.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { buttonType, id, ...rest } = item
        return { ...rest }
      }),
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
    }
  }

  const generateAnswers = (option: string) => {
    if (option === 'yes') {
      return { answer1: 'false', answer2: 'false' }
    } else if (option === 'no') {
      return { answer2: 'false', answer3: 'false' }
    } else if (option === 'N/A') {
      return { answer1: 'false', answer3: 'false' }
    }
    return null
  }
  const onChangeRadio = (
    e: React.ChangeEvent<HTMLInputElement>,

    index: number,
  ) => {
    const newMileStone: Chelist[] = JSON.parse(JSON.stringify(checkList))
    newMileStone[index].answer = e.target.value
    const result = generateAnswers(e.target.value)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { answer1, answer2, answer3, ...rest } = newMileStone[index]
    const newList = { ...rest, ...result }
    newMileStone[index] = newList
    console.log(newMileStone)
    setCheckList(newMileStone)
  }

  const commentsOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const newMileStone: Chelist[] = JSON.parse(JSON.stringify(checkList))
    newMileStone[index].comments = e.target.value
    setCheckList(newMileStone)
  }

  const titleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,

    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].title = e.target.value
    setProjectMileStone(newMileStone)
  }

  const effortOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].effort = e.target.value.replace(/[^0-9]/gi, '')
    setProjectMileStone(newMileStone)
  }

  const percentageOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].milestonePercentage = e.target.value
    setProjectMileStone(newMileStone)
  }
  const billableOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].billable = e.target.value
    setProjectMileStone(newMileStone)
  }

  const onChangeHandleFromDate = (date: Date, index: number) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].fromDate = moment(date).format('DD/MM/YYYY')
    setProjectMileStone(newMileStone)
  }

  const onChangeHandleToDate = (date: Date, index: number) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].toDate = moment(date).format('DD/MM/YYYY')
    setProjectMileStone(newMileStone)
  }

  const commentOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,

    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].comments = e.target.value
    setProjectMileStone(newMileStone)
  }

  useEffect(() => {
    const total = projectMileStone?.reduce((prev, current) => {
      return prev + +current.effort
    }, 0)
    setShowTotalEffort(total)
  }, [projectMileStone])

  const handleClear = () => {
    setProjectManager('')
    setProjectName('')
    onHandleDescription('')
    setProjectRequest(initProjectRequest)
    setShowEditor(false)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setDescriptionError(false)
    setCustomerContactName('')
    setCustomerEmail('')
    setBillingContactName('')
    setBillingContactEmail('')
    setCheckList(
      checkList.map((item) => {
        return { ...item, answer: '', comments: '' }
      }),
    )
  }

  useEffect(() => {
    if (checkList) {
      const isValid =
        checkList &&
        checkList?.length &&
        checkList?.every(
          (item) => item?.answer !== null && item?.comments !== null,
        )
      setCheckListValid(isValid as boolean)
    }
  }, [checkList])

  const onHandleDescription = (description: string) => {
    if (description.length > 156) {
      setDescriptionError(false)
    } else {
      setDescriptionError(true)
    }
    setProjectRequest((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }
  const updateMailIdHandler = () => {
    dispatch(
      reduxServices.app.actions.addToast(
        <OToast
          toastColor="success"
          toastMessage="            
        Email Id updated successfully."
        />,
      ),
    )
  }

  useEffect(() => {
    if (projectRequestMailIdCC && projectRequestMailIdBbc) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [projectRequestMailIdCC, projectRequestMailIdBbc])
  return (
    <>
      <CRow className="justify-content-end">
        <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
          <ClientOrganization
            list={clientOrganizationList}
            onSelectHandler={handleAddProjectRequestClientSelect}
            value={projectRequest.client}
          />
          <ProjectName
            onChange={setProjectName}
            onBlur={handleAddProjectName}
            value={projectName}
          />
          <OInputField
            onChangeHandler={setCustomerContactName}
            onBlurHandler={onHandleAddProjectCustomerContactName}
            value={customerContactName}
            isRequired={true}
            label="Customer Contact Name"
            name="projectContactPerson"
            placeholder="Name"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OInputField
            onChangeHandler={setCustomerEmail}
            onBlurHandler={onHandleAddProjectCustomerEmail}
            value={customerEmail}
            isRequired={true}
            type="email"
            label="Customer Email"
            name="projectContactEmail"
            placeholder="Email"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OInputField
            onChangeHandler={setBillingContactName}
            onBlurHandler={onHandleAddProjectBillingContactName}
            value={billingContactName}
            isRequired={false}
            label="Billing Contact Name"
            name="billingContactPerson"
            placeholder="Name"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OInputField
            onChangeHandler={setBillingContactEmail}
            onBlurHandler={onHandleAddProjectBillingContactEmail}
            value={billingContactEmail}
            isRequired={false}
            type="email"
            label="Billing Contact Email"
            name="billingContactPersonEmail"
            placeholder="Name"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OSelectList
            list={priceModelList}
            setValue={handleAddProjectPriceModel}
            value={projectRequest.type}
            isRequired={true}
            label="Pricing Model"
            name="addPricingModel"
            placeHolder="Pricing Model"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <CRow className="mb-3 align-items-center">
            <CCol sm={3} />
            <CCol sm={3}>
              <CFormCheck
                inline
                type="checkbox"
                name="internalProject"
                id="internalProject"
                label="Internal Project"
                onChange={(event) =>
                  handleIsInternalStatus(event.target.checked)
                }
                checked={projectRequest.intrnalOrNot}
              />
            </CCol>
          </CRow>
          <OSelectList
            isRequired={true}
            list={projectTypeList}
            setValue={handleAddProjectType}
            value={projectRequest.model}
            name="addProjectType"
            label="Project Type"
            placeHolder="Project Type"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OAutoComplete
            list={projectManagers}
            onSelect={handleAddProjectManager}
            shouldReset={false}
            value={projectManager}
            isRequired={true}
            label={'Project Manager'}
            placeholder={'Project Manager'}
            name={'projectManager'}
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OSelectList
            isRequired={true}
            list={projectPlatforms}
            setValue={handleAddProjectPlatform}
            value={projectRequest.platform}
            name="platform"
            label="Platform"
            placeHolder="Select Platform"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OSelectList
            isRequired={true}
            list={projectDomains}
            setValue={handleAddProjectDomain}
            value={projectRequest.domain}
            name="domain"
            label="Domain"
            placeHolder="Select Domain"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('addprojectstartdate', classNameStyle)}
            >
              Start Date:
              <span className={showIsRequired(projectRequest.startdate)}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="addprojectstartdate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                data-testid="start-date-picker"
                placeholderText="dd/mm/yy"
                dateFormat="dd/mm/yy"
                name="addprojectstartdate"
                value={projectRequest.startdate}
                onChange={(date: Date) => onHandleProjectRequestStartDate(date)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('addprojectenddate', classNameStyle)}
            >
              End Date:
              <span className={showIsRequired(projectRequest.enddate)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="addprojectenddate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                data-testid="end-date-picker"
                dateFormat="dd/mm/yy"
                name="addprojectenddate"
                value={projectRequest.enddate}
                onChange={(date: Date) => onHandleProjectRequestEndDate(date)}
              />
              <span></span>
            </CCol>
            {isGreaterThanStart && (
              <CCol sm={3}>
                <p style={{ color: 'red' }}>
                  <b>End date should be greater than Start date</b>
                </p>
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              data-testId="selectLabel"
              {...dynamicFormLabelProps('description', classNameStyle)}
            >
              Technology:
              <span className={showIsRequired(projectRequest.technology)}>
                *
              </span>
            </CFormLabel>
            {showEditor && (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={projectRequest?.technology}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onHandleTechnology(editor.getData().trim())
                  }}
                />
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              data-testId="selectLabel"
              {...dynamicFormLabelProps('description', classNameStyle)}
            >
              Required Resources:
            </CFormLabel>
            {showEditor && (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={projectRequest?.requiredResources}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onHandleRequiredResource(editor.getData().trim())
                  }}
                />
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              data-testId="selectLabel"
              {...dynamicFormLabelProps('description', classNameStyle)}
            >
              Description:
              <span className={showIsRequired(projectRequest.description)}>
                *
              </span>
            </CFormLabel>
            {showEditor ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={projectRequest?.description}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onHandleDescription(editor.getData().trim())
                  }}
                />
                {descriptionError && (
                  <p className="text-danger" data-testid="error-msg">
                    Please enter at least 150 characters.
                  </p>
                )}
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Checklist:
              <span className={checkListValid ? 'text-white' : 'text-danger'}>
                *
              </span>
            </CFormLabel>
            <CCol sm={9}>
              <CTable className="add-project-checkList-table">
                {checkList?.length > 0 &&
                  checkList?.map((item, index) => {
                    return (
                      <AddCheckList
                        onChangeRadio={onChangeRadio}
                        commentsOnChange={commentsOnChange}
                        item={item}
                        index={index}
                        key={index}
                      />
                    )
                  })}
              </CTable>
            </CCol>
          </CRow>
        </CCol>
        {projectRequest.type === 'Fixed Bid' && (
          <CRow className="mt-4 mb-4">
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Effort(Hrs)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">From Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Billable</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {projectMileStone.length > 0 &&
                projectMileStone?.map((item, index) => {
                  return (
                    <AddProjectMileStone
                      item={item}
                      key={index}
                      index={index}
                      setProjectMileStone={setProjectMileStone}
                      projectMileStone={projectMileStone}
                      titleOnChange={titleOnChange}
                      commentsOnChange={commentOnChange}
                      effortOnChange={effortOnChange}
                      onChangeHandleFromDate={onChangeHandleFromDate}
                      onChangeHandleToDate={onChangeHandleToDate}
                      billableOnChange={billableOnChange}
                      percentageOnChange={percentageOnChange}
                      setIsAddMileStoneButtonEnabled={
                        setIsAddMileStoneButtonEnabled
                      }
                    />
                  )
                })}
            </CTable>
            {showTotalEffort ? (
              <span>Total Effort:{showTotalEffort} </span>
            ) : (
              <></>
            )}
          </CRow>
        )}
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            CC:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              name="CC"
              id="CC"
              value={projectRequestMailIdCC}
              onChange={(e) => handleProjectRequestMailIdCC(e)}
            />
          </CCol>
          <CFormLabel className="col-sm-1 col-form-label text-end">
            BCC:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              name="BCC"
              id="BCC"
              value={projectRequestMailIdBbc}
              onChange={(e) => handleProjectRequestMailIdBbc(e)}
            />
          </CCol>
          <CCol sm={1}>
            <CButton
              className="btn-ovh me-2"
              color="success"
              onClick={updateMailIdHandler}
              disabled={!isUpdateButtonEnabled}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mb-3 align-items-center">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              data-testid="add-project"
              onClick={handleSubmitProjectRequest}
              disabled={
                !isAddBtnEnable ||
                (projectRequest.type === 'FIXEDBID' &&
                  !isAddMilestoneButtonEnabled)
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
    </>
  )
}

export default AddProjectRequestForm
