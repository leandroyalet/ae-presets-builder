const presetSchema = {
  $ref: "#/definitions/Preset",
  definitions: {
    Preset: {
      type: "object",
      additionalProperties: false,
      properties: {
        configurationChannels: {
          $ref: "#/definitions/ConfigurationChannels"
        },
        inputs: {
          $ref: "#/definitions/Inputs"
        },
        outputs: {
          $ref: "#/definitions/Outputs"
        },
        actions: {
          type: "array",
          items: {
            $ref: "#/definitions/Action"
          }
        },
        triggers: {
          type: "array",
          items: {
            $ref: "#/definitions/Trigger"
          }
        }
      },
      //required: ["actions", "inputs", "outputs", "triggers"],
      title: "Preset"
    },
    ConfigurationChannels: {
      type: "object",
      additionalProperties: false,
      properties: {
        serials: {
          type: "array",
          items: {
            $ref: "#/definitions/Serial"
          }
        }
      },
      required: [],
      title: "Configuration Channels"
    },
    Serial: {
      type: "object",
      additionalProperties: false,
      properties: {
        input: {
          type: "string",
          title: "Input"
        },
        output: {
          type: "string",
          title: "Output"
        }
      },
      required: [],
      title: "Serial"
    },
    Action: {
      type: "object",
      additionalProperties: false,
      properties: {
        type: {
          type: "string"
        },
        sequence: {
          type: "array",
          items: {
            $ref: "#/definitions/ActionSequence"
          }
        }
      },
      required: ["sequence", "type"],
      title: "Action"
    },
    ActionSequence: {
      type: "object",
      additionalProperties: false,
      properties: {
        active: {
          type: "boolean"
        },
        millis: {
          type: "integer"
        }
      },
      required: ["millis"],
      title: "ActionSequence"
    },
    Inputs: {
      type: "object",
      additionalProperties: false,
      properties: {
        digitalInputs: {
          type: "array",
          items: {
            $ref: "#/definitions/Put"
          }
        },
        midiInputs: {
          type: "array",
          items: {
            $ref: "#/definitions/MIDIInput"
          }
        },
        analogInputs: {
          type: "array",
          items: {
            $ref: "#/definitions/Put"
          }
        }
      },
      //required: ["analogInputs", "digitalInputs", "midiInputs"],
      title: "Inputs"
    },
    Put: {
      type: "object",
      additionalProperties: false,
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
      required: ["gpio", "name", "type"],
      title: "Put"
    },
    MIDIInput: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string"
        },
        Tx: {
          type: "integer"
        }
      },
      required: ["Tx", "name"],
      title: "MIDIInput"
    },
    Outputs: {
      type: "object",
      additionalProperties: false,
      properties: {
        digitalOutputs: {
          type: "array",
          items: {
            $ref: "#/definitions/Put"
          }
        },
        midiOutputs: {
          type: "array",
          items: {
            $ref: "#/definitions/MIDIOutput"
          }
        }
      },
      //required: ["digitalOutputs", "midiOutputs"],
      title: "Outputs"
    },
    MIDIOutput: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string"
        },
        Rx: {
          type: "integer"
        }
      },
      required: ["Rx", "name"],
      title: "MIDIOutput"
    },
    Trigger: {
      type: "object",
      additionalProperties: false,
      properties: {
        type: {
          type: "string"
        },
        id: {
          type: "string"
        },
        sequence: {
          type: "array",
          items: {
            $ref: "#/definitions/TriggerSequence"
          }
        },
        actions: {
          type: "array",
          items: {
            type: "integer"
          }
        }
      },
      required: ["actions", "sequence", "type"],
      title: "Trigger"
    },
    TriggerSequence: {
      type: "object",
      additionalProperties: false,
      properties: {
        timeSpan: {
          type: "integer"
        },
        edgeType: {
          type: "string"
        }
      },
      required: ["edgeType", "timeSpan"],
      title: "TriggerSequence"
    }
  }
};

export default presetSchema;
