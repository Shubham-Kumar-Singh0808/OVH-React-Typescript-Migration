import React, { useEffect, useState } from 'react'
import FilterOptions from './FilterOptions'
import ITDeclarationListTable from './ITDeclarationListTable'
import { initialITForm } from './ITDeclarationListHelpers'
import UpdateITDeclarationForm from './UpdateITDeclarationForm/UpdateITDeclarationForm'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import {
  ITDeclarationFormToggleType,
  ITForm,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import ITDeclarationFormViewTable from '../ITDeclarationListFormView/ITDeclarationFormViewTable'

const ITDeclarationList = (): JSX.Element => {
  const [investmentCycle, setInvestmentCycle] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>('')
  const [viewDeclarationForm, setViewDeclarationForm] =
    useState<ITForm>(initialITForm)
  const itDeclarationListPath = '/itDeclarationList'
  const dispatch = useAppDispatch()
  const toggle = useTypedSelector(
    reduxServices.itDeclarationList.selectors.toggle,
  )
  const isLoading = useTypedSelector(
    reduxServices.itDeclarationList.selectors.isLoading,
  )
  const listSize = useTypedSelector((state) => state.itDeclarationList.listSize)

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

  // in react as the state is saved, when coming back to this page, home page must be rendered
  useEffect(() => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.HomePage,
      ),
    )
    window.scroll(0, 0)
  }, [])

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

  const viewDeclarationFormButtonHandler = (viewForm: ITForm): void => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.ViewForm,
      ),
    )
    setViewDeclarationForm(viewForm)
  }

  return (
    <>
      {toggle === ITDeclarationFormToggleType.HomePage && (
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
      {toggle === ITDeclarationFormToggleType.updateITDeclarationForm && (
        <UpdateITDeclarationForm />
      )}
      {toggle === ITDeclarationFormToggleType.ViewForm && (
        <ITDeclarationFormViewTable viewDeclarationForm={viewDeclarationForm} />
      )}
    </>
  )
}

export default ITDeclarationList
