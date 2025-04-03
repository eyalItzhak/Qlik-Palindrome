import mongoose from "mongoose";

export const buildQuery = (params: Record<string, any>, fieldGroups: { [key: string]: string[] }) => {
    const query: Record<string, any> = {};
    Object.entries(fieldGroups).forEach(([group, fields]) => {
        fields.forEach(field => {
            if (params[field] !== undefined) {
                if (group === "id") {
                    query[field] = new mongoose.Types.ObjectId(params[field]);
                } else {
                    query[field] = params[field];
                }
            }
        });
    });

    return query;
};