(() => {
  "use strict";
  const bc = "BroadcastChannel" in self ? new BroadcastChannel("cryptic-communications-v1") : null;
  const state = {
    bridge: localStorage.getItem("cryptic.bridge.url") || "http://127.0.0.1:8788",
    token: sessionStorage.getItem("cryptic.bridge.token") || ""
  };
  const setBridge = url => { state.bridge=new URL(url).origin; localStorage.setItem("cryptic.bridge.url",state.bridge); return state.bridge; };
  const setToken = token => { state.token=String(token||""); state.token?sessionStorage.setItem("cryptic.bridge.token",state.token):sessionStorage.removeItem("cryptic.bridge.token"); };
  async function call(path, body) {
    const h={"Content-Type":"application/json"}; if(state.token)h.Authorization="Bearer "+state.token;
    const r=await fetch(state.bridge+path,{method:body?"POST":"GET",headers:h,body:body?JSON.stringify(body):undefined});
    const t=await r.text(); let j; try{j=JSON.parse(t)}catch{j={text:t}}; if(!r.ok)throw new Error(j.error||("HTTP "+r.status)); return j;
  }
  const action=(id,payload={})=>call("/v1/action",{id,payload});
  function out(v,cls="text-emerald-300"){
    const el=document.getElementById("term-output-stream"); if(!el)return;
    const d=document.createElement("div"); d.className=cls+" whitespace-pre-wrap"; d.textContent="["+new Date().toLocaleTimeString()+"] "+(typeof v==="string"?v:JSON.stringify(v,null,2)); el.appendChild(d); el.scrollTop=el.scrollHeight;
  }
  function fallback(cmd,why){
    out("LIVE bridge unavailable/unsupported — virtual fallback: "+why,"text-amber-300");
    if(typeof window.processVirtualTerminalCommand==="function") document.getElementById("term-output-stream")?.insertAdjacentHTML("beforeend",window.processVirtualTerminalCommand(cmd));
  }
  function bind(){
    const f=document.querySelector('form[hx-post="/api/terminal/execute"]'), i=document.getElementById("term-cmd-input");
    if(!f||!i||f.dataset.crypticBound)return; f.dataset.crypticBound="1";
    f.addEventListener("submit",async e=>{
      e.preventDefault();e.stopImmediatePropagation();const cmd=i.value.trim();i.value="";if(!cmd)return;out("$ "+cmd,"text-pink-300");
      try{
        if(cmd==="bridge:status") out(await action("system.status"));
        else if(cmd==="bridge:atoms") out(await action("system.atoms"));
        else if(cmd==="vector:status") out(await action("vector.status"));
        else if(cmd==="synapse:status") out(await action("synapse.status"));
        else if(cmd==="pyghidra:status") out(await action("pyghidra.status"));
        else if(/^ai\s*:/i.test(cmd)) out(await action("ai.dual",{prompt:cmd.replace(/^ai\s*:/i,"").trim()}));
        else fallback(cmd,"not an allowlisted live action");
      }catch(err){fallback(cmd,err.message)}
    },true);
  }
  function refs(){
    if(document.getElementById("cryptic-quickrefs"))return;
    const b=document.createElement("div");b.id="cryptic-quickrefs";b.style.cssText="position:fixed;right:14px;bottom:66px;z-index:55;padding:7px 9px;background:rgba(2,6,23,.92);border:1px solid rgba(34,211,238,.35);border-radius:9px;font:10px ui-monospace;display:flex;gap:8px";
    for(const [n,u] of [["G-A","https://share.google/aimode/HC7n2Ft23AtIdNeS3"],["G-B","https://share.google/aimode/GLT1lttzwHAP4zqdV"]]){const a=document.createElement("a");a.href=u;a.target="_blank";a.rel="noopener noreferrer";a.textContent=n;a.style.color="#67e8f9";b.appendChild(a)} document.body.appendChild(b);
  }
  bc && (bc.onmessage=e=>{if(e.data?.type==="CRYPTIC_EVENT")out("TAB "+JSON.stringify(e.data.payload),"text-purple-300")});
  window.CrypticComm={state,setBridge,setToken,action,publish:p=>bc?.postMessage({type:"CRYPTIC_EVENT",payload:p,ts:Date.now()})};
  addEventListener("DOMContentLoaded",()=>{bind();refs()});
})();