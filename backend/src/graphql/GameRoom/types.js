module.exports.types = `
    type GameRoom {
        id: ID!
        questions: [ID]
        answers: [GameAnswer]
    }

    type GameAnswer{
        id: ID!
        user: ID!
        answers: [String]
    }
`;
