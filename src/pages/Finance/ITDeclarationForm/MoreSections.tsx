/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CButton,
  CCol,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import InvestmentTable from './InvestmentTable'
import {
  convertInvestmentToFormInvestmentDTO,
  getInvestment,
  initialInvestment,
  reNumberSerialsOfInvestmentListAndRemove,
} from './ITDeclarationFormHelpers'
import {
  itDeclarationFormSectionList,
  Investment,
  Sections,
  FormSectionsDTO,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'

const MoreSections = ({
  sectionItem,
  handleShowRemoveSectionModal,
  setSectionList,
  sectionList,
  index,
  setFormSectionList,
  formSectionList,
  isOldEmployee,
}: {
  sectionItem: Sections
  handleShowRemoveSectionModal: (investId: number, investName: string) => void
  handleConfirmCancelSection: () => void
  setSectionList: (value: Sections[]) => void
  sectionList: Sections[]
  index: number
  setFormSectionList: (value: itDeclarationFormSectionList[]) => void
  formSectionList: itDeclarationFormSectionList[]
  isOldEmployee: boolean
}): JSX.Element => {
  const [isMoreInvestBtnEnable, setIsMoreInvestBtnEnable] = useState(true)
  const [investmentList, setInvestmentList] = useState<Investment[]>([
    initialInvestment,
  ])
  const [showSubTotalAmount, setShowSubTotalAmount] = useState<number>(0)
  const [reRender, setReRender] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleClickInvestment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const oldInvestmentListLength = investmentList.length
    setInvestmentList([
      ...investmentList,
      {
        ...initialInvestment,
        id: oldInvestmentListLength + 1,
      },
    ])
  }

  const handleClickRemoveInvestment = (id: number) => {
    //this function is to renumber the investments and remove the chosen one based on investmentId
    const newInvestmentList = reNumberSerialsOfInvestmentListAndRemove(
      investmentList,
      id,
    )
    setInvestmentList(newInvestmentList)
    dispatch(
      reduxServices.itDeclarationForm.actions.removeFormSectionInvestmentDTO({
        sectionId: sectionList[index].sectionId,
        investmentId: id,
        isOld: isOldEmployee,
      }),
    )
    if (newInvestmentList?.length === 0) {
      const newList = sectionList.filter(
        (section) => section.sectionId !== sectionItem.sectionId,
      )
      setSectionList(newList)
      dispatch(
        reduxServices.itDeclarationForm.actions.removeFormSectionDTO({
          sectionId: sectionList[index].sectionId,
          isOld: isOldEmployee,
        }),
      )
    }
  }

  const onChangeCustomAmount = (
    customAmtIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInvestmentList: Investment[] = JSON.parse(
      JSON.stringify(investmentList),
    )
    newInvestmentList[customAmtIndex].customAmount = e.target.value.replace(
      /\D/g,
      '',
    )
    setInvestmentList(newInvestmentList)
  }
  const alreadyExistToastMessage = (
    <OToast
      toastMessage="Please select different Investment"
      toastColor="danger"
    />
  )
  const onChangeInvestment = (
    investIndex: number,
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newInvestmentCopy: Investment[] = JSON.parse(
      JSON.stringify(investmentList),
    )
    const isInvestmentExists = newInvestmentCopy.find(
      (currInvestment) => currInvestment.investmentId === e.target.value,
    )
    if (isInvestmentExists !== undefined) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
      newInvestmentCopy[investIndex] = {
        ...initialInvestment,
        id: newInvestmentCopy[investIndex].id,
        investmentId: '',
      }
      setInvestmentList(newInvestmentCopy)
      setReRender(!reRender)
      setTimeout(() => {
        dispatch(reduxServices.app.actions.addToast(undefined))
      }, 2000)
      return
    }
    const chosenInvestment = getInvestment(sectionList, index, +e.target.value)
    newInvestmentCopy[investIndex] = {
      ...newInvestmentCopy[investIndex],
      investmentId: String(chosenInvestment!.investmentId),
      description: chosenInvestment!.description,
      requiredDocs: chosenInvestment!.requiredDocs,
    }
    setInvestmentList(newInvestmentCopy)
    dispatch(reduxServices.itDeclarationForm.actions.setGrandTotalFinal())
  }

  const investmentButtonsHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    investmentId: number,
    type: 'query' | 'doc',
  ) => {
    e.preventDefault()
    const investment = getInvestment(sectionList, index, investmentId)
    if (!investment) {
      return
    }
    if (type === 'query') {
      dispatch(
        reduxServices.itDeclarationForm.actions.setModalDescription({
          description: investment.description,
        }),
      )
    } else {
      dispatch(
        reduxServices.itDeclarationForm.actions.setModalDescription({
          description: investment.requiredDocs,
        }),
      )
    }
    dispatch(
      reduxServices.itDeclarationForm.actions.modalVisible({ value: true }),
    )
  }

  useEffect(() => {
    const total = investmentList.reduce((prev, current) => {
      return prev + +current.customAmount
    }, 0)
    setShowSubTotalAmount(total)
  }, [investmentList])

  //This useEffect is for checking if the total investment amount of section is crossing section limit
  useEffect(() => {
    if (sectionItem.sectionLimit < showSubTotalAmount) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage="Total Entered Amount Exceeding Max Limit"
            toastColor="danger"
          />,
        ),
      )
      // changeAmountHandler(index, '')
      dispatch(
        reduxServices.itDeclarationForm.actions.setSubmitButtonDisabled(),
      )
    } else {
      dispatch(reduxServices.itDeclarationForm.actions.setSubmitButtonEnabled())
    }
  }, [showSubTotalAmount, sectionItem.sectionLimit])

  //Checking if the user has entered and deleted the amount, then button must be disabled
  useEffect(() => {
    if (
      investmentList.some(
        (obj) => obj.customAmount === '' || obj.investmentId === '',
      ) ||
      sectionItem.sectionLimit < showSubTotalAmount
    ) {
      dispatch(
        reduxServices.itDeclarationForm.actions.setSubmitButtonDisabled(),
      )
    } else {
      dispatch(reduxServices.itDeclarationForm.actions.setSubmitButtonEnabled())
    }
  }, [investmentList, showSubTotalAmount])

  //if the number of investments entered is same as coming from api for section, then btn disabled
  useEffect(() => {
    if (sectionList[index]?.invests.length === investmentList.length) {
      setIsMoreInvestBtnEnable(true)
    } else {
      setIsMoreInvestBtnEnable(false)
    }
  }, [investmentList])

  console.log(isOldEmployee)

  useEffect(() => {
    const formSection: FormSectionsDTO = {
      isOld: isOldEmployee,
      itSectionsId: null,
      formInvestmentDTO: convertInvestmentToFormInvestmentDTO(investmentList),
      sectionId: sectionList[index]?.sectionId,
      sectionName: sectionList[index]?.sectionName,
    }
    dispatch(
      reduxServices.itDeclarationForm.actions.setFormSectionDTO(formSection),
    )
    dispatch(reduxServices.itDeclarationForm.actions.setGrandTotalFinal())
  }, [investmentList])

  useEffect(() => {
    const updatedList = formSectionList?.map((item, itemIndex) => {
      if (itemIndex === index) {
        return { ...item, formInvestmentDTO: investmentList }
      } else {
        return item
      }
    })
    setFormSectionList(updatedList)
  }, [index, investmentList])

  return (
    <>
      <div
        className="block-session clearfix widget_gap ms-3 me-3"
        data-testid={`${sectionItem.sectionId}-${isOldEmployee}`}
      >
        <CTooltip content="Cancel">
          <CButton
            color="warning"
            className="btn btn-warning close-btn"
            data-testid="df-cancel-btn"
            size="sm"
            onClick={() =>
              handleShowRemoveSectionModal(
                sectionItem.sectionId,
                sectionItem.sectionName,
              )
            }
          >
            <i className="fa fa-times text-white"></i>
          </CButton>
        </CTooltip>
        <CRow className="form-group">
          <CRow className="col-sm-4 me-2">
            <CFormLabel className="col-sm-3 txt-info"> Sections:</CFormLabel>
            <CCol className="col-sm-8">
              <CFormLabel className="txt-info">
                {sectionItem.sectionName}
              </CFormLabel>
            </CCol>
          </CRow>
          <div className="col-sm-2">
            <CButton
              color="info"
              className="text-white btn-ovh"
              size="sm"
              data-testid="moreInvestmentBtn"
              onClick={handleClickInvestment}
              disabled={isMoreInvestBtnEnable}
            >
              <i className="fa fa-plus me-1"></i>
              More Investments
            </CButton>
          </div>
          <div className="col-sm-6">
            <b className="pull-right txt-info">
              Max Limit:{' '}
              <span className="txt-info">
                {sectionItem.sectionLimit.toLocaleString('en-IN')}
              </span>
            </b>
          </div>
        </CRow>
        <CTable striped responsive>
          <CTableBody>
            {investmentList?.map((currentSec, secIndex) => {
              return (
                <React.Fragment key={secIndex}>
                  <InvestmentTable
                    setShowSubTotalAmount={setShowSubTotalAmount}
                    handleClickRemoveInvestment={handleClickRemoveInvestment}
                    investmentButtonHandler={investmentButtonsHandler}
                    currentSec={currentSec}
                    secIndex={secIndex} //this is the row index
                    onChangeCustomAmount={onChangeCustomAmount}
                    onChangeInvestment={onChangeInvestment}
                    index={index} //this is the section index
                    sectionList={sectionList}
                    isOldEmployee={isOldEmployee}
                  />
                </React.Fragment>
              )
            })}
          </CTableBody>
        </CTable>
        <div className="clearfix">
          <p className="pull-right txt-subtotal">
            Sub Total:{' '}
            <span data-testid="subtotal">
              {showSubTotalAmount.toLocaleString('en-IN')}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default MoreSections
