import { CTableRow, CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import ReviewFormDetailsTable from './ReviewFormDetailsTable'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { KPI, KRA } from '../../../../types/Performance/MyReview/myReviewTypes'

const ReviewFormEntry = (props: {
  id: number
  selectedEmployeeId: number
  employeeKRA: KRA
  setSelectedEmployeeId: (value: number) => void
  isIconVisible: boolean
  setIsIconVisible: (value: boolean) => void
  KPIDetails: KPI[] | undefined
  setKPIDetails: React.Dispatch<React.SetStateAction<KPI[] | undefined>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    props.setSelectedEmployeeId(id as number)
    dispatch(reduxServices.myKRAs.getKPIsForIndividualEmployee(id as number))
    props.setIsIconVisible(true)
  }

  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          {props.isIconVisible && props.selectedEmployeeId === props.id ? (
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
        <CTableDataCell scope="row">{props.employeeKRA.name}</CTableDataCell>
        <CTableDataCell scope="row">
          {`${props.employeeKRA.designationKraPercentage}%`}
        </CTableDataCell>
        <CTableDataCell scope="row">{props.employeeKRA.count}</CTableDataCell>
      </CTableRow>
      {props.isIconVisible && props.selectedEmployeeId === props.id ? (
        <CTableDataCell colSpan={10}>
          <ReviewFormDetailsTable
            kpiData={props.employeeKRA.kpis}
            KPIDetails={props.KPIDetails as KPI[]}
            setKPIDetails={props.setKPIDetails}
            id={props.employeeKRA.id}
          />
        </CTableDataCell>
      ) : (
        <></>
      )}
    </>
  )
}

export default ReviewFormEntry
