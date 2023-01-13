import React, { Component, useState } from "react";
import "./App.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/bootstrap-4";

import presetSchema from "./preset.schema";

const log = type => console.log.bind(console, type);

const PresetEditor = () => {
  const emptyOutput = {};
  const [output, setOutput] = useState(emptyOutput);

  const PrettyJson = () => {
    return <pre>{JSON.stringify(output, null, 2)}</pre>;
  };

  const submitted = ({ formData }) => {
    console.log("Data submitted: ", formData);
    setOutput(formData);
  };

  return (
    <div className="container">
      <Form
        className="mb-2"
        schema={presetSchema}
        validator={validator}
        onChange={log("changed")}
        onSubmit={submitted}
        onError={log("errors")}
      />

      <div className="jumbotron">
        <PrettyJson />
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="container">
        <PresetEditor />
      </div>
    );
  }
}

export default App;
