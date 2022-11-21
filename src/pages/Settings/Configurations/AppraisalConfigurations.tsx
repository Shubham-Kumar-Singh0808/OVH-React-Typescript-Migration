import React, { useEffect, useState } from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import AppraisalConfigurationsTable from './AppraisalConfigurationsTable'
import AddConfiguration from './AddConfiguration/AddConfiguration'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const AppraisalConfigurations = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')
  const dispatch = useAppDispatch()

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Configurations',
  )

  const appraisalCycleCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    dispatch(
      reduxServices.appraisalConfigurations.getAllAppraisalCycleData({
        startIndex: pageSize * (appraisalCycleCurrentPage - 1),
        endIndex: pageSize * appraisalCycleCurrentPage,
      }),
    )
  }, [dispatch])

  useEffect(() => {
    if (appraisalCycleCurrentPage) {
      setCurrentPage(appraisalCycleCurrentPage)
    }
  }, [appraisalCycleCurrentPage])

  const appraisalCycleListSize = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.appraisalCycleListSize,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(appraisalCycleListSize, 20)

  // eslint-disable-next-line sonarjs/no-identical-functions
  useEffect(() => {
    dispatch(
      reduxServices.appraisalConfigurations.getAllAppraisalCycleData({
        startIndex: pageSize * (appraisalCycleCurrentPage - 1),
        endIndex: pageSize * appraisalCycleCurrentPage,
      }),
    )
  }, [appraisalCycleCurrentPage, dispatch, pageSize])

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Appraisal Configurations"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          {' '}
          {userAccess?.createaccess && (
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <CButton
                  color="info"
                  className="btn-ovh me-1"
                  onClick={() => setToggle('addConfiguration')}
                >
                  <i className="fa fa-plus me-1"></i>
                  Add Configuration
                </CButton>
              </CCol>
            </CRow>
          )}
          <AppraisalConfigurationsTable
            userEditAccess={userAccess?.updateaccess as boolean}
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </OCard>
      )}
      {toggle === 'addConfiguration' && (
        <AddConfiguration
          setToggle={() => {
            setToggle('')
          }}
        />
      )}
    </>
  )
}

export default AppraisalConfigurations
