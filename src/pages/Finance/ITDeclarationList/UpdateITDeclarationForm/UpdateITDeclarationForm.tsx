/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from 'react'
import { CCardHeader, CCol, CFormCheck, CRow, CButton } from '@coreui/react-pro'
import ITEmployeeDetails from './ITEmployeeDetails'
import ITSectionsFilter from './ITSectionsFilter'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  compareDate,
  declareStatement,
  getWordsDate,
  interchangeMonthAndDay,
} from '../../ITDeclarationForm/ITDeclarationFormHelpers'
import PreviousEmployerAct from '../../ITDeclarationForm/PreviousEmployerAct/PreviousEmployerAct'
import { reduxServices } from '../../../../reducers/reduxServices'
import OModal from '../../../../components/ReusableComponent/OModal'
import {
  getGrandTotalFromSubSectionsTotal,
  getInitialGetITDeclarationForm,
  isInvestmentNotFilledOut,
  isSubSectionTotalExceedingMaxLimit,
  returnEmptyStringIfDateInvalid,
} from '../ITDeclarationListHelpers'
import {
  FinalUpdateITFormDTO,
  ITDeclarationFormToggleType,
} from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

/*
  This component follows top-down approach in flow of data. All the data is coming from the redux store.
  The data is being changed first goes to redux store followed by being stored in local state.
*/

const UpdateITDeclarationForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const employeeDetails = useTypedSelector(
    (state) => state.itDeclarationList.employeeDetails,
  )
  const cycleId = useTypedSelector(
    (state) => state.itDeclarationList.updatedITDeclarationFormDTO.cycleId,
  )
  const itDeclarationFormId = useTypedSelector(
    (state) =>
      state.itDeclarationList.updatedITDeclarationFormDTO.itDeclarationFormId,
  )
  const userSelectedSections = useTypedSelector(
    (state) =>
      state.itDeclarationList.updatedITDeclarationFormDTO.formSectionsDTOs,
  )
  const employeeEnteredDetails = useTypedSelector(
    (state) => state.itDeclarationList.updatedITDeclarationFormDTO,
  )
  const grandTotal = useTypedSelector(
    (state) => state.itDeclarationList.updatedITDeclarationFormDTO.grandTotal,
  )
  const isAgreeChecked = useTypedSelector(
    (state) => state.itDeclarationList.updatedITDeclarationFormDTO.isAgree,
  )
  const modalData = useTypedSelector((state) => state.itDeclarationList.modal)
  const isButtonEnabled = useTypedSelector(
    (state) => state.itDeclarationList.isUpdateITFormButtonEnabled,
  )
  const [enteredOrganizationName, setEnteredOrganizationName] =
    useState<string>(employeeEnteredDetails?.organisationName)
  const [enteredFromDate, setEnteredFromDate] = useState<string>(
    returnEmptyStringIfDateInvalid(employeeEnteredDetails?.fromDate),
  ) // converting to month/day/year
  const [enteredToDate, setEnteredToDate] = useState<string>(
    returnEmptyStringIfDateInvalid(employeeEnteredDetails?.toDate),
  )
  const [enteredFile, setEnteredFile] = useState<File>()

  const organizationNameChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredOrganizationName(e.target.value)
  }

  const agreeCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.itDeclarationList.actions.setIsAgreeChecked({
        value: e.target.checked,
      }),
    )
  }

  const showModalHandler = (value: boolean) => {
    dispatch(reduxServices.itDeclarationList.actions.setShowModal(value))
  }

  const oldEmployeeSections = useMemo(() => {
    return userSelectedSections.filter((section) => section.isOld === true)
  }, [userSelectedSections])

  const newEmployeeSections = useMemo(() => {
    return userSelectedSections.filter((section) => section.isOld === false)
  }, [userSelectedSections])

  useEffect(() => {
    if (
      oldEmployeeSections.length === 0 ||
      isInvestmentNotFilledOut(userSelectedSections) ||
      isSubSectionTotalExceedingMaxLimit(userSelectedSections)
    ) {
      dispatch(
        reduxServices.itDeclarationList.actions.setUpdateITButtonBoolean(true),
      )
    } else {
      dispatch(
        reduxServices.itDeclarationList.actions.setUpdateITButtonBoolean(false),
      )
    }
  }, [oldEmployeeSections, newEmployeeSections, enteredFromDate, enteredToDate])

  useEffect(() => {
    dispatch(
      reduxServices.itDeclarationList.actions.setGrandTotal(
        getGrandTotalFromSubSectionsTotal(userSelectedSections),
      ),
    )
  }, [userSelectedSections])

  console.log(getWordsDate(employeeDetails.activeCyle))

  const updateButtonClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const finalData: FinalUpdateITFormDTO = {
      itDeclarationFormId,
      designation: employeeDetails.designation,
      employeeId: employeeDetails.employeeId,
      employeeName: employeeDetails.fullName,
      panNumber: employeeDetails.pan,
      organisationName: enteredOrganizationName,
      fromDate: interchangeMonthAndDay(enteredFromDate),
      toDate: interchangeMonthAndDay(enteredToDate), //converting to day/month/year
      isAgree: isAgreeChecked,
      grandTotal,
      formSectionsDTOs: userSelectedSections,
    }
    const formData = new FormData()
    if (enteredFile) {
      formData.append('file', enteredFile)
    }
    const result = await dispatch(
      reduxServices.itDeclarationList.editITForm(finalData),
    )
    const documentUploadResult = await dispatch(
      reduxServices.itDeclarationList.uploadITDeclarationDocument({
        documentId: itDeclarationFormId,
        document: enteredFile === undefined ? '' : formData,
      }),
    )
    if (
      reduxServices.itDeclarationList.editITForm.fulfilled.match(result) &&
      reduxServices.itDeclarationList.uploadITDeclarationDocument.fulfilled.match(
        documentUploadResult,
      )
    ) {
      dispatch(
        reduxServices.itDeclarationList.actions.setToggle(
          ITDeclarationFormToggleType.HomePage,
        ),
      )
    }
  }

  const backBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.itDeclarationList.getITDeclarationForm(
        getInitialGetITDeclarationForm(cycleId),
      ),
    )
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.HomePage,
      ),
    )
  }

  const activeCycle = useTypedSelector(
    (state) => state.itDeclarationList.employeeDetails.activeCyle,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration Form"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mt-2 justify-content-end text-end">
          <CCol xs={2} className="px-0">
            <CButton
              color="info"
              data-testid="updateIT-back-btn"
              className="btn-ovh me-3"
              onClick={backBtnHandler}
            >
              <i className="fa fa-arrow-left me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <ITEmployeeDetails employeeInformation={employeeDetails} />
        <CCardHeader>
          <h4 className="h4">
            Deduction available for Salaried employees under Income Tax Act 1961
          </h4>
        </CCardHeader>
        <ITSectionsFilter
          userSelectedSections={oldEmployeeSections}
          showAsterix={true}
          sectionsButtonText="More Sections"
          isOldEmployee={true}
        />

        {compareDate(employeeDetails.activeCyle, employeeDetails.joinDate) && (
          <>
            <PreviousEmployerAct
              enteredOrganization={enteredOrganizationName}
              organizationChangeHandler={organizationNameChangeHandler}
              enteredFromDate={enteredFromDate}
              setEnteredFromDate={setEnteredFromDate}
              enteredToDate={enteredToDate}
              setEnteredToDate={setEnteredToDate}
              setEnteredFile={setEnteredFile}
              dateToShow={getWordsDate(activeCycle)}
            />
            <ITSectionsFilter
              userSelectedSections={newEmployeeSections}
              showAsterix={false}
              sectionsButtonText="Add More"
              isOldEmployee={false}
            />
          </>
        )}

        <CRow className="mt-3 mb-3">
          <CCol sm={12}>
            {userSelectedSections.length > 0 && (
              <p className="pull-right">
                <b
                  className="txt-grandtotal"
                  data-testid="updateIt-grand-total"
                >
                  Grand Total: {grandTotal?.toLocaleString('en-IN')}
                </b>
              </p>
            )}
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CCol sm={12} className="mt-2 ps-4 pe-4">
            <CFormCheck
              style={{ fontWeight: 'bold' }}
              name="agree"
              data-testid="ch-agree"
              hitArea="full"
              onChange={agreeCheckHandler}
              label={declareStatement}
              inline
              checked={isAgreeChecked!} //as I have already changed the value from null to false, I am using not null assertion
            />
          </CCol>
        </CRow>

        <CRow className="mt-2 mb-2">
          <CCol className="col-md-3 offset-md-4">
            <CButton
              color="success"
              className="btn-ovh me-1"
              size="sm"
              data-testid="updateIT-btn"
              onClick={updateButtonClickHandler}
              disabled={isButtonEnabled || !isAgreeChecked!} //as I have already changed the value from null to false, I am using not null assertion
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
      <OModal
        confirmButtonAction={modalData?.confirmButtonFunction}
        visible={modalData?.showModal}
        modalHeaderClass="d-none"
        modalFooterClass={modalData?.footerClass}
        setVisible={showModalHandler}
        confirmButtonText={modalData?.confirmBtnText}
        cancelButtonText={modalData?.cancelBtnText}
      >
        {modalData?.description}
      </OModal>
    </>
  )
}

export default UpdateITDeclarationForm
