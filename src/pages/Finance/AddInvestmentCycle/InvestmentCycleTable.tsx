import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTooltip,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const InvestmentCycleTable = (): JSX.Element => {
  const investmentCycles = useTypedSelector(
    reduxServices.itDeclarationList.selectors.cycles,
  )

  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow className="text-start">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cycle Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Year</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Year</CTableHeaderCell>
            <CTableHeaderCell scope="col">Active</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {investmentCycles?.map((cycle, index) => {
            return (
              <CTableRow key={index} className="text-start">
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{cycle.cycleName}</CTableDataCell>
                <CTableDataCell>{cycle.startDate}</CTableDataCell>
                <CTableDataCell>{cycle.endDate}</CTableDataCell>
                <CTableDataCell>
                  {cycle.active === true ? 'Active' : 'Inactive'}
                </CTableDataCell>
                <CTableDataCell>
                  <CTooltip content="Edit">
                    <CButton
                      size="sm"
                      className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                      color="info btn-ovh me-1"
                      data-testid="edit-button"
                      //   onClick={() => editBtnHandler(name.bankId)}
                    >
                      <i className="fa fa-edit" aria-hidden="true"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Delete">
                    <CButton
                      //   data-testid={`btn-delete${index}`}
                      size="sm"
                      color="danger btn-ovh me-1"
                      className="btn-ovh-employee-list"
                      //   onClick={() => deleteBtnHandler(name.bankId)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTooltip>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default InvestmentCycleTable
