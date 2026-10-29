import{O as c}from"./index-BE6-6OX1.js";import{g as p,a as f,s as l,c as g,b as h}from"./initShared-C9wJtlgC.js";const m=document.getElementById("bar");let e=[],a={currentId:null,active:!1},o=!1;async function s(){try{e=await p(),a=await f(),c.room.getMetadata().then(i=>{const r=i["com.pf1card.init/turn"];r&&(a=r)}).catch(()=>{}),d()}catch{}}function d(){const i=e.find(t=>t.id===a.currentId),r=e.map((t,n)=>`
    <div class="chip ${t.id===a.currentId?"cur":""}" data-id="${t.id}">
      <span class="init">${t.init}</span>
      <span class="nm">${v(t.name)}</span>
      ${o?`<button class="x" data-remove="${t.id}">×</button>`:""}
    </div>`).join("");m.innerHTML=`
    <div class="barinner">
      <div class="left">
        <button class="b" id="prev" title="上一回合">◀</button>
        <button class="b primary" id="start">${a.active?"重新开始":"开始战斗"}</button>
        <button class="b" id="next">下一回合 ▶</button>
        <button class="b" id="end">结束</button>
      </div>
      <div class="list">${r||'<span class="empty">右键 Token → 「加入先攻」,或先在插件里添加</span>'}</div>
      <div class="right">
        ${i?`<span class="now">当前:${v(i.name)}</span>`:'<span class="empty">未开始</span>'}
        <button class="b" id="close" title="关闭先攻条">✕</button>
      </div>
    </div>`,document.getElementById("close").addEventListener("click",()=>{c.modal.close("com.pf1card.initbar")}),document.getElementById("start").addEventListener("click",async()=>{e.length&&(await l({currentId:e[0].id,active:!0}),a={currentId:e[0].id,active:!0},d())}),document.getElementById("next").addEventListener("click",async()=>{if(!e.length)return;const t=Math.max(0,e.findIndex(u=>u.id===a.currentId)),n=e[(t+1)%e.length];await l({currentId:n.id,active:!0}),a={currentId:n.id,active:!0},d()}),document.getElementById("prev").addEventListener("click",async()=>{if(!e.length)return;const t=Math.max(0,e.findIndex(u=>u.id===a.currentId)),n=e[(t-1+e.length)%e.length];await l({currentId:n.id,active:!0}),a={currentId:n.id,active:!0},d()}),document.getElementById("end").addEventListener("click",async()=>{await l({currentId:null,active:!1}),a={currentId:null,active:!1},d()}),m.querySelectorAll("[data-remove]").forEach(t=>t.addEventListener("click",async n=>{if(n.stopPropagation(),!o){c.notification.show("只有 DM 可以移除","WARNING");return}await g([t.dataset.remove]),s()})),m.querySelectorAll(".chip").forEach(t=>t.addEventListener("dblclick",async()=>{const n=window.prompt("修改先攻","0");n!==null&&(await h([t.dataset.id],Number(n)),s())}))}function v(i){return String(i??"").replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r])}c.onReady(async()=>{try{o=await c.player.getRole()==="GM"}catch{o=!1}await s();try{c.scene.items.onChange(()=>s())}catch{}try{c.room.onMetadataChange(()=>s())}catch{}e.length||await s()});
