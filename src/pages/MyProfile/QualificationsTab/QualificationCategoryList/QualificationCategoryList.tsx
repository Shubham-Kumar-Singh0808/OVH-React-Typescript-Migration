import { CButton, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import AddNewQualificationCategory from './AddNewQualificationCategory'
import QualificationCategoryListTable from './QualificationCategoryListTable'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddUpdateEmployeeQualificationProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const QualificationCategoryList = ({
  backButtonHandler,
}: AddUpdateEmployeeQualificationProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(
    reduxServices.employeeQualificationCategory.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(
      reduxServices.employeeQualificationCategory.getQualificationCategories(),
    )
    dispatch(
      reduxServices.employeeQualificationCategory.actions.setCurrentPage(1),
    )
    dispatch(
      reduxServices.employeeQualificationCategory.actions.setPageSize(20),
    )
  }, [dispatch])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CCardHeader>
            <h4 className="h4">Qualification Detail List</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0">
            <CRow>
              <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
                <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </CCol>
              <CCol xs={12}>
                <AddNewQualificationCategory />
              </CCol>
              <CCol xs={12}>
                <QualificationCategoryListTable />
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

export default QualificationCategoryList
