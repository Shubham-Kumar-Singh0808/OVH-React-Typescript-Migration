import React, { useEffect } from 'react'
import { CButton, CCol, CRow, CSpinner } from '@coreui/react-pro'
import HandbookList from './HandbookList'
import OCard from '../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import { ApiLoadingState } from '../../middleware/api/apiList'

const EmployeeHandbook = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const handbooks = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.handbookData,
  )
  const isLoading = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(reduxServices.EmployeeHandbook.getHandbooks())
    console.log(handbooks)
  }, [dispatch])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Handbook"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CButton color="info" className="hb_button" size="sm">
          <i className="fa fa-light fa-toolbox"></i>
          Handbook Settings
        </CButton>
        {isLoading !== ApiLoadingState.loading ? (
          <HandbookList handbooks={handbooks} />
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

export default EmployeeHandbook
