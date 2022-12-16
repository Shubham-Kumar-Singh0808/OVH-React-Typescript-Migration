import { CButton, CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import CheckList from './AddProjectRequestChildComponents/CheckList'
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

const AddProjectRequestForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [projectManager, setProjectManager] = useState<string>('')
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [customerContactName, setCustomerContactName] = useState<string>('')
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const [billingContactName, setBillingContactName] = useState<string>('')
  const [billingContactEmail, setBillingContactEmail] = useState<string>('')
  // const [platform, setPlatform] = useState<string>('')
  // const [domain, setDomain] = useState<string>('')
  const chelistDetails = {} as Chelist[]
  const [projectRequestMailIdCC, setProjectRequestMailIdCC] =
    useState<string>('')
  const [projectRequestMailIdBbc, setProjectRequestMailIdBbc] =
    useState<string>('')
  // const authorDetails = {} as Author
  const projectRequestMilestoneDTODetails = {} as ProjectRequestMilestoneDTO[]
  const initProjectRequest = {
    bcc: '',
    billingContactPerson: '',
    billingContactPersonEmail: '',
    cc: '',
    chelist: chelistDetails,
    client: '',
    description: '',
    domain: '',
    enddate: '',
    intrnalOrNot: true,
    managerId: 0,
    model: '',
    platform: '',
    projectContactEmail: '',
    projectContactPerson: '',
    projectName: '',
    projectRequestMilestoneDTO: projectRequestMilestoneDTODetails,
    requiredResources: '',
    startdate: '',
    status: '',
    technology: '',
    type: '',
  } as AddProjectRequestDetails

  const [projectRequest, setProjectRequest] = useState(initProjectRequest)
  const [projectName, setProjectName] = useState<string>('')
  const projectClients = useTypedSelector(
    reduxServices.projectManagement.selectors.projectClients,
  )
  console.log(setShowEditor)
  const platforms = useTypedSelector(
    reduxServices.projectManagement.selectors.platForms,
  )

  const projectRequestMailIds = useTypedSelector(
    reduxServices.addProjectCreationRequest.selectors.projectRequestMailIds,
  )

  useEffect(() => {
    dispatch(reduxServices.projectManagement.getProjectClients())
    dispatch(reduxServices.projectManagement.getAllDomains())
    dispatch(reduxServices.projectManagement.getAllManagers())
    dispatch(reduxServices.projectManagement.getAllPlatforms())
    dispatch(reduxServices.addProjectCreationRequest.getProjectRequestMailIds())
    dispatch(reduxServices.addProjectCreationRequest.getCheckList())
  }, [dispatch])

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

  const handleClientSelect = (value: GetOnSelect) => {
    setProjectRequest({
      ...projectRequest,
      client: value.name,
    })
  }

  const handleProjectName = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      projectName: value,
    })
  }

  const handlePriceModel = (value: string) => {
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

  const handleProjectType = (value: string) => {
    setProjectRequest({ ...projectRequest, model: value })
  }

  const onHandleEndDate = (value: Date) => {
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

  const handleProjectManager = (value: GetOnSelect) => {
    setProjectRequest({ ...projectRequest, managerId: value.id })
    setProjectManager(value.name)
  }

  const onHandleStartDate = (value: Date) => {
    setProjectRequest({
      ...projectRequest,
      startdate: moment(value).format(dateFormat),
    })
  }

  const onHandleDescription = (description: string) => {
    setProjectRequest((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const onHandleCustomerContactName = (value: string) => {
    setProjectRequest({ ...projectRequest, projectContactPerson: value })
  }

  const onHandleCustomerEmail = (value: string) => {
    setProjectRequest({ ...projectRequest, projectContactEmail: value })
  }

  const onHandleBillingContactName = (value: string) => {
    setProjectRequest({ ...projectRequest, billingContactPerson: value })
  }

  const onHandleBillingContactEmail = (value: string) => {
    setProjectRequest({ ...projectRequest, billingContactPersonEmail: value })
  }
  const handlePlatform = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      platform: value,
    })
  }

  const handleDomain = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      domain: value,
    })
  }

  const handleProjectRequestMailIdCC = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      cc: value,
    })
  }
  const handleProjectRequestMailIdBbc = (value: string) => {
    setProjectRequest({
      ...projectRequest,
      bcc: value,
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
  const handleSubmitProjectRequest = () => {
    dispatch(
      reduxServices.addProjectCreationRequest.addProjectRequest(projectRequest),
    )
  }
  return (
    <>
      <CRow className="justify-content-end">
        <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
          <ClientOrganization
            list={clientOrganizationList}
            onSelectHandler={handleClientSelect}
            value={projectRequest.client}
          />
          <ProjectName
            onChange={setProjectName}
            onBlur={handleProjectName}
            value={projectName}
          />
          <OInputField
            onChangeHandler={setCustomerContactName}
            onBlurHandler={onHandleCustomerContactName}
            value={customerContactName}
            isRequired={false}
            label="Customer Contact Name"
            name="projectContactPerson"
            placeholder="Name"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OInputField
            onChangeHandler={setCustomerEmail}
            onBlurHandler={onHandleCustomerEmail}
            value={customerEmail}
            isRequired={false}
            label="Customer Contact Name"
            name="projectContactEmail"
            placeholder="Email"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OInputField
            onChangeHandler={setBillingContactName}
            onBlurHandler={onHandleBillingContactName}
            value={billingContactName}
            isRequired={false}
            label="Billing Contact Name"
            name="billingContactPerson"
            placeholder="Name"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OInputField
            onChangeHandler={setBillingContactEmail}
            onBlurHandler={onHandleBillingContactEmail}
            value={billingContactEmail}
            isRequired={false}
            label="Billing Contact Email"
            name="billingContactPersonEmail"
            placeholder="Name"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OSelectList
            isRequired={true}
            list={priceModelList}
            setValue={handlePriceModel}
            value={projectRequest.type}
            label="Pricing Model"
            name="addPricingModel"
            placeHolder="---Pricing Model---"
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
            setValue={handleProjectType}
            value={projectRequest.model}
            name="addProjectType"
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
            value={projectRequest.platform}
            name="platform"
            label="Platform"
            placeHolder="Select Platform"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OSelectList
            isRequired={true}
            list={projectDomains}
            setValue={handleDomain}
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
                onChange={(date: Date) => onHandleStartDate(date)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('addprojectenddate', classNameStyle)}
            >
              End Date:
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
                onChange={(date: Date) => onHandleEndDate(date)}
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
            </CFormLabel>
            {showEditor && (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onHandleDescription(editor.getData().trim())
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
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onHandleDescription(editor.getData().trim())
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
            </CFormLabel>
            {showEditor && (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onHandleDescription(editor.getData().trim())
                  }}
                />
              </CCol>
            )}
          </CRow>
          <OInputField
            onChangeHandler={setProjectRequestMailIdCC}
            onBlurHandler={handleProjectRequestMailIdCC}
            value={projectRequestMailIdCC}
            isRequired={false}
            label="CC"
            name="cc"
            placeholder="Email Id"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <OInputField
            onChangeHandler={setProjectRequestMailIdBbc}
            onBlurHandler={handleProjectRequestMailIdBbc}
            value={projectRequestMailIdBbc}
            isRequired={false}
            label="CC"
            name="bcc"
            placeholder="Email Id"
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <CheckList />
        </CCol>
        <CRow className="mb-3 align-items-center">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              data-testid="add-project"
              onClick={handleSubmitProjectRequest}
            >
              Add
            </CButton>
            <CButton
              color="warning"
              className="btn-ovh"
              data-testid="clear-project"
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