import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { EditBankInformation } from '../../../../types/Finance/PanDetails/bankDetailsTypes'
import { showIsRequired } from '../../../../utils/helper'

const EditBankAccount = ({
  backButtonHandler,
  selectBankId,
}: {
  backButtonHandler: () => void
  selectBankId: number
}): JSX.Element => {
  const editBankAccount = {} as EditBankInformation
  const [editBankInfo, setEditBankInfo] = useState(editBankAccount)
  const [isUpdateBtnEnabled, setIsUpdateBtnEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }
  const empId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const bankData = useTypedSelector(
    reduxServices.bankDetails.selectors.bankList,
  )
  const getEditBankAccount = useTypedSelector(
    reduxServices.bankDetails.selectors.editBankData,
  )

  useEffect(() => {
    if (getEditBankAccount != null) {
      setEditBankInfo(getEditBankAccount)
    }
  }, [getEditBankAccount])

  const onChangeInputHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'bankAccountNumber') {
      const bankActNumber = value.replace(/\D/g, '')
      setEditBankInfo((values) => {
        return { ...values, ...{ [name]: bankActNumber } }
      })
    } else if (name === 'ifscCode') {
      const code = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setEditBankInfo((values) => {
        return { ...values, ...{ [name]: code } }
      })
    } else
      setEditBankInfo((values) => {
        return { ...values, ...{ [name]: value } }
      })
  }

  useEffect(() => {
    if (
      editBankInfo.bankAccountNumber &&
      editBankInfo.bankName &&
      editBankInfo.ifscCode
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [editBankInfo])

  const updateToastMessage = (
    <OToast
      toastMessage="  Your changes have been saved successfully.
    "
      toastColor="success"
    />
  )
  const alreadyExistErrorToast = (
    <OToast
      toastMessage="AccountNumber and BankName combination already exist"
      toastColor="danger"
    />
  )

  useEffect(() => {
    dispatch(reduxServices.bankDetails.editBankInformation(selectBankId))
  }, [])

  const bankInformation = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )

  const handleUpdateHandler = async () => {
    const prepareObject = {
      ...editBankInfo,
      bankId: editBankInfo.bankId,
      employeeId: Number(empId),
    }

    await dispatch(
      reduxServices.panDetails.bankInformation({
        key: 'loggedInEmpId',
        value: Number(empId),
      }),
    )
    if (bankInformation) {
      const errorResult = bankInformation.bankinfo?.find(
        (currItem) =>
          currItem.bankName === editBankInfo.bankName &&
          currItem.bankAccountNumber === editBankInfo.bankAccountNumber,
      )
      if (errorResult === undefined) {
        await dispatch(
          reduxServices.bankDetails.updateBankInformation(prepareObject),
        )
        backButtonHandler()
        dispatch(reduxServices.app.actions.addToast(updateToastMessage))
        dispatch(reduxServices.app.actions.addToast(undefined))
      } else {
        dispatch(reduxServices.app.actions.addToast(alreadyExistErrorToast))
        dispatch(reduxServices.app.actions.addToast(undefined))
      }
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Bank Account Information"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Bank Account Number:
              <span
                className={
                  editBankInfo?.bankAccountNumber?.length > 8
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-2"
                data-testid="bankAccountNumber"
                type="text"
                id="Number"
                size="sm"
                name="bankAccountNumber"
                autoComplete="off"
                maxLength={18}
                placeholder="Bank Account Number"
                value={editBankInfo.bankAccountNumber}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Name of the Bank:
              <span className={showIsRequired(editBankInfo?.bankName)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="bankName"
                data-testid="form-select1"
                name="bankName"
                value={editBankInfo.bankName}
                onChange={onChangeInputHandler}
              >
                <option value={''}>Select</option>
                {bankData.length > 0 &&
                  bankData?.map((name, index) => (
                    <option key={index} value={name.bankName}>
                      {name.bankName}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              IFSC Code:
              <span
                className={showIsRequired(editBankInfo?.ifscCode as string)}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-2"
                data-testid="ifsc-code"
                type="text"
                id="code"
                size="sm"
                name="ifscCode"
                autoComplete="off"
                placeholder="IFSC Code"
                maxLength={11}
                value={editBankInfo.ifscCode as string}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
        </CForm>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="update-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isUpdateBtnEnabled}
              onClick={handleUpdateHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}
export default EditBankAccount
