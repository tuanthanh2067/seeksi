const { gql } = require('apollo-server');
// GraphQL schemas
const example = require("./example");

const typeDefs = gql`
  ${example}
`;

module.exports = typeDefs;
