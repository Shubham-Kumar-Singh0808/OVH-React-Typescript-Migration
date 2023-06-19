// /* eslint-disable no-duplicate-imports */
// /* eslint-disable import/no-duplicates */
// import candidateOfferSliceReducer, {
//   assetListService,
//   initialAssetTypeChangeListState,
// } from './AssetListSlice'
// import {
//   candidateOfferService,
//   initialAddNewCandidateState,
// } from './CandidateOfferSlice'
// import { ApiLoadingState } from '../../../middleware/api/apiList'
// import { ManufacturerList } from '../../../types/Assets/AssetList/AssetListTypes'
// import { mockAssetTypeChangeList } from '../../../test/data/AssetListData'

// describe('candidate offer slice', () => {
//   describe('candidate offer test', () => {
//     it('Should set isLoading to "loading" when candidate offer is pending', () => {
//       const action = candidateOfferService.getAddNewJoineeData.pending

//       const state = candidateOfferSliceReducer(
//         initialAddNewCandidateState,
//         action,
//       )
//       expect(state).toEqual({
//         isLoading: ApiLoadingState.idle,
//       })
//     })
//     // it('Should set isLoading to "loading" when getCandidateOffer is pending testing', () => {
//     //   const action = candidateOfferService.getAddNewJoineeData.pending
//     //   const state = candidateOfferSliceReducer(
//     //     initialAddNewCandidateState,
//     //     action,
//     //   )
//     //   expect(state).toEqual({
//     //     asset: [],
//     //     isLoading: ApiLoadingState.loading,
//     //     manufacturerList: {} as ManufacturerList,
//     //     allAssetList: [],
//     //     listSize: 0,
//     //   })
//     // })
//     // it('Should set isLoading to "loading" when getCandidateOffer is fullfilled', () => {
//     //   const action = {
//     //     type: candidateOfferService.getAddNewJoineeData.fulfilled.type
//     //     payload: mockAssetTypeChangeList,
//     //   }

//       const state = candidateOfferSliceReducer(
//         initialAddNewCandidateState,
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
//       const state = candidateOfferSliceReducer(
//         initialAddNewCandidateState,
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
