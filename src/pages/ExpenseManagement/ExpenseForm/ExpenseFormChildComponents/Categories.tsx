import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const CategoriesList = ({
  expenseCategory,
  setExpenseCategory,
  expenseSubCategory,
  setExpenseSubCategory,
}: {
  expenseCategory: string
  setExpenseCategory: React.Dispatch<React.SetStateAction<string>>
  expenseSubCategory: string
  setExpenseSubCategory: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const categories = useTypedSelector(
    reduxServices.expenseForm.selectors.categoryList,
  )
  const subCategories = useTypedSelector(
    reduxServices.expenseForm.selectors.subCategoryList,
  )
  return (
    <>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="categoryLabel"
        >
          Category:
          <span className={expenseCategory ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="categoryName"
            id="categoryName"
            size="sm"
            aria-label="Category"
            name="expenseCategory"
            value={expenseCategory}
            onChange={(e) => {
              setExpenseCategory(e.target.value)
            }}
          >
            <option value={''}>Select Category</option>
            {categories
              .slice()
              .sort((category1, category2) =>
                category1.categoryName.localeCompare(category2.categoryName),
              )
              ?.map((categoryItems, categories) => (
                <option key={categories} value={categoryItems.id}>
                  {categoryItems.categoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="subCategoryLabel"
        >
          Sub-Category:
          <span className={expenseSubCategory ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="expenseSubCategory"
            id="expenseSubCategory"
            size="sm"
            aria-label="Category"
            name="expenseSubCategory"
            onChange={(e) => {
              setExpenseSubCategory(e.target.value)
            }}
            value={expenseSubCategory}
          >
            <option value={''}>Select Sub-Category</option>
            {subCategories
              .slice()
              .sort((subCategory1, subCategory2) =>
                subCategory1.subCategoryName.localeCompare(
                  subCategory2.subCategoryName,
                ),
              )
              ?.map((subCategoryItems, subCategory) => (
                <option key={subCategory} value={subCategoryItems.id}>
                  {subCategoryItems.subCategoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default CategoriesList
