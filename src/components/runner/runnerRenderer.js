import magicSandbox from 'magic-sandbox'

// This "dumb" component runs the code for a visualization in an iframe.
export default ({template, files}) => (
  <iframe
    width='100%'
    height='500'
    scrolling='no'
    style={{ border: 'solid 1px #ddd' }}
    srcDoc={magicSandbox(template, files)}
  />
)
