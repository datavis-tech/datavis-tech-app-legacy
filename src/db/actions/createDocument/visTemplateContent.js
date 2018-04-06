export default `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Responsive Starter Code</title>
  <script src="https://unpkg.com/d3@5.0.0/dist/d3.min.js"></script>
  <style>
    body {
      position: fixed;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      margin: 0px;
    }
  </style>
</head>
<body>
  <script>
    function myResponsiveComponent(container, props) {
      const { width, height } = props;
      
      let svg = container.selectAll('svg').data([null]);
      svg = svg.enter().append('svg')
        .merge(svg)
          .attr('width', width)
          .attr('height', height);
      
      const rect = svg.selectAll('rect').data([null]);
      rect
        .enter().append('rect')
          .attr('rx', 100)
        .merge(rect)
          .attr('width', width)
          .attr('height', height);
    }
    
    function render() {
      myResponsiveComponent(d3.select('body'), {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      });
    }
    
    render();
    window.addEventListener('resize', render);
    
  </script>
</body>
</html>`
