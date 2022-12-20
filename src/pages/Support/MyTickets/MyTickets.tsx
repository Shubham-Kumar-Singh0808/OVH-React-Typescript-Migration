import React, { useEffect, useState } from 'react'
import { CRow, CCol, CButton, CFormInput, CInputGroup } from '@coreui/react-pro'
import MyTicketsTable from './MyTicketsTable'
import TicketHistoryDetails from './TicketHistory.tsx/TicketHistoryDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import myTicketsApi from '../../../middleware/api/Support/MyTickets/myTicketsApi'
import { downloadFile } from '../../../utils/helper'
import { usePagination } from '../../../middleware/hooks/usePagination'

const MyTickets = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(
    reduxServices.tickets.selectors.allTicketsListSize,
  )

  const toggle = useTypedSelector(reduxServices.tickets.selectors.toggle)

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.tickets.getTickets({
        endIndex: pageSize * currentPage,
        multiSearch: '',
        startIndex: pageSize * (currentPage - 1),
      }),
    )
    dispatch(reduxServices.ticketApprovals.actions.setRoutePath(''))
  }, [dispatch, pageSize, currentPage])

  const handleSearch = () => {
    dispatch(
      reduxServices.tickets.getTickets({
        endIndex: 20,
        multiSearch: searchInput,
        startIndex: 0,
      }),
    )
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.tickets.getTickets({
          endIndex: 20,
          multiSearch: searchInput,
          startIndex: 0,
        }),
      )
    }
  }

  const handleExportTicketListData = async () => {
    const myTicketListDownload = await myTicketsApi.exportTicketListData({
      multiSearch: searchInput,
    })
    downloadFile(myTicketListDownload, 'TicketList.csv')
  }
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'My Tickets',
  )

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Ticket List"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <CButton
                  data-testid="export-button"
                  color="info"
                  className="btn-ovh me-1"
                  onClick={handleExportTicketListData}
                >
                  <i className="fa fa-plus me-1"></i>Click to Export
                </CButton>
              </CCol>
            </CRow>
            <CRow className="gap-2 d-md-flex justify-content-md-end mt-3">
              <CCol xs={12} sm={3}>
                <CInputGroup className="global-search me-0 sh-client-search">
                  <CFormInput
                    placeholder="Multiple Search"
                    aria-label="Multiple Search"
                    aria-describedby="button-addon2"
                    data-testid="searchField"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value)
                    }}
                    onKeyUp={handleSearchByEnter}
                  />
                  <CButton
                    data-testid="search-btn1"
                    className="cursor-pointer"
                    type="button"
                    color="info"
                    id="button-addon2"
                    onClick={handleSearch}
                  >
                    <i className="fa fa-search"></i>
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
            <CCol className="col-xs-12">
              <MyTicketsTable
                paginationRange={paginationRange}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
                userEditAccess={userAccess?.updateaccess as boolean}
              />
            </CCol>
          </OCard>
        </>
      )}
      {toggle === 'ticketHistory' && <TicketHistoryDetails />}
    </>
  )
}
export default MyTickets
