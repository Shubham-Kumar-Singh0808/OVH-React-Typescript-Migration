import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Experience from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee Experience Component', () => {
  test('should be able to render Experience without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <Experience
          onExperienceHandler={jest.fn()}
          experienceValue={0}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
