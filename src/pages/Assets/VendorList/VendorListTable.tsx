import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CTooltip,
  CButton,
  CLink,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  VendorDetails,
  VendorListTableProps,
} from '../../../types/Assets/VendorList/vendorListTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OModal from '../../../components/ReusableComponent/OModal'

const VendorListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: VendorListTableProps): JSX.Element => {
  const [isVendorAddressModalVisible, setIsVendorAddressModalVisible] =
    useState<boolean>(false)
  const [vendorAddress, setVendorAddress] = useState({} as VendorDetails)

  const dispatch = useAppDispatch()
  const handleModal = (vendorAddress: VendorDetails) => {
    setIsVendorAddressModalVisible(true)
    setVendorAddress(vendorAddress)
  }
  const vendorList = useTypedSelector(
    reduxServices.vendorList.selectors.vendors,
  )

  const listSize = useTypedSelector(reduxServices.vendorList.selectors.listSize)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  return (
    <>
      <CTable striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Vendor Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Updated by</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {vendorList?.length > 0 &&
            vendorList?.map((vendor, index) => {
              const removeTag = '/(<([^>]+)>)/gi'
              const removeSpaces = vendor?.vendorAddress
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
                .replace(removeTag, '')
                .replace(/:/g, '')
              const vendorAddressLimit =
                removeSpaces && removeSpaces.length > 30
                  ? `${removeSpaces.substring(0, 30)}...`
                  : removeSpaces

              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {vendor.vendorName}
                  </CTableDataCell>
                  <CTableDataCell
                    scope="row"
                    className="sh-organization-link sh-comment"
                  >
                    {vendorAddressLimit ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid={`vendor-address-${index}`}
                        onClick={() => handleModal(vendor)}
                      >
                        {parse(vendor?.vendorAddress)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {vendor.vendorCity}
                  </CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {vendor.vendorPhoneNumber}
                  </CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {vendor.vendorEmailId}
                  </CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {vendor.createdBy}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CTableRow>
                      <CTooltip content="Edit">
                        <CButton
                          className="btn-ovh-employee-list me-1"
                          color="info btn-ovh me-1"
                          data-testid="edit-btn"
                        >
                          <i
                            className="fa fa-edit text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTooltip>
                    </CTableRow>
                    <CTableRow>
                      <CTooltip content="Delete">
                        <CButton
                          className="btn-ovh-employee-list me-1"
                          color="danger btn-ovh me-1"
                          data-testid="delete-btn"
                        >
                          <i
                            className="fa fa-trash-o text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTooltip>
                    </CTableRow>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {listSize ? `Total Records: ${listSize}` : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {listSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {listSize > 20 && (
          <CCol
            xs={5}
            className="gap-1 d-grid d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isVendorAddressModalVisible}
        setVisible={setIsVendorAddressModalVisible}
      >
        <span className="descriptionField" data-testid="modal-cnt-add">
          <div
            dangerouslySetInnerHTML={{
              __html: vendorAddress.vendorAddress,
            }}
          />
        </span>
      </OModal>
    </>
  )
}

export default VendorListTable
