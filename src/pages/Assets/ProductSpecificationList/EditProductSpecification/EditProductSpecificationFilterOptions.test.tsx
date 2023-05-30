import React from 'react'
import EditProductSpecification from './EditProductSpecification'
import '@testing-library/jest-dom'
import { render, screen } from '../../../../test/testUtils'
// eslint-disable-next-line import/order
import userEvent from '@testing-library/user-event'

const mockSetTogglePage = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EditProductSpecification
      editProductSpecification={{
        id: 0,
        productId: 0,
        productName: '',
        manufacturerId: 0,
        manufacturerName: '',
        assetTypeId: 0,
        assetType: '',
        productSpecification: '',
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: '',
        departmentId: null,
        departmentName: null,
        roleId: null,
      }}
      setEditProductSpecification={mockSetTogglePage}
      setToggle={jest.fn()}
    />
    ,
  </div>
)
describe('EditProductSpecification FilterOptions Component Testing with data', () => {
  beforeEach(() => {
    render(toRender)
  })
})
test('should render fields', () => {
  const AssetTypeDropdown = screen.getByTestId('form-select1')
  userEvent.selectOptions(AssetTypeDropdown, [''])
  expect(AssetTypeDropdown).toBeInTheDocument()
})
