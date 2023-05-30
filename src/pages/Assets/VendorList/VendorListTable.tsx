import React, { useState } from 'react'
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
import OToast from '../../../components/ReusableComponent/OToast'

const VendorListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  setToggle,
  setEditVendorInfo,
  userAccess,
}: VendorListTableProps): JSX.Element => {
  const [isVendorAddressModalVisible, setIsVendorAddressModalVisible] =
    useState<boolean>(false)
  const [vendorAddress, setVendorAddress] = useState({} as VendorDetails)
  const [deleteClientModalVisibility, setDeleteClientModalVisibility] =
    useState(false)
  const [deleteVendorId, setDeleteVendorId] = useState(0)
  const [vendorName, setVendorName] = useState<string>('')

  const dispatch = useAppDispatch()
  const handleModal = (address: VendorDetails) => {
    setIsVendorAddressModalVisible(true)
    setVendorAddress(address)
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

  const onDeleteBtnClick = (deleteVendorsId: number, name: string) => {
    setDeleteClientModalVisibility(true)
    setVendorName(name)
    setDeleteVendorId(deleteVendorsId)
  }

  const deleteSuccessToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Vendor Details deleted Successfully!"
    />
  )

  const editButtonHandler = (vendorData: VendorDetails) => {
    setEditVendorInfo(vendorData)
    setToggle('editVendorDetails')
  }

  const handleConfirmDeleteVendor = async () => {
    setDeleteClientModalVisibility(false)
    const deleteClientResultAction = await dispatch(
      reduxServices.vendorList.deleteVendorDetails(deleteVendorId),
    )
    if (
      reduxServices.vendorList.deleteVendorDetails.fulfilled.match(
        deleteClientResultAction,
      )
    ) {
      dispatch(
        reduxServices.vendorList.getVendors({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          vendorName: '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(deleteSuccessToastElement))
    }
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
              const removeTag = `${vendor?.vendorAddress
                .replace(/<[^>]+>/g, '')
                .replace(/&nbsp;/g, '')
                .replace(/:/g, '')}`
              const vendorAddressLimit =
                removeTag && removeTag.length > 30
                  ? `${removeTag.substring(0, 30)}...`
                  : removeTag

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
                  <CTableDataCell scope="row">
                    <div className="buttons-clients">
                      {userAccess?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            color="info btn-ovh me-1"
                            className="btn-ovh-employee-list"
                            onClick={() => editButtonHandler(vendor)}
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccess?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            color="danger btn-ovh me-1"
                            className="btn-ovh-employee-list"
                            onClick={() =>
                              onDeleteBtnClick(
                                vendor.vendorId,
                                vendor.vendorName,
                              )
                            }
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </div>
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
        <span
          className="descriptionField"
          data-testid="modal-cnt-add"
          style={{ minHeight: '90px' }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: vendorAddress.vendorAddress,
            }}
          />
        </span>
      </OModal>
      <OModal
        alignment="center"
        visible={deleteClientModalVisibility}
        setVisible={setDeleteClientModalVisibility}
        modalTitle="Delete Vendor Details"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteVendor}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <strong>{vendorName}</strong> Vendor
          Details ?
        </>
      </OModal>
    </>
  )
}

export default VendorListTable
