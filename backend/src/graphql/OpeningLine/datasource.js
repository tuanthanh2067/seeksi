const { DataSource } = require("apollo-datasource")
const {
    UserInputError,
    ApolloError,
    AuthenticationError,
} = require("apollo-server-core");
const OpeningLine = require("../../schemas/OpeningLine/OpeningLine");

class OpeningLineAPI extends DataSource {
    constructor() {
        super();
    }

    async getOpeningLine() {
        try {
            let lines = [];
            //leave it here, just in case
            // if (+page && +perPage) {
            //     page = (+page) - 1;
            //     lines = await OpeningLine.find().skip(page * +perPage).limit(+perPage).exec();
            // } else {
            //     throw new ApolloError("something wrong with Page and perPage")
            // }
            lines = await OpeningLine.aggregate([{
                $sample: { size: 3 },
            }
            ]);
            //we do this because aggregate returns _id instead of id
            return lines.map(obj => ({
                ...obj, id: obj._id
            }))
        } catch (err) {
            throw new ApolloError(err);
        }
    }

    async incrementUseCount(lineId) {
        try {
            let line = await OpeningLine.findOneAndUpdate(
                { _id: lineId },
                {
                    $inc: { useCount: 1 }
                }, { new: true });
            return line || null;
        } catch (err) {
            throw new ApolloError(err);
        }
    }
}

module.exports.OpeningLineAPI = OpeningLineAPI;