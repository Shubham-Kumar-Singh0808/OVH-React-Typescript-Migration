import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
  CRow,
  CCol,
  CButton,
  CSpinner,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CFormInput,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import validator from 'validator'
import OCard from '../../../../../components/ReusableComponent/OCard'
import OAutoComplete from '../../../../../components/ReusableComponent/OAutoComplete'
import { GetList } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import {
  GetAutoCompleteList,
  GetOnSelect,
  Project,
  ProjectClients,
} from '../../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import OInputField from '../../../../../components/ReusableComponent/OInputField'
import OSelectList from '../../../../../components/ReusableComponent/OSelectList'
import { listComposer, showIsRequired } from '../../../../../utils/helper'
import { dateFormat } from '../../../../../constant/DateFormat'
import { ckeditorConfig } from '../../../../../utils/ckEditorUtils'
import {
  healthList,
  priceModelList,
} from '../../../../../constant/constantData'
import { ClientOrganization } from '../../ProjectComponent/ClientOrganization'
import { ProjectName } from '../../ProjectComponent/ProjectName'

interface TypesObject {
  [key: string]: string
}

const EditProject = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>()
  const [emailError, setEmailError] = useState<boolean>(false)
  const [billingContactPersonEmailError, setBillingContactPersonEmailError] =
    useState<boolean>(false)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const classNameStyle = 'col-sm-3 col-form-label text-end'

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const initProject = {} as Project
  const [project, setProject] = useState(initProject)

  const [projectName, setProjectName] = useState<string>('')
  const [projectManager, setProjectManager] = useState<string>('')
  const [hiveValue, setHive] = useState<string>('')
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)
  const [isUpdateBtnEnable, setUpdateBtn] = useState(false)

  const selectedProject = useTypedSelector(
    reduxServices.projectManagement.selectors.project,
  )

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
  useEffect(() => {
    if (
      project.client !== '' &&
      project.client != null &&
      project.projectName !== '' &&
      project.projectName != null &&
      project.projectContactPerson != null &&
      project.projectContactPerson !== '' &&
      project.projectContactEmail != null &&
      project.projectContactEmail !== '' &&
      project.billingContactPerson != null &&
      project.billingContactPerson !== '' &&
      project.billingContactPersonEmail != null &&
      project.billingContactPersonEmail !== '' &&
      project.model !== '' &&
      project.model != null &&
      project.type !== '' &&
      project.type != null &&
      project.managerId !== -1 &&
      project.managerId != null &&
      project.platform !== '' &&
      project.platform != null &&
      project.domain !== '' &&
      project.domain != null &&
      project.startdate !== '' &&
      project.startdate != null &&
      !emailError &&
      !billingContactPersonEmailError
    ) {
      setUpdateBtn(true)
    } else {
      setUpdateBtn(false)
    }
  }, [project])

  useEffect(() => {
    if (selectedProject != null) {
      setProject({
        address: selectedProject.address,
        allocation: selectedProject.allocation,
        bcc: selectedProject.bcc,
        billable: selectedProject.billable,
        billingContactPerson: selectedProject.billingContactPerson,
        billingContactPersonEmail: selectedProject.billingContactPersonEmail,
        cc: selectedProject.cc,
        checkListExist: selectedProject.checkListExist,
        client: selectedProject.client,
        clientId: selectedProject.clientId,
        clientName: selectedProject.clientName,
        count: selectedProject.count,
        country: selectedProject.country,
        deliveryManager: selectedProject.deliveryManager,
        description: selectedProject.description,
        domain: selectedProject.domain,
        email: selectedProject.email,
        employeeId: selectedProject.employeeId,
        enddate: selectedProject.enddate,
        health: selectedProject.health,
        hiveProjectFlag: selectedProject.hiveProjectFlag,
        hiveProjectName: selectedProject.hiveProjectName,
        id: selectedProject.id,
        intrnalOrNot: selectedProject.intrnalOrNot,
        isAllocated: selectedProject.isAllocated,
        managerId: selectedProject.managerId,
        managerName: selectedProject.managerName,
        model: selectedProject.model,
        newClient: selectedProject.newClient,
        organization: selectedProject.organization,
        personName: selectedProject.personName,
        platform: selectedProject.platform,
        projectCode: selectedProject.projectCode,
        projectContactEmail: selectedProject.projectContactEmail,
        projectContactPerson: selectedProject.projectContactPerson,
        projectEndDate: selectedProject.projectEndDate,
        projectName: selectedProject.projectName,
        projectRequestId: selectedProject.projectRequestId,
        projectRequestMilestoneDTO: selectedProject.projectRequestMilestoneDTO,
        projectStartdate: selectedProject.projectStartdate,
        requestedBy: selectedProject.requestedBy,
        requiredResources: selectedProject.requiredResources,
        startdate: selectedProject.startdate,
        statuEditFlag: selectedProject.statuEditFlag,
        status: selectedProject.status,
        technology: selectedProject.technology,
        type: selectedProject.type,
      })
      setProjectName(selectedProject.projectName)
      setProjectManager(selectedProject.managerName)
      setHive(selectedProject.hiveProjectName)
    }
  }, [selectedProject])

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(project.startdate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(project.enddate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsGreaterThanStart(moment(end).isBefore(start))
  }, [project.startdate, project.enddate])

  useEffect(() => {
    dispatch(reduxServices.projectManagement.getProjectClients())
    dispatch(reduxServices.projectManagement.getAllDomains())
    dispatch(reduxServices.projectManagement.getAllManagers())
    dispatch(reduxServices.projectManagement.getAllPlatforms())
    dispatch(reduxServices.projectManagement.getProject(projectId))
  }, [dispatch])

  const projectClients = useTypedSelector(
    reduxServices.projectManagement.selectors.projectClients,
  )

  const domainList = useTypedSelector(
    reduxServices.projectManagement.selectors.domains,
  )

  const managerList = useTypedSelector(
    reduxServices.projectManagement.selectors.managers,
  )

  const platforms = useTypedSelector(
    reduxServices.projectManagement.selectors.platForms,
  )

  const projectManagers = managerList?.map((manager) => {
    return {
      id: manager.id,
      name: `${manager.firstName} ${manager.lastName}`,
    } as GetAutoCompleteList
  })

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
        name: mapClient.name,
      } as GetAutoCompleteList
    })

  const projectDomains = listComposer(domainList as [], 'id', 'name')

  const projectPlatforms = listComposer(platforms as [], 'id', 'name')

  const projectTypeList: GetList[] = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Support' },
  ]

  const statusList: GetList[] = [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'On Hold' },
    { id: 4, name: 'Closed' },
  ]

  const handleClientSelect = (value: GetOnSelect) => {
    setProject({
      ...project,
      client: value.name,
    })
  }

  const handleProjectName = (value: string) => {
    setProject({
      ...project,
      projectName: value,
    })
  }

  const handleCustomerContactName = (value: string) => {
    setProject({
      ...project,
      projectContactPerson: value,
    })
  }

  const handleBillingPerson = (value: string) => {
    setProject({
      ...project,
      billingContactPerson: value,
    })
  }

  const handlePlatform = (value: string) => {
    setProject({
      ...project,
      platform: value,
    })
  }

  const handleDomain = (value: string) => {
    setProject({
      ...project,
      domain: value,
    })
  }

  const handleStatus = (value: string) => {
    setProject({
      ...project,
      status: value,
    })
  }

  const handlePriceModel = (value: string) => {
    setProject({
      ...project,
      type: value === 'T&M' ? 'TM' : value.replace(' ', '').toUpperCase(),
    })
  }

  const handleIsInternalStatus = (intrnalOrNot: boolean) => {
    setProject({
      ...project,
      intrnalOrNot,
    })
  }

  const handleProjectType = (value: string) => {
    setProject({ ...project, model: value })
  }

  const handleProjectManager = (value: GetOnSelect) => {
    setProject({ ...project, managerId: value.id, managerName: value.name })
    setProjectManager(value.name)
  }

  const onHandleStartDate = (value: Date) => {
    setProject({
      ...project,
      startdate: moment(value).format(dateFormat),
    })
  }

  const onHandleEndDate = (value: Date) => {
    setProject({
      ...project,
      enddate: moment(value).format(dateFormat),
    })
  }

  const onHandleHealth = (e: { target: { value: string } }) => {
    setProject({ ...project, health: e.target.value })
  }

  const onHandleHiveName = (value: string) => {
    setProject({ ...project, hiveProjectName: value })
    setHive(value)
  }

  const onHandleDescription = (description: string) => {
    setProject((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const handleUpdateSubmit = async () => {
    const payload = {
      ...project,
      model: project.model.toUpperCase(),
      status:
        project.status === 'In Progress' || project.status === 'On Hold'
          ? project.status.replace(' ', '').toUpperCase()
          : project.status,
    }

    const newProjectResponse = await dispatch(
      reduxServices.projectManagement.updateProject(payload),
    )
    if (
      reduxServices.projectManagement.updateProject.fulfilled.match(
        newProjectResponse,
      )
    ) {
      history.push('/projectreport')
    }
  }

  const getTypes: TypesObject = {
    FIXEDBID: 'Fixed Bid',
    RETAINER: 'Retainer',
    SUPPORT: 'Support',
    TM: 'T&M',
  }

  const typeValue =
    project.model == null
      ? ''
      : project.model.charAt(0).toUpperCase() +
        project.model.slice(1).toLowerCase()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'projectContactEmail') {
      const personalEmail = value
      validateEmail(personalEmail)
      setProject((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else if (name === 'billingContactPersonEmail') {
      const billingPersonEmail = value
      validateBillingContactEmail(billingPersonEmail)
      setProject((prevState) => {
        return { ...prevState, ...{ [name]: billingPersonEmail } }
      })
    } else {
      setProject((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  const projectContactEmail =
    project.projectContactEmail && !emailError ? 'text-white' : 'text-danger'
  const billingContactPersonEmail =
    project.billingContactPersonEmail && !billingContactPersonEmailError
      ? 'text-white'
      : 'text-danger'
  console.log(project.client)
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Edit Project"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {Object.keys(project).length > 0 ? (
        <>
          <CRow className="justify-content-end">
            <CRow className="justify-content-end">
              <CCol md={4}>
                <Link to="/projectreport">
                  <CButton
                    color="info"
                    className="btn-ovh me-1 add-project-back-btn"
                    data-testid="toggle-back-button"
                  >
                    <i className="fa fa-arrow-left  me-1"></i>Back
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
              <ClientOrganization
                list={clientOrganizationList}
                onSelectHandler={handleClientSelect}
                value={project.client}
              />
              <ProjectName
                onChange={setProjectName}
                onBlur={handleProjectName}
                value={projectName?.replace(/^\s*/, '')}
              />
              <OInputField
                onChangeHandler={handleCustomerContactName}
                value={project.projectContactPerson?.replace(/^\s*/, '')}
                isRequired={true}
                label={'Customer Contact Name'}
                name={'customerContactName'}
                placeholder={'Name'}
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
                    value={project.projectContactEmail}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>
              <OInputField
                onChangeHandler={handleBillingPerson}
                value={project.billingContactPerson?.replace(/^\s*/, '')}
                isRequired={true}
                label={'Billing Contact Person'}
                name={'billingContactPerson'}
                placeholder={'Name'}
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
                    value={project.billingContactPersonEmail}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>
              <OSelectList
                isRequired={true}
                list={priceModelList}
                setValue={handlePriceModel}
                value={getTypes[project.type]}
                label="Pricing Model"
                name="editPricingModel"
                placeHolder="---Pricing Model---"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <CRow className="mb-3 align-items-center">
                <CCol sm={3} />
                <CCol sm={3}>
                  <CFormCheck
                    inline
                    type="checkbox"
                    name="editInternalProject"
                    data-testid="editInternalProject"
                    id="editInternalProject"
                    label="Internal Project"
                    onChange={(event) =>
                      handleIsInternalStatus(event.target.checked)
                    }
                    checked={project.intrnalOrNot}
                  />
                </CCol>
              </CRow>
              <OSelectList
                isRequired={true}
                list={projectTypeList}
                setValue={handleProjectType}
                value={typeValue}
                name="editProjectType"
                label="Project Type"
                placeHolder="---Project Type---"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <OAutoComplete
                list={projectManagers}
                onSelect={handleProjectManager}
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
                setValue={handlePlatform}
                value={project.platform}
                name="platform"
                label="Platform"
                placeHolder="Select Platform"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <OSelectList
                isRequired={true}
                list={projectDomains}
                setValue={handleDomain}
                value={project.domain}
                name="domain"
                label="Domain"
                placeHolder="Select Domain"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <OSelectList
                isRequired={false}
                list={statusList}
                setValue={handleStatus}
                value={project.status}
                name="status"
                label="Status"
                placeHolder="Select Status"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <CRow className="mb-3">
                <CFormLabel
                  {...dynamicFormLabelProps(
                    'editprojectstartdate',
                    classNameStyle,
                  )}
                >
                  Start Date :
                  <span className={showIsRequired(project.startdate)}>*</span>
                </CFormLabel>
                <CCol sm={3}>
                  <DatePicker
                    id="editprojectstartdate"
                    className="form-control form-control-sm sh-date-picker"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    data-testid="start-date-picker"
                    placeholderText="dd/mm/yy"
                    dateFormat="dd/mm/yy"
                    name="editprojectstartdate"
                    value={project.startdate}
                    onChange={(date: Date) => onHandleStartDate(date)}
                    autoComplete="off"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel
                  {...dynamicFormLabelProps(
                    'editprojectenddate',
                    classNameStyle,
                  )}
                >
                  End Date :
                </CFormLabel>
                <CCol sm={3}>
                  <DatePicker
                    id="editprojectenddate"
                    className="form-control form-control-sm sh-date-picker"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yy"
                    data-testid="end-date-picker"
                    dateFormat="dd/mm/yy"
                    name="editprojectenddate"
                    value={project.enddate}
                    onChange={(date: Date) => onHandleEndDate(date)}
                    autoComplete="off"
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
              <CRow className="mb-3">
                <CFormLabel
                  data-testId="editHealthLabel"
                  {...dynamicFormLabelProps('health', classNameStyle)}
                >
                  Health :
                </CFormLabel>
                <CCol sm={3}>
                  <CFormSelect
                    id="editHealth"
                    size="sm"
                    aria-label="health"
                    data-testid="formEditHealth"
                    name="editHealth"
                    value={project.health}
                    onChange={onHandleHealth}
                  >
                    <option value={''}>Select</option>
                    {healthList.map((item, index) => {
                      const { name: optionName, label, backgroundColor } = item
                      return (
                        <option
                          key={index}
                          value={label}
                          className={backgroundColor}
                        >
                          {optionName}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
              </CRow>
              <OInputField
                onChangeHandler={setHive}
                onBlurHandler={onHandleHiveName}
                value={hiveValue}
                isRequired={false}
                label="Hive Project Name"
                name="editHiveProjectName"
                placeholder="Project Name in Hive"
                dynamicFormLabelProps={dynamicFormLabelProps}
                autoComplete={'off'}
              />
              <CRow className="mt-4 mb-4">
                <CFormLabel
                  data-testId="descriptionLabel"
                  {...dynamicFormLabelProps('description', classNameStyle)}
                >
                  Description :
                </CFormLabel>
                <CCol sm={9}>
                  <CKEditor<{
                    onChange: CKEditorEventHandler<'change'>
                  }>
                    initData={project.description}
                    config={ckeditorConfig}
                    debug={false}
                    onChange={({ editor }) => {
                      onHandleDescription(editor.getData().trim())
                    }}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CCol sm={{ span: 6, offset: 3 }}>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    data-testid="update-project"
                    onClick={handleUpdateSubmit}
                    disabled={!isUpdateBtnEnable}
                  >
                    Update
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </>
      ) : (
        <CCol data-testid="spinner">
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </OCard>
  )
}

export default EditProject
