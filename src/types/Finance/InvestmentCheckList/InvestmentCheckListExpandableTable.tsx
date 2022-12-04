import React from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { InvestmentCheckListExpandableTableProps } from './investmentCheckListTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const InvestmentCheckListExpandableTable = (
  props: InvestmentCheckListExpandableTableProps,
): JSX.Element => {
  const sections = useTypedSelector(
    reduxServices.investmentCheckList.selectors.sections,
  )

  const { isAccordionItemShow } = props

  const accordionItemShow = isAccordionItemShow ? 1 : 0

  return (
    <>
      {sections.length ? (
        <>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Sections</CTableHeaderCell>
          <CTableHeaderCell>Max-Limit</CTableHeaderCell>

          <CAccordion
            {...(isAccordionItemShow && { activeItemKey: accordionItemShow })}
            flush
            className="expandable-table mb-4 mt-4"
          >
            {sections.map((currentSection, index) => {
              return (
                <React.Fragment key={index}>
                  <CAccordionItem {...(isAccordionItemShow && { itemKey: 1 })}>
                    <CAccordionHeader>
                      <span
                        className="title-sm expandable-table-title"
                        data-testid="accordion-header-span"
                      >
                        {currentSection.sectionName}
                      </span>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CTable responsive striped>
                        <CTableHead color="info">
                          <CTableRow>
                            <CTableHeaderCell>#</CTableHeaderCell>
                            <CTableHeaderCell>Investment</CTableHeaderCell>
                            <CTableHeaderCell>Max-Limit</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {currentSection.invests.map(
                            (currentInvest, currentInvestIndex) => {
                              return (
                                <CTableRow key={currentInvestIndex}>
                                  <CTableDataCell>
                                    {currentInvestIndex + 1}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentInvest.investmentName || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentInvest.maxLimit || '0'}
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            },
                          )}
                        </CTableBody>
                      </CTable>
                    </CAccordionBody>
                  </CAccordionItem>
                </React.Fragment>
              )
            })}
          </CAccordion>
        </>
      ) : (
        <CRow className="mt-4">
          <h5>No Records Found... </h5>
        </CRow>
      )}
    </>
  )
}

export default InvestmentCheckListExpandableTable
