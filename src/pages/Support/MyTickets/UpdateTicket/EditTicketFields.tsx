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

  const initialUpdateTicketState = {} as GetTicketToEdit

  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [editTicketDetails, setEditTicketDetails] = useState(
    initialUpdateTicketState,
  )
  const [fileUpload, setFileUpload] = useState<File | undefined>(undefined)
  const [endDate, setEndDate] = useState<string>()

  const ticketDetailsEdit = useTypedSelector(
    reduxServices.updateTicket.selectors.ticketDetailsToEdit,
  )

  useEffect(() => {
    reduxServices.ticketApprovals.getDepartmentCategoryList(
      ticketDetailsEdit.departmentId,
    )
    reduxServices.ticketApprovals.getSubCategoryList(
      ticketDetailsEdit.categoryId,
    )
  }, [ticketDetailsEdit])

  const onChangeHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setEditTicketDetails((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  const onChangeFileHandler = (element: HTMLInputElement) => {
    const ticketFile = element.files
    if (!ticketFile) return
    setFileUpload(ticketFile[0])
  }

  const onChangeDescriptionHandler = (description: string) => {
    setEditTicketDetails((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  useEffect(() => {
    if (ticketDetailsEdit != null) {
      setEditTicketDetails({
        id: ticketDetailsEdit.id,
        departmentId: ticketDetailsEdit.departmentId,
        departmentName: ticketDetailsEdit.departmentName,
        categoryId: ticketDetailsEdit.categoryId,
        categoryName: ticketDetailsEdit.categoryName,
        subCategoryId: ticketDetailsEdit.subCategoryId,
        subCategoryName: ticketDetailsEdit.subCategoryName,
        subject: ticketDetailsEdit.subject,
        description: ticketDetailsEdit.description,
        status: ticketDetailsEdit.status,
        priority: ticketDetailsEdit.priority,
        startDate: ticketDetailsEdit.startDate,
        endDate: ticketDetailsEdit.endDate,
        assigneeId: ticketDetailsEdit.assigneeId,
        employeeName: ticketDetailsEdit.employeeName,
        percentageDone: ticketDetailsEdit.percentageDone,
        actualTime: ticketDetailsEdit.actualTime,
        authorName: ticketDetailsEdit.authorName,
        assigneeName: ticketDetailsEdit.assigneeName,
        approvalStatus: ticketDetailsEdit.approvalStatus,
        filePath: ticketDetailsEdit.filePath,
        estimatedTime: ticketDetailsEdit.estimatedTime,
        watcherIds: ticketDetailsEdit.watcherIds,
        watcherNames: ticketDetailsEdit.watcherNames,
        disableApprove: ticketDetailsEdit.disableApprove,
        disableCancel: ticketDetailsEdit.disableCancel,
        tracker: ticketDetailsEdit.tracker,
        trackerName: ticketDetailsEdit.trackerName,
        accessStartDate: ticketDetailsEdit.accessStartDate,
        accessEndDate: ticketDetailsEdit.accessEndDate,
        createdDate: ticketDetailsEdit.createdDate,
        approvedBy: ticketDetailsEdit.approvedBy,
      })
    }
    setEndDate(ticketDetailsEdit.endDate as string)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }, [ticketDetailsEdit])

  const ticketUpdatedSuccessToast = (
    <OToast toastMessage="Ticket updated successfully." toastColor="success" />
  )

  const updateTicketBtnHandler = async () => {
    const updateTicketObj = {
      ...editTicketDetails,
      endDate: endDate as string,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { assigneeName, ...restTicketUpdateObj } = updateTicketObj
    await dispatch(
      reduxServices.updateTicket.updateTicketDetails(restTicketUpdateObj),
    )
    setReRender(!reRender)
    if (fileUpload) {
      const formData = new FormData()
      formData.append('file', fileUpload, fileUpload.name)
      const uploadPrepareObject = {
        ticketId: editTicketDetails.id,
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
              value={editTicketDetails.tracker}
              disabled={true}
            >
              <option>
                {editTicketDetails.trackerName
                  ? editTicketDetails.trackerName
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
              value={editTicketDetails.categoryId}
              disabled={true}
            >
              <option>
                {editTicketDetails.categoryName
                  ? editTicketDetails.categoryName
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
              value={editTicketDetails.subCategoryId}
              disabled={true}
            >
              <option>
                {editTicketDetails.subCategoryName
                  ? editTicketDetails.subCategoryName
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
              value={editTicketDetails.accessStartDate}
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
              value={editTicketDetails.accessEndDate}
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
              value={editTicketDetails.subject}
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
                config={ckeditorConfig}
                initData={editTicketDetails.description}
                debug={true}
                onChange={({ editor }) => {
                  onChangeDescriptionHandler(editor.getData().trim())
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
              value={editTicketDetails.status}
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
              value={editTicketDetails.priority}
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
              className="sh-updateTicket-file"
              type="file"
              id="fileUpload"
              data-testid="fileUpload1"
              onChange={(element: React.SyntheticEvent) =>
                onChangeFileHandler(element.currentTarget as HTMLInputElement)
              }
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
