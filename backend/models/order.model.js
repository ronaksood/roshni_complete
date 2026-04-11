import mongoose from "mongoose";

const orderStatuses = [
  "confirmed",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
];

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: orderStatuses,
      default: "confirmed",
    },
    trackingNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    estimatedDeliveryDate: {
      type: Date,
    },
    stripeSessionId: {
      type: String,
      unique: true,
    },
    confirmationEmail: {
      sentAt: {
        type: Date,
      },
      lastAttemptAt: {
        type: Date,
      },
      recipient: {
        type: String,
        trim: true,
        lowercase: true,
      },
      error: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
export { orderStatuses };
