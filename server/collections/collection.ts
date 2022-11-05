import { HydratedDocument, Types } from "mongoose";
import CollectionDOModel, { CollectionDO } from "./model";
import FreetModel, { Freet } from "../freet/model";

class CollectionDOCollection {
    // creates a new collection and saves to db
    static async addOne(userId: Types.ObjectId | string, name: string): Promise<HydratedDocument<CollectionDO>> {
        const collection = new CollectionDOModel({
            userId: userId,
            name,
        })
        await collection.save();
        return collection.populate('name')
    }

    // delete collection with the given ID
    static async deleteOne(id: Types.ObjectId | string): Promise<boolean> {
        const collection = await CollectionDOModel.deleteOne({ _id: id });
        return collection !== null;
    }

    // update the collection name to new name 
    static async updateOne(collectionId: Types.ObjectId | string, newName: string): Promise<HydratedDocument<CollectionDO>> {
        const collection = await CollectionDOModel.findOne({ _id: collectionId });
        collection.name = newName;
        await collection.save();
        return collection.populate('name');
    }

    // get all collections
    static async findAll(): Promise<Array<HydratedDocument<CollectionDO>>> {
        return CollectionDOModel.find({}).populate('name');
    }

    // get all collections
    static async findById(id: Types.ObjectId | string): Promise<Array<HydratedDocument<CollectionDO>>> {
        return CollectionDOModel.find({ userId: id }).populate('name');
    }

    // get all freets in a collection (by ID)
    static async getDetails(id: Types.ObjectId | string): Promise<Array<HydratedDocument<Freet>>> {
        return FreetModel.find({ collectionId: id }).populate('authorId');
    }
}

export default CollectionDOCollection;