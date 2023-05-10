import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CertificatesFilterOptionsProps } from '../../../types/EmployeeDirectory/CertificatesList/certificatesListTypes'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import certificatesApi from '../../../middleware/api/EmployeeDirectory/CertificatesList/certificatesListApi'
import { downloadFile } from '../../../utils/helper'
import { reduxServices } from '../../../reducers/reduxServices'

const CertificatesFilterOptions = ({
  selectTechnology,
  setSelectTechnology,
  setFilterByTechnology,
  setFilterByCertificate,
  setMultiSearchValue,
  filterByTechnology,
  filterByCertificate,
  multiSearchValue,
  setIsAccordionItemShow,
  setPageSize,
  setCurrentPage,
}: CertificatesFilterOptionsProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const [searchInput, setSearchInput] = useState<string>('')
  const [selectCertificate, setSelectCertificate] = useState<string>('')
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)

  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )

  const getCertificateByTechnology = useTypedSelector(
    (state) => state.employeeCertificates.typeOfCertificate,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddCertificateType = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Certificate Type',
  )
  const handleSearchButton = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setMultiSearchValue(searchInput)
      setFilterByTechnology(selectTechnology)
      setIsAccordionItemShow(true)
    }
  }
  const multiSearchButtonHandler = () => {
    setMultiSearchValue(searchInput)
    setFilterByTechnology(selectTechnology)
    setIsAccordionItemShow(true)
  }

  const viewButtonHandler = () => {
    setFilterByTechnology(selectTechnology)
    setFilterByCertificate(selectCertificate)
    setMultiSearchValue(searchInput)
    setIsAccordionItemShow(true)
  }

  const clearButtonHandler = () => {
    setSelectTechnology('')
    setSelectCertificate('')
    setFilterByTechnology('')
    setFilterByCertificate('')
    setMultiSearchValue('')
    setSearchInput('')
    setIsAccordionItemShow(false)
    dispatch(
      reduxServices.employeeCertifications.actions.clearCertificateType([]),
    )
  }

  useEffect(() => {
    if (selectTechnology) {
      setIsViewBtnEnabled(true)
    } else {
      setIsViewBtnEnabled(false)
    }
  }, [selectCertificate, selectTechnology])

  const handleExportCertificatesData = async () => {
    const certificateListDownload =
      await certificatesApi.exportCertificatesData({
        selectionTechnology: filterByTechnology,
        selectedCertificate: filterByCertificate,
        multipleSearch: multiSearchValue,
      })
    downloadFile(certificateListDownload, 'CertificatesList.csv')
  }

  const onChangeTechnologyHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectTechnology(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }

  const onChangeCertificateHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectCertificate(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }

  return (
    <>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Technology:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            className="pe-2"
            aria-label="Default select example"
            size="sm"
            id="technology"
            data-testid="selectTechnology"
            name="technology"
            value={selectTechnology}
            onChange={onChangeTechnologyHandler}
          >
            <option value={''}>Select Technology</option>
            {getTechnologies
              ?.slice()
              .sort((technology1, technology2) =>
                technology1.name.localeCompare(technology2.name),
              )
              .map((certificateItem, index) => (
                <option key={index} value={certificateItem.name}>
                  {certificateItem.name}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={4}>
          <CRow>
            <CCol sm={4} lg={5} className="text-end">
              <CFormLabel className="mt-1">Certificate Type:</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="certificate"
                data-testid="selectCertificate"
                name="certificate"
                value={selectCertificate}
                onChange={onChangeCertificateHandler}
              >
                <option value={''}>Select Certificate</option>
                {getCertificateByTechnology?.map(
                  (certificateTypeItem, index) => (
                    <option
                      key={index}
                      value={certificateTypeItem.certificateType}
                    >
                      {certificateTypeItem.certificateType}
                    </option>
                  ),
                )}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        {userAccessToAddCertificateType?.viewaccess && (
          <CCol xs={5} className="d-md-flex justify-content-md-end">
            <Link to={`/certificateTypeList`}>
              <CButton color="info btn-ovh me-0">
                <i className="fa fa-plus me-1"></i>Add Certificate Type
              </CButton>
            </Link>
          </CCol>
        )}
      </CRow>
      <CRow className="mt-5 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            disabled={!isViewBtnEnabled}
            color="success btn-ovh me-1"
            onClick={viewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
        <CCol xs={3} className="d-md-flex justify-content-md-end">
          <CButton
            color="info btn-ovh me-0"
            onClick={handleExportCertificatesData}
          >
            <i className="fa fa-plus me-1"></i>Click to Export
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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
              onKeyDown={handleSearchButton}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={multiSearchButtonHandler}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default CertificatesFilterOptions
