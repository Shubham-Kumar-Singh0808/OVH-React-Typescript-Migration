import '@testing-library/jest-dom'
import React from 'react'
import EditPanDetails from './EditPanDetails'
import { render, screen } from '../../../../test/testUtils'

const element = jest.fn()
describe('Edit BankAccount without data', () => {
  beforeEach(() => {
    render(
      <EditPanDetails
        isEditPanData={false}
        setIsEditPanData={element}
        financeId={0}
        editPanData={{
          financeId: 0,
          pfAccountNumber: '',
          panCardAccountNumber: '',
          uaNumber: '',
          employeeId: 0,
          aadharCardNumber: '',
          financeFilePath: null,
          financeFileName: null,
        }}
        onChangeInputHandler={element}
      />,
    )
  })

  test('should render labels', () => {
    expect(screen.getByText('Attachment')).toBeInTheDocument()
  })
})
