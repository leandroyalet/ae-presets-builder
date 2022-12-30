import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/bootstrap-4";

const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    inputs: {
      type: "object",
      properties: {
        digitalInputs: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                gpio: {
                  type: "integer"
                },
                type: {
                  type: "string"
                },
                inverted: {
                  type: "boolean"
                }
              },
              required: ["name", "gpio", "type", "inverted"]
            }
          ]
        },
        midiInputs: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                Tx: {
                  type: "integer"
                }
              },
              required: ["name", "Tx"]
            }
          ]
        },
        analogInputs: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                gpio: {
                  type: "integer"
                },
                type: {
                  type: "string"
                },
                inverted: {
                  type: "boolean"
                }
              },
              required: ["name", "gpio", "type", "inverted"]
            }
          ]
        }
      },
      required: ["digitalInputs", "midiInputs", "analogInputs"]
    },
    outputs: {
      type: "object",
      properties: {
        digitalOutputs: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                gpio: {
                  type: "integer"
                },
                type: {
                  type: "string"
                },
                inverted: {
                  type: "boolean"
                }
              },
              required: ["name", "gpio", "type", "inverted"]
            }
          ]
        },
        midiOutputs: {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                Rx: {
                  type: "integer"
                }
              },
              required: ["name", "Rx"]
            }
          ]
        }
      },
      required: ["digitalOutputs", "midiOutputs"]
    },
    actions: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            type: {
              type: "string"
            },
            sequence: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    active: {
                      type: "boolean"
                    },
                    millis: {
                      type: "integer"
                    }
                  },
                  required: ["active", "millis"]
                },
                {
                  type: "object",
                  properties: {
                    active: {
                      type: "boolean"
                    },
                    millis: {
                      type: "integer"
                    }
                  },
                  required: ["active", "millis"]
                }
              ]
            }
          },
          required: ["type", "sequence"]
        },
        {
          type: "object",
          properties: {
            type: {
              type: "string"
            },
            sequence: {
              type: "array",
              items: {}
            }
          },
          required: ["type", "sequence"]
        },
        {
          type: "object",
          properties: {
            type: {
              type: "string"
            },
            sequence: {
              type: "array",
              items: {}
            }
          },
          required: ["type", "sequence"]
        },
        {
          type: "object",
          properties: {
            type: {
              type: "string"
            },
            sequence: {
              type: "array",
              items: {}
            }
          },
          required: ["type", "sequence"]
        }
      ]
    },
    triggers: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            type: {
              type: "string"
            },
            id: {
              type: "string"
            },
            sequence: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    timeSpan: {
                      type: "integer"
                    },
                    edgeType: {
                      type: "string"
                    }
                  },
                  required: ["timeSpan", "edgeType"]
                }
              ]
            },
            actions: {
              type: "array",
              items: [
                {
                  type: "integer"
                },
                {
                  type: "integer"
                },
                {
                  type: "integer"
                }
              ]
            }
          },
          required: ["type", "id", "sequence", "actions"]
        },
        {
          type: "object",
          properties: {
            type: {
              type: "string"
            },
            sequence: {
              type: "array",
              items: {}
            },
            actions: {
              type: "array",
              items: [
                {
                  type: "integer"
                },
                {
                  type: "integer"
                },
                {
                  type: "integer"
                }
              ]
            }
          },
          required: ["type", "sequence", "actions"]
        }
      ]
    }
  },
  required: ["inputs", "outputs", "actions", "triggers"]
};

const log = type => console.log.bind(console, type);

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;

    return (
      <p>
        <button onClick={this.handleClick("hello")}>
          {loading ? "Loading..." : "Call Lambda"}
        </button>
        <button onClick={this.handleClick("async-dadjoke")}>
          {loading ? "Loading..." : "Call Async Lambda"}
        </button>
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div class="container">
        <header>Æ Presets Builder</header>
        <Form
          schema={schema}
          validator={validator}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
        />
      </div>
    );
  }
}

export default App;
