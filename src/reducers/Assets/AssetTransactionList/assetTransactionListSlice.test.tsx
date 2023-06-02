import assetTransactionListSliceReducer, {
  assetTransactionListService,
  initialAssetTransactionListState,
} from './assetTransactionListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetAssetTransactionList } from '../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'
import { mockAssetTransactionList } from '../../../test/data/AssetTransactionListData'

describe('AssetTransaction List Slice', () => {
  describe('AssetTransaction List test', () => {
    it('Should set isLoading to "loading" when getAssets is pending', () => {
      const action = assetTransactionListService.getAssetTransactionList.pending
      const state = assetTransactionListSliceReducer(
        initialAssetTransactionListState,
        action,
      )
      expect(state).toEqual({
        assetTransactionakDetails: [],
        getAssetTransactionList: {} as GetAssetTransactionList,
        isLoading: ApiLoadingState.loading,
        listSize: 0,
      })
    })

    it('Should set isLoading to "success" when getAssets is fulfilled', () => {
      const action = {
        type: assetTransactionListService.getAssetTransactionList.fulfilled
          .type,
        payload: mockAssetTransactionList,
      }
      const state = assetTransactionListSliceReducer(
        initialAssetTransactionListState,
        action,
      )
      expect(state).toEqual({
        assetTransactionakDetails: mockAssetTransactionList.list,
        getAssetTransactionList: {} as GetAssetTransactionList,
        isLoading: ApiLoadingState.succeeded,
        listSize: 2,
      })
    })
  })
})
