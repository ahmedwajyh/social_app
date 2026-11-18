import { Model, QueryOptions, QueryFilter, UpdateQuery, SaveOptions } from "mongoose";

export class DBRepository<T> {

    constructor(public readonly model: Model<T>) { }

    create = async ({ data, options = {} }: {
        data: T,
        options?: SaveOptions
    }) => {
        return await new this.model(data).save(options);
    }

    findOne = async ({ filter, options = {}, projection }: {
        filter: QueryFilter<T>,
        options?: QueryOptions<T>,
        projection?: any
    }) => {
        return await this.model.findOne(filter, projection, options);
    }

    find = async ({ filter, options = {} }: {
        filter: QueryFilter<T>,
        options?: QueryOptions<T> & {
            select?: string,
            limit?: number,
            skip?: number,
            populate?: any
        }
    }) => {
        let query = this.model.find(filter);

        if (options?.select) query = query.select(options.select);
        if (options?.limit) query = query.limit(options.limit);
        if (options?.skip) query = query.skip(options.skip);
        if (options?.populate) query = query.populate(options.populate);

        return await query.exec();
    }

    findById = async ({ id, options = {} }: {
        id: any,
        options?: QueryOptions<T>
    }) => {
        return await this.model.findById(id, null, options);
    }

    findByIdAndUpdate = async ({ id, update, options = {} }: {
        id: any,
        update: UpdateQuery<T>,
        options?: QueryOptions<T>
    }) => {
        return await this.model.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
            ...options
        });
    }

    findOneAndUpdate = async ({ filter, update, options = {} }: {
        filter: QueryFilter<T>,
        update: UpdateQuery<T>,
        options?: QueryOptions<T>
    }) => {
        return await this.model.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
            ...options
        });
    }

    deleteOne = async ({ filter }: {
        filter: QueryFilter<T>
    }) => {
        return await this.model.deleteOne(filter);
    }

    deleteMany = async ({ filter }: {
        filter: QueryFilter<T>
    }) => {
        return await this.model.deleteMany(filter);
    }

}