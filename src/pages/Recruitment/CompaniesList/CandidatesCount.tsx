import React, { useEffect } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import CandidatesCountTable from './CandidatesCountTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const CandidatesCount = (): JSX.Element => {
  const TotalListSize = useTypedSelector(
    reduxServices.companiesList.selectors.listSize,
  )

  const CurrentPageValue = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPageValue) {
      setCurrentPage(CurrentPageValue)
    }
  }, [CurrentPageValue])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(TotalListSize, 20)

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Candidates List"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <Link to={'/companiesList'}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CandidatesCountTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </OCard>
  )
}

export default CandidatesCount
