import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { CreditCardList } from '../../../types/ExpenseManagement/CreditCardList/creditCardListTypes'
import { TextDanger } from '../../../constant/ClassName'
import OToast from '../../../components/ReusableComponent/OToast'
import OModal from '../../../components/ReusableComponent/OModal'

const CreditCardListTable = (): JSX.Element => {
  const initialEditCreditCardDetails = {} as CreditCardList
  const [editCreditCardDetails, setEditCreditCardDetails] = useState(
    initialEditCreditCardDetails,
  )
  const [isEditCreditCardDetails, setIsEditCreditCardDetails] =
    useState<boolean>(false)
  const [isDeleteCreditCardModalVisible, setIsDeleteCreditCardModalVisible] =
    useState(false)
  const [deleteCreditCardId, setDeleteCreditCardId] = useState(0)
  const [isEditCreditCardButtonEnabled, setIsEditCreditCardButtonEnabled] =
    useState(false)
  const [creditCardName, setCreditCardName] = useState<string>('')
  const [isEditCreditCardExist, setIsEditCreditCardExist] = useState('')
  // Dispatch variable to dispatches the API's
  const dispatch = useAppDispatch()

  //Selectors in Slice
  const creditCardListItems = useTypedSelector(
    reduxServices.creditCardList.selectors.creditCards,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )

  const editCreditCardExist = (name: string) => {
    return creditCardListItems?.find((creditCardNumber) => {
      return creditCardNumber.cardNumber.toLowerCase() === name.toLowerCase()
    })
  }
  const handleEditCreditCardHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'cardName') {
      const cardNameValue = value.replace(/[^a-zA-Z\s]$/gi, '')
      setEditCreditCardDetails((prevState) => {
        return { ...prevState, ...{ [name]: cardNameValue } }
      })
    } else if (name === 'cardNumber') {
      const cardNumberValue = value.replace(/\D/g, '')
      setEditCreditCardDetails((prevState) => {
        return { ...prevState, ...{ [name]: cardNumberValue } }
      })
    } else {
      setEditCreditCardDetails((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
    if (editCreditCardExist(value.trim())) {
      setIsEditCreditCardExist(value.trim())
    } else {
      setIsEditCreditCardExist('')
    }
  }

  // Button Click event handlers
  const editCreditCardButtonHandler = (
    creditCardDetailsItem: CreditCardList,
  ): void => {
    dispatch(
      reduxServices.creditCardList.editCreditCardDetails(
        creditCardDetailsItem?.cardId,
      ),
    )
    setIsEditCreditCardDetails(true)
    setDeleteCreditCardId(creditCardDetailsItem.cardId)
    setEditCreditCardDetails(creditCardDetailsItem)
  }
  const saveCreditCardButtonHandler = async () => {
    const saveCreditCardResultAction = await dispatch(
      reduxServices.creditCardList.updateCreditCardList(editCreditCardDetails),
    )
    if (
      reduxServices.creditCardList.updateCreditCardList.fulfilled.match(
        saveCreditCardResultAction,
      )
    ) {
      dispatch(reduxServices.creditCardList.getCreditCardsList())
      setIsEditCreditCardDetails(false)
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Card Details updated successfully"
          />,
        ),
      )
    }
  }

  const onDeleteCreditCardBtnClick = (
    deleteCreditCardId: number,
    creditCardName: string,
  ) => {
    setIsDeleteCreditCardModalVisible(true)
    setCreditCardName(creditCardName)
    setDeleteCreditCardId(deleteCreditCardId)
  }
  const handleConfirmDeleteCreditCard = async () => {
    setIsDeleteCreditCardModalVisible(false)
    const deleteCreditCardResultAction = await dispatch(
      reduxServices.creditCardList.deleteCreditCardList(deleteCreditCardId),
    )
    if (
      reduxServices.creditCardList.deleteCreditCardList.fulfilled.match(
        deleteCreditCardResultAction,
      )
    ) {
      dispatch(reduxServices.creditCardList.getCreditCardsList())
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Card deleted successfully"
          />,
        ),
      )
    }
  }

  const cancelCreditCardButtonHandler = () => {
    setIsEditCreditCardDetails(false)
  }

  useEffect(() => {
    if (
      editCreditCardDetails?.cardName?.replace(/^\s*/, '') &&
      editCreditCardDetails?.cardNumber
    ) {
      setIsEditCreditCardButtonEnabled(true)
    } else {
      setIsEditCreditCardButtonEnabled(false)
    }
  }, [editCreditCardDetails.cardName, editCreditCardDetails.cardNumber])

  useEffect(() => {
    dispatch(reduxServices.creditCardList.getCreditCardsList())
  }, [dispatch])

  return (
    <>
      <CTable className="mt-4 mb-4" align="middle">
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
                  {/* implementing edit & delete */}
                  {isEditCreditCardDetails &&
                  creditCardItems.cardId === deleteCreditCardId ? (
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormInput
                          data-testid={`creditCardName${index}`}
                          className="sm"
                          type="text"
                          id="name"
                          name="cardName"
                          value={editCreditCardDetails?.cardName}
                          onChange={handleEditCreditCardHandler}
                        />
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell className="ng-binding">
                      {creditCardItems.cardName}
                    </CTableDataCell>
                  )}
                  {isEditCreditCardDetails &&
                  creditCardItems.cardId === deleteCreditCardId ? (
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormInput
                          data-testid={`creditCardNumber${index}`}
                          className="sm"
                          type="text"
                          id="name"
                          name="cardNumber"
                          value={editCreditCardDetails?.cardNumber}
                          onChange={handleEditCreditCardHandler}
                          maxLength={16}
                        />
                        {isEditCreditCardExist && (
                          <span
                            className={TextDanger}
                            data-testid="creditCardAlreadyExist"
                          >
                            <b>Card number already exists</b>
                          </span>
                        )}
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell className="ng-binding">
                      {`XXXX-XXXX-XXXX-${creditCardItems.cardNumber.substring(
                        12,
                      )}`}
                    </CTableDataCell>
                  )}
                  <CTableDataCell scope="row">
                    {isEditCreditCardDetails &&
                    creditCardItems.cardId === deleteCreditCardId ? (
                      <>
                        <CTooltip content="Save">
                          <CButton
                            color="success"
                            data-testid={`save-credit-card-btn${index}`}
                            className="btn-ovh me-1"
                            onClick={saveCreditCardButtonHandler}
                            disabled={
                              isEditCreditCardButtonEnabled
                                ? isEditCreditCardButtonEnabled &&
                                  isEditCreditCardExist.length > 0
                                : !isEditCreditCardButtonEnabled
                            }
                          >
                            <i
                              className="fa fa-floppy-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Cancel">
                          <CButton
                            data-testid={`cancel-credit-card-btn${index}`}
                            color="warning"
                            className="btn-ovh me-1"
                            onClick={cancelCreditCardButtonHandler}
                          >
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      </>
                    ) : (
                      <>
                        {userAccess?.updateaccess && (
                          <CTooltip content="Edit">
                            <CButton
                              data-testid={`btn-creditCardEdit${index}`}
                              color="info btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() => {
                                editCreditCardButtonHandler(creditCardItems)
                              }}
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </CButton>
                          </CTooltip>
                        )}
                        {userAccess?.deleteaccess && (
                          <CTooltip content="Delete">
                            <CButton
                              data-testid={`btn-creditCardDelete${index}`}
                              color="danger btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() =>
                                onDeleteCreditCardBtnClick(
                                  creditCardItems.cardId,
                                  creditCardItems.cardName,
                                )
                              }
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        )}
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <OModal
        alignment="center"
        visible={isDeleteCreditCardModalVisible}
        setVisible={setIsDeleteCreditCardModalVisible}
        modalTitle="Delete Credit Card"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteCreditCard}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <strong> {creditCardName} </strong>
          Card?
        </>
      </OModal>
    </>
  )
}

export default CreditCardListTable
