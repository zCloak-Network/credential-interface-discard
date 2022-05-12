/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-07 15:19:54
 * @LastEditTime: 2022-04-01 10:57:45
 */

export default {
  $id: "http://kilt-protocol.org/draft-01/ctype-input#",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "",
  type: "object",
  className: "schema-main",
  properties: {
    $schema: {
      title: "Schema",
      type: "string",
      format: "uri",
      enum: ["http://kilt-protocol.org/draft-01/ctype#"],
      default: "http://kilt-protocol.org/draft-01/ctype#",
      readonly: true,
      className: "hidden",
    },
    title: {
      title: "Title",
      type: "string",
      minLength: 1,
      className: "schema-title",
    },
    // description: { type: "string", className: "schema-des" },
    // owner: { type: "string", className: "schema-owner" },
    properties: {
      title: "Data",
      type: "array",
      className: "schema-properties",
      items: {
        type: "object",
        properties: {
          title: {
            title: "Title",
            type: "string",
            default: "New Property",
            minLength: 1,
          },
          // $id: {
          //   title: "Identifier",
          //   type: "string",
          //   format: "uri-reference",
          //   minLength: 1,
          // },
          // $ref: {
          //   title: "Reference",
          //   type: "string",
          //   format: "uri-reference",
          //   minLength: 1,
          // },
          type: {
            title: "Type",
            type: "string",
            format: "select",
            enum: ["string", "integer", "boolean"],
            enumTitles: ["Text", "Number", "Yes/No"],
          },
          // format: {
          //   title: "Format",
          //   type: "string",
          //   enum: ["date", "time", "uri"],
          // },
        },
        required: ["title", "type", "$id"],
      },
      collapsed: false,
    },
    type: {
      title: "Object Type",
      type: "string",
      default: "object",
      readonly: true,
      className: "hidden",
    },
  },
  required: ["$schema", "title", "properties", "type"],
};
