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

const EditJobView = ({
  setToggle,
  editViewJobInfo,
  setEditViewJobInfo,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editViewJobInfo: GetAllJobVacanciesList
  setEditViewJobInfo: React.Dispatch<
    React.SetStateAction<GetAllJobVacanciesList>
  >
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isShowDescription, setIsShowDescription] = useState<boolean>(true)
  const [editDate, setEditDate] = useState<string>(editViewJobInfo.expiryDate)
  const [isUpdateBtnEnabled, setIsUpdateBtnEnabled] = useState<boolean>(false)
  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  useEffect(() => {
    if (
      editViewJobInfo.jobCode &&
      editViewJobInfo.minimumExperience &&
      editViewJobInfo.noOfRequirements &&
      editViewJobInfo.positionVacant &&
      editViewJobInfo.status
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [editViewJobInfo])

  const handleDescription = (description: string) => {
    setEditViewJobInfo((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }
  const datePickerHandler = (value: Date) => {
    setEditDate(moment(value).format(dateFormat))
  }

  const onChangeHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'noOfRequirements') {
      const limit = value.replace(/\D/g, '')
      setEditViewJobInfo((prevState) => {
        return { ...prevState, ...{ [name]: Number(limit) } }
      })
    } else
      setEditViewJobInfo((prevState) => {
        return {
          ...prevState,
          ...{
            [name]: value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, ''),
          },
        }
      })
  }

  const updateSuccessMessage = (
    <OToast
      toastMessage="Job opening is successfully edited.
        "
      toastColor="success"
    />
  )

  const updateBtnHandler = async () => {
    const prepareObject = {
      id: editViewJobInfo.id,
      jobCode: editViewJobInfo.jobCode,
      positionVacant: editViewJobInfo.positionVacant,
      minimumExperience: editViewJobInfo.minimumExperience,
      description: editViewJobInfo.description,
      opendDate: editViewJobInfo.opendDate,
      expiryDate: editDate,
      noOfRequirements: editViewJobInfo.noOfRequirements,
      offered: editViewJobInfo.offered,
      remaining: editViewJobInfo.remaining,
      status: editViewJobInfo.status,
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
      dispatch(reduxServices.app.actions.addToast(updateSuccessMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  useEffect(() => {
    setIsShowDescription(false)
    setTimeout(() => {
      setIsShowDescription(true)
    }, 100)
  }, [])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Edit Job Opening'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-btn"
              onClick={() => setToggle('jobInfo')}
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
              className={editViewJobInfo.jobCode ? 'text-white' : 'text-danger'}
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
              value={editViewJobInfo.jobCode}
              onChange={onChangeHandler}
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
              className={
                editViewJobInfo.positionVacant ? TextWhite : TextDanger
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="position-Vacant"
              type="text"
              id="positionVacant"
              size="sm"
              name="positionVacant"
              autoComplete="off"
              placeholder="Title"
              value={editViewJobInfo.positionVacant}
              onChange={onChangeHandler}
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
              className={
                editViewJobInfo.noOfRequirements ? TextWhite : TextDanger
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="noOf-Requirements"
              type="text"
              id="noOfRequirements"
              size="sm"
              name="noOfRequirements"
              autoComplete="off"
              placeholder="No of Openings"
              value={editViewJobInfo.noOfRequirements}
              maxLength={5}
              onChange={onChangeHandler}
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
              className={
                editViewJobInfo.minimumExperience ? TextWhite : TextDanger
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="minimum-Experience"
              type="text"
              id="minimumExperience"
              size="sm"
              name="minimumExperience"
              autoComplete="off"
              placeholder="Experience"
              maxLength={11}
              value={editViewJobInfo.minimumExperience}
              onChange={onChangeHandler}
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
              id="editDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="expiryDate"
              value={editDate || ''}
              minDate={new Date()}
              onChange={(date: Date) => datePickerHandler(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel className={TextLabelProps}>Job Description: </CFormLabel>
          {isShowDescription ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editViewJobInfo.description || ''}
                data-testid="allocateEmployeeComment"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
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
            <span className={editViewJobInfo.status ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="status"
              className="mb-2"
              id="status"
              data-testid="Status"
              name="status"
              value={editViewJobInfo.status}
              onChange={onChangeHandler}
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
              disabled={!isUpdateBtnEnabled}
              onClick={updateBtnHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditJobView
