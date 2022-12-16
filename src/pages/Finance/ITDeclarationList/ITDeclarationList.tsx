import React, { useEffect, useState } from 'react'
import FilterOptions from './FilterOptions'
import ITDeclarationListTable from './ITDeclarationListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { ITForm } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import ITDeclarationFormViewTable from '../ITDeclarationListFormView/ITDeclarationFormViewTable'

const ITDeclarationList = (): JSX.Element => {
  const [investmentCycle, setInvestmentCycle] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>('')
  const [viewDeclarationForm, setViewDeclarationForm] = useState<ITForm[]>([
    {
      cycleId: 0,
      designation: '',
      employeeId: 0,
      employeeName: '',
      filePath: null,
      formSectionsDTOs: [],
      fromDate: '',
      grandTotal: 0,
      isAgree: null,
      itDeclarationFormId: 0,
      organisationName: '',
      panNumber: '',
      toDate: '',
    },
  ])
  const itDeclarationListPath = '/itDeclarationList'
  const dispatch = useAppDispatch()
  const toggle = useTypedSelector(
    reduxServices.itDeclarationList.selectors.toggle,
  )
  const isLoading = useTypedSelector(
    reduxServices.itDeclarationList.selectors.isLoading,
  )
  const listSize = useTypedSelector(
    reduxServices.itDeclarationList.selectors.listSize,
  )

  const searchEmployee = useTypedSelector(
    reduxServices.itDeclarationList.selectors.searchEmployee,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getCycles())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      reduxServices.itDeclarationList.getITDeclarationForm({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        investmentCycle,
        employeeName: searchEmployee,
      }),
    )
  }, [currentPage, dispatch, pageSize, searchEmployee, investmentCycle])

  useEffect(() => {
    if (window.location.pathname !== itDeclarationListPath) {
      setSearchInput('')
      dispatch(reduxServices.itDeclarationList.actions.clearEmployees())
    }
  }, [window.location.pathname])

  const viewDeclarationFormButtonHandler = (viewForm: ITForm[]): void => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        'viewITDeclarationForm',
      ),
    )
    console.log(viewForm)
    setViewDeclarationForm([
      {
        cycleId: viewForm[0].cycleId,
        designation: viewForm[0].designation,
        employeeId: viewForm[0].employeeId,
        employeeName: viewForm[0].employeeName,
        filePath: viewForm[0].filePath,
        formSectionsDTOs: viewForm[0].formSectionsDTOs,
        fromDate: viewForm[0].fromDate,
        grandTotal: viewForm[0].grandTotal,
        isAgree: viewForm[0].isAgree,
        itDeclarationFormId: viewForm[0].itDeclarationFormId,
        organisationName: viewForm[0].organisationName,
        panNumber: viewForm[0].panNumber,
        toDate: viewForm[0].toDate,
      },
    ])
  }

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="IT Declaration List"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <FilterOptions
              investmentCycle={investmentCycle}
              setInvestmentCycle={setInvestmentCycle}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
            {isLoading !== ApiLoadingState.loading ? (
              <ITDeclarationListTable
                paginationRange={paginationRange}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
                viewDeclarationFormButtonHandler={
                  viewDeclarationFormButtonHandler
                }
              />
            ) : (
              <>
                <OLoadingSpinner type={LoadingType.PAGE} />
              </>
            )}
          </OCard>
        </>
      )}
      {toggle === 'editSections' && (
        <ITDeclarationFormViewTable viewDeclarationForm={viewDeclarationForm} />
      )}
    </>
  )
}

export default ITDeclarationList
