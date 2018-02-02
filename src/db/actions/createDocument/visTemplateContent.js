export default `<!DOCTYPE html>
<meta charset="utf-8">
<script src="https://unpkg.com/d3@4"></script>
<body style="position: fixed; left: 0px; right: 0px; top: 0px; bottom: 0px;">
<script>

// In Datavis.tech, a "visualization" is a standard HTML page!
// This starter template gives you a place to start for responsive visualizations.

// To reference a dataset, click "Add" under the References section,
// paste the dataset id, give it a file name, then load it as you would a normal file.

const svg = d3.select(document.body).append('svg');
const margin = 50;
const rect = svg.append('rect')
  .attr('fill', '#3c986f')
  .attr('rx', 50);

const render = () => {
  svg
    .attr('width', document.body.clientWidth)
    .attr('height', document.body.clientHeight);
  rect
    .attr('x', margin)
    .attr('y', margin)
    .attr('width', svg.attr('width') - margin * 2)
    .attr('height', svg.attr('height') - margin * 2);
}

render();
window.addEventListener('resize', render);
</script>`
