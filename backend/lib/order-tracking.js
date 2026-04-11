const ORDER_PHASES = [
  {
    key: "confirmed",
    label: "Order placed",
    description: "Your payment is confirmed and the order is being prepared.",
    offsetMs: 0,
  },
  {
    key: "packed",
    label: "Packed",
    description: "Your items are packed carefully and ready for dispatch.",
    offsetMs: 6 * 60 * 60 * 1000,
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on the way to your delivery hub.",
    offsetMs: 24 * 60 * 60 * 1000,
  },
  {
    key: "out_for_delivery",
    label: "Out for delivery",
    description: "The package is with the delivery partner for final delivery.",
    offsetMs: 3 * 24 * 60 * 60 * 1000,
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order has reached its destination.",
    offsetMs: 5 * 24 * 60 * 60 * 1000,
  },
];

const STATUS_INDEX = ORDER_PHASES.reduce((acc, phase, index) => {
  acc[phase.key] = index;
  return acc;
}, {});

export const generateTrackingNumber = () =>
  `ECM-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

export function getTrackingSnapshot(orderDoc) {
  const createdAt = new Date(orderDoc.createdAt);
  const now = new Date();
  const elapsedMs = now.getTime() - createdAt.getTime();

  const derivedStatusIndex = ORDER_PHASES.reduce((index, phase, phaseIndex) => {
    if (elapsedMs >= phase.offsetMs) {
      return phaseIndex;
    }
    return index;
  }, 0);

  const storedStatusIndex = STATUS_INDEX[orderDoc.status] ?? 0;
  const currentStatusIndex = Math.max(derivedStatusIndex, storedStatusIndex);
  const currentPhase = ORDER_PHASES[currentStatusIndex];
  const estimatedDeliveryDate =
    orderDoc.estimatedDeliveryDate ||
    new Date(createdAt.getTime() + ORDER_PHASES.at(-1).offsetMs);

  return {
    currentStatus: currentPhase.key,
    currentLabel: currentPhase.label,
    estimatedDeliveryDate,
    phases: ORDER_PHASES.map((phase, index) => ({
      ...phase,
      state:
        index < currentStatusIndex
          ? "completed"
          : index === currentStatusIndex
          ? "current"
          : "upcoming",
      completedAt:
        index <= currentStatusIndex
          ? new Date(createdAt.getTime() + phase.offsetMs)
          : null,
    })),
  };
}
