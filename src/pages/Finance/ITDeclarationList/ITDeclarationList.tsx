import React, { useEffect } from 'react'
import FilterOptions from './FilterOptions'
import ITDeclarationListTable from './ITDeclarationListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ITDeclarationList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const cycles = useTypedSelector(
    reduxServices.itDeclarationList.selectors.cycles,
  )

  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getCycles())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <FilterOptions />
        <ITDeclarationListTable />
      </OCard>
    </>
  )
}

export default ITDeclarationList
