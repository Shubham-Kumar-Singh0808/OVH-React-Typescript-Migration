import { CButton, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import AddNewCategory from './AddNewCategory'
import CategoryListTable from './CategoryListTable'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const CategoryList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  // const isLoading = useTypedSelector(
  //   reduxServices.employeeQualificationCategory.selectors.isLoading,
  // )

  // useEffect(() => {
  //   dispatch(
  //     reduxServices.employeeQualificationCategory.getQualificationCategories(),
  //   )
  //   dispatch(
  //     reduxServices.employeeQualificationCategory.actions.setCurrentPage(1),
  //   )
  //   dispatch(
  //     reduxServices.employeeQualificationCategory.actions.setPageSize(20),
  //   )
  // }, [dispatch])

  const backButtonHandler = () => {
    dispatch(
      reduxServices.ticketConfiguration.actions.setToggle('addSubCategory'),
    )
  }

  return (
    <>
      {/* {isLoading !== ApiLoadingState.loading ? ( */}
      <>
        <CCardHeader>
          <h4 className="h4">Category List</h4>
        </CCardHeader>
        <CCardBody className="ps-0 pe-0">
          <CRow>
            <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
            <CCol xs={12}>
              <AddNewCategory />
            </CCol>
            <CCol xs={12}>
              <CategoryListTable />
            </CCol>
          </CRow>
        </CCardBody>
      </>
      {/* ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )} */}
    </>
  )
}

export default CategoryList
