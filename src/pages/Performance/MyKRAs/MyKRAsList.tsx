import React, { useEffect } from 'react'
import MyKRAsTable from './MyKRAsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const MyKRAsList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const isLoading = useTypedSelector(reduxServices.myKRAs.selectors.isLoading)
  useEffect(() => {
    dispatch(
      reduxServices.myKRAs.getKRAForIndividualEmployee(Number(employeeId)),
    )
  }, [dispatch])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="My KRAs"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <MyKRAsTable />
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default MyKRAsList
