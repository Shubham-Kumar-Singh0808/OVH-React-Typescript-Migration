// import ManufacturerListReducer, {
//   initialManufacturerListState,
//   ManufacturerListService,
// } from './ManufacturerSliceList'
// import { ApiLoadingState } from '../../../middleware/api/apiList'
// import {
//   GetAllManufacturerName,
//   ManufacturerList,
// } from '../../../types/Assets/ManufacturerList/ManufacturerType'
// import { mockManufacturerData } from '../../../test/data/ManufacturerListData'

// describe('Manufacturer Slice', () => {
//   describe('Manufacturer test', () => {
//     it('Should be able to set isLoading to "failed" if getManufacturerList is rejected', () => {
//       const action = {
//         type: ManufacturerListService.getManufacturerList.rejected.type,
//         payload: mockManufacturerData,
//       }
//       const state = ManufacturerListReducer(
//         initialManufacturerListState,
//         action,
//       )
//       expect(state).toEqual({
//         manufacturerDetails: [],
//         getAllManufacturerName: {} as GetAllManufacturerName,
//         isLoading: ApiLoadingState.idle,
//         listSize: 0,
//         manufacturerList: {} as ManufacturerList,
//       })
//     })
//   })
// })
