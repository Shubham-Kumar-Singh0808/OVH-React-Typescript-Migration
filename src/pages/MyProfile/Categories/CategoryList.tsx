import { CButton, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import AddNewCategory from './AddNewCategory'
import CategoryListTable from './CategoryListTable'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { AddEditEmployeeSkillsProps } from '../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const CategoryList = ({
  backButtonHandler,
}: AddEditEmployeeSkillsProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(reduxServices.category.selectors.isLoading)

  useEffect(() => {
    dispatch(reduxServices.category.getAllCategories())
    dispatch(reduxServices.category.actions.setCurrentPage(1))
    dispatch(reduxServices.category.actions.setPageSize(20))
  }, [dispatch])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
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
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default CategoryList
