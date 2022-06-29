import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import JoinDate from '.'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee JoinDate Component', () => {
  test('should be able to render JoinDate without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <JoinDate
          onDateChangeHandler={jest.fn()}
          dateValue={new Date()}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
