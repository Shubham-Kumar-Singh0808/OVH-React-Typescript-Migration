import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import parse from 'html-react-parser'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import OCard from '../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import { ApiLoadingState } from '../../middleware/api/apiList'

const ShowHandbook = (): JSX.Element => {
  const { clickedpageName } = useParams<{ clickedpageName: string }>()
  console.log(clickedpageName)
  const dispatch = useAppDispatch()
  const handbook = useTypedSelector(
    reduxServices.ShowHandbook.selectors.handbookDesc,
  )
  const isLoading = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.isLoading,
  )
  console.log('dispatch declared')

  useEffect(() => {
    dispatch(reduxServices.ShowHandbook.showHandbook(clickedpageName))
    console.log(handbook)
  }, [dispatch, clickedpageName, handbook])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Display Handbook"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <div>{handbook.description}</div>
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

export default ShowHandbook
