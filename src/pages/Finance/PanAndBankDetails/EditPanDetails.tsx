import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import OCard from '../../../components/ReusableComponent/OCard'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { BankInformation } from '../../../types/Finance/PanDetails/panDetailsTypes'

const EditPanDetails = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const initialPanDetails = {} as BankInformation
  const [editPanDetail, setEditPanDetail] = useState(initialPanDetails)
  const { financeId } = useParams<{ financeId: string }>()
  const [uploadPanDetail, setUploadPanDetail] = useState<File | undefined>(
    undefined,
  )
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const onChangeInputHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'aadharCardNumber') {
      const aadharNumber = value.replace(/\D/g, '')
      setEditPanDetail((prevState) => {
        return { ...prevState, ...{ [name]: Number(aadharNumber) } }
      })
    } else
      setEditPanDetail((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
  }

  const onChangeAttachmentHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadPanDetail(file[0])
  }

  const saveTheDataToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Finance details successfully saved."
    />
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const saveBtnHandler = async () => {
    if (uploadPanDetail) {
      const formData = new FormData()
      formData.append('file', uploadPanDetail, uploadPanDetail.name)
      const prepareObject = {
        financeId: Number(financeId),
        file: formData,
      }

      const savePanDataResult = await dispatch(
        reduxServices.panDetails.updateFinanceInformation(
          editPanDetail.finance,
        ),
      )
      if (
        reduxServices.panDetails.updateFinanceInformation.fulfilled.match(
          savePanDataResult,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(saveTheDataToastElement))
        dispatch(
          reduxServices.panDetails.uploadEmployeeFinanceDetails(prepareObject),
        )
        dispatch(reduxServices.panDetails.bankInformation(Number(employeeId)))
      }
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'P.F. & PAN Details'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mt-2 mb-2">
          <CFormLabel className="col-sm-2 col-form-label">
            P.F. A/C No:
          </CFormLabel>
          <CCol sm={2}>
            <CFormCheck
              className="mt-2"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <CFormInput
              className="eventType-editInput"
              data-testid="pfNumber"
              type="text"
              id="pfNumber"
              size="sm"
              name="pfAccountNumber"
              autoComplete="off"
              hidden={!isChecked}
              value={editPanDetail.finance?.pfAccountNumber || ''}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CFormLabel className="col-sm-2 col-form-label">UAN:</CFormLabel>
          <CCol sm={2}>
            <CFormInput
              className="eventType-editInput"
              data-testid="uanNumber"
              type="text"
              id="uanNumber"
              size="sm"
              name="uaNumber"
              value={editPanDetail.finance?.uaNumber || ''}
              onChange={onChangeInputHandler}
              autoComplete="off"
            />
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CFormLabel className="col-sm-2 col-form-label">
            Pan Card No:
          </CFormLabel>
          <CCol sm={2}>
            <CFormInput
              className="eventType-editInput"
              data-testid="panCardNumber"
              type="text"
              id="panCardNumber"
              size="sm"
              name="panCardAccountNumber"
              value={editPanDetail.finance?.panCardAccountNumber || ''}
              onChange={onChangeInputHandler}
              autoComplete="off"
            />
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CFormLabel className="col-sm-2 col-form-label">
            Aadhar Card No:
          </CFormLabel>
          <CCol sm={2}>
            <CFormInput
              className="eventType-editInput"
              data-testid="aadharNumber"
              type="text"
              id="aadharNumber"
              size="sm"
              name="aadharCardNumber"
              value={editPanDetail.finance?.aadharCardNumber || ''}
              onChange={onChangeInputHandler}
              autoComplete="off"
            />
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CFormLabel className="col-sm-2 col-form-label">
            Attachment:
          </CFormLabel>
          <CCol sm={2}>
            <input
              className="mt-1"
              data-testid="attachment"
              type="file"
              name="attachment"
              onChange={(element: SyntheticEvent) =>
                onChangeAttachmentHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 8, offset: 2 }}>
            <CTooltip content="Save">
              <CButton
                size="sm"
                className="btn btn-success btn-sm btn-ovh-employee-list cursor-pointer"
                color="success btn-ovh me-2"
                onClick={saveBtnHandler}
              >
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
              </CButton>
            </CTooltip>
            <CTooltip content="Cancel">
              <CButton
                size="sm"
                className="btn btn-warning btn-sm btn-ovh-employee-list cursor-pointer"
                color="warning btn-ovh me-2"
                onClick={() => setToggle('')}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </CButton>
            </CTooltip>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditPanDetails
