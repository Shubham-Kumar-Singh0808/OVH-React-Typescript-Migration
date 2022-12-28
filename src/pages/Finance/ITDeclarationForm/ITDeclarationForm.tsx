import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CRow, CCol, CFormCheck, CButton } from '@coreui/react-pro'
import EmployeeDetails from './EmployeeDetails'
import IncomeTaxAct from './IncomeTaxAct'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'

const ITDeclarationForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const itDeclarationFormExists = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.itDeclarationFormExists,
  )
  const grandTotal = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.grandTotal,
  )
  const warningToastMessage = (
    <OToast
      toastMessage="You had submitted IT Declaration Form so you cannot fill the form again."
      toastColor="danger"
    />
  )

  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.isITDeclarationFormExist())
    if (itDeclarationFormExists === true) {
      dispatch(reduxServices.app.actions.addToast(warningToastMessage))
      history.push('/itDeclarationList')
    }
  }, [dispatch, itDeclarationFormExists])

  const isSubmitBtnEnabled = useTypedSelector(
    (state) => state.itDeclarationForm.isSubmitButtonEnabled,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration Form"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EmployeeDetails />
        <IncomeTaxAct />
        <CRow className="mt-3 mb-3">
          <CCol sm={12}>
            <p className="pull-right">
              <b className="txt-grandtotal ">Grand Total: {grandTotal}</b>
            </p>
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CCol sm={12} className="mt-2">
            <CFormCheck name="agree" data-testid="ch-agree" />{' '}
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
          <CCol className="col-md-3 offset-md-4">
            <CButton
              color="success"
              className="btn-ovh me-1"
              data-testid="df-submit-btn"
              size="sm"
              disabled={!isSubmitBtnEnabled}
            >
              Submit
            </CButton>
            <CButton
              color="warning "
              className="btn-ovh"
              data-testid="df-clear-btn"
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default ITDeclarationForm
