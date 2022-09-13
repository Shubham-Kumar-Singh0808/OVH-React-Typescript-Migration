import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CSpinner,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import MyTicketsTable from './MyTicketsTable'
import TicketHistoryDetails from './TicketHistory.tsx/TicketHistoryDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import myTicketsApi from '../../../middleware/api/Support/MyTickets/myTicketsApi'
import { downloadFile } from '../../../utils/helper'
import { usePagination } from '../../../middleware/hooks/usePagination'

const MyTickets = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(reduxServices.tickets.selectors.isLoading)
  const listSize = useTypedSelector(
    reduxServices.tickets.selectors.allTicketsListSize,
  )
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
              <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
                <CInputGroup className="global-search me-0">
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
              {isLoading !== ApiLoadingState.loading ? (
                <>
                  <MyTicketsTable
                    setToggle={setToggle}
                    paginationRange={paginationRange}
                    setPageSize={setPageSize}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                  />
                </>
              ) : (
                <CCol>
                  <CRow className="category-loading-spinner">
                    <CSpinner />
                  </CRow>
                </CCol>
              )}
            </CCol>
          </OCard>
        </>
      )}
      {toggle === 'ticketHistory' && (
        <TicketHistoryDetails backButtonHandler={() => setToggle('')} />
      )}
    </>
  )
}
export default MyTickets
