import {
  CCol,
  CFormCheck,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { InitiateCycleTableProps } from '../../../types/Settings/InitiateCycle/initiateCycleTypes'

const InitiateCycleTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: InitiateCycleTableProps): JSX.Element => {
  const [isQuestionVisible, setIsQuestionVisible] = useState<boolean>(false)
  const [questionModal, setQuestionModal] = useState<string>('')

  const allQuestions = useTypedSelector(
    reduxServices.initiateCycle.selectors.allQuestions,
  )

  const allQuestionsListSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const allRecords = allQuestions?.list?.length
    ? `Total Records: ${allQuestionsListSize}`
    : `No Records found...`

  const handleDescriptionModal = (value: string) => {
    setIsQuestionVisible(true)
    setQuestionModal(value)
  }

  const dispatch = useAppDispatch()

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  return (
    <>
      <CTable responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Question</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-middle">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {allQuestions?.list &&
            allQuestions?.list?.map((item, index) => {
              const removingSpaces = item.question
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
              const questionLimit =
                removingSpaces && removingSpaces.length > 30
                  ? `${removingSpaces.substring(0, 30)}...`
                  : removingSpaces
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {item.question ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="question-link"
                        onClick={() => handleDescriptionModal(item.question)}
                      >
                        {parse(questionLimit)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell className="text-middle ms-2">
                    <CFormCheck
                      className="form-check-input form-select-not-allowed"
                      name="active"
                      type="checkbox"
                    />
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
          {allQuestionsListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {allQuestionsListSize > 20 && (
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
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isQuestionVisible}
        setVisible={setIsQuestionVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>
          <div
            dangerouslySetInnerHTML={{
              __html: questionModal,
            }}
          />
        </p>
      </OModal>
    </>
  )
}
export default InitiateCycleTable