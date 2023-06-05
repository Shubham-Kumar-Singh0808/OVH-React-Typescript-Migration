import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CButton,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { SeparationTimeLine } from '../../../../types/Separation/ResignationList/resignationListTypes'

const ResignationTimeLine = ({
  editResignationTimeLine,
  setEditResignationTimeLine,
  resignationId,
  isResignationTimeLineEdit,
}: {
  editResignationTimeLine: SeparationTimeLine
  resignationId: number
  isResignationTimeLineEdit: boolean
  setEditResignationTimeLine: React.Dispatch<
    React.SetStateAction<SeparationTimeLine>
  >
}): JSX.Element => {
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [comments, setComments] = useState<string>()
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false)

  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  const handleDescription = (description: string) => {
    setComments(description)
  }
  useEffect(() => {
    if (comments) {
      setIsSubmitButtonEnabled(true)
    } else {
      setIsSubmitButtonEnabled(false)
    }
  }, [comments])
  const onStartDateChangeHandler = (date: Date) => {
    const formatDate = moment(date).format('DD/MM/YYYY')
    const name = 'relievingDate'
    setEditResignationTimeLine((prevState) => {
      return { ...prevState, ...{ [name]: formatDate } }
    })
  }
  const handleEditResignationTimeLineHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    setEditResignationTimeLine((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }
  const clearBtnHandler = () => {
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }
  const updateTimeLineHandler = () => {
    dispatch(
      reduxServices.resignationList.updateResignationTimeLine({
        adminCcCss: null,
        canberevoked: false,
        certificate: null,
        certificateDTO: getAllResignationHistory.certificateDTO.map((item) => {
          return item
        }),
        contractEndDate: null,
        contractExists: null,
        contractStartDate: null,
        empStatus: null,
        employeeComments: comments as string,
        employeeId: getAllResignationHistory.employeeId,
        employeeName: getAllResignationHistory.employeeName,
        exitFeedbackFormPath: null,
        finanaceCcCss: null,
        hrCcCss: null,
        initiatedDate: null,
        isPIP: null,
        isRevoked: false,
        isprocessInitiated: null,
        itCcCss: null,
        managerCcCss: null,
        managerComments: comments as string,
        managerName: null,
        personalEmailFlag: null,
        pipAuditDTO: null,
        primaryReasonId: null,
        primaryReasonName: getAllResignationHistory.primaryReasonName,
        reasonComments: '',
        relievingDate: getAllResignationHistory.relievingDate,
        relievingLetterPath: null,
        resignationDate: getAllResignationHistory.resignationDate,
        separationComments: getAllResignationHistory?.separationComments.map(
          (item) => {
            return item
          },
        ),
        separationExist: null,
        separationId: getAllResignationHistory.separationId,
        seperationComments: getAllResignationHistory?.separationComments.map(
          (item) => {
            return item
          },
        ),
        showCommentsBox: true,
        showEditButton: true,
        showManagerClearance: null,
        showTimeline: null,
        status: getAllResignationHistory.status,
        withdrawComments: null,
      }),
    )
    history.push('/resignationList')
  }
  const commentsEdit = showEditor ? (
    <CCol sm={8}>
      <CKEditor<{
        onChange: CKEditorEventHandler<'change'>
      }>
        initData={comments}
        config={ckeditorConfig}
        debug={true}
        onChange={({ editor }) => {
          handleDescription(editor.getData().trim())
        }}
      />
      <CCol md={{ span: 6 }} className="mt-2">
        <>
          <CButton
            className="btn-ovh me-1"
            data-testid="create-btn"
            color="success"
            onClick={updateTimeLineHandler}
            disabled={!isSubmitButtonEnabled}
          >
            Submit
          </CButton>
          <CButton
            color="warning "
            data-testid="clear-btn"
            className="btn-ovh"
            onClick={clearBtnHandler}
          >
            Clear
          </CButton>
        </>
      </CCol>
    </CCol>
  ) : (
    ''
  )
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Resignation Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.resignationDate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Relieving Date:
          </CFormLabel>
          <CCol sm={3}>
            {isResignationTimeLineEdit &&
            getAllResignationHistory.separationId === resignationId ? (
              <div className="edit-time-control">
                <DatePicker
                  className="form-control form-control-sm sh-date-picker"
                  placeholderText="dd/mm/yy"
                  name="relievingDate"
                  id="relievingDate"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  value={editResignationTimeLine?.relievingDate}
                  onChange={(date: Date) => onStartDateChangeHandler(date)}
                  maxDate={disableAfterDate}
                />
              </div>
            ) : (
              <p className="mb-0">{getAllResignationHistory?.relievingDate}</p>
            )}
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Primary Reason:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {getAllResignationHistory?.primaryReasonName}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee Comments:
          </CFormLabel>
          <CCol sm={2}>
            <p className="mb-0">
              <span className="descriptionField">
                <div
                  dangerouslySetInnerHTML={{
                    __html: getAllResignationHistory?.employeeComments,
                  }}
                />
              </span>
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            {isResignationTimeLineEdit &&
            getAllResignationHistory.separationId === resignationId ? (
              <div className="edit-time-control">
                <CFormSelect
                  aria-label="Default select example"
                  size="sm"
                  id="status"
                  data-testid="form-select2"
                  name="status"
                  value={editResignationTimeLine.status}
                  onChange={handleEditResignationTimeLineHandler}
                >
                  <option value=""></option>
                  <option value="">Select Status</option>
                  <option value="Resigned">Resigned</option>
                  <option value="Absconding">Absconding</option>
                  <option value="Terminated">Terminated</option>
                </CFormSelect>
              </div>
            ) : (
              <p className="mb-0">{getAllResignationHistory?.status}</p>
            )}
          </CCol>
        </CRow>
        {getAllResignationHistory.status === 'Resigned' ? (
          <>
            <CRow className="mt-1 mb-0">
              <CFormLabel className="col-sm-4 col-form-label text-end p-1">
                Comments:
              </CFormLabel>
              {commentsEdit}
            </CRow>
          </>
        ) : (
          ''
        )}
        <div className="sh-timeline-container">
          {getAllResignationHistory?.separationComments?.map((item, index) => {
            return (
              <div key={index} className="sh-timeline-card">
                <div
                  className="sh-timeline-timestamp"
                  data-testid="sh-time-stamp"
                >
                  {item.createdDate}
                </div>
                <div className="sh-timeline-content">
                  <div
                    className="sh-timeline-header mb-4 clearfix"
                    data-testid="sh-modifiedBy"
                  >
                    <h4 className="sh-timeline-title">{item.employeeName}</h4>
                  </div>
                  <div className="sh-timeline-body">
                    <div className="sh-timeline-item mb-1">
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Status:
                          </CFormLabel>
                          &nbsp;
                          {item.status}
                        </div>
                        {item.comments ? (
                          <div className="mb-1 resignation-comments">
                            <CFormLabel className="col-form-label p-0">
                              Comments:
                            </CFormLabel>
                            &nbsp;
                            <span className="descriptionField">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.comments,
                                }}
                              />
                            </span>
                          </div>
                        ) : (
                          ''
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CForm>
    </>
  )
}

export default ResignationTimeLine
