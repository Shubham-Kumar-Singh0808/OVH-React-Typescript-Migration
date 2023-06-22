import {
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CFormCheck,
  CButton,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { showIsRequired } from '../../../utils/helper'
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  UpComingJoineeList,
  UpdateUpComingJoineeList,
} from '../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'

export const EditUpComingJoinee = ({
  setToggle,
  editNewJoineeInfo,
  setEditNewJoineeInfo,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editNewJoineeInfo: UpComingJoineeList
  setEditNewJoineeInfo: React.Dispatch<React.SetStateAction<UpComingJoineeList>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(reduxServices.upComingJoinList.updateNewJoineeThunk({' '}))
  // }, [dispatch])

  const history = useHistory()
  const assetListTypeList = useTypedSelector(
    reduxServices.upComingJoinList.selectors.upComingJoinList,
  )
  const editButtonHandler = async () => {
    const updateNewjoinee = await dispatch(
      reduxServices.upComingJoinList.updateNewJoineeThunk({
        appliedForLookUp: '',
        attachedDocumentPath: null,
        candidateEmail: '',
        candidateId: 0,
        candidateInterviewStatus: '',
        candidateName: '',
        comments: '',
        currentCTC: '',
        dateOfBirth: null,
        dateOfJoining: '',
        departmentName: '',
        designation: '',
        employmentType: '',
        experience: '',
        id: 0,
        jobType: '',
        mobile: '',
        sendOfferMessagetoCandidate: null,
        status: '',
        technology: '',
      }),
    )

    if (
      reduxServices.upComingJoinList.updateNewJoineeThunk.fulfilled.match(
        updateNewjoinee,
      )
    ) {
      history.push('/upcomingjoinlist')
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Upcoming Joinee"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>

        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            position:
            {/* <span className={position ? TextWhite : TextDanger}>*</span> */}
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
              // value={position}
              // onChange={(e) => setPosition(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Name:
            {/* <span className={candidateName ? TextWhite : TextDanger}>*</span> */}
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
              // value={candidateName}
              // onChange={(e) => setSetCandidatename(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Email:
            {/* <span className={position ? TextWhite : TextDanger}>*</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="email"
              type="text"
              id="email"
              size="sm"
              name="candidateEmail"
              placeholder="email"
              // value={position}
              // onChange={(e) => setPosition(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Experience:
            {/* <span className={position ? TextWhite : TextDanger}>*</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="Experience"
              type="text"
              id="experience"
              size="sm"
              name="candidateExperience"
              placeholder="Experience"
              // value={position}
              // onChange={(e) => setPosition(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
            {/* <span className={candidateDepartment ? TextWhite : TextDanger}>
            *
          </span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="departmentName"
              id="department"
              size="sm"
              aria-label="Department"
              name="departmentName"
              // value={candidateDepartment}
              // onChange={(e) => setCandidateDepartment(e.target.value)}
            >
              <option value={''}>Select Department</option>
              {/* {addNewJoinee?.length > 0 &&
              addNewJoinee?.map((item, index) => (
                <option key={index} value={item.departmentId}>
                  {item.departmentName}
                </option>
              ))} */}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Designation:
            {/* <span className={designation ? TextWhite : TextDanger}> *</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="designation-id"
              id="id"
              size="sm"
              aria-label="Designation"
              name="id"
              // value={designation}
              // onChange={(e) => setDesignation(e.target.value)}
            >
              <option value={''}>Select Designation</option>
              {/* {designations?.length > 0 &&
              designations?.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))} */}
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mt-3">
          <CCol sm={3} md={3} className="text-end">
            <CFormLabel className="mt-1">
              D.O.J:
              {/* <span className={showIsRequired(dateOfJoiningDate as string)}>
              *
            </span> */}
            </CFormLabel>
          </CCol>
          {/* <CCol sm={3}>
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
            // value={dateOfJoiningDate as string}
            // onChange={(date: Date) => onHandleStartDate(date)}
          />
        </CCol> */}
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            CTC:
            {/* <span className={curruentCTC ? TextWhite : TextDanger}>*</span> */}
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
              // value={curruentCTC}
              // onChange={handleCurruentCTCChange}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Employment Type:
            {/* <span className={employeeType ? TextWhite : TextDanger}>*</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="selectEmploymentType"
              id="selectEmploymentType"
              size="sm"
              aria-label="selectEmploymentType"
              name="employmentId"
              // value={employeeType}
              // onChange={(e) => setEmployeeType(e.target.value)}
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
            {/* <span className={jobType ? TextWhite : TextDanger}>*</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="jobTypeId"
              id="jobType"
              size="sm"
              aria-label="JobType"
              name="jobTypeId"
              // value={jobType}
              // onChange={(e) => setJobType(e.target.value)}
            >
              <option value={''}>Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Joining Status:
            {/* <span className={jobType ? TextWhite : TextDanger}>*</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="joining-Status"
              id="joiningStatus"
              size="sm"
              aria-label="JoiningStatus"
              name="Joining-Status"
              // value={jobType}
              // onChange={(e) => setJobType(e.target.value)}
            >
              <option value={'Did Not Join'}>DID NOT JOIN</option>
              <option value="Offered">OFFERED</option>
              <option value="Offer Cancelled">OFFER CANCELLED</option>
              <option value="Joined">JOINED</option>
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
                // value={candidateComment}
                placeholder="Comments"
                className="sh-question"
                // onChange={(e) => setCandidateComment(e.target.value)}
              ></CFormTextarea>
              {/* <p>{candidateComment?.length}/250</p> */}
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
              // onChange={(element: SyntheticEvent) =>
              //   onChangeJoineeFileUploadHandler(
              //     element.currentTarget as HTMLInputElement,
              //   )
              // }
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
                // checked={sendMessageToCandiDate}
                // onChange={(e) => setSendMessageToCandiDate(e.target.checked)}
              />
            </div>
          </CCol>
          {/* <CCol sm={9} className="offset-md-3">
          {uploadErrorText && (
            <div id="error" className="mt-1">
              <strong className="text-danger">{uploadErrorText}</strong>
            </div>
          )}
        </CCol> */}
        </CRow>

        <CCol className="col-md-3 offset-md-3">
          <CButton
            data-testid="save-btn"
            color="success"
            className="btn-ovh me-1"
            size="sm"
            name="Add"
            // disabled={!isAddButtonEnabled}
            // onClick={handleAddCandidate}
          >
            Update
          </CButton>
        </CCol>
      </OCard>
    </>
  )
}
