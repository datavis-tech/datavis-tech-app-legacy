import React from 'react'

const DescriptionFormGroup = ({handleChange}) => (
  <div className="form-group row">

    <label htmlFor="description" className="col-sm-2 col-form-label">
      Description
    </label>

    <div className="col-sm-10">
      <textarea
        className="form-control"
        id="description"
        rows="3"
        onChange={handleChange}
      />
    </div>
  </div>
)

export default DescriptionFormGroup
