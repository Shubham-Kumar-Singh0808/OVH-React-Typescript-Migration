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
import React, { useMemo, useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { InitiateCycleCheckBoxProps } from '../../../types/Settings/InitiateCycle/initiateCycleTypes'
import { currentPageData } from '../../../utils/paginationUtils'

const InitiateCycleTable = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  setCycleChecked,
  cycleChecked,
  selChkBoxesFromApi,
}: InitiateCycleCheckBoxProps): JSX.Element => {
  const [isQuestionVisible, setIsQuestionVisible] = useState<boolean>(false)
  const [questionModal, setQuestionModal] = useState<string>('')

  const allQuestions = useTypedSelector(
    reduxServices.initiateCycle.selectors.allQuestions,
  )

  const allQuestionsListSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const allCycleRecords = allQuestions?.list?.length
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

  const getPageNo = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const currentTotalRecords = useMemo(
    () => currentPageData(allQuestions?.list, currentPage, pageSize),
    [allQuestions?.list, currentPage, pageSize],
  )

  const sortingId = useMemo(() => {
    if (currentTotalRecords) {
      return currentTotalRecords
        ?.slice()
        .sort((sortNode1, sortNode2) => sortNode2.id - sortNode1.id)
    }
    return []
  }, [currentTotalRecords])

  return (
    <>
      <CTable
        responsive
        className="mt-5 align-middle alignment sh-initiateCheckBox"
      >
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
          {sortingId?.length > 0 &&
            sortingId?.map((item, index) => {
              const removingSpaces = item.question
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
              const questionLimit =
                removingSpaces && removingSpaces?.length > 30
                  ? `${removingSpaces.substring(0, 30)}...`
                  : removingSpaces

              let flag = false
              const chkFlag = selChkBoxesFromApi?.find(
                (el) => el.id === item.id,
              )
              if (chkFlag) {
                flag = true
              }

              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getPageNo(index)}</CTableDataCell>
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
                      key={index}
                      data-testid="ch-All-countries"
                      id="all"
                      type="checkbox"
                      name="checkQuestion"
                      checked={flag}
                      onChange={() => {
                        setCycleChecked((prevState) => {
                          return {
                            ...prevState,
                            ...{
                              id: item.id,
                              checkQuestion: true,
                              question: item.question,
                            },
                          }
                        })
                      }}
                      value={cycleChecked as unknown as string}
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
            <strong>{allCycleRecords}</strong>
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
        <>
          <span className="descriptionField">
            <p
              dangerouslySetInnerHTML={{
                __html: questionModal,
              }}
            />
          </span>
        </>
      </OModal>
    </>
  )
}
export default InitiateCycleTable
