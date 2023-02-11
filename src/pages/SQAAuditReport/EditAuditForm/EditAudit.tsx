import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import Multiselect from 'multiselect-react-dropdown'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import SelectProjectName from './SelectProjectName'
import SelectProjectManager from './SelectProjectManager'
import EditAuditStartTimeEndTime from './EditAuditStartTimeEndTime'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EditAuditFormData } from '../../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { GetAllEmployeesNames } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { showIsRequired } from '../../../utils/helper'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'

const EditAudit = (): JSX.Element => {
  const initAuditFormData = {} as EditAuditFormData
  const selectedAuditDetails = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.selectedAuditDetails,
  )
  const [editAuditForm, setEditAuditForm] = useState(initAuditFormData)
  const [editAuditDate, setEditAuditDate] = useState<string>('')
  const [editAuditorName, setEditAuditorName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [editAuditeeName, setEditAuditeeName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [isProjectManagerVisible, setIsProjectManagerVisible] =
    useState<boolean>(false)
  const [editAuditProjectType, setEditAuditProjectType] = useState<string>(
    selectedAuditDetails.projectType,
  )
  const [uploadErrorText, setUploadErrorText] = useState<string>('')
  const [uploadAuditFile, setUploadAuditFile] = useState<File | undefined>(
    undefined,
  )
  const formStatusSave = editAuditForm.formStatus === 'Save'
  const formStatusSubmit = selectedAuditDetails.formStatus === 'Submit'
  const formStatusPMUpdate = selectedAuditDetails.formStatus === 'PM Update'
  const dispatch = useDispatch()
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
      setEditAuditDate(selectedAuditDetails.auditDate)
      setEditAuditProjectType(selectedAuditDetails.projectType)
      // setEditAuditorName()
    }
  }, [selectedAuditDetails])

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

  const onChangeFileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['pdf', 'doc', 'docx']
    let extension = ''
    if (!file) return
    if (file && file[0] !== undefined) {
      extension = file[0].name.split('.').pop() as string
    }
    if (file[0] !== undefined && file[0].size > 2048000) {
      setUploadErrorText(
        'File size exceeded. Please upload a file less than 2MB.',
      )
      return
    }
    if (!acceptedFileTypes.includes(extension)) {
      setUploadErrorText('Please choose excel file')
      return
    }
    setUploadErrorText('')
    setUploadAuditFile(file[0])
  }
  // const handleUploadFeedbackForm = async () => {
  //   if (uploadAuditFile) {
  //     const formData = new FormData()
  //     formData.append('file', uploadAuditFile, uploadAuditFile.name)
  //     const uploadPrepareObject = {
  //       eventId: Number(eventId),
  //       file: formData,
  //     }
  //     await dispatch(eventListThunk.uploadFeedbackForm(uploadPrepareObject))
  //   }
  // }

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
  const commentsHandler = (value: string) => {
    setEditAuditForm({ ...editAuditForm, comments: value })
  }
  const handleSelectProjectType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // console.log(event.target.value)
    setEditAuditProjectType(event.target.value)
    if (event.target.value === 'false') {
      setIsProjectManagerVisible(true)
    } else {
      setIsProjectManagerVisible(false)
    }
  }

  const buttonText = (name: string) => {
    if (selectedAuditDetails.formStatus === 'Save') {
      name = 'Submit'
    }
    if (selectedAuditDetails.formStatus === 'Submit') {
      name = 'Update'
    }
    if (selectedAuditDetails.formStatus === 'PM Update') {
      name = 'Update'
    }
    return name
  }

  // const handleSubmitAuditForm = async () => {
  //   const startTimeSplit = editAuditForm.startTime.split(':')
  //   const endTimeSplit = editAuditForm.endTime.split(':')
  //   const prepareObject = {
  //     ...editAuditForm,
  //     editAuditDate,
  //     auditRescheduleStatus: false,
  //     formStatus: 'Save' || 'Submit',
  //     projectType: editAuditProjectType,
  //     ...(editAuditProjectType === 'true' && { projectId: selectProject }),
  //     ...(editAuditProjectType === 'false' && {
  //       projectManagerId: selectProjectMgr,
  //     }),
  //     auditeeIds: editAuditeeName?.map((currentItem) => currentItem.id),
  //     auditorIds: editAuditorName?.map((currentItem) => currentItem.id),
  //     startTime: `${editAuditDate}/${startTimeSplit[0]}/${startTimeSplit[1]}`,
  //     endTime: `${editAuditDate}/${endTimeSplit[0]}/${endTimeSplit[1]}`,
  //   }
  //   const addNewAuditFormResultAction = await dispatch(
  //     reduxServices.addNewAuditForm.saveNewAuditForm(prepareObject),
  //   )
  //   if (
  //     reduxServices.addNewAuditForm.saveNewAuditForm.fulfilled.match(
  //       addNewAuditFormResultAction,
  //     )
  //   ) {
  //     dispatch(reduxServices.app.actions.addToast(successToastMessage))
  //     history.push('/SQAAudit')
  //   } else if (
  //     reduxServices.addNewAuditForm.saveNewAuditForm.rejected.match(
  //       addNewAuditFormResultAction,
  //     ) &&
  //     addNewAuditFormResultAction.payload === 409
  //   ) {
  //     dispatch(reduxServices.app.actions.addToast(warningToastMessage))
  //   }
  // }

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
                checked={!isProjectManagerVisible}
                onChange={handleSelectProjectType}
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
                checked={isProjectManagerVisible}
                onChange={handleSelectProjectType}
              />
            </CCol>
          </CRow>
          {formStatusSubmit ||
            (formStatusPMUpdate && (
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
                  Project Name :
                </CFormLabel>
                <CCol sm={3}>
                  <span className="fw-bold">{editAuditForm.projectName}</span>
                </CCol>
              </CRow>
            ))}
          {formStatusSave && (
            <SelectProjectName
              projects={projects}
              onSelectProject={onSelectProject}
              projectValue={editAuditForm.projectName}
            />
          )}
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
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Project Manager:
                </CFormLabel>
                <CCol sm={3}>
                  <span className="fw-bold">
                    {editAuditForm.projectManager}
                  </span>
                </CCol>
              </CRow>
            ))}
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
                disabled={formStatusSubmit || formStatusPMUpdate}
                value={editAuditDate}
                onChange={(date: Date) => {
                  setEditAuditDate(moment(date).format('DD/MM/YYYY'))
                }}
              />
            </CCol>
          </CRow>
          <EditAuditStartTimeEndTime
            onSelectAuditStartAndEndTime={onSelectStartAndEndTime}
          />
          {formStatusSubmit ||
            (formStatusPMUpdate && (
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
                    disabled={formStatusSubmit}
                    value={editAuditForm.auditStatus}
                  />
                </CCol>
              </CRow>
            ))}
          {formStatusSubmit ||
            (formStatusPMUpdate && (
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
                  PCI(%) :
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    data-testid="editAuditPCI-input"
                    autoComplete="off"
                    type="text"
                    name="pci"
                    value={editAuditForm.pci as number}
                    onChange={onChangeInputHandler}
                  />
                </CCol>
              </CRow>
            ))}
          {formStatusPMUpdate && (
            <CRow>
              <CFormLabel className="col-sm-3 col-form-label text-end">
                PM Comments :
              </CFormLabel>
              <CCol sm={3}>
                <span className="fw-bold">{editAuditForm.pmComments}</span>
              </CCol>
            </CRow>
          )}
          {formStatusSubmit ||
            (formStatusPMUpdate && (
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
            ))}
          {formStatusSubmit ||
            (formStatusPMUpdate && (
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Upload File :
                </CFormLabel>
                <CCol sm={3}>
                  <input
                    className="mt-1"
                    data-testid="auditFile-upload"
                    type="file"
                    name="upload-form"
                    accept=".doc, .docx, .xlsx"
                    onChange={(element: SyntheticEvent) =>
                      onChangeFileUploadHandler(
                        element.currentTarget as HTMLInputElement,
                      )
                    }
                  />
                  {uploadErrorText && (
                    <div id="error">
                      <strong className="mt-3 text-danger">
                        {uploadErrorText}
                      </strong>
                    </div>
                  )}
                </CCol>
              </CRow>
            ))}
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="newAudit-save-btn"
                className="btn-ovh me-1"
                color="success"
              >
                {buttonText(selectedAuditDetails.formStatus)}
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
