// pages/api/login.js

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      // Get the username and password from the request body
      const { username, password } = req.body;

      // Here you can check the username and password, for example:
      if (username === "admin" && password === "password") {
        // If the username and password match, return a success response
        res.status(200).json({ success: true });
      } else {
        // If the username and password don't match, return an error response
        res.status(400).json({ success: false });
      }
      break;
    default:
      // If the method is not POST, return an error response
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}