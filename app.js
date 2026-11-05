const $=s=>document.querySelector(s);
const KEY='majorpromo_v3';let D={};try{D=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
function idbOpen(cb){try{const r=indexedDB.open('majorpromo',1);r.onupgradeneeded=()=>r.result.createObjectStore('s');r.onsuccess=()=>cb(r.result);r.onerror=()=>cb(null)}catch(e){cb(null)}}
function idbSet(v){idbOpen(db=>{if(!db)return;try{db.transaction('s','readwrite').objectStore('s').put(v,'D')}catch(e){}})}
function idbGet(cb){idbOpen(db=>{if(!db)return cb();try{const g=db.transaction('s').objectStore('s').get('D');g.onsuccess=()=>cb(g.result);g.onerror=()=>cb()}catch(e){cb()}})}
const save=()=>{D._saved=Date.now();const s=JSON.stringify(D);try{localStorage.setItem(KEY,s)}catch(e){}idbSet(s)};
const td=()=>new Date().toISOString().slice(0,10);
const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
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
function go(t){if(editK&&editK!=t){editK=null;editI=null}tab=t;D.tab=t;save();render()}
function nav(){$('#nav').innerHTML=TABS.map(([k,l])=>`<button class="${k==tab?'on':''}" onclick="go('${k}')">${l}</button>`).join('')}

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
function home(){const s=stats();const sc=score();
let sig=[[sc.avg>=.5,'Dossier ≥ 50 %'],[s.sleep===null||s.sleep>=7,'Sommeil ≥ 7 h'],[s.sport>=3,'Sport ≥ 3/sem'],[s.rech>=1,'Recherche ≥ 1/sem']];
const n=sig.filter(x=>x[0]).length;const col=n>=3?'#2e8b57':n>=2?'#d08a1a':'#c0392b';const lb=n>=3?'🟢 En avance':n>=2?'🟡 Stable':'🔴 Correction nécessaire';
const K=(v,l)=>`<div class="k"><b>${v}</b><span>${l}</span></div>`;
const tr=s.rev?Math.round(s.epargneInvest/s.rev*100)+' %':'—';
return `${bk()}<div class="traj" style="background:${col}">TRAJECTOIRE : ${lb}</div>
<div class="card"><h3>📊 Progression du dossier</h3>${gauge(sc.avg,true)}${sc.parts.map(p=>`<div style="margin-top:6px"><div class="row"><span class="m">${p[0]}</span><span class="m">${Math.round(p[1]*100)}%</span></div>${gauge(p[1])}</div>`).join('')}<p class="m">Détail et export dans l'onglet 📁 Portfolio / CV.</p></div>
<p class="m">${sig.map(x=>(x[0]?'✓ ':'✗ ')+x[1]).join(' · ')}</p>
<h2>🩺 Passerelle & science</h2><div class="grid">${K(L('passerelle').length,'preuves archivées')}${K(notesAvg(),'moyenne IFSI')}${K(L('stages').length,'stages')}${K(L('recherche').length,'fiches recherche')}${K(L('publications').length,'publications/posters')}</div>
<h2>💰 Capital & santé</h2><div class="grid">${K(s.solde+' €','solde total (temps réel)')}${K(tr,'taux d\'épargne')}${K(s.sleep===null?'—':s.sleep.toFixed(1)+' h','sommeil moy. 7j')}${K(s.sport,'séances 7j')}${K(s.streak,'jours de suivi santé')}</div>
<div class="card"><h3>Règle des 5 niveaux</h3><p class="m">1 Obligatoire (cours/stages/examens) → 2 Stratégique (passerelle) → 3 Différenciation (recherche/réseau) → 4 Financier → 5 Bonus. Si le niveau 1 souffre, le niveau 5 disparaît immédiatement.</p></div>`}

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
return `<div class="card"><h3>🎯 État du dossier</h3>${gauge(sc,true)}<p class="m">Pièces faites : ${done}/${ck.length} · Preuves : ${a.length} (poids qualité ${a.reduce((s,x)=>s+fw(x),0)}) · ${late.length?`<b style="color:var(--r)">${late.length} en retard</b>`:'aucun retard'}${nxt?` · prochaine échéance : <b>${esc(nxt.due)}</b> — ${esc(nxt.t)}`:''}</p><p class="m">Le score compte 60 % la <b>qualité</b> des preuves (faible 1, solide 2, très solide 3) et 40 % la checklist : une preuve solide pèse plus qu'une simple entrée de plus.</p></div>
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
function ex(){D._exp=Date.now();save();const b=new Blob([JSON.stringify(D)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='programme-major-'+td()+'.json';a.click()}
function im(i){const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);if(typeof p!=='object'||Array.isArray(p)){alert("Fichier invalide : ce n'est pas une sauvegarde de ce site.");return}D=p;if(!D.comp)D.comp=SK.map(s=>0);save();location.reload()}catch(e){alert("Fichier invalide : ce n'est pas un .json exporté depuis ce site (bouton Exporter).")}};r.readAsText(f)}

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

function render(){nav();let h='';if(tab=='home')h=home();else if(tab=='comp')h=comp();else if(tab=='plan')h=plan();else if(tab=='portfolio')h=portfolio();else if(tab=='data'){h=data();setTimeout(pinfo,0)}else h=`<h2>${TABS.find(t=>t[0]==tab)[1]}</h2>${extra(tab)}${form(tab)}${searchbox(tab)}<div id="list_${tab}">${list(tab)}</div>`;$('#main').innerHTML=h}
render();

/* ---- Sauvegarde & rappels ---- */
function bk(){const t=D._exp||0;if(Date.now()-t<6048e5)return '';return `<div class="card no-print" style="border-color:var(--o)">⚠️ Sauvegarde .json ${t?'ancienne (> 7 jours)':'jamais faite'}. <button class="btn" onclick="ex()">📤 Exporter maintenant</button></div>`}
function pinfo(){const e=$('#pinfo');if(!e)return;const s=D._saved?new Date(D._saved).toLocaleString('fr-FR'):'—';const p=navigator.storage&&navigator.storage.persisted?navigator.storage.persisted():Promise.resolve(false);p.then(v=>{e.innerHTML='Dernier enregistrement : '+s+' · Stockage protégé : '+(v?'oui ✅':'non (fais des exports)')+' · Dernier export : '+(D._exp?new Date(D._exp).toLocaleDateString('fr-FR'):'jamais')})}
function chart(){const days=[];for(let i=13;i>=0;i--)days.push(add(td(),-i));const v=days.map(d=>{const x=L('sante').find(s=>s.date==d&&s.som);return x?+x.som:0});const w=300/14;return `<div class="card"><h3>Sommeil — 14 jours</h3><svg viewBox="0 0 300 90" width="100%">${v.map((h,i)=>`<rect x="${i*w+2}" y="${80-h*8}" width="${w-4}" height="${h*8}" rx="2" fill="${h>=7?'#2e8b57':h?'#d08a1a':'none'}"/>`).join('')}<line x1="0" x2="300" y1="24" y2="24" stroke="#888" stroke-dasharray="3"/></svg><span class="m">Ligne = 7 h</span></div>`}

/* ---- Persistance durable ---- */
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
if(!localStorage.getItem(KEY))idbGet(v=>{if(v){try{D=JSON.parse(v);if(!D.comp)D.comp=SK.map(s=>0);tab=D.tab||'home';render()}catch(e){}}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)save()});
window.addEventListener('pagehide',save);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
