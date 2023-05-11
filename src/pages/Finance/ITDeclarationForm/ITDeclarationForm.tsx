import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CRow, CCol, CFormCheck, CButton } from '@coreui/react-pro'
import EmployeeDetails from './EmployeeDetails'
import IncomeTaxAct from './IncomeTaxAct'
import PreviousEmployerAct from './PreviousEmployerAct/PreviousEmployerAct'
import { interchangeMonthAndDay } from './ITDeclarationFormHelpers'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'
import OModal from '../../../components/ReusableComponent/OModal'
import { emptyString } from '../../../constant/constantData'

const ITDeclarationForm = (): JSX.Element => {
  const [isAgreeChecked, setIsAgreeChecked] = useState<boolean>(false)
  const [enteredOrganization, setEnteredOrganization] =
    useState<string>(emptyString)
  const [enteredFromDate, setEnteredFromDate] = useState<string>(emptyString)
  const [enteredToDate, setEnteredToDate] = useState<string>(emptyString)
  const [enteredFile, setEnteredFile] = useState<File | undefined>(undefined)

  const dispatch = useAppDispatch()
  const history = useHistory()
  const itDeclarationFormExists = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.itDeclarationFormExists,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToSubmitDeclarationForm = userAccessToFeatures?.find(
    (feature) => feature.name === 'IT Declaration Form',
  )
  const grandTotalResult = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.grandTotal,
  )
  const employeeDetails = useTypedSelector(
    (state) => state.itDeclarationForm.employeeDetails,
  )
  const finalITDeclarationData = useTypedSelector(
    (state) => state.itDeclarationForm.submitITDeclarationForm,
  )
  const modal = useTypedSelector((state) => state.itDeclarationForm.modal)

  const warningToastMessage = (
    <OToast
      toastMessage="You had submitted IT Declaration Form so you cannot fill the form again."
      toastColor="danger"
    />
  )

  const organizationChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredOrganization(e.target.value)
  }

  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.isITDeclarationFormExist())
    if (itDeclarationFormExists === true) {
      dispatch(reduxServices.app.actions.addToast(warningToastMessage))
      history.push('/itDeclarationList')
    }
  }, [])

  const isButtonEnabled = useTypedSelector(
    (state) => state.itDeclarationForm.isSubmitButtonEnabled,
  )

  console.log(useTypedSelector((state) => state.itDeclarationForm))

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="IT Declaration Form added Successfully"
    />
  )

  const finalITSubmissionForSectionDTO = useTypedSelector(
    (state) => state.itDeclarationForm.submitITDeclarationForm.formSectionsDTOs,
  )

  //the income tax 1961 act is compulsory
  useEffect(() => {
    if (
      finalITSubmissionForSectionDTO.filter((item) => item.isOld === true)
        .length === 0
    ) {
      dispatch(
        reduxServices.itDeclarationForm.actions.setSubmitButtonDisabled(),
      )
    }
  }, [finalITSubmissionForSectionDTO])

  const handleSubmitDeclarationForm = async () => {
    const formData = new FormData()
    if (enteredFile) {
      formData.append('file', enteredFile)
    }
    const prepareObject = {
      ...finalITDeclarationData,
      designation: employeeDetails.designation,
      employeeId: employeeDetails.employeeId,
      employeeName: employeeDetails.fullName,
      fromDate: interchangeMonthAndDay(enteredFromDate),
      grandTotal: grandTotalResult,
      isAgree: isAgreeChecked,
      organisationName: enteredOrganization,
      panNumber: employeeDetails.pan,
      toDate: interchangeMonthAndDay(enteredToDate),
    }
    const addDeclarationFormResultAction = await dispatch(
      reduxServices.itDeclarationForm.addITDeclarationForm(prepareObject),
    )
    const fileUploadResult = await dispatch(
      reduxServices.itDeclarationForm.uploadITDeclareDocuments({
        documentId: Number(addDeclarationFormResultAction.payload),
        document: enteredFile ? formData : '',
      }),
    )
    if (
      reduxServices.itDeclarationForm.addITDeclarationForm.fulfilled.match(
        addDeclarationFormResultAction,
      ) &&
      reduxServices.itDeclarationForm.uploadITDeclareDocuments.fulfilled.match(
        fileUploadResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      history.push('/itDeclarationList')
    }
  }

  const modalVisibleHandler = (value: boolean) => {
    dispatch(reduxServices.itDeclarationForm.actions.modalVisible({ value }))
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.reload()
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
        <IncomeTaxAct />
        <PreviousEmployerAct
          enteredOrganization={enteredOrganization}
          organizationChangeHandler={organizationChangeHandler}
          enteredFromDate={enteredFromDate}
          setEnteredFromDate={setEnteredFromDate}
          enteredToDate={enteredToDate}
          setEnteredToDate={setEnteredToDate}
          setEnteredFile={setEnteredFile}
        />

        <CRow className="mt-3 mb-3">
          <CCol sm={12}>
            <p className="pull-right">
              <b className="txt-grandtotal ">Grand Total: {grandTotalResult}</b>
            </p>
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CCol sm={12} className="mt-2 ps-4 pe-4">
            <CFormCheck
              name="agree"
              data-testid="ch-agree"
              onChange={() => setIsAgreeChecked(!isAgreeChecked)}
              checked={isAgreeChecked}
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
          {userAccessToSubmitDeclarationForm?.createaccess && (
            <CCol className="col-md-3 offset-md-4">
              <CButton
                color="success"
                className="btn-ovh me-1"
                data-testid="decform-final-submit-btn"
                size="sm"
                onClick={handleSubmitDeclarationForm}
                disabled={!isButtonEnabled || !isAgreeChecked}
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                className="btn-ovh"
                data-testid="df-clear-btn"
                onClick={clearButtonHandler}
              >
                Clear
              </CButton>
            </CCol>
          )}
        </CRow>
      </OCard>
      <OModal
        visible={modal?.showModal}
        modalSize="lg"
        setVisible={modalVisibleHandler}
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        {modal?.modalDescription}
      </OModal>
    </>
  )
}

export default ITDeclarationForm
