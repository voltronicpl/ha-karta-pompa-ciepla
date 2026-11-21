const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1672,height:941},deviceScaleFactor:1});
p.on('console',m=>console.log('C:',m.text()));p.on('pageerror',e=>console.log('PE:',e.message));
await p.goto('file://'+process.cwd()+'/preview.html');await p.waitForTimeout(800);
await p.locator('#card').screenshot({path:'prev.png'});await b.close();})();
