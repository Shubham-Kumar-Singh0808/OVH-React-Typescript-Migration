import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OToast from '../../../components/ReusableComponent/OToast'
import { itDeclarationListApi } from '../../../middleware/api/Finance/ITDeclarationList/itDeclarationListApi'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ITDeclarationListOptionsProps } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { downloadFile } from '../../../utils/helper'

const FilterOptions = ({
  investmentCycle,
  setInvestmentCycle,
  searchInput,
  setSearchInput,
}: ITDeclarationListOptionsProps): JSX.Element => {
  const [showExportButton, setShowExportButton] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const cycles = useTypedSelector(
    reduxServices.itDeclarationList.selectors.cycles,
  )

  const toastElement = (
    <OToast toastColor="danger" toastMessage="Please Select Cycle" />
  )
  const handleSearch = () => {
    dispatch(
      reduxServices.itDeclarationList.actions.setSearchEmployee(searchInput),
    )
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.itDeclarationList.actions.setSearchEmployee(searchInput),
      )
    }
  }

  const handleExportITDeclarationList = async () => {
    const itDeclarationListDownload =
      await itDeclarationListApi.exportITDeclarationList({
        investmentCycle,
        searchname: searchInput,
      })
    downloadFile(itDeclarationListDownload, 'ITDeclarationList.csv')
  }

  useEffect(() => {
    if (investmentCycle === '' && investmentCycle !== undefined) {
      setShowExportButton(false)
      dispatch(reduxServices.app.actions.addToast(toastElement))
    } else {
      setShowExportButton(true)
    }
  }, [investmentCycle])

  useEffect(() => {
    if (cycles) {
      const getActiveCycle = cycles?.filter(
        (currentCycle) => currentCycle.active === true,
      )
      setInvestmentCycle(String(getActiveCycle[0].cycleId))
    }
  }, [cycles])

  return (
    <>
      <CRow className="justify-content-end">
        <CRow>
          <CCol sm={1} md={1} className="text-end">
            <CFormLabel className="mt-1">Cycle:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="cycle"
              name="investmentCycle"
              id="cycle"
              data-testid="investment-cycle"
              onChange={(e) => setInvestmentCycle(e.target.value)}
              value={investmentCycle}
            >
              <option value="">Select Category</option>
              {cycles &&
                cycles
                  ?.slice()
                  .sort((catg1, catg2) =>
                    catg1.cycleName.localeCompare(catg2.cycleName),
                  )
                  ?.map((cycle, index) => (
                    <option key={index} value={cycle.cycleId}>
                      {cycle.cycleName}
                    </option>
                  ))}
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CButton
              color="info btn-ovh me-1"
              className="text-white"
              data-testid="add-investmentCycle-btn"
            >
              <i className="fa fa-plus me-1"></i>Add Investment Cycle
            </CButton>
          </CCol>
          <CCol sm={5} className="text-end">
            <CButton color="info btn-ovh me-1" className="text-white">
              <i className="fa fa-plus me-1"></i>Add Investment
            </CButton>
            {showExportButton && (
              <CButton
                color="info btn-ovh me-1"
                className="text-white"
                data-testid="export-button"
                onClick={handleExportITDeclarationList}
              >
                <i className="fa fa-plus me-1"></i>Click to Export
              </CButton>
            )}
          </CCol>
        </CRow>
        <CRow className="gap-2 d-md-flex justify-content-md-end mt-4">
          <CCol sm={6} md={4} lg={5} xl={4} xxl={4}>
            <CInputGroup className="global-search me-0">
              <CFormInput
                data-testid="search-employee"
                placeholder="Search By Employee Name"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={handleSearchByEnter}
              />
              <CButton
                disabled={!searchInput}
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={handleSearch}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CRow>
    </>
  )
}

export default FilterOptions
