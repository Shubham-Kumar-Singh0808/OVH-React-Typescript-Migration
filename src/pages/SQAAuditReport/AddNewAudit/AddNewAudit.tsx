/* eslint-disable sonarjs/cognitive-complexity */
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import moment from 'moment'
import Multiselect from 'multiselect-react-dropdown'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import ReactDatePicker from 'react-datepicker'
import { Link, useHistory } from 'react-router-dom'
import AuditStartTimeEndTime from './AuditStartTimeEndTime'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { GetAllEmployeesNames } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { showIsRequired } from '../../../utils/helper'
import { SaveAuditForm } from '../../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const AddNewAudit = (): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'newAuditEvent',
    className: 'col-form-label category-label',
  }
  const history = useHistory()
  const dispatch = useAppDispatch()
  const formLabel = 'col-sm-3 col-form-label text-end'
  const [addAudit, setAddAudit] = useState<SaveAuditForm>({} as SaveAuditForm)
  const [projectNameAutoCompleteTarget, setProjectNameAutoCompleteTarget] =
    useState<string>('')
  const [errorMessageCount, setErrorMessageCount] = useState<number>(0)

  const [
    projectManagerAutoCompleteTarget,
    setProjectManagerAutoCompleteTarget,
  ] = useState<string>('')
  const [addAuditorName, setAddAuditorName] = useState<GetAllEmployeesNames[]>(
    [],
  )
  const [addAuditeeName, setAddAuditeeName] = useState<GetAllEmployeesNames[]>(
    [],
  )
  const [auditDate, setAuditDate] = useState<string>('')
  const [selectProject, setSelectProject] = useState<number>()
  const [selectProjectMgr, setSelectProjectMgr] = useState<number>()
  const [isProjectManagerVisible, setIsProjectManagerVisible] =
    useState<boolean>(false)
  const [showProjectMangerName, setShowProjectManagerName] =
    useState<string>('')

  const [isButtonEnable, setIsButtonEnable] = useState<boolean>(false)
  const [auditProjectType, setAuditProjectType] = useState<string>('true')

  const projects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const projectEmployees = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.employees,
  )
  const projectManagers = useTypedSelector(
    reduxServices.projectManagement.selectors.managers,
  )
  const allEmployeeProfiles = useTypedSelector(
    reduxServices.allocateEmployee.selectors.employeeNames,
  )
  useEffect(() => {
    if (projectNameAutoCompleteTarget) {
      dispatch(
        reduxServices.allocateEmployee.getAllProjectSearchData(
          projectNameAutoCompleteTarget,
        ),
      )
    }
    if (projectManagerAutoCompleteTarget) {
      dispatch(reduxServices.projectManagement.getAllManagers())
    }
  }, [projectNameAutoCompleteTarget, projectManagerAutoCompleteTarget])

  useEffect(() => {
    dispatch(reduxServices.allocateEmployee.getAllEmployeesProfileData())
  }, [dispatch])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'auditType') {
      const auditTypeVal = value.replace(/^\s*/, '')
      setAddAudit((prevState) => {
        return { ...prevState, ...{ [name]: auditTypeVal } }
      })
    } else {
      setAddAudit((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (
      addAudit?.auditType &&
      addAudit?.startTime &&
      addAudit?.endTime &&
      auditDate &&
      projectNameAutoCompleteTarget &&
      addAuditorName.length > 0 &&
      addAuditeeName.length > 0 &&
      !isProjectManagerVisible
    ) {
      setIsButtonEnable(true)
    } else if (
      addAudit?.auditType &&
      addAudit?.startTime &&
      addAudit?.endTime &&
      addAudit?.projectName &&
      auditDate &&
      projectManagerAutoCompleteTarget &&
      addAuditorName.length > 0 &&
      addAuditeeName.length > 0 &&
      isProjectManagerVisible
    ) {
      setIsButtonEnable(true)
    } else {
      setIsButtonEnable(false)
    }
  }, [
    addAudit.auditType,
    addAudit?.projectName,
    addAudit?.startTime,
    addAudit?.endTime,
    auditDate,
    projectNameAutoCompleteTarget,
    projectManagerAutoCompleteTarget,
    addAuditorName,
    addAuditeeName,
    isProjectManagerVisible,
  ])

  const projectsOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectNameAutoCompleteTarget(e.target.value)
  }
  const projectManagerOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectManagerAutoCompleteTarget(e.target.value)
  }
  const onHandleSelectProjectName = (projectName: string) => {
    const selectedProjectResult = projects.find(
      (value) => value.projectName === projectName,
    )
    setSelectProject(selectedProjectResult?.id)
    setProjectNameAutoCompleteTarget(projectName)
  }
  const onHandleSelectProjectManager = (projectManagerName: string) => {
    const selectedProjectMgrResult = projectManagers.find(
      (value) => value.firstName === projectManagerName,
    )
    setSelectProjectMgr(selectedProjectMgrResult?.id)
    setProjectManagerAutoCompleteTarget(projectManagerName)
  }

  const handleMultiSelectAuditor = (list: GetAllEmployeesNames[]) => {
    setAddAuditorName(list)
  }
  const handleMultiSelectAuditees = (list: GetAllEmployeesNames[]) => {
    setAddAuditeeName(list)
  }

  const handleOnRemoveSelectedAuditorOption = (
    selectedList: GetAllEmployeesNames[],
  ) => {
    setAddAuditorName(selectedList)
  }
  const handleOnRemoveSelectedAuditeeOption = (
    selectedList: GetAllEmployeesNames[],
  ) => {
    setAddAuditeeName(selectedList)
  }

  const handleSelectProjectType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuditProjectType(event.target.value)
    if (event.target.value === 'false') {
      setIsProjectManagerVisible(true)
      setShowProjectManagerName('')
      setProjectNameAutoCompleteTarget('')
      setAddAuditeeName([])
    } else {
      setIsProjectManagerVisible(false)
      setShowProjectManagerName('')
      setProjectNameAutoCompleteTarget('')
      setAddAuditeeName([])
    }
  }

  const onSelectStartAndEndTime = (val1: string, val2: string) => {
    setAddAudit({ ...addAudit, startTime: val1, endTime: val2 })
  }
  const saveToastMessage = (
    <OToast toastMessage="Audit Form Saved Successfully" toastColor="success" />
  )
  const submitToastMessage = (
    <OToast
      toastMessage="Audit Form Submitted Successfully"
      toastColor="success"
    />
  )
  const warningToastMessage = (
    <OToast toastMessage="Audit Already Exists" toastColor="danger" />
  )
  const selectAuditees = () => {
    const selectedProject = projects.find(
      (value) => value.projectName === projectNameAutoCompleteTarget,
    )
    dispatch(
      reduxServices.addNewAuditForm.getProjectEmployees(
        selectedProject?.id as number,
      ),
    )
    setShowProjectManagerName(selectedProject?.managerName as string)
  }

  useEffect(() => {
    setAddAuditeeName(projectEmployees)
  }, [projectEmployees])

  const failureToastMessage = (
    <OToast toastMessage="Please enter a vaild time" toastColor="danger" />
  )
  const handleAddNewAuditForm = async (auditFormStatus: string) => {
    if (addAudit.startTime.split(':') > addAudit.endTime.split(':')) {
      setErrorMessageCount((messageCount) => messageCount + 1)
      dispatch(reduxServices.app.actions.addToast(failureToastMessage))
      return
    }
    const startTimeSplit = addAudit.startTime.split(':')
    const endTimeSplit = addAudit.endTime.split(':')
    const prepareObject = {
      ...addAudit,
      auditDate,
      auditRescheduleStatus: false,
      formStatus: auditFormStatus,
      projectType: auditProjectType,
      projectName:
        auditProjectType === 'false'
          ? addAudit.projectName
          : projectNameAutoCompleteTarget,
      ...(auditProjectType === 'true' && { projectId: selectProject }),
      ...(auditProjectType === 'false' && {
        projectManagerId: selectProjectMgr,
      }),
      auditeeIds: addAuditeeName?.map((currentItem) => currentItem.id),
      auditorIds: addAuditorName?.map((currentItem) => currentItem.id),
      startTime: `${auditDate}/${startTimeSplit[0]}/${startTimeSplit[1]}`,
      endTime: `${auditDate}/${endTimeSplit[0]}/${endTimeSplit[1]}`,
    }
    const addNewAuditFormResultAction = await dispatch(
      reduxServices.addNewAuditForm.saveNewAuditForm(prepareObject),
    )
    if (
      reduxServices.addNewAuditForm.saveNewAuditForm.fulfilled.match(
        addNewAuditFormResultAction,
      ) &&
      auditFormStatus === 'Save'
    ) {
      dispatch(reduxServices.app.actions.addToast(saveToastMessage))
      history.push('/SQAAudit')
    } else if (
      reduxServices.addNewAuditForm.saveNewAuditForm.fulfilled.match(
        addNewAuditFormResultAction,
      ) &&
      auditFormStatus === 'Submit'
    ) {
      dispatch(reduxServices.app.actions.addToast(submitToastMessage))
      history.push('/SQAAudit')
    } else if (
      reduxServices.addNewAuditForm.saveNewAuditForm.rejected.match(
        addNewAuditFormResultAction,
      ) &&
      addNewAuditFormResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(warningToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  console.log(errorMessageCount)

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add New Audit"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/SQAAudit`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="newAudit-back-btn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Audit Type :
              <span className={addAudit?.auditType ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="auditType-input"
                autoComplete="off"
                type="text"
                name="auditType"
                placeholder="Audit Type"
                value={addAudit?.auditType}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Project Type :
            </CFormLabel>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="projectType-development"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="true"
                data-testid="projType-dev"
                label="Development"
                value="true"
                inline
                checked={!isProjectManagerVisible}
                onChange={handleSelectProjectType}
              />
            </CCol>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="projectType-support"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="false"
                data-testid="projType-support"
                label="Support"
                className="ms-3"
                value="false"
                inline
                checked={isProjectManagerVisible}
                onChange={handleSelectProjectType}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...formLabelProps} className={formLabel}>
              Project Name :
              <span
                className={
                  projectNameAutoCompleteTarget
                    ?.replace(/-_[^a-z0-9\s]/gi, '')
                    ?.replace(/^\s*/, '') ||
                  addAudit?.projectName
                    ?.replace(/-_[^a-z0-9\s]/gi, '')
                    ?.replace(/^\s*/, '')
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            {!isProjectManagerVisible && (
              <CCol sm={3}>
                <Autocomplete
                  inputProps={{
                    className: 'form-control form-control-sm',
                    placeholder: 'Project Name',
                    onBlur: selectAuditees,
                  }}
                  getItemValue={(item) => item.projectName}
                  items={projects ? projects : []}
                  wrapperStyle={{ position: 'relative' }}
                  renderMenu={(children) => (
                    <div
                      className={
                        projectNameAutoCompleteTarget &&
                        projectNameAutoCompleteTarget?.length > 0
                          ? 'autocomplete-dropdown-wrap'
                          : 'autocomplete-dropdown-wrap hide'
                      }
                    >
                      {children}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) => (
                    <div
                      data-testid="project-option"
                      className={
                        isHighlighted
                          ? 'autocomplete-dropdown-item active'
                          : 'autocomplete-dropdown-item '
                      }
                      key={item.id}
                    >
                      {item.projectName}
                    </div>
                  )}
                  value={projectNameAutoCompleteTarget}
                  shouldItemRender={(item, itemValue) =>
                    item?.projectName
                      ?.toLowerCase()
                      .indexOf(itemValue?.toLowerCase()) > -1
                  }
                  onChange={(e) => projectsOnChangeHandler(e)}
                  onSelect={(selectedVal) =>
                    onHandleSelectProjectName(selectedVal)
                  }
                />
              </CCol>
            )}
            {isProjectManagerVisible && (
              <CCol sm={3}>
                <CFormInput
                  data-testid="projectName-input"
                  autoComplete="off"
                  type="text"
                  name="projectName"
                  placeholder="Project Name"
                  value={addAudit?.projectName}
                  onChange={handleInputChange}
                />
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            {showProjectMangerName && (
              <CFormLabel {...formLabelProps} className={formLabel}>
                Project Manager :
                <span
                  className={showProjectMangerName ? TextWhite : TextDanger}
                >
                  *
                </span>
              </CFormLabel>
            )}
            {isProjectManagerVisible && (
              <CFormLabel {...formLabelProps} className={formLabel}>
                Project Manager :
                <span
                  className={
                    projectManagerAutoCompleteTarget ? TextWhite : TextDanger
                  }
                >
                  *
                </span>
              </CFormLabel>
            )}
            {!isProjectManagerVisible && (
              <CCol sm={3}>
                <span className="fw-bold">{showProjectMangerName}</span>
              </CCol>
            )}
            {isProjectManagerVisible && (
              <CCol sm={3}>
                <Autocomplete
                  inputProps={{
                    className: 'form-control form-control-sm',
                    placeholder: 'Project Manager',
                  }}
                  getItemValue={(item) =>
                    item?.firstName + ' ' + item?.lastName
                  }
                  items={projectManagers ?? []}
                  wrapperStyle={{ position: 'relative' }}
                  renderMenu={(children) => (
                    <div
                      className={
                        projectManagerAutoCompleteTarget &&
                        projectManagerAutoCompleteTarget?.length > 0
                          ? 'autocomplete-dropdown-wrap'
                          : 'autocomplete-dropdown-wrap hide'
                      }
                    >
                      {children}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) => (
                    <div
                      data-testid="projectManager-option"
                      className={
                        isHighlighted
                          ? 'autocomplete-dropdown-item active'
                          : 'autocomplete-dropdown-item '
                      }
                      key={item.id}
                    >
                      {item.firstName}
                    </div>
                  )}
                  value={projectManagerAutoCompleteTarget}
                  shouldItemRender={(item, itemValue) =>
                    item?.firstName
                      ?.toLowerCase()
                      .indexOf(itemValue?.toLowerCase()) > -1
                  }
                  onChange={(e) => projectManagerOnChangeHandler(e)}
                  onSelect={(selectedVal) =>
                    onHandleSelectProjectManager(selectedVal)
                  }
                />
              </CCol>
            )}
          </CRow>

          <CRow className="mt-3 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Auditors :
              <span className={addAuditorName?.length ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                data-testid="auditors-option"
                options={allEmployeeProfiles?.map((employee) => employee) || []}
                displayValue="fullName"
                placeholder={addAuditorName?.length ? '' : 'Employees Name'}
                selectedValues={addAuditorName}
                onSelect={(list: GetAllEmployeesNames[]) =>
                  handleMultiSelectAuditor(list)
                }
                onRemove={(selectedList: GetAllEmployeesNames[]) =>
                  handleOnRemoveSelectedAuditorOption(selectedList)
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Auditees :
              <span className={addAuditeeName?.length ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                data-testid="auditees-option"
                options={allEmployeeProfiles?.map((employee) => employee) || []}
                displayValue="fullName"
                placeholder={addAuditeeName?.length ? '' : 'Employees Name'}
                selectedValues={addAuditeeName}
                onSelect={(list: GetAllEmployeesNames[]) =>
                  handleMultiSelectAuditees(list)
                }
                onRemove={(selectedList: GetAllEmployeesNames[]) =>
                  handleOnRemoveSelectedAuditeeOption(selectedList)
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Audit Date :<span className={showIsRequired(auditDate)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <ReactDatePicker
                id="holiday-date"
                data-testid="auditDate-Input"
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="auditDate"
                minDate={new Date()}
                value={auditDate}
                onChange={(date: Date) => {
                  setAuditDate(moment(date).format('DD/MM/YYYY'))
                }}
              />
            </CCol>
          </CRow>
          <AuditStartTimeEndTime
            onSelectStartAndEndTime={onSelectStartAndEndTime}
          />
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="newAudit-save-btn"
                className="btn-ovh me-1"
                color="success"
                disabled={!isButtonEnable}
                onClick={() => handleAddNewAuditForm('Save')}
              >
                Save
              </CButton>
              <CButton
                data-testid="newAudit-submit-btn"
                color="success "
                className="btn-ovh"
                disabled={!isButtonEnable}
                onClick={() => handleAddNewAuditForm('Submit')}
              >
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default AddNewAudit
