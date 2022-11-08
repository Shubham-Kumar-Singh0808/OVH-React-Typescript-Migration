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
      <CRow className="mt-1">
        <CCol md={12} className="pe-0">
          <div className="form-group pull-right ms-4">
            <Link to="/addClient">
              <CButton color="info" className="text-white btn-ovh" size="sm">
                <i className="fa fa-plus me-1"></i>
                Add Client
              </CButton>
            </Link>
          </div>
          <div className="col-sm-3 col-xs-12 pull-right me-2">
            <CInputGroup className="global-search sh-client-search">
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
                disabled={!searchInput}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </div>
          <div className="form-group pull-right col-space mt-2">
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
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default ClientFilterOptions
