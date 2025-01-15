// server.ts
function getClientHtml(): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Under Construction</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f4;
        color: #555;
      }
      .container {
        text-align: center;
        max-width: 600px;
      }
      h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 20px;
      }
      p {
        font-size: 1.2rem;
        margin-bottom: 30px;
      }
      .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="loader"></div>
      <h1>Development Phase</h1>
      <p>This site is currently under construction. Stay tuned!</p>
    </div>
  </body>
  </html>`;
}

Deno.serve((request: Request) => {
  const { headers } = request;

  // Handle WebSocket connections when requested
  if (headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.onmessage = (_e) => {
      console.log("Received a WebSocket message");
      socket.send("pong");
    };

    return response;
  }

  // Return the HTML content as the default response
  const body = new TextEncoder().encode(getClientHtml());
  return new Response(body, {
    headers: {
      "Content-Type": "text/html",
    },
  });
});
