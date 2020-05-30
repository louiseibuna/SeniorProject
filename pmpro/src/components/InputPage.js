import React from "react";

const InputPage = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">GitHub Repository</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
          />
      </div>
      <button type="submit">Submit</button>
    </form>
    
  );
}

export default InputPage;
