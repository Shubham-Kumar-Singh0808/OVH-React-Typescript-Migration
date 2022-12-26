import { CTableRow, CTableDataCell } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import InvestmentCheckListDetailsTable from './InvestmentCheckListDetailsTable'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { Section } from '../../../types/Finance/InvestmentCheckList/investmentCheckListTypes'

const InvestmentCheckListEntry = (props: {
  id: number
  section: Section
  selectedSectionId: number
  setSelectedSectionId: (value: number) => void
  isIconVisible: boolean
  setIsIconVisible: (value: boolean) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    props.setSelectedSectionId(id as number)
    dispatch(reduxServices.investmentCheckList.getInvestments(id as number))
    props.setIsIconVisible(true)
  }

  useEffect(() => {
    if (props.selectedSectionId === 1) {
      props.setIsIconVisible(true)
      handleExpandRow(props.selectedSectionId)
    }
  }, [props.selectedSectionId])

  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          {props.isIconVisible && props.selectedSectionId === props.id ? (
            <i
              data-testid="ic-expandIcon"
              className="fa fa-minus-circle cursor-pointer"
              onClick={() => props.setIsIconVisible(false)}
            />
          ) : (
            <i
              data-testid="ic-collapseIcon"
              className="fa fa-plus-circle cursor-pointer"
              onClick={() => handleExpandRow(props.id)}
            />
          )}
        </CTableDataCell>
        <CTableDataCell scope="row">{props.section.sectionName}</CTableDataCell>
        <CTableDataCell scope="row">
          {props.section.sectionLimit?.toLocaleString('en-IN')}
        </CTableDataCell>
      </CTableRow>
      {props.isIconVisible && props.selectedSectionId === props.id ? (
        <CTableDataCell colSpan={10}>
          <InvestmentCheckListDetailsTable />
        </CTableDataCell>
      ) : (
        <></>
      )}
    </>
  )
}

export default InvestmentCheckListEntry
