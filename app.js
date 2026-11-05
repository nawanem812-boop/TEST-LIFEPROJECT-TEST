function ecoCore(me){var TEST=/test/i.test(location.pathname),O=location.origin;
var A=[['routine','⏱️','Routine',TEST?'/TEST-ROUTINE-TEST/':'/Routine/'],['multi','📚',TEST?'Multi-DA (prod)':'Multi-DA','/Multi-DA/'],['life','🎯','LIFE-PROJECT',TEST?'/TEST-LIFEPROJECT-TEST/':'/LIFE-PROJECT-LASR/']];
function st(id){try{var P=TEST?'test:':'';
if(id=='multi'){if(TEST)return'Non lié (TEST)';return localStorage.getItem('courses')!==null?'Synchronisé':'Non connecté'}
if(id=='routine')return localStorage.getItem(P+'routine:v1')!==null?'Synchronisé':'Non connecté';
var l=localStorage.getItem(P+'majorpromo_v3');if(l===null)return'Non connecté';var s=JSON.parse(l)._saved;return s&&Date.now()-s>6048e5?'Données anciennes':'Synchronisé'}catch(e){return'Erreur'}}
function html(){return A.map(function(a){var s=a[0]==me?'ici':st(a[0]),c=s=='Synchronisé'?'ok':s=='ici'?'cur':s=='Données anciennes'?'old':s=='Erreur'?'err':'off';return'<a class="eco-i '+c+'" href="'+(a[0]==me?'#':O+a[3])+'"><span>'+a[1]+'</span><b>'+a[2]+'</b><em>'+s+'</em></a>'}).join('')}
return{A:A,st:st,html:html,TEST:TEST}}

