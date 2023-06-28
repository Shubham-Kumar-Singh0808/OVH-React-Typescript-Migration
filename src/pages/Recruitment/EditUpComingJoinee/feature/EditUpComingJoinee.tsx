import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { SyntheticEvent } from 'react-draft-wysiwyg'
import OCard from '../../../../components/ReusableComponent/OCard'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { showIsRequired } from '../../../../utils/helper'
import { dateFormat } from '../../../../constant/DateFormat'
import OToast from '../../../../components/ReusableComponent/OToast'
import { UpComingJoineeList } from '../../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'

const EditUpComingJoinee = ({
  setToggle,
  editNewJoineeInfo,
  setEditNewJoineeInfo,
  searchInput,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editNewJoineeInfo: UpComingJoineeList
  setEditNewJoineeInfo: React.Dispatch<React.SetStateAction<UpComingJoineeList>>
  searchInput: string | undefined
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [editToDate, setEditToDate] = useState<string>(
    editNewJoineeInfo.dateOfJoining,
  )
  const [uploadErrorText, setUpdateUploadErrorText] = useState<string>('')
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  const [candidateComment, setCandidateComment] = useState<string>('')

  useEffect(() => {
    setCandidateComment(editNewJoineeInfo.comments)
  }, [editNewJoineeInfo.comments])

  const addNewJoinee = useTypedSelector(
    reduxServices.KRA.selectors.empDepartments,
  )

  const designations = useTypedSelector(
    reduxServices.KRA.selectors.designations,
  )
  const result = addNewJoinee?.filter(
    (item) => item?.departmentName === editNewJoineeInfo?.departmentName,
  )
  useEffect(() => {
    if (result[0]?.departmentId) {
      dispatch(reduxServices.KRA.getDesignationThunk(result[0]?.departmentId))
    }
  }, [dispatch, result[0]?.departmentId])

  useEffect(() => {
    dispatch(reduxServices.KRA.getEmpDepartmentThunk())
  }, [dispatch])

  const onChangeUpdateJoineeFileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['pdf', 'doc', 'docx', 'zip']
    let extension = ''

    if (!file) return

    if (file && file[0] !== undefined) {
      extension = file[0].name.split('.').pop() as string
    }

    if (file[0] !== undefined && file[0].size > 2048000) {
      setUpdateUploadErrorText('Please upload a file less than 2MB.')
      return
    }

    if (!acceptedFileTypes.includes(extension)) {
      setUpdateUploadErrorText('Please choose a doc, docx, pdf, or zip file.')
      return
    }

    setUpdateUploadErrorText('')
  }

  const addNewJoineeTechno = useTypedSelector(
    reduxServices.candidateList.selectors.getAllTechnology,
  )
  useEffect(() => {
    if (
      editNewJoineeInfo.candidateName &&
      editNewJoineeInfo.appliedForLookUp &&
      editNewJoineeInfo.currentCTC &&
      editNewJoineeInfo.employmentType &&
      editNewJoineeInfo.jobType &&
      editNewJoineeInfo.dateOfJoining &&
      editNewJoineeInfo.technology
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editNewJoineeInfo])

  const onHandleDatePicker = (value: Date) => {
    setEditToDate(moment(value).format(dateFormat))
  }
  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'currentCTC' || name === 'experience') {
      const limit = value.replace(/\D/g, '')
      setEditNewJoineeInfo((prevState) => {
        return { ...prevState, ...{ [name]: limit } }
      })
    } else
      setEditNewJoineeInfo((prevState) => {
        return {
          ...prevState,
          ...{
            [name]: value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, ''),
          },
        }
      })
  }
  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Changes updated successfully.."
      toastColor="success"
    />
  )

  const handleUpdateNewJoinee = async () => {
    const prepareObject = {
      appliedForLookUp: editNewJoineeInfo.appliedForLookUp,
      attachedDocumentPath: editNewJoineeInfo.attachedDocumentPath,
      candidateEmail: editNewJoineeInfo.candidateEmail,
      candidateId: editNewJoineeInfo.candidateId,
      candidateInterviewStatus: editNewJoineeInfo.candidateInterviewStatus,
      candidateName: editNewJoineeInfo.candidateName,
      comments: editNewJoineeInfo.comments,
      currentCTC: editNewJoineeInfo.currentCTC,
      dateOfBirth: editNewJoineeInfo.dateOfBirth,
      dateOfJoining: editToDate,
      departmentName: editNewJoineeInfo.departmentName,
      designation: editNewJoineeInfo.designation,
      employmentType: editNewJoineeInfo.employmentType,
      experience: editNewJoineeInfo.experience,
      id: editNewJoineeInfo.id,
      jobType: editNewJoineeInfo.jobType,
      mobile: editNewJoineeInfo.mobile,
      sendOfferMessagetoCandidate:
        editNewJoineeInfo.sendOfferMessagetoCandidate,
      status: editNewJoineeInfo.status,
      technology: editNewJoineeInfo.technology,
    }
    const updateAppraisalCycleResultAction = await dispatch(
      reduxServices.upComingJoinList.updateNewJoineeThunk(prepareObject),
    )
    if (
      reduxServices.upComingJoinList.updateNewJoineeThunk.fulfilled.match(
        updateAppraisalCycleResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.upComingJoinList.getUpConingJoinList({
          endIndex: 20,
          searchName: searchInput,
          startIndex: 0,
        }),
      )
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  console.log(editNewJoineeInfo)
  console.log(editNewJoineeInfo.candidateInterviewStatus)
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
            Position:
            <span
              className={showIsRequired(editNewJoineeInfo.appliedForLookUp)}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="updatePosition"
              type="text"
              id="name"
              size="sm"
              name="appliedForLookUp"
              placeholder="Position"
              value={editNewJoineeInfo.appliedForLookUp}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Name:
            <span className={showIsRequired(editNewJoineeInfo.candidateName)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="updateName"
              type="text"
              id="name"
              size="sm"
              name="candidateName"
              autoComplete="off"
              placeholder="Name"
              value={editNewJoineeInfo.candidateName}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Email:
            <span className={showIsRequired(editNewJoineeInfo.candidateEmail)}>
              *
            </span>
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
              value={editNewJoineeInfo.candidateEmail}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Experience:
            <span className={showIsRequired(editNewJoineeInfo.experience)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="Experience"
              type="text"
              id="experience"
              size="sm"
              name="experience"
              placeholder="Experience"
              value={editNewJoineeInfo.experience}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
            <span className={showIsRequired(editNewJoineeInfo.departmentName)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="departmentName"
              id="departmentName"
              size="sm"
              aria-label="Department"
              name="departmentName"
              value={editNewJoineeInfo.departmentName}
              onChange={onChangeInputHandler}
            >
              <option value={''}></option>
              {addNewJoinee?.length > 0 &&
                addNewJoinee?.map((item, index) => (
                  <option key={index} value={item.departmentName}>
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
            <span className={showIsRequired(editNewJoineeInfo.designation)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="designation"
              id="id"
              size="sm"
              aria-label="Designation"
              name="designation"
              value={editNewJoineeInfo.designation}
              onChange={onChangeInputHandler}
            >
              <option value={''}>Select Designation</option>
              {designations?.length > 0 &&
                designations?.map((location, index) => (
                  <option key={index}>{location.name}</option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Technology:
            <span className={showIsRequired(editNewJoineeInfo.technology)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="technology"
              id="id"
              size="sm"
              aria-label="technology"
              name="technology"
              value={editNewJoineeInfo.technology}
              onChange={onChangeInputHandler}
            >
              <option value={''}></option>
              {addNewJoineeTechno?.length > 0 &&
                addNewJoineeTechno?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mt-3">
          <CCol sm={3} md={3} className="text-end">
            <CFormLabel className="mt-1">
              D.O.J:
              <span className={showIsRequired(editNewJoineeInfo.dateOfJoining)}>
                *
              </span>
            </CFormLabel>
          </CCol>
          <CCol sm={3}>
            <DatePicker
              className="form-control form-control-sm sh-date-picker"
              data-testid="dateOfJoiningDate"
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/mm/yy"
              name="dateOfJoiningDate"
              id="dateOfJoiningDate"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              value={editToDate || ''}
              onChange={(date: Date) => onHandleDatePicker(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            CTC:
            <span className={showIsRequired(editNewJoineeInfo.currentCTC)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="UpdateCandidateCTC"
              type="text"
              id="candidateCTC"
              size="sm"
              name="currentCTC"
              autoComplete="off"
              placeholder="CTC"
              value={editNewJoineeInfo.currentCTC}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Employment Type:
            <span className={showIsRequired(editNewJoineeInfo.employmentType)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="updateEmploymentType"
              id="selectEmploymentType"
              size="sm"
              aria-label="selectEmploymentType"
              name="employmentType"
              value={editNewJoineeInfo.employmentType}
              onChange={onChangeInputHandler}
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
            <span className={showIsRequired(editNewJoineeInfo.jobType)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="jobTypeId"
              id="jobType"
              size="sm"
              aria-label="JobType"
              name="jobType"
              value={editNewJoineeInfo.jobType}
              onChange={onChangeInputHandler}
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
            <span
              className={showIsRequired(
                editNewJoineeInfo.candidateInterviewStatus,
              )}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="update-joining-Status"
              id="candidateInterviewStatus"
              size="sm"
              aria-label="JoiningStatus"
              name="candidateInterviewStatus"
              value={editNewJoineeInfo.candidateInterviewStatus}
              onChange={onChangeInputHandler}
            >
              <option value="DID_NOT_JOIN">DID NOT JOIN</option>
              <option value="OFFERED">OFFERED</option>
              <option value="OFFER_CANCELLED">OFFER CANCELLED</option>
              <option value="JOINED">JOINED</option>
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
                data-testid="update-text-area"
                aria-label="textarea"
                autoComplete="off"
                maxLength={250}
                name="comments"
                id="comments"
                value={editNewJoineeInfo.comments}
                placeholder="comments"
                className="sh-question"
                onChange={onChangeInputHandler}
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
                onChangeUpdateJoineeFileUploadHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
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
            data-testid="update-btn"
            color="success"
            className="btn-ovh me-1"
            size="sm"
            name="Add"
            disabled={!isUpdateButtonEnabled}
            onClick={handleUpdateNewJoinee}
          >
            Update
          </CButton>
        </CCol>
      </OCard>
    </>
  )
}

export default EditUpComingJoinee
