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
  CForm,
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
  // console.log(candidateDepartment + 'candidateDepartment')

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

  // const personTechnologySelector = useTypedSelector(
  //   reduxServices.addNewCandidate.selectors,
  // )

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
  }, [dispatch])

  dispatch(
    reduxServices.intervieweeDetails.timeLineData(
      timeLineListSelector.personId,
    ),
  )

  const addNewJoinee = useTypedSelector(
    reduxServices.KRA.selectors.empDepartments,
  )

  const result = addNewJoinee?.filter(
    (item) => item.departmentId === candidateDepartment,
  )
  // console.log(result + 'V')

  const [uploadErrorText, setUploadErrorText] = useState<string>('')
  const [isUploadBtnEnabled, setIsUploadBtnEnabled] = useState(false)
  const [uploadFeedbackForm, setUploadFeedbackForm] = useState<
    File | undefined
  >(undefined)
  const onChangeJoineeFileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['pdf', 'doc', 'docx']
    let extension = ''
    if (!file) return
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
    setIsUploadBtnEnabled(true)
    setUploadErrorText('')
    setUploadFeedbackForm(file[0])
  }

  useEffect(() => {
    if (uploadFeedbackForm) {
      setIsUploadBtnEnabled(true)
    } else {
      setIsUploadBtnEnabled(false)
    }
  })
  // ------------------------------------------------------------

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

  //   -------------------------------------------------------------

  // useEffect(() => {
  //   dispatch(reduxServices.addNewCandidate.getPersonTechnologyData(getPersonTechnologyData))
  // }, [dispatch])

  useEffect(() => {
    dispatch(
      reduxServices.addNewCandidate.getPersonTechnologyData(
        timeLineListSelector?.personId,
      ),
    )
  }, [dispatch])

  // const successToast = (
  //   <OToast
  //     toastMessage="Product type updated successfully.
  //     "
  //     toastColor="success"
  //   />
  // )

  //   const handleAddCandidate = async () => {
  //     const addRecord1 = await dispatch(
  //       reduxServices.addNewCandidate.getAddNewJoineeData({
  //         appliedForLookUp: '',
  //         candidateId: '',
  //         candidateName,
  //         comments: candidateComment,
  //         currentCTC: curruentCTC,
  //         dateOfJoining: dateOfJoiningDate,
  //         departmentName: candidateDepartment as string,
  //         designation,
  //         employmentType: employeeType,
  //         jobType,
  //         sendOfferMessagetoCandidate: sendMessageToCandiDate,
  //         technology: '',
  //       }),
  //     )
  //     if (
  //       reduxServices.addNewCandidate.getAddNewJoineeData.fulfilled.match(
  //         addRecord1,
  //       )
  //     ) {
  //       //   setToggle('')
  //       dispatch(reduxServices.app.actions.addToast(successToast))
  //       dispatch(reduxServices.app.actions.addToast(undefined))
  //       dispatch(
  //         reduxServices.intervieweeDetails.timeLineData(
  //           timeLineListSelector.personId,
  //         ),
  //       )
  //     }
  //   }

  // const handleAddCandidate1 = () => {
  //   dispatch(
  //     reduxServices.addNewCandidate.getAddNewJoineeData({
  //       appliedForLookUp: position,
  //       // candidateId: timeLineListSelector?.personId,
  //       candidateId: '',
  //       candidateName,
  //       comments: candidateComment,
  //       currentCTC: curruentCTC,
  //       dateOfJoining: dateOfJoiningDate,
  //       departmentName: result[0].departmentName,
  //       designation,
  //       employmentType: employeeType,
  //       jobType,
  //       sendOfferMessagetoCandidate: sendMessageToCandiDate,
  //       technology: '',
  //     }),
  //   )
  // }

  const addFailedToastMessage = (
    <OToast
      toastMessage="Joinee already added."
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const handleAddCandidate = async () => {
    const addCandidate = await dispatch(
      reduxServices.addNewCandidate.getAddNewJoineeData({
        appliedForLookUp: position,
        candidateId: timeLineListSelector.personId,
        candidateName,
        comments: candidateComment,
        currentCTC: curruentCTC,
        dateOfJoining: dateOfJoiningDate,
        departmentName: result[0]?.departmentName || '',
        designation,
        employmentType: employeeType,
        jobType,
        sendOfferMessagetoCandidate: sendMessageToCandiDate,
        technology: timeLineListSelector?.personId,
      }),
    )
    if (
      reduxServices.addNewCandidate.getAddNewJoineeData.fulfilled.match(
        addCandidate,
      )
    ) {
      //   setApproveLeaveComment('')
      //   setIsApproveModalVisibility(false)

      dispatch(
        reduxServices.intervieweeDetails.timeLineData(
          timeLineListSelector.personId,
        ),
      )
    } else if (
      reduxServices.addLocationList.deleteLocation.rejected.match(
        addCandidate,
      ) &&
      addCandidate.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(addFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const handleCurruentCTCChange = (e: { target: { value: any } }) => {
    const input = e.target.value
    const regex = /^[0-9]*$/ // Regular expression to match only numbers

    if (regex.test(input)) {
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
            <CCol sm={6}>
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
            <div className="col-sm-3">
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
            </div>
          </CCol>
        </CRow>

        <CRow>
          <div className="d-md-flex justify-content-md-end pull-right">
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
            {uploadErrorText && (
              <div id="error" className="mt-1">
                <strong className="text-danger">{uploadErrorText}</strong>
              </div>
            )}
          </div>
        </CRow>

        {/* <CRow className="justify-content-end p-0">
            <CCol sm={3}>
              <label className="search_emp">
                <CFormCheck
                  className="pt-2"
                  data-testid="ch-searchByEmployee"
                  id="searchByEmployee"
                  name="Multiple Search"
                  checked={searchByEmployee}
                  onChange={(e) => setSearchByEmployee(e.target.checked)}
                />
                <b>Search by Employee Name</b>
              </label>
            </CCol>
          </CRow> */}

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
