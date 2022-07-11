/* eslint-disable require-await */
/* eslint-disable import/named */
// Todo: remove eslint and fix error
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EmployeeReportees from './EmployeeReportees'
import { employeeReporteesApiConfig } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import stateStore from '../../../stateStore'

const mockReporteesDetails = {
  managerId: 1002,
  managerName: 'Chaitanya Mudunuri',
  reporteeId: 1989,
  reporteeName: 'Finance F',
  allcoationDetails: '',
  mobile: null,
}
const url = employeeReporteesApiConfig.getEmployeeReportees
const server = setupServer(
  rest.get(url, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockReporteesDetails)),
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(
      `Please add request handler for ${req.url.toString()} in your MSW server requests.`,
    )
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' }),
    )
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const history = createMemoryHistory()

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => (
  <Router history={history}>
    <Provider store={reduxStore}>{children}</Provider>
  </Router>
)

describe('Employee Reportees Testing', () => {
  render(
    <ReduxProvider reduxStore={stateStore}>
      <EmployeeReportees />
    </ReduxProvider>,
  )
  test('should render the "Reportees" header', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Manager Reportees' })
    expect(pageTitle).toBeTruthy()
  })

  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      reduxServices.employeeReportees.getEmployeeReportees(),
    )
    expect(mockReporteesDetails.reporteeName).toHaveLength(9)
  })

  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeReportees />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })

  test('should render Reportees tab component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeReportees />
      </ReduxProvider>,
    )
    expect(screen.getByText('Reportee')).toBeInTheDocument()
  })
})
