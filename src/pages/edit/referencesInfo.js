import { Icon, Popup } from 'semantic-ui-react'

export const ReferencesInfo = () => (
  <Popup trigger={<Icon name='info circle' />}>
    <Popup.Header>About References</Popup.Header>
    <Popup.Content>
      <p>In Datavis.tech, a "Reference" is a way to load a Dataset or Technology into a visualization. A Reference consists of a <b>File name</b> and <b>Document ID</b>.</p>
      <ul>
        <li><p>The <b>File name</b> is a local alias for the referenced Dataset or Technology. A Visualization can use this File name to load the content of a Reference, treating it as a normal file. For example, a Dataset Reference with File name "data.csv" can be loaded using <code>d3.csv('data.csv')</code>, and a Technology Reference with File name "tech.js" can be loaded using <code>{'<script src="tech.js"></script>'}</code>.</p></li>
        <li><p>The <b>Document ID</b> is the unique identifier for the Dataset or Technology to be loaded. This ID can be copied from the address (URL) of the Dataset or Technology. For example, the Dataset at the address <code>https://datavis.tech/data/d9b976101d844c049280c4181b38ee22</code> has the Document ID <code>d9b976101d844c049280c4181b38ee22</code>. This ID can be pasted into the Document ID field within the References table, after you click the "Add" button to add a new Reference.</p></li>
      </ul>
      Whenever any Dataset or Technology is updated, all Visualizations that reference them are automatically updated immediately to use the latest version.
    </Popup.Content>
  </Popup>
)
