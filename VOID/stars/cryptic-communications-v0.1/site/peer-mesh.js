/* Explicit WebRTC session layer for Cryptic Communications.
 * Nothing opens a microphone/camera until create() is called with media requested.
 */
(() => {
  "use strict";
  async function create(opts={}) {
    if (!window.CrypticComm) throw new Error("CrypticComm bridge client not loaded");
    const room=String(opts.room||"").trim(); if(!room) throw new Error("room required");
    const initiator=!!opts.initiator;
    const pc=new RTCPeerConnection({iceServers:Array.isArray(opts.iceServers)?opts.iceServers:[]});
    const seen=new Set(); let cursor=0, channel=null, timer=null, stream=null;

    const publish=message=>CrypticComm.action("signal.publish",{room,message});
    async function poll(){
      const r=await CrypticComm.action("signal.poll",{room,after:cursor});
      for(const e of r.events||[]){
        cursor=Math.max(cursor,e.ts||0); if(seen.has(e.id))continue; seen.add(e.id);
        const m=e.message||{};
        if(m.type==="offer"&&!initiator){await pc.setRemoteDescription(m.sdp);const ans=await pc.createAnswer();await pc.setLocalDescription(ans);await publish({type:"answer",sdp:pc.localDescription})}
        else if(m.type==="answer"&&initiator&&!pc.currentRemoteDescription){await pc.setRemoteDescription(m.sdp)}
        else if(m.type==="ice"&&m.candidate){try{await pc.addIceCandidate(m.candidate)}catch{}}
      }
    }
    pc.onicecandidate=e=>{if(e.candidate)publish({type:"ice",candidate:e.candidate}).catch(()=>{})};
    pc.ondatachannel=e=>{channel=e.channel; opts.onChannel?.(channel)};
    if(opts.audio||opts.video){
      stream=await navigator.mediaDevices.getUserMedia({audio:!!opts.audio,video:!!opts.video});
      for(const track of stream.getTracks())pc.addTrack(track,stream);
      opts.onLocalStream?.(stream);
    }
    pc.ontrack=e=>opts.onRemoteStream?.(e.streams[0],e);
    if(initiator){
      channel=pc.createDataChannel("cryptic"); opts.onChannel?.(channel);
      const offer=await pc.createOffer();await pc.setLocalDescription(offer);await publish({type:"offer",sdp:pc.localDescription});
    }
    timer=setInterval(()=>poll().catch(()=>{}),1000);
    await poll();
    return {
      pc,
      get channel(){return channel},
      localStream:stream,
      close(){clearInterval(timer);try{channel?.close()}catch{};try{pc.close()}catch{};for(const t of stream?.getTracks?.()||[])t.stop()}
    };
  }
  window.CrypticPeer={create};
})();