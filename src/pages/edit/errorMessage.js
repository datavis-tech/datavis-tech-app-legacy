import { Message } from 'semantic-ui-react'

// Displays an error message to the user.
// For example, if edit access is not granted.
export default ({error}) => {
  if (error) {
    return (
      <Message
        error
        style={{
          position: 'fixed',
          bottom: '0px',
          zIndex: 6 // Make this appear above CodeMirror editor.
        }}
      >
        <Message.Header>Error</Message.Header>
        <p>{error}</p>
      </Message>
    )
  }

  return null
}
