import React from 'react'
import '@testing-library/jest-dom'
import TableActions from './TableActions'
import { fireEvent, render, screen } from '../../../../test/testUtils'

const mockEditCertBtn = jest.fn()

describe('Table Actions Component testing', () => {
  test('should render actions without crashing', () => {
    render(
      <TableActions
        certificateItemId={409}
        isViewingAnotherEmployee={false}
        editCertificateButtonHandler={mockEditCertBtn}
        setCertificateId={jest.fn()}
        setIsDeleteModalVisible={jest.fn()}
        certificateId={0}
        isDeleteModalVisible={true}
      />,
    )

    const editBtn = screen.getByTestId('edotCertBtn')
    expect(editBtn).toBeTruthy()
    fireEvent.click(editBtn)

    const alerBtn = screen.getByTestId('showAlertBtn')
    expect(alerBtn).toBeTruthy()
    fireEvent.click(alerBtn)

    expect(
      screen.getByText('Do you really want to delete this ?'),
    ).toBeInTheDocument()

    const confrmBtn = screen.getByTestId('modalConfirmBtn')
    expect(editBtn).toBeTruthy()
    fireEvent.click(confrmBtn)
  })
})
