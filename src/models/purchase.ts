import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courseId: {
            type: Number,
            required: true,
        },
        paymentId: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

const Purchase =
    mongoose.models.Purchase ||
    mongoose.model("Purchase", purchaseSchema);

export default Purchase;
