import React from 'react'
import { CCol, CRow } from '@coreui/react-pro'
import MileStoneTable from './MileStoneTable'
import OAddButton from '../../../../../components/ReusableComponent/OAddButton'
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
          <OAddButton />
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
