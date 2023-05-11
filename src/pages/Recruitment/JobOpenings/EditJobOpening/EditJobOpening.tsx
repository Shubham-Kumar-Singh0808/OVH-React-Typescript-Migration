/* eslint-disable import/named */
import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import OCard from '../../../../components/ReusableComponent/OCard'
import { GetAllJobVacanciesList } from '../../../../types/Recruitment/JobOpenings/jobOpeningsTypes'
import {
  TextWhite,
  TextDanger,
  TextLabelProps,
} from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { dateFormat } from '../../../../constant/DateFormat'
import OToast from '../../../../components/ReusableComponent/OToast'

const EditJobOpening = ({
  setToggle,
  editJobInfo,
  setEditJobInfo,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editJobInfo: GetAllJobVacanciesList
  setEditJobInfo: React.Dispatch<React.SetStateAction<GetAllJobVacanciesList>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isShowComment, setIsShowComment] = useState<boolean>(true)
  const [editToDate, setEditToDate] = useState<string>(editJobInfo.expiryDate)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  console.log(editToDate + 'editToDate')

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  useEffect(() => {
    if (
      editJobInfo.jobCode &&
      editJobInfo.minimumExperience &&
      editJobInfo.noOfRequirements &&
      editJobInfo.positionVacant &&
      editJobInfo.status
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editJobInfo])

  const handleText = (description: string) => {
    setEditJobInfo((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }
  const onHandleDatePicker = (value: Date) => {
    setEditToDate(moment(value).format(dateFormat))
  }
  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    setEditJobInfo((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Job opening is successfully edited.
      "
      toastColor="success"
    />
  )

  const updateHandler = async () => {
    const prepareObject = {
      id: editJobInfo.id,
      jobCode: editJobInfo.jobCode,
      positionVacant: editJobInfo.positionVacant,
      minimumExperience: editJobInfo.minimumExperience,
      description: editJobInfo.description,
      opendDate: editJobInfo.opendDate,
      expiryDate: editToDate,
      noOfRequirements: editJobInfo.noOfRequirements,
      offered: editJobInfo.offered,
      remaining: editJobInfo.remaining,
      status: editJobInfo.status,
    }
    const updateAppraisalCycleResultAction = await dispatch(
      reduxServices.jobVacancies.updateJobVacancy(prepareObject),
    )
    if (
      reduxServices.jobVacancies.updateJobVacancy.fulfilled.match(
        updateAppraisalCycleResultAction,
      )
    ) {
      setToggle('')
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  useEffect(() => {
    setIsShowComment(false)
    setTimeout(() => {
      setIsShowComment(true)
    }, 100)
  }, [])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Job Opening"
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
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Code:
            <span
              className={editJobInfo.jobCode ? 'text-white' : 'text-danger'}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="Job-Code"
              type="text"
              id="jobCode"
              size="sm"
              name="jobCode"
              autoComplete="off"
              placeholder="Job Code"
              value={editJobInfo.jobCode}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Title:
            <span
              className={editJobInfo.positionVacant ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="positionVacant"
              type="text"
              id="positionVacant"
              size="sm"
              name="positionVacant"
              autoComplete="off"
              placeholder="Title"
              value={editJobInfo.positionVacant}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            No. of Openings:
            <span
              className={editJobInfo.noOfRequirements ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="noOfRequirements"
              type="text"
              id="noOfRequirements"
              size="sm"
              name="noOfRequirements"
              autoComplete="off"
              placeholder="No of Openings"
              value={editJobInfo.noOfRequirements}
              maxLength={5}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Experience:
            <span
              className={editJobInfo.minimumExperience ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="minimumExperience"
              type="text"
              id="minimumExperience"
              size="sm"
              name="minimumExperience"
              autoComplete="off"
              placeholder="Experience"
              maxLength={11}
              value={editJobInfo.minimumExperience}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Expire Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="expiryDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="expiryDate"
              value={editToDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleDatePicker(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel className={TextLabelProps}>Job Description: </CFormLabel>
          {isShowComment ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editJobInfo.description}
                data-testid="allocateEmployeeComment"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleText(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Status:
            <span className={editJobInfo.status ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="status"
              className="mb-2"
              id="status"
              data-testid="status"
              name="status"
              value={editJobInfo.status}
              onChange={onChangeInputHandler}
            >
              <option value={''}>Select Status</option>
              <option value="open">Open</option>
              <option value="close">Close</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="updateBtn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isUpdateButtonEnabled}
              onClick={updateHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditJobOpening
