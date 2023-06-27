import React from 'react'
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
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  ITDeclarationFormToggleType,
  ITDeclarationListTableProps,
  ITForm,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ITDeclarationListTable = (
  props: ITDeclarationListTableProps,
): JSX.Element => {
  const dispatch = useAppDispatch()
  const itDeclarationForms = useTypedSelector(
    reduxServices.itDeclarationList.selectors.itDeclarationForms,
  )
  const itDeclarationListSize = useTypedSelector(
    reduxServices.itDeclarationList.selectors.listSize,
  )
  const userAccessToEditDeclarationForm = useTypedSelector(
    (state) => state.userAccessToFeatures.userAccessToFeatures,
  )?.find((feature) => feature.name === 'IT Declaration Form')
  const loggedInEmployeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
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

  console.log(useTypedSelector((state) => state.itDeclarationList))

  const editITFormButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    form: ITForm,
  ) => {
    e.preventDefault()
    const result = await dispatch(
      reduxServices.itDeclarationList.isITFormEditable(
        form.itDeclarationFormId,
      ),
    )
    if (
      reduxServices.itDeclarationList.isITFormEditable.fulfilled.match(result)
    ) {
      dispatch(reduxServices.itDeclarationList.getEmployeeDetails())
      const sectionsResult = await dispatch(
        reduxServices.itDeclarationList.getSectionsHavingInvests(),
      )
      dispatch(
        reduxServices.itDeclarationList.actions.editThisForm({
          ...form,
          isAgree: false, //as initial value is null, changing it to false
        }),
      )
      if (
        reduxServices.itDeclarationList.getSectionsHavingInvests.fulfilled.match(
          sectionsResult,
        )
      ) {
        dispatch(
          reduxServices.itDeclarationList.actions.setToggle(
            ITDeclarationFormToggleType.updateITDeclarationForm,
          ),
        )
      }
    }
  }

  return (
    <>
      {itDeclarationForms?.length ? (
        <>
          <CTable className="mt-4" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col">My Saving</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {itDeclarationForms?.map((itDeclaration, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{itDeclaration.employeeId}</CTableDataCell>
                    <CTableDataCell>
                      {itDeclaration.employeeName}
                    </CTableDataCell>
                    <CTableDataCell>{itDeclaration.designation}</CTableDataCell>
                    <CTableDataCell>
                      {itDeclaration.grandTotal?.toLocaleString('en-IN')}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="View">
                        <CButton
                          className="btn-ovh me-1 sh-eye-btn-color btn-sm btn-ovh-employee-list cursor-pointer"
                          data-testid={`viewItDeclarationForm-btn${index}`}
                          onClick={() =>
                            props.viewDeclarationFormButtonHandler(
                              itDeclaration,
                            )
                          }
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                      {userAccessToEditDeclarationForm?.updateaccess &&
                      // only the employee whose form it is can edit it with user role permission
                      +loggedInEmployeeId === itDeclaration.employeeId ? (
                        <>
                          <CTooltip content="Edit">
                            <CButton
                              color="info btn-ovh"
                              className="btn-ovh-employee-list"
                              data-testid={`itDecFormEditBtn-${index}`}
                              onClick={(e) =>
                                editITFormButtonHandler(e, itDeclaration)
                              }
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </CButton>
                          </CTooltip>
                        </>
                      ) : (
                        <></>
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
                <strong>Total Records: {itDeclarationListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {itDeclarationListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {itDeclarationListSize > 20 && (
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
        <CRow className="mt-4">
          <strong>No Records Found... </strong>
        </CRow>
      )}
    </>
  )
}

export default ITDeclarationListTable
