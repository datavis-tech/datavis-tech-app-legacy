import React from 'react'
import classNames from 'classnames'

export const titleFeedbackText = 'A title is required.'

const TitleFormGroup = ({titleDanger, handleChange, setTitleInput, value}) => (
  <div
    className={classNames({
      "form-group": true,
      "row": true,
      "has-danger": titleDanger
    })}
  >

    <label htmlFor="title" className="col-sm-2 col-form-label">
      Title
    </label>

    <div className="col-sm-10">
      <input
        type="text"
        className={classNames({
          "form-control": true,
          "form-control-danger": titleDanger
        })}
        id="title"
        value={value}
        onChange={handleChange}
        ref={setTitleInput}
      />

      {(() => {
        if (titleDanger){
          return (
            <div className="form-control-feedback title-feedback">{titleFeedbackText}</div>
          )
        }
      })()}

    </div>
  </div>
)
export default TitleFormGroup
