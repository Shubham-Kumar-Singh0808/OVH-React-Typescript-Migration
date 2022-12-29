import {
  CRow,
  CCol,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormTextarea,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useParams } from 'react-router-dom'
import OAutoComplete from '../../../../components/ReusableComponent/OAutoComplete'
import OBackButton from '../../../../components/ReusableComponent/OBackButton'
import OInputField from '../../../../components/ReusableComponent/OInputField'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  GetAutoCompleteList,
  GetOnSelect,
  ProjectClients,
} from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import { ApproveProjectRequest } from '../../../../types/ProjectManagement/ProjectCreationRequests/projectCreationRequestsTypes'
import { listComposer, showIsRequired } from '../../../../utils/helper'
import { ClientOrganization } from '../../Project/ProjectComponent/ClientOrganization'
import { ProjectName } from '../../Project/ProjectComponent/ProjectName'
import { dateFormat } from '../../../../constant/DateFormat'
import { healthList } from '../../../../constant/constantData'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const ApproveProjectForm = (): JSX.Element => {
  const initApproveProject = {} as ApproveProjectRequest
  const [approveProject, setApproveProject] = useState(initApproveProject)
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)
  const [projectName, setProjectName] = useState<string>('')
  const [projectManager, setProjectManager] = useState<string>('')
  const selectedApproveProject = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.approveProjectRequests,
  )
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  const classNameStyle = 'col-sm-3 col-form-label text-end'
  useEffect(() => {
    if (selectedApproveProject != null) {
      setApproveProject({
        id: selectedApproveProject.id,
        projectName: selectedApproveProject.projectName,
        managerId: selectedApproveProject.managerId,
        startdate: selectedApproveProject.startdate,
        enddate: selectedApproveProject.enddate,
        description: selectedApproveProject.description,
        requiredResources: selectedApproveProject.requiredResources,
        status: selectedApproveProject.status,
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
        chelist: selectedApproveProject.chelist,
        model: selectedApproveProject.model,
        checkListExist: selectedApproveProject.checkListExist,
        projectContactPerson: selectedApproveProject.projectContactPerson,
        projectContactEmail: selectedApproveProject.projectContactEmail,
        billingContactPerson: selectedApproveProject.billingContactPerson,
        billingContactPersonEmail:
          selectedApproveProject.billingContactPersonEmail,
        projectRequestMilestoneDTO:
          selectedApproveProject.projectRequestMilestoneDTO,
        platform: selectedApproveProject.platform,
        access: selectedApproveProject.access,
        domain: selectedApproveProject.domain,
        health: selectedApproveProject.health,
      })
      setProjectName(selectedApproveProject.projectName)
      setProjectManager(selectedApproveProject.managerName)
    }
  }, [selectedApproveProject])

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
    dispatch(reduxServices.projectManagement.getProject(projectId))
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
  const handleClientSelect = (value: GetOnSelect) => {
    setApproveProject({
      ...approveProject,
      client: value.name,
    })
  }

  const handleProjectName = (value: string) => {
    setApproveProject({
      ...approveProject,
      projectName: value,
    })
  }

  const handleCustomerContactName = (value: string) => {
    setApproveProject({
      ...approveProject,
      projectContactPerson: value,
    })
  }

  const handleCustomerEmail = (value: string) => {
    setApproveProject({
      ...approveProject,
      projectContactEmail: value,
    })
  }

  const handleBillingPerson = (value: string) => {
    setApproveProject({
      ...approveProject,
      billingContactPerson: value,
    })
  }

  const handleBillingPersonEmail = (value: string) => {
    setApproveProject({
      ...approveProject,
      billingContactPersonEmail: value,
    })
  }

  const handleIsInternalStatus = (intrnalOrNot: boolean) => {
    setApproveProject({
      ...approveProject,
      intrnalOrNot,
    })
  }

  const handleProjectManager = (value: GetOnSelect) => {
    setApproveProject({
      ...approveProject,
      managerId: value.id,
      managerName: value.name,
    })
    setProjectManager(value.name)
  }

  const handleDomain = (value: string) => {
    setApproveProject({
      ...approveProject,
      domain: value,
    })
  }

  const handlePlatform = (value: string) => {
    setApproveProject({
      ...approveProject,
      platform: value,
    })
  }

  const onHandleStartDate = (value: Date) => {
    setApproveProject({
      ...approveProject,
      startdate: moment(value).format(dateFormat),
    })
  }

  const onHandleHealth = (e: { target: { value: string } }) => {
    setApproveProject({ ...approveProject, health: e.target.value })
  }

  //   const onChangeCommentsHandler = (e: { target: { value: string } }) => {
  //     setApproveProject({
  //       ...approveProject,
  //       comments: e.target.value,
  //     })
  //   }

  const onHandleEndDate = (value: Date) => {
    setApproveProject({
      ...approveProject,
      enddate: moment(value).format(dateFormat),
    })
  }
  const onHandleDescription = (description: string) => {
    setApproveProject((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }
  return (
    <CRow className="justify-content-end">
      <OBackButton destination={''} name={''} />
      <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
        <ClientOrganization
          list={clientOrganizationList}
          onSelectHandler={handleClientSelect}
          value={approveProject.client}
        />
        <ProjectName
          onChange={setProjectName}
          onBlur={handleProjectName}
          value={projectName}
        />
        <OInputField
          onChangeHandler={handleCustomerContactName}
          value={approveProject.projectContactPerson}
          isRequired={true}
          label={'Customer Contact Name'}
          name={'customerContactName'}
          placeholder={'Name'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OInputField
          onChangeHandler={handleCustomerEmail}
          value={approveProject.projectContactEmail}
          isRequired={true}
          type="email"
          label={'Customer Email'}
          name={'customerEmail'}
          placeholder={'Email'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OInputField
          onChangeHandler={handleBillingPerson}
          value={approveProject.billingContactPerson}
          isRequired={true}
          label={'Billing Contact Name'}
          name={'billingContactPerson'}
          placeholder={'Name'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OInputField
          onChangeHandler={handleBillingPersonEmail}
          value={approveProject.billingContactPersonEmail}
          isRequired={true}
          type="email"
          label={'Billing Contact Person Email'}
          name={'billingContactPersonEmail'}
          placeholder={'Email Id'}
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps('editprojectstartdate', classNameStyle)}
          >
            Pricing Model:
          </CFormLabel>
          <CCol sm={3}>{approveProject.type}</CCol>
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
              onChange={(event) => handleIsInternalStatus(event.target.checked)}
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
          <CCol sm={3}>{approveProject.model}</CCol>
        </CRow>
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
          value={approveProject.platform}
          name="platform"
          label="Platform"
          placeHolder="Select Platform"
          dynamicFormLabelProps={dynamicFormLabelProps}
        />
        <OSelectList
          isRequired={true}
          list={projectDomains}
          setValue={handleDomain}
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
              onChange={(date: Date) => onHandleStartDate(date)}
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
              onChange={onHandleHealth}
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
                onHandleDescription(editor.getData().trim())
              }}
            />
          </CCol>
        </CRow>
        {approveProject.type === 'FIXEDBID' && (
          <CRow className="mt-4 mb-4">
            {selectedApproveProject.projectRequestMilestoneDTO.map(
              (item, index) => {
                return (
                  <CRow key={index}>
                    <OInputField
                      //   onChangeHandler={titleHandler}
                      value={item.title}
                      isRequired={false}
                      label="Title"
                      name="title"
                      placeholder="Title"
                      dynamicFormLabelProps={dynamicFormLabelProps}
                    />
                    <OInputField
                      //   onChangeHandler={effortHandler}
                      value={item.effort}
                      isRequired={false}
                      label="Effort(Hrs)"
                      name="effort"
                      placeholder="Effort"
                      dynamicFormLabelProps={dynamicFormLabelProps}
                    />
                    <CFormLabel
                      {...dynamicFormLabelProps(
                        'editprojectenddate',
                        classNameStyle,
                      )}
                    >
                      From Date:
                    </CFormLabel>
                    {/* <DatePicker
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
                      value={item.fromDate}
                      onChange={(date: Date) => onHandleFromDate(date)}
                    />
                    <CFormLabel
                      {...dynamicFormLabelProps(
                        'editprojectenddate',
                        classNameStyle,
                      )}
                    >
                      End Date:
                    </CFormLabel>
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
                      value={item.toDate}
                      onChange={(date: Date) => onHandleToDate(date)}
                    /> */}
                    <CFormLabel
                      {...dynamicFormLabelProps(
                        'editprojectenddate',
                        classNameStyle,
                      )}
                    >
                      Billable
                    </CFormLabel>
                    {item.billable}
                    <CFormLabel
                      {...dynamicFormLabelProps(
                        'editprojectenddate',
                        classNameStyle,
                      )}
                    >
                      Percentage
                    </CFormLabel>
                    {item.milestonePercentage}
                    <CFormLabel
                      {...dynamicFormLabelProps(
                        'editprojectenddate',
                        classNameStyle,
                      )}
                    >
                      Comments
                    </CFormLabel>
                    <CFormTextarea
                      aria-label="textarea"
                      id="comments"
                      name="comments"
                      data-testid="text-area"
                      value={item.comments}
                      //   onChange={onChangeCommentsHandler}
                    ></CFormTextarea>
                  </CRow>
                )
              },
            )}
          </CRow>
        )}
        <CRow className="mb-3 align-items-center">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              data-testid="update-project"
              //   onClick={handleUpdateSubmit}
              //   disabled={!isUpdateBtnEnable}
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
