import React, { useEffect, useState } from 'react'
import { CRow, CCol, CInputGroup, CFormInput, CButton } from '@coreui/react-pro'
import ProjectCreationRequestTable from './ProjectCreationRequestTable'
import ProjectRequestView from './ProjectRequestView/ProjectRequestView'
import ProjectRequestHistoryDetails from './ProjectRequestHistory/ProjectRequestHistoryDetails'
import ApproveProjectRequest from './ApproveProject/ApproveProjectRequest'
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

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessCreateAction = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project Creation Requests',
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
        multiSearch: searchInput,
        firstIndex: pageSize * (currentPage - 1),
      }),
    )
  }, [dispatch, pageSize, currentPage])

  const handleSearch = () => {
    dispatch(
      reduxServices.projectCreationRequest.getAllProjectRequestList({
        endIndex: 20,
        multiSearch: searchInput,
        firstIndex: 0,
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.projectCreationRequest.getAllProjectRequestList({
          endIndex: 20,
          multiSearch: searchInput,
          firstIndex: 0,
        }),
      )
      setCurrentPage(1)
      setPageSize(20)
    }
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
                    placeholder="Search By Name"
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
              <CCol sm={3} className="d-md-flex justify-content-end">
                {userAccessCreateAction?.createaccess && (
                  <CButton
                    color="info btn-ovh me-1"
                    className="text-white"
                    onClick={() => setToggle('addProjectRequest')}
                    data-testid="add-project-test"
                  >
                    <i className="fa fa-plus"></i> Project Request
                  </CButton>
                )}
              </CCol>
            </CRow>
            <ProjectCreationRequestTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
              setToggle={setToggle}
              userDeleteAction={userAccessCreateAction?.deleteaccess as boolean}
              userRejectAction={userAccessCreateAction?.updateaccess as boolean}
            />
          </OCard>
        </>
      )}
      {toggle === 'projectView' && <ProjectRequestView setToggle={setToggle} />}
      {toggle === 'projectHistory' && (
        <ProjectRequestHistoryDetails setToggle={setToggle} />
      )}
      {toggle === 'approvalProjectHistory' && (
        <ApproveProjectRequest setToggle={setToggle} />
      )}
      {toggle === 'addProjectRequest' && (
        <AddProjectRequest setToggle={setToggle} />
      )}
    </>
  )
}
export default ProjectCreationRequest
