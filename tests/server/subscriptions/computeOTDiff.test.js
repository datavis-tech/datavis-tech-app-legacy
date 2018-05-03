jest.mock('json0-ot-diff')
import jsondiff from 'json0-ot-diff'
import diffMatchPatch from 'diff-match-patch'

import fakeDoc from '../../utils/fakeDoc'
import computeOTDiff from '../../../src/server/subscriptions/computeOTDiff'

describe('compute ot diff', () => {
  it('should comppute the diff in json0 ot format', () => {
    const doc1 = fakeDoc().data
    const doc2 = fakeDoc().data
    computeOTDiff({ old: doc1, new: doc2 })
    expect(jsondiff).toHaveBeenCalledWith(doc1, doc2, diffMatchPatch)
  })
})
