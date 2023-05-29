import React, { useEffect, useState } from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react-pro'
import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { Link, useHistory } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import {
  TextWhite,
  TextDanger,
  TextLabelProps,
} from '../../../../constant/ClassName'
import { dateFormat } from '../../../../constant/DateFormat'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddJobOpening = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }
  const [jobCode, setJobCode] = useState<string>('')
  const [jobTitle, setJobTitle] = useState<string>('')
  const [noOfOpenings, setNoOfOpenings] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [expireDate, setExpireDate] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isShowComment, setIsShowComment] = useState<boolean>(true)
  const [selectStatus, setSelectStatus] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [jobCodeExist, setJobCodeExist] = useState('')

  const jobVacancies = useTypedSelector(
    reduxServices.jobVacancies.selectors.getJobVacancies,
  )

  const jobCodeExists = (name: string) => {
    return jobVacancies?.find((code) => {
      return code.jobCode.toLowerCase() === name.toLowerCase()
    })
  }
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'jobCode') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setJobCode(newValue)
    } else if (name === 'jobTitle') {
      const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setJobTitle(newValue)
    } else if (name === 'noOfOpenings') {
      const targetValue = value.replace(/\D/g, '').replace(/^0+/, '')
      setNoOfOpenings(targetValue)
    } else if (name === 'experience') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setExperience(newValue)
    }
    if (jobCodeExists(value.trim())) {
      setJobCodeExist(value.trim())
    } else {
      setJobCodeExist('')
    }
  }

  const onHandleStartDatePicker = (value: Date) => {
    setExpireDate(moment(value).format(dateFormat))
  }
  const handleText = (comments: string) => {
    setDescription(comments)
  }
  const clearInputs = () => {
    setJobTitle('')
    setJobCode('')
    setNoOfOpenings('')
    setExperience('')
    setExpireDate('')
    setDescription('')
    setIsShowComment(false)
    setSelectStatus('')
    setTimeout(() => {
      setIsShowComment(true)
    }, 0)
  }

  useEffect(() => {
    if (jobCode && jobTitle && noOfOpenings && experience && selectStatus) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [jobCode, jobTitle, noOfOpenings, experience, selectStatus])

  const successToast = (
    <OToast toastMessage="Job Added Successfully" toastColor="success" />
  )

  const addJobVacancyButtonHandler = async () => {
    const isAddLocation = await dispatch(
      reduxServices.jobVacancies.addJobVacancy({
        description,
        expiryDate: expireDate,
        jobCode,
        minimumExperience: experience,
        noOfRequirements: noOfOpenings,
        positionVacant: jobTitle,
        status: selectStatus,
      }),
    )
    if (
      reduxServices.jobVacancies.addJobVacancy.fulfilled.match(isAddLocation)
    ) {
      history.push('/jobvacancies')
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Job Opening
        "
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={'/jobvacancies'}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Code:
            <span className={jobCode ? TextWhite : TextDanger}>*</span>
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
              value={jobCode}
              onChange={handledInputChange}
            />
            {jobCodeExist && (
              <span className={TextDanger} data-testid="nameAlreadyExist">
                <b>Job Code already exist</b>
              </span>
            )}
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Title:
            <span className={jobTitle ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="jobTitle"
              type="text"
              id="jobTitle"
              size="sm"
              name="jobTitle"
              autoComplete="off"
              placeholder="Title"
              value={jobTitle}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            No. of Openings:
            <span className={noOfOpenings ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="noOfOpenings"
              type="text"
              id="noOfOpenings"
              size="sm"
              name="noOfOpenings"
              autoComplete="off"
              placeholder="No of Openings"
              value={noOfOpenings}
              onChange={handledInputChange}
              maxLength={5}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Experience:
            <span className={experience ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="experience"
              type="text"
              id="experience"
              size="sm"
              name="experience"
              autoComplete="off"
              placeholder="Experience"
              value={experience}
              onChange={handledInputChange}
              maxLength={11}
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
              id="expireDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="expireDate"
              value={expireDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleStartDatePicker(date)}
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
                initData={description}
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
            <span className={selectStatus ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="selectStatus"
              className="mb-2"
              id="selectStatus"
              data-testid="selectStatus"
              name="selectStatus"
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
            >
              <option value={''}>Select Status</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={
                isAddButtonEnabled
                  ? isAddButtonEnabled && jobCodeExist.length > 0
                  : !isAddButtonEnabled
              }
              onClick={addJobVacancyButtonHandler}
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning"
              className="btn-ovh text-white"
              onClick={clearInputs}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default AddJobOpening
