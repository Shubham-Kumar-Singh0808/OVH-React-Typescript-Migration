import {
  CRow,
  CCol,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import AddBankAccount from './AddBankAccount'
import EditBankAccount from './EditBankAccount'
import OCard from '../../../components/ReusableComponent/OCard'
import OModal from '../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const BankDetails = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toggle, setToggle] = useState('')

  const bankDetail = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )
  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title={'Bank Details'}
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                onClick={() => setToggle('/myFinance')}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
          <CTable striped responsive className="mt-5 align-middle alignment">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">A/C No</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-middle">
                  Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  IFSC Code
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {bankDetail.bankinfo &&
                bankDetail.bankinfo?.map((name, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{name.bankAccountNumber}</CTableDataCell>
                      <CTableDataCell>{name.bankName}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CTooltip content="Edit">
                          <CButton
                            size="sm"
                            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                            color="info btn-ovh me-1"
                            onClick={() => setToggle('myFinance')}
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Delete">
                          <CButton
                            data-testid={`btn-delete${index}`}
                            size="sm"
                            color="danger btn-ovh me-1"
                            className="btn-ovh-employee-list"
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: </strong>
              </p>
            </CCol>
          </CRow>
          <OModal
            alignment="center"
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            modalTitle="Delete Bank Detail"
            confirmButtonText="Yes"
            cancelButtonText="No"
            closeButtonClass="d-none"
            modalBodyClass="mt-0"
          >
            <>Do you really want to delete this </>
          </OModal>
        </OCard>
      )}
      {toggle === '/myFinance' && <AddBankAccount setToggle={setToggle} />}
      {toggle === 'myFinance' && <EditBankAccount setToggle={setToggle} />}
    </>
  )
}

export default BankDetails
