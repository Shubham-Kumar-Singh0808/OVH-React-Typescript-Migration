import React, { useState } from 'react'
import { CRow, CCol, CButton, CFormInput, CInputGroup } from '@coreui/react-pro'
import AssetHistoryTable from './AssetHistoryTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const AssetHistory = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const dispatch = useAppDispatch()

  const assetHistory = useTypedSelector(
    reduxServices.assetList.selectors.assetHistory,
  )

  const result = assetHistory.filter(
    (item) => item.referenceNumber === searchInput,
  )

  const searchButtonHandlerOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.assetList.getAllAssetHistoryData({
          assetId: result[0].assetId,
          searchAssetReference: searchInput,
        }),
      )
    }
  }

  const searchButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.assetList.getAllAssetHistoryData({
        assetId: result[0].assetId,
        searchAssetReference: searchInput,
      }),
    )
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Asset History"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="d-md-flex justify-content-md-end">
        <CCol className="gap-2 d-md-flex justify-content-end mt-3 mb-3" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="back-button"
            onClick={() => setToggle('')}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CRow className="d-md-flex justify-content-md-end">
        <CCol sm={3} md={3}>
          <CInputGroup className="global-search me-0 justify-content-md-end">
            <CFormInput
              data-testid="searchField"
              placeholder="Search Asset Reference"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              id="searchInput"
              name="searchInput"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
              onKeyDown={searchButtonHandlerOnKeyDown}
            />
            <CButton
              disabled={!searchInput}
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
      <AssetHistoryTable />
    </OCard>
  )
}

export default AssetHistory
