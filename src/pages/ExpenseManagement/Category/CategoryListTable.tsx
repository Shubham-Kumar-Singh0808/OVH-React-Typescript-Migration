import React, { useEffect } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CLink,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { CategoryListTableProps } from '../../../types/ExpenseManagement/Category/categoryListTypes'

const ExpenseCategoryListTable = ({
  userAccess,
}: CategoryListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const categoryList = useTypedSelector(
    reduxServices.categoryList.selectors.categories,
  )
  useEffect(() => {
    dispatch(reduxServices.categoryList.getCategoryList())
  }, [dispatch])

  return (
    <>
      <CTable className="mt-4 mb-4">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {categoryList?.length > 0 &&
            categoryList?.map((categoryItems, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {categoryItems.categoryName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    <div className="buttons-clients">
                      {/* {userAccess?.updateaccess && ()} */}
                      <CTooltip content="Edit">
                        <CButton
                          color="info btn-ovh me-1"
                          className="btn-ovh-employee-list"
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>

                      {/* {userAccess?.deleteaccess && ( )} */}
                      <CTooltip content="Delete">
                        <CButton
                          color="danger btn-ovh me-1"
                          className="btn-ovh-employee-list"
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ExpenseCategoryListTable
