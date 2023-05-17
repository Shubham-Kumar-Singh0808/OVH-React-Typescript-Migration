import React, { useEffect, useState } from 'react'
import {
  CTooltip,
  CButton,
  CRow,
  CFormLabel,
  CCol,
  CTable,
  CTableBody,
} from '@coreui/react-pro'
import ITInvestmentTableRow from './ITInvestmentTableRow'
import {
  FormInvestment,
  FormSection,
} from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import {
  getInvestmentById,
  getSubTotalAmountOfEachSection,
  initialFormInvestment,
  numbersOnlyRegex,
} from '../ITDeclarationListHelpers'
import { Sections } from '../../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'

const ITSections = ({
  currentSection,
  sectionsWithInvests,
  isOldEmployee,
}: {
  currentSection: FormSection
  sectionsWithInvests: Sections[]
  isOldEmployee: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [userInvestmentList, setUserInvestmentList] = useState<
    FormInvestment[]
  >(currentSection.formInvestmentDTO)
  const [isMoreInvestBtnEnable, setIsMoreInvestBtnEnable] =
    useState<boolean>(true)

  // as data changes in redux, the data is updated here
  useEffect(() => {
    setUserInvestmentList(currentSection.formInvestmentDTO)
  }, [currentSection.formInvestmentDTO])

  // this is to disable more investment button once it reaches maximum number of investments of the section
  useEffect(() => {
    const originalInvestmentList = sectionsWithInvests?.filter(
      (section) => section.sectionId === currentSection.sectionId,
    )[0].invests
    if (originalInvestmentList?.length === userInvestmentList.length) {
      setIsMoreInvestBtnEnable(false)
    } else {
      setIsMoreInvestBtnEnable(true)
    }
  }, [userInvestmentList])

  //if total amount of section is execeeding max Limit, button is disabled and error message is thrown
  useEffect(() => {
    if (
      getSubTotalAmountOfEachSection(currentSection.formInvestmentDTO) >
      currentSection.maxLimit
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage="Total Entered Amount Exceeding Max Limit"
            toastColor="danger"
          />,
        ),
      )
    }
  }, [currentSection.formInvestmentDTO])

  const removeSectionButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    dispatch(
      reduxServices.itDeclarationList.actions.setModal({
        showModal: true,
        description: `Do you really want to remove this ${currentSection.sectionName}?`,
        confirmButtonFunction: removeSectionModalButtonHandler,
        confirmBtnText: 'Yes',
        cancelBtnText: 'No',
      }),
    )
  }

  const removeSectionModalButtonHandler = () => {
    dispatch(
      reduxServices.itDeclarationList.actions.removeSectionInUpdateIT({
        sectionId: currentSection.sectionId,
        isOld: isOldEmployee,
      }),
    )
    dispatch(reduxServices.itDeclarationList.actions.setShowModal(false))
  }

  const investmentButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.itDeclarationList.actions.addInvestmentToSection({
        sectionId: currentSection.sectionId,
        isOld: isOldEmployee,
        investment: initialFormInvestment,
      }),
    )
  }

  const deleteInvestmentButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: number,
    investmentId: number,
  ) => {
    e.preventDefault()
    dispatch(
      reduxServices.itDeclarationList.actions.deleteInvestmentFromSection({
        sectionId,
        investmentId,
        isOld: isOldEmployee,
      }),
    )
  }

  const investmentChangesFunction = (
    sectionId: number,
    investment: FormInvestment,
    isOld: boolean,
    investmentIndex: number,
  ) => {
    dispatch(
      reduxServices.itDeclarationList.actions.updateInvestmentOfSection({
        sectionId,
        investment,
        isOld,
        investmentIndex,
      }),
    )
  }

  const investmentChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    sectionId: number,
    investment: FormInvestment,
    investmentIndex: number,
  ) => {
    const isInvestmentExist = userInvestmentList.find(
      (invest) => invest.investmentId === +e.target.value,
    )
    if (isInvestmentExist !== undefined) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage="Investment Already Exists"
            toastColor="danger"
          />,
        ),
      )
      return
    }
    const totalInvestmentData = getInvestmentById(
      sectionsWithInvests,
      sectionId,
      +e.target.value, //investment id
    )
    const newInvestmentObject: FormInvestment = {
      customAmount: investment.customAmount.toString(),
      investmentId: totalInvestmentData.investmentId,
      investmentName: totalInvestmentData.investmentName,
      formInvestmentId: null,
    }
    investmentChangesFunction(
      sectionId,
      newInvestmentObject,
      isOldEmployee,
      investmentIndex,
    )
  }

  const amountChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionId: number,
    investment: FormInvestment,
    investmentIndex: number,
  ) => {
    const totalInvestmentData = getInvestmentById(
      sectionsWithInvests,
      sectionId,
      investment.investmentId, //investment id
    )
    const newInvestmentObject: FormInvestment = {
      customAmount: e.target.value.replace(numbersOnlyRegex, ''),
      investmentId: totalInvestmentData.investmentId,
      investmentName: totalInvestmentData.investmentName,
      formInvestmentId: null,
    }
    investmentChangesFunction(
      sectionId,
      newInvestmentObject,
      isOldEmployee,
      investmentIndex,
    )
  }

  const contentButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: number,
    investmentId: number,
    type: 'query' | 'doc',
  ) => {
    e.preventDefault()
    const investment = getInvestmentById(
      sectionsWithInvests,
      sectionId,
      investmentId,
    )
    const modalObject = {
      showModal: true,
      footerClass: 'd-none',
    }
    if (type === 'query') {
      dispatch(
        reduxServices.itDeclarationList.actions.setModal({
          ...modalObject,
          description: investment.description ? investment.description : '',
        }),
      )
    } else {
      dispatch(
        reduxServices.itDeclarationList.actions.setModal({
          ...modalObject,
          description: investment.requiredDocs,
        }),
      )
    }
  }

  return (
    <>
      <div
        className="block-session clearfix widget_gap ms-3 me-3"
        data-testid={`${currentSection.sectionId}-${currentSection.isOld}`}
      >
        <CTooltip content="Cancel">
          <CButton
            color="warning"
            className="btn btn-warning close-btn"
            data-testid={`updateIT-del-section-${currentSection.sectionId}-${isOldEmployee}`}
            size="sm"
            onClick={removeSectionButtonHandler}
          >
            <i className="fa fa-times text-white"></i>
          </CButton>
        </CTooltip>
        <CRow className="form-group">
          <CRow className="col-sm-4">
            <CFormLabel className="col-sm-3 txt-info"> Sections:</CFormLabel>
            <CCol className="col-sm-8">
              <CFormLabel
                className="txt-info"
                data-testid={`sectionName-${isOldEmployee}-${currentSection.sectionId}`}
              >
                {currentSection.sectionName}
              </CFormLabel>
            </CCol>
          </CRow>
          <div className="col-sm-2 ps-2">
            <CButton
              color="info"
              className="text-white btn-ovh"
              size="sm"
              data-testid={`moreInvestmentBtn-${isOldEmployee}-${currentSection.sectionId}`}
              onClick={investmentButtonHandler}
              disabled={!isMoreInvestBtnEnable}
            >
              <i className="fa fa-plus me-1"></i>
              More Investments
            </CButton>
          </div>
          <div className="col-sm-6">
            <b className="pull-right txt-info">
              Max Limit:{' '}
              <span
                className="txt-info"
                data-testid={`maxLimitSection-${isOldEmployee}-${currentSection.sectionId}`}
              >
                {currentSection.maxLimit?.toLocaleString('en-IN')}
              </span>
            </b>
          </div>
        </CRow>
        <CTable striped responsive>
          <CTableBody>
            {currentSection.formInvestmentDTO?.map(
              (currentInvestment, investmentIndex) => {
                return (
                  <React.Fragment key={investmentIndex}>
                    <ITInvestmentTableRow
                      investment={currentInvestment}
                      currentSectionId={currentSection.sectionId}
                      investmentIndex={investmentIndex}
                      sectionsWithInvests={sectionsWithInvests}
                      investmentChangeHandler={investmentChangeHandler}
                      amountChangeHandler={amountChangeHandler}
                      deleteInvestmentButtonHandler={
                        deleteInvestmentButtonHandler
                      }
                      contentButtonHandler={contentButtonHandler}
                    />
                  </React.Fragment>
                )
              },
            )}
          </CTableBody>
        </CTable>
        <div className="clearfix">
          <p className="pull-right txt-subtotal">
            Sub Total:{' '}
            <span data-testid="subtotal">
              {getSubTotalAmountOfEachSection(
                currentSection.formInvestmentDTO,
              )?.toLocaleString('en-IN')}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default ITSections
