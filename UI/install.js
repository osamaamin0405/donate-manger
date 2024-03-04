const path = require("path");
const {spawn} = require("node:child_process");
const { exec } = require("child_process");
const uitl = require("util");

const workPath = path.join(__dirname, "./");

const e = uitl.promisify(exec)

async function installDepencies(){
    console.log('1/2 installing depencies Please wait.............')
    await e('npm install --force', {cwd: workPath}, function(err, stdout, stderr ){
        if(err) return console.error(err);
        if(stderr) return console.log(stderr.toString());
        console.log(stdout.toString());
        console.log('Depencies installed successfuly :)')
    });
}

async function createProduction(){
    console.log('2/2 Build Produnction Code Please wait ...............')
    await e('npm run build', {cwd: workPath}, function(err, stdout, stderr ){
        if(err) return console.error(err);
        if(stderr) return console.log(stderr.toString());
        console.log(stdout.toString());
        console.log('Production Code Build Successfuly:) check ./build folder');
    });
}



function install(){
    installDepencies();
    createProduction();
}

install();
