import cron from "node-cron";
import prisma from "../prisma/client.js";

export const expireBookings = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Cron: Checking for expired bookings...");

    const now = new Date();

    const expiredBookings = await prisma.booking.findMany({
      where: {
        status: "PENDING",
        expiresAt: { lt: now },
      },
    });
    for (const booking of expiredBookings) {
      console.log(`Expiring booking ID: ${booking.id}`);

      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: "EXPIRED" },
      });

      await prisma.seat.update({
        where: { id: booking.seatId },
        data: { status: "AVAILABLE" },
      });

      if (expireBookings.length > 0) {
        console.log(`${expireBookings.length} bookings expired successfully`);
      }
    }
  });
};
