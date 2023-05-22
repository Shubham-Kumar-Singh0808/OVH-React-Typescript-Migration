import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'

const AssetListFilters = (): JSX.Element => {
  const [asset, setAsset] = useState<string>('')
  const [assetType, setAssetType] = useState<string>('')
  const [productType, setProductType] = useState<string>('')
  //   const [namesArray, setNamesArray] = useState<NameObj[]>([])

  //     useEffect(()=>{
  //   reduxServices.
  //     },[])
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (assetType) {
      dispatch(
        reduxServices.assetList.getAssetTypeChangeList(Number(assetType)),
      )
    }
  }, [assetType])
  return (
    <>
      <CRow className="justify-content-end">
        <CRow>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Asset:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectAsset"
              data-testid="form-select1"
              name="selectAsset"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            >
              <option value="Select Assets">Select Assets</option>
              <option value="Yesterday">All</option>
              <option value="This Week">Assigned</option>
              <option value="Last Month">Unassigned</option>
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Asset Type::</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectAssetType"
              data-testid="form-select1"
              name="selectAssetType"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value="Select Asset Type">Select Asset Type</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Utilities">Utilities</option>
            </CFormSelect>
            {/* {namesArray.map(({ name }) => (<option value={name}>{name}</option>))} */}
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Product Type:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="ProductType"
              data-testid="form-select1"
              name="selectProductType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="Today">Select Product Type</option>
              {/* <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
          <option value="Current Month">Current Month</option>
          <option value="Custom">Custom</option> */}
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Status:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="Status"
              data-testid="form-select1"
              name="selectStatus"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="Select Status">Select Status</option>
              <option value="Idle">Idle</option>
              <option value="Not Working">Not Working</option>
              <option value="Scrap">Scrap</option>
              <option value="Under Repair">Under Repair</option>
              <option value="Working">Working</option>
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Date of Purchase:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectDateOfPurchus"
              data-testid="form-select1"
              name="selectDateOfPurchus"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="Select Date">Select Date</option>
              <option value="Last Month">Last Month</option>
              <option value="Current Month">Current Month</option>
              <option value="Current Year">Current Year</option>
              <option value="Last Year">Last Year</option>
              <option value="Custom">Custom</option>
            </CFormSelect>
          </CCol>
          <CRow className="mt-4 mb-4">
            <CCol sm={9} md={{ offset: 3 }}>
              <CButton
                className="cursor-pointer"
                color="success btn-ovh me-1"
                data-testid="view-btn"
                // onClick={viewButtonHandler}
              >
                View
              </CButton>
              <CButton
                className="cursor-pointer"
                disabled={false}
                color="warning btn-ovh me-1"
                //onClick={clearButtonHandler}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CRow>
      </CRow>
    </>
  )
}

export default AssetListFilters
