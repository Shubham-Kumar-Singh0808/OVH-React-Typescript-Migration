import React, { useEffect, useMemo, useState } from 'react'
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
import { Link } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { GetAppraisalCycle } from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import OModal from '../../../components/ReusableComponent/OModal'

const AppraisalConfigurationsTable = ({
  userEditAccess,
}: {
  userEditAccess: boolean
}): JSX.Element => {
  const [isAppraisalDescriptionVisible, setIsAppraisalDescriptionVisible] =
    useState<boolean>(false)
  const [descriptionModal, setDescriptionModal] = useState(
    {} as GetAppraisalCycle,
  )
  const dispatch = useAppDispatch()

  const appraisalCycle = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.appraisalCycle,
  )
  const appraisalCycleListSize = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.listSize,
  )
  const presentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )
  useEffect(() => {
    if (presentPage) {
      setCurrentPage(presentPage)
    }
  }, [presentPage])
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(appraisalCycleListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.appraisalConfigurations.getAppraisalCycle({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const handleAgendaModal = (appraisalCycleInfo: GetAppraisalCycle) => {
    setIsAppraisalDescriptionVisible(true)
    setDescriptionModal(appraisalCycleInfo)
  }

  const sortedAppraisalDates = useMemo(() => {
    if (appraisalCycle) {
      return appraisalCycle
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.toDate.localeCompare(sortNode2.fromDate),
        )
    }
    return []
  }, [appraisalCycle])

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const totalRecords = appraisalCycle?.length
    ? `Total Records: ${appraisalCycleListSize}`
    : `No Records found...`
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment mt-4"
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
          {sortedAppraisalDates?.length > 0 &&
            sortedAppraisalDates?.map((appraisalCycle, index) => {
              const removeSpaces = appraisalCycle.description
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
                  <CTableDataCell
                    scope="row"
                    className="sh-organization-link sh-comment"
                  >
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
                          <Link to={`/editAppraisalCycle/${appraisalCycle.id}`}>
                            <CButton
                              size="sm"
                              className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                              color="info btn-ovh me-1"
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </CButton>
                          </Link>
                        </CTooltip>
                        <CTooltip content="Assign Template">
                          <Link to={`/assignTemplate/${appraisalCycle.id}`}>
                            <CButton
                              size="sm"
                              className="btn-ovh me-2 sh-eye-btn-color btn-sm btn-ovh-employee-list cursor-pointer button"
                              disabled={appraisalCycle.cycleStartedFlag}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
                            </CButton>
                          </Link>
                        </CTooltip>
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{totalRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {appraisalCycleListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {appraisalCycleListSize > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
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
        visible={isAppraisalDescriptionVisible}
        setVisible={setIsAppraisalDescriptionVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <>
          <p
            dangerouslySetInnerHTML={{
              __html: descriptionModal.description as string,
            }}
          />
        </>
      </OModal>
    </>
  )
}
export default AppraisalConfigurationsTable
