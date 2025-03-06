import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useTelemetry() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      // withCredentials: true,
      // extraHeaders: { apikey: API_KEY },
      // jsonp: false,
      // agent: "-",
      // pfx: "-",
      // cert: "-",
      // ca: "-",
      // ciphers: "-",
      // rejectUnauthorized: "-",
      // perMessageDeflate: "-",
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, []);

  return socket;
}
