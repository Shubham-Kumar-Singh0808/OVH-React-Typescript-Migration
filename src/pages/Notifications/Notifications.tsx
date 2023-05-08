import React, { useEffect } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import OCard from '../../components/ReusableComponent/OCard'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import OPageSizeSelect from '../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../components/ReusableComponent/OPagination'
import { usePagination } from '../../middleware/hooks/usePagination'

const Notifications = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const notificationAlerts = useTypedSelector(
    reduxServices.notification.selectors.notificationAlerts,
  )
  const listSize = useTypedSelector(
    reduxServices.notification.selectors.listSize,
  )

  const totalNoOfRecords = notificationAlerts?.length
    ? `Total Records: ${listSize}`
    : `No Records found...`

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  useEffect(() => {
    dispatch(
      reduxServices.notification.getAllAlerts({
        employeeId: Number(employeeId),
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

  const ButtonHandler = (id: number) => {
    dispatch(
      reduxServices.notification.getUpdateAlert({
        employeeId: Number(employeeId),
        alertId: id,
      }),
    )
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Notifications"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          {notificationAlerts.length > 0 &&
            notificationAlerts?.map((location, index) => {
              return (
                <CTableRow key={index}>
                  <CButton
                    data-testid={`btn-delete${index}`}
                    size="sm"
                    color="success btn-ovh me-1"
                    className="btn-ovh-employee-list"
                    onClick={() => ButtonHandler(location.id)}
                  >
                    <i className="fa fa-briefcase fa-lg" aria-hidden="true"></i>
                  </CButton>
                  <CCol sm={6}>
                    <CTableDataCell>{location.msg}</CTableDataCell>
                  </CCol>
                  <CRow>
                    <CTableDataCell>
                      <b>{location.msgDate}</b>
                    </CTableDataCell>
                  </CRow>
                </CTableRow>
              )
            })}
        </CRow>
        <CRow>
          <CCol xs={4}>
            <p className="mt-2">
              <strong>{totalNoOfRecords}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {listSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSize}
                options={[20, 40, 60, 80, 100]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {listSize > 20 && (
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
      </OCard>
    </>
  )
}

export default Notifications
