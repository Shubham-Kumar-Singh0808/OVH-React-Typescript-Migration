// /* eslint-disable no-duplicate-imports */
// /* eslint-disable import/no-duplicates */
// import assetListSliceReducer, {
//   assetListService,
//   initialAssetTypeChangeListState,
// } from './AssetListSlice'
// import { ApiLoadingState } from '../../../middleware/api/apiList'
// import { ManufacturerList } from '../../../types/Assets/AssetList/AssetListTypes'
// import { mockAssetTypeChangeList } from '../../../test/data/AssetListData'

// describe('Asset List Slice', () => {
//   describe('Asset List test', () => {
//     it('Should set isLoading to "loading" when getAssets is pending', () => {
//       const action = assetListService.getAllAssetListData.pending
//       const state = assetListSliceReducer(
//         initialAssetTypeChangeListState,
//         action,
//       )
//       expect(state).toEqual({
//         asset: [],
//         isLoading: ApiLoadingState.idle,
//         manufacturerList: {} as ManufacturerList,
//         allAssetList: [],
//         listSize: 0,
//       })
//     })
//     it('Should set isLoading to "loading" when getAssets is pending testing', () => {
//       const action = assetListService.getAssetTypeChangeList.pending
//       const state = assetListSliceReducer(
//         initialAssetTypeChangeListState,
//         action,
//       )
//       expect(state).toEqual({
//         asset: [],
//         isLoading: ApiLoadingState.loading,
//         manufacturerList: {} as ManufacturerList,
//         allAssetList: [],
//         listSize: 0,
//       })
//     })
//     it('Should set isLoading to "loading" when getAssets is fullfilled', () => {
//       const action = {
//         type: assetListService.getAllAssetListData.fulfilled.type,
//         payload: mockAssetTypeChangeList,
//       }

//       const state = assetListSliceReducer(
//         initialAssetTypeChangeListState,
//         action,
//       )
//       expect(state).toEqual({
//         asset: [],
//         isLoading: ApiLoadingState.succeeded,
//         manufacturerList: {} as ManufacturerList,
//         allAssetList: undefined,
//         listSize: undefined,
//       })
//     })

//     it('Should set isLoading to "success" when getAssets type change is fulfilled', () => {
//       const action = assetListService.getAssetTypeChangeList.fulfilled
//       const state = assetListSliceReducer(
//         initialAssetTypeChangeListState,
//         action,
//       )
//       expect(state).toEqual({
//         asset: undefined,
//         isLoading: ApiLoadingState.succeeded,
//         manufacturerList: {} as ManufacturerList,
//         allAssetList: [],
//         listSize: 0,
//       })
//     })
//   })
// })
