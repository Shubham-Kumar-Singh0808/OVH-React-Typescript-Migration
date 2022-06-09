import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CLink,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
const EmployeeMyAssetsTab = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [specification, setSpecification] = useState<string>('')
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const getMyAssetDetails = useTypedSelector(
    reduxServices.employeeMyAssets.selectors.myAssetDetails,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.employeeMyAssets.getEmployeeMyAssetsDetails(employeeId),
    )
  }, [dispatch, employeeId])
  const handleModal = (specification: string) => {
    setIsModalVisible(true)
    setSpecification(specification)
  }

  return (
    <>
      <CCardHeader>
        <h4 className="h4">My Assets</h4>
      </CCardHeader>
      <CCardBody>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Asset Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Product Specifications
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Location</CTableHeaderCell>
              <CTableHeaderCell scope="col">Asset Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {getMyAssetDetails?.map((assetsItem, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  {assetsItem.assetNumber}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {assetsItem.assetType}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {assetsItem.productName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    onClick={() => handleModal(assetsItem.pSpecification)}
                  >
                    {assetsItem.pSpecification}
                  </CLink>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {assetsItem.location}
                </CTableDataCell>
                <CTableDataCell scope="row">{assetsItem.status}</CTableDataCell>
                <CTableDataCell scope="row">
                  {assetsItem.employeeName}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
      <strong>
        {getMyAssetDetails?.length
          ? `Total Records: ${getMyAssetDetails?.length}`
          : `No Records found`}
      </strong>
      <OModal
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        {specification}
      </OModal>
    </>
  )
}
export default EmployeeMyAssetsTab
