import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import Multiselect from 'multiselect-react-dropdown'
import SelectProjectName from './SelectProjectName'
import SelectProjectManager from './SelectProjectManager'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EditAuditFormData } from '../../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { GetAllEmployeesNames } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { showIsRequired } from '../../../utils/helper'
import AuditStartTimeEndTime from '../AddNewAudit/AuditStartTimeEndTime'

const EditAudit = (): JSX.Element => {
  const initAuditFormData = {} as EditAuditFormData
  const [editAuditForm, setEditAuditForm] = useState(initAuditFormData)
  const [editAuditDate, setEditAuditDate] = useState<string>('')
  const [editAuditorName, setEditAuditorName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [editAuditeeName, setEditAuditeeName] = useState<
    GetAllEmployeesNames[]
  >([])
  const dispatch = useDispatch()
  const projects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const managers = useTypedSelector(
    reduxServices.newEmployee.reportingManagersService.selectors
      .reportingManagersList,
  )
  const selectedAuditDetails = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.selectedAuditDetails,
  )
  console.log(selectedAuditDetails.id)

  const employeeNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.employeeNames,
  )
  useEffect(() => {
    dispatch(
      reduxServices.addNewAuditForm.editAuditFormDetails(
        selectedAuditDetails?.id,
      ),
    )

    dispatch(reduxServices.allocateEmployee.getAllEmployeesProfileData())
  }, [dispatch])

  useEffect(() => {
    if (selectedAuditDetails !== null) {
      setEditAuditForm(selectedAuditDetails)
    }
  }, [selectedAuditDetails])

  const onSelectProject = (value: string) => {
    setEditAuditForm({ ...editAuditForm, projectName: value })
  }
  const onSelectManager = (value: string) => {
    setEditAuditForm({ ...editAuditForm, projectManager: value })
  }

  const handleMultiSelectAuditor = (list: GetAllEmployeesNames[]) => {
    setEditAuditorName(list)
  }
  const handleMultiSelectAuditees = (list: GetAllEmployeesNames[]) => {
    setEditAuditeeName(list)
  }
  const onSelectStartAndEndTime = (val1: string, val2: string) => {
    setEditAuditForm({ ...editAuditForm, startTime: val1, endTime: val2 })
  }

  const handleOnRemoveSelectedAuditorOption = (
    selectedList: GetAllEmployeesNames[],
  ) => {
    setEditAuditorName(selectedList)
  }
  const handleOnRemoveSelectedAuditeeOption = (
    selectedList: GetAllEmployeesNames[],
  ) => {
    setEditAuditeeName(selectedList)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Audit"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/SQAAudit`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="editAudit-back-btn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Audit Type :<span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="editAuditType-input"
                autoComplete="off"
                type="text"
                name="auditType"
                placeholder="Audit Type"
                value={editAuditForm.auditType}
                // onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Project Type :
            </CFormLabel>
            <CCol
              className="mt-1"
              sm={3}
              md={1}
              lg={1}
              data-testid="editProjectType-development"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="projectType"
                data-testid="editProjType-dev"
                label="Development "
                value="true"
                inline
                // checked={!isProjectManagerVisible}
                // onChange={handleSelectProjectType}
              />
            </CCol>
            <CCol
              className="mt-1"
              sm={3}
              md={1}
              lg={1}
              data-testid="editProjectType-support"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="projectType"
                data-testid="editProjType-support"
                label="Support"
                value="false"
                inline
                // checked={isProjectManagerVisible}
                // onChange={handleSelectProjectType}
              />
            </CCol>
          </CRow>
          {/* <CRow>
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Project Manager:
              <span className={TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="projectName-input"
                autoComplete="off"
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={editAuditForm.projectName}
                // onChange={handleInputChange}
              />
            </CCol>
          </CRow> */}
          <SelectProjectName
            projects={projects}
            onSelectProject={onSelectProject}
          />
          <SelectProjectManager
            managers={managers}
            onSelectManager={onSelectManager}
          />
          <CRow className="mt-3 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Auditors:
              <span
                className={editAuditorName?.length ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                data-testid="edit-auditors-option"
                options={employeeNames?.map((employee) => employee) || []}
                displayValue="fullName"
                placeholder={editAuditorName?.length ? '' : 'Employees Name'}
                selectedValues={editAuditorName}
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
              Auditees:
              <span className={TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                data-testid="edit-auditees-option"
                options={employeeNames?.map((employee) => employee) || []}
                displayValue="fullName"
                placeholder={editAuditeeName?.length ? '' : 'Employees Name'}
                selectedValues={editAuditeeName}
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
              Audit Date:
              <span className={showIsRequired(editAuditDate)}>*</span>
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
                value={editAuditDate}
                onChange={(date: Date) => {
                  setEditAuditDate(moment(date).format('DD/MM/YYYY'))
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
              >
                Submit
              </CButton>
              <Link to={`/SQAAudit`}>
                <CButton
                  data-testid="newAudit-submit-btn"
                  color="warning"
                  className="btn-ovh"
                >
                  Cancel
                </CButton>
              </Link>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditAudit
