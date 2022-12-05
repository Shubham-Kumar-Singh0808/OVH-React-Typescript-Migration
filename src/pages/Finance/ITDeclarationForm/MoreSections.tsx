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
  Investment,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'

const MoreSections = ({
  sectionItem,
  handleShowRemoveSectionModal,
  handleConfirmCancelSection,
  setSectionList,
  sectionList,
}: {
  sectionItem: Sections
  handleShowRemoveSectionModal: (investId: number, investName: string) => void
  handleConfirmCancelSection: () => void
  setSectionList: (value: Sections[]) => void
  sectionList: Sections[]
}): JSX.Element => {
  const [counter, setCounter] = useState(1)
  const [investmentList, setInvestmentList] = useState<Investment[]>([
    {
      id: counter,
      investmentId: '',
      customAmount: '',
    },
  ])
  const [showSubTotalAmount, setShowSubTotalAmount] = useState<number>(0)

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
      console.log(newList)
      setSectionList(newList)
    }
    console.log(newInvestmentList.length)
  }

  const onChangeCustomAmount = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInvestmentList: Investment[] = JSON.parse(
      JSON.stringify(investmentList),
    )
    newInvestmentList[index].customAmount = e.target.value
    setInvestmentList(newInvestmentList)
  }

  useEffect(() => {
    const total = investmentList.reduce((prev, current) => {
      return prev + +current.customAmount
    }, 0)
    setShowSubTotalAmount(total)
  }, [investmentList])

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
            >
              <i className="fa fa-plus me-1"></i>
              More Investments
            </CButton>
          </div>
          <div className="col-sm-6">
            <b className="pull-right txt-info">
              Max Limit:{' '}
              <span className="txt-info">{sectionItem.sectionLimit}</span>
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
                    index={secIndex}
                    onChangeCustomAmount={onChangeCustomAmount}
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
