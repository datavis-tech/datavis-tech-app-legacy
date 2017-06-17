// This component is the thing that runs the code in an iframe.
const Runner = ({ content }) => (
  <iframe
    style={{
      height: '300px',
      width: '100%',
      border: 'solid 1px #ddd'
    }}
    srcDoc={content}
  />
)
export default Runner
