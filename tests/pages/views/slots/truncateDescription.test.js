import truncateDescription from '../../../../src/pages/views/slots/truncateDescription'

describe('truncate description', () => {

  it('should render plain text less than character limit', () => {
    expect(truncateDescription('This is some plain text.'))
      .toEqual('This is some plain text.')
  })

  it('should render ellipsis if text over the character limit', () => {
    expect(truncateDescription('This is some plain text that is far too long far too long far too long far too long.'))
      .toEqual('This is some plain text that is far too long far too long far too long far too l…')
  })

  it('should render Markdown links to plain text', () => {
    expect(truncateDescription('This is a [link](http://google.com).'))
      .toEqual('This is a link.')
  })

  it('should render Markdown images to plain text', () => {
    expect(truncateDescription('This is an ![image](foo.com/image.png "Title Text").'))
      .toEqual('This is an image.')
  })

  it('should render Markdown horizontal rule to a space', () => {
    expect(truncateDescription('---')).toEqual(' ')
  })

  it('should render Markdown strong to plain text', () => {
    expect(truncateDescription('This is **strong**.'))
      .toEqual('This is strong.')
  })

  it('should render Markdown italics to plain text', () => {
    expect(truncateDescription('This is _italics_.'))
      .toEqual('This is italics.')
  })

  it('should render Markdown codespan to plain text', () => {
    expect(truncateDescription('This is `codespan`.'))
      .toEqual('This is codespan.')
  })

})
