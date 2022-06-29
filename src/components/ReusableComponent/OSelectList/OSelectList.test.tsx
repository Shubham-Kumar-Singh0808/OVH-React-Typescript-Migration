import '@testing-library/jest-dom'
import OSelectList from './index'
import { render, screen } from '../../../test/testUtils'
import { Label } from '../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

describe('OSelectList Component', () => {
  test('should be able to render OSelectList component', async () => {
    render(
      <OSelectList
        list={[]}
        setValue={function (value: string): void {
          throw new Error('Function not implemented.')
        }}
        value="Test Value"
        name="Test Name"
        label="Test Label"
        dynamicFormLabelProps={function (
          htmlFor: string,
          className: string,
        ): Label {
          throw new Error('Function not implemented.')
        }}
      />,
    )

    screen.debug()
  })
})
