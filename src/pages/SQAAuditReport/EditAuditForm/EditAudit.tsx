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
import { Link, useHistory } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
// import Multiselect from 'multiselect-react-dropdown'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import parse from 'html-react-parser'
import SelectProjectName from './SelectProjectName'
import SelectProjectManager from './SelectProjectManager'
import EditAuditStartTimeEndTime from './EditAuditStartTimeEndTime'
import AuditMembersDetails from './AuditMembersDetails'
import SQAAuditDate from './SQAAuditDate'
import UploadAuditFile from './UploadAuditFile'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EditAuditFormData } from '../../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { GetAllEmployeesNames } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { showIsRequired } from '../../../utils/helper'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import OToast from '../../../components/ReusableComponent/OToast'

const EditAudit = (): JSX.Element => {
  const initAuditFormData = {} as EditAuditFormData
  const selectedAuditDetails = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.selectedAuditDetails,
  )
  const [editAuditForm, setEditAuditForm] = useState(initAuditFormData)
  const [editAuditDate, setEditAuditDate] = useState<string>('')
  const [editFollowUpAuditDate, setEditFollowUpAuditDate] = useState<string>('')
  const [dateError, setDateError] = useState<boolean>(false)
  const [editAuditorName, setEditAuditorName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [editAuditeeName, setEditAuditeeName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [isProjectManagerVisible, setIsProjectManagerVisible] =
    useState<boolean>(false)
  const [selectProjectId, setSelectProjectId] = useState<number>()
  const [selectProjectMgrId, setSelectProjectMgrId] = useState<number>()
  const [editAuditProjectType, setEditAuditProjectType] = useState<string>(
    selectedAuditDetails?.projectType,
  )
  const [errorMessageCount, setErrorMessageCount] = useState<number>(0)
  console.log(errorMessageCount)

  const formStatusSave = selectedAuditDetails?.formStatus === 'Save'
  const formStatusSubmit = selectedAuditDetails?.formStatus === 'Submit'
  const formStatusPMUpdate = selectedAuditDetails?.formStatus === 'PM Update'
  const dispatch = useAppDispatch()
  const history = useHistory()
  const projects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const managers = useTypedSelector(
    reduxServices.newEmployee.reportingManagersService.selectors
      .reportingManagersList,
  )
  const employeeNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.employeeNames,
  )

  useEffect(() => {
    dispatch(reduxServices.allocateEmployee.getAllEmployeesProfileData())
  }, [dispatch])

  useEffect(() => {
    if (selectedAuditDetails !== null) {
      setEditAuditForm(selectedAuditDetails)
      setEditAuditDate(selectedAuditDetails.auditDate)
      setEditAuditProjectType(selectedAuditDetails.projectType)
      setEditAuditorName(selectedAuditDetails.auditors)
      setEditAuditeeName(selectedAuditDetails.auditees)
    }
  }, [selectedAuditDetails])

  const commonFormatDate = 'DD/MM/YYYY'
  useEffect(() => {
    const newFromDate = new Date(
      moment(editFollowUpAuditDate).format(commonFormatDate),
    )
    const newToDate = new Date(moment(editAuditDate).format(commonFormatDate))
    if (editAuditDate && newToDate > newFromDate) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [editFollowUpAuditDate])

  const handleSelectProjectType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditAuditProjectType(event.target.value)
    if (event.target.value === 'false') {
      setIsProjectManagerVisible(true)
    } else {
      setIsProjectManagerVisible(false)
    }
  }
  const onChangeInputHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'auditType') {
      const auditTypeVal = value.replace(/^\s*/, '')
      setEditAuditForm((prevState) => {
        return { ...prevState, ...{ [name]: auditTypeVal } }
      })
    } else if (name === 'pci') {
      const pciValue = Number(value.replace(/\D/g, ''))
      setEditAuditForm((prevState) => {
        return { ...prevState, ...{ [name]: pciValue } }
      })
    } else {
      setEditAuditForm((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onSelectManager = (value: string) => {
    setEditAuditForm({ ...editAuditForm, projectManager: value })
    const selectedProjectResult = projects.find(
      (item) => item.projectName === value,
    )
    setSelectProjectMgrId(selectedProjectResult?.id)
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
  const commentsHandler = (value: string) => {
    setEditAuditForm((prevState) => {
      return { ...prevState, ...{ comments: value } }
    })
  }

  const buttonText = (name: string) => {
    if (selectedAuditDetails?.formStatus === 'Save') {
      name = 'Submit'
    }
    if (selectedAuditDetails?.formStatus === 'Submit') {
      name = 'Update'
    }
    if (selectedAuditDetails?.formStatus === 'PM Update') {
      name = 'Update'
    }
    return name
  }

  const submitToastMessage = (
    <OToast
      toastMessage="Audit Form Submitted Successfully"
      toastColor="success"
    />
  )
  const auditExistsToastMessage = (
    <OToast toastMessage="Audit Already Exists" toastColor="danger" />
  )

  const failureToastMessage = (
    <OToast toastMessage="Please enter a vaild time" toastColor="danger" />
  )
  const handleSubmitAuditForm = async (formAuditStatus: string) => {
    if (editAuditForm.startTime.split(':') > editAuditForm.endTime.split(':')) {
      setErrorMessageCount((messageCount) => messageCount + 1)
      dispatch(reduxServices.app.actions.addToast(failureToastMessage))
      return
    }
    const startTimeSplit = editAuditForm.startTime.split(':')
    const endTimeSplit = editAuditForm.endTime.split(':')
    const prepareObject = {
      auditType: editAuditForm.auditType,
      auditDate: editAuditDate,
      auditRescheduleStatus: false,
      auditStatus: editAuditForm.auditStatus,
      id: editAuditForm.id,
      formStatus: formAuditStatus,
      projectType: editAuditProjectType,
      projectName:
        editAuditProjectType === 'false' ? editAuditForm.projectName : '',
      ...(editAuditProjectType === 'true' && { projectId: selectProjectId }),
      ...(editAuditProjectType === 'false' && {
        projectManagerId: selectProjectMgrId,
      }),
      auditeeIds: editAuditeeName?.map((currentItem) => currentItem.id),
      auditorIds: editAuditorName?.map((currentItem) => currentItem.id),
      startTime: `${editAuditDate}/${startTimeSplit[0]}/${startTimeSplit[1]}`,
      endTime: `${editAuditDate}/${endTimeSplit[0]}/${endTimeSplit[1]}`,
    }
    const addNewAuditFormResultAction = await dispatch(
      reduxServices.addNewAuditForm.saveNewAuditForm(prepareObject),
    )
    if (
      reduxServices.addNewAuditForm.saveNewAuditForm.fulfilled.match(
        addNewAuditFormResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(submitToastMessage))
      history.push('/SQAAudit')
    } else if (
      reduxServices.addNewAuditForm.saveNewAuditForm.rejected.match(
        addNewAuditFormResultAction,
      ) &&
      addNewAuditFormResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(auditExistsToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const handleUpdateAuditForm = async (auditFormStatus: string) => {
    const endTimeSplit = editAuditForm.endTime?.split(':')
    const prepareObject = {
      id: editAuditForm.id,
      comments: editAuditForm.comments,
      containsFile: false,
      followUpDate: editFollowUpAuditDate,
      formStatus: auditFormStatus,
      pci: editAuditForm.pci as string,
      auditeeIds: editAuditeeName?.map((currentItem) => currentItem.id),
      auditorIds: editAuditorName?.map((currentItem) => currentItem.id),
      endTime: `${editAuditDate}/${endTimeSplit[0]}/${endTimeSplit[1]}`,
    }
    const updateAuditFormResultAction = await dispatch(
      reduxServices.addNewAuditForm.updateSQAAuditForm(prepareObject),
    )
    if (
      reduxServices.addNewAuditForm.updateSQAAuditForm.fulfilled.match(
        updateAuditFormResultAction,
      )
    ) {
      history.push('/SQAAudit')
    } else if (
      reduxServices.addNewAuditForm.updateSQAAuditForm.rejected.match(
        updateAuditFormResultAction,
      ) &&
      updateAuditFormResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(auditExistsToastMessage))
    }
  }

  const pmCommentsResult = editAuditForm.pmComments ? (
    <>
      <CRow>
        <CFormLabel className="col-sm-3 col-form-label text-end align-items-center">
          PM Comments :
        </CFormLabel>
        <CCol sm={3} className="mt-2">
          <span className="fw-bold">{parse(editAuditForm?.pmComments)}</span>
        </CCol>
      </CRow>
    </>
  ) : (
    <></>
  )

  const pciAsterisk = editAuditForm.pci ? TextWhite : TextDanger
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
              Audit Type :
              <span
                className={editAuditForm.auditType ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="editAuditType-input"
                autoComplete="off"
                type="text"
                name="auditType"
                placeholder="Audit Type"
                disabled={formStatusSubmit || formStatusPMUpdate}
                value={editAuditForm.auditType}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4 align-items-center">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Project Type :
            </CFormLabel>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="editProjectType-development"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="true"
                data-testid="editProjType-dev"
                label="Development "
                value="true"
                inline
                disabled={formStatusSubmit || formStatusPMUpdate}
                checked={!isProjectManagerVisible}
                onChange={handleSelectProjectType}
              />
            </CCol>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="editProjectType-support"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="false"
                data-testid="editProjType-support"
                className="ms-3"
                label="Support"
                value="false"
                inline
                disabled={formStatusSubmit || formStatusPMUpdate}
                checked={isProjectManagerVisible}
                onChange={handleSelectProjectType}
              />
            </CCol>
          </CRow>

          <SelectProjectName
            projects={projects}
            projectValue={editAuditForm.projectName}
            setSelectProjectId={setSelectProjectId}
          />

          {formStatusSave && (
            <SelectProjectManager
              managers={managers}
              onSelectManager={onSelectManager}
              projectManagerValue={editAuditForm.projectManager}
            />
          )}
          {formStatusSubmit ||
            (formStatusPMUpdate && (
              <CRow>
                <CFormLabel className="col-sm-3 col-form-label text-end align-items-center">
                  Project Manager :
                </CFormLabel>
                <CCol sm={3} className="mt-2">
                  <span className="fw-bold">
                    {editAuditForm.projectManager}
                  </span>
                </CCol>
              </CRow>
            ))}
          <AuditMembersDetails
            auditLabel="Auditors"
            options={employeeNames}
            placeholder={editAuditorName}
            selectedValues={editAuditorName}
            handleOnSelect={handleMultiSelectAuditor}
            handleOnRemove={handleOnRemoveSelectedAuditorOption}
          />
          <AuditMembersDetails
            auditLabel="Auditees"
            options={employeeNames}
            placeholder={editAuditorName}
            selectedValues={editAuditeeName}
            handleOnSelect={handleMultiSelectAuditees}
            handleOnRemove={handleOnRemoveSelectedAuditeeOption}
          />
          <SQAAuditDate
            editAuditDate={editAuditDate}
            setEditAuditDate={setEditAuditDate}
          />
          <EditAuditStartTimeEndTime
            onSelectAuditStartAndEndTime={onSelectStartAndEndTime}
          />
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Status :
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="editAuditStatus-input"
                autoComplete="off"
                type="text"
                name="auditStatus"
                disabled
                value={editAuditForm.auditStatus}
              />
            </CCol>
          </CRow>
          {formStatusSubmit || formStatusPMUpdate ? (
            <>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
                  PCI(%) :<span className={pciAsterisk}>*</span>
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    data-testid="editAuditPCI-input"
                    autoComplete="off"
                    type="text"
                    size="sm"
                    name="pci"
                    maxLength={3}
                    disabled={formStatusPMUpdate}
                    value={editAuditForm.pci}
                    onChange={onChangeInputHandler}
                  />
                </CCol>
              </CRow>
              {formStatusSubmit && (
                <>
                  <CRow className="mt-4 mb-4" data-testid="followUpDateInput">
                    <CFormLabel className="col-sm-3 col-form-label text-end">
                      Follow-up Date :
                      <span className={showIsRequired(editFollowUpAuditDate)}>
                        *
                      </span>
                    </CFormLabel>
                    <CCol sm={3}>
                      <ReactDatePicker
                        id="followup-audit-date"
                        data-testid="followUp-auditDate-Input"
                        autoComplete="off"
                        className="form-control form-control-sm sh-date-picker"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="dd/mm/yyyy"
                        name="followUpDate"
                        minDate={new Date()}
                        value={editFollowUpAuditDate}
                        onChange={(date: Date) => {
                          setEditFollowUpAuditDate(
                            moment(date).format('DD/MM/YYYY'),
                          )
                        }}
                      />
                    </CCol>
                    {dateError && (
                      <CCol sm={6} className="pt-2 px-0">
                        <strong className="text-danger">
                          Followup Date should be greater than AuditDate
                        </strong>
                      </CCol>
                    )}
                  </CRow>
                </>
              )}
              {pmCommentsResult}
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Comments :
                </CFormLabel>
                <CCol sm={8}>
                  <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                    initData={editAuditForm.comments}
                    config={ckeditorConfig}
                    debug={true}
                    onChange={({ editor }) => {
                      commentsHandler(editor.getData().trim())
                    }}
                  />
                </CCol>
              </CRow>
              <UploadAuditFile />
            </>
          ) : (
            <></>
          )}

          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="newAudit-save-btn"
                className="btn-ovh me-1"
                color="success"
                onClick={() =>
                  formStatusSave
                    ? handleSubmitAuditForm('Submit')
                    : handleUpdateAuditForm('Update')
                }
              >
                {buttonText(selectedAuditDetails?.formStatus)}
              </CButton>
              <Link to={`/SQAAudit`}>
                <CButton
                  data-testid="editAudit-cancel-btn"
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
