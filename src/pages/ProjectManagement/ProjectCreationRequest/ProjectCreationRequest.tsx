import React, { useEffect, useState } from 'react'
import { CRow, CCol, CInputGroup, CFormInput, CButton } from '@coreui/react-pro'
import ProjectCreationRequestTable from './ProjectCreationRequestTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ProjectCreationRequest = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const dispatch = useAppDispatch()

  const projectRequestlistSize = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.allProjectCreationListSize,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(projectRequestlistSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.projectCreationRequest.getAllProjectRequestList({
        endIndex: pageSize * currentPage,
        multiSearch: '',
        firstIndex: pageSize * (currentPage - 1),
      }),
    )
  }, [dispatch, pageSize, currentPage])

  const handleSearch = () => {
    dispatch(
      reduxServices.projectCreationRequest.getAllProjectRequestList({
        endIndex: pageSize * currentPage,
        multiSearch: searchInput,
        firstIndex: pageSize * (currentPage - 1),
      }),
    )
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.projectCreationRequest.getAllProjectRequestList({
          endIndex: pageSize * currentPage,
          multiSearch: searchInput,
          firstIndex: pageSize * (currentPage - 1),
        }),
      )
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project Request Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="gap-2 d-md-flex justify-content-md-end mt-3">
          <CCol sm={3}>
            <CButton color="info btn-ovh me-1" className="text-white">
              <i className="fa fa-plus"></i> Project Request
            </CButton>
          </CCol>
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
        <ProjectCreationRequestTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}

export default ProjectCreationRequest
