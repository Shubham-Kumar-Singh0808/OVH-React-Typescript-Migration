// import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React from 'react'
// import Autocomplete from 'react-autocomplete'
// import { TextWhite, TextDanger } from '../../../../constant/ClassName'

// const VendorsList = (): JSX.Element => {
//   return (
//     <CRow className="mt-1 mb-3">
//       <CFormLabel
//         className="col-sm-3 col-form-label text-end"
//         data-testid="vendorLabel"
//       >
//         Vendor :
//         {/* <span className={trainerAutoCompleteTarget ? TextWhite : TextDanger}>
//           *
//         </span> */}
//       </CFormLabel>
//       <CCol sm={6}>
//         <Autocomplete
//           inputProps={{
//             className: 'form-control form-control-sm',
//             id: 'vendor-autocomplete',
//             placeholder: 'Vendor Name',
//           }}
//           //   getItemValue={(item) => item.fullName}
//           //   items={allEmployeesProfiles}
//           data-testid="author-input"
//           wrapperStyle={{ position: 'relative' }}
//           renderMenu={(children) => (
//             <div
//             //   className={
//             //     trainerAutoCompleteTarget &&
//             //     trainerAutoCompleteTarget.length > 0
//             //       ? 'autocomplete-dropdown-wrap'
//             //       : 'autocomplete-dropdown-wrap hide'
//             //   }
//             >
//               {children}
//             </div>
//           )}
//           renderItem={(item, isHighlighted) => (
//             <div
//               data-testid="trainer-option"
//               className={
//                 isHighlighted
//                   ? 'autocomplete-dropdown-item active'
//                   : 'autocomplete-dropdown-item '
//               }
//               key={item.id}
//             >
//               {item.fullName}
//             </div>
//           )}
//           value={trainerAutoCompleteTarget}
//           shouldItemRender={(item, value) =>
//             item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
//           }
//           onChange={(e) => setTrainerAutoCompleteTarget(e.target.value)}
//           onSelect={(value) => onHandleSelectTrainer(value)}
//         />
//       </CCol>
//     </CRow>
//   )
// }

const VendorList = (): JSX.Element => {
  return (
    <>
      <h3> Vendor Name</h3>
    </>
  )
}

export default VendorList
