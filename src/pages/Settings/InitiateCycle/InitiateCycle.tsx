import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import InitiateCycleTable from './InitiateCycleTable'
import AddQuestion from './AddQuestion/AddQuestion'
import AddInitiateCycle from './AddCycle/AddInitiateCycle'
import EditInitiateCycle from './EditCycle/EditInitiateCycle'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { TotalResponse } from '../../../types/Settings/InitiateCycle/initiateCycleTypes'

const InitiateCycle = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const activeCycle = useTypedSelector(
    reduxServices.initiateCycle.selectors.activeCycleData,
  )

  const endIndexPage = useTypedSelector(
    reduxServices.initiateCycle.selectors.pageFromState,
  )

  const startIndexPage = useTypedSelector(
    reduxServices.initiateCycle.selectors.pageSizeFromState,
  )

  useEffect(() => {
    dispatch(reduxServices.initiateCycle.getActiveCycleData())
    dispatch(reduxServices.initiateCycle.getAllCycles())
    dispatch(reduxServices.initiateCycle.getAllQuestions())
    dispatch(reduxServices.initiateCycle.actions.setCurrentPage(1))
    dispatch(reduxServices.initiateCycle.actions.setPageSize(20))
  }, [dispatch])

  const listSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const ExistingPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (ExistingPage) {
      setCurrentPage(ExistingPage)
    }
  }, [ExistingPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, startIndexPage, endIndexPage)

  const successToast = (
    <OToast toastMessage="Cycle initiated successfully" toastColor="success" />
  )

  const failedToastMessage = (
    <OToast
      toastMessage="Add at least one question to Initiate Cycle"
      toastColor="danger"
    />
  )
  const addBtnHandler = async () => {
    const prepareObject = {
      nominationCycleDto: {
        activateFlag: activeCycle.nominationCycleDto.activateFlag,
        cycleName: activeCycle.nominationCycleDto.cycleName,
        endDate: activeCycle.nominationCycleDto.endDate,
        fromMonth: activeCycle.nominationCycleDto.fromMonth,
        id: activeCycle.nominationCycleDto.id,
        toMonth: activeCycle.nominationCycleDto.toMonth,
      },
      nominationQuestionDto: [{}],
    } as unknown as TotalResponse
    const initiateCycleResultAction = await dispatch(
      reduxServices.initiateCycle.initiateCycle(prepareObject),
    )
    if (
      reduxServices.initiateCycle.initiateCycle.fulfilled.match(
        initiateCycleResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.initiateCycle.initiateCycle.rejected.match(
        initiateCycleResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(failedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const toggle = useTypedSelector(reduxServices.initiateCycle.selectors.toggle)

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title={'Initiate Cycle'}
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                onClick={() =>
                  dispatch(
                    reduxServices.initiateCycle.actions.setToggle('addCycle'),
                  )
                }
              >
                <i className="fa fa-plus me-1"></i>
                Add Cycle
              </CButton>
              &nbsp;
              <CButton
                color="info"
                className="text-white btn-ovh"
                size="sm"
                onClick={() =>
                  dispatch(
                    reduxServices.initiateCycle.actions.setToggle(
                      'addQuestion',
                    ),
                  )
                }
              >
                Add Question
              </CButton>
            </CCol>
          </CRow>
          <CForm>
            <CRow className="mt-3 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Cycle Name:
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  className="form-control-not-allowed"
                  data-testid="cycleName"
                  type="text"
                  id="Name"
                  size="sm"
                  name="cycleName"
                  value={activeCycle?.nominationCycleDto?.cycleName}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mt-3 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                From Month :
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  className="form-control-not-allowed"
                  data-testid="fromMonth"
                  type="text"
                  id="fromMonth"
                  size="sm"
                  name="fromMonth"
                  disabled
                  value={activeCycle?.nominationCycleDto?.fromMonth}
                />
              </CCol>
            </CRow>
            <CRow className="mt-3 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                To Month :
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  className="form-control-not-allowed"
                  data-testid="toMonth"
                  type="text"
                  id="toMonth"
                  size="sm"
                  name="toMonth"
                  disabled
                  value={activeCycle?.nominationCycleDto?.toMonth}
                />
              </CCol>
            </CRow>
          </CForm>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={addBtnHandler}
              >
                Add
              </CButton>
            </CCol>
          </CRow>
          <InitiateCycleTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </OCard>
      )}
      {toggle === 'addQuestion' && <AddQuestion />}
      {toggle === 'addCycle' && <AddInitiateCycle />}
      {toggle === 'editCycle' && <EditInitiateCycle />}
    </>
  )
}

export default InitiateCycle