function applyTheme(){try{const t=localStorage.getItem('life-theme')||'auto';if(t=='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t)}catch(e){}}applyTheme();
const $=s=>document.querySelector(s);
const TEST=/test/i.test(location.pathname),PF=TEST?'test:':'',VER='v5',KEY=PF+'majorpromo_v3';var saveErr=false;let D={};try{D=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
function idbOpen(cb){try{const r=indexedDB.open(PF+'majorpromo',1);r.onupgradeneeded=()=>r.result.createObjectStore('s');r.onsuccess=()=>cb(r.result);r.onerror=()=>cb(null)}catch(e){cb(null)}}
function idbSet(v){idbOpen(db=>{if(!db)return;try{db.transaction('s','readwrite').objectStore('s').put(v,'D')}catch(e){}})}
function idbGet(cb){idbOpen(db=>{if(!db)return cb();try{const g=db.transaction('s').objectStore('s').get('D');g.onsuccess=()=>cb(g.result);g.onerror=()=>cb()}catch(e){cb()}})}
const save=()=>{D._saved=Date.now();const s=JSON.stringify(D);try{localStorage.setItem(KEY,s);saveErr=false}catch(e){saveErr=true}idbSet(s)};
const ld=x=>x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');
const td=()=>ld(new Date());
const add=(d,n)=>{const x=new Date(d+'T12:00:00');x.setDate(x.getDate()+n);return ld(x)};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L=k=>D[k]||(D[k]=[]);
const S1=['S1','S2','S3','S4','S5','S6'];
const AX=['① Excellence académique','② Compétence clinique','③ Cohérence : pourquoi médecine ?','④ Maturité : pourquoi maintenant ?','⑤ Projection : pourquoi médecin ?'];
const M={
stages:{n:'Stages',f:[['lieu','Établissement / service','t'],['debut','Début','d'],['fin','Fin','d'],['obj','Objectifs (anatomie, physio, pharmaco, gestes)','a'],['journal','Journal : patient → problème → hypothèses → prise en charge → résultat','a'],['question','Question scientifique / à rechercher','a'],['bilan','Bilan : appris / incompris / compétences / lien médecine / lien recherche','a']]},
recherche:{n:'Recherche',f:[['sujet','Sujet / article','t'],['dom','Domaine','s',['Neurosciences','Cancérologie','Santé publique','Psychiatrie','Physiopathologie','IA en santé','Épidémiologie','Essais cliniques','Biologie','Tech médicales']],['q','Question','a'],['me','Méthode','a'],['re','Résultat','a'],['im','Implications','a'],['ret','Ce que je retiens','a'],['ev','Évolution possible','a'],['date','Date','d']]},
publications:{n:'Publications & posters',f:[['titre','Titre','t'],['type','Type','s',['Article','Poster','Communication orale','Preprint','Résumé/abstract','Autre']],['statut','Statut','s',['Idée','En rédaction','Soumis','Accepté','Publié / présenté']],['revue','Revue / congrès / lieu','t'],['date','Date','d'],['lien','Lien (DOI / URL)','t'],['resume','Résumé / ma contribution','a']]},
passerelle:{n:'Dossier passerelle',f:[['titre','Preuve (titre)','t'],['sem','Semestre','s',S1],['type','Type de preuve','s',['Notes','Classement','Stage','Évaluation','Compétence','Projet','Recherche','Formation','Responsabilité','Réflexion projet médical']],['axe','Axe du dossier servi','s',AX],['force','Force de la preuve','s',['Faible','Solide','Très solide'],'Solide'],['piece','Justificatif (fichier, lien, où le trouver)','t'],['det','Détail / preuve de progression','a'],['date','Date','d']]},
notes:{n:'Notes & classement',f:[['ue','UE / épreuve','t'],['sem','Semestre','s',S1],['type','Type','s',['Théorique','Pratique','Stage','Oral','Autre']],['note','Note /20','n'],['coef','Coefficient ou ECTS (vide = 1)','n'],['rang','Rang dans la promo','n'],['eff','Effectif de la promo','n'],['date','Date','d']]},
finance:{n:'Finance',f:[['date','Date','d'],['type','Type','s',['Revenu','Dépense','Épargne','Investissement','Formation/compétences']],['mt','Montant (€)','n'],['lib','Libellé','t']]},
sante:{n:'Santé',f:[['date','Date','d'],['som','Sommeil (h)','n'],['en','Énergie (1-5)','s',['1','2','3','4','5']],['sport','Sport','s',['Aucun','Salle','Pilates','Boxe','Vélo','Course','Autre']],['note','Ce qui a dérapé / bien marché','a']]},
formations:{n:'Formations',f:[['titre','Formation / certification','t'],['pf','Plateforme','t'],['st','Statut','s',['À commencer','En cours','Terminée','Abandonnée']],['pr','Progression %','n'],['ut','Utilité pour le plan','t']]},
projets:{n:'Projets',f:[['titre','Projet','t'],['cat','Catégorie','s',['Site / code','Recherche','Revenu','Stage/réseau','Master','Autre']],['st','Statut','s',['Idée','En cours','Terminé','En pause']],['next','Prochaine action','t']]},
reseau:{n:'Réseau',f:[['nom','Nom','t'],['role','Rôle / service','t'],['ctx','Contexte de rencontre','t'],['date','Dernier contact','d'],['next','Prochaine étape','t']]},
edt:{n:'Emploi du temps',f:[['jour','Jour','s',['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']],['debut','Début (HH:MM)','t'],['fin','Fin (HH:MM)','t'],['titre','Bloc (cours, stage, sport…)','t'],['type','Type','s',['Fixe','Variable']]]},
hebdo:{n:'Pilotage dimanche',f:[['date','Semaine du','d'],['etu','Études : progression, retards, erreurs','a'],['stg','Stages : compétences','a'],['rec','Recherche : article/question','a'],['fin','Finance : revenus/épargne','a'],['san','Santé : sommeil, sport','a'],['car','Carrière : une action','a'],['next','Priorités semaine suivante','a']]}
};
const SK=[['Sciences fondamentales + clinique',1],['Anglais scientifique',2],['Statistiques',3],['Recherche bibliographique',4],['Rédaction scientifique',5],['Excel / données',6],['Python',7],['IA en santé',8],['Communication scientifique',9]];
if(!D.comp)D.comp=SK.map(s=>0);
const TABS=[['home','🏠 Accueil'],['stages','🏥 Stages'],['recherche','🔬 Recherche'],['publications','📄 Publications'],['passerelle','🩺 Passerelle'],['notes','📊 Notes & rang'],['edt','🗓 EDT'],['finance','💰 Finance'],['sante','🏃 Santé'],['comp','🧠 Compétences'],['formations','🎓 Formations'],['projets','🛠 Projets'],['reseau','🤝 Réseau'],['hebdo','📅 Dimanche'],['portfolio','📁 Portfolio / CV'],['plan','🧭 Plan 2026-36'],['data','💾 Données']];
let tab=D.tab||'home';
function go(t){if(editK&&editK!=t){editK=null;editI=null}tab=t;D.tab=t;D.use=D.use||{};D.use[t]=(D.use[t]||0)+1;save();document.body.classList.remove('drawer');render();window.scrollTo(0,0)}
const ICO={home:'M3 10.5 12 3l9 7.5V21H3z M9 21v-6h6v6',hebdo:'M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4',plan:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M15.5 8.5l-2 5-5 2 2-5z',edt:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2',notes:'M5 21V11 M12 21V4 M19 21v-7',stages:'M4 21V6l8-3 8 3v15z M12 9v6 M9 12h6',comp:'M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z',formations:'M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z M8 4v16',recherche:'M9 3h6 M10 3v6l-5 10a1 1 0 0 0 1 2h12a1 1 0 0 0 1-2l-5-10V3',publications:'M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7 M9 17h7',passerelle:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v8 M8 12h8',portfolio:'M3 6h6l2 2h10v12H3z',finance:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M15 9.5a3.5 3.5 0 1 0 0 5 M8 11h5 M8 13h5',sante:'M3 12h4l3-8 4 16 3-8h4',projets:'M14 6a4 4 0 0 0 5 5l-9 9a2.5 2.5 0 0 1-3.5-3.5l9-9z',reseau:'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M17 11a2.5 2.5 0 1 0 0-5 M17 14c2.2 0 4 1.8 4 4',data:'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',menu:'M4 6h16 M4 12h16 M4 18h16',theme:'M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z'};
const svg=k=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${(ICO[k]||ICO.home).split(' M').map((p,i)=>`<path d="${i?'M'+p:p}"/>`).join('')}</svg>`;
const NG=[['Pilotage',['home','hebdo','plan','edt']],['Parcours académique',['notes','stages','comp','formations']],['Science',['recherche','publications']],['Passerelle',['passerelle','portfolio']],['Vie & capital',['finance','sante','projets','reseau']],['Système',['data']]];
const LBL=k=>k=='home'?'Tableau de bord':TABS.find(t=>t[0]==k)[1].replace(/^\S+\s/,'');
function themeLbl(){let t='auto';try{t=localStorage.getItem('life-theme')||'auto'}catch(e){}return{auto:'automatique',light:'clair',dark:'sombre'}[t]}
function themeCycle(){const o=['auto','light','dark'];let t='auto';try{t=localStorage.getItem('life-theme')||'auto';localStorage.setItem('life-theme',o[(o.indexOf(t)+1)%3])}catch(e){}applyTheme();nav()}
function nav(){const E=ecoCore('life'),use=D.use||{},fav=Object.keys(use).filter(k=>k!='home'&&k!='data'&&k!=tab&&M[k]||k=='comp'&&k!=tab).sort((x,y)=>use[y]-use[x]).slice(0,3);
const item=k=>`<button class="ni ${k==tab?'on':''}" onclick="go('${k}')">${svg(k)}<span>${LBL(k)}</span></button>`;
$('#side').innerHTML=`<div class="brand"><b>Programme Major</b><small>LIFE-PROJECT${TEST?' · <em class="tg">TEST</em>':''}</small></div>${tab!='home'?`<button class="ni back" onclick="go('home')">${svg('home')}<span>← Tableau de bord</span></button>`:''}${fav.length?`<div class="ng">Raccourcis</div>${fav.map(item).join('')}`:''}${NG.map(([g,ks])=>`<div class="ng">${g}</div>${ks.map(item).join('')}`).join('')}<div class="ng">Mon écosystème</div>${E.html()}<div class="ng">Affichage</div><button class="ni" onclick="themeCycle()">${svg('theme')}<span>Thème : ${themeLbl()}</span></button>`;
$('#bnav').innerHTML=[['home','Accueil'],['passerelle','Passerelle'],['notes','Notes'],['stages','Stages']].map(([k,l])=>`<button class="${k==tab?'on':''}" onclick="go('${k}')">${svg(k)}<small>${l}</small></button>`).join('')+`<button onclick="document.body.classList.toggle('drawer')">${svg('menu')}<small>Menu</small></button>`;
$('#top').innerHTML=(tab!='home'?`<button onclick="go('home')">←</button>`:'')+`<b>${LBL(tab)}${TEST?' · TEST':''}</b><button onclick="themeCycle()">${svg('theme')}</button>`}

/* ---- Progression composite ---- */
function targets(){return{stages:12,recherche:24,publications:3,passerelle:24,formations:1}}
function score(){const t=targets();const compAvg=D.comp.reduce((a,b)=>a+b,0)/(D.comp.length*5);
const pubDone=L('publications').filter(x=>x.statut=='Publié / présenté'||x.statut=='Accepté').length;
const formDone=L('formations').filter(x=>x.st=='Terminée').length;
const parts=[
['Stages',Math.min(1,L('stages').length/t.stages)],
['Recherche',Math.min(1,L('recherche').length/t.recherche)],
['Publications',Math.min(1,pubDone/t.publications)],
['Dossier passerelle',passScore()],
['Compétences',compAvg],
['Formations',Math.min(1,formDone/t.formations)]
];
const avg=parts.reduce((a,p)=>a+p[1],0)/parts.length;
return{avg,parts}}
function gauge(pct,big){const c=pct>=.66?'#2e8b57':pct>=.33?'#d08a1a':'#c0392b';return `<div class="${big?'traj':'bar'}" style="${big?`background:${c}`:''}">${big?Math.round(pct*100)+' % — progression globale du dossier':''}${big?'':`<i style="width:${Math.round(pct*100)}%;background:${c}"></i>`}</div>`}

/* ---- Stats & accueil ---- */
function stats(){
const w=d=>d>=add(td(),-6);const sa=L('sante').filter(x=>w(x.date));const som=sa.filter(x=>x.som);const sleep=som.length?som.reduce((a,x)=>a+ +x.som,0)/som.length:null;
const sport=sa.filter(x=>x.sport&&x.sport!='Aucun').length;const rech=L('recherche').filter(x=>x.date&&w(x.date)).length;
const fin=L('finance');const sum=t=>fin.filter(x=>x.type==t).reduce((a,x)=>a+(+x.mt||0),0);
const rev=sum('Revenu'),dep=sum('Dépense'),epargne=sum('Épargne'),invest=sum('Investissement'),formCost=sum('Formation/compétences');
const epargneInvest=epargne+invest;
const solde=Math.round((rev+epargneInvest-dep-formCost)*100)/100;
let streak=0;const ds=new Set(L('sante').map(x=>x.date));for(let i=0;ds.has(add(td(),-i));i++)streak++;
return{sleep,sport,rech,rev,dep,formCost,epargneInvest,solde,streak}}
function period(){const d=td();if(d<'2026-09-07')return['Avant la rentrée','IFSI 1 en septembre 2026'];if(d<'2027-09-01')return['IFSI 1 · 2026-2027','Excellence, méthodes M1-M5, stages, sport, sommeil'];if(d<'2028-09-01')return['IFSI 2 · 2027-2028','Différenciation : stages stratégiques, premiers projets de recherche'];if(d<'2029-09-01')return['IFSI 3 · 2028-2029','Dossier passerelle : notes, stages, mémoire, oral'];return['Après le DEI','Passerelle, spécialisation ou emploi IDE : options ouvertes']}
function timeline(){const W=320,x=y=>(y-2026)/10*W,now=new Date(),cy=now.getFullYear()+(now.getMonth()+now.getDate()/31)/12,seg=[[2026.7,2027.7,'IFSI 1','#1F4D3A'],[2027.7,2028.7,'IFSI 2','#2c6b52'],[2028.7,2029.7,'IFSI 3','#3f8a6c'],[2029.7,2036,'Passerelle · spécialisation · recherche (selon les données)','#C9A24B']];
return `<svg viewBox="0 0 ${W} 74" width="100%">${seg.map(([s,e,l,c])=>`<rect x="${x(s)}" y="22" width="${x(e)-x(s)-2}" height="22" rx="6" fill="${c}"/><text x="${x(s)+5}" y="37" font-size="8.5" style="fill:#fff">${e-s>1.5?'DEI → '+(e>2035?'médecine ? → recherche':''):l}</text>`).join('')}${[2026,2028,2030,2032,2034,2036].map(y=>`<text x="${x(y)}" y="60" font-size="8.5" text-anchor="middle">${y}</text><line x1="${x(y)}" x2="${x(y)}" y1="46" y2="50" stroke="currentColor" opacity=".4"/>`).join('')}<line x1="${x(Math.min(2036,Math.max(2026,cy)))}" x2="${x(Math.min(2036,Math.max(2026,cy)))}" y1="12" y2="48" stroke="#E8745A" stroke-width="2"/><text x="${x(Math.min(2036,Math.max(2026,cy)))}" y="9" font-size="8.5" text-anchor="middle" style="fill:#E8745A">aujourd'hui</text></svg>`}
function deadlines(){const t=td(),o=[];pchk().forEach(c=>{if(c.st!='Fait'&&c.due)o.push({d:c.due,l:c.t,tab:'passerelle',late:c.due<t})});L('stages').forEach(s=>{if(s.debut&&s.debut>=t)o.push({d:s.debut,l:'Début de stage : '+s.lieu,tab:'stages'})});return o.sort((p,q)=>p.d<q.d?-1:1).slice(0,5)}
function actions(){const a=[],t=td(),ck=pchk(),late=ck.filter(c=>c.st!='Fait'&&c.due&&c.due<t);
if(late.length)a.push(['Rattraper '+late.length+' échéance(s) du dossier passerelle','passerelle']);
const ax=AX.map(x=>({x,w:L('passerelle').filter(p=>p.axe==x).reduce((s,p)=>s+fw(p),0)})).sort((p,q)=>p.w-q.w)[0];if(ax&&ax.w<6)a.push(['Documenter l\'axe « '+ax.x.slice(2)+' » (poids '+ax.w+'/6)','passerelle']);
if(notesData().a.some(x=>+x.note<10))a.push(['Consolider les UE sous 10/20','notes']);
if(!L('sante').some(x=>x.date>=add(t,-2)))a.push(['Saisir sommeil et énergie (rien depuis 3 jours)','sante']);
if(stats().rech<1)a.push(['Lire un article et remplir 1 fiche recherche cette semaine','recherche']);
const lc=D.comp.map((v,i)=>[v,i]).sort((p,q)=>p[0]-q[0])[0];if(lc[0]<2)a.push(['Progresser en « '+SK[lc[1]][0]+' » (niveau '+lc[0]+'/5)','comp']);
if(Date.now()-(D._exp||0)>6048e5)a.push(['Exporter une sauvegarde','data']);
return a.slice(0,5)}
function multiOver(){if(TEST)return null;try{const c=JSON.parse(localStorage.getItem('courses')||'null');if(!Array.isArray(c))return null;let n=0;const t=td();c.forEach(x=>[['j0',0],['j3',3],['j7',7],['j30',30]].forEach(([k,o])=>{if(x.dateAdded&&!(x.checkpoints||{})[k]&&add(x.dateAdded,o)<t)n++}));return n}catch(e){return null}}
function routineToday(){try{const r=JSON.parse(localStorage.getItem(PF+'routine:v1')||'null');if(!r)return null;return Object.values((r.done||{})[td()]||{}).filter(Boolean).length}catch(e){return null}}
function weeksBars(){const w=[];for(let i=7;i>=0;i--){const a=add(td(),-7*i-6),b=add(td(),-7*i);w.push(L('recherche').filter(x=>x.date&&x.date>=a&&x.date<=b).length)}const mx=Math.max(3,...w),bw=300/8;return `<svg viewBox="0 0 300 80" width="100%">${w.map((v,i)=>`<rect x="${i*bw+6}" y="${64-v/mx*52}" width="${bw-12}" height="${v/mx*52}" rx="3" fill="#C9A24B"/><text x="${i*bw+bw/2}" y="${60-v/mx*52}" font-size="9" text-anchor="middle">${v||''}</text><text x="${i*bw+bw/2}" y="76" font-size="8.5" text-anchor="middle">S-${7-i||'0'}</text>`).join('')}</svg>`}
function semBars(){const d=notesData(),w=300/6;return `<svg viewBox="0 0 300 92" width="100%"><line x1="0" x2="300" y1="40" y2="40" stroke="currentColor" stroke-dasharray="3" opacity=".4"/>${d.sems.map((x,i)=>{const h=x.avg===null?0:x.avg*3.6;return `<rect x="${i*w+8}" y="${76-h}" width="${w-16}" height="${h}" rx="3" fill="${x.avg>=14?'#2E8B57':x.avg>=10?'#D08A1A':'#C0392B'}"/><text x="${i*w+w/2}" y="${72-h}" font-size="9" text-anchor="middle">${x.avg===null?'':x.avg.toFixed(1)}</text><text x="${i*w+w/2}" y="88" font-size="9" text-anchor="middle">${x.s}</text>`}).join('')}</svg>`}
function home(){const s=stats(),nd=notesData(),ck=pchk(),done=ck.filter(c=>c.st=='Fait').length,pw=L('passerelle').reduce((t,x)=>t+fw(x),0),axOk=AX.filter(x=>L('passerelle').filter(p=>p.axe==x).reduce((t,p)=>t+fw(p),0)>=6).length,per=period(),acts=actions(),dl=deadlines(),mo=multiOver(),rt=routineToday(),E=ecoCore('life');
const now=new Date(),h=now.getHours(),greet=h<5||h>=18?'Bonsoir':'Bonjour',ds=now.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const K=(v,l,c)=>`<div class="k ${c||''}"><b>${v}</b><span>${l}</span></div>`,cp=D.comp.reduce((t,x)=>t+x,0)/D.comp.length,pubs=L('publications').filter(x=>x.statut=='Publié / présenté'||x.statut=='Accepté').length;
const last=L('stages').slice().sort((p,q)=>(q.debut||'').localeCompare(p.debut||''))[0],tr=s.rev?Math.round(s.epargneInvest/s.rev*100)+' %':'—';
return `${bk()}<div class="hero"><h1>${greet} Naw</h1><p style="text-transform:capitalize">${ds}</p><span class="per">${per[0]}</span><p>${per[1]}</p></div>
<div class="dash2"><div class="card wide"><h3>Frise 2026 – 2036</h3>${timeline()}</div>
<div class="card"><h3>🎯 Actions prioritaires</h3>${acts.length?acts.map((x,i)=>`<div class="act" onclick="go('${x[1]}')"><i>${i+1}</i><span>${esc(x[0])}</span></div>`).join(''):'<p class="m">Rien d\'urgent : continue sur ta lancée.</p>'}</div>
<div class="card"><h3>📆 Prochaines échéances</h3>${dl.length?dl.map(x=>`<div class="ddl" onclick="go('${x.tab}')"><span>${esc(x.l)}</span><b class="${x.late?'late':''}">${esc(x.d)}${x.late?' ⚠':''}</b></div>`).join(''):'<p class="m">Aucune échéance datée. Ajoute des dates dans la checklist passerelle ou tes stages.</p>'}</div>
<div class="card wide"><h3>Indicateurs (indépendants, sans score unique)</h3><div class="grid">${K(nd.all===null?'—':nd.all.toFixed(2),'moyenne IFSI /20',nd.all===null?'':nd.all>=14?'good':nd.all>=10?'mid':'warn')}${K(done+'/'+ck.length,'pièces du dossier',done==ck.length?'good':'')}${K(axOk+'/5','axes documentés (poids ≥ 6)',axOk>=4?'good':axOk>=2?'mid':'warn')}${K(pw,'poids qualité des preuves')}${K(L('stages').length,'stages')}${K(s.rech,'fiches recherche · 7 j',s.rech?'good':'mid')}${K(pubs,'publications acceptées')}${K(cp.toFixed(1)+'/5','compétences (moy.)')}${K(s.sleep===null?'—':s.sleep.toFixed(1)+' h','sommeil moy. 7 j',s.sleep===null?'':s.sleep>=7?'good':s.sleep>=6?'mid':'warn')}${K(s.sport,'séances de sport · 7 j')}</div><p class="m">Ces indicateurs mesurent ta préparation, pas une probabilité d'admission.</p></div>
<div class="card"><h3>📊 Académique</h3>${semBars()}<p class="m">Moyenne par semestre. ${nd.a.filter(x=>+x.note<10).length?nd.a.filter(x=>+x.note<10).length+' note(s) sous 10/20.':'Aucune note sous 10/20.'} <a href="#" onclick="go('notes');return false">Détail →</a></p></div>
<div class="card"><h3>🔬 Recherche</h3>${weeksBars()}<p class="m">Fiches par semaine (8 dernières). ${L('recherche').length} fiche(s), ${L('publications').length} publication(s)/poster(s).</p></div>
<div class="card"><h3>🏥 Stages</h3><p class="m">${L('stages').length} stage(s) enregistré(s).${last?' Dernier : <b>'+esc(last.lieu)+'</b> ('+esc(last.debut)+').':' Aucun pour l\'instant.'}${last&&!last.bilan?' Bilan à rédiger.':''}</p></div>
<div class="card"><h3>💰 Finance</h3><div class="grid">${K(s.solde+' €','solde (calcul actuel)')}${K(tr,'taux d\'épargne')}${K(s.dep+' €','dépenses')}</div></div>
<div class="card"><h3>🧠 Compétences</h3>${SK.slice().map((x,i)=>[x[0],D.comp[i]]).sort((p,q)=>p[1]-q[1]).slice(0,3).map(x=>`<div class="row"><span class="m">${esc(x[0])}</span><span class="m">${x[1]}/5</span></div>${gauge(x[1]/5)}`).join('')}<p class="m">Les 3 plus faibles.</p></div>
<div class="card"><h3>😴 Sommeil · 14 jours</h3>${chart().replace(/^<div class="card"><h3>[^<]*<\/h3>/,'').replace(/<\/div>$/,'')}</div>
<div class="card wide"><h3>🧭 Mon écosystème</h3>${E.html()}<p class="m">Routine du jour : ${rt===null?'non connecté':rt+' bloc(s) cochés'} · Révisions en retard (Multi-DA) : ${mo===null?TEST?'non lié en TEST':'non connecté':mo}. Lecture seule : les données se partagent dans ce navigateur, pas entre appareils.</p></div></div>`}

let editK=null,editI=null,searchQ={};
function form(k){const m=M[k];const ed=editK==k&&editI!=null;const cur=ed?L(k)[editI]:null;
return `<div class="card" id="form_${k}"><h3>${ed?'✎ Modifier':'+ Ajouter'} — ${m.n}</h3>${m.f.map(([f,l,t,o,df])=>{const v=cur?(cur[f]||''):(df||'');return `<label>${l}</label>`+(t=='a'?`<textarea id="f_${f}">${esc(v)}</textarea>`:t=='s'?`<select id="f_${f}">${o.map(x=>`<option ${x==v?'selected':''}>${esc(x)}</option>`).join('')}</select>`:`<input id="f_${f}" type="${t=='d'?'date':t=='n'?'number':'text'}" value="${esc(v||(t=='d'&&!ed?td():''))}">`)}).join('')}<div class="row"><button class="btn" onclick="addI('${k}')">${ed?'💾 Enregistrer les modifications':'+ Ajouter'}</button>${ed?`<button class="btn s" onclick="cancelEdit()">Annuler</button>`:''}</div></div>`}
function addI(k){const it={};M[k].f.forEach(([f])=>it[f]=$('#f_'+f).value);if(!Object.values(it).some(v=>v&&v!=td()))return;
if(editK==k&&editI!=null){L(k)[editI]=it;editK=null;editI=null}else{L(k).unshift(it)}
save();render()}
function cancelEdit(){editK=null;editI=null;render()}
function editItem(k,i){editK=k;editI=i;render();setTimeout(()=>{const el=$('#form_'+k);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},0)}
function del(k,i){if(confirm('Supprimer ?')){L(k).splice(i,1);if(editK==k&&editI==i){editK=null;editI=null}save();render()}}
function searchbox(k){return `<input id="search_${k}" placeholder="🔎 Rechercher dans cette liste…" oninput="doSearch('${k}')" value="${esc(searchQ[k]||'')}">`}
function doSearch(k){searchQ[k]=$('#search_'+k).value;const el=$('#list_'+k);if(el)el.innerHTML=list(k)}
function list(k){const m=M[k];const q=(searchQ[k]||'').toLowerCase().trim();
let arr=L(k).map((x,i)=>({x,i}));
if(q)arr=arr.filter(o=>JSON.stringify(o.x).toLowerCase().includes(q));
if(k=='passerelle'){if(pf.sem)arr=arr.filter(o=>o.x.sem==pf.sem);if(pf.axe!=='')arr=arr.filter(o=>o.x.axe==AX[+pf.axe])}
const df=m.f.find(([f,l,t])=>t=='d');
if(df)arr=arr.slice().sort((a,b)=>(b.x[df[0]]||'').localeCompare(a.x[df[0]]||''));
if(!arr.length)return `<p class="m">${L(k).length?'Aucun résultat pour cette recherche.':'Rien pour l\'instant — ajoute ta première entrée ci-dessus.'}</p>`;
return arr.map(({x,i})=>`<div class="card"><div class="row"><b>${esc(x[m.f[0][0]])}</b><span><button class="btn s" onclick="editItem('${k}',${i})">✎</button> <button class="btn s" onclick="del('${k}',${i})">✕</button></span></div>${m.f.slice(1).filter(([f])=>x[f]).map(([f,l])=>`<div class="m"><b>${l.split(' (')[0].split(' :')[0]} :</b> ${esc(x[f])}</div>`).join('')}</div>`).join('')}
function extra(k){const a=L(k);
if(k=='finance'){const s=stats();const c=s.solde>=0?'var(--g)':'var(--r)';return `<div class="card" style="text-align:center"><span class="m">Solde total (recalculé en temps réel)</span><div style="font-size:32px;font-weight:700;color:${c}">${s.solde} €</div></div><div class="grid"><div class="k"><b>${s.rev} €</b><span>revenus</span></div><div class="k"><b>${s.dep} €</b><span>dépenses</span></div><div class="k"><b>${s.epargneInvest} €</b><span>épargné + investi</span></div><div class="k"><b>${s.formCost} €</b><span>formations/compétences</span></div></div><p class="m">Solde = revenus + épargne + investissements − dépenses − formations. Chaque ajout, modification ou suppression met ce chiffre à jour immédiatement. Ordre : sécurité → capital → compétences → zéro dette de consommation.</p>`}
if(k=='passerelle')return passX();
if(k=='notes')return notesX();
if(k=='sante')return chart()+`<p class="m">Sommeil + sport + récupération = variables de performance, pas des récompenses.</p>`;
if(k=='stages')return `<p class="m">Avant : anatomie, physio, pathologies, pharmaco, gestes. Pendant : patient → problème → hypothèses → prise en charge → résultat → question scientifique.</p>`;
if(k=='recherche')return `<p class="m">1 article/semaine suffit en L1. Grille : Question → Méthode → Résultat → Implications → Retenu → Évolution.</p>`;
if(k=='publications')return `<p class="m">Chaque fiche de recherche solide peut devenir un poster ou une communication. Vise au moins une trace écrite par stage/projet marquant (poster de stage, résumé de mémoire, communication en journée scientifique).</p>`;
return ''}
/* ---- Passerelle : checklist, axes, récit ---- */
const FW={'Faible':1,'Solide':2,'Très solide':3},fw=x=>FW[x.force]||2;
const PCHK=['Vérifier les conditions et le calendrier officiels de la passerelle (université)','Relevés de notes IFSI à jour','Attestations et évaluations de stage','CV à jour','Lettre de motivation / projet médical','Lettres de recommandation (cadre de santé, tuteur, enseignant)','Récit du PASS : parcours expliqué, pas caché','Preuves de recherche : fiches, poster, publications','Préparation de l\'oral (questions types, entraînement)','Pièces administratives et copies','Dépôt du dossier dans les délais'];
let pf={sem:'',axe:''};
function pchk(){if(!Array.isArray(D.pchk)||!D.pchk.length)D.pchk=PCHK.map(t=>({t,st:'À faire',due:''}));return D.pchk}
function passScore(){const a=L('passerelle'),w=a.reduce((s,x)=>s+fw(x),0),ck=pchk(),c=ck.filter(x=>x.st=='Fait').length/ck.length;return 0.6*Math.min(1,w/(targets().passerelle*2))+0.4*c}
function pcSet(i,f,v){pchk()[i][f]=v;save();render()}
function pcAdd(){const v=$('#pc_new').value.trim();if(!v)return;pchk().push({t:v,st:'À faire',due:''});save();render()}
function pcDel(i){if(confirm('Retirer cette ligne de la checklist ?')){pchk().splice(i,1);save();render()}}
function prSet(i,v){D.pr=D.pr||{};D.pr[i]=v;save()}
function pfS(k,v){pf[k]=pf[k]===v?'':v;render()}
function passX(){const a=L('passerelle'),ck=pchk(),done=ck.filter(c=>c.st=='Fait').length,t0=td(),late=ck.filter(c=>c.st!='Fait'&&c.due&&c.due<t0),nxt=ck.filter(c=>c.st!='Fait'&&c.due&&c.due>=t0).sort((x,y)=>x.due<y.due?-1:1)[0];
const ax=AX.map(t=>{const e=a.filter(x=>x.axe==t),w=e.reduce((s,x)=>s+fw(x),0);return{t,n:e.length,w,p:Math.min(1,w/6)}}),un=a.filter(x=>!x.axe).length,sc=passScore();
const chip=(on,fn,l)=>`<button class="btn s" style="${on?'outline:2px solid var(--o)':''}" onclick="${fn}">${l}</button> `;
return `<div class="card"><h3>🎯 État du dossier</h3>${gauge(sc,true)}<p class="m">Pièces faites : ${done}/${ck.length} · Preuves : ${a.length} (poids qualité ${a.reduce((s,x)=>s+fw(x),0)}) · ${late.length?`<b style="color:var(--r)">${late.length} en retard</b>`:'aucun retard'}${nxt?` · prochaine échéance : <b>${esc(nxt.due)}</b> — ${esc(nxt.t)}`:''}</p><p class="m">Le score compte 60 % la <b>qualité</b> des preuves (faible 1, solide 2, très solide 3) et 40 % la checklist : une preuve solide pèse plus qu'une simple entrée de plus. <b>Ce score mesure ta préparation, pas une probabilité d'admission.</b></p></div>
<div class="card"><h3>✅ Checklist du dossier & calendrier</h3><p class="m">Liste générale à adapter : vérifie les règles et dates officielles de l'université au moment de candidater.</p>${ck.map((c,i)=>`<div style="border-top:1px solid var(--b,#ddd);padding:8px 0"><div class="row"><span ${c.st=='Fait'?'style="text-decoration:line-through;opacity:.6"':''}>${esc(c.t)}</span><button class="btn s" onclick="pcDel(${i})">✕</button></div><div class="row"><select onchange="pcSet(${i},'st',this.value)">${['À faire','En cours','Fait'].map(o=>`<option ${o==c.st?'selected':''}>${o}</option>`).join('')}</select><input type="date" value="${esc(c.due||'')}" onchange="pcSet(${i},'due',this.value)">${c.st!='Fait'&&c.due&&c.due<t0?'<span style="color:var(--r)">⚠ en retard</span>':''}</div></div>`).join('')}<div class="row" style="margin-top:8px"><input id="pc_new" placeholder="Ajouter une pièce ou une étape…"><button class="btn" onclick="pcAdd()">+</button></div></div>
<div class="card"><h3>🧭 Les 5 axes du dossier</h3><p class="m">Rattache chaque preuve à un axe (champ « Axe du dossier servi »). Objectif : poids ≥ 6 par axe (ex. 3 preuves solides).${un?` ${un} preuve(s) sans axe.`:''}</p>${ax.map((x,i)=>`<div style="margin-top:10px"><div class="row"><b>${x.t}</b><span class="m">${x.n} preuve(s) · poids ${x.w}/6</span></div>${gauge(x.p)}<label>Mon récit pour cet axe (lettre, oral)</label><textarea onchange="prSet(${i},this.value)">${esc((D.pr||{})[i]||'')}</textarea></div>`).join('')}<p class="m">Récit : PASS difficile → réorientation réfléchie → excellence en sciences infirmières → clinique → recherche → projet médical. Le PASS est expliqué, pas caché.</p></div>
<div class="card"><h3>🔎 Filtrer les preuves</h3><div>${S1.map(s=>chip(pf.sem==s,`pfS('sem','${s}')`,`${s} · ${a.filter(x=>x.sem==s).length}`)).join('')}</div><div style="margin-top:6px">${AX.map((t,i)=>chip(pf.axe===String(i),`pfS('axe','${i}')`,t.split(' ')[0]+' '+a.filter(x=>x.axe==t).length)).join('')}</div></div>`}
/* ---- Notes & classement ---- */
function notesData(){const a=L('notes').filter(x=>x.note!==''&&x.note!=null&&!isNaN(+x.note)),cf=x=>+x.coef>0?+x.coef:1;
const sems=S1.map(s=>{const e=a.filter(x=>x.sem==s),c=e.reduce((t,x)=>t+cf(x),0),avg=c?e.reduce((t,x)=>t+(+x.note)*cf(x),0)/c:null,rk=e.filter(x=>+x.rang>0&&+x.eff>0),pc=rk.length?rk.reduce((t,x)=>t+(+x.rang)/(+x.eff),0)/rk.length:null;return{s,n:e.length,avg,pc}});
const c=a.reduce((t,x)=>t+cf(x),0);return{a,sems,all:c?a.reduce((t,x)=>t+(+x.note)*cf(x),0)/c:null}}
function notesAvg(){const d=notesData();return d.all===null?'—':d.all.toFixed(2)+'/20'}
function notesSum(){const d=notesData();return d.sems.filter(x=>x.n).map(x=>`<div style="margin-bottom:6px"><b>${x.s}</b> <span class="m">${x.avg.toFixed(2)}/20 · ${x.n} note(s)${x.pc!==null?' · rang moyen : top '+Math.max(1,Math.round(x.pc*100))+' %':''}</span></div>`).join('')}
function notesX(){const d=notesData(),low=d.a.filter(x=>+x.note<10),w=300/6;
const bars=d.sems.map((x,i)=>{const h=x.avg===null?0:x.avg*4;return `<rect x="${i*w+8}" y="${86-h}" width="${w-16}" height="${h}" rx="3" fill="${x.avg===null?'none':x.avg>=14?'#2e8b57':x.avg>=10?'#d08a1a':'#c0392b'}"/><text x="${i*w+w/2}" y="${86-h-3}" font-size="9" text-anchor="middle" fill="currentColor">${x.avg===null?'':x.avg.toFixed(1)}</text><text x="${i*w+w/2}" y="98" font-size="9" text-anchor="middle" fill="currentColor">${x.s}</text>`}).join('');
const prev=d.sems.filter(x=>x.avg!==null);const ev=prev.length>1?prev[prev.length-1].avg-prev[prev.length-2].avg:null;
return `<div class="card" style="text-align:center"><span class="m">Moyenne pondérée (toutes notes saisies)</span><div style="font-size:32px;font-weight:700">${d.all===null?'—':d.all.toFixed(2)+' / 20'}</div>${ev!==null?`<span class="m">Évolution depuis le semestre précédent : ${ev>=0?'+':''}${ev.toFixed(2)}</span>`:''}</div>
<div class="card"><h3>Moyenne par semestre</h3><svg viewBox="0 0 300 102" width="100%"><line x1="0" x2="300" y1="46" y2="46" stroke="#888" stroke-dasharray="3"/>${bars}</svg><span class="m">Ligne = 10/20. Moyenne pondérée par coefficient (ou ECTS).</span><div>${d.sems.filter(x=>x.n).map(x=>`<span class="badge">${x.s} : ${x.n} note(s)${x.pc!==null?' · top '+Math.max(1,Math.round(x.pc*100))+' %':''}</span>`).join('')}</div></div>
${low.length?`<div class="card" style="border-color:var(--r)"><h3>⚠ Notes sous 10/20</h3>${low.map(x=>`<div class="m">${esc(x.sem)} · ${esc(x.ue)} : ${esc(x.note)}/20</div>`).join('')}</div>`:''}
<p class="m">Saisis chaque note avec son rang et l'effectif quand tu les connais : le classement alimente la preuve « Classement » du dossier passerelle.</p>`}

function comp(){return `<div class="card"><h3>Compétences à accumuler (priorité 1 → 9)</h3>${SK.map((s,i)=>`<label>${s[1]}. ${s[0]} — niveau ${D.comp[i]}/5</label><input type="range" min="0" max="5" value="${D.comp[i]}" onchange="D.comp[${i}]=+this.value;save();render()">`).join('')}</div><p class="m">Une certification terminée et maîtrisée > cinq commencées. Hiérarchie : notes/compétences > stages > recherche > projets > formations > extras.</p>`}
function plan(){const P=[['2026-27 · IFSI 1','Excellence : major/top niveau, méthodes M1-M5, stages, sport, sommeil, anglais, recherche légère, site opérationnel.'],['2027-28 · IFSI 2','Excellence + différenciation : stages stratégiques, premiers projets de recherche, statistiques, anglais scientifique, réseau hospitalo-universitaire, revenus, capital.'],['2028-29 · IFSI 3','Dossier passerelle : notes, stages cohérents, mémoire, recherche, projet médical clair, CV, lettre, oral, candidature.'],['2029+ · DEI','Passerelle acceptée → médecine. Sinon : emploi IDE + spécialisation/master + 2e candidature si autorisée. Branches parallèles : IADE (2 ans) ou IPA (grade master).'],['Médecine → Recherche','Spécialisation + master santé publique ou recherche → doctorat → CHU / Inserm / université / industrie. Master seul ≠ Inserm : il faut un doctorat.']];
return P.map(p=>`<div class="card"><h3>${p[0]}</h3><div class="m">${p[1]}</div></div>`).join('')+`<div class="card"><h3>Arbre de décision</h3><pre>DEI ─┬─ PASSERELLE → MÉDECINE → spé → master/recherche → doctorat → Inserm/CHU/industrie
     ├─ IADE (2 ans)
     └─ IPA + master</pre><p class="m">Les branches ne sont pas contradictoires : garder plusieurs options ouvertes jusqu'à ce que les données réelles (notes, stages, recherche, passerelle) tranchent.</p></div>
<div class="card"><h3>3 moteurs</h3><div class="m">🧠 Excellence · 🔬 Science · 💰 Capital — une étape principale, plusieurs capitaux en parallèle.</div></div>
<div class="card"><h3>5 méthodes d'élite</h3><div class="m">M1 Fiches de flux (zéro phrase, cause → effet, recto/verso) · M2 Tableau blanc (réécriture de mémoire, corrections en vert) · M3 Grille d'évaluation inversée (UE 4.1) · M4 Carnet de liaison clinique (mécanisme → symptômes → surveillance) · M5 Reverse engineering QCM (3 pièges en rouge) + réécriture espacée J0/J3/J7/J30.</div></div>
<div class="card"><h3>10 règles</h3><div class="m">1 Réussir brillamment l'IFSI · 2 Le site = système de pilotage · 3 Aucune dette de cours · 4 Chaque stage = compétence + question scientifique · 5 Dossier construit sur 3 ans · 6 PASS = preuve de progression · 7 Recherche tôt, faible dose · 8 Anglais, stats, data, IA progressifs · 9 Faibles dépenses = capital · 10 Options ouvertes jusqu'aux données.</div></div>`}
function data(){return `<div class="card"><h3>Sauvegarde</h3><p class="m" id="pinfo">…</p><p class="m">Les données restent dans ce navigateur. Exporte régulièrement.</p><button class="btn" onclick="ex()">📤 Exporter .json</button><label>Importer (remplace tout)</label><input type="file" accept=".json" onchange="im(this)"><button class="btn" style="background:var(--r)" onclick="if(confirm('Tout effacer ?')){D={};save();location.reload()}">Tout effacer</button></div>`}
function ex(){D._exp=Date.now();save();const b=new Blob([JSON.stringify(Object.assign({_meta:{app:'LIFE-PROJECT',ver:VER,env:TEST?'TEST':'PROD',date:td()}},D))],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='programme-major-'+td()+'.json';a.click()}
function backupNow(tag){try{const b=new Blob([JSON.stringify(D)],{type:'application/json'}),x=document.createElement('a');x.href=URL.createObjectURL(b);x.download='programme-major-'+tag+'-'+td()+'.json';x.click()}catch(e){}}
function im(i){const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);if(!p||typeof p!=='object'||Array.isArray(p)||(p._meta&&p._meta.app&&p._meta.app!=='LIFE-PROJECT')){alert("Fichier invalide : ce n'est pas une sauvegarde de ce site.");return}
const ks=Object.keys(M),lines=ks.map(k=>M[k].n+' : '+L(k).length+' → '+(Array.isArray(p[k])?p[k].length:0)).join('\n');
if(!confirm('Importer cette sauvegarde'+(p._meta?' ('+p._meta.env+' '+p._meta.ver+', '+p._meta.date+')':' (ancien format)')+' ?\nEntrées actuelles → après import :\n'+lines+'\n\nUne sauvegarde de l\'état actuel sera téléchargée avant.')){i.value='';return}
backupNow('avant-import');D=p;if(!D.comp)D.comp=SK.map(s=>0);save();location.reload()}catch(e){alert("Fichier invalide : ce n'est pas un .json exporté depuis ce site (bouton Exporter).")}};r.readAsText(f)}

/* ---- Portfolio / CV ---- */
function portfolio(){const sc=score();
const sec=(title,rows)=>rows.length?`<div class="card"><h3>${title}</h3>${rows}</div>`:'';
const stg=L('stages').slice().sort((a,b)=>(b.debut||'').localeCompare(a.debut||'')).map(x=>`<div style="margin-bottom:8px"><b>${esc(x.lieu)}</b> <span class="m">${esc(x.debut)} → ${esc(x.fin)}</span>${x.bilan?`<div class="m">${esc(x.bilan)}</div>`:''}</div>`).join('');
const rec=L('recherche').slice().sort((a,b)=>(b.date||'').localeCompare(a.date||'')).map(x=>`<div style="margin-bottom:8px"><b>${esc(x.sujet)}</b> <span class="m">${esc(x.dom)} · ${esc(x.date)}</span>${x.ret?`<div class="m">${esc(x.ret)}</div>`:''}</div>`).join('');
const pub=L('publications').slice().sort((a,b)=>(b.date||'').localeCompare(a.date||'')).map(x=>`<div style="margin-bottom:8px"><b>${esc(x.titre)}</b> <span class="m">${esc(x.type)} · ${esc(x.statut)} · ${esc(x.revue)} · ${esc(x.date)}</span>${x.resume?`<div class="m">${esc(x.resume)}</div>`:''}</div>`).join('');
const pro=L('projets').filter(x=>x.st!='Idée').map(x=>`<div style="margin-bottom:6px"><b>${esc(x.titre)}</b> <span class="m">${esc(x.cat)} · ${esc(x.st)}</span></div>`).join('');
const forma=L('formations').map(x=>`<div style="margin-bottom:6px"><b>${esc(x.titre)}</b> <span class="m">${esc(x.pf)} · ${esc(x.st)} ${x.pr?'('+esc(x.pr)+'%)':''}</span></div>`).join('');
const comp=SK.map((s,i)=>`<div style="margin-bottom:4px"><div class="row"><span>${esc(s[0])}</span><span class="m">${D.comp[i]}/5</span></div>${gauge(D.comp[i]/5)}</div>`).join('');
const nt=notesSum();const pass=L('passerelle').slice().sort((a,b)=>(a.sem||'').localeCompare(b.sem||'')).map(x=>`<div style="margin-bottom:6px"><b>${esc(x.titre)}</b> <span class="m">${esc(x.sem)} · ${esc(x.type)} · ${esc(x.force||'')} · ${esc(x.axe||'')} · ${esc(x.date)}</span>${x.piece?`<div class="m">Justificatif : ${esc(x.piece)}</div>`:''}${x.det?`<div class="m">${esc(x.det)}</div>`:''}</div>`).join('');
return `<div class="card no-print"><button class="btn" onclick="window.print()">🖨 Exporter en PDF</button><p class="m">Le bouton ouvre l'impression du navigateur : choisis « Enregistrer en PDF » comme imprimante.</p></div>
<div id="printarea">
<div class="card"><h3>Naw — Synthèse de progression</h3><p class="m">Nursing school student, IFSI Bichat · Université Paris Cité · Objectif : major de promo → passerelle médecine → recherche</p>${gauge(sc.avg,true)}${sc.parts.map(p=>`<div style="margin-top:6px"><div class="row"><span class="m">${p[0]}</span><span class="m">${Math.round(p[1]*100)}%</span></div>${gauge(p[1])}</div>`).join('')}</div>
${sec('📊 Notes & classement',nt)}
${sec('🩺 Dossier passerelle — preuves',pass)}
${sec('🏥 Stages',stg)}
${sec('🔬 Recherche',rec)}
${sec('📄 Publications & posters',pub)}
${sec('🛠 Projets',pro)}
${sec('🎓 Formations',forma)}
<div class="card"><h3>🧠 Compétences</h3>${comp}</div>
</div>`}

function render(){nav();document.title=(TEST?'[TEST] ':'')+'LIFE-PROJECT — '+LBL(tab);let h='';if(tab=='home')h=home();else if(tab=='comp')h=comp();else if(tab=='plan')h=plan();else if(tab=='portfolio')h=portfolio();else if(tab=='data'){h=data();setTimeout(pinfo,0)}else h=`<h2>${LBL(tab)}</h2>${extra(tab)}${form(tab)}${searchbox(tab)}<div id="list_${tab}">${list(tab)}</div>`;$('#main').innerHTML=h}
render();

/* ---- Sauvegarde & rappels ---- */
function bk(){const t=D._exp||0,w=saveErr?'<div class="card no-print" style="border-color:var(--r)">⚠️ Enregistrement impossible (stockage plein ou bloqué) : exporte tes données maintenant.</div>':'';if(Date.now()-t<6048e5)return w;return w+`<div class="card no-print" style="border-color:var(--o)">⚠️ Sauvegarde .json ${t?'ancienne (> 7 jours)':'jamais faite'}. <button class="btn" onclick="ex()">📤 Exporter maintenant</button></div>`}
function pinfo(){const e=$('#pinfo');if(!e)return;const s=D._saved?new Date(D._saved).toLocaleString('fr-FR'):'—';const p=navigator.storage&&navigator.storage.persisted?navigator.storage.persisted():Promise.resolve(false);p.then(v=>{e.innerHTML='Version '+VER+' · '+(TEST?'<b>environnement TEST (données séparées)</b>':'production')+' · Dernier enregistrement : '+s+' · Stockage protégé : '+(v?'oui ✅':'non (fais des exports)')+' · Dernier export : '+(D._exp?new Date(D._exp).toLocaleDateString('fr-FR'):'jamais')})}
function chart(){const days=[];for(let i=13;i>=0;i--)days.push(add(td(),-i));const v=days.map(d=>{const x=L('sante').find(s=>s.date==d&&s.som);return x?+x.som:0});const w=300/14;return `<div class="card"><h3>Sommeil — 14 jours</h3><svg viewBox="0 0 300 90" width="100%">${v.map((h,i)=>`<rect x="${i*w+2}" y="${80-h*8}" width="${w-4}" height="${h*8}" rx="2" fill="${h>=7?'#2e8b57':h?'#d08a1a':'none'}"/>`).join('')}<line x1="0" x2="300" y1="24" y2="24" stroke="#888" stroke-dasharray="3"/></svg><span class="m">Ligne = 7 h</span></div>`}

/* ---- Persistance durable ---- */
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
if(!localStorage.getItem(KEY))idbGet(v=>{if(v){try{D=JSON.parse(v);if(!D.comp)D.comp=SK.map(s=>0);tab=D.tab||'home';render()}catch(e){}}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)save()});
window.addEventListener('pagehide',save);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});

if(TEST){const b=document.createElement('div');b.id='tstb';b.textContent='TEST · données séparées';document.body.appendChild(b)}
