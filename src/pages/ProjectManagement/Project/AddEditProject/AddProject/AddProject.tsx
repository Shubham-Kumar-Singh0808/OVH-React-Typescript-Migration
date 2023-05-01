import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
  CRow,
  CCol,
  CButton,
  CFormCheck,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import OCard from '../../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import OAutoComplete from '../../../../../components/ReusableComponent/OAutoComplete'
import { GetList } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import {
  GetAutoCompleteList,
  GetOnSelect,
  ProjectClients,
  ProjectDetail,
} from '../../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import OInputField from '../../../../../components/ReusableComponent/OInputField'
import OSelectList from '../../../../../components/ReusableComponent/OSelectList'
import { showIsRequired } from '../../../../../utils/helper'
import { dateFormat } from '../../../../../constant/DateFormat'
import { ckeditorConfig } from '../../../../../utils/ckEditorUtils'
import OToast from '../../../../../components/ReusableComponent/OToast'
import {
  healthList,
  priceModelList,
} from '../../../../../constant/constantData'
import { ClientOrganization } from '../../ProjectComponent/ClientOrganization'
import { ProjectName } from '../../ProjectComponent/ProjectName'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const AddProject = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const isLoading = ApiLoadingState.succeeded
  const classNameStyle = 'col-sm-3 col-form-label text-end'
  const classNameStyleLabel = 'col-sm-3 col-form-label text-end pe-18'

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const initProject = {
    intrnalOrNot: false,
    status: 'NEW',
  } as ProjectDetail
  const [project, setProject] = useState(initProject)

  const [projectName, setProjectName] = useState<string>('')
  const [projectManager, setProjectManager] = useState<string>('')
  const [hiveValue, setHive] = useState<string>('')
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [isAddBtnEnable, setAddBtn] = useState(false)
  const [isClearBtnEnable, setClearBtn] = useState(false)

  useEffect(() => {
    if (
      project.client !== '' &&
      project.client != null &&
      project.projectName !== '' &&
      project.projectName != null &&
      project.model !== '' &&
      project.model != null &&
      project.type !== '' &&
      project.type != null &&
      project.managerId !== -1 &&
      project.managerId != null &&
      project.startdate !== '' &&
      project.startdate != null
    ) {
      setAddBtn(true)
    }
  }, [project])

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
    dispatch(
      reduxServices.newEmployee.reportingManagersService.getAllReportingManagers(),
    )
  }, [dispatch])

  const projectClients = useTypedSelector(
    reduxServices.projectManagement.selectors.projectClients,
  )

  const reportingManagersList = useTypedSelector(
    reduxServices.newEmployee.reportingManagersService.selectors
      .reportingManagersList,
  )

  const projectManagers = reportingManagersList?.map((manager) => {
    return {
      id: manager.id,
      name: manager.fullName,
    } as GetAutoCompleteList
  })

  const sortedProjectDetails = useMemo(() => {
    if (projectClients) {
      return projectClients
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    }
    return []
  }, [projectClients])

  const clientOrganizationList = sortedProjectDetails
    ?.filter((filterClient: ProjectClients) => filterClient.name != null)
    .map((mapClient) => {
      return {
        id: mapClient.id,
        name: mapClient.name == null ? '' : mapClient.name,
      } as GetAutoCompleteList
    })

  const projectTypeList: GetList[] = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Support' },
  ]

  const handleClientSelect = (value: GetOnSelect) => {
    setClearBtn(true)
    setProject({
      ...project,
      client: value.name,
    })
  }

  const handleProjectName = (value: string) => {
    setClearBtn(true)
    setProject({
      ...project,
      projectName: value,
    })
  }

  const handlePriceModel = (value: string) => {
    setClearBtn(true)
    setProject({
      ...project,
      type: value,
    })
  }

  const handleIsInternalStatus = (intrnalOrNot: boolean) => {
    setClearBtn(true)
    setProject({
      ...project,
      intrnalOrNot,
    })
  }

  const handleProjectType = (value: string) => {
    setClearBtn(true)
    setProject({ ...project, model: value })
  }

  const handleProjectManager = (value: GetOnSelect) => {
    setClearBtn(true)
    setProject({ ...project, managerId: value.id })
    setProjectManager(value.name)
  }

  const onHandleStartDate = (value: Date) => {
    setClearBtn(true)
    setProject({
      ...project,
      startdate: moment(value).format(dateFormat),
    })
  }

  const onHandleEndDate = (value: Date) => {
    setClearBtn(true)
    setProject({
      ...project,
      enddate: moment(value).format(dateFormat),
    })
  }

  const onHandleHealth = (e: { target: { value: string } }) => {
    setClearBtn(true)
    setProject({ ...project, health: e.target.value })
  }

  const onHandleHiveName = (value: string) => {
    setClearBtn(true)
    setProject({ ...project, hiveProjectName: value })
  }

  const onHandleDescription = (description: string) => {
    setClearBtn(true)
    setProject((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const handleSubmit = async () => {
    const payload = {
      ...project,
      model: project.model.toUpperCase(),
      type:
        project.type === 'T&M'
          ? 'TM'
          : project.type.replace(' ', '').toUpperCase(),
    }

    const newProjectResponse = await dispatch(
      reduxServices.projectManagement.addProject(payload),
    )
    if (
      reduxServices.projectManagement.addProject.fulfilled.match(
        newProjectResponse,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          toastElement('New project is successfully added', 'success'),
        ),
      )

      history.push('/projectreport')
    } else {
      dispatch(
        reduxServices.app.actions.addToast(
          toastElement(
            'Already a Project is existed with the given name.',
            'danger',
          ),
        ),
      )
    }
  }

  const toastElement = (message: string, type: string) => (
    <OToast toastColor={type} toastMessage={message} />
  )

  const handleClear = () => {
    setProjectManager('')
    setHive('')
    setProjectName('')
    onHandleDescription('')
    setProject(initProject)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
      setClearBtn(false)
      setAddBtn(false)
    }, 0)
  }

  const selectedHealthValue = project.health == null ? '' : project.health
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Add Project"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          <CRow className="justify-content-end">
            <CRow className="justify-content-end">
              <CCol md={4}>
                <Link to="/projectreport">
                  <CButton
                    color="info"
                    className="btn-ovh me-1 add-project-back-btn"
                    data-testid="Back-btn"
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
                value={project.client?.replace(/^\s*/, '')}
              />
              <ProjectName
                onChange={setProjectName}
                onBlur={handleProjectName}
                value={projectName?.replace(/^\s*/, '')}
              />
              <OSelectList
                isRequired={true}
                list={priceModelList}
                setValue={handlePriceModel}
                value={project.type}
                label="Pricing Model"
                name="addPricingModel"
                placeHolder="---Pricing Model---"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <CRow className="mb-3 align-items-center">
                <CCol sm={3} />
                <CCol sm={3}>
                  <CFormCheck
                    className="sh-formLabel"
                    inline
                    type="checkbox"
                    name="internalProject"
                    id="internalProject"
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
                value={project.model}
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
              <CRow className="mb-3">
                <CFormLabel
                  {...dynamicFormLabelProps(
                    'addprojectstartdate',
                    classNameStyle,
                  )}
                >
                  Start Date :
                  <span className={showIsRequired(project.startdate)}>*</span>
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
                    value={project.startdate}
                    onChange={(date: Date) => onHandleStartDate(date)}
                    autoComplete="off"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel
                  {...dynamicFormLabelProps(
                    'addprojectenddate',
                    classNameStyleLabel,
                  )}
                >
                  End Date :
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
                    dateFormat="dd/mm/yy"
                    name="addprojectenddate"
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
                  data-testId="selectLabel"
                  {...dynamicFormLabelProps('health', classNameStyleLabel)}
                >
                  Health :
                </CFormLabel>
                <CCol sm={3}>
                  <CFormSelect
                    id="health"
                    size="sm"
                    aria-label="health"
                    data-testid="formHealth"
                    name="health"
                    value={selectedHealthValue}
                    onChange={onHandleHealth}
                  >
                    <option value={''}>Select</option>
                    {healthList.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item.label}
                          className={item.backgroundColor}
                        >
                          {item.name}
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
                name="hiveProjectName"
                placeholder="Project Name in Hive"
                dynamicFormLabelProps={dynamicFormLabelProps}
                autoComplete={'off'}
              />
              <CRow className="mt-4 mb-4">
                <CFormLabel
                  data-testId="selectLabel"
                  {...dynamicFormLabelProps('description', classNameStyle)}
                >
                  Description :
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
              <CRow className="mb-3 align-items-center">
                <CCol sm={{ span: 6, offset: 3 }}>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    data-testid="add-project"
                    onClick={handleSubmit}
                    disabled={!isAddBtnEnable || isGreaterThanStart}
                  >
                    Add
                  </CButton>
                  <CButton
                    color="warning"
                    className="btn-ovh"
                    data-testid="clear-project"
                    onClick={handleClear}
                    disabled={!isClearBtnEnable}
                  >
                    Clear
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </OCard>
  )
}

export default AddProject
