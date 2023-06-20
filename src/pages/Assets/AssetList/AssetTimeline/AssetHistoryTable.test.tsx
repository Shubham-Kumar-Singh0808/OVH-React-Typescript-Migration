import AssetHistoryTable from './AssetHistoryTable'
import { cleanup, render } from '../../../../test/testUtils'

describe('Expense Category List Table with data', () => {
  beforeEach(() => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<AssetHistoryTable />, {
      preloadedState: {},
    })
  })
  afterEach(cleanup)
})
