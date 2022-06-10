import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import CertificateDetailsExpandableTable from './CertificateDetailsExpandableTable'
import CertificatesFilterOptions from './CertificatesFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const CertificatesList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(
    reduxServices.certificateList.selectors.listSize,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.certificateList.getEmployeesCertificates({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Certificate Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12}>
            <CertificatesFilterOptions />
          </CCol>
          <CCol xs={12}>
            <CertificateDetailsExpandableTable />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default CertificatesList
