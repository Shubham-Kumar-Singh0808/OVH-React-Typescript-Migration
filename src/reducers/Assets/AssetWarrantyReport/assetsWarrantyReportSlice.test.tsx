// import assetsWarrantyListSliceReducer, {
//   assetsWarrantyListService,
//   initialAssetsWarrantyListState,
// } from './assetsWarrantyReportSlice'
// import { ApiLoadingState } from '../../../middleware/api/apiList'
// import { GetWarrantyAssetsList } from '../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
// import { mockAssetsWarrantyList } from '../../../test/data/AssetsWarrantyData'

// describe('AssetWarranty Slice', () => {
//   describe('AssetWarranty test', () => {
//     it('Should set isLoading to "loading" when getAssets is pending', () => {
//       const action = assetsWarrantyListService.getAssetsWarrantyList.pending
//       const state = assetsWarrantyListSliceReducer(
//         initialAssetsWarrantyListState,
//         action,
//       )
//       expect(state).toEqual({
//         warrantyAssetsDetails: [], // Replace with actual warranty assets details
//         listSize: 0,
//         isLoading: ApiLoadingState.loading,
//         getWarrantyAssetsList: {} as GetWarrantyAssetsList,
//       })
//     })

//     it('Should set isLoading to "success" when getAssets is fulfilled', () => {
//       const action = {
//         type: assetsWarrantyListService.getAssetsWarrantyList.fulfilled.type,
//         payload: mockAssetsWarrantyList,
//       }
//       const state = assetsWarrantyListSliceReducer(
//         initialAssetsWarrantyListState,
//         action,
//       )
//       expect(state).toEqual({
//         warrantyAssetsDetails: undefined,
//         listSize: undefined,
//         isLoading: ApiLoadingState.succeeded,
//         getWarrantyAssetsList: {} as GetWarrantyAssetsList,
//       })
//     })
//   })
// })
