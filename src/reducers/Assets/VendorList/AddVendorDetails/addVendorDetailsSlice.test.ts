// import reducer, { addNewVendorService } from './addVendorDetailsSlice'
// import { ApiLoadingState } from '../../../../middleware/api/apiList'
// import {
//   AddVendor,
//   AddNewVendorSliceState,
// } from '../../../../types/Assets/VendorList/AddVendorDetails/addVendorDetailsType'
// import { mockDepartmentName } from '../../../../test/data/addNewVendorDetailsData'

// describe('addNewVendor Slice', () => {
//   describe('Reducer', () => {
//     const initialAddVendorState = {
//       department: [],
//       isLoading: ApiLoadingState.idle,
//       error: null,
//       addVendorDetails: {} as AddVendor,
//     } as AddNewVendorSliceState

//     it('Should be able to set isLoading to "loading" if getDepartment is pending', () => {
//       const action = {
//         type: addNewVendorService.getDepartment.pending.type,
//       }
//       const state = reducer(initialAddVendorState, action)
//       expect(state).toEqual({
//         department: [],
//         isLoading: ApiLoadingState.loading,
//         error: null,
//         addVendorDetails: {} as AddVendor,
//       })
//     })

//     it('Should be able to set isLoading to "success" if getDepartment is fulfilled', () => {
//       const action = {
//         type: addNewVendorService.getDepartment.fulfilled.type,
//         payload: mockDepartmentName,
//       }
//       const state = reducer(initialAddVendorState, action)
//       expect(state).toEqual({
//         department: mockDepartmentName,
//         isLoading: ApiLoadingState.succeeded,
//         error: null,
//         addVendorDetails: {} as AddVendor,
//       })
//     })
//     it('Should be able to set isLoading to "failed" if getDepartment is rejected', () => {
//       const rejectedAction = {
//         type: addNewVendorService.getDepartment.rejected.type,
//       }
//       const state = reducer(initialAddVendorState, rejectedAction)
//       expect(state).toEqual({
//         department: [],
//         isLoading: ApiLoadingState.failed,
//         addVendorDetails: {} as AddVendor,
//         error: undefined,
//       })
//     })
//     it('Should be able to set isLoading to "loading" if addNewVendor is pending', () => {
//       const action = {
//         type: addNewVendorService.addNewVendor.pending.type,
//       }
//       const state = reducer(initialAddVendorState, action)
//       expect(state).toEqual({
//         department: [],
//         isLoading: ApiLoadingState.loading,
//         error: null,
//         addVendorDetails: {} as AddVendor,
//       })
//     })
//     it('Should be able to set isLoading to "success" if addNewVendor is fulfilled', () => {
//       const action = {
//         type: addNewVendorService.addNewVendor.fulfilled.type,
//       }
//       const state = reducer(initialAddVendorState, action)
//       expect(state).toEqual({
//         department: [],
//         isLoading: ApiLoadingState.succeeded,
//         error: null,
//         addVendorDetails: {} as AddVendor,
//       })
//     })
//     it('Should be able to set isLoading to "failed" if addNewVendor is rejected', () => {
//       const rejectedAction = {
//         type: addNewVendorService.addNewVendor.rejected.type,
//       }
//       const state = reducer(initialAddVendorState, rejectedAction)
//       expect(state).toEqual({
//         department: [],
//         isLoading: ApiLoadingState.failed,
//         addVendorDetails: {} as AddVendor,
//         error: undefined,
//       })
//     })
//   })
// })
