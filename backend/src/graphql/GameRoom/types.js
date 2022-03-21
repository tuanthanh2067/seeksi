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
    }

    type Question {
        id: ID!
        question: String!
    }
`;
