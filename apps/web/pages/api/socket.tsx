import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (res.socket?.server && !res.socket.server.io) {
    console.log("socket initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  } else {
    console.log("socket already running");
  }

  res.end();
}
