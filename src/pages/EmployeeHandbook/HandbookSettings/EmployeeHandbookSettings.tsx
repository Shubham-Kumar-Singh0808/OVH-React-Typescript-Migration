import { CButton, CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import AddNewHandbook from './AddNewPage/AddNewHandbook'

const EmployeeHandbookSettings = (): JSX.Element => {
  const [toggle, setToggle] = useState('')

  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.listSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.isLoading,
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
      reduxServices.employeeHandbookSettings.getEmployeeHandbooks({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

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
            {isLoading !== ApiLoadingState.loading ? (
              <>
                <CRow className="justify-content-end">
                  <CCol className="text-end" md={4}>
                    <CButton
                      color="info"
                      className="btn-ovh me-1 text-white"
                      onClick={() => setToggle('addNewPageSection')}
                    >
                      <i className="fa fa-plus me-1"></i>Add Page
                    </CButton>
                    <CButton color="info" className="btn-ovh me-1 text-white">
                      <i className="fa fa-arrow-left  me-1"></i>Back
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <EmployeeHandbookTable
                    paginationRange={paginationRange}
                    setPageSize={setPageSize}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                  />
                </CRow>
              </>
            ) : (
              <CCol>
                <CRow>
                  <CSpinner />
                </CRow>
              </CCol>
            )}
          </OCard>
        </>
      )}
      {toggle === 'addNewPageSection' && (
        <AddNewHandbook
          headerTitle="Add New Page"
          confirmButtonText="Add"
          backButtonHandler={() => setToggle('')}
        />
      )}
    </>
  )
}

export default EmployeeHandbookSettings
