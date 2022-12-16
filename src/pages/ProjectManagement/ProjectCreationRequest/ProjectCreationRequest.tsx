import React, { useEffect, useState } from 'react'
import { CRow, CCol, CInputGroup, CFormInput, CButton } from '@coreui/react-pro'
import ProjectCreationRequestTable from './ProjectCreationRequestTable'
import ProjectRequestView from './ProjectRequestView/ProjectRequestView'
import ProjectRequestHistoryDetails from './ProjectRequestHistory/ProjectRequestHistoryDetails'
import AddProjectRequest from './AddProjectRequest/AddProjectRequest'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ProjectCreationRequest = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const dispatch = useAppDispatch()
  const [toggle, setToggle] = useState('')
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

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Project Request Report"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="gap-2 d-md-flex justify-content-between mt-3">
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
              <CCol sm={3} className="d-md-flex justify-content-end">
                <CButton
                  color="info btn-ovh me-1"
                  className="text-white"
                  onClick={() => setToggle('addProjectRequest')}
                >
                  <i className="fa fa-plus"></i> Project Request
                </CButton>
              </CCol>
            </CRow>
            <ProjectCreationRequestTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
              setToggle={setToggle}
            />
          </OCard>
        </>
      )}
      {toggle === 'projectView' && <ProjectRequestView setToggle={setToggle} />}
      {toggle === 'projectHistory' && (
        <ProjectRequestHistoryDetails setToggle={setToggle} />
      )}
      {toggle === 'addProjectRequest' && (
        <AddProjectRequest setToggle={setToggle} />
      )}
    </>
  )
}

export default ProjectCreationRequest
