const defaultPhotos=[
  {src:"fotos/recuerdo-01.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-02.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-03.jpg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-04.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-05.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-06.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-07.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-08.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-09.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-10.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-11.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-12.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-13.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-14.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-15.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-16.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-17.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-18.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-19.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-20.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-21.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-22.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-23.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-24.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-25.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-26.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-27.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-28.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-29.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-30.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-31.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-32.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-33.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-34.jpeg",caption:"Nuestro recuerdo ❤️"},
  {src:"fotos/recuerdo-35.jpeg",caption:"Nuestro recuerdo ❤️"}
];
const defaultReasons=[
 "Tu sonrisa","La forma en que me miras","Tus abrazos",
 "Cómo me haces reír","Tu manera de querer","Porque contigo puedo ser yo",
 "Cada aventura contigo","Porque eres mi persona favorita"
];
let photos=defaultPhotos.slice();
let customAudio=null;

function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function startExperience(){scrollToId("historia");}
function renderGallery(){
 const g=document.getElementById("gallery"); g.innerHTML="";
 photos.forEach((p,i)=>{
  const card=document.createElement("div"); card.className="photo-card";
  card.innerHTML=`<img src="${p.src}" alt="Recuerdo ${i+1}"><div class="caption">${p.caption||"Nuestro recuerdo ❤️"}</div>`;
  card.onclick=()=>openLightbox(p.src); g.appendChild(card);
 });
}
function renderReasons(){
 const g=document.getElementById("reasonsGrid"); g.innerHTML="";
 defaultReasons.forEach((r,i)=>{
  const c=document.createElement("div"); c.className="reason";
  c.innerHTML=`<div class="reason-inner"><div class="reason-front">RAZÓN ${i+1}<br>♥</div><div class="reason-back">${r}</div></div>`;
  c.onclick=()=>c.classList.toggle("flipped"); g.appendChild(c);
 });
}
function openLetter(){
 const e=document.getElementById("envelope"); e.classList.toggle("open");
 document.getElementById("letterText").classList.toggle("hidden");
}
function openLightbox(src){document.getElementById("lightboxImg").src=src;document.getElementById("lightbox").classList.remove("hidden")}
function closeLightbox(){document.getElementById("lightbox").classList.add("hidden")}
function openEditor(){
 document.getElementById("editorModal").classList.remove("hidden");
 document.getElementById("titleInput").value=localStorage.getItem("annivTitle")||"";
 document.getElementById("dateInput").value=localStorage.getItem("annivDate")||"";
 document.getElementById("letterInput").value=localStorage.getItem("annivLetter")||"";
}
function closeEditor(){document.getElementById("editorModal").classList.add("hidden")}
function saveSettings(){
 const title=document.getElementById("titleInput").value.trim();
 const date=document.getElementById("dateInput").value;
 const letter=document.getElementById("letterInput").value.trim();
 if(title)localStorage.setItem("annivTitle",title); else localStorage.removeItem("annivTitle");
 if(date)localStorage.setItem("annivDate",date); else localStorage.removeItem("annivDate");
 if(letter)localStorage.setItem("annivLetter",letter); else localStorage.removeItem("annivLetter");
 const pi=document.getElementById("photoInput");
 if(pi.files.length){
   [...pi.files].forEach(file=>{
    const reader=new FileReader();
    reader.onload=e=>{photos.push({src:e.target.result,caption:"Un recuerdo nuestro ❤️"});localStorage.setItem("annivPhotos",JSON.stringify(photos));renderGallery()};
    reader.readAsDataURL(file);
   });
 }
 const ai=document.getElementById("audioInput");
 if(ai.files[0]){
   customAudio=URL.createObjectURL(ai.files[0]);
   document.getElementById("music").src=customAudio;
   document.getElementById("musicName").textContent="Únicos — Siddhartha";
 }
 applySettings(); closeEditor();
}
function applySettings(){
 const title=localStorage.getItem("annivTitle");
 if(title) document.querySelector(".hero h1").innerHTML=title.replace(/\n/g,"<br>")+"<br><span>2 años de nosotros</span>";
 const letter=localStorage.getItem("annivLetter");
 if(letter) document.getElementById("letterText").innerHTML=letter.split(/\n+/).map(x=>`<p>${x}</p>`).join("");
}
function resetCustom(){
 localStorage.removeItem("annivTitle");localStorage.removeItem("annivDate");localStorage.removeItem("annivLetter");localStorage.removeItem("annivPhotos");
 photos=defaultPhotos; renderGallery(); applySettings(); closeEditor();
}
function toggleMusic(){
 const a=document.getElementById("music");
 if(!a.src || a.src.endsWith(location.pathname)){alert("Primero agrega tu archivo de 'Únicos' desde Modo editar.");return}
 if(a.paused){a.play();document.getElementById("musicBtn").textContent="❚❚"}else{a.pause();document.getElementById("musicBtn").textContent="▶"}
}
function createHearts(){
 const c=document.getElementById("hearts");
 for(let i=0;i<18;i++){const s=document.createElement("span");s.textContent="♥";s.style.position="fixed";s.style.left=Math.random()*100+"vw";s.style.top=Math.random()*100+"vh";s.style.opacity=.03+Math.random()*.08;s.style.fontSize=10+Math.random()*25+"px";s.style.pointerEvents="none";s.style.animation=`float ${8+Math.random()*10}s linear infinite`;c.appendChild(s)}
}
renderGallery();renderReasons();applySettings();createHearts();

const style=document.createElement("style");
style.textContent="@keyframes float{from{transform:translateY(30px)}to{transform:translateY(-120px)}}";
document.head.appendChild(style);
