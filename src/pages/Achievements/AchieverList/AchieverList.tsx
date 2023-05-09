import React, { useEffect, useState } from 'react'
import AchieverListTable from './AchieverListTable'
import AchieverListFilterOptions from './AchieverListFilterOptions'
import AchievementTimeline from './AchievementTimeline'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  AchieverListQueryParameters,
  SelectMonthOptions,
} from '../../../types/Achievements/AchieverList/AchieverListTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { AchievementType } from '../../../types/Achievements/commonAchievementTypes'
import { selectAchievementType } from '../AchievementConstants'

const selectMonthConst = 'Select Month'

const getDateSelection = (selectedOpt: string) => {
  if (selectedOpt === SelectMonthOptions.currentMonth) {
    return 'Current Month'
  }
  if (selectedOpt === SelectMonthOptions.lastMonth) {
    return 'Last Month'
  }
  if (selectedOpt === SelectMonthOptions.customDate) {
    return 'custom'
  }
  return undefined
}

const getMonthAndYear = (date: string) => {
  const fullDate = date.split('/')
  return fullDate.filter((_, index) => index !== 1).map(Number)
}

const AchieverList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const achievementTypes = useTypedSelector(
    (state) => state.commonAchievements.achievementTypeList,
  )

  const isLoading = useTypedSelector((state) => state.achieverList.isLoading)

  const achieverListTotalSize = useTypedSelector(
    (state) => state.achieverList.achieverList.size,
  )

  const [currentAchievement, setAchievement] = useState<string>(
    selectAchievementType,
  )

  const [currentSelectedOption, setSelectedOption] =
    useState<string>(selectMonthConst)

  const [showAchievementTimeline, setAchievementTimeline] =
    useState<boolean>(false)

  useEffect(() => {
    dispatch(reduxServices.commonAchievements.getAllAchievementsType())
  }, [])

  const achievementChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAchievement(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }

  const selectedOptionChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedOption(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }

  const [achieverFromDate, setAchieverFromDate] = useState<string>('')
  const [achieverToDate, setAchieverToDate] = useState<string>('')
  const [isViewButtonEnabled, setViewButton] = useState<boolean>(false)

  const pageSizeFromState = useTypedSelector(
    (state) => state.achieverList.pageSize,
  )
  const pageFromState = useTypedSelector(
    (state) => state.achieverList.currentPage,
  )

  const ToggleTimelineAccess = useTypedSelector(
    (state) =>
      state.userAccessToFeatures.userAccessToFeatures?.filter(
        (item) => item.featureId === 235,
      )[0],
  )?.viewaccess

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(achieverListTotalSize, pageSizeFromState, pageFromState)

  const dispatchAchieverList = (options: AchieverListQueryParameters) => {
    dispatch(reduxServices.achieverList.getAllAchieverList(options))
  }

  useEffect(() => {
    dispatchAchieverList({})
  }, [])

  const getStartIndex = (): number => {
    return (currentPage - 1) * pageSize
  }

  const getEndIndex = (): number => {
    return currentPage * pageSize
  }

  const getAchievementTypeId = (): string | undefined => {
    return achievementTypes.list
      .find((item: AchievementType) => item.typeName === currentAchievement)
      ?.id.toString()
  }

  const getNewAchieverList = (startIndex: number, endIndex: number) => {
    const achievementTypeId = getAchievementTypeId()
    const dateSelection = getDateSelection(currentSelectedOption)
    const [fromMonth, fromYear] = getMonthAndYear(achieverFromDate)
    const [toMonth, toYear] = getMonthAndYear(achieverToDate)
    const options: AchieverListQueryParameters = {
      achievementTypeId,
      dateSelection,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      startIndex,
      endIndex,
    }
    dispatch(reduxServices.achieverList.actions.setFilterQueries(options))
    dispatchAchieverList(options)
  }

  useEffect(() => {
    const startIndex = getStartIndex()
    const endIndex = getEndIndex()
    getNewAchieverList(startIndex, endIndex)
  }, [pageSize, currentPage])

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(reduxServices.achieverList.actions.setFilterQueries({}))
    dispatchAchieverList({})
    setSelectedOption(selectMonthConst)
    setAchievement(selectAchievementType)
    setAchieverFromDate('')
    setAchieverToDate('')
  }

  const filterHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getNewAchieverList(0, pageSize)
  }

  const achieverListTableTernary =
    isLoading !== ApiLoadingState.loading ? (
      <AchieverListTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
        setAchievementTimeline={setAchievementTimeline}
        ToggleTimelineAccess={ToggleTimelineAccess}
      />
    ) : (
      <OLoadingSpinner type={LoadingType.PAGE} />
    )

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={
        showAchievementTimeline
          ? 'Achievement History Details'
          : "Achiever's List"
      }
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {showAchievementTimeline ? (
        <AchievementTimeline setAchievementTimeline={setAchievementTimeline} />
      ) : (
        <>
          <AchieverListFilterOptions
            currentSelectedOption={currentSelectedOption}
            selectedOptionChangeHandler={selectedOptionChangeHandler}
            currentAchievement={currentAchievement}
            achievementChangeHandler={achievementChangeHandler}
            achieverFromDate={achieverFromDate}
            setAchieverFromDate={setAchieverFromDate}
            achieverToDate={achieverToDate}
            setAchieverToDate={setAchieverToDate}
            isViewButtonEnabled={isViewButtonEnabled}
            setViewButton={setViewButton}
            clearButtonHandler={clearButtonHandler}
            filterHandler={filterHandler}
          />
          <>{achieverListTableTernary}</>
        </>
      )}
    </OCard>
  )
}

export default AchieverList
