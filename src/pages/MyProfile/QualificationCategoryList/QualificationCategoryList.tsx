import { CButton, CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import {
  fetchAllQualificationCategories,
  selectIsQualificationCategoryListLoading,
} from '../../../reducers/MyProfile/QualificationCategoryList/qualificationCategorySlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import CIcon from '@coreui/icons-react'
import QualificationCategoryListTable from './QualificationCategoryListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { cilArrowLeft } from '@coreui/icons'
import AddNewQualificationCategory from './AddNewQualificationCategory'

const QualificationCategoryList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(selectIsQualificationCategoryListLoading)

  useEffect(() => {
    dispatch(fetchAllQualificationCategories())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 category-list-card"
        title="Qualification Detail List"
        CFooterClassName="d-none"
      >
        {!isLoading ? (
          <CRow>
            <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" className="px-4 text-white" size="sm">
                <CIcon icon={cilArrowLeft} />
                Back
              </CButton>
            </CCol>
            <CCol xs={12}>
              <AddNewQualificationCategory />
            </CCol>
            <CCol xs={12}>
              <QualificationCategoryListTable />
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

export default QualificationCategoryList
