import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import AddNewCertificateType from './AddNewCertificateType'
import { ReduxProvider } from '../../../../components/Helper'
import { employeeCertificationsApiConfig } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import stateStore from '../../../../stateStore'

const mockTechnology = {
  id: 1,
  name: 'Java',
}

const url = employeeCertificationsApiConfig.getTechnologies
const server = setupServer(
  rest.get(url, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockTechnology)),
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

const expectComponentToBeRendered = () => {
  expect(screen.getByText('Technology:')).toBeInTheDocument()
  expect(screen.getByText('Certificate:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
}

describe('Add New CertificateType Testing', () => {
  test('should render add new CertificateType form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={0}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should find add and clear buttons in the form', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={0}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should render select element', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={mockTechnology.id}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Technology:')).toBeInTheDocument()
    expect(screen.getByTestId('form-select')).toBeInTheDocument()
  })

  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={0}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Technology' }).selected,
    ).toBe(true)
  })

  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      reduxServices.employeeCertifications.getTechnologies(),
    )
    expect(mockTechnology.name).toHaveLength(4)
  })
})
