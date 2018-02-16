const exportVisualization = require('./export')

module.exports = (connection) => {
  const exportVisualizationUsingConnection = exportVisualization(connection)
  return async ({params: {id}}, response) => {
    const { zip, fileName } = await exportVisualizationUsingConnection(id)
    response.set({
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': 'application/zip'
    })
    response.send(zip)
  }
}
