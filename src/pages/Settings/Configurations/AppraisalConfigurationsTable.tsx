import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { getAppraisalCycle } from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import OModal from '../../../components/ReusableComponent/OModal'

const AppraisalConfigurationsTable = ({
  userEditAccess,
}: {
  userEditAccess: boolean
}): JSX.Element => {
  const [isAgendaModalVisible, setIsAgendaModalVisible] =
    useState<boolean>(false)
  const [modalAgenda, setModalAgenda] = useState({} as getAppraisalCycle)
  const dispatch = useAppDispatch()

  const appraisalCycleNames = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.appraisalCycleNames,
  )

  useEffect(() => {
    dispatch(reduxServices.appraisalConfigurations.getAllAppraisalCycle())
  }, [dispatch])

  const pageFromState = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.pageSizeFromState,
  )
  const {
    paginationRange,
    setCurrentPage,
    setPageSize,
    currentPage,
    pageSize,
  } = usePagination(
    appraisalCycleNames.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const handleAgendaModal = (appraisalCycle: getAppraisalCycle) => {
    setIsAgendaModalVisible(true)
    setModalAgenda(appraisalCycle)
  }
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Duration(days)</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Service Period(days)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Active</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {appraisalCycleNames.length > 0 &&
            appraisalCycleNames?.map((appraisalCycle, index) => {
              const agendaLimit =
                appraisalCycle.description &&
                appraisalCycle.description.length > 30
                  ? `${appraisalCycle.description.substring(0, 30)}...`
                  : appraisalCycle.description
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{appraisalCycle.name}</CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.appraisalType}
                  </CTableDataCell>
                  <CTableDataCell>{appraisalCycle.toDate}</CTableDataCell>
                  <CTableDataCell>{appraisalCycle.fromDate}</CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.appraisalDuration}
                  </CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.servicePeriod}
                  </CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.active ? 'Yes' : 'No'}
                  </CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {appraisalCycle.description ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="description-modal-link"
                        onClick={() => handleAgendaModal(appraisalCycle)}
                      >
                        {parse(agendaLimit as string)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {userEditAccess && (
                      <>
                        <CTooltip content="Edit">
                          <CButton
                            size="sm"
                            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                            color="info btn-ovh me-1"
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Assign Template">
                          <CButton
                            size="sm"
                            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                            color="info btn-ovh me-1"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>

      {appraisalCycleNames.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {appraisalCycleNames.length}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {appraisalCycleNames.length > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {appraisalCycleNames.length > 20 && (
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
      ) : (
        <CCol>
          <CRow className="mt-3 ms-3">
            <p>
              <strong>No Records Found... </strong>
            </p>
          </CRow>
        </CCol>
      )}
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isAgendaModalVisible}
        setVisible={setIsAgendaModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <>
          <p>{modalAgenda.description}</p>
        </>
      </OModal>
    </>
  )
}
export default AppraisalConfigurationsTable
