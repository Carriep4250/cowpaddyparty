import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const tickets = mysqlTable("tickets", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  certificateOrderNumber: varchar("certificate_order_number", { length: 100 }).notNull(),
  ticketNumber: varchar("ticket_number", { length: 20 }).notNull().unique(),
  verified: varchar("verified", { length: 10 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
