import {
  CButton,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useMemo, useState } from 'react'
import parse from 'html-react-parser'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { InitiateCycleTableProps } from '../../../../types/Settings/InitiateCycle/initiateCycleTypes'
import { currentPageData } from '../../../../utils/paginationUtils'
import OModal from '../../../../components/ReusableComponent/OModal'

const AddInitiateCycleTable = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: InitiateCycleTableProps): JSX.Element => {
  const [isCycleModalVisible, setIsCycleModalVisible] = useState<boolean>(false)
  const [cyclePopUp, setCyclePopUp] = useState<string>('')

  const allCycles = useTypedSelector(
    reduxServices.initiateCycle.selectors.allCycles,
  )
  const allQuestionsSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const allRecords = allCycles?.list?.length
    ? `Total Records: ${allQuestionsSize}`
    : `No Records found...`

  const dispatch = useAppDispatch()

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getPageNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentTotalPageRecords = useMemo(
    () => currentPageData(allCycles?.list, currentPage, pageSize),
    [allCycles?.list, currentPage, pageSize],
  )

  const editCycleHandler = (id: number) => {
    dispatch(reduxServices.initiateCycle.actions.setToggle('editCycle'))
    dispatch(reduxServices.initiateCycle.editCycle(id))
  }
  const handleCycleDescriptionModal = (value: string) => {
    setIsCycleModalVisible(true)
    setCyclePopUp(value)
  }
  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cycle Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">From Month</CTableHeaderCell>
            <CTableHeaderCell scope="col">To Month</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentTotalPageRecords?.length > 0 &&
            currentTotalPageRecords?.map((cycle, index) => {
              const removingSpacesOfText = cycle.cycleName
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
              const limitOfQuestion =
                removingSpacesOfText && removingSpacesOfText.length > 30
                  ? `${removingSpacesOfText.substring(0, 30)}...`
                  : removingSpacesOfText
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getPageNumber(index)}</CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {cycle.cycleName ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="question-link"
                        onClick={() =>
                          handleCycleDescriptionModal(cycle.cycleName)
                        }
                      >
                        {parse(limitOfQuestion)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell>{cycle?.fromMonth || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{cycle?.toMonth || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {cycle?.activateFlag === true ? 'Active' : 'In-Active'}
                  </CTableDataCell>
                  <CTableDataCell>{cycle.startDate || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{cycle.endDate || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Edit">
                      <CButton
                        size="sm"
                        className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                        color="info btn-ovh me-1"
                        onClick={() => editCycleHandler(cycle?.id)}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
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
          <p className="mt-2">
            <strong>{allRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {allQuestionsSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
      </CRow>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isCycleModalVisible}
        setVisible={setIsCycleModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: cyclePopUp,
          }}
        />
      </OModal>
    </>
  )
}
export default AddInitiateCycleTable
