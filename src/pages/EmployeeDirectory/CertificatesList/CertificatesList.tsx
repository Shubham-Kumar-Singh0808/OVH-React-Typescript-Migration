import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import CertificateDetailsExpandableTable from './CertificateDetailsExpandableTable'
import CertificatesFilterOptions from './CertificatesFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const CertificatesList = (): JSX.Element => {
  const [selectedTechnology, setSelectedTechnology] = useState<string>('')
  const [selectedCertificate, setSelectedCertificate] = useState<string>('')
  const [multiSearchValue, setMultiSearchValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(
    reduxServices.certificateList.selectors.listSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.certificateList.selectors.isLoading,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
    if (selectedTechnology) {
      dispatch(
        reduxServices.employeeCertifications.getCertificateByTechnologyName(
          selectedTechnology,
        ),
      )
    }
    dispatch(
      reduxServices.certificateList.getEmployeesCertificates({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        multipleSearch: multiSearchValue,
        selectedCertificate: selectedCertificate,
        selectionTechnology: selectedTechnology,
      }),
    )
  }, [
    currentPage,
    dispatch,
    multiSearchValue,
    pageSize,
    selectedCertificate,
    selectedTechnology,
  ])

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
            <CertificatesFilterOptions
              selectedTechnology={selectedTechnology}
              setSelectedTechnology={setSelectedTechnology}
              selectedCertificate={selectedCertificate}
              setSelectedCertificate={setSelectedCertificate}
              setMultiSearchValue={setMultiSearchValue}
            />
          </CCol>
          {isLoading !== ApiLoadingState.loading ? (
            <CCol xs={12}>
              <CertificateDetailsExpandableTable
                paginationRange={paginationRange}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </CCol>
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

export default CertificatesList
