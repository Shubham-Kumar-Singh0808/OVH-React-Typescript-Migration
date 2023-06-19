import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const CreditCardListTable = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const creditCardListItems = useTypedSelector(
    reduxServices.creditCardList.selectors.creditCards,
  )

  useEffect(() => {
    dispatch(reduxServices.creditCardList.getCreditCardsList())
  }, [dispatch])

  return (
    <>
      <CTable className="mt-4 mb-4">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Card Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Card Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {creditCardListItems?.length > 0 &&
            creditCardListItems?.map((creditCardItems, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {creditCardItems.cardName}
                  </CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    XXXX-XXXX-XXXX-{creditCardItems.cardNumber.substring(12)}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default CreditCardListTable
