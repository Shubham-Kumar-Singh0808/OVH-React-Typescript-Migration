import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ClientStatus } from '../../../types/ProjectManagement/Clients/clientsTypes'

const ClientFilterOptions = ({
  currentPage,
  pageSize,
}: {
  currentPage: number
  pageSize: number
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [searchInput, setSearchInput] = useState<string>('')

  const selectedClientStatus = useTypedSelector(
    reduxServices.clients.selectors.selectedClientStatus,
  )

  const handleChangeSelectedClientStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      reduxServices.clients.actions.changeSelectedClientStatus(
        event.target.value,
      ),
    )
    setSearchInput('')
  }

  const searchButtonHandlerOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.clients.searchClients({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          selectionStatus: selectedClientStatus,
          searchText: searchInput,
        }),
      )
    }
  }

  const searchButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(
      reduxServices.clients.searchClients({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        selectionStatus: selectedClientStatus,
        searchText: searchInput,
      }),
    )
  }

  return (
    <>
      <CRow>
        <CCol sm={7} className="d-md-flex justify-content-md-end mt-2">
          <CFormCheck
            type="radio"
            name="clientStatus"
            value={ClientStatus.all}
            id="clientsAll"
            data-testid="allClientsStatus"
            label="All"
            defaultChecked={selectedClientStatus === ClientStatus.all}
            onChange={handleChangeSelectedClientStatus}
            inline
          />
          <CFormCheck
            type="radio"
            name="clientStatus"
            value={ClientStatus.active}
            id="clientsActive"
            data-testid="activeClientsStatus"
            label="Active"
            defaultChecked={selectedClientStatus === ClientStatus.active}
            onChange={handleChangeSelectedClientStatus}
            inline
          />
          <CFormCheck
            type="radio"
            name="clientStatus"
            value={ClientStatus.inactive}
            id="clientsInactive"
            data-testid="inactiveClientsStatus"
            label="Inactive"
            defaultChecked={selectedClientStatus === ClientStatus.inactive}
            onChange={handleChangeSelectedClientStatus}
            inline
          />
        </CCol>
        <CCol sm={3}>
          <CRow>
            <CCol sm={12}>
              <CInputGroup className="global-search sh-client-search me-4">
                <CFormInput
                  placeholder="Search here"
                  aria-label="Search here"
                  aria-describedby="button-addon2"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                  }}
                  onKeyDown={searchButtonHandlerOnKeyDown}
                />
                <CButton
                  data-testid="search-button"
                  type="button"
                  color="info"
                  id="button-addon2"
                  onClick={searchButtonHandler}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
        </CCol>
        <CCol sm={2}>
          <CRow>
            <CCol sm={12} className="d-md-flex justify-content-md-end pe-0">
              <Link to="/">
                <CButton color="info" className="text-white btn-ovh" size="sm">
                  <i className="fa fa-plus me-1"></i>
                  Add Client
                </CButton>
              </Link>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default ClientFilterOptions
