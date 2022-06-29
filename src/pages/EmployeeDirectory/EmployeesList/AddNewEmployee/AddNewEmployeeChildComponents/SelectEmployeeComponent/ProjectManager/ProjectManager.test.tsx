import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ProjectManager from '.'
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

describe('Add Employee ProjectManager Component', () => {
  test('should be able to render ProjectManager without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ProjectManager
          managersList={[]}
          onSelectManager={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
