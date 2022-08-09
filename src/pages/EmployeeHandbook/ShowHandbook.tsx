import { useParams, Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { CCol, CRow, CSpinner, CButton } from '@coreui/react-pro'
import OCard from '../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { Handbook } from '../../types/EmployeeHandbook/employeeHandbookTypes'

const ShowHandbook = (): JSX.Element => {
  const { clickedpageName } = useParams<{ clickedpageName: string }>()
  const dispatch = useAppDispatch()
  let handbook = useTypedSelector(
    reduxServices.ShowHandbook.selectors.handbookDesc,
  )
  const isLoading = useTypedSelector(
    reduxServices.ShowHandbook.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(reduxServices.ShowHandbook.showHandbook(clickedpageName))
    return () => {
      handbook = {} as Handbook
    }
  }, [clickedpageName])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title={`${handbook.title}`}
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <Link to={'/employeehandbook'}>
                  <CButton
                    data-testid="back-button"
                    color="info"
                    className="btn-ovh me-1"
                  >
                    <i className="fa fa-arrow-left me-1"></i>Back
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <CRow className="mt-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: handbook.description as string,
                }}
              />
            </CRow>
          </OCard>
        </>
      ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default ShowHandbook
