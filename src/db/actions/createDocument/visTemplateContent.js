export default `<!DOCTYPE html>
<meta charset="utf-8">
<script src="https://unpkg.com/d3@4.13.0/build/d3.min.js"></script>
<body style="position: fixed; left: 0px; right: 0px; top: 0px; bottom: 0px;">
<script>
const svg = d3.select(document.body).append('svg');
const margin = 50;
const rect = svg.append('rect')
  .attr('fill', '#3b956d')
  .attr('rx', 36);

const render = () => {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  svg
    .attr('width', width)
    .attr('height', height);
  rect
    .attr('x', margin)
    .attr('y', margin)
    .attr('width', width - margin * 2)
    .attr('height', height - margin * 2);
}

render();
window.addEventListener('resize', render);
</script>`
