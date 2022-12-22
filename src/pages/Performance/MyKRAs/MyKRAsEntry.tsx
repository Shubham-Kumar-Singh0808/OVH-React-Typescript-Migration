import { CTableRow, CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import KRAsDetailsTable from './KRAsDetailsTable'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { KRAs } from '../../../types/Performance/MyKRAs/myKRAsTypes'

const MyKRAsEntry = (props: {
  id: number
  employeeKRA: KRAs
  selectedPersonId: number
  setSelectedPersonId: (value: number) => void
  isIconVisible: boolean
  setIsIconVisible: (value: boolean) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    props.setSelectedPersonId(id as number)
    dispatch(reduxServices.myKRAs.getKPIsForIndividualEmployee(id as number))
    props.setIsIconVisible(true)
  }

  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          {props.isIconVisible && props.selectedPersonId === props.id ? (
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
          {props.employeeKRA.description !== null
            ? props.employeeKRA.description
            : 'N/A'}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {`${props.employeeKRA.designationKraPercentage}%`}
        </CTableDataCell>
        <CTableDataCell scope="row">{props.employeeKRA.count}</CTableDataCell>
      </CTableRow>
      {props.isIconVisible && props.selectedPersonId === props.id ? (
        <CTableDataCell colSpan={10}>
          <KRAsDetailsTable />
        </CTableDataCell>
      ) : (
        <></>
      )}
    </>
  )
}

export default MyKRAsEntry
