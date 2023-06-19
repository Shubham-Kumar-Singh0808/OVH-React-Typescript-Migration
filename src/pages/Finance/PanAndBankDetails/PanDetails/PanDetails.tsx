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
import { useHistory, useLocation, useParams } from 'react-router-dom'
import EditPanDetails from './EditPanDetails'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { Finance } from '../../../../types/Finance/PanDetails/panDetailsTypes'
import { useSelectedEmployee } from '../../../../middleware/hooks/useSelectedEmployee'

const PanDetails = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { employeeId } = useParams<{ employeeId: string }>()
  const location = useLocation()

  const [isEditPanData, setIsEditPanData] = useState<boolean>(false)
  const [financeId, setFinanceId] = useState(0)
  const initialPanData = {} as Finance
  const [editPanData, setEditPanData] = useState(initialPanData)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const bankDetail = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )

  const empId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const [isViewingAnotherEmployee] = useSelectedEmployee()

  useEffect(() => {
    if (location.pathname === '/myFinance') {
      dispatch(
        reduxServices.panDetails.bankInformation({
          key: 'loggedInEmpId',
          value: Number(empId),
        }),
      )
      dispatch(reduxServices.bankDetails.bankNameList())
    } else if (location.pathname === `/employeeFinance/${employeeId}`) {
      dispatch(
        reduxServices.panDetails.bankInformation({
          key: 'loggedInEmpId',
          value: Number(employeeId),
        }),
      )
      dispatch(reduxServices.bankDetails.bankNameList())
    }
  }, [dispatch, location.pathname])

  const editPanDetailsButtonHandler = (panAndBankDetails: Finance): void => {
    setIsEditPanData(true)
    setFinanceId(panAndBankDetails.financeId)
    setEditPanData(panAndBankDetails)
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'PF,PAN&Bank Details',
  )

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
  const history = useHistory()
  const handleClick = () => {
    history.goBack()
  }

  const isCheckedVIsible =
    isChecked && bankDetail.finance?.pfAccountNumber
      ? isChecked && bankDetail.finance?.pfAccountNumber
      : 'N/A'

  const backBtnToggle = isViewingAnotherEmployee ? (
    <CButton
      color="info"
      className="btn-ovh me-1"
      data-testid="back-button"
      onClick={handleClick}
    >
      <i className="fa fa-arrow-left  me-1"></i>Back
    </CButton>
  ) : (
    <></>
  )

  return (
    <>
      <CRow className="justify-content-end">
        {isEditPanData && bankDetail.finance?.financeId === financeId ? (
          ''
        ) : (
          <CCol className="text-end" md={4}>
            {userAccess?.updateaccess && (
              <CTooltip content="Edit">
                <CButton
                  className="btn-ovh me-1"
                  color="info"
                  onClick={() => {
                    editPanDetailsButtonHandler(bankDetail.finance)
                  }}
                >
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  &nbsp; Edit
                </CButton>
              </CTooltip>
            )}
            {backBtnToggle}
          </CCol>
        )}
      </CRow>
      <CCol sm={5}>
        <CRow>
          <CFormLabel
            className="col-sm-4 col-form-label"
            data-testid="pfNumber"
          >
            P.F. A/C No
          </CFormLabel>
          <CCol sm={1} className="sh-alignment">
            :
          </CCol>
          {isEditPanData && bankDetail.finance?.financeId === financeId ? (
            <CCol sm={5} className="d-flex sh-checkbox">
              <CFormCheck
                className="mt-2 sh-checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                data-testid="ch-All"
              />
              <CFormInput
                className="eventType-editInput ms-2 "
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
              {isCheckedVIsible}
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
            UAN
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
            Pan Card No
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
      <EditPanDetails
        isEditPanData={isEditPanData}
        setIsEditPanData={setIsEditPanData}
        financeId={financeId}
        editPanData={editPanData}
        onChangeInputHandler={onChangeInputHandler}
      />
    </>
  )
}

export default PanDetails
