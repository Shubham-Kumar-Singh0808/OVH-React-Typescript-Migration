import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { SyntheticEvent } from 'react-draft-wysiwyg'
import OCard from '../../../components/ReusableComponent/OCard'
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { showIsRequired } from '../../../utils/helper'
import { dateFormat } from '../../../constant/DateFormat'
import OToast from '../../../components/ReusableComponent/OToast'

const CandidateOffer = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [candidateDepartment, setCandidateDepartment] = useState<
    string | number
  >('')
  const [uploadedFile, setUploadedFile] = useState<File>()

  const [candidateName, setSetCandidatename] = useState<string>('')
  const [position, setPosition] = useState<string>('')
  const [curruentCTC, setCurruentCTC] = useState<string>('')
  const [employeeType, setEmployeeType] = useState<string>('')
  const [jobType, setJobType] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [dateOfJoiningDate, setDateOfJoiningDate] = useState<Date | string>()
  const [sendMessageToCandiDate, setSendMessageToCandiDate] =
    useState<boolean>(false)
  const [candidateComment, setCandidateComment] = useState<string>('')

  const timeLineListSelector = useTypedSelector(
    reduxServices.intervieweeDetails.selectors.TimeLineListSelector,
  )

  const designations = useTypedSelector(
    reduxServices.KRA.selectors.designations,
  )
  const [designation, setDesignation] = useState<string | number>('')

  useEffect(() => {
    if (candidateDepartment) {
      dispatch(
        reduxServices.KRA.getDesignationThunk(Number(candidateDepartment)),
      )
    }
  }, [dispatch, candidateDepartment])

  useEffect(() => {
    dispatch(reduxServices.KRA.getEmpDepartmentThunk())
    dispatch(
      reduxServices.addNewCandidate.getPersonTechnologyData(
        timeLineListSelector?.personId,
      ),
    )
  }, [dispatch, timeLineListSelector?.personId])

  useEffect(() => {
    dispatch(
      reduxServices.intervieweeDetails.timeLineData(
        timeLineListSelector.personId,
      ),
    )
  }, [dispatch])

  const addNewJoinee = useTypedSelector(
    reduxServices.KRA.selectors.empDepartments,
  )

  const selectedDepartment = addNewJoinee.find(
    (item) => item.departmentId === candidateDepartment,
  )

  const [uploadErrorText, setUploadErrorText] = useState<string>('')

  const onChangeJoineeFileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['pdf', 'doc', 'docx']
    let extension = ''
    if (!file) return
    setUploadedFile(file[0])

    if (file && file[0] !== undefined) {
      extension = file[0].name.split('.').pop() as string
    }
    if (file[0] !== undefined && file[0].size > 2048000) {
      setUploadErrorText('Please upload file lessthan 2MB.')
      return
    }
    if (!acceptedFileTypes.includes(extension)) {
      setUploadErrorText('Please choose doc or docx or pdf or zip. file')
      return
    }
    setUploadErrorText('')
  }

  useEffect(() => {
    if (
      candidateName &&
      position &&
      curruentCTC &&
      employeeType &&
      jobType &&
      dateOfJoiningDate
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [candidateName, position, curruentCTC, employeeType, jobType])

  const handleAddCandidate = async () => {
    const technology = await dispatch(
      reduxServices.addNewCandidate.getPersonTechnologyData(
        timeLineListSelector?.personId,
      ),
    )
    const addCandidate = await dispatch(
      reduxServices.addNewCandidate.getAddNewJoineeData({
        appliedForLookUp: position,
        candidateId: timeLineListSelector.personId || '',
        candidateName,
        comments: candidateComment,
        currentCTC: curruentCTC,
        dateOfJoining: dateOfJoiningDate,
        departmentName: selectedDepartment?.departmentName,
        designation,
        employmentType: employeeType,
        jobType,
        sendOfferMessagetoCandidate: sendMessageToCandiDate,
        technology: (technology.payload as string) || '',
      }),
    )

    if (uploadedFile) {
      const formData = new FormData()
      formData.append('file', uploadedFile, uploadedFile.name)
      const uploadPrepareObject = {
        candidateId: timeLineListSelector.personId,
        file: formData,
      }
      dispatch(
        reduxServices.addNewCandidate.uploadAddNewJoineeFileThunk(
          uploadPrepareObject,
        ),
      )
    }
    if (
      reduxServices.addNewCandidate.getAddNewJoineeData.fulfilled.match(
        addCandidate,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="added new joinee successfully"
          />,
        ),
      )
      window.location.href = '/upcomingjoinlist'
    } else if (
      reduxServices.addNewCandidate.getAddNewJoineeData.rejected.match(
        addCandidate,
      ) &&
      addCandidate.payload === 500
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            joinee already added."
          />,
        ),
      )
    }
  }

  const NUMERIC_REGEX = /^\d*$/

  const handleCurruentCTCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    if (NUMERIC_REGEX.test(input)) {
      setCurruentCTC(input)
    }
  }

  const onHandleStartDate = (value: Date) => {
    setDateOfJoiningDate(moment(value).format(dateFormat))
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add New Joinee"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            position:
            <span className={position ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="candidatePosition"
              type="text"
              id="name"
              size="sm"
              name="candidatePosition"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Name:
            <span className={candidateName ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="candidateName"
              type="text"
              id="name"
              size="sm"
              name="candidateName"
              autoComplete="off"
              placeholder="Name"
              value={candidateName}
              onChange={(e) => setSetCandidatename(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
            <span className={candidateDepartment ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="departmentName"
              id="department"
              size="sm"
              aria-label="Department"
              name="departmentName"
              value={candidateDepartment}
              onChange={(e) => setCandidateDepartment(e.target.value)}
            >
              <option value={''}>Select Department</option>
              {addNewJoinee?.length > 0 &&
                addNewJoinee?.map((item, index) => (
                  <option key={index} value={item.departmentId}>
                    {item.departmentName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Designation:
            <span className={designation ? TextWhite : TextDanger}> *</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="designation-id"
              id="id"
              size="sm"
              aria-label="Designation"
              name="id"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value={''}>Select Designation</option>
              {designations?.length > 0 &&
                designations?.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mt-3">
          <CCol sm={3} md={3} className="text-end">
            <CFormLabel className="mt-1">
              D.O.J:
              <span className={showIsRequired(dateOfJoiningDate as string)}>
                *
              </span>
            </CFormLabel>
          </CCol>
          <CCol sm={3}>
            <DatePicker
              className="form-control form-control-sm sh-date-picker"
              data-testid="join-select"
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/mm/yy"
              name="dateOfJoiningDate"
              id="dateOfJoiningDate"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              value={dateOfJoiningDate as string}
              onChange={(date: Date) => onHandleStartDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            CTC:
            <span className={curruentCTC ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="CandidateCTC"
              type="text"
              id="candidateCTC"
              size="sm"
              name="CandidateCTC"
              autoComplete="off"
              placeholder="CTC"
              value={curruentCTC}
              onChange={handleCurruentCTCChange}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Employment Type:
            <span className={employeeType ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="selectEmploymentType"
              id="selectEmploymentType"
              size="sm"
              aria-label="selectEmploymentType"
              name="employmentId"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              <option value={''}>Select Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Type:
            <span className={jobType ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="jobTypeId"
              id="jobType"
              size="sm"
              aria-label="JobType"
              name="jobTypeId"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value={''}>Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <>
          <CRow className="mt-3">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Comments:
            </CFormLabel>
            <CCol sm={3}>
              <CFormTextarea
                data-testid="text-area"
                aria-label="textarea"
                autoComplete="off"
                maxLength={150}
                value={candidateComment}
                placeholder="Comments"
                className="sh-question"
                onChange={(e) => setCandidateComment(e.target.value)}
              ></CFormTextarea>
              <p>{candidateComment?.length}/250</p>
            </CCol>
          </CRow>
        </>
        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Attach File:
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="file"
              type="file"
              style={{ width: '200px', marginBottom: '0' }}
              data-testid="file-upload"
              onChange={(element: SyntheticEvent) =>
                onChangeJoineeFileUploadHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
          </CCol>
          <CCol sm={3}>
            <div className="d-md-flex justify-content-md-start ">
              <CFormCheck
                className="ticket-search-checkbox"
                inline
                type="checkbox"
                name="internalProject"
                data-testid="msg-candidate"
                id="internalProject"
                label="Send Message to candidate"
                checked={sendMessageToCandiDate}
                onChange={(e) => setSendMessageToCandiDate(e.target.checked)}
              />
            </div>
          </CCol>
          <CCol sm={9} className="offset-md-3">
            {uploadErrorText && (
              <div id="error" className="mt-1">
                <strong className="text-danger">{uploadErrorText}</strong>
              </div>
            )}
          </CCol>
        </CRow>
        <CCol className="col-md-3 offset-md-3">
          <CButton
            data-testid="save-btn"
            color="success"
            className="btn-ovh me-1"
            size="sm"
            name="Add"
            disabled={!isAddButtonEnabled}
            onClick={handleAddCandidate}
          >
            Add
          </CButton>
        </CCol>
      </OCard>
    </>
  )
}

export default CandidateOffer
