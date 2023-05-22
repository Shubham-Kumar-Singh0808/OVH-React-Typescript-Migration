// import React, { useEffect, useState } from 'react'
// import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
// import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
// import OCard from '../../../../components/ReusableComponent/OCard'
// import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
// import { reduxServices } from '../../../../reducers/reduxServices'
// import OToast from '../../../../components/ReusableComponent/OToast'
// import { UpdateProductSpecificationTypes } from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
// import { TextDanger, TextWhite } from '../../../../constant/ClassName'
// import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
// import { useAppDispatch,useTypedSelector } from '../../../../stateStore'

// const EditProductSpecification = ({
//   setToggle,
//   editProductSpecification,
// }: {
//   setToggle: (value: string) => void
//   editProductSpecification: UpdateProductSpecificationTypes
// }): JSX.Element => {
//   const [selectAssetId, setSelectAssetId] = useState<string>('')
//   const [selectProductId, setSelectProductId] = useState<string>('')

//   const [productSpecification, setProductSpecification] = useState<string>('')

//   const [manufactureType, setManufactureType] = useState('')
//   const dynamicFormLabelProps = (htmlFor: string, className: string) => {
//     return {
//       htmlFor,
//       className,
//     }
   
//   }
//   const dispatch = useAppDispatch()
//   const formLabel = 'col-sm-3 col-form-label text-end'
//   const result = useTypedSelector(
//     reduxServices.addNewProduct.selectors.manufactureList,
//   )
//   const ProductTypeList = useTypedSelector(
//     reduxServices.addNewProduct.selectors.productTypeList,
//   )
//   const formLabelProps = {
//     htmlFor: 'inputNewCertificateType',
//     className: 'col-form-label',
//   }
//   const handleProductSpecification = (ProductSpecification: string) => {
//     setProductSpecification(ProductSpecification)
//   }
//     useEffect(() => {
//       dispatch(reduxServices.addNewProduct.updateProductSpecification())
//     }, [dispatch])

//   const updateHandler = async () => {
//     id:editProductSpecification.id,
//     productId: editProductSpecification.productId,
//     productName: editProductSpecification.productName,
//     manufacturerId: number
//     manufacturerName: string
//     assetTypeId: number
//     assetType: string
//     productSpecification: string
//     createdBy: string
//     createdDate: string
//     updatedBy: string
//     updatedDate: string
//     departmentId: number | null
//     departmentName: string | null
//     roleId: number | null
//   }
//   const updateSuccessToastMessage = (
//     <OToast
//       toastMessage="Product Specification is successfully edited.
//       "
//       toastColor="success"
//     />
//   )
//   return (
//     <>
//       <OCard
//         className="mb-4 myprofile-wrapper"
//         title="Edit Product Specification"
//         CBodyClassName="ps-0 pe-0"
//         CFooterClassName="d-none"
//       >
//         <CRow className="justify-content-end">
//           <CCol className="text-end" md={4}>
//             <CButton
//               color="info"
//               className="btn-ovh me-1"
//               data-testid="back-button"
//               onClick={() => setToggle('')}
//             >
//               <i className="fa fa-arrow-left  me-1"></i>Back
//             </CButton>
//           </CCol>
//         </CRow>
//         <CRow className="mt-3 ">
//           <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
//             Asset Type:{' '}
//             <span className={selectAssetId ? TextWhite : TextDanger}>*</span>
//           </CFormLabel>
//           <CCol sm={3}>
//             <CFormSelect
//               aria-label="Default select example"
//               size="sm"
//               id="id"
//               data-testid="form-select1"
//               name="id"
//                 value={selectAssetId}
//                 onChange={(e) => {
//                   setSelectAssetId(e.target.value)
//                 }}
//             >
//               <option value={''}>Select Asset Type</option>
//               {result?.assetTypeList?.length > 0 &&
//                 result?.assetTypeList?.map((item, index) => (
//                   <option key={index} value={item.id}>
//                     {item.assetType}
//                   </option>
//                 ))}
//             </CFormSelect>
//           </CCol>
//         </CRow>
//         <CRow className="mt-3 ">
//           <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
//             Product Type:{' '}
//             <span className={selectProductId ? TextWhite : TextDanger}>*</span>
//           </CFormLabel>
//           <CCol sm={3}>
//             <CFormSelect
//               aria-label="Default select example"
//               size="sm"
//               id="productId"
//               data-testid="form-select1"
//               name="productId"
//                 value={selectProductId}
//                 onChange={(e) => {
//                   setSelectProductId(e.target.value)
//                 }}
//             >
//               <option value={''}>Select Product Type</option>
//               {ProductTypeList.length > 0 &&
//                 ProductTypeList?.map((location, index) => (
//                   <option key={index} value={location.productId}>
//                     {location.productName}
//                   </option>
//                 ))}
//             </CFormSelect>
//           </CCol>
//         </CRow>
//         <CRow className="mt-3 ">
//           <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
//             Manufacturer/ Brand Name:{' '}
//              <span className={selectProductId ? TextWhite : TextDanger}>*</span> 
//            </CFormLabel>
//           <CCol sm={3}>
//             <CFormSelect
//               aria-label="Default select example"
//               size="sm"
//               id="selectProductId"
//               data-testid="form-select1"
//               name="selectProductId"
//                 value={manufactureType}
//                 onChange={(e) => {
//                   setManufactureType(e.target.value)
//                 }}
//             >
//               <option value={''}>Select Manufacturer</option>
//                {ProductTypeList.length > 0 &&
//                 ProductTypeList?.map((product, index) => (
//                   <option key={index} value={product.productId}>
//                     {product.productName}
//                   </option>
//                 ))} 
//             </CFormSelect>
//           </CCol>
//         </CRow>
//         <CRow className="mt-4 mb-4">
//           <CFormLabel
//             {...formLabelProps}
//             className="col-sm-3 col-form-label text-end"
//           >
//             Product Specification:
//           </CFormLabel>

//           <CCol sm={8}>
//             <CKEditor<{
//               onChange: CKEditorEventHandler<'change'>
//             }>
//               initData={productSpecification}
//               config={ckeditorConfig}
//               debug={true}
//               onChange={({ editor }) => {
//                 handleProductSpecification(editor.getData().trim())
//               }}
//             />
//           </CCol>
//         </CRow>
//         <CRow>
//           <CButton
//             data-testid="updateBtn"
//             className="btn-ovh me-1 text-white"
//             color="success"
//             // disabled={!isUpdateButtonEnabled}
//             onClick={updateHandler}
//           >
//             Update
//           </CButton>
//         </CRow>
//       </OCard>
//     </>
//   )
// }

// export default EditProductSpecification
