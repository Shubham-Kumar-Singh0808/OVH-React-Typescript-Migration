import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import SQAAuditReportFilterOptions from './SQAAuditReportFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../test/testUtils'
import { mockSQAAuditReport } from '../../test/data/sqaAuditReportData'
import { mockUserAccessToFeaturesData } from '../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SQAAuditReportFilterOptions
      selectDate={'Custom'}
      setSelectDate={jest.fn()}
      fromDate={''}
      setFromDate={jest.fn()}
      toDate={''}
      setToDate={jest.fn()}
    />
    ,
  </div>
)

describe('Create New Ticket Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        sqaAuditReport: {
          getSQAAuditReport: mockSQAAuditReport,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const selectDate = screen.getByTestId('selectDate')
    userEvent.selectOptions(selectDate, ['Custom'])
    expect(selectDate).toHaveValue('Custom')

    const auditStatus = screen.getByTestId('status')
    userEvent.selectOptions(auditStatus, ['open'])
    expect(auditStatus).toHaveValue('open')

    const rescheduleStatus = screen.getByTestId('rescheduleStatus')
    userEvent.selectOptions(rescheduleStatus, ['Yes'])
    expect(rescheduleStatus).toHaveValue('Yes')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '10 Jan, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')

    const viewBtnElement = screen.getByRole('button', { name: 'View' })
    expect(viewBtnElement).toBeDisabled()
    userEvent.click(viewBtnElement)
    userEvent.click(screen.getByTestId('clear-btn'))
    userEvent.selectOptions(selectDate, [''])
    userEvent.selectOptions(auditStatus, [''])
    userEvent.selectOptions(rescheduleStatus, [''])
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
  })
})
