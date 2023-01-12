import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import InvestmentCheckListEntry from './InvestmentCheckListEntry'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const InvestmentCheckListTable = (): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState(1)

  const sections = useTypedSelector(
    reduxServices.investmentCheckList.selectors.sections,
  )
  const tableHeaderCellPropsSections = {
    width: '45%',
    scope: 'col',
  }

  const tableHeaderCellPropsMaxLimit = {
    width: '45%',
    scope: 'col',
  }

  return (
    <>
      <CTable responsive striped className="text-start mt-3 align-middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsSections}>
              Sections
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsMaxLimit}>
              Max-Limit
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {sections &&
            sections?.map((sectionItem, index) => (
              <InvestmentCheckListEntry
                id={sectionItem.sectionId}
                key={index}
                selectedSectionId={selectedSectionId}
                setSelectedSectionId={setSelectedSectionId}
                isIconVisible={isIconVisible}
                setIsIconVisible={setIsIconVisible}
                section={{
                  sectionId: sectionItem.sectionId,
                  sectionName: sectionItem.sectionName,
                  sectionLimit:
                    sectionItem.sectionLimit?.toLocaleString('en-IN'),
                  invests: sectionItem.invests,
                }}
              />
            ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default InvestmentCheckListTable
