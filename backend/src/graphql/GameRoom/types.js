module.exports.types = `
    type GameRoom {
        id: ID!
        questions: [ID]
        answers: GameAnswer
    }

    type GameAnswer{
        user: ID
        answers: [String]
    }
`;
