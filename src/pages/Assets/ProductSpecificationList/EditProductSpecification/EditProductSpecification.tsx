// import React from 'react'
// import {
//   CButton,
//   CCol,
//   CFormLabel,
//   CFormSelect,
// //   CRow,
// //   CRow,
// } from '@coreui/react-pro'
// import OCard from '../../../../components/ReusableComponent/OCard'

// const EditProductSpecification = () => {
//   return (
//     <>
//       <OCard
//         className="mb-4 myprofile-wrapper"
//         title="Add Product Specification"
//         CBodyClassName="ps-0 pe-0"
//         CFooterClassName="d-none"
//       >
//         <CRow className="justify-content-end">
//           <CCol className="text-end" md={4}>
//             <CButton
//               color="info"
//               className="btn-ovh me-1"
//               data-testid="back-button"
//               //   onClick={() => setToggle('')}
//             >
//               <i className="fa fa-arrow-left  me-1"></i>Back
//             </CButton>
//           </CCol>
//         </CRow>
//         <CRow className="mt-3 ">
//           {/* <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
//             Asset Type:{' '}
//             <span className={selectAssetId ? TextWhite : TextDanger}>*</span>
//           </CFormLabel> */}
//           <CCol sm={3}>
//             <CFormSelect
//               aria-label="Default select example"
//               size="sm"
//               id="id"
//               data-testid="form-select1"
//               name="id"
//               //   value={selectAssetId}
//               //   onChange={(e) => {
//               //     setSelectAssetId(e.target.value)
//               //   }}
//             >
//               <option value={''}>Select Asset Type</option>
//               {/* {result?.assetTypeList?.length > 0 &&
//                 result?.assetTypeList?.map((item, index) => (
//                   <option key={index} value={item.id}>
//                     {item.assetType}
//                   </option> */}
//               {/* ))} */}
//             </CFormSelect>
//           </CCol>
//         </CRow>
//         <CRow className="mt-3 ">
//           {/* <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
//             Product Type:{' '}
//             <span className={selectProductId ? TextWhite : TextDanger}>*</span>
//           </CFormLabel>
//           <CCol sm={3}> */}
//           <CFormSelect
//             aria-label="Default select example"
//             size="sm"
//             id="productId"
//             data-testid="form-select1"
//             name="productId"
//             //   value={selectProductId}
//             //   onChange={(e) => {
//             //     setSelectProductId(e.target.value)
//             //   }}
//           >
//             <option value={''}>Select Product Type</option>
//             {/* {ProductTypeList.length > 0 &&
//                 ProductTypeList?.map((location, index) => (
//                   <option key={index} value={location.productId}>
//                     {location.productName}
//                   </option>
//                 ))} */}
//           </CFormSelect>
//           {/* </CCol> */}
//         </CRow>
//         <CRow className="mt-3 ">
//           {/* <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
//             Manufacturer/ Brand Name:{' '}
//             {/* <span className={selectProductId ? TextWhite : TextDanger}>*</span> */}
//           {/* </CFormLabel> */} *
//           <CCol sm={3}>
//             <CFormSelect
//               aria-label="Default select example"
//               size="sm"
//               id="selectProductId"
//               data-testid="form-select1"
//               name="selectProductId"
//               // value={selectProductId}
//               // onChange={(e) => {
//               //   setSelectProductId(e.target.value)
//               // }}
//             >
//               <option value={''}>Select Manufacturer</option>
//               {/* {ProductTypeList.length > 0 &&
//                 ProductTypeList?.map((product, index) => (
//                   <option key={index} value={product.productId}>
//                     {product.productName}
//                   </option>
//                 ))} */}
//             </CFormSelect>
//           </CCol>
//         </CRow>
//         {/* <CRow className="mt-4 mb-4"> */}
//           {/* <CFormLabel
//             {...formLabelProps}
//             className="col-sm-3 col-form-label text-end"
//           >
//             Product Specification:
//           </CFormLabel> */}
//           {/* {showEditor ? ( */}
//             {/* <CCol sm={8}>
//              <CKEditor<{ */}
//                 {/* onChange: CKEditorEventHandler<'change'>
//                }>
//                   initData={addProduct?.}
//            config={ckeditorConfig}
//                debug={true}
//                onChange={({ editor }) => { */}
//                   {/* handleProductSpecification(editor.getData().trim())
//                 }}
//               />
//              </CCol>
//           ) : (
//             ''
//            )}
//         </CRow> */}
//         <CRow>
//           <CCol md={{ span: 6, offset: 3 }}>
//             <CButton
//               data-testid="add-btn"
//               className="btn-ovh me-1 text-white"
//               color="success"
//               // onClick={handleAddNewClient}
//               // disabled={!isButtonEnabled}
//             >
//               Add
//             </CButton>
//             <CButton
//               data-testid="clear-btn"
//               color="warning "
//               className="btn-ovh text-white"
//             //   onClick={clearInputs}
//             >
//               Clear
//             </CButton>
//           </CCol>
//         </CRow>
//       </OCard>
//     </>
//   {/* )
// } */}

// export default EditProductSpecification
