import { CButton, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import AddNewCategory from './AddNewCategory'
import CategoryListTable from './CategoryListTable'
import { useAppDispatch } from '../../../stateStore'
import { AddEditEmployeeSkillsProps } from '../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import { reduxServices } from '../../../reducers/reduxServices'

const CategoryList = ({
  backButtonHandler,
}: AddEditEmployeeSkillsProps): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.category.getAllCategories())
    dispatch(reduxServices.category.actions.setCurrentPage(1))
    dispatch(reduxServices.category.actions.setPageSize(20))
  }, [dispatch])

  return (
    <>
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
    </>
  )
}

export default CategoryList
