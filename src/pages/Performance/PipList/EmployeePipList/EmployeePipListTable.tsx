import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CButton,
  CTooltip,
  CLink,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  EmployeePIPListTableProps,
  GetPipList,
} from '../../../../types/Performance/PipList/pipListTypes'
import OModal from '../../../../components/ReusableComponent/OModal'

const EmployeePipListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: EmployeePIPListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isReasonForPIPVisible, setIsReasonForPIPVisible] =
    useState<boolean>(false)
  const [reasonModal, setReasonModal] = useState({} as GetPipList)

  const pipListData = useTypedSelector(
    reduxServices.pipList.selectors.pipListData,
  )
  const pipListSizeRecords = useTypedSelector(
    reduxServices.pipList.selectors.listSize,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const clearanceCertificateAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'HR Cleranace',
  )
  const handlePipListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const timeLineHandler = (id: number) => {
    dispatch(reduxServices.pipList.viewPipDetails(id))
    dispatch(
      reduxServices.pipList.getPIPHistory({
        filterName: 'PIP',
        pipId: id,
      }),
    )
  }
  const clearanceBtnHandler = (id: number) => {
    dispatch(reduxServices.pipList.viewPipDetails(id))
  }

  const handleAgendaModal = (appraisalCycleInfo: GetPipList) => {
    setIsReasonForPIPVisible(true)
    setReasonModal(appraisalCycleInfo)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Extended Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reason for PIP</CTableHeaderCell>
            <CTableHeaderCell scope="col">Added by</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
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
                            onClick={() =>
                              clearanceBtnHandler(item.id as number)
                            }
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
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {pipListSizeRecords
              ? `Total Records: ${pipListSizeRecords}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {pipListSizeRecords > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePipListPageSizeSelectChange}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {pipListSizeRecords > 20 && (
          <CCol
            xs={5}
            className="gap-1 d-grid d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isReasonForPIPVisible}
        setVisible={setIsReasonForPIPVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <>
          <span className="descriptionField">
            <div
              dangerouslySetInnerHTML={{
                __html: reasonModal.remarks,
              }}
            />
          </span>
        </>
      </OModal>
    </>
  )
}

export default EmployeePipListTable
