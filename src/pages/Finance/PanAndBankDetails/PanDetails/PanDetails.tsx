import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EditPanDetails from './EditPanDetails'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { Finance } from '../../../../types/Finance/PanDetails/panDetailsTypes'

const PanDetails = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isEditPanData, setIsEditPanData] = useState<boolean>(false)
  const [financeId, setFinanceId] = useState(0)
  const initialPanData = {} as Finance
  const [editPanData, setEditPanData] = useState(initialPanData)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const bankDetail = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  useEffect(() => {
    dispatch(
      reduxServices.panDetails.bankInformation({
        key: 'loggedInEmpId',
        value: Number(employeeId),
      }),
    )
    dispatch(reduxServices.bankDetails.bankNameList())
  }, [dispatch])

  const editPanDetailsButtonHandler = (panAndBankDetails: Finance): void => {
    setIsEditPanData(true)
    setFinanceId(panAndBankDetails.financeId)
    setEditPanData(panAndBankDetails)
  }

  const onChangeInputHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'aadharCardNumber') {
      const aadharNumber = value.replace(/\D/g, '')
      setEditPanData((prevState) => {
        return { ...prevState, ...{ [name]: aadharNumber } }
      })
    } else
      setEditPanData((values) => {
        return { ...values, ...{ [name]: value } }
      })
  }
  return (
    <>
      <CRow className="justify-content-end">
        {isEditPanData && bankDetail.finance?.financeId === financeId ? (
          ''
        ) : (
          <CCol className="text-end" md={4}>
            <CTooltip content="Edit">
              <CButton
                size="sm"
                className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                color="info btn-ovh me-1"
                onClick={() => {
                  editPanDetailsButtonHandler(bankDetail.finance)
                }}
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                Edit
              </CButton>
            </CTooltip>
          </CCol>
        )}
      </CRow>
      <CCol sm={5}>
        <CRow>
          <CFormLabel
            className="col-sm-4 col-form-label"
            data-testid="pfNumber"
          >
            <b>P.F. A/C No</b>
          </CFormLabel>
          <CCol sm={1} className="sh-alignment">
            :
          </CCol>
          {isEditPanData && bankDetail.finance?.financeId === financeId ? (
            <CCol sm={5} className="d-flex">
              <CFormCheck
                className="mt-2"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                data-testid="ch-All"
              />
              <CFormInput
                className="eventType-editInput ms-2"
                data-testid="pfNumber"
                type="text"
                id="pfNumber"
                size="sm"
                hidden={!isChecked}
                name="pfAccountNumber"
                autoComplete="off"
                value={editPanData.pfAccountNumber}
                onChange={onChangeInputHandler}
              />
            </CCol>
          ) : (
            <CCol sm={5} className="sh-alignment">
              {bankDetail.finance?.pfAccountNumber || 'N/A'}
            </CCol>
          )}
        </CRow>
      </CCol>
      <CCol sm={5}>
        <CRow>
          <CFormLabel
            className="col-sm-4 col-form-label"
            data-testid="uanNumber"
          >
            <b>UAN</b>
          </CFormLabel>
          <CCol sm={1} className="sh-alignment">
            :
          </CCol>
          {isEditPanData && bankDetail.finance?.financeId === financeId ? (
            <CCol sm={5}>
              <CFormInput
                className="eventType-editInput"
                data-testid="uanNumber"
                type="text"
                id="uanNumber"
                size="sm"
                name="uaNumber"
                autoComplete="off"
                value={editPanData.uaNumber}
                onChange={onChangeInputHandler}
              />
            </CCol>
          ) : (
            <CCol sm={5} className="sh-alignment">
              {bankDetail.finance?.uaNumber || 'N/A'}
            </CCol>
          )}
        </CRow>
      </CCol>
      <CCol sm={5}>
        <CRow>
          <CFormLabel
            className="col-sm-4 col-form-label"
            data-testid="panCardNumber"
          >
            <b>Pan Card No</b>
          </CFormLabel>
          <CCol sm={1} className="sh-alignment">
            :
          </CCol>
          {isEditPanData && bankDetail.finance?.financeId === financeId ? (
            <CCol sm={5}>
              <CFormInput
                className="eventType-editInput"
                data-testid="panCardNumber"
                type="text"
                id="panCardNumber"
                size="sm"
                name="panCardAccountNumber"
                autoComplete="off"
                value={editPanData.panCardAccountNumber}
                onChange={onChangeInputHandler}
              />
            </CCol>
          ) : (
            <CCol sm={5} className="sh-alignment">
              {bankDetail.finance?.panCardAccountNumber || 'N/A'}
            </CCol>
          )}
        </CRow>
      </CCol>
      <CCol sm={5}>
        <CRow>
          <CFormLabel
            className="col-sm-4 col-form-label"
            data-testid="aadharNumber"
          >
            <b>Aadhar Card No</b>
          </CFormLabel>
          <CCol sm={1} className="sh-alignment">
            :
          </CCol>
          {isEditPanData && bankDetail.finance?.financeId === financeId ? (
            <CCol sm={5}>
              <CFormInput
                className="eventType-editInput"
                data-testid="aadharNumber"
                type="text"
                id="aadharNumber"
                size="sm"
                name="aadharCardNumber"
                autoComplete="off"
                value={editPanData.aadharCardNumber}
                onChange={onChangeInputHandler}
              />
            </CCol>
          ) : (
            <CCol sm={5} className="sh-alignment">
              {bankDetail.finance?.aadharCardNumber || 'N/A'}
            </CCol>
          )}
        </CRow>
      </CCol>
      <EditPanDetails
        isEditPanData={isEditPanData}
        setIsEditPanData={setIsEditPanData}
        financeId={financeId}
        editPanData={editPanData}
      />
    </>
  )
}

export default PanDetails
