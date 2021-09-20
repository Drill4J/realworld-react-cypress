const { exec } = require('child_process');
const os = require('os');

module.exports = {
  executeCommand,
}

async function executeCommand(cmd, delay = 100) {
  console.log('\x1b[33m%s\x1b[0m', cmd); // print cmd in yellow
  const options = {};
  if (os.platform() === 'win32') {
    (options).shell = 'bash';
  }
  const data = await new Promise((resolve, reject) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        err.stderr = stderr;
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });
  await sleep(delay);
  return data;
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}