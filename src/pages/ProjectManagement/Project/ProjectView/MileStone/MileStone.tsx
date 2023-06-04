import React from 'react'
import { CCol, CRow, CButton } from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import MileStoneTable from './MileStoneTable'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const MileStone = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.projectMileStone.selectors.isLoading,
  )
  const dispatch = useAppDispatch()
  const { projectId } = useParams<{ projectId: string }>()
  const addButtonHandler = () => {
    dispatch(reduxServices.projectViewDetails.getProject(projectId))
    dispatch(reduxServices.projectMileStone.getMilestoneNumber(projectId))
  }
  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CRow className="justify-content-end mt-4">
            <CCol className="text-end" md={4}>
              <Link to={`/retainerMilestone`}>
                <CButton
                  color="info btn-ovh me-1"
                  data-testid="add-btn"
                  onClick={addButtonHandler}
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              </Link>
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
