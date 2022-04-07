module.exports.types = `
    type GameRoom {
        id: ID!
        questions: [Question!]!
        answers: [Answer!]!
        expiryTime: String!
    }

    type Answer {
        user: ID!
        answers: [String!]!
        submitted_status: Boolean!
    }

    type Question {
        id: ID!
        question: String!
    }
`;
