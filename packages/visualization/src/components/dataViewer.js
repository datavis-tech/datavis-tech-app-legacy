import React from 'react'

export default ({content}) => (
  <div style={{ maxHeight: '500px', overflow: 'auto', border: 'solid 1px #ddd' }} >
    <pre>{content}</pre>
  </div>
)
