import React from 'react'
import '@testing-library/jest-dom'
import OSelectList from './index'
import { render, screen } from '../../../test/testUtils'

describe('OSelectList Component', () => {
  test('should be able to render OSelectList component', () => {
    render(
      <OSelectList
        list={[]}
        setValue={jest.fn()}
        value="Test Value"
        name="Test Name"
        label="Test Label"
        dynamicFormLabelProps={jest.fn()}
      />,
    )

    screen.debug()
  })
})
