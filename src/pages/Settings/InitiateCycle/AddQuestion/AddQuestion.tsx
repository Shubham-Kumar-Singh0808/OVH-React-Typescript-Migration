import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AddQuestionTable from './AddQuestionTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const AddQuestion = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [addQuestion, setAddQuestion] = useState<string>('')
  const [isAddBtnEnabled, setIsAddBtnEnabled] = useState(false)

  useEffect(() => {
    dispatch(reduxServices.initiateCycle.getAllQuestions())
  }, [dispatch])

  const clearData = () => {
    setAddQuestion('')
  }

  useEffect(() => {
    if (addQuestion?.replace(/^\s*/, '')) {
      setIsAddBtnEnabled(true)
    } else {
      setIsAddBtnEnabled(false)
    }
  }, [addQuestion])

  const listSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const PresentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (PresentPage) {
      setCurrentPage(PresentPage)
    }
  }, [PresentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const successToast = (
    <OToast toastMessage="Question Added Successfully" toastColor="success" />
  )

  const addButtonHandler = async () => {
    await dispatch(
      reduxServices.initiateCycle.addQuestion({
        question: addQuestion,
      }),
    )
    setAddQuestion('')
    dispatch(reduxServices.app.actions.addToast(successToast))
    dispatch(reduxServices.initiateCycle.getAllQuestions())
  }
  const backButtonHandler = () => {
    dispatch(reduxServices.initiateCycle.actions.setToggle(''))
    dispatch(reduxServices.initiateCycle.getActiveCycleData())
    dispatch(reduxServices.initiateCycle.getAllQuestions())
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Question List'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="form-label col-sm-2 col-form-label text-end">
            Question :
            <span
              className={
                addQuestion?.replace(/^\s*/, '') ? 'text-white' : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={8}>
            <CFormTextarea
              data-testid="text-area"
              aria-label="textarea"
              className="sh-question"
              id="Name"
              name="question"
              maxLength={300}
              placeholder="Question ?"
              value={addQuestion}
              onChange={(e) => setAddQuestion(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isAddBtnEnabled}
              onClick={addButtonHandler}
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning"
              className="btn-ovh text-white"
              onClick={clearData}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
        <AddQuestionTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}

export default AddQuestion
