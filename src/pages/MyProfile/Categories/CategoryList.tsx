import { CButton, CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import AddNewCategory from './AddNewCategory'
import { AllowedLoadingState } from '../../../middleware/api/apiList'
import CIcon from '@coreui/icons-react'
import CategoryListTable from './CategoryListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { cilArrowLeft } from '@coreui/icons'
import { reduxService } from '../../../reducers/reduxService'

const CategoryList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxService.category.selectors.selectIsCategoryListLoading,
  )

  useEffect(() => {
    dispatch(reduxService.category.getAllCategories())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 category-list-card"
        title="Category List"
        CFooterClassName="d-none"
      >
        {isLoading !== AllowedLoadingState.loading ? (
          <CRow>
            <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" className="px-4 text-white" size="sm">
                <CIcon icon={cilArrowLeft} />
                Back
              </CButton>
            </CCol>
            <CCol xs={12}>
              <AddNewCategory />
            </CCol>
            <CCol xs={12}>
              <CategoryListTable />
            </CCol>
          </CRow>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default CategoryList
