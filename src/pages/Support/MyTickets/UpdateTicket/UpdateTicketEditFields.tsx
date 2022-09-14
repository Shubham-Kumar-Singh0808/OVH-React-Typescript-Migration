import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { GetTicketToEdit } from '../../../../types/Support/TicketApprovals/UpdateTicket/updateTicketTypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const UpdateTicketEditFields = ({
  reRender,
  setReRender,
}: {
  reRender: boolean
  setReRender: (value: boolean) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const initialUpdateState = {} as GetTicketToEdit

  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [updateTicketDetails, setUpdateTicketDetails] =
    useState(initialUpdateState)
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined)
  const [dueDate, setDueDate] = useState<string>()

  const ticketDetailsToEdit = useTypedSelector(
    reduxServices.updateTicket.selectors.ticketDetailsToEdit,
  )

  useEffect(() => {
    reduxServices.ticketApprovals.getDepartmentCategoryList(
      ticketDetailsToEdit.departmentId,
    )
    reduxServices.ticketApprovals.getSubCategoryList(
      ticketDetailsToEdit.categoryId,
    )
  }, [ticketDetailsToEdit])

  const onChangeHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setUpdateTicketDetails((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadFile(file[0])
  }

  useEffect(() => {
    if (ticketDetailsToEdit != null) {
      setUpdateTicketDetails({
        id: ticketDetailsToEdit.id,
        departmentId: ticketDetailsToEdit.departmentId,
        departmentName: ticketDetailsToEdit.departmentName,
        categoryId: ticketDetailsToEdit.categoryId,
        categoryName: ticketDetailsToEdit.categoryName,
        subCategoryId: ticketDetailsToEdit.subCategoryId,
        subCategoryName: ticketDetailsToEdit.subCategoryName,
        subject: ticketDetailsToEdit.subject,
        description: ticketDetailsToEdit.description,
        status: ticketDetailsToEdit.status,
        priority: ticketDetailsToEdit.priority,
        startDate: ticketDetailsToEdit.startDate,
        endDate: ticketDetailsToEdit.endDate,
        assigneeId: ticketDetailsToEdit.assigneeId,
        employeeName: ticketDetailsToEdit.employeeName,
        percentageDone: ticketDetailsToEdit.percentageDone,
        actualTime: ticketDetailsToEdit.actualTime,
        authorName: ticketDetailsToEdit.authorName,
        assigneeName: ticketDetailsToEdit.assigneeName,
        approvalStatus: ticketDetailsToEdit.approvalStatus,
        filePath: ticketDetailsToEdit.filePath,
        estimatedTime: ticketDetailsToEdit.estimatedTime,
        watcherIds: ticketDetailsToEdit.watcherIds,
        watcherNames: ticketDetailsToEdit.watcherNames,
        disableApprove: ticketDetailsToEdit.disableApprove,
        disableCancel: ticketDetailsToEdit.disableCancel,
        tracker: ticketDetailsToEdit.tracker,
        trackerName: ticketDetailsToEdit.trackerName,
        accessStartDate: ticketDetailsToEdit.accessStartDate,
        accessEndDate: ticketDetailsToEdit.accessEndDate,
        createdDate: ticketDetailsToEdit.createdDate,
        approvedBy: ticketDetailsToEdit.approvedBy,
      })
    }
    setDueDate(ticketDetailsToEdit.endDate as string)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }, [ticketDetailsToEdit])

  const ticketUpdatedSuccessToast = (
    <OToast toastMessage="Ticket updated successfully." toastColor="success" />
  )

  const updateTicketBtnHandler = async () => {
    const updateTicketObj = {
      ...updateTicketDetails,
      endDate: dueDate as string,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { assigneeName, ...restTicketUpdateObj } = updateTicketObj
    await dispatch(
      reduxServices.updateTicket.updateTicketDetails(restTicketUpdateObj),
    )
    setReRender(!reRender)
    if (uploadFile) {
      const formData = new FormData()
      formData.append('file', uploadFile, uploadFile.name)
      const uploadPrepareObject = {
        ticketId: updateTicketDetails.id,
        file: formData,
      }
      dispatch(reduxServices.updateTicket.uploadSupportDoc(uploadPrepareObject))
    }
    dispatch(reduxServices.app.actions.addToast(ticketUpdatedSuccessToast))
  }

  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Tracker:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="form-select-not-allowed"
              aria-label="trackerName"
              id="trackerName"
              data-testid="trackerNameSelect"
              name="trackerName"
              value={updateTicketDetails.tracker}
              disabled={true}
            >
              <option>
                {updateTicketDetails.trackerName
                  ? updateTicketDetails.trackerName
                  : 'Select Tracker'}
              </option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Category:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="form-select-not-allowed"
              aria-label="category"
              id="category"
              data-testid="categorySelect"
              name="categoryName"
              value={updateTicketDetails.categoryId}
              disabled={true}
            >
              <option>
                {updateTicketDetails.categoryName
                  ? updateTicketDetails.categoryName
                  : 'Select Category'}
              </option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Sub-Category:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="form-select-not-allowed"
              aria-label="sub-category"
              id="sub-category"
              data-testid="sub-category"
              name="subCategoryName"
              value={updateTicketDetails.subCategoryId}
              disabled={true}
            >
              <option>
                {updateTicketDetails.subCategoryName
                  ? updateTicketDetails.subCategoryName
                  : 'Select Sub-Category'}
              </option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-select-not-allowed"
              type="text"
              id="accessStartDate"
              name="accessStartDate"
              value={updateTicketDetails.accessStartDate}
              disabled={true}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            End Date:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-select-not-allowed"
              type="text"
              id="accessEndDate"
              name="accessEndDate"
              value={updateTicketDetails.accessEndDate}
              disabled={true}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Subject:
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput
              type="text"
              data-testid="subject"
              id="subjectValue"
              name="subject"
              value={updateTicketDetails.subject}
              onChange={onChangeHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Description:
          </CFormLabel>
          {showEditor ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={updateTicketDetails?.description}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  onChangeHandler(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="status"
              id="status"
              data-testid="statusSelect"
              name="status"
              value={updateTicketDetails.status}
              onChange={onChangeHandler}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Fixed">Fixed</option>
              <option value="Feedback">Feedback</option>
              <option value="Closed">Closed</option>
            </CFormSelect>
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Priority:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="priority"
              id="priority"
              data-testid="prioritySelect"
              name="priority"
              value={updateTicketDetails.priority}
              onChange={onChangeHandler}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
              <option value="Immediate">Immediate</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Files:
          </CFormLabel>
          <CCol sm={3}>
            <input
              type="file"
              id="fileUpload"
              data-testid="fileUpload"
              onChange={(element: React.SyntheticEvent) =>
                onChangeFileEventHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
              accept=".png, .jpg, .jpeg"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol sm={{ span: 6, offset: 2 }}>
            <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              onClick={updateTicketBtnHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default UpdateTicketEditFields
