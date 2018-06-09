import { extendObservable, computed } from 'mobx'
import { VIS_DOC_TYPE } from '../constants'

export default function Document (documentProperties) {
  const aDocument = {
    isVisualization: computed(isVisualization)
  }

  return extendObservable(aDocument, documentProperties)

  function isVisualization () {
    return aDocument.type === VIS_DOC_TYPE
  }

}
