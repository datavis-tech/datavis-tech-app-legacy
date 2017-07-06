import magicSandbox from 'magic-sandbox'

// This component is the thing that runs the code in an iframe.
const Runner = ({ content, files }) => {
  return (
    <iframe
      width='960'
      height='500'
      style={{
        border: 'solid 1px #ddd'
        // transform: 'scale(1)'
      }}
      srcDoc={magicSandbox(content, files)}
    />
  )
}
export default Runner
