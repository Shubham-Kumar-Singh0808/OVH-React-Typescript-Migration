import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketConfigurationOptions from './TicketConfigurationOptions'
import SubCategoryListTable from './SubCategoryListTable'
import TicketHistoryDetails from './TicketHistory/TicketHistoryDetails'
import AddNewSubCategory from './AddSubCategory/AddNewSubCategory'
import TicketCategoryList from './CategoryList/TicketCategoryList'
import EditSubCategory from './EditSubCategory/EditSubCategory'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { TicketConfigurationList } from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const TicketConfiguration = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const ticketConfigurationSubCategory =
    useParams<{ subCategoryList: string }>()
  const [filterByDepartment, setFilterByDepartment] = useState<
    number | string
  >()
  const [filterByCategory, setFilterByCategory] = useState<number | string>()
  const [filterBySubCategory, setFilterBySubCategory] = useState<
    number | string
  >()
  const [isTableView, setIsTableView] = useState(false)

  const [editSubCategory, setEditSubCategory] =
    useState<TicketConfigurationList>({
      subCategoryId: 0,
      subCategoryName: '',
      estimatedTime: '',
      workFlow: false,
      categoryId: 0,
      categoryName: '',
      departmentName: '',
      departmentId: 0,
      levelOfHierarchy: 0,
    })

  const subCategoryListSize = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.listSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.isLoading,
  )

  const toggle = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.toggle,
  )
  useEffect(() => {
    if (ticketConfigurationSubCategory) {
      dispatch(
        dispatch(reduxServices.ticketConfiguration.actions.setToggle('')),
      )
    }
  }, [ticketConfigurationSubCategory])
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(subCategoryListSize, 20)

  const editSubCategoryButtonHandler = (
    editSubCategoryData: TicketConfigurationList,
  ): void => {
    dispatch(
      reduxServices.ticketConfiguration.actions.setToggle('editSubCategory'),
    )
    setEditSubCategory({
      subCategoryId: editSubCategoryData.subCategoryId,
      subCategoryName: editSubCategoryData.subCategoryName,
      estimatedTime: editSubCategoryData.estimatedTime,
      workFlow: editSubCategoryData.workFlow,
      categoryId: editSubCategoryData.categoryId,
      categoryName: editSubCategoryData.categoryName,
      departmentName: editSubCategoryData.departmentName,
      departmentId: editSubCategoryData.departmentId,
      levelOfHierarchy: editSubCategoryData.levelOfHierarchy,
    })
  }

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Sub-Category List"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <TicketConfigurationOptions
              setFilterByDepartment={setFilterByDepartment}
              setFilterByCategory={setFilterByCategory}
              setFilterBySubCategory={setFilterBySubCategory}
              setIsTableView={setIsTableView}
            />
            {isLoading !== ApiLoadingState.loading ? (
              <SubCategoryListTable
                paginationRange={paginationRange}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
                filterByDepartment={filterByDepartment as string}
                filterByCategory={filterByCategory as string}
                filterBySubCategory={filterBySubCategory as string}
                isTableView={isTableView}
                editSubCategoryButtonHandler={editSubCategoryButtonHandler}
              />
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </OCard>
        </>
      )}
      {toggle === 'ticketHistory' && <TicketHistoryDetails />}
      {toggle === 'addSubCategory' && <AddNewSubCategory />}
      {toggle === 'addCategory' && <TicketCategoryList />}
      {toggle === 'editSubCategory' && (
        <EditSubCategory editSubCategory={editSubCategory} />
      )}
    </>
  )
}

export default TicketConfiguration
