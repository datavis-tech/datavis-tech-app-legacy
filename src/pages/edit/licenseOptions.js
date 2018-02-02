// This is the list of supported licenses in bl.ocks.org, from https://bl.ocks.org/licenses.txt.
// Full data for each code available at https://github.com/spdx/license-list-data/blob/master/json/licenses.json
export default [
  'apache-2.0',
  'bsd-2-clause',
  'bsd-3-clause',
  'cc-by-4.0',
  'cc-by-nc-4.0',
  'cc-by-nc-nd-4.0',
  'cc-by-nc-sa-4.0',
  'cc-by-nd-4.0',
  'cc-by-sa-4.0',
  'cddl-1.0',
  'epl-1.0',
  'gpl-2.0',
  'gpl-3.0',
  'lgpl-2.1',
  'lgpl-3.0',
  'mit',
  'mpl-2.0',
  'none'
].map(license => ({
  key: license,
  value: license,
  text: license // TODO use proper name from data file.
}))
