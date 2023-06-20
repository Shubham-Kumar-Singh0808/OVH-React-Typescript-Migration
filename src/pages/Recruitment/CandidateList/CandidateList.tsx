import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import CandidateListTable from './CandidateListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'

const CandidateList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [selectStatus, setSelectStatus] = useState<string>('')
  const [selectTechnology, setSelectTechnology] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')

  const [selectCountry, setSelectCountry] = useState<string>('')

  const getAllEmpCountries = useTypedSelector(
    reduxServices.candidateList.selectors.getAllEmpCountries,
  )
  const getAllTechnology = useTypedSelector(
    reduxServices.candidateList.selectors.getAllTechnology,
  )
  const listSize = useTypedSelector(
    reduxServices.candidateList.selectors.listSize,
  )

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.candidateList.getEmpCountries())
    dispatch(reduxServices.candidateList.getTechnology())
    dispatch(
      reduxServices.candidateList.searchScheduledCandidate({
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        searchStr: searchInput,
      }),
    )
  }, [dispatch, pageSize, CurrentPage, searchInput])

  const viewButtonHandler = () => {
    dispatch(
      reduxServices.candidateList.getCountryWiseCandidatesList({
        candidateStatus: selectStatus,
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        selectionCountry: Number(selectCountry),
        selectionTechnology: selectTechnology,
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  const searchButtonHandler = () => {
    dispatch(
      reduxServices.candidateList.searchScheduledCandidate({
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        searchStr: searchInput,
      }),
    )
  }
  const searchKeyDownButtonHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (searchInput === '') {
        dispatch(
          reduxServices.candidateList.searchScheduledCandidate({
            startIndex: pageSize * (CurrentPage - 1),
            endIndex: pageSize * CurrentPage,
            searchStr: searchInput,
          }),
        )
        setCurrentPage(1)
      } else {
        dispatch(
          reduxServices.candidateList.searchScheduledCandidate({
            startIndex: pageSize * (CurrentPage - 1),
            endIndex: pageSize * CurrentPage,
            searchStr: searchInput,
          }),
        )
      }
    }
  }

  const clearButtonHandler = () => {
    setSelectStatus('')
    setSelectTechnology('')
    setSelectCountry('')
    setSearchInput('')
    dispatch(
      reduxServices.candidateList.searchScheduledCandidate({
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        searchStr: '',
      }),
    )
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Candidate List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Status:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              className="pe-2"
              aria-label="Default select example"
              size="sm"
              id="selectStatus"
              data-testid="selectStatus"
              name="selectStatus"
              value={selectStatus}
              onChange={(e) => {
                setSelectStatus(e.target.value)
              }}
            >
              <option value={''}>Select Status</option>
              <option value="ALL">All</option>
              <option value="OFFERED">Offered</option>
              <option value="REJECTED">Rejected</option>
              <option value="NEW">New</option>
              <option value="IN_PROCESS">In Progress</option>
              <option value="RESCHEDULED">Rescheduled</option>
              <option value="HOLD">Hold</option>
              <option value="NO_SHOW">No show</option>
              <option value="DID_NOT_JOIN">Did not Join</option>
            </CFormSelect>
          </CCol>

          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Technology:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectTechnology"
              data-testid="selectTechnology"
              name="selectTechnology"
              value={selectTechnology}
              onChange={(e) => {
                setSelectTechnology(e.target.value)
              }}
            >
              <option value={''}>Select Status</option>
              {getAllTechnology.length > 0 &&
                getAllTechnology?.map((technology, index) => (
                  <option key={index} value={technology.id}>
                    {technology.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CRow>
              <CCol sm={3} lg={3} className="text-end">
                <CFormLabel className="mt-1">Country:</CFormLabel>
              </CCol>
              <CCol sm={6}>
                <CFormSelect
                  aria-label="Default select example"
                  size="sm"
                  id="selectCountry"
                  data-testid="selectCountry"
                  name="selectCountry"
                  value={selectCountry}
                  onChange={(e) => {
                    setSelectCountry(e.target.value)
                  }}
                >
                  <option value={''}>Select Reschedule Status</option>
                  {getAllEmpCountries.length > 0 &&
                    getAllEmpCountries?.map((country, index) => (
                      <option key={index} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-4">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              onClick={viewButtonHandler}
            >
              View
            </CButton>
            <CButton
              className="cursor-pointer"
              disabled={false}
              data-testid="clear-btn"
              color="warning btn-ovh me-1"
              onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </CCol>
          <CCol xs={3} className="d-md-flex justify-content-md-end">
            <CButton color="info btn-ovh me-0">
              <i className="fa fa-plus me-1"></i> Add Candidate
            </CButton>
          </CCol>
        </CRow>
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
            <CInputGroup className="global-search me-0">
              <CFormInput
                data-testid="searchField"
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                value={searchInput?.replace(/^\s*/, '')}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={searchKeyDownButtonHandler}
              />
              <CButton
                disabled={!searchInput?.replace(/^\s*/, '')}
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={searchButtonHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        <CandidateListTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
          searchInput={searchInput}
        />
      </OCard>
    </>
  )
}

export default CandidateList
