import React from 'react'
import { CCol, CRow, CButton } from '@coreui/react-pro'
import MileStoneTable from './MileStoneTable'
import { useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const MileStone = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.projectMileStone.selectors.isLoading,
  )
  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CRow className="justify-content-end mt-4">
            <CCol className="text-end" md={4}>
              <CButton color="info btn-ovh me-1" data-testid="add-btn">
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
          <MileStoneTable />
        </>
      ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <OLoadingSpinner type={LoadingType.PAGE} />
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default MileStone
