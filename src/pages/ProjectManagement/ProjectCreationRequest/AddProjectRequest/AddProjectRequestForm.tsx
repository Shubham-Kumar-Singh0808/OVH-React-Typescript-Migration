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
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import validator from 'validator'
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
import { TextDanger } from '../../../../constant/ClassName'

const AddProjectRequestForm = ({
  projectRequest,
  setProjectRequest,
  checkList,
  setCheckList,
  projectMileStone,
  setProjectMileStone,
  projectManager,
  setProjectManager,
  projectName,
  setProjectName,
  showEditor,
  descriptionError,
  customerContactName,
  setCustomerContactName,
  setEmailError,
  setBillingContactPersonEmailError,
  billingContactName,
  setBillingContactName,
  setCheckListValid,
  setDescriptionError,
  checkListValid,
  setIsAddMileStoneButtonEnabled,
  isAddMilestoneButtonEnabled,
  emailError,
  billingContactPersonEmailError,
  emailErrorMsgCC,
  emailErrorMsgBCC,
  setEmailErrorMsgCC,
  setEmailErrorMsgBCC,
}: {
  projectRequest: AddProjectRequestDetails
  setProjectRequest: React.Dispatch<
    React.SetStateAction<AddProjectRequestDetails>
  >
  checkList: Chelist[]
  setCheckList: React.Dispatch<React.SetStateAction<Chelist[]>>
  projectMileStone: ProjectRequestMilestoneDTO[]
  setProjectMileStone: React.Dispatch<
    React.SetStateAction<ProjectRequestMilestoneDTO[]>
  >
  projectManager: string
  setProjectManager: React.Dispatch<React.SetStateAction<string>>
  projectName: string
  setProjectName: React.Dispatch<React.SetStateAction<string>>
  showEditor: boolean
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>
  descriptionError: boolean
  customerContactName: string
  setCustomerContactName: React.Dispatch<React.SetStateAction<string>>
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>
  setBillingContactPersonEmailError: React.Dispatch<
    React.SetStateAction<boolean>
  >
  billingContactName: string
  setBillingContactName: React.Dispatch<React.SetStateAction<string>>
  setCheckListValid: React.Dispatch<React.SetStateAction<boolean>>
  setDescriptionError: React.Dispatch<React.SetStateAction<boolean>>
  setIsAddMileStoneButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
  checkListValid: boolean
  isAddMilestoneButtonEnabled: boolean
  emailError: boolean
  billingContactPersonEmailError: boolean
  emailErrorMsgCC: boolean
  emailErrorMsgBCC: boolean
  setEmailErrorMsgCC: React.Dispatch<React.SetStateAction<boolean>>
  setEmailErrorMsgBCC: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const [showTotalEffort, setShowTotalEffort] = useState<number>(0)

  const [projectRequestMailIdCC, setProjectRequestMailIdCC] =
    useState<string>('')

  const validateEmailMsgCC = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailErrorMsgCC(false)
    } else {
      setEmailErrorMsgCC(true)
    }
  }

  const handleProjectRequestMailIdCC = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setProjectRequestMailIdCC(email)
    validateEmailMsgCC(email)
  }

  const [projectRequestMailIdBbc, setProjectRequestMailIdBbc] =
    useState<string>('')

  const validateEmailMsgBCC = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailErrorMsgBCC(false)
    } else {
      setEmailErrorMsgBCC(true)
    }
  }

  const handleProjectRequestMailIdBbc = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setProjectRequestMailIdBbc(email)
    validateEmailMsgBCC(email)
  }

  const projectRequestMailIds = useTypedSelector(
    reduxServices.addProjectCreationRequest.selectors.projectRequestMailIds,
  )
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
    if (checkListItems) setCheckList(checkListItems)
  }, [checkListItems])

  const sortedDetails = useMemo(() => {
    if (projectClients) {
      return projectClients
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    }
    return []
  }, [projectClients])

  const clientOrganizationList = sortedDetails
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
  }, [projectRequest?.startdate, projectRequest?.enddate])

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

  const onHandleAddProjectBillingContactName = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      billingContactPerson: value.replace(/[^a-z\s]$/gi, ''),
    })
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

  useEffect(() => {
    setProjectRequestMailIdCC(projectRequestMailIds.cc)
  }, [projectRequestMailIds])

  useEffect(() => {
    setProjectRequestMailIdBbc(projectRequestMailIds.bcc)
  }, [projectRequestMailIds])

  const classNameStyle = 'col-sm-3 col-form-label text-end'
  const projectDomains = listComposer(domainList as [], 'id', 'name')

  const projectPlatforms = listComposer(platforms as [], 'id', 'name')

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }
  const validateBillingContactEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setBillingContactPersonEmailError(false)
    } else {
      setBillingContactPersonEmailError(true)
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
    newMileStone[index].effort = e.target.value
    setProjectMileStone(newMileStone)
  }

  const percentageOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    let targetValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '')
    if (Number(targetValue) > 100) targetValue = '100'
    newMileStone[index].milestonePercentage = targetValue
    setProjectMileStone(newMileStone)
  }

  const emptyPercentage = (value: string, index: number) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    newMileStone[index].milestonePercentage = value
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

  useEffect(() => {
    if (checkList) {
      const isValid =
        // eslint-disable-next-line sonarjs/no-gratuitous-expressions
        checkList &&
        checkList?.length &&
        checkList?.every(
          (item) => item?.answer !== null && item?.comments !== null,
        )
      setCheckListValid(isValid as boolean)
    }
  }, [checkList])

  const onHandleDescription = (description: string) => {
    if (description.length > 56) {
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'projectContactEmail') {
      const personalEmail = value
      validateEmail(personalEmail)
      setProjectRequest((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else if (name === 'billingContactPersonEmail') {
      const billingPersonEmail = value
      validateBillingContactEmail(billingPersonEmail)
      setProjectRequest((prevState) => {
        return { ...prevState, ...{ [name]: billingPersonEmail } }
      })
    } else {
      setProjectRequest((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  const textWhite = 'text-white'
  const textDanger = 'text-danger'
  const projectContactEmail =
    projectRequest.projectContactEmail && !emailError ? textWhite : textDanger
  const billingContactPersonEmail =
    projectRequest.billingContactPersonEmail && !billingContactPersonEmailError
      ? textWhite
      : textDanger
  return (
    <>
      <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
        <ClientOrganization
          list={clientOrganizationList}
          onSelectHandler={handleAddProjectRequestClientSelect}
          value={projectRequest.client}
        />
        <ProjectName
          onChange={setProjectName}
          onBlur={handleAddProjectName}
          value={projectName?.replace(/^\s*/, '')}
        />
        <OInputField
          onChangeHandler={setCustomerContactName}
          onBlurHandler={onHandleAddProjectCustomerContactName}
          value={customerContactName
            ?.replace(/^\s*/, '')
            ?.replace(/[^a-zA-Z\s]/g, '')}
          isRequired={true}
          label="Customer Contact Name"
          name="projectContactPerson"
          placeholder="Name"
          dynamicFormLabelProps={dynamicFormLabelProps}
          autoComplete={'off'}
        />
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Customer Email :<span className={projectContactEmail}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="email-address"
              type="email"
              name="projectContactEmail"
              autoComplete="off"
              placeholder="Email"
              value={projectRequest.projectContactEmail?.replace(/^\s*/, '')}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <OInputField
          onChangeHandler={setBillingContactName}
          onBlurHandler={onHandleAddProjectBillingContactName}
          value={billingContactName
            ?.replace(/[^a-zA-Z\s]/g, '')
            .replace(/^\s*/, '')}
          isRequired={false}
          label="Billing Contact Name"
          name="billingContactPerson"
          placeholder="Name"
          dynamicFormLabelProps={dynamicFormLabelProps}
          autoComplete={'off'}
        />
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Billing Contact Person Email :
            <span className={billingContactPersonEmail}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="email-address"
              type="email"
              name="billingContactPersonEmail"
              autoComplete="off"
              placeholder="Email Id"
              value={projectRequest.billingContactPersonEmail}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
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
              className="sh-formLabel"
              type="checkbox"
              name="internalProject"
              id="internalProject"
              label="Internal Project"
              onChange={(event) => handleIsInternalStatus(event.target.checked)}
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
            <span className={showIsRequired(projectRequest.startdate)}>*</span>
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
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/mm/yy"
              name="addprojectstartdate"
              value={projectRequest.startdate}
              onChange={(date: Date) => onHandleProjectRequestStartDate(date)}
              autoComplete={'off'}
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
              placeholderText="dd/mm/yyyy"
              data-testid="end-date-picker"
              dateFormat="dd/mm/yyyy"
              name="addprojectenddate"
              value={projectRequest.enddate}
              onChange={(date: Date) => onHandleProjectRequestEndDate(date)}
              autoComplete={'off'}
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
            <span className={showIsRequired(projectRequest.technology)}>*</span>
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
                  Please enter at least 50 characters.
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
      {projectRequest.type === 'FixedBid' && (
        <>
          <label className="sh-title-milestone">
            <b>Milestone:</b>
          </label>
          <CRow className="mt-4 mb-4">
            <CTable striped className="align-middle">
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
                      emptyPercentage={emptyPercentage}
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
                      isAddMilestoneButtonEnabled={isAddMilestoneButtonEnabled}
                    />
                  )
                })}
            </CTable>
            {showTotalEffort ? (
              <span className="ps-2">
                <strong>Total Effort: </strong>
                {showTotalEffort}{' '}
              </span>
            ) : (
              <></>
            )}
          </CRow>
        </>
      )}
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          CC:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            name="CC"
            id="CC"
            autoComplete="off"
            value={projectRequestMailIdCC}
            onChange={(e) => handleProjectRequestMailIdCC(e)}
          />
          {emailErrorMsgCC && (
            <p data-testid="error-msg" className={TextDanger}>
              Enter a valid Email address.For multiple mail ids use,without
              space!!
            </p>
          )}
        </CCol>
        <CFormLabel className="col-sm-1 col-form-label text-end">
          BCC:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            name="BCC"
            autoComplete="off"
            id="BCC"
            value={projectRequestMailIdBbc}
            onChange={(e) => handleProjectRequestMailIdBbc(e)}
          />
          {emailErrorMsgBCC && (
            <p data-testid="error-msg" className={TextDanger}>
              Enter a valid Email address.For multiple mail ids use,without
              space!!
            </p>
          )}
        </CCol>
        <CCol sm={1}>
          <CButton
            className="btn-ovh me-2"
            color="success"
            onClick={updateMailIdHandler}
            disabled={
              !isUpdateButtonEnabled || emailErrorMsgBCC || emailErrorMsgCC
            }
          >
            Update
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}
export default AddProjectRequestForm
