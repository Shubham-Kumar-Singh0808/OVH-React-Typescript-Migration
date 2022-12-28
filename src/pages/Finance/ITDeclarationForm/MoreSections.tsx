import {
  CButton,
  CCol,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import InvestmentTable from './InvestmentTable'
import {
  itDeclarationFormSectionList,
  Investment,
  Sections,
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
}: {
  sectionItem: Sections
  handleShowRemoveSectionModal: (investId: number, investName: string) => void
  handleConfirmCancelSection: () => void
  setSectionList: (value: Sections[]) => void
  sectionList: Sections[]
  index: number
  setFormSectionList: (value: itDeclarationFormSectionList[]) => void
  formSectionList: itDeclarationFormSectionList[]
}): JSX.Element => {
  const [counter, setCounter] = useState(1)
  const [isMoreInvestBtnEnable, setIsMoreInvestBtnEnable] = useState(false)
  const [investmentList, setInvestmentList] = useState<Investment[]>([
    {
      id: counter,
      investmentId: '',
      customAmount: '',
    },
  ])
  const [showSubTotalAmount, setShowSubTotalAmount] = useState<number>(0)
  const [reRender, setReRender] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleClickInvestment = () => {
    setCounter(counter + 1)
    setInvestmentList([
      ...investmentList,
      {
        id: counter + 1,
        investmentId: '',
        customAmount: '',
      },
    ])
  }

  const handleClickRemoveInvestment = (id: number) => {
    const newInvestmentList = investmentList.filter(
      (investment) => investment.id !== id,
    )
    setInvestmentList(newInvestmentList)
    if (newInvestmentList?.length === 0) {
      const newList = sectionList.filter(
        (section) => section.sectionId !== sectionItem.sectionId,
      )
      setSectionList(newList)
    }
    console.log(newInvestmentList.length)
  }

  const changeAmountHandler = (index: number, value: string) => {
    const newInvestmentList: Investment[] = JSON.parse(
      JSON.stringify(investmentList),
    )
    newInvestmentList[index].customAmount = value.replace(/\D/g, '')
    setInvestmentList(newInvestmentList)
  }

  const onChangeCustomAmount = (
    customAmtIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    changeAmountHandler(customAmtIndex, e.target.value)
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

    newInvestmentCopy[investIndex].investmentId = e.target.value
    setInvestmentList(newInvestmentCopy)
    if (isInvestmentExists !== undefined) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
      newInvestmentCopy[investIndex].investmentId = ''
      setInvestmentList(newInvestmentCopy)
      setReRender(!reRender)
      setTimeout(() => {
        dispatch(reduxServices.app.actions.addToast(undefined))
      }, 2000)
    }
  }

  useEffect(() => {
    const total = investmentList.reduce((prev, current) => {
      return prev + +current.customAmount
    }, 0)
    setShowSubTotalAmount(total)
  }, [investmentList])

  useEffect(() => {
    if (sectionItem.sectionLimit < showSubTotalAmount) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage="Section-Limit is Exceeded"
            toastColor="danger"
          />,
        ),
      )
    }
  }, [showSubTotalAmount, sectionItem.sectionLimit])
  useEffect(() => {
    setIsMoreInvestBtnEnable(sectionList[index]?.invests.length <= 1)
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
      <div className="block-session clearfix widget_gap">
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
        <CRow className="form-group">
          <CRow className="col-sm-4">
            <CFormLabel className="col-sm-3 txt-info"> Sections:</CFormLabel>
            <CCol className="col-sm-8">
              <CFormLabel className="txt-info">
                {sectionItem.sectionName}
              </CFormLabel>
            </CCol>
          </CRow>
          <div className="col-sm-2 ps-2">
            <CButton
              color="info"
              className="text-white btn-ovh"
              size="sm"
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
                    currentSec={currentSec}
                    secIndex={secIndex}
                    onChangeCustomAmount={onChangeCustomAmount}
                    onChangeInvestment={onChangeInvestment}
                    index={index}
                    sectionList={sectionList}
                  />
                </React.Fragment>
              )
            })}
          </CTableBody>
        </CTable>
        <div className="clearfix">
          <p className="pull-right txt-subtotal">
            Sub Total: <span>{showSubTotalAmount}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default MoreSections
