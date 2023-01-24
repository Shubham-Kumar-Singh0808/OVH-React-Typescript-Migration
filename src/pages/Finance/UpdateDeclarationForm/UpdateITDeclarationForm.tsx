import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CRow, CCol, CFormCheck, CButton } from '@coreui/react-pro'
import EditIncomeTaxActForm from './EditIncomeTaxActForm'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'
import EmployeeDetails from '../ITDeclarationForm/EmployeeDetails'

const UpdateITDeclarationForm = (): JSX.Element => {
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  const [isAgreeCheck, setIsAgreeCheck] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToUpdateDeclarationForm = userAccessToFeatures?.find(
    (feature) => feature.name === 'IT Declaration Form',
  )
  const grandTotalResult = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.grandTotal,
  )
  const formSectionData = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.formSectionData,
  )

  useEffect(() => {
    if (isAgreeCheck) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [isAgreeCheck])

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="IT Declaration Form added Successfully"
    />
  )

  const handleUpdateDeclarationForm = async () => {
    const prepareObject = {
      designation: '',
      employeeId: 0,
      employeeName: '',
      formSectionsDTOs: formSectionData,
      fromDate: '',
      grandTotal: grandTotalResult,
      isAgree: isAgreeCheck,
      itDeclarationFormId: null,
      organisationName: '',
      panNumber: '',
      toDate: '',
    }
    console.log(prepareObject)
    const addDeclarationFormResultAction = await dispatch(
      reduxServices.itDeclarationForm.addITDeclarationForm(prepareObject),
    )
    if (
      reduxServices.itDeclarationForm.addITDeclarationForm.fulfilled.match(
        addDeclarationFormResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      history.push('/itDeclarationList')
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration Form"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EmployeeDetails />
        <EditIncomeTaxActForm />
        <CRow className="mt-3 mb-3">
          <CCol sm={12}>
            <p className="pull-right">
              <b className="txt-grandtotal ">Grand Total: {grandTotalResult}</b>
            </p>
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CCol sm={12} className="mt-2">
            <CFormCheck
              name="agree"
              data-testid="edit-ch-agree"
              onChange={() => setIsAgreeCheck(!isAgreeCheck)}
              checked={isAgreeCheck}
            />
            <span className="ps-2">
              <strong>
                I, declare that the above statement is true to the best of my
                knowledge and belief. In the event of any change that may occur
                during the year pertaining to the information given in the form,
                I undertake to inform the same to the company. Income Tax
                liability arising due to failure, if any, for not making / not
                intimating payment / investment made or proposed to be made by
                me and / or any wrong declaration would be my responsibility. I
                further undertake to provide all documentary proofs of payment
                made by me and if I fail to do so, the company can make full
                deduction of income tax dues from salary.
              </strong>
            </span>
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          {userAccessToUpdateDeclarationForm?.updateaccess && (
            <CCol className="col-md-3 offset-md-3">
              <CButton
                className="btn-ovh"
                color="success"
                disabled={!isUpdateButtonEnabled}
                onClick={handleUpdateDeclarationForm}
              >
                Update
              </CButton>
            </CCol>
          )}
        </CRow>
      </OCard>
    </>
  )
}

export default UpdateITDeclarationForm
