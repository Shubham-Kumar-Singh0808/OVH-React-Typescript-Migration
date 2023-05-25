import React from 'react'
import EditProductSpecification from './EditProductSpecification'
import { render, screen } from '../../../test/testUtils'
import '@testing-library/jest-dom'

const mockSetTogglePage = jest.fn()
const mockHandleAdd = jest.fn()

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
