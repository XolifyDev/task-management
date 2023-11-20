import { Socket, Server as NetServer } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Database } from "./db/schema";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export type Company = Database["public"]["Tables"]["companies"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserCompanies =
  Database["public"]["Tables"]["usercompanies"]["Row"] & {
    user: User;
    company: Company;
  };
