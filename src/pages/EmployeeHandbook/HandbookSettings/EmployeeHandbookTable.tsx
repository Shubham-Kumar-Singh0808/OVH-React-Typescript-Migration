import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { EmployeeHandbookTableProps } from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeHandbookTable = (
  props: EmployeeHandbookTableProps,
): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [handbookId, setHandbookId] = useState(0)
  const [toDeleteHandbook, setToDeleteHandbook] = useState('')

  const employeeHandbooks = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeHandbooks,
  )
  const handbookListSize = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.listSize,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToHandbookActions = userAccessToFeatures?.find(
    (feature) => feature.name === 'Handbook',
  )
  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const tableHeaderCellPropSNo = {
    width: '6%',
    scope: 'col',
  }
  const tableHeaderCellPropTitle = {
    width: '14%',
    scope: 'col',
  }
  const tableHeaderCellPropPageName = {
    width: '8%',
    scope: 'col',
  }
  const tableHeaderCellPropDisplayOrder = {
    width: '10%',
    scope: 'col',
  }
  const tableHeaderCellPropCountry = {
    width: '50%',
    scope: 'col',
  }
  const tableHeaderCellPropActions = {
    width: '12%',
    scope: 'col',
  }

  const toastElement = (
    <OToast toastColor="success" toastMessage="Page deleted successfully." />
  )
  const handleShowDeleteModal = (bookId: number, title: string) => {
    setHandbookId(bookId)
    setToDeleteHandbook(title)
    setIsDeleteModalVisible(true)
  }
  const dispatch = useAppDispatch()

  const handleConfirmDeleteHandbook = async () => {
    setIsDeleteModalVisible(false)
    const deleteHandbookResultAction = await dispatch(
      reduxServices.employeeHandbookSettings.deleteEmployeeHandbook(handbookId),
    )
    if (
      reduxServices.employeeHandbookSettings.deleteEmployeeHandbook.fulfilled.match(
        deleteHandbookResultAction,
      )
    ) {
      let tempPageNum = currentPage
      if (employeeHandbooks.length === 1 && currentPage !== 1) {
        setCurrentPage((prevState) => prevState - 1)
        tempPageNum = currentPage - 1
      }
      dispatch(
        reduxServices.employeeHandbookSettings.getEmployeeHandbooks({
          startIndex: pageSize * (tempPageNum - 1),
          endIndex: pageSize * tempPageNum,
        }),
      )
      dispatch(reduxServices.app.actions.addToast(toastElement))
    }
  }

  const isLoading = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.isLoading,
  )

  const actionHeaderViewAccess =
    userAccessToHandbookActions?.updateaccess ||
    userAccessToHandbookActions?.deleteaccess

  return (
    <>
      {employeeHandbooks?.length && isLoading !== ApiLoadingState.loading ? (
        <>
          <CTable striped responsive align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell {...tableHeaderCellPropSNo}>
                  #
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellPropTitle}>
                  Title
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellPropPageName}>
                  Page Name
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellPropDisplayOrder}>
                  Display Order
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellPropCountry}>
                  Country
                </CTableHeaderCell>
                {actionHeaderViewAccess ? (
                  <CTableHeaderCell {...tableHeaderCellPropActions}>
                    Actions
                  </CTableHeaderCell>
                ) : (
                  <></>
                )}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {employeeHandbooks?.map((employeeHandbook, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">
                      {getItemNumber(index)}
                    </CTableDataCell>
                    <CTableDataCell>{employeeHandbook.title}</CTableDataCell>
                    <CTableDataCell>{employeeHandbook.pageName}</CTableDataCell>
                    <CTableDataCell>
                      {employeeHandbook.displayOrder}
                    </CTableDataCell>
                    <CTableDataCell>
                      <ul
                        className="list-inline"
                        style={{ display: 'block', padding: 0 }}
                      >
                        {employeeHandbook.handCountry.map(
                          (country, indexNumber) => (
                            <li
                              key={indexNumber}
                              style={{
                                listStyleType: 'none',
                                marginRight: '20px',
                                minWidth: '86px',
                              }}
                              className="list-inline-item"
                            >
                              {country.name}
                            </li>
                          ),
                        )}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell className="align-items-end">
                      {userAccessToHandbookActions?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            size="sm"
                            color="info"
                            className="btn-ovh me-1 btn-sm btn-ovh-employee-list"
                            data-testid={`handbook-edit-btn${index}`}
                            onClick={() => {
                              props.editHandbookButtonHandler(
                                employeeHandbook.id as number,
                              )
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccessToHandbookActions?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            size="sm"
                            data-testid={`handbook-delete-btn${index}`}
                            color="danger"
                            className="btn-ovh me-1 btn-sm btn-ovh-employee-list"
                            onClick={() =>
                              handleShowDeleteModal(
                                employeeHandbook.id as number,
                                employeeHandbook.title,
                              )
                            }
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {handbookListSize} </strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {handbookListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {handbookListSize > 20 && (
              <CCol
                xs={5}
                className="d-grid gap-1 d-md-flex justify-content-md-end"
              >
                <OPagination
                  currentPage={currentPage}
                  pageSetter={setCurrentPage}
                  paginationRange={paginationRange}
                />
              </CCol>
            )}
          </CRow>
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
      {!employeeHandbooks?.length && isLoading !== ApiLoadingState.loading && (
        <CCol>
          <CRow>
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
      <OModal
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Handbook"
        closeButtonClass="d-none"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteHandbook}
      >
        <>
          Do you really want to delete this <strong>{toDeleteHandbook}</strong>{' '}
          Handbook Item?
        </>
      </OModal>
    </>
  )
}

export default EmployeeHandbookTable
