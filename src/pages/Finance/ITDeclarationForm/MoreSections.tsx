import {
  CButton,
  CCol,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import InvestmentTable from './InvestmentTable'
import {
  Investment,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'

const MoreSections = ({
  sectionItem,
  handleShowRemoveSectionModal,
}: {
  sectionItem: Sections
  handleShowRemoveSectionModal: (investId: number, investName: string) => void
}): JSX.Element => {
  const [counter, setCounter] = useState(0)
  const [investmentList, setInvestmentList] = useState<Investment[]>([
    {
      id: counter,
      investmentId: '',
      customAmount: '',
    },
  ])
  const [toCancelInvestmentId, setToCancelInvestmentId] = useState(0)
  const [showSubTotalAmount, setShowSubTotalAmount] = useState<number>(0)

  const handleClickInvestment = () => {
    setCounter(counter + 1)
    setInvestmentList([
      {
        id: counter + 1,
        investmentId: '',
        customAmount: '',
      },
      ...investmentList,
    ])
  }
  // console.log(investmentList)

  const handleClickRemoveInvestment = () => {
    const newInvestmentList = investmentList.filter(
      (investment) => investment.id !== toCancelInvestmentId,
    )
    setInvestmentList(newInvestmentList)
    setCounter(counter - 1)
  }

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
        {investmentList?.map((currentSec, index) => {
          return (
            <CTable striped responsive key={index}>
              <CTableBody>
                <InvestmentTable
                  setShowSubTotalAmount={setShowSubTotalAmount}
                  handleClickRemoveInvestment={handleClickRemoveInvestment}
                />
              </CTableBody>
            </CTable>
          )
        })}
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
