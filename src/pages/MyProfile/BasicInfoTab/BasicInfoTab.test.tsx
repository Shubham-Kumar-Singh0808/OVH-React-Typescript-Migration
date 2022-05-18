import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import BasicInfoTab from './BasicInfoTab'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { employeeGeneralInformationApi } from '../../../middleware/api/apiList'
import { getEmployeeGeneralInformation } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { mockGeneralInformationData } from '../../../test/data/generalInformationData'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const url = employeeGeneralInformationApi.getLoggedInEmployeeData
const server = setupServer(
  rest.get(url, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockGeneralInformationData)),
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

describe('Basic Info Tab Testing', () => {
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(getEmployeeGeneralInformation('1978'))
  })
  test('should render basic info tab component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTab />
      </ReduxProvider>,
    )
    await stateStore.dispatch(getEmployeeGeneralInformation('1978'))
    expect(screen.getByText('Employee ID:')).toBeInTheDocument()
    expect(screen.getByText('INDIA')).toBeInTheDocument()
  })
})
