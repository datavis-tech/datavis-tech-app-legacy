// This component is the thing that runs the code in an iframe.
const Runner = ({ content }) => (
  <iframe
    width='960'
    height='500'
    style={{
      border: 'solid 1px #ddd'
      // transform: 'scale(1)'
    }}
    srcDoc={content}
  />
)
export default Runner
