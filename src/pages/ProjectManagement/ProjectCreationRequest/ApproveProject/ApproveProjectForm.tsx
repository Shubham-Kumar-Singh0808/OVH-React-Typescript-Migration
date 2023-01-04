import {
  CRow,
  CCol,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CButton,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useHistory } from 'react-router-dom'
import ProjectMileStone from './ProjectMileStone'
import OAutoComplete from '../../../../components/ReusableComponent/OAutoComplete'
import OInputField from '../../../../components/ReusableComponent/OInputField'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  GetAutoCompleteList,
  GetOnSelect,
  ProjectClients,
} from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import {
  ApproveProjectRequest,
  ProjectRequestMilestoneDTO,
} from '../../../../types/ProjectManagement/ProjectCreationRequests/projectCreationRequestsTypes'
import { isEmail, listComposer, showIsRequired } from '../../../../utils/helper'
import { ClientOrganization } from '../../Project/ProjectComponent/ClientOrganization'
import { ProjectName } from '../../Project/ProjectComponent/ProjectName'
import { dateFormat } from '../../../../constant/DateFormat'
import { healthList } from '../../../../constant/constantData'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const ApproveProjectForm = (): JSX.Element => {
  const initApproveProject = {} as ApproveProjectRequest
  const [approveProject, setApproveProject] = useState(initApproveProject)
  const [mileStone, setMileStone] = useState<ProjectRequestMilestoneDTO[]>([])
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)
  const [projectName, setProjectName] = useState<string>('')
  const [projectManager, setProjectManager] = useState<string>('')
  const [isUpdateBtnEnable, setUpdateBtn] = useState(false)
  const selectedApproveProject = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.approveProjectRequests,
  )
  const history = useHistory()
  const dispatch = useAppDispatch()
  const classNameStyle = 'col-sm-3 col-form-label text-end'
  useEffect(() => {
    if (selectedApproveProject != null) {
      setApproveProject({
        projectName: selectedApproveProject.projectName,
        managerId: selectedApproveProject.managerId,
        startdate: selectedApproveProject.startdate,
        enddate: selectedApproveProject.enddate,
        description: '',
        requiredResources: selectedApproveProject.requiredResources,
        status: 'NEW',
        managerName: selectedApproveProject.managerName,
        client: selectedApproveProject.client,
        type: selectedApproveProject.type,
        clientId: selectedApproveProject.clientId,
        newClient: selectedApproveProject.newClient,
        requestedBy: selectedApproveProject.requestedBy,
        technology: selectedApproveProject.technology,
        address: selectedApproveProject.address,
        personName: selectedApproveProject.personName,
        email: selectedApproveProject.email,
        country: selectedApproveProject.country,
        organization: selectedApproveProject.organization,
        intrnalOrNot: selectedApproveProject.intrnalOrNot,
        cc: selectedApproveProject.cc,
        bcc: selectedApproveProject.bcc,
        model: selectedApproveProject.model,
        checkListExist: selectedApproveProject.checkListExist,
        projectContactPerson: selectedApproveProject.projectContactPerson,
        projectContactEmail: selectedApproveProject.projectContactEmail,
        billingContactPerson: selectedApproveProject.billingContactPerson,
        billingContactPersonEmail:
          selectedApproveProject.billingContactPersonEmail,
        projectRequestMilestoneDTO:
          selectedApproveProject.projectRequestMilestoneDTO,
        projectRequestId: selectedApproveProject.id as number,
        platform: selectedApproveProject.platform,
        domain: selectedApproveProject.domain,
        health: selectedApproveProject.health,
      })
      setProjectName(selectedApproveProject.projectName)
      setProjectManager(selectedApproveProject.managerName)
      setMileStone(selectedApproveProject.projectRequestMilestoneDTO)
    }
  }, [selectedApproveProject])

  useEffect(() => {
    if (
      approveProject.client !== '' &&
      approveProject.client != null &&
      approveProject.projectName !== '' &&
      approveProject.projectName != null &&
      approveProject.projectContactPerson != null &&
      approveProject.projectContactPerson !== '' &&
      approveProject.projectContactEmail != null &&
      approveProject.projectContactEmail !== '' &&
      approveProject.billingContactPerson != null &&
      approveProject.billingContactPerson !== '' &&
      approveProject.billingContactPersonEmail != null &&
      approveProject.billingContactPersonEmail !== '' &&
      approveProject.model !== '' &&
      approveProject.model != null &&
      approveProject.type !== '' &&
      approveProject.type != null &&
      approveProject.managerId !== -1 &&
      approveProject.managerId != null &&
      approveProject.platform !== '' &&
      approveProject.platform != null &&
      approveProject.domain !== '' &&
      approveProject.domain != null &&
      approveProject.startdate !== '' &&
      approveProject.startdate != null &&
      !isEmail(approveProject.projectContactEmail) &&
      !isEmail(approveProject.billingContactPersonEmail)
    ) {
      setUpdateBtn(true)
    } else {
      setUpdateBtn(false)
    }
  }, [approveProject])

  const projectClients = useTypedSelector(
    reduxServices.projectManagement.selectors.projectClients,
  )

  const managerList = useTypedSelector(
    reduxServices.projectManagement.selectors.managers,
  )

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(approveProject.startdate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(approveProject.enddate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsGreaterThanStart(moment(end).isBefore(start))
  }, [approveProject.startdate, approveProject.enddate])

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const domainList = useTypedSelector(
    reduxServices.projectManagement.selectors.domains,
  )
  const platforms = useTypedSelector(
    reduxServices.projectManagement.selectors.platForms,
  )
  const projectDomains = listComposer(domainList as [], 'id', 'name')
  const projectPlatforms = listComposer(platforms as [], 'id', 'name')

  useEffect(() => {
    dispatch(reduxServices.projectManagement.getProjectClients())
    dispatch(reduxServices.projectManagement.getAllDomains())
    dispatch(reduxServices.projectManagement.getAllManagers())
    dispatch(reduxServices.projectManagement.getAllPlatforms())
  }, [dispatch])

  const clientOrganizationList = projectClients
    ?.filter((filterClient: ProjectClients) => filterClient.name != null)
    .map((mapClient) => {
      return {
        id: mapClient.id,
        name: mapClient.name,
      } as GetAutoCompleteList
    })

  const projectManagers = managerList?.map((manager) => {
    return {
      id: manager.id,
      name: `${manager.firstName} ${manager.lastName}`,
    } as GetAutoCompleteList
  })
  const handleApproveProjectClientSelect = (value: GetOnSelect) => {
    setApproveProject({
      ...approveProject,
      client: value.name,
    })
  }

  const handleApproveProjectName = (value: string) => {
    setApproveProject({
      ...approveProject,
      projectName: value,
    })
  }

  const handleProjectCustomerContactName = (value: string) => {
    setApproveProject({
      ...approveProject,
      projectContactPerson: value.replace(/[^a-z\s]$/gi, ''),
    })
  }

  const handleProjectCustomerEmail = (value: string) => {
    setApproveProject({
      ...approveProject,
      projectContactEmail: value,
    })
  }

  const handleProjectBillingPerson = (value: string) => {
    setApproveProject({
      ...approveProject,
      billingContactPerson: value.replace(/[^a-z\s]$/gi, ''),
    })
  }

  const handleProjectBillingPersonEmail = (value: string) => {
    setApproveProject({
      ...approveProject,
      billingContactPersonEmail: value,
    })
  }

  const handleProjectIsInternalStatus = (intrnalOrNot: boolean) => {
    setApproveProject({
      ...approveProject,
      intrnalOrNot,
    })
  }

  const handleApproveProjectManager = (value: GetOnSelect) => {
    setApproveProject({
      ...approveProject,
      managerId: value.id,
      managerName: value.name,
    })
    setProjectManager(value.name)
  }

  const handleApproveProjectDomain = (value: string) => {
    setApproveProject({
      ...approveProject,
      domain: value,
    })
  }

  const handleApproveProjectPlatform = (value: string) => {
    setApproveProject({
      ...approveProject,
      platform: value,
    })
  }

  const onHandleProjectStartDate = (value: Date) => {
    setApproveProject({
      ...approveProject,
      startdate: moment(value).format(dateFormat),
    })
  }

  const onHandleApproveProjectHealth = (e: { target: { value: string } }) => {
    setApproveProject({ ...approveProject, health: e.target.value })
  }

  const onHandleApproveProjectEndDate = (value: Date) => {
    setApproveProject({
      ...approveProject,
      enddate: moment(value).format(dateFormat),
    })
  }
  const onHandleApproveProjectDescription = (description: string) => {
    setApproveProject((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const titleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(mileStone),
    )
    newMileStone[index].title = e.target.value
    setMileStone(newMileStone)
  }

  const commentsOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,

    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(mileStone),
    )
    newMileStone[index].comments = e.target.value
    setMileStone(newMileStone)
  }

  const effortOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(mileStone),
    )
    newMileStone[index].effort = e.target.value.replace(/[^0-9]/gi, '')
    setMileStone(newMileStone)
  }

  const onChangeHandleFromDate = (date: Date, index: number) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(mileStone),
    )
    newMileStone[index].fromDate = moment(date).format('DD/MM/YYYY')
    setMileStone(newMileStone)
  }

  const onChangeHandleToDate = (date: Date, index: number) => {
    const newMileStone: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(mileStone),
    )
    newMileStone[index].toDate = moment(date).format('DD/MM/YYYY')
    setMileStone(newMileStone)
  }

  const handleUpdateSubmit = async () => {
    const payload = {
      ...approveProject,
      projectRequestMilestoneDTO: mileStone,
    }

    const newProjectResponse = await dispatch(
      reduxServices.projectCreationRequest.updateProjectRequest(payload),
    )
    if (
      reduxServices.projectCreationRequest.updateProjectRequest.fulfilled.match(
        newProjectResponse,
      )
    ) {
      history.push('/projectreport')
    }
  }

  return (
    <CRow className="justify-content-end">
      <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
        <ClientOrganization
          list={clientOrganizationList}
          onSelectHandler={handleApproveProjectClientSelect}
          value={approveProject.client}
        />
        <ProjectName
          onChange={setProjectName}
          onBlur={handleApproveProjectName}
          value={projectName}
        />
        <OInputField
          onChangeHandler={handleProjectCustomerContactName}
          value={approveProject.projectContactPerson}
          isRequired={true}
          label={'Customer Contact Name'}
          name={'customerContactName'}
          placeholder={'Name'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OInputField
          onChangeHandler={handleProjectCustomerEmail}
          value={approveProject.projectContactEmail}
          isRequired={true}
          type="email"
          label={'Customer Email'}
          name={'customerEmail'}
          placeholder={'Email'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OInputField
          onChangeHandler={handleProjectBillingPerson}
          value={approveProject.billingContactPerson}
          isRequired={true}
          label={'Billing Contact Name'}
          name={'billingContactPerson'}
          placeholder={'Name'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OInputField
          onChangeHandler={handleProjectBillingPersonEmail}
          value={approveProject.billingContactPersonEmail}
          isRequired={true}
          type="email"
          label={'Billing Contact Email'}
          name={'billingContactPersonEmail'}
          placeholder={'Email Id'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps('editprojectstartdate', classNameStyle)}
            data-testid="formeditPricingModel"
          >
            Pricing Model:
          </CFormLabel>
          <CCol sm={3}>
            <CFormLabel className="form-label col-form-label">
              {approveProject.type}
            </CFormLabel>
          </CCol>
        </CRow>
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
                handleProjectIsInternalStatus(event.target.checked)
              }
              checked={approveProject.intrnalOrNot}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps('editprojectstartdate', classNameStyle)}
          >
            Project Type:
          </CFormLabel>
          <CCol sm={3}>
            <CFormLabel className="form-label col-form-label">
              {approveProject.model}
            </CFormLabel>
          </CCol>
        </CRow>
        <OAutoComplete
          list={projectManagers}
          onSelect={handleApproveProjectManager}
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
          setValue={handleApproveProjectPlatform}
          value={approveProject.platform}
          name="platform"
          label="Platform"
          placeHolder="Select Platform"
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OSelectList
          isRequired={true}
          list={projectDomains}
          setValue={handleApproveProjectDomain}
          value={approveProject.domain}
          name="domain"
          label="Domain"
          placeHolder="Select Domain"
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps('editprojectstartdate', classNameStyle)}
          >
            Start Date:
            <span className={showIsRequired(approveProject.startdate)}>*</span>
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
              value={approveProject.startdate}
              onChange={(date: Date) => onHandleProjectStartDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps('editprojectenddate', classNameStyle)}
          >
            End Date:
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
              value={approveProject.enddate}
              onChange={(date: Date) => onHandleApproveProjectEndDate(date)}
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
            Health:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="editHealth"
              size="sm"
              aria-label="health"
              data-testid="formEditHealth"
              name="editHealth"
              value={approveProject.health}
              onChange={onHandleApproveProjectHealth}
            >
              <option value={''}>Select</option>
              {healthList.map((item, index) => {
                const { name: optionName, label, backgroundColor } = item
                return (
                  <option key={index} value={label} className={backgroundColor}>
                    {optionName}
                  </option>
                )
              })}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testId="descriptionLabel"
            {...dynamicFormLabelProps('description', classNameStyle)}
          >
            Description:
          </CFormLabel>
          <CCol sm={9}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={approveProject.description}
              config={ckeditorConfig}
              debug={false}
              onChange={({ editor }) => {
                onHandleApproveProjectDescription(editor.getData().trim())
              }}
            />
          </CCol>
        </CRow>
        {approveProject.type === 'FIXEDBID' && (
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
              {mileStone.map((item, index) => {
                return (
                  <ProjectMileStone
                    item={item}
                    key={index}
                    index={index}
                    titleOnChange={titleOnChange}
                    commentsOnChange={commentsOnChange}
                    effortOnChange={effortOnChange}
                    onChangeHandleFromDate={onChangeHandleFromDate}
                    onChangeHandleToDate={onChangeHandleToDate}
                  />
                )
              })}
            </CTable>
            <span>Total Effort: {}</span>
          </CRow>
        )}
        <CRow className="mb-3 align-items-center">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              data-testid="update-project"
              onClick={handleUpdateSubmit}
              disabled={!isUpdateBtnEnable}
            >
              Add Project
            </CButton>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default ApproveProjectForm
