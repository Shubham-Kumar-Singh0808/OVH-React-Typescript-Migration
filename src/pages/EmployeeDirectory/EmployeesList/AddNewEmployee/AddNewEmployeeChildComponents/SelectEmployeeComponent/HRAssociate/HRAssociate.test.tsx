import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import HRAssociate from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee HRAssociate Component', () => {
  test('should be able to render HRAssociate without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <HRAssociate
          hrDataList={[]}
          onSelectHRAssociate={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
