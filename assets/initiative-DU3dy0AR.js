import{O as r}from"./index-B5PTVloH.js";import{b as y,I as E,d as h,c as g}from"./initShared-BPUwdf5h.js";const v=document.getElementById("bar"),p="com.pf1card.initbar";let t={list:[],turn:0,active:!1,top:8,width:0},l=!1;const f=e=>String(e??"").replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i]);async function u(e){t=e,await g(e),m()}function m(){const e=t.list[t.turn],i=t.list.map((n,s)=>`
    <div class="chip ${s===t.turn&&t.active?"cur":""}" data-id="${n.id}">
      <span class="init">${n.init}</span><span class="nm">${f(n.name)}</span>
      ${l?`<button class="x" data-remove="${n.id}">×</button>`:""}
    </div>`).join("");v.innerHTML=`
    <div class="barinner" id="dragHandle">
      <div class="left">
        ${l?`<button class="b primary" id="start">${t.active?"重新开始":"开始战斗"}</button>`:""}
        <button class="b" id="prev">◀</button>
        <button class="b" id="next">下一回合 ▶</button>
        ${l?'<button class="b" id="end">结束</button>':""}
      </div>
      <div class="list">${i||'<span class="empty">等待加入先攻…</span>'}</div>
      <div class="right">
        ${e?`<span class="now">第${t.turn+1}位:${f(e.name)}</span>`:'<span class="empty">未开始</span>'}
        <button class="b" id="close">✕</button>
      </div>
    </div>`,document.getElementById("close").addEventListener("click",()=>r.popover.close(p));const c=document.getElementById("start");c&&c.addEventListener("click",async()=>{t.list.length&&await u({...t,list:h(t.list),active:!0,turn:0})}),document.getElementById("next").addEventListener("click",()=>w(1)),document.getElementById("prev").addEventListener("click",()=>w(-1));const d=document.getElementById("end");d&&d.addEventListener("click",async()=>{await u({...t,active:!1,turn:0}),r.popover.close(p)}),v.querySelectorAll("[data-remove]").forEach(n=>n.addEventListener("click",async s=>{s.stopPropagation(),await u({...t,list:t.list.filter(a=>a.id!==n.dataset.remove)})})),v.querySelectorAll(".chip").forEach(n=>n.addEventListener("dblclick",async()=>{if(!l)return;const s=t.list.find(o=>o.id===n.dataset.id),a=window.prompt("修改先攻",String(s.init));a!==null&&await u({...t,list:h(t.list.map(o=>o.id===s.id?{...o,init:Number(a)||0}:o))})})),b()}async function w(e){t.list.length&&await u({...t,turn:(t.turn+e+t.list.length)%t.list.length,active:!0})}function b(){const e=document.getElementById("dragHandle");if(!e)return;let i=!1,c=0,d=t.top;e.addEventListener("pointerdown",a=>{a.target.closest("button")||(i=!0,c=a.clientY,d=t.top,window.addEventListener("pointermove",n),window.addEventListener("pointerup",s,{once:!0}))});const n=a=>{if(!i)return;const o=Math.max(0,Math.min(500,d+(a.clientY-c)));t.top=o,r.popover.open({id:p,url:location.pathname,width:t.width||1e3,height:56,anchorPosition:{left:Math.floor((window.screen.width||1200)/2),top:o},anchorOrigin:{horizontal:"CENTER",vertical:"TOP"},transformOrigin:{horizontal:"CENTER",vertical:"TOP"},hidePaper:!0,disableClickAway:!0}).catch(()=>{})},s=async()=>{i=!1,window.removeEventListener("pointermove",n),await g({...t,top:t.top})}}r.onReady(async()=>{try{l=await r.player.getRole()==="GM"}catch{}t=await y(),t.width=Math.max(480,Math.min(1100,Math.floor(window.innerWidth||1e3))),m(),r.room.onMetadataChange(e=>{const i=e[E];if(i){if(t={...t,...i},!i.active){r.popover.close(p).catch(()=>{});return}m()}})});
