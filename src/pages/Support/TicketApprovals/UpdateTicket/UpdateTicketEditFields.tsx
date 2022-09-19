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
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import ReactDatePicker from 'react-datepicker'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { GetTicketToEdit } from '../../../../types/Support/TicketApprovals/UpdateTicket/updateTicketTypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { commonDateFormat } from '../../../../utils/dateFormatUtils'

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
  const [activeEmployeesAutoComplete, setActiveEmployeesAutoComplete] =
    useState<string>('')
  const [selectEmployee, setSelectEmployee] = useState<number | null>()
  const [spentTime, setSpentTime] = useState<{
    hours: string
    minutes: string
  }>({ hours: '', minutes: '' })
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined)
  const [startDate, setStartDate] = useState<string>()
  const [dueDate, setDueDate] = useState<string>()
  const [approveModalVisibility, setApproveModalVisibility] =
    useState<boolean>(false)

  const ticketDetailsToEdit = useTypedSelector(
    reduxServices.updateTicket.selectors.ticketDetailsToEdit,
  )

  const activeEmployees = useTypedSelector(
    reduxServices.updateTicket.selectors.activeEmployees,
  )

  useEffect(() => {
    reduxServices.ticketApprovals.getDepartmentCategoryList(
      ticketDetailsToEdit.departmentId,
    )
    reduxServices.ticketApprovals.getSubCategoryList(
      ticketDetailsToEdit.categoryId,
    )
  }, [ticketDetailsToEdit])

  const onChangeInputHandler = (
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

  const onChangeSpentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpentTime((prevState) => {
      return { ...prevState, ...{ [event.target.name]: event.target.value } }
    })
  }

  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadFile(file[0])
  }
  const onHandleSelectActiveEmployee = (firstName: string) => {
    setActiveEmployeesAutoComplete(firstName)
    const selectedActiveEmployee = activeEmployees.find(
      (value) => value.empFirstName === firstName,
    )
    setSelectEmployee(selectedActiveEmployee?.employeeId as number)
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
    setStartDate(ticketDetailsToEdit.startDate)
    setDueDate(ticketDetailsToEdit.endDate as string)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }, [ticketDetailsToEdit])

  const ticketApprovedSuccessToast = (
    <OToast toastMessage="Ticket approved successfully." toastColor="success" />
  )
  const ticketUpdatedSuccessToast = (
    <OToast toastMessage="Ticket updated successfully." toastColor="success" />
  )

  const updateBtnHandler = async () => {
    const updateObj = {
      ...updateTicketDetails,
      endDate: dueDate as string,
      assigneeId: selectEmployee as number,
      actualTime:
        spentTime.hours !== ''
          ? `${spentTime.hours}.${spentTime.minutes}`
          : '0',
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { assigneeName, ...restUpdateObj } = updateObj
    await dispatch(
      reduxServices.updateTicket.updateTicketDetails(restUpdateObj),
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

  const handleConfirmApproveTicket = async () => {
    setApproveModalVisibility(false)
    await dispatch(
      reduxServices.updateTicket.approveTicket(updateTicketDetails.id),
    )
    setReRender(!reRender)
    dispatch(reduxServices.app.actions.addToast(ticketApprovedSuccessToast))
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
              id="subjectValue"
              name="subject"
              value={updateTicketDetails.subject}
              onChange={onChangeInputHandler}
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
                  onChangeInputHandler(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Ticket Status:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="status"
              id="status"
              data-testid="statusSelect"
              name="status"
              value={updateTicketDetails.status}
              onChange={onChangeInputHandler}
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
              onChange={onChangeInputHandler}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
              <option value="Immediate">Immediate</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="fromDate"
              data-testid="leaveApprovalFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="startDate"
              value={startDate}
              onChange={(date: Date) =>
                setStartDate(moment(date).format(commonDateFormat))
              }
            />
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Due Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="fromDate"
              data-testid="leaveApprovalFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={dueDate}
              onChange={(date: Date) =>
                setDueDate(moment(date).format(commonDateFormat))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Assignee:
          </CFormLabel>
          <CCol sm={3}>
            <Autocomplete
              inputProps={{
                className: 'form-control form-control-sm sh-leave-form-control',
                id: 'employees-autocomplete',
                placeholder: 'Employee Name',
              }}
              getItemValue={(item) => item.empFirstName}
              items={activeEmployees}
              data-testid="employee-input"
              wrapperStyle={{ position: 'relative' }}
              renderMenu={(children) => (
                <div
                  className={
                    activeEmployeesAutoComplete &&
                    activeEmployeesAutoComplete.length > 0
                      ? 'autocomplete-dropdown-wrap'
                      : 'autocomplete-dropdown-wrap hide'
                  }
                >
                  {children}
                </div>
              )}
              renderItem={(currentItem, isHighlightedValue) => (
                <div
                  data-testid="autoComplete-options"
                  className={
                    isHighlightedValue
                      ? 'autocomplete-dropdown-item active'
                      : 'autocomplete-dropdown-item '
                  }
                  key={currentItem.employeeId}
                >
                  {`${currentItem.empFirstName} ${currentItem.empLastName}`}
                </div>
              )}
              value={activeEmployeesAutoComplete}
              shouldItemRender={(currentItem, value) =>
                currentItem.empFirstName
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) > -1
              }
              onChange={(e) => setActiveEmployeesAutoComplete(e.target.value)}
              onSelect={(value) => onHandleSelectActiveEmployee(value)}
            />
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            %Done:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="percentageDone"
              id="percentageDone"
              data-testid="percentageDone"
              name="percentageDone"
              value={updateTicketDetails.percentageDone}
              onChange={onChangeInputHandler}
            >
              <option value="0">0%</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
              <option value="60">60%</option>
              <option value="70">70%</option>
              <option value="80">80%</option>
              <option value="90">90%</option>
              <option value="100">100%</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Estimated Time:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-select-not-allowed"
              data-testid="title-input"
              type="text"
              name="title"
              maxLength={50}
              disabled={true}
              value={updateTicketDetails.estimatedTime}
            />
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Spent Time:
          </CFormLabel>
          <CCol sm={1}>
            <CFormInput
              id="startTimeHour"
              size="sm"
              type="text"
              name="hours"
              data-testid="sh-startTimeHour"
              placeholder="Hours"
              maxLength={2}
              value={spentTime?.hours}
              onChange={onChangeSpentTime}
            />
          </CCol>
          <CCol sm={1}>
            <CFormInput
              id="startTimeMinutes"
              size="sm"
              type="text"
              name="minutes"
              data-testid="sh-startTimeMinutes"
              placeholder="Min"
              maxLength={2}
              value={spentTime?.minutes}
              onChange={onChangeSpentTime}
            />
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
              onClick={updateBtnHandler}
            >
              Update
            </CButton>
            <CButton
              className="cursor-pointer"
              disabled={
                updateTicketDetails.approvalStatus === 'Approved' ||
                updateTicketDetails.approvalStatus === 'Rejected' ||
                updateTicketDetails.approvalStatus === 'Cancelled' ||
                !updateTicketDetails.disableApprove
              }
              color="success btn-ovh me-1"
              onClick={() => setApproveModalVisibility(true)}
            >
              Approve
            </CButton>
          </CCol>
        </CRow>
      </CForm>
      <OModal
        alignment="center"
        visible={approveModalVisibility}
        setVisible={setApproveModalVisibility}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmApproveTicket}
      >
        <>
          Do you really want to approve this{' '}
          <strong>{updateTicketDetails.subCategoryName}</strong> ticket ?
        </>
      </OModal>
    </>
  )
}

export default UpdateTicketEditFields
