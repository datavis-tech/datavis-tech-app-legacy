import { VIS_DOC_TYPE, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../constants'

export const typeDescriptions = {
  [VIS_DOC_TYPE]: (<p>In Datavis.tech, a "Visualization" is an HTML program. A Visualization can <b>reference</b> Datasets and Technologies, which are published independently from Visualizations. Whenever any references change (such as the Dataset visualized), the visualization automatically updates immediately.</p>
  ),
  [DATA_DOC_TYPE]: (
    <p>In Datavis.tech, a "Dataset" is a text-based representation of data. The most common format used is CSV (Comma Separated Value). When a Dataset is <b>referenced</b> in a Visualization, it can be loaded into the Visualization HTML program as though it were a local text file (for example using <code>XMLHttpRequest</code>, or <code>d3.csv</code>).</p>
  ),
  [TECH_DOC_TYPE]: (
    <p>In Datavis.tech, a "Technology" can be introduced to reduce duplication across Visualizations. The most common way of using this feature is to move repeated JavaScript or CSS logic from Visualizations into a new Technology. When a Technology is <b>referenced</b> in a Visualization, it can be loaded into the Visualization HTML program as though it were a local text file (for example using a <code>{'<script>'}</code> tag, or <code>d3.require</code>).</p>
  )
}
