import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CertificatesFilterOptions from './CertificatesFilterOptions'
import stateStore from '../../../stateStore'
import { ReduxProvider } from '../../../components/Helper'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import {
  mockCertificateByTechnology,
  mockTechnologies,
} from '../../../test/data/employeeTechnologiesData'
import { mockCertificateList } from '../../../test/data/certificateListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const searchInputTestId = 'multi-search-btn'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root">
      <CertificatesFilterOptions
        selectTechnology={'.Net'}
        setSelectTechnology={jest.fn()}
        setFilterByTechnology={jest.fn()}
        setFilterByCertificate={jest.fn()}
        setMultiSearchValue={jest.fn()}
        filterByTechnology={'.Net'}
        filterByCertificate={'MVC Certificate'}
        multiSearchValue={'Java'}
        setIsAccordionItemShow={jest.fn}
        setCurrentPage={jest.fn()}
        setPageSize={jest.fn()}
      />
    </div>
  </div>
)
describe('Certificates Filter Options Component Testing', () => {
  test('should render certificates filter options component with out crashing', () => {
    render(toRender, {
      preloadedState: {
        employeeCertificates: {
          getAllTechnologies: mockTechnologies,
          typeOfCertificate: mockCertificateByTechnology,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('view button should disable if the technology select box does not have value', () => {
    render(
      <div>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root">
          <ReduxProvider reduxStore={stateStore}>
            <CertificatesFilterOptions
              selectTechnology={''}
              setSelectTechnology={jest.fn()}
              setFilterByTechnology={jest.fn()}
              setFilterByCertificate={jest.fn()}
              setMultiSearchValue={jest.fn()}
              filterByTechnology={''}
              filterByCertificate={''}
              multiSearchValue={''}
              setIsAccordionItemShow={jest.fn}
              setCurrentPage={jest.fn()}
              setPageSize={jest.fn()}
            />
          </ReduxProvider>
        </div>
      </div>,
    )
    expect(screen.getByRole('button', { name: 'View' })).not.toBeEnabled()
  })
  test('view button should enable only if the technology select box has a value', () => {
    render(
      <div>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root">
          <ReduxProvider reduxStore={stateStore}>
            <CertificatesFilterOptions
              selectTechnology={'.Net'}
              setSelectTechnology={jest.fn()}
              setFilterByTechnology={jest.fn()}
              setFilterByCertificate={jest.fn()}
              setMultiSearchValue={jest.fn()}
              filterByTechnology={'.Net'}
              filterByCertificate={'.Net'}
              multiSearchValue={''}
              setIsAccordionItemShow={jest.fn}
              setCurrentPage={jest.fn()}
              setPageSize={jest.fn()}
            />
          </ReduxProvider>
        </div>
      </div>,
    )
    expect(screen.getByRole('button', { name: 'View' })).toBeEnabled()
  })
  test('multi search button should enable only if we enter the value', () => {
    render(
      <div>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root">
          <ReduxProvider reduxStore={stateStore}>
            <CertificatesFilterOptions
              selectTechnology={'.Net'}
              setSelectTechnology={jest.fn()}
              setFilterByTechnology={jest.fn()}
              setFilterByCertificate={jest.fn()}
              setMultiSearchValue={jest.fn()}
              filterByTechnology={'.Net'}
              filterByCertificate={'.Net'}
              multiSearchValue={''}
              setIsAccordionItemShow={jest.fn}
              setCurrentPage={jest.fn()}
              setPageSize={jest.fn()}
            />
          </ReduxProvider>
        </div>
      </div>,
    )
    expect(screen.getByTestId(searchInputTestId)).not.toBeEnabled()
    userEvent.type(screen.getByPlaceholderText('Multiple Search'), 'Java')
    expect(screen.getByTestId(searchInputTestId)).toBeEnabled()
  })
})

const mockSetSelectTechnology = jest.fn()
const mockSetFilterByTechnology = jest.fn()
const mockSetFilterByCertificate = jest.fn()
const mockSetMultiSearchValue = jest.fn()
const mockSetIsAccordionItemShow = jest.fn()

describe('Certificates Filter Options Component Testing', () => {
  describe('Certificates Filter Options component without value', () => {
    beforeEach(() => {
      render(
        <div>
          <div id="backdrop-root"></div>
          <div id="overlay-root"></div>
          <div id="root">
            <CertificatesFilterOptions
              selectTechnology={''}
              setSelectTechnology={mockSetSelectTechnology}
              setFilterByTechnology={mockSetFilterByTechnology}
              setFilterByCertificate={mockSetFilterByCertificate}
              setMultiSearchValue={mockSetMultiSearchValue}
              filterByTechnology={''}
              filterByCertificate={''}
              multiSearchValue={''}
              setIsAccordionItemShow={mockSetIsAccordionItemShow}
              setCurrentPage={jest.fn()}
              setPageSize={jest.fn()}
            />
          </div>
        </div>,
        {
          preloadedState: {
            employeeCertificates: {
              getAllTechnologies: mockTechnologies,
              typeOfCertificate: mockCertificateByTechnology,
            },
            userAccessToFeatures: {
              userAccessToFeatures: mockUserAccessToFeaturesData,
            },
          },
        },
      )
    })
    test('should render labels', () => {
      expect(screen.getByText('Technology:')).toBeInTheDocument()
      expect(screen.getByText('Certificate Type:')).toBeInTheDocument()
    })
    test('should render selectTechnology', () => {
      const technologyFilter = screen.findByTestId('selectTechnology')
      expect(technologyFilter).toBeTruthy()
    })
    test('should render selectCertificate', () => {
      const certificateFilter = screen.findByTestId('selectCertificate')
      expect(certificateFilter).toBeTruthy()
    })
    test('should render Add Certificate Type', () => {
      const addCertificateTypeBtn = screen.getByText('Add Certificate Type')
      expect(addCertificateTypeBtn).toBeTruthy()
    })
    test('should render search input field', () => {
      const searchComponent = screen.getByTestId('searchField')
      expect(searchComponent).toBeTruthy()
    })
  })

  describe('Certificates Filter Options component with data', () => {
    beforeEach(() => {
      render(
        <div>
          <div id="backdrop-root"></div>
          <div id="overlay-root"></div>
          <div id="root">
            <CertificatesFilterOptions
              selectTechnology={''}
              setSelectTechnology={mockSetSelectTechnology}
              setFilterByTechnology={mockSetFilterByTechnology}
              setFilterByCertificate={mockSetFilterByCertificate}
              setMultiSearchValue={mockSetMultiSearchValue}
              filterByTechnology={''}
              filterByCertificate={''}
              multiSearchValue={''}
              setIsAccordionItemShow={mockSetIsAccordionItemShow}
              setCurrentPage={jest.fn()}
              setPageSize={jest.fn()}
            />
          </div>
        </div>,
        {
          preloadedState: {
            employeeCertificates: {
              getAllTechnologies: mockTechnologies,
              typeOfCertificate: mockCertificateByTechnology,
            },
            certificateList: {
              employeeCertificationList: mockCertificateList,
              listSize: 45,
            },
          },
        },
      )
    })
    test('technology select element value should equal to option selected ', () => {
      const technologyDropdown = screen.getByTestId('selectTechnology')
      userEvent.selectOptions(technologyDropdown, ['Java'])
      expect(mockSetSelectTechnology).toBeCalledWith('Java')
      expect(technologyDropdown).toBeInTheDocument()
    })
    test('after view button click it should should call mockSetSelectTechnology function', () => {
      const technologyDropdown = screen.getByTestId('selectTechnology')
      userEvent.selectOptions(technologyDropdown, ['.Net'])
      userEvent.click(screen.getByRole('button', { name: 'View' }))
      expect(mockSetSelectTechnology).toBeCalledWith('.Net')
    })
    test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', async () => {
      const searchInput = screen.getByTestId('searchField')
      userEvent.type(searchInput, 'Java')
      userEvent.click(screen.getByTestId(searchInputTestId))
      await waitFor(() => {
        expect(mockSetMultiSearchValue).toBeCalledWith('Java')
      })
    })
    test('upon providing search text and then clicking enter key it should call a function ', async () => {
      const searchInput = screen.getByTestId('searchField')
      userEvent.type(searchInput, 'Java')
      fireEvent.keyDown(searchInput, { key: 'Enter', keyCode: 13 })
      await waitFor(() => {
        expect(mockSetMultiSearchValue).toBeCalledTimes(1)
      })
    })
    test('upon clicking clear button it should clear the select element values ', async () => {
      const technologyDropdown = screen.getByTestId('selectTechnology')
      userEvent.selectOptions(technologyDropdown, ['Java'])
      await waitFor(() => {
        const certificateFilter = screen.getByTestId('selectCertificate')
        userEvent.selectOptions(certificateFilter, ['JavaTesting'])
        userEvent.click(screen.getByRole('button', { name: 'Clear' }))
        expect(technologyDropdown).toHaveValue('')
        expect(certificateFilter).toHaveValue('')
        expect(mockSetFilterByTechnology).toBeCalledWith('')
        expect(mockSetFilterByCertificate).toBeCalledWith('')
      })
    })
  })
})
