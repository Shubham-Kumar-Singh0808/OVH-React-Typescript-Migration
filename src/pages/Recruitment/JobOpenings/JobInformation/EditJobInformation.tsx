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

const EditJobInformation = ({
  setToggle,
  editViewJobInfoData,
  setEditViewJobInfoData,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editViewJobInfoData: GetAllJobVacanciesList
  setEditViewJobInfoData: React.Dispatch<
    React.SetStateAction<GetAllJobVacanciesList>
  >
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isShowDescriptionValue, setIsShowDescriptionValue] =
    useState<boolean>(true)
  const [editDateValue, setEditDateValue] = useState<string>(
    editViewJobInfoData?.expiryDate,
  )
  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const descriptionHandler = (description: string) => {
    setEditViewJobInfoData((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }
  const datePickerHandlerFunction = (value: Date) => {
    setEditDateValue(moment(value).format(dateFormat))
  }

  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'noOfRequirements') {
      const limit = value.replace(/\D/g, '')
      setEditViewJobInfoData((prevState) => {
        return { ...prevState, ...{ [name]: Number(limit) } }
      })
    } else
      setEditViewJobInfoData((prevState) => {
        return {
          ...prevState,
          ...{
            [name]: value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, ''),
          },
        }
      })
  }

  const SuccessUpdateMessage = (
    <OToast
      toastMessage="Job opening is successfully edited..
          "
      toastColor="success"
    />
  )
  const cancelBtnHandlerFtn = () => {
    setToggle('')
  }
  const updateBtnHandlerFtn = async () => {
    const prepareObject = {
      id: editViewJobInfoData.id,
      jobCode: editViewJobInfoData.jobCode,
      positionVacant: editViewJobInfoData.positionVacant,
      minimumExperience: editViewJobInfoData.minimumExperience,
      description: editViewJobInfoData.description,
      opendDate: editViewJobInfoData.opendDate,
      expiryDate: editDateValue,
      noOfRequirements: editViewJobInfoData.noOfRequirements,
      offered: editViewJobInfoData.offered,
      remaining: editViewJobInfoData.remaining,
      status: editViewJobInfoData.status,
    }
    const updateResultAction = await dispatch(
      reduxServices.jobVacancies.updateJobVacancy(prepareObject),
    )
    if (
      reduxServices.jobVacancies.updateJobVacancy.fulfilled.match(
        updateResultAction,
      )
    ) {
      dispatch(
        reduxServices.jobVacancies.getAllJobVacancies({
          startIndex: 0,
          endIndex: 20,
          searchJobTitle: '',
          status: '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(SuccessUpdateMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  useEffect(() => {
    setIsShowDescriptionValue(false)
    setTimeout(() => {
      setIsShowDescriptionValue(true)
    }, 100)
  }, [])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Edit Job Info'}
        data-testid="title"
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
              className={
                editViewJobInfoData?.jobCode ? 'text-white' : 'text-danger'
              }
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
              value={editViewJobInfoData?.jobCode}
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
              className={
                editViewJobInfoData?.positionVacant ? TextWhite : TextDanger
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
              value={editViewJobInfoData?.positionVacant}
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
              className={
                editViewJobInfoData?.noOfRequirements ? TextWhite : TextDanger
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
              value={editViewJobInfoData?.noOfRequirements}
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
              className={
                editViewJobInfoData?.minimumExperience ? TextWhite : TextDanger
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
              value={editViewJobInfoData?.minimumExperience}
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
              id="editDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="expiryDate"
              value={editDateValue || ''}
              minDate={new Date()}
              onChange={(date: Date) => datePickerHandlerFunction(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel className={TextLabelProps}>Job Description: </CFormLabel>
          {isShowDescriptionValue ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editViewJobInfoData?.description || ''}
                data-testid="allocateEmployeeComment"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  descriptionHandler(editor.getData().trim())
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
            <span
              className={editViewJobInfoData?.status ? TextWhite : TextDanger}
            >
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
              value={editViewJobInfoData?.status}
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
              onClick={updateBtnHandlerFtn}
            >
              Update
            </CButton>
            <CButton
              data-testid="cancelBtn"
              className="btn-ovh me-1 text-white"
              color="warning"
              onClick={cancelBtnHandlerFtn}
            >
              Cancel
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditJobInformation
