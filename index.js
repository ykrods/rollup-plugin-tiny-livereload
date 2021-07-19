/**
 * rollup-plugin-tiny-livereload
 */
const http = require("http");


function createServer(port) {
  let subscribers = [];

  function clearSubscribers() {
    subscribers = subscribers.filter(s => !s.finished);
  }

  function reload() {
    clearSubscribers();

    for (const sub of subscribers) {
      sub.write("event: livereload\ndata: {}", "utf-8");
      sub.write("\n\n");
    }
  }

  const server = http.createServer(async (request, response) => {
    if (request.url === "/watch") {
      response.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      });
      response.socket.on("close", () => {
        response.end();
        clearSubscribers();
      });
      subscribers.push(response);

    } else {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.end("Not Found", "utf-8");
    }
  });

  server.listen(port);
  return [server, reload];
}


function livereload() {
  let server = null;
  let reload = null;

  return {
    name: "tiny-livereload",
    async banner() {
      if (!server) {
        [server, reload] = createServer(5001);
      }
      const url = "//localhost:5001/watch";
      const code = `(function() {
  const evtSource = new EventSource("${url}");

  evtSource.addEventListener("livereload", (evt) => {
    evtSource.close();
    window.location.reload();
  });
})();`;
      return code;
    },
    writeBundle() {
      reload && reload();
    },
  }
}
module.exports = livereload;
