import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'

const AssetListTable = (): JSX.Element => {
  return (
    <CTable striped responsive className="mt-5 align-middle alignment">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
          <CTableHeaderCell scope="col"> Asset Type</CTableHeaderCell>
          <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
          <CTableHeaderCell scope="col">
            Product Specifications
          </CTableHeaderCell>
          <CTableHeaderCell scope="col">License Number</CTableHeaderCell>
          <CTableHeaderCell scope="col">Location</CTableHeaderCell>
          <CTableHeaderCell scope="col">Asset Reference No.</CTableHeaderCell>
          <CTableHeaderCell scope="col">Asset Status</CTableHeaderCell>
          <CTableHeaderCell scope="col">Invoice Number</CTableHeaderCell>
          <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
          <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      {/* <CTableBody>
        {pipListData?.length > 0 &&
          pipListData?.map((item, index) => {
            const removeSpaces = item.remarks
              ?.replace(/\s+/g, ' ')
              .trim()
              .replace(/&nbsp;/g, '')
            const agendaLimit =
              removeSpaces && removeSpaces.length > 15
                ? `${removeSpaces.substring(0, 15)}...`
                : removeSpaces
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">
                  {getItemNumber(index)}
                </CTableDataCell>
                <CTableDataCell>{item.employeeName || 'N/A'}</CTableDataCell>
                <CTableDataCell>{item.startDate || 'N/A'}</CTableDataCell>
                <CTableDataCell>{item.endDate || 'N/A'}</CTableDataCell>
                <CTableDataCell>{item.extendDate || 'N/A'}</CTableDataCell>
                <CTableDataCell>{item.rating || 'N/A'}</CTableDataCell>
                <CTableDataCell scope="row" className="sh-organization-link">
                  {item.remarks ? (
                    <CLink
                      className="cursor-pointer text-decoration-none"
                      data-testid="description-modal-link"
                      onClick={() => handleAgendaModal(item)}
                    >
                      {parse(agendaLimit)}
                    </CLink>
                  ) : (
                    'N/A'
                  )}
                </CTableDataCell>
                <CTableDataCell>{item.createdBy || 'N/A'}</CTableDataCell>
                <CTableDataCell>
                  <CTooltip content="Timeline">
                    <Link to={`/ViewPIPDetail/${item.id}`}>
                      <CButton
                        color="info"
                        className="btn-ovh-employee-list me-1"
                        data-testid="history-btn"
                        onClick={() => timeLineHandler(item.id as number)}
                      >
                        <i
                          className="fa fa-bar-chart text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </Link>
                  </CTooltip>
                  {clearanceCertificateAccess?.viewaccess && (
                    <CTooltip content="Clearence Certificate">
                      <Link to={`/PIPClearnceCerticates`}>
                        <CButton
                          className="btn-ovh-employee-list me-1"
                          color="info"
                          type="button"
                          onClick={() => clearanceBtnHandler(item.id as number)}
                        >
                          <i className="fa fa-user-circle text-white"></i>
                        </CButton>
                      </Link>
                    </CTooltip>
                  )}
                </CTableDataCell>
              </CTableRow>
            )
          })}
      </CTableBody> */}
    </CTable>
  )
}

export default AssetListTable
