import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import AddNewCategory from './AddNewCategory'
import CategoryListTable from './CategoryListTable'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'
import OCard from '../../../../components/ReusableComponent/OCard'

const CategoryList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(reduxServices.ticketConfiguration.getAllCategory())
    dispatch(reduxServices.ticketConfiguration.actions.setCurrentPage(1))
    dispatch(reduxServices.ticketConfiguration.actions.setPageSize(20))
  }, [dispatch])

  const backButtonHandler = () => {
    dispatch(
      reduxServices.ticketConfiguration.actions.setToggle('addSubCategory'),
    )
  }

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Category List"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
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
          </OCard>
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default CategoryList
