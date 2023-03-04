import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddNewHandbook from './AddNewPage/AddNewHandbook'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import EditHandbook from './EditPage/EditHandbook'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const EmployeeHandbookSettings = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const [selectedHandbook, setSelectedHandbook] = useState(0)

  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.listSize,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddNewPage = userAccessToFeatures?.find(
    (feature) => feature.name === 'Handbook',
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    console.log({ currentPage })

    dispatch(
      reduxServices.employeeHandbookSettings.getEmployeeHandbooks({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize, toggle])

  const editHandbookButtonHandler = (handbookId: number) => {
    setToggle('editHandbookSection')
    dispatch(
      reduxServices.employeeHandbookSettings.getEmployeeHandbook(handbookId),
    )
    setSelectedHandbook(handbookId)
  }

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Handbook Settings "
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <>
              <CRow className="justify-content-end">
                <CCol className="text-end" md={4}>
                  {userAccessToAddNewPage?.createaccess && (
                    <CButton
                      color="info"
                      className="btn-ovh me-1 text-white"
                      data-testid="addPage-btn"
                      onClick={() => setToggle('addNewPageSection')}
                    >
                      <i className="fa fa-plus me-1"></i>Add Page
                    </CButton>
                  )}
                  <Link to={`/EmployeeHandbook`}>
                    <CButton
                      color="info"
                      className="btn-ovh me-1 text-white"
                      data-testid="btn-back"
                    >
                      <i className="fa fa-arrow-left  me-1"></i>Back
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
              <CRow className="mt-4">
                <EmployeeHandbookTable
                  editHandbookButtonHandler={editHandbookButtonHandler}
                  paginationRange={paginationRange}
                  setPageSize={setPageSize}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              </CRow>
            </>
          </OCard>
        </>
      )}
      {toggle === 'addNewPageSection' && (
        <AddNewHandbook
          headerTitle="Add New Page"
          confirmButtonText="Save"
          backButtonHandler={() => setToggle('')}
        />
      )}
      {toggle === 'editHandbookSection' && (
        <EditHandbook
          headerTitle="Edit Page"
          confirmButtonText="Update"
          backButtonHandler={() => setToggle('')}
          isEditHandbook={true}
          handbookId={selectedHandbook}
        />
      )}
    </>
  )
}

export default EmployeeHandbookSettings
