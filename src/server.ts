import fastify from 'fastify';
import * as os from 'os';

const server = fastify();

server.get('/', async (request, reply) => {
  const systemInfo = {
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    uptime: Math.floor(os.uptime()),
    totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024),
    freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024),
    cpus: os.cpus().length,
    nodeVersion: process.version
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>System Information</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .info-item { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>System Information</h1>
    <div class="info-item"><strong>Platform:</strong> ${systemInfo.platform}</div>
    <div class="info-item"><strong>Architecture:</strong> ${systemInfo.arch}</div>
    <div class="info-item"><strong>Hostname:</strong> ${systemInfo.hostname}</div>
    <div class="info-item"><strong>Uptime:</strong> ${systemInfo.uptime} seconds</div>
    <div class="info-item"><strong>Total Memory:</strong> ${systemInfo.totalMemory} GB</div>
    <div class="info-item"><strong>Free Memory:</strong> ${systemInfo.freeMemory} GB</div>
    <div class="info-item"><strong>CPU Cores:</strong> ${systemInfo.cpus}</div>
    <div class="info-item"><strong>Node.js Version:</strong> ${systemInfo.nodeVersion}</div>
</body>
</html>`;

  reply.type('text/html').send(html);
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();