import React, { useEffect } from 'react'
import { CRow, CCol, CSpinner } from '@coreui/react-pro'
import MyTicketsTable from './MyTicketsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const MyTickets = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.myTickets.selectors.isLoading,
  )
  useEffect(() => {
    dispatch(
      reduxServices.myTickets.getTickets({
        endIndex: 20,
        multiSearch: '',
        startIndex: 0,
      }),
    )
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Ticket List"
        CFooterClassName="d-none"
      >
        <CRow className="mt-3">
          {isLoading !== ApiLoadingState.loading ? (
            <>
              <MyTicketsTable />
            </>
          ) : (
            <CCol>
              <CRow className="category-loading-spinner">
                <CSpinner />
              </CRow>
            </CCol>
          )}
        </CRow>
      </OCard>
    </>
  )
}
export default MyTickets
