const path = require("path");
const createAdmin = require("./migrate");
const {spawn} = require("node:child_process");
const fse = require('fs-extra');
const { exec } = require("child_process");
const uitl = require("util");

const workPath = path.join(__dirname, "../");

const e = uitl.promisify(exec)

async function installDepencies(){
    console.log('1/7 installing depencies Please wait.............')
    await e('npm install --force', {cwd: workPath}, function(err, stdout, stderr ){
        if(err) return console.error(err);
        if(stderr) return console.log(stderr.toString());
        console.log(stdout.toString());
        console.log('Depencies installed successfuly :)')
    });
}

async function createProduction(){
    console.log('2/7 Build Produnction Code Please wait ...............')
    await e('npm run build', {cwd: workPath}, function(err, stdout, stderr ){
        if(err) return console.error(err);
        if(stderr) return console.log(stderr.toString());
        console.log(stdout.toString());
        console.log('Production Code Build Successfuly:) check ./dist folder');
    });
}

function copyDirsAndFiles(){
    try{
        console.log("3/7 copying 'uploads' folders")
        fse.copySync(path.join(workPath, "uploads"), path.join(workPath, "./dist", "uploads"), {recursive: true});
    }catch(e){
        console.error("Error while copy uploads dir \n " , e)
    }
    try{
        console.log("4/7 copying '.env' file")
        fse.copyFileSync(path.join(workPath, ".env"), path.join(workPath, "./dist", ".env"))
    }catch(e){
        console.error("Can't copy .env file to dist", e)
    }
    try{
        console.log("5/7 copying 'node_modules' folder")
        fse.copySync(path.join(workPath, "node_modules"), path.join(workPath, "./dist", "node_modules"), {recursive: true});
    }catch(e){
        console.error("Error While copy node_mdules Dir", e);
    }

    try{
        console.log("6/7 copying 'start scripts' files")
        fse.copySync(path.join(workPath, "scripts"), path.join(workPath, "./dist"), {recursive: true});
    }catch(e){
        console.error("Can't copy start scripts", e);
    }

}


function install(){
    installDepencies();
    createProduction();
    copyDirsAndFiles();
    createAdmin();
}

install();
