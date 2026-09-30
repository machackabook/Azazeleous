#!/usr/bin/env node
import http from "node:http";
import {readFile,mkdir,writeFile,chmod} from "node:fs/promises";
import {randomBytes} from "node:crypto";
import {resolve,dirname,join} from "node:path";
import {fileURLToPath} from "node:url";

const HERE=dirname(fileURLToPath(import.meta.url)),ROOT=resolve(HERE,"..");
const HOST=process.env.CRYPTIC_HOST||"127.0.0.1",PORT=Number(process.env.CRYPTIC_PORT||8788);
const ALLOWED=(process.env.CRYPTIC_ALLOWED_ORIGINS||"http://127.0.0.1,http://localhost").split(",").map(x=>x.trim()).filter(Boolean);
const OLLAMA=(process.env.OLLAMA_URL||"http://127.0.0.1:11434").replace(/\/$/,"");
const WEAVIATE=(process.env.WEAVIATE_URL||"http://127.0.0.1:8080").replace(/\/$/,"");
const MILVUS=(process.env.MILVUS_URL||"http://127.0.0.1:19530").replace(/\/$/,"");
const SYNAPSE=(process.env.SYNAPSE_URL||"http://127.0.0.1:8787").replace(/\/$/,"");
const PYGHIDRA=(process.env.PYGHIDRA_STATUS_URL||"").replace(/\/$/,"");
const ATOMS=JSON.parse(await readFile(join(ROOT,"atoms.json"),"utf8"));
const ACTIONS=new Set(JSON.parse(await readFile(join(ROOT,"actions.json"),"utf8")).actions.map(x=>x.id));

async function token(){if(process.env.CRYPTIC_BRIDGE_TOKEN)return process.env.CRYPTIC_BRIDGE_TOKEN.trim();const d=join(ROOT,".cryptic"),p=join(d,"token");try{return(await readFile(p,"utf8")).trim()}catch{}await mkdir(d,{recursive:true});const t=randomBytes(32).toString("base64url");await writeFile(p,t+"\n",{mode:0o600});try{await chmod(p,0o600)}catch{}return t}
const TOKEN=await token();
function cors(req,res){const o=req.headers.origin;if(o&&ALLOWED.includes(o)){res.setHeader("Access-Control-Allow-Origin",o);res.setHeader("Vary","Origin")}res.setHeader("Access-Control-Allow-Headers","Authorization,Content-Type");res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS")}
function send(req,res,s,d){cors(req,res);res.writeHead(s,{"Content-Type":"application/json;charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(d,null,2))}
async function body(req){let a=[];for await(const c of req)a.push(c);return a.length?JSON.parse(Buffer.concat(a).toString("utf8")):{}}
async function jfetch(url,opt={},ms=5000){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);try{const r=await fetch(url,{...opt,signal:c.signal});const x=await r.text();let j;try{j=JSON.parse(x)}catch{j={text:x}};if(!r.ok)throw new Error("HTTP "+r.status);return j}finally{clearTimeout(t)}}
const auth=req=>(req.headers.authorization||"")==="Bearer "+TOKEN;
async function ollama(prompt){return jfetch(OLLAMA+"/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OLLAMA_MODEL||"llama3.2:1b",prompt,stream:false})},180000)}
async function gemini(prompt){const key=process.env.GEMINI_API_KEY;if(!key)throw new Error("GEMINI_API_KEY not configured");const model=process.env.GEMINI_MODEL||"gemini-2.5-flash";return jfetch("https://generativelanguage.googleapis.com/v1beta/models/"+encodeURIComponent(model)+":generateContent?key="+encodeURIComponent(key),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})},180000)}
async function vectorStatus(){const [w,m]=await Promise.allSettled([jfetch(WEAVIATE+"/v1/meta",{},3500),jfetch(MILVUS+"/v2/vectordb/collections/list",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"},3500)]);return{weaviate:w.status==="fulfilled",milvusKnowhere:m.status==="fulfilled"}}
async function synapseStatus(){const tok=process.env.SYNAPSE_TOKEN;if(!tok)throw new Error("SYNAPSE_TOKEN not configured");return jfetch(SYNAPSE+"/api/status",{headers:{"Authorization":"Bearer "+tok}},3500)}
async function pyghidraStatus(){if(!PYGHIDRA)return{configured:false};return{configured:true,status:await jfetch(PYGHIDRA+"/status",{},3500)}}

const rooms=new Map();
function signalPublish(room,message){
  const clean=String(room||"").replace(/[^A-Za-z0-9._-]/g,"").slice(0,80);
  if(!clean)throw new Error("room required");
  const q=rooms.get(clean)||[],item={id:Date.now()+"-"+randomBytes(4).toString("hex"),ts:Date.now(),message};
  q.push(item); if(q.length>300) q.splice(0,q.length-300); rooms.set(clean,q); return {room:clean,event:item};
}
function signalPoll(room,after=0){
  const clean=String(room||"").replace(/[^A-Za-z0-9._-]/g,"").slice(0,80);
  if(!clean)throw new Error("room required");
  return {room:clean,events:(rooms.get(clean)||[]).filter(x=>x.ts>Number(after||0))};
}
const server=http.createServer(async(req,res)=>{
 try{
  cors(req,res);if(req.method==="OPTIONS"){res.writeHead(204);return res.end()}
  const u=new URL(req.url,"http://localhost");if(u.pathname!=="/v1/action")return send(req,res,404,{error:"not found"});if(!auth(req))return send(req,res,401,{error:"unauthorized"});
  const b=await body(req),id=String(b.id||"");if(!ACTIONS.has(id))return send(req,res,403,{error:"action not allowlisted"});
  if(id==="system.status")return send(req,res,200,{name:"CRYPTIC-BRIDGE",version:"0.1.0",host:HOST,port:PORT});
  if(id==="system.atoms")return send(req,res,200,ATOMS);
  if(id==="vector.status")return send(req,res,200,await vectorStatus());
  if(id==="synapse.status")return send(req,res,200,await synapseStatus());
  if(id==="pyghidra.status")return send(req,res,200,await pyghidraStatus());
  if(id==="ai.dual"){const p=String(b.payload?.prompt||"").trim();if(!p)return send(req,res,400,{error:"prompt required"});const [o,g]=await Promise.allSettled([ollama(p),gemini(p)]);return send(req,res,200,{mode:"parallel",ollama:o.status==="fulfilled"?o.value:{error:o.reason?.message},gemini:g.status==="fulfilled"?g.value:{error:g.reason?.message}})}
  if(id==="signal.publish")return send(req,res,201,signalPublish(b.payload?.room,b.payload?.message));
  if(id==="signal.poll")return send(req,res,200,signalPoll(b.payload?.room,b.payload?.after));
  return send(req,res,501,{error:"action registered but not implemented"});
 }catch(e){return send(req,res,500,{error:e.message})}
});
server.listen(PORT,HOST,()=>{console.log("CRYPTIC-BRIDGE v0.1 http://"+HOST+":"+PORT);console.log("runtime token: "+TOKEN)});
