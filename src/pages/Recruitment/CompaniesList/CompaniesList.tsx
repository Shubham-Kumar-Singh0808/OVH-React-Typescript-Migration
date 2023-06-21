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
import CompaniesListTable from './CompaniesListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import CompaniesListApi from '../../../middleware/api/Recruitment/CompaniesList/CompaniesListApi'
import { downloadFile } from '../../../utils/helper'

const CompaniesList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [selectTechnology, setSelectTechnology] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')

  const getAllTechnology = useTypedSelector(
    reduxServices.candidateList.selectors.getAllTechnology,
  )
  const listSize = useTypedSelector(
    reduxServices.companiesList.selectors.listSize,
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
    dispatch(reduxServices.candidateList.getTechnology())
    dispatch(
      reduxServices.companiesList.getAllCompanies({
        endIndex: pageSize * currentPage,
        searchCompany: searchInput,
        selectionTechnology: selectTechnology,
        startIndex: pageSize * (currentPage - 1),
      }),
    )
  }, [dispatch, pageSize, currentPage])

  const clearButtonHandler = () => {
    setSelectTechnology('')
    setSearchInput('')
    dispatch(
      reduxServices.companiesList.getAllCompanies({
        endIndex: pageSize * currentPage,
        searchCompany: '',
        selectionTechnology: '',
        startIndex: pageSize * (currentPage - 1),
      }),
    )
  }

  const viewButtonHandler = () => {
    dispatch(
      reduxServices.companiesList.getAllCompanies({
        endIndex: pageSize * currentPage,
        searchCompany: searchInput,
        selectionTechnology: selectTechnology,
        startIndex: pageSize * (currentPage - 1),
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  const searchBtnHandler = () => {
    dispatch(
      reduxServices.companiesList.getAllCompanies({
        endIndex: pageSize * CurrentPage,
        searchCompany: searchInput,
        selectionTechnology: selectTechnology,
        startIndex: pageSize * (CurrentPage - 1),
      }),
    )
  }
  const searchKeyDownBtnHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (searchInput === '') {
        dispatch(
          reduxServices.companiesList.getAllCompanies({
            endIndex: pageSize * CurrentPage,
            searchCompany: searchInput,
            selectionTechnology: selectTechnology,
            startIndex: pageSize * (CurrentPage - 1),
          }),
        )
        setCurrentPage(1)
      } else {
        dispatch(
          reduxServices.companiesList.getAllCompanies({
            endIndex: pageSize * CurrentPage,
            searchCompany: searchInput,
            selectionTechnology: selectTechnology,
            startIndex: pageSize * (CurrentPage - 1),
          }),
        )
      }
    }
  }

  const handleExportData = async () => {
    const employeeList = await CompaniesListApi.exportCompaniesList({
      companySearch: searchInput,
      selectionTechnology: selectTechnology,
    })
    downloadFile(employeeList, 'CompaniesList.csv')
  }

  useEffect(() => {
    if (window.location.pathname === '/companiesList') {
      setCurrentPage(1)
    }
  }, [])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Companies List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
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
              <option value={''}>Select Technology</option>
              {getAllTechnology.length > 0 &&
                getAllTechnology?.map((technology, index) => (
                  <option key={index} value={technology.id}>
                    {technology.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
          <CCol className="text-end" md={12}>
            <CButton
              color="info"
              className="text-white"
              size="sm"
              data-testid="export-button-download"
              onClick={handleExportData}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-4">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              onClick={viewButtonHandler}
              disabled={!selectTechnology}
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
                onKeyDown={searchKeyDownBtnHandler}
              />
              <CButton
                disabled={!searchInput?.replace(/^\s*/, '')}
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={searchBtnHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        <CompaniesListTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}

export default CompaniesList
