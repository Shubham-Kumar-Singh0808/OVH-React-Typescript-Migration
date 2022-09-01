import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CInputGroup,
  CSpinner,
} from '@coreui/react-pro'
import MyTicketsTable from './MyTicketsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import myTicketsApi from '../../../middleware/api/Support/MyTickets/myTicketsApi'
import { downloadFile } from '../../../utils/helper'

const MyTickets = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.myTickets.selectors.isLoading,
  )
  useEffect(() => {
    dispatch(
      reduxServices.myTickets.getTickets({
        endIndex: 20,
        multiSearch: '',
        startIndex: 0,
      }),
    )
  }, [dispatch])

  const handleSearch = () => {
    dispatch(
      reduxServices.myTickets.getTickets({
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
        reduxServices.myTickets.getTickets({
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
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket List"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end mt-3">
          <CCol className="text-end" md={4}>
            <CButton
              data-testid="back-button"
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
        <CRow className="mt-3">
          {isLoading !== ApiLoadingState.loading ? (
            <>
              <MyTicketsTable />
            </>
          ) : (
            <CCol>
              <CRow className="category-loading-spinner">
                <CSpinner />
              </CRow>
            </CCol>
          )}
        </CRow>
      </OCard>
    </>
  )
}
export default MyTickets
