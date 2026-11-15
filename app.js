"use strict";
const JOYLI_BUILD="20261115193558";
(function(){
/* ================= ДАННИ ================= */
const CATS=[
 {key:"k03",label:"0 – 3 г.",short:"0–3 г.",sub:"Бебета",icon:"rattle",banner:"Събития за най-малките",bsub:"0 – 3 години"},
 {key:"k37",label:"3 – 7 г.",short:"3–7 г.",sub:"Детска градина",icon:"mask",banner:"Забавления за малки откриватели",bsub:"3 – 7 години"},
 {key:"k710",label:"7 – 10 г.",short:"7–10 г.",sub:"Начален курс",icon:"flask",banner:"Наука, спорт и игра",bsub:"7 – 10 години"},
 {key:"k1012",label:"10 – 12 г.",short:"10–12 г.",sub:"Прогимназия",icon:"robot",banner:"Приключения за смелите",bsub:"10 – 12 години"},
 {key:"k1218",label:"12 – 18 г.",short:"12–18 г.",sub:"Тийнейджъри",icon:"mic",banner:"Сцена, код и спорт",bsub:"12 – 18 години"},
 {key:"ad",label:"18+",short:"18+",sub:"Възрастни",icon:"glass",banner:"Вечери за възрастни",bsub:"18+ години"}
];
const KID_AGES=["k03","k37","k710","k1012","k1218"];
const TYPES=[
 {key:"family",label:"Семейни",icon:"family"},{key:"culture",label:"Култура",icon:"masks"},
 {key:"music",label:"Музика",icon:"note"},{key:"sport",label:"Спорт",icon:"ball"},
 {key:"edu",label:"Образование",icon:"cap"},{key:"fest",label:"Фестивали",icon:"tent"},
 {key:"workshop",label:"Работилници",icon:"palette"},{key:"other",label:"Други",icon:"dots"}
];
const PICKS=[{key:"kids",label:"За деца",icon:"horse"}].concat(TYPES);
const PAL={family:["#F6D7A7","#E2895E"],culture:["#F2906F","#B23F5C"],music:["#93C8EA","#356BB2"],sport:["#9BD9AF","#2C8B66"],edu:["#BDAAF2","#5E45B5"],fest:["#FFD772","#EE7848"],workshop:["#F6AEC4","#C2527A"],other:["#A9D9D2","#2B7A73"],
 k03:["#FFD9A8","#F29A6A"],k37:["#F59B7E","#C7486A"],k710:["#9CDDB3","#2E8C6C"],k1012:["#9CCFF0","#3569B3"],k1218:["#C2AAF3","#6146B6"],ad:["#7FA3A0","#21504C"],brand:["#2E8C84","#0B4744"]};
const CITIES=[
 {id:"sof",name:"София",areas:[["Център",42.6977,23.3219],["Лозенец",42.6750,23.3230],["Младост",42.6500,23.3790],["Люлин",42.7130,23.2560],["Студентски град",42.6510,23.3440],["Борово",42.6700,23.2850],["Надежда",42.7330,23.2990]]},
 {id:"plv",name:"Пловдив",areas:[["Център",42.1440,24.7490],["Капана",42.1490,24.7480],["Тракия",42.1370,24.7900],["Кършияка",42.1600,24.7450],["Смирненски",42.1300,24.7200]]},
 {id:"var",name:"Варна",areas:[["Център",43.2050,27.9100],["Морска градина",43.2080,27.9300],["Чайка",43.2230,27.9400],["Владиславово",43.2330,27.8580],["Аспарухово",43.1810,27.8960]]},
 {id:"brg",name:"Бургас",areas:[["Център",42.4950,27.4720],["Лазур",42.5050,27.4820],["Славейков",42.5250,27.4500],["Меден рудник",42.4520,27.4320]]},
 {id:"rus",name:"Русе",areas:[["Център",43.8480,25.9540],["Възраждане",43.8400,25.9800],["Дружба",43.8250,25.9850]]},
 {id:"stz",name:"Стара Загора",areas:[["Център",42.4258,25.6345],["Три чучура",42.4400,25.6150],["Железник",42.4150,25.6550]]},
 {id:"vtr",name:"Велико Търново",areas:[["Център",43.0810,25.6290],["Варуша",43.0850,25.6400],["Бузлуджа",43.0700,25.6050]]},
 {id:"plk",name:"Плевен",areas:[["Център",43.4170,24.6067],["Дружба",43.4000,24.6200],["Сторгозия",43.4050,24.5850]]},
 {id:"blg",name:"Благоевград",areas:[["Център",42.0209,23.0943],["Струмско",42.0080,23.1050]]},
 {id:"shu",name:"Шумен",areas:[["Център",43.2706,26.9229],["Тракия",43.2600,26.9000]]}
];
const ORGS={
 o1:{name:"Арт ателие „Пъстро“",ini:"П",bio:"Творчески работилници за деца и възрастни. Малки групи, материалите са осигурени.",col:"#C2527A"},
 o2:{name:"Детски център „Чудеса“",ini:"Ч",bio:"Сензорни игри и занимания за бебета и малки деца с родител.",col:"#E2895E"},
 o3:{name:"Куклен театър „Сянка“",ini:"Т",bio:"Спектакли по български народни приказки.",col:"#6146B6"},
 o4:{name:"Клуб „Малки учени“",ini:"У",bio:"Научни опити, роботика и програмиране.",col:"#2E8C6C"},
 o5:{name:"Спортен клуб „Скок“",ini:"С",bio:"Катерене, скейт и отборни спортове за всички възрасти.",col:"#3569B3"},
 o6:{name:"Културен дом „Мост“",ini:"М",bio:"Концерти, лекции и вечери за възрастни.",col:"#21504C"},
 o7:{name:"Библиотека „Страница“",ini:"Б",bio:"Четения, клубове и игри с книги.",col:"#2B7A73"},
 o8:{name:"Сцена „Нощен влак“",ini:"Н",bio:"Отворени сцени, джем сешъни и стендъп.",col:"#B23F5C"}
};
const VENUE={o1:"Ателие „Пъстро“",o2:"Детски център „Чудеса“",o3:"Театър „Сянка“",o4:"Клуб „Малки учени“",o5:"Зала „Скок“",o6:"Културен дом „Мост“",o7:"Градска библиотека",o8:"Сцена „Нощен влак“"};
const DEMO_ORG="o1";
const STREETS=["ул. „Иван Вазов“","бул. „Витоша“","ул. „Граф Игнатиев“","ул. „Шипка“","бул. „България“","ул. „Раковски“","ул. „Цар Симеон“","ул. „Оборище“","ул. „Гладстон“","ул. „Христо Ботев“"];
// [заглавие, организатор, описание, цена, резервация, мин, илюстрация, вид]
const T={
 k03:[["Сензорна игра за най-малките","o2","Интерактивна сензорна игра, създадена специално за бебета и малки деца до 3 години. Сапунени балони, мека зона и безопасни материали.",10,true,60,"rattle","workshop"],["Бебешка музикална работилница","o2","Песнички, дрънкалки и ритъм за бебета с родител. Носете чорапки.",8,true,45,"music","music"],["Приказки за най-малките","o7","Четене на глас с картинки и играчки за деца до 3 години.",0,false,40,"book","edu"],["Бебе-йога с мама","o2","Леки упражнения за мама и бебе. Вземете постелка.",12,true,45,"yoga","sport"],["Първи мазки","o1","Рисуване с ръчички и пръстчета върху голямо платно.",9,true,40,"paint","workshop"]],
 k37:[["Куклен театър „Цветни приказки“","o3","Класически приказки с кукли и жива музика. Продължителност 50 минути.",8,true,50,"mask","culture"],["Работилница за слайм","o4","Правим цветен слайм и разбираме защо е лепкав.",12,true,60,"flask","edu"],["Фестивал на балоните","o5","Танци, игри с балони, аниматори и състезания за цялото семейство.",0,false,120,"star","fest"],["Рисуване с пръсти","o1","Свободно рисуване на големи листове, всичко е осигурено.",10,true,60,"paint","workshop"],["Малки готвачи: пица","o6","Всяко дете приготвя своя мини пица и си я отнася.",15,true,75,"chef","family"]],
 k710:[["Роботика за начинаещи","o4","Сглобяваме и програмираме малък робот с конструктор.",18,true,90,"robot","edu"],["Научни опити: вулкани","o4","Химия без страх: изригвания, пяна и цветове.",12,true,60,"flask","edu"],["Шахматен турнир за деца","o7","Турнир по швейцарска система, награди за първите трима.",0,true,120,"dice","other"],["Скейт урок","o5","Урок с инструктор, каски и протектори се дават на място.",14,true,60,"skate","sport"],["Рисуваме комикс","o1","Измисляме герой и рисуваме първия си комикс.",12,true,90,"book","workshop"]],
 k1012:[["Игри в Scratch","o4","Създаваме собствена игра стъпка по стъпка. Лаптопи има на място.",16,true,120,"robot","edu"],["Катерене на изкуствена стена","o5","Тренировка с осигуряване и инструктор.",15,true,90,"mountain","sport"],["Фото разходка из града","o1","Учим композиция и светлина с телефон.",8,true,90,"camera","workshop"],["Стая за бягство за семейства","o6","Загадки и екипна работа за групи до 6 души.",20,true,60,"puzzle","family"],["Клуб „Смели читатели“","o7","Обсъждаме книгата на месеца.",0,false,60,"book","culture"]],
 k1218:[["Хакатон за тийнейджъри","o4","Един ден, един проблем, отборно решение. Пица включена.",0,true,360,"robot","edu"],["Отворена сцена","o8","Музика, поезия, стендъп. Записване на място.",0,false,120,"mic","music"],["Вечер на бордовите игри","o7","Над 50 игри и водещ, който обяснява правилата.",5,false,180,"dice","other"],["Дигитален дизайн: постер","o1","Създаваме постер в безплатен софтуер.",15,true,120,"paint","workshop"],["Баскетбол 3х3","o5","Отборен турнир на открито, записване по отбори.",0,true,180,"ball","sport"],["Хип-хоп танци","o5","Уъркшоп с хореограф за начинаещи.",10,true,90,"star","music"]],
 ad:[["Джаз вечер","o8","Трио на живо, свободни места на бара.",15,false,120,"music","music"],["Стендъп комедия","o8","Четирима комици, 90 минути смях.",20,true,90,"mic","culture"],["Йога в парка","o5","Сутрешна практика за всички нива. Вземете постелка.",0,false,60,"leaf","sport"],["Лекция: историята на града","o6","Разказ с архивни снимки и разходка след лекцията.",0,true,90,"book","edu"],["Кулинарен клас: балканска кухня","o6","Готвим три ястия и сядаме заедно на масата.",35,true,150,"chef","workshop"],["Фестивал на уличната храна","o6","Местни готвачи, музика на живо и зона за деца.",0,false,240,"glass","fest"]]
};
const NAMES=["Мария П.","Георги Д.","Елена К.","Иван С.","Десислава Т.","Николай В.","Ралица М.","Петър Г.","Виктория А.","Стефан Л."];
const RTEXT=["Чудесно организирано, ще дойдем пак.","Децата бяха във възторг.","Добре, но залата беше малко тясна.","Много мили водещи и точно начало.","Струваше си всяка минута.","Хубаво беше, но започна с 15 минути закъснение."];

/* ================= ИКОНИ ================= */
const UI={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 pin:'<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
 heart:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.4-4 4.4-6 8-6s6.6 2 8 6"/>',
 bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 back:'<path d="M15 5l-7 7 7 7"/>', right:'<path d="M9 5l7 7-7 7"/>', down:'<path d="M6 9l6 6 6-6"/>', arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 share:'<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
 map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
 sliders:'<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>', check:'<path d="M5 12l5 5 9-10"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', nav:'<path d="M3 11l18-8-8 18-2-8z"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
 ticket:'<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2.5"/>',
 history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
 logout:'<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
 flame:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
 locate:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7"/>',
 euro:'<path d="M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9"/>', people:'<circle cx="9" cy="8" r="3.5"/><path d="M3 20c.8-3.5 3.2-5 6-5s5.2 1.5 6 5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c1.6.6 2.6 2 3 5"/>',
 chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
 horse:'<path d="M4 20c5 2 11 2 16 0"/><path d="M7.5 18.5L9 12M16 18.5L15 12"/><path d="M7 12h9l2.5-5.5 2.5 1-1 3h-1.5"/><path d="M7 12c-1.6 0-3-1.2-3.4-3.2"/><path d="M18.5 6.5l-.5-2.5"/>',
 family:'<circle cx="7.5" cy="6" r="2.5"/><circle cx="16.5" cy="6" r="2.5"/><circle cx="12" cy="12.5" r="2"/><path d="M3.5 20v-5a4 4 0 0 1 4-4M20.5 20v-5a4 4 0 0 0-4-4M9 20v-1.5a3 3 0 0 1 6 0V20"/>',
 masks:'<path d="M3 4h9v6a4.5 4.5 0 0 1-9 0z"/><path d="M5.5 7.5h1M8.5 7.5h1M6 11.5q1.5-1 3 0"/><path d="M12 9h9v5a4.5 4.5 0 0 1-9 0"/><path d="M14.5 12h1M17.5 12h1M15 15.5q1.5 1 3 0"/>',
 note:'<path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
 ball:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5l4 2.8-1.5 4.6h-5L8 10.3z"/><path d="M12 3v4.5M16 10.3l4.3-1.4M14.5 14.9l2.6 3.9M9.5 14.9l-2.6 3.9M8 10.3L3.7 8.9"/>',
 cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
 tent:'<path d="M12 3L2 20h20z"/><path d="M9 20l3-6 3 6"/>',
 palette:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1.2 1.4-2.3-.7-1.2 0-2.7 1.6-2.7H17a4 4 0 0 0 4-4c0-5-4-9-9-9z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7" r="1.2"/>',
 dots:'<circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/>'
};
function ui(k,cls="i",w=2){return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${UI[k]||""}</svg>`}
function uiFill(k,cls="i"){return `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">${UI[k]}</svg>`}
const ART={
 music:'<path d="M24 46V16l24-5v30"/><circle cx="18" cy="46" r="6"/><circle cx="42" cy="41" r="6"/>',
 mask:'<path d="M12 14h24v14a12 12 0 0 1-24 0z"/><path d="M19 22h2M27 22h2M19 32q5 4 10 0"/><path d="M36 20h16v12a10 10 0 0 1-14 9"/><path d="M41 27h2M47 27h2M41 36q4-3 8 0"/>',
 paint:'<path d="M32 10a22 22 0 1 0 0 44c4 0 5-3 3-6s0-7 4-7h6a9 9 0 0 0 9-9c0-12-10-22-22-22z"/><circle cx="21" cy="28" r="3"/><circle cx="28" cy="19" r="3"/><circle cx="39" cy="19" r="3"/><circle cx="45" cy="28" r="3"/>',
 flask:'<path d="M26 10h12M28 10v16L14 50a4 4 0 0 0 4 6h28a4 4 0 0 0 4-6L36 26V10"/><path d="M20 42h24"/><circle cx="30" cy="48" r="2"/><circle cx="37" cy="45" r="1.5"/>',
 robot:'<rect x="14" y="22" width="36" height="28" rx="6"/><path d="M32 22v-8"/><circle cx="32" cy="12" r="3"/><circle cx="24" cy="34" r="3"/><circle cx="40" cy="34" r="3"/><path d="M25 43h14M10 32v8M54 32v8"/>',
 book:'<path d="M32 18c-6-4-14-5-20-4v34c6-1 14 0 20 4 6-4 14-5 20-4V14c-6-1-14 0-20 4z"/><path d="M32 18v34"/>',
 ball:'<circle cx="32" cy="32" r="20"/><path d="M12 32h40M32 12c-8 6-8 34 0 40M32 12c8 6 8 34 0 40"/>',
 chef:'<path d="M20 36a9 9 0 0 1 2-17 11 11 0 0 1 20 0 9 9 0 0 1 2 17v12H20z"/><path d="M20 42h24"/>',
 star:'<path d="M32 10l6 14 15 1-12 9 4 15-13-8-13 8 4-15-12-9 15-1z"/>',
 camera:'<rect x="10" y="20" width="44" height="30" rx="5"/><path d="M24 20l3-6h10l3 6"/><circle cx="32" cy="35" r="9"/>',
 dice:'<rect x="14" y="14" width="36" height="36" rx="7"/><circle cx="24" cy="24" r="2.5"/><circle cx="40" cy="24" r="2.5"/><circle cx="32" cy="32" r="2.5"/><circle cx="24" cy="40" r="2.5"/><circle cx="40" cy="40" r="2.5"/>',
 rattle:'<circle cx="24" cy="24" r="12"/><path d="M33 33l15 15"/><circle cx="50" cy="50" r="4"/><path d="M18 24h12M24 18v12"/>',
 yoga:'<circle cx="32" cy="14" r="5"/><path d="M32 20v16M18 30l14 6 14-6M14 50c6-8 12-10 18-10s12 2 18 10z"/>',
 mic:'<rect x="24" y="10" width="16" height="26" rx="8"/><path d="M16 30a16 16 0 0 0 32 0M32 46v8M24 54h16"/>',
 glass:'<path d="M22 10h20l-2 16a8 8 0 0 1-16 0z"/><path d="M32 34v16M24 54h16"/>',
 puzzle:'<path d="M14 22h10a5 5 0 1 1 10 0h10v10a5 5 0 1 0 0 10v10H34a5 5 0 1 0-10 0H14V42a5 5 0 1 1 0-10z"/>',
 skate:'<path d="M10 38h44l-4 6H14z"/><circle cx="20" cy="50" r="4"/><circle cx="44" cy="50" r="4"/><path d="M26 30q6-14 16-16"/>',
 mountain:'<path d="M6 52l18-28 10 14 6-8 18 22z"/><path d="M24 24l-5 8 5-2 5 3"/>',
 leaf:'<path d="M14 50C14 26 30 14 52 12c-2 22-14 38-38 38z"/><path d="M14 50L38 26"/>',
 heart:'<path d="M32 52S10 39 10 24a11 11 0 0 1 22-4 11 11 0 0 1 22 4c0 15-22 28-22 28z"/>'
};
const ART_KEYS=["paint","music","mask","flask","robot","book","ball","chef","star","camera","dice","rattle","yoga","mic","glass","puzzle","skate","mountain","leaf"];
function hash(s){let h=2166136261;for(const ch of String(s)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let gid=0;
/* Илюстрирана корица: небе с боке, хълмове, голям предмет и конфети */
function cover(seedKey,palKey,art,opts={}){
  const r=rng(hash(seedKey)),[a,b]=PAL[palKey]||PAL.brand,id="g"+(gid++);
  let s=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><radialGradient id="${id}r" cx=".75" cy=".3" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="320" height="200" fill="url(#${id})"/><rect width="320" height="200" fill="url(#${id}r)"/>`;
  for(let i=0;i<8;i++){const x=r()*320,y=r()*150,rad=10+r()*34;s+=`<circle class="blob" style="animation-delay:-${(r()*9).toFixed(1)}s" cx="${x|0}" cy="${y|0}" r="${rad|0}" fill="#fff" fill-opacity="${(.07+r()*.16).toFixed(2)}"/>`}
  for(let i=0;i<5;i++){const x=r()*320,y=r()*130,rad=6+r()*9;s+=`<circle cx="${x|0}" cy="${y|0}" r="${rad|0}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/><circle cx="${(x-rad*.35)|0}" cy="${(y-rad*.35)|0}" r="${(rad*.22).toFixed(1)}" fill="#fff" fill-opacity=".7"/>`}
  const h1=150+r()*16,h2=165+r()*12;
  s+=`<path d="M0 ${h1|0} C80 ${(h1-28)|0} 150 ${(h1+14)|0} 320 ${(h1-20)|0} V200 H0Z" fill="#000" fill-opacity=".10"/><path d="M0 ${h2|0} C110 ${(h2-18)|0} 210 ${(h2+12)|0} 320 ${(h2-6)|0} V200 H0Z" fill="#000" fill-opacity=".12"/>`;
  for(let i=0;i<10;i++){const x=r()*320,y=r()*170;s+=`<rect x="${x|0}" y="${y|0}" width="5" height="2.5" rx="1" transform="rotate(${(r()*180)|0} ${x|0} ${y|0})" fill="#fff" fill-opacity=".75"/>`}
  const sc=opts.small?2.1:opts.big?2.4:2.2,ix=opts.small?160-32*sc:opts.right?320-64*sc-24:160-32*sc+(r()*60-30),iy=opts.small?100-34*sc:100-36*sc-6;
  s+=`<g class="ico" style="animation-delay:-${(r()*5).toFixed(1)}s"><circle cx="${(ix+32*sc)|0}" cy="${(iy+32*sc)|0}" r="${(31*sc)|0}" fill="#fff" fill-opacity=".16"/><g transform="translate(${ix|0} ${iy|0}) scale(${sc})" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">${ART[art]||ART.star}</g></g>`;
  return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${s}</svg>`;
}
const eventArt=(e,o)=>e.photo?`<img src="${e.photo}" alt="">`:cover(e.id+e.title,e.type,e.icon,o);

/* Начален екран: катедрала, планини и пин */
function splashArt(i){
  if(i===0)return `<svg viewBox="0 0 360 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs>
   <linearGradient id="fs0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F9E8CF"/><stop offset=".6" stop-color="#F2C79A"/><stop offset="1" stop-color="#9DBB7A"/></linearGradient>
   <radialGradient id="bl0" cx=".38" cy=".32" r=".7"><stop offset="0" stop-color="#FFE4DE"/><stop offset=".55" stop-color="#F6B2A6"/><stop offset="1" stop-color="#E58D82"/></radialGradient>
   <filter id="blur0" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5"/></filter>
   <linearGradient id="dr0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EADBCB"/></linearGradient></defs>
  <rect width="360" height="300" fill="url(#fs0)"/>
  <g filter="url(#blur0)" opacity=".85">
   <path d="M10 210 L50 150 L90 210Z" fill="#E7735A"/><path d="M50 150 L50 210" stroke="#fff" stroke-width="4"/>
   <path d="M250 205 L300 135 L350 205Z" fill="#4E9A8E"/><path d="M300 135 L300 205" stroke="#fff" stroke-width="4"/>
   <path d="M100 215 L130 175 L160 215Z" fill="#F2B544"/>
   <rect x="0" y="205" width="360" height="30" fill="#C98C64" opacity=".5"/>
  </g>
  <path d="M0 70 Q90 105 180 78 T360 82" fill="none" stroke="#B48A6A" stroke-width="1.2" opacity=".6"/>
  ${[[20,80,"#E7735A"],[52,90,"#F2B544"],[84,96,"#4E9A8E"],[116,95,"#E0457B"],[148,88,"#F2B544"],[212,80,"#E7735A"],[244,84,"#4E9A8E"],[276,88,"#E0457B"],[308,86,"#F2B544"],[340,82,"#E7735A"]].map(([x,y,c])=>`<path d="M${x-8} ${y-4} L${x+8} ${y-4} L${x} ${y+10}Z" fill="${c}" opacity=".85"/>`).join("")}
  ${Array.from({length:18},(_,j)=>{const r=rng(j*11+5);return `<circle class="blob" style="animation-delay:-${(r()*8).toFixed(1)}s" cx="${(r()*360)|0}" cy="${(30+r()*150)|0}" r="${(4+r()*12)|0}" fill="#FFF6E0" opacity="${(.35+r()*.45).toFixed(2)}" filter="url(#blur0)"/>`}).join("")}
  <rect x="0" y="232" width="360" height="68" fill="#8DB06A"/><path d="M0 236 Q90 226 180 236 T360 234 V300 H0Z" fill="#7FA45E"/>
  <g class="ico" style="animation-duration:6s"><path d="M250 44 C 222 44 206 66 206 90 C 206 118 230 140 250 146 C 270 140 294 118 294 90 C 294 66 278 44 250 44Z" fill="url(#bl0)"/><path d="M246 146 L250 152 L254 146Z" fill="#E58D82"/><ellipse cx="236" cy="72" rx="9" ry="14" fill="#fff" opacity=".55" transform="rotate(-25 236 72)"/></g>
  <path d="M250 152 C 248 172 240 182 236 194" fill="none" stroke="#8A7A6A" stroke-width="1.6"/>
  <g>
   <ellipse cx="190" cy="292" rx="40" ry="6" fill="#000" opacity=".12"/>
   <path d="M164 290 C166 262 170 238 186 224 L206 224 C220 238 224 262 228 290Z" fill="url(#dr0)"/>
   <path d="M170 288 l2 10 M214 288 l2 10" stroke="#E9B99B" stroke-width="7" stroke-linecap="round"/>
   <path d="M210 234 C222 226 230 212 236 196" stroke="#F0C7A8" stroke-width="8" stroke-linecap="round" fill="none"/>
   <circle cx="236" cy="195" r="5" fill="#F0C7A8"/>
   <path d="M188 232 C182 246 178 258 176 266" stroke="#F0C7A8" stroke-width="8" stroke-linecap="round" fill="none"/>
   <circle cx="196" cy="206" r="20" fill="#F0C7A8"/>
   <path d="M176 206 C174 186 190 178 202 180 C214 182 220 194 216 206 C210 198 200 194 190 196 C184 198 180 202 176 206Z" fill="#B97A45"/>
   <path d="M178 200 C170 210 172 224 180 230 C178 220 178 210 182 204Z" fill="#B97A45"/>
   <circle cx="210" cy="210" r="2" fill="#5A3A28"/><path d="M206 220 q4 3 8 0" stroke="#C0705A" stroke-width="2" fill="none" stroke-linecap="round"/>
   <circle cx="214" cy="216" r="3" fill="#F2A08F" opacity=".6"/>
  </g></svg>`;
  if(i===1)return `<svg viewBox="0 0 360 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="360" height="250" fill="#E9EFEA"/>${[30,90,150,210,270,330].map(x=>`<path d="M${x} 0V250" stroke="#fff" stroke-width="6"/>`).join("")}${[40,100,160,220].map(y=>`<path d="M0 ${y}H360" stroke="#fff" stroke-width="6"/>`).join("")}<ellipse cx="90" cy="70" rx="44" ry="26" fill="#CFE5C8"/><path d="M-10 190 C90 150 200 220 370 170" stroke="#C4DBEB" stroke-width="18" fill="none"/>
  ${[[110,120,"note"],[200,80,"masks"],[260,150,"ball"],[160,180,"palette"],[290,70,"tent"]].map(([x,y,k],j)=>`<g class="ico" style="animation-delay:-${j}s"><path d="M${x} ${y} c-10 -14 -18 -20 -18 -30 a18 18 0 1 1 36 0 c0 10 -8 16 -18 30z" fill="#0E5551"/><g transform="translate(${x-10} ${y-40}) scale(.85)" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${UI[k]}</g></g>`).join("")}
  <circle cx="190" cy="140" r="24" fill="#2F7CF6" opacity=".2"/><circle cx="190" cy="140" r="9" fill="#2F7CF6" stroke="#fff" stroke-width="3"/></svg>`;
  return `<svg viewBox="0 0 360 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="sky2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD772"/><stop offset="1" stop-color="#EE7848"/></linearGradient></defs><rect width="360" height="250" fill="url(#sky2)"/>
  ${Array.from({length:26},(_,j)=>{const r=rng(j*7+3);return `<rect x="${(r()*360)|0}" y="${(r()*200)|0}" width="8" height="4" rx="1.5" fill="${["#fff","#0E5551","#F6AEC4","#93C8EA"][j%4]}" transform="rotate(${(r()*180)|0} 180 120)" opacity=".85"/>`}).join("")}
  <g class="ico"><g transform="rotate(-8 180 120)"><path d="M90 80h180a10 10 0 0 0 10 10v18a14 14 0 0 0 0 28v18a10 10 0 0 0-10 10H90a10 10 0 0 0-10-10v-18a14 14 0 0 0 0-28V90a10 10 0 0 0 10-10z" fill="#fff"/><path d="M220 86v76" stroke="#0E5551" stroke-width="3" stroke-dasharray="5 6"/><text x="110" y="122" font-family="Montserrat,sans-serif" font-weight="800" font-size="20" fill="#0E5551">ЗАПАЗЕНО</text><text x="110" y="146" font-family="Manrope,sans-serif" font-weight="700" font-size="13" fill="#5E6E6C">1 място · събота</text><path d="M246 112l8 8 14-16" stroke="#0E5551" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>
  </svg>`;
}
const LOGO=`<svg viewBox="0 0 200 70" aria-label="Joyli" role="img"><text x="100" y="52" text-anchor="middle" font-family="Montserrat,sans-serif" font-weight="800" font-size="50" fill="currentColor" letter-spacing="-1.5">Joyli</text><circle cx="150" cy="10" r="6" fill="#F27C1C"/></svg>`;

/* ================= СЪБИТИЯ ================= */
const today=new Date();today.setHours(0,0,0,0);
const HOURS=[9.5,10,10.5,11,12,15,16,16.5,17,18,19,20];
/* ================= СЪСТОЯНИЕ (живи данни от Supabase) ================= */
const CFG=window.JOYLI_CONFIG||{};
const sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const LS="joyli-v1";
let saved={};try{saved=JSON.parse(localStorage.getItem(LS)||"{}")||{}}catch(e){saved={}}
// примерните организатори от прототипа не се ползват
Object.keys(ORGS).forEach(k=>delete ORGS[k]);Object.keys(VENUE).forEach(k=>delete VENUE[k]);
const defaultF=()=>({ages:[],types:[],when:"all",date:null,near:false,free:false,popular:false,q:""});
const LIVE={ready:false,events:[],stats:{},settings:{fee_eur:1,free_until:"2027-02-14",policy_version:"1.0",policy_date:"15 ноември 2026"},content:{},
  me:null,email:null,bookings:[],favs:[],follows:[],myReviews:{},notifs:[],threads:[],reviews:{},attendees:{},myFees:0,
  admin:{users:[],threads:[],casts:[],totals:{attended:0,fees:0}}};
const S={tab:"home",city:saved.city||"sof",pos:saved.pos||null,posSrc:saved.posSrc||"area",radius:saved.radius||3,
  guestInterests:saved.guestInterests||null,seenWelcome:!!saved.seenWelcome,F:defaultF(),FD:null,screens:[],sel:null,savedTab:"events",
  ob:{picks:[],ages:[]},pending:null,cal:null,email:null};
const GUEST={name:"Гост",role:"guest",status:"approved",orgId:null,bookings:[],favs:[],myReviews:{},interests:null,follows:[],favCities:[],notif:true};
const loggedIn=()=>!!LIVE.me;
const myOrg=()=>LIVE.me&&LIVE.me.role==="org"?LIVE.me.id:null;
const normInt=i=>i&&Array.isArray(i.picks)&&(i.picks.length||(i.ages||[]).length||i.set)?{picks:i.picks,ages:i.ages||[]}:null;
function U(){const p=LIVE.me;if(!p)return GUEST;
  return{name:p.full_name||"",role:p.role,status:p.status,orgId:p.role==="org"?p.id:null,bookings:activeBookings(),favs:LIVE.favs,myReviews:LIVE.myReviews,
    interests:normInt(p.interests),follows:LIVE.follows,favCities:p.fav_cities||[],notif:p.notify,polVer:p.policy_version,polAt:p.policy_accepted_at?Date.parse(p.policy_accepted_at):null,city:p.home_city}}
const activeBookings=()=>LIVE.bookings.filter(b=>b.status!=="cancelled"&&curBk(b)).map(b=>b.event_id);
Object.defineProperty(S,"me",{get:()=>LIVE.me?LIVE.me.id:null});
Object.defineProperty(S,"bookings",{get:activeBookings});
Object.defineProperty(S,"favs",{get:()=>LIVE.favs});
Object.defineProperty(S,"follows",{get:()=>LIVE.follows});
Object.defineProperty(S,"myReviews",{get:()=>LIVE.myReviews});
Object.defineProperty(S,"interests",{get:()=>loggedIn()?U().interests:S.guestInterests});
Object.defineProperty(S,"userName",{get:()=>U().name});
Object.defineProperty(S,"role",{get:()=>U().role});
// настройки и съдържание в един речник (ползва се от админ панела и текстовете)
Object.defineProperty(S,"cms",{get:()=>Object.assign({},LIVE.content,{free_until:LIVE.settings.free_until,fee:String(LIVE.settings.fee_eur),pol_ver:LIVE.settings.policy_version,pol_date:LIVE.settings.policy_date})});
const allEvents=()=>LIVE.events;
const liveEvents=()=>LIVE.events.filter(e=>!e.cancelled&&e.mod==="approved");
const findEv=id=>LIVE.events.find(x=>x.id===id);
function persist(){try{localStorage.setItem(LS,JSON.stringify({city:S.city,pos:S.pos,posSrc:S.posSrc,radius:S.radius,guestInterests:S.guestInterests,seenWelcome:S.seenWelcome,tipOff:saved.tipOff}))}catch(e){}}
const PALS=["#C2527A","#E2895E","#6146B6","#2E8C6C","#3569B3","#21504C","#2B7A73","#B23F5C"];
function orgEntry(id,name,bio,avatar){return{name:name||"Организатор",ini:((name||"О").replace(/[^А-Яа-яA-Za-z]/g,"")[0]||"О").toUpperCase(),bio:bio||"",avatar:avatar||null,col:PALS[hash(id)%PALS.length]}}
// седмично събитие: следващата дата, която още не е минала (часът остава същият и при смяна на лятно време)
function nextOcc(s,dur,weekly){if(!weekly)return s;const d=new Date(s),now=Date.now(),m=(dur||60)*6e4;if(d.getTime()+m>now)return s;
  const k=Math.max(0,Math.floor((now-d.getTime()-m)/6048e5));d.setDate(d.getDate()+7*k);while(d.getTime()+m<=now)d.setDate(d.getDate()+7);return d.toISOString()}
const WEVERY=["всяка неделя","всеки понеделник","всеки вторник","всяка сряда","всеки четвъртък","всеки петък","всяка събота"];
// резервацията важи за текущата дата на събитието
const curBk=b=>{const e=findEv(b.event_id);return!e||!e.repeat||!b.occurs_at||Math.abs(Date.parse(b.occurs_at)-Date.parse(e.start))<12*36e5};
// свободна възраст: събитие „4 – 10 г.“ се показва във всички групи, които застъпва
const AGE_R={k03:[0,3],k37:[3,7],k710:[7,10],k1012:[10,12],k1218:[12,18],ad:[18,99]};
const agesFor=(a,b)=>{const hi=Math.max(b,a+1);return CATS.map(c=>c.key).filter(k=>a<AGE_R[k][1]&&hi>AGE_R[k][0])};
const ageLabel=(a,b)=>b>=99?(a>=18?"18+":`от ${a} г.`):a===b?`${a} г.`:`${a} – ${b} г.`;
const evAges=e=>e.cats&&e.cats.length?e.cats:[e.cat];
const isExt=id=>String(id||"").startsWith("ext:");
const extKey=n=>"ext:"+String(n).trim().toLowerCase().replace(/\s+/g," ");
function mapEv(r){const xo=r.ext_org&&r.ext_org.trim()?extKey(r.ext_org):null;if(xo&&!ORGS[xo])ORGS[xo]=orgEntry(xo,r.ext_org.trim());
  const amin=r.age_min!=null?+r.age_min:(AGE_R[r.age]||[0,99])[0],amax=r.age_max!=null?+r.age_max:(AGE_R[r.age]||[0,99])[1],cats=agesFor(amin,amax);
  return{id:r.id,city:r.city_id,cat:r.age,amin,amax,cats:cats.length?cats:[r.age],ageL:ageLabel(amin,amax),type:r.type,title:r.title,org:xo||r.organizer_id,owner:r.organizer_id,ext:r.ext_url||null,extOrg:r.ext_org||null,repeat:!!r.repeat_weekly,start0:r.starts_at,desc:r.description||"",price:+r.price_eur||0,booking:r.booking,dur:r.duration_min,icon:r.icon||"star",photo:r.photo_url||null,
  venue:r.venue||(ORGS[xo||r.organizer_id]?.name)||"",address:r.address||"",area:r.area,lat:+r.lat,lng:+r.lng,start:nextOcc(r.starts_at,r.duration_min,r.repeat_weekly),cap:r.capacity,mod:r.mod_status,modNote:r.mod_note,cancelled:r.cancelled,
  updatedAt:r.updated_at?Date.parse(r.updated_at):null,createdAt:Date.parse(r.created_at),reviews:[],pop:0,sampleAtt:[]}}

/* ================= ПОМОЩНИ ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const city=()=>CITIES.find(c=>c.id===S.city);
const cityName=id=>CITIES.find(c=>c.id===id)?.name||"";
const catOf=k=>CATS.find(c=>c.key===k);
const typeOf=k=>TYPES.find(t=>t.key===k)||TYPES[7];
function dist(a,b,c,d){const R=6371,r=Math.PI/180,x=Math.sin((c-a)*r/2)**2+Math.cos(a*r)*Math.cos(c*r)*Math.sin((d-b)*r/2)**2;return 2*R*Math.asin(Math.sqrt(x))}
const fmtKm=k=>k<1?Math.max(50,Math.round(k*100)*10)+" м":k.toFixed(1).replace(".",",")+" км";
const WDS=["Нед","Пон","Вт","Ср","Чет","Пет","Съб"],WDL=["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"];
const MS=["ян.","февр.","март","апр.","май","юни","юли","авг.","септ.","окт.","ноем.","дек."],ML=["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември"],MN=["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"];
const dayDiff=d=>Math.round((new Date(d).setHours(0,0,0,0)-today)/864e5);
const pad2=n=>String(n).padStart(2,"0");
const hm=d=>pad2(d.getHours())+":"+pad2(d.getMinutes());
const ymd=d=>{d=new Date(d);return d.getFullYear()+"-"+pad2(d.getMonth()+1)+"-"+pad2(d.getDate())};
const shortDate=d=>`${WDS[d.getDay()]}, ${d.getDate()} ${MS[d.getMonth()]}`;
const longDate=d=>{const x=dayDiff(d);return (x===0?"Днес, ":x===1?"Утре, ":"")+`${x<=1?WDL[d.getDay()].toLowerCase():WDL[d.getDay()]}, ${d.getDate()} ${ML[d.getMonth()]}`};
const whenShort=d=>{const x=dayDiff(d);return (x===0?"Днес":x===1?"Утре":shortDate(d))+" • "+hm(d)};
const price=p=>p?p+" €":"Безплатно";
const avg=rs=>rs.length?rs.reduce((s,r)=>s+r.stars,0)/rs.length:0;
function reviewsOf(e){if(LIVE.reviews[e.id])return LIVE.reviews[e.id];const s=LIVE.stats[e.id];if(!s||!s.reviews)return[];return Array.from({length:s.reviews},()=>({stars:+s.rating||0}))}
const starStr=v=>{const f=Math.round(v);return"★★★★★".slice(0,f)+"☆☆☆☆☆".slice(0,5-f)};
const dec=n=>n.toFixed(1).replace(".",",");
const bookedCount=e=>(LIVE.stats[e.id]&&LIVE.stats[e.id].taken)||0;
const score=e=>{const rs=reviewsOf(e);return avg(rs)*rs.length*2+bookedCount(e)*3+e.pop};
function toast(msg){const t=document.createElement("div");t.className="toast";t.setAttribute("role","status");t.textContent=msg;$("#toastRoot").replaceChildren(t);clearTimeout(toast._t);toast._t=setTimeout(()=>t.remove(),2600)}
function userPos(){if(S.pos&&S.pos.city===S.city)return S.pos;const a=city().areas[0];return{lat:a[1],lng:a[2],city:S.city}}
function nearestArea(p){let best=city().areas[0],bd=1e9;city().areas.forEach(a=>{const d=dist(p.lat,p.lng,a[1],a[2]);if(d<bd){bd=d;best=a}});return best[0]}
function weekendDays(){const d=today.getDay();if(d===6)return[0,1];if(d===0)return[0];return[6-d,7-d]}
const upcoming=e=>new Date(e.start).getTime()+e.dur*6e4>=Date.now();
function interestAges(){const I=S.interests;if(!I)return[];if(I.ages.length)return I.ages;return I.picks.includes("kids")?KID_AGES:[]}
function matchesInterests(e){const I=S.interests;if(!I)return true;const ages=interestAges(),types=I.picks.filter(k=>k!=="kids");return(!ages.length||evAges(e).some(k=>ages.includes(k)))&&(!types.length||types.includes(e.type))}
function filterEvents(F){
  const p=userPos(),we=weekendDays(),q=(F.q||"").trim().toLowerCase();
  const l=liveEvents().filter(e=>{
    if(e.city!==S.city||!upcoming(e))return false;
    if(F.ages.length&&!evAges(e).some(k=>F.ages.includes(k)))return false;
    if(F.types.length&&!F.types.includes(e.type))return false;
    const x=dayDiff(e.start);
    if(F.when==="today"&&x!==0)return false;
    if(F.when==="tom"&&x!==1)return false;
    if(F.when==="we"&&!we.includes(x))return false;
    if(F.when==="sat"&&x!==(6-today.getDay()+7)%7)return false;
    if(F.when==="sun"&&x!==(7-today.getDay())%7)return false;
    if(F.when==="date"&&ymd(e.start)!==F.date)return false;
    if(F.free&&e.price)return false;
    if(q&&!(e.title+" "+e.venue+" "+(ORGS[e.org]?.name||"")+" "+e.area+" "+typeOf(e.type).label).toLowerCase().includes(q))return false;
    e._d=dist(p.lat,p.lng,e.lat,e.lng);
    if(F.near&&e._d>S.radius)return false;
    return true;
  });
  return l.sort(F.popular?(a,b)=>score(b)-score(a):F.near?(a,b)=>a._d-b._d:(a,b)=>new Date(a.start)-new Date(b.start));
}
const withDist=list=>{const p=userPos();list.forEach(e=>e._d=e.city===S.city?dist(p.lat,p.lng,e.lat,e.lng):null);return list};

/* ================= КАРТА ================= */
function geom(c){
  const la=c.areas.map(a=>a[1]),ln=c.areas.map(a=>a[2]);
  const clat=(Math.min(...la)+Math.max(...la))/2,clng=(Math.min(...ln)+Math.max(...ln))/2,cos=Math.cos(clat*Math.PI/180);
  let kmW=Math.max(7,(Math.max(...ln)-Math.min(...ln))*111.32*cos+3.5),kmH=Math.max(6,(Math.max(...la)-Math.min(...la))*110.57+3.5);
  if(kmH/kmW<1.1)kmH=kmW*1.1;if(kmH/kmW>1.5)kmW=kmH/1.5;
  const W=400,H=Math.round(W*kmH/kmW),latS=kmH/110.57,lngS=kmW/(111.32*cos);
  return{W,H,minLat:clat-latS/2,maxLat:clat+latS/2,minLng:clng-lngS/2,maxLng:clng+lngS/2,pxKm:W/kmW,seed:hash(c.id)};
}
const proj=(g,lat,lng)=>[(lng-g.minLng)/(g.maxLng-g.minLng)*g.W,(g.maxLat-lat)/(g.maxLat-g.minLat)*g.H];
const unproj=(g,x,y)=>({lat:g.maxLat-y/g.H*(g.maxLat-g.minLat),lng:g.minLng+x/g.W*(g.maxLng-g.minLng)});
function mapSVG(opts){
  const c=city(),g=geom(c),r=rng(g.seed),p=userPos(),k=opts.k||1,E=900;
  let s=`<rect class="m-bg" x="${-E}" y="${-E}" width="${g.W+2*E}" height="${g.H+2*E}"/>`;
  for(let i=0;i<7;i++)s+=`<ellipse class="m-park" cx="${(r()*g.W*1.4-g.W*.2)|0}" cy="${(r()*g.H*1.4-g.H*.2)|0}" rx="${(22+r()*44)|0}" ry="${(16+r()*30)|0}" transform="rotate(${(r()*60-30)|0})"/>`;
  const ry1=r()*g.H;s+=`<path class="m-water" d="M${-E} ${ry1|0} C ${g.W*.3} ${(ry1+r()*160-80)|0}, ${g.W*.6} ${(r()*g.H)|0}, ${g.W+E} ${(r()*g.H)|0}"/>`;
  s+=`<g transform="rotate(${(r()*14-7).toFixed(1)} ${g.W/2} ${g.H/2})">`;
  for(let x=-E;x<g.W+E;x+=22+Math.floor(r()*12))s+=`<line class="m-st" x1="${x}" y1="${-E}" x2="${x}" y2="${g.H+E}"/>`;
  for(let y=-E;y<g.H+E;y+=22+Math.floor(r()*12))s+=`<line class="m-st" x1="${-E}" y1="${y}" x2="${g.W+E}" y2="${y}"/>`;
  s+=`</g>`;for(let i=0;i<3;i++)s+=`<path class="m-bv" d="M${-E} ${(g.H*r())|0} L ${g.W+E} ${(g.H*r())|0}"/><path class="m-bv" d="M ${(g.W*r())|0} ${-E} L ${(g.W*r())|0} ${g.H+E}"/>`;
  if(opts.radius){const[ux,uy]=proj(g,p.lat,p.lng);s+=`<circle class="m-rad" cx="${ux.toFixed(1)}" cy="${uy.toFixed(1)}" r="${(S.radius*g.pxKm).toFixed(1)}"/>`}
  c.areas.forEach(a=>{const[x,y]=proj(g,a[1],a[2]);s+=`<g class="sc" data-x="${x.toFixed(1)}" data-y="${y.toFixed(1)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k})"><text class="m-lab" y="24" text-anchor="middle">${esc(a[0])}</text></g>`});
  if(opts.cityLabel)s+=`<g class="sc" data-x="${g.W/2}" data-y="${(g.H/2-60)|0}" transform="translate(${g.W/2} ${(g.H/2-60)|0}) scale(${k})"><text class="m-city" text-anchor="middle">${esc(c.name)}</text></g>`;
  const[ux,uy]=proj(g,p.lat,p.lng);
  s+=`<g class="sc" data-x="${ux.toFixed(1)}" data-y="${uy.toFixed(1)}" transform="translate(${ux.toFixed(1)} ${uy.toFixed(1)}) scale(${k})"><circle class="m-ring" r="9"/><circle class="m-me" r="9"/></g>`;
  (opts.events||[]).forEach((e,i)=>{const[x,y]=proj(g,e.lat,e.lng);s+=`<g class="pin sc${S.sel===e.id?" sel":""}" data-pin="${e.id}" data-s=".8" data-x="${x.toFixed(1)}" data-y="${y.toFixed(1)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(k*.8).toFixed(4)})" tabindex="0" role="button" aria-label="${esc(e.title)}"><g class="pd${opts.anim?"":" still"}" style="animation-delay:${Math.min(i,24)*25}ms"><path class="pb" style="fill:var(--t-${e.type})" d="M0 0 C-8 -11 -17 -17 -17 -28 A17 17 0 1 1 17 -28 C17 -17 8 -11 0 0z" stroke="#fff" stroke-width="2.5"/><g transform="translate(-9.5 -37.5) scale(.8)" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${UI[typeOf(e.type).icon]}</g></g></g>`});
  const vb=opts.vb||[0,0,g.W,g.H];
  return `<svg viewBox="${vb.map(n=>(+n).toFixed(2)).join(" ")}" preserveAspectRatio="${opts.slice?"xMidYMid slice":"xMidYMid meet"}" data-map="${opts.kind||"main"}" role="img" aria-label="Карта на ${esc(c.name)}">${s}</svg>`;
}
function mapPoint(svg,ev){const pt=svg.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;const m=svg.getScreenCTM();if(!m)return null;const q=pt.matrixTransform(m.inverse());return unproj(geom(city()),q.x,q.y)}

/* ================= ЕФЕКТИ ================= */
const fx=document.getElementById("fx"),ctx=fx.getContext("2d");let parts=[],raf=0;
const reduced=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
function burst(x,y,n,cols,pow){
  if(reduced())return;const dpr=devicePixelRatio||1;fx.width=innerWidth*dpr;fx.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=pow*(.4+Math.random()*.8);parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-pow*.6,s:4+Math.random()*5,c:cols[i%cols.length],r:Math.random()*6,vr:Math.random()*.3-.15,life:60+Math.random()*35})}
  if(!raf)tick();
}
const confetti=(x,y)=>burst(x,y,90,["#0E5551","#5FD1C2","#E8B54A","#F6AEC4","#93C8EA","#EE7848"],10);
const sparkle=(x,y)=>burst(x,y,24,["#0E5551","#5FD1C2","#E8B54A"],5);
function tick(){ctx.clearRect(0,0,innerWidth,innerHeight);parts=parts.filter(p=>p.life-->0);parts.forEach(p=>{p.vy+=.25;p.vx*=.98;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.globalAlpha=Math.min(1,p.life/30);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);ctx.restore()});raf=parts.length?requestAnimationFrame(tick):0;if(!raf)ctx.clearRect(0,0,innerWidth,innerHeight)}
const evXY=ev=>ev&&ev.clientX?[ev.clientX,ev.clientY]:[innerWidth/2,innerHeight/3];

/* ================= ОБЩИ ЕЛЕМЕНТИ ================= */
const isFav=id=>S.favs.includes(id);
const heartBtn=(e,cls="heart")=>{const on=isFav(e.id);return `<button type="button" class="${cls}${on?" on":""}" data-fav="${e.id}" aria-pressed="${on}" aria-label="${on?"Премахни от запазени":"Запази"}">${on?uiFill("heart"):ui("heart")}</button>`};
function rowHTML(e,i=0){
  const mine=S.bookings.includes(e.id);
  return `<article class="row" style="--i:${Math.min(i,12)}"><button type="button" class="open" data-open="${e.id}"><div class="thumb">${eventArt(e,{small:true})}<span class="agepill${evAges(e).length>1?" multi":""}">${e.ageL||catOf(e.cat).short}</span></div>
   <div class="rb"><b>${esc(e.title)}</b>
   <span class="ri">${ui("cal")}<span>${whenShort(new Date(e.start))}</span></span>
   <span class="ri">${ui("pin")}<span>${esc(e.venue)}</span></span>
   ${e._d!=null?`<span class="ri">${ui("nav")}<span>${fmtKm(e._d)}</span></span>`:`<span class="ri">${ui("map")}<span>${esc(cityName(e.city))}</span></span>`}
   ${e.cancelled||mine||!e.price?`<span>${e.cancelled?`<span class="tg warn">Отменено</span>`:""}${mine&&!e.cancelled?`<span class="tg ok">Запазено място</span>`:""}${e.updatedAt&&mine&&!e.cancelled?`<span class="tg">Обновено</span>`:""}${!e.price&&!e.cancelled?`<span class="tg">Безплатно</span>`:""}</span>`:""}
   </div></button>${heartBtn(e)}</article>`;
}
function emptyArt(){return `<svg class="art" viewBox="0 0 120 80" aria-hidden="true"><ellipse cx="60" cy="72" rx="40" ry="5" fill="currentColor" opacity=".12"/><g class="ico"><path d="M60 10a18 18 0 0 0-18 18c0 14 18 34 18 34s18-20 18-34a18 18 0 0 0-18-18z" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="60" cy="28" r="6" fill="currentColor" opacity=".5"/></g></svg>`}
const emptyBox=(txt,btns="")=>`<div class="empty">${emptyArt()}<span>${txt}</span>${btns}</div>`;
const loginBtns=`<div class="btnrow" style="width:100%"><button type="button" class="btn" data-auth="login">Вход</button><button type="button" class="btn ghost" data-auth="register">Регистрация</button></div>`;

/* ================= НАЧАЛО ================= */
function notificationsOld(){
  if(!loggedIn())return[];
  const out=[];
  if(isAdmin()){const pe=pendEvents().length,pu=pendUsers().length,um=unreadAdmin();if(pe)out.push({icon:"cal",t:pe+" обяви чакат одобрение",s:"Отвори Админ панел → Обяви",admin:"events"});if(pu)out.push({icon:"people",t:pu+" нови регистрации",s:"Потвърди или откажи профилите",admin:"users"});if(um)out.push({icon:"bell",t:um+" непрочетени съобщения",s:"От потребители и организатори",admin:"msgs"});return out}
  myThreads().filter(m=>m.uu).forEach(m=>out.push({icon:"bell",t:"Отговор от екипа: "+m.subject,s:m.items[m.items.length-1].text,thread:m.id}));
  if(U().justApproved)out.push({icon:"check",t:"Профилът ти е одобрен",s:S.role==="org"?"Вече можеш да публикуваш събития.":"Вече можеш да запазваш места и да оценяваш.",none:1});
  allEvents().filter(e=>S.bookings.includes(e.id)).forEach(e=>{
    const d=new Date(e.start);
    if(e.cancelled)out.push({icon:"x",t:`„${e.title}“ е отменено`,s:"Организаторът отмени събитието.",id:e.id});
    else if(upcoming(e)){if(e.updatedAt)out.push({icon:"edit",t:`„${e.title}“ е обновено`,s:"Провери часа и мястото.",id:e.id});if(dayDiff(d)<=1)out.push({icon:"bell",t:`Напомняне: ${e.title}`,s:`${whenShort(d)} · ${e.venue}`,id:e.id})}
  });
  S.follows.forEach(o=>{const n=liveEvents().filter(e=>e.org===o&&e.city===S.city&&upcoming(e)&&dayDiff(e.start)<=3);if(n[0])out.push({icon:"star",t:`Ново от ${ORGS[o].name}`,s:n[0].title+" · "+whenShort(new Date(n[0].start)),id:n[0].id})});
  return out;
}
function bannerList(){
  const ages=interestAges();const keys=(ages.length?ages:CATS.map(c=>c.key));
  return keys.map(k=>catOf(k));
}
function renderHome(){
  const greet=loggedIn()?`Здравей, ${esc(S.userName.split(" ")[0])}! 👋`:"Здравей! 👋";
  const banners=bannerList();
  const fy=withDist(liveEvents().filter(e=>e.city===S.city&&upcoming(e)&&matchesInterests(e))).sort((a,b)=>a._d-b._d||new Date(a.start)-new Date(b.start)).slice(0,8);
  const soon=filterEvents(Object.assign(defaultF(),{near:true})).filter(e=>dayDiff(e.start)<=1).slice(0,5);
  const notif=unreadNotifs()>0;
  return `<header class="home-head px">
    <div class="tb-row"><button type="button" class="city-btn" data-loc>${uiFill("pin")}<span>${esc(S.posSrc==="area"?city().name:nearestArea(userPos())+", "+city().name)}</span>${ui("down")}</button>
    <button type="button" class="icon-btn plain" data-notif aria-label="Известия">${ui("bell")}${notif?`<i class="dot"></i>`:""}</button></div>
    <h1>${greet}</h1><p class="hsub">${esc(homeSub())}</p>
    <form class="search" id="searchForm" role="search">${ui("search")}<input id="q" type="search" placeholder="Търси събитие, място или организатор..." aria-label="Търсене" enterkeyhint="search"></form>
  </header>
  <div class="px">
    <div class="hero" id="hero">${banners.map(c=>`<button type="button" class="banner" data-banner="${c.key}">${bannerImg(c)}<div class="bt"><b>${esc(bT(c.key))}</b><span>${esc(bS(c.key))} ${ui("arrow")}</span></div></button>`).join("")}</div>
    <div class="dots" id="dots">${banners.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>
    <div class="quick">
      <button type="button" data-quick="we" style="--qc:var(--t-edu)"><span class="qi">${uiFill2("cal")}</span>Този уикенд</button>
      <button type="button" data-quick="today" style="--qc:var(--t-culture)"><span class="qi">${uiFill2("ticket")}</span>Днес</button>
      <button type="button" data-gosaved style="--qc:var(--t-kids)"><span class="qi">${uiFill("heart")}</span>Любими</button>
      <button type="button" data-quick="near" style="--qc:var(--t-sport)"><span class="qi">${uiFill2("pin")}</span>Близо до мен</button>
    </div>
    ${installTip()}
    <div class="sec"><h2>${S.interests?"Препоръчани за теб":"Предстоящи в "+esc(city().name)}</h2><button type="button" data-quick="fy">Виж всички</button></div>
    ${fy.length?`<div class="hcards">${fy.map((e,i)=>`<article class="hcard" style="--i:${i}"><button type="button" class="open" data-open="${e.id}"><div class="ph">${eventArt(e)}<span class="agepill${evAges(e).length>1?" multi":""}">${e.ageL||catOf(e.cat).short}</span></div><div class="hb"><b>${esc(e.title)}</b><span class="ri">${ui("cal")}<span>${whenShort(new Date(e.start))}</span></span><span class="ri">${ui("nav")}<span>${fmtKm(e._d)} · ${esc(e.area)}</span></span></div></button>${heartBtn(e)}</article>`).join("")}</div>`:emptyBox("Няма предстоящи събития по твоите интереси в този град.",`<button type="button" class="btn ghost sm" data-interests>Промени интересите</button>`)}
    <div class="sec"><h2>Днес и утре около теб</h2><button type="button" data-tab="map">На картата</button></div>
    <div class="rows">${soon.length?soon.map(rowHTML).join(""):emptyBox(`Няма събития до ${S.radius} км за днес и утре.`,`<button type="button" class="btn ghost sm" data-quick="all">Виж целия град</button>`)}</div>
    ${S.interests?"":`<div class="panel" style="margin-top:18px"><b>Кажи ни какво обичате</b><span class="hint">Ще подредим събитията по твоите интереси всеки път, когато отвориш приложението.</span><button type="button" class="btn" data-interests>Избери интереси</button></div>`}
  </div>`;
}

/* ================= СЪБИТИЯ ================= */
function whenLabel(F){return F.when==="today"?"Днес":F.when==="tom"?"Утре":F.when==="sat"?"Тази събота":F.when==="sun"?"Тази неделя":F.when==="we"?"Този уикенд":F.when==="date"&&F.date?shortDate(new Date(F.date+"T12:00")):null}
function pillsHTML(){
  const F=S.F,p=[];
  const w=whenLabel(F);if(w)p.push([ui("cal"),w,"when"]);
  F.ages.forEach(k=>p.push([ui("pin"),catOf(k).label,"age:"+k]));
  F.types.forEach(k=>p.push([ui(typeOf(k).icon),typeOf(k).label,"type:"+k]));
  if(F.near)p.push([ui("nav"),"До "+S.radius+" км","near"]);
  if(F.free)p.push([ui("tag"),"Безплатни","free"]);
  if(F.popular)p.push([ui("star"),"Популярни","popular"]);
  if(F.q)p.push([ui("search"),"„"+esc(F.q)+"“","q"]);
  const n=p.length;
  return `<div class="pills"><button type="button" class="pill f" data-filters>${ui("sliders")}Филтри${n?` <em>${n}</em>`:""}</button>${p.map(([ic,l,k])=>`<span class="pill">${ic}${l}<button type="button" class="px2" data-unpill="${k}" aria-label="Махни ${esc(l.replace(/<[^>]+>/g,""))}">${ui("x")}</button></span>`).join("")}</div>`;
}
function renderEvents(){
  const list=filterEvents(S.F);
  return `<div class="bar px"><span></span><h1>Събития в ${esc(city().name)}</h1><button type="button" class="icon-btn plain" data-tab="map" aria-label="Карта">${ui("map")}</button></div>
  <div class="px">${pillsHTML()}<div class="count">${list.length} ${list.length===1?"събитие":"събития"}</div>
  <div class="rows">${list.length?list.map(rowHTML).join(""):emptyBox("Няма събития по тези филтри.",`<button type="button" class="btn ghost sm" data-fclear-all>Изчисти филтрите</button>`)}</div></div>`;
}

/* ================= КАРТА ================= */
function renderMap(){
  const list=filterEvents(S.F);
  if(!list.find(e=>e.id===S.sel))S.sel=list[0]?.id||null;
  const sel=list.find(e=>e.id===S.sel);
  const v=MV[S.city];S.mapList=list;
  return `<div class="bar px" style="grid-template-columns:1fr"><div class="seg2"><button type="button" data-tab="events">Списък</button><button type="button" class="on">Карта</button></div></div>
  <div class="px" style="padding-bottom:0">${pillsHTML()}</div>
  <div class="mapwrap" id="mapwrap">${hasL()?`<div class="lslot" id="lslot"></div>`:mapSVG({events:list,cityLabel:true,slice:true,radius:S.F.near,anim:true,vb:v?[v.x,v.y,v.w,v.h]:null,k:v?v.w/v.base:1})}
    <button type="button" class="mapchip" data-loc>${uiFill("pin")}<span>${esc(S.posSrc==="area"?city().name:nearestArea(userPos())+", "+city().name)}</span>${ui("down")}</button>
    ${list.length?"":`<div class="maphint" style="top:58px">Няма събития по тези филтри.</div>`}
    <div class="mapctl" id="mapctl" style="bottom:${sel?"138px":"16px"}"><button type="button" class="mz" data-mz="in" aria-label="Увеличи">${ui("plus")}</button><button type="button" class="mz" data-mz="out" aria-label="Намали"><svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg></button><button type="button" class="mz me" data-mme aria-label="Покажи къде съм">${ui("nav")}</button></div>
    <div class="peek" id="peek">${sel?rowHTML(sel):""}</div>
  </div>`;
}

/* ================= ЗАПАЗЕНИ ================= */
function renderSaved(){
  const head=`<div class="bar px"><span></span><h1>Моите запазени</h1><span></span></div>`;
  if(!loggedIn())return head+`<div class="px">${emptyBox("Влез, за да запазваш събития, места и любими организатори.",loginBtns)}</div>`;
  const seg=`<div class="seg2" role="tablist"><button type="button" class="${S.savedTab==="events"?"on":""}" data-savedtab="events">Събития</button><button type="button" class="${S.savedTab==="orgs"?"on":""}" data-savedtab="orgs">Организатори</button></div>`;
  if(S.savedTab==="orgs"){
    const orgs=S.follows.filter(o=>ORGS[o]);
    return head+`<div class="px">${seg}<div class="rows" style="margin-top:14px">${orgs.length?orgs.map((o,i)=>{const O=ORGS[o],evs=liveEvents().filter(e=>e.org===o&&upcoming(e)),rs=evs.flatMap(reviewsOf);return `<article class="row" style="--i:${i}"><button type="button" class="open" data-orgpage="${o}" style="grid-template-columns:56px 1fr"><div class="ava" style="background:${O.col};width:56px;height:56px;border-radius:16px">${esc(O.ini)}</div><div class="rb"><b>${esc(O.name)}</b><span class="ri">${ui("star")}<span>${rs.length?dec(avg(rs))+" · "+rs.length+" оценки":"Още няма оценки"}</span></span><span class="ri">${ui("cal")}<span>${evs.length} предстоящи събития</span></span></div></button><button type="button" class="heart on" data-follow="${o}" aria-label="Спри да следиш">${uiFill("heart")}</button></article>`}).join(""):emptyBox("Натисни сърцето при организатор, за да го следиш и да виждаш новите му събития.")}</div></div>`;
  }
  const evs=withDist(allEvents());
  const booked=evs.filter(e=>S.bookings.includes(e.id)).sort((a,b)=>new Date(a.start)-new Date(b.start));
  const favs=evs.filter(e=>S.favs.includes(e.id)&&!S.bookings.includes(e.id)).sort((a,b)=>new Date(a.start)-new Date(b.start));
  return head+`<div class="px">${seg}
   <div class="sec"><h2>Запазени места</h2><span class="hint">${booked.length}</span></div>
   <div class="rows">${booked.length?booked.map(rowHTML).join(""):emptyBox("Още нямаш запазени места.",`<button type="button" class="btn ghost sm" data-tab="events">Разгледай събития</button>`)}</div>
   <div class="sec"><h2>Любими събития</h2><span class="hint">${favs.length}</span></div>
   <div class="rows">${favs.length?favs.map(rowHTML).join(""):emptyBox("Натисни сърцето на събитие, за да го запазиш тук.")}</div></div>`;
}

/* ================= ПРОФИЛ ================= */
const mrow=(icon,title,sub,attrs,right)=>`<button type="button" class="mrow" ${attrs}><span class="mi">${ui(icon)}</span><span class="mt"><b>${title}</b>${sub?`<small>${sub}</small>`:""}</span>${right??ui("right")}</button>`;
function interestsSummary(){const I=S.interests;if(!I)return"Още не са избрани";const a=[...I.picks.map(k=>PICKS.find(p=>p.key===k)?.label),...I.ages.map(k=>catOf(k).short)].filter(Boolean);return a.join(", ")||"Всички събития"}
function renderProfile(){
  const u=U(),org=S.role==="org"?ORGS[myOrg()]:null;
  if(isAdmin())return `<div class="bar px"><button type="button" class="icon-btn plain" data-tab="home" aria-label="Към началото">${ui("back")}</button><h1>Профил</h1><button type="button" class="icon-btn plain" data-settings aria-label="Настройки">${ui("gear")}</button></div>
    <header class="prof-top px"><div class="bigava" style="background:var(--ink)">${ui("gear")}</div><h2>${esc(S.userName)}</h2><small>Администратор · ${esc(S.me)}</small></header>
    <div class="px"><div class="menu">${adminProfileMenu()}</div><p class="sample">Админ панелът управлява обявите, профилите, съобщенията и съдържанието.</p></div>`;
  const favC=(u.favCities.length?u.favCities:[S.city]).map(cityName).join(", ");
  const head=`<div class="bar px"><button type="button" class="icon-btn plain" data-tab="home" aria-label="Към началото">${ui("back")}</button><h1>Профил</h1>${loggedIn()?`<button type="button" class="icon-btn plain" data-settings aria-label="Настройки">${ui("gear")}</button>`:"<span></span>"}</div>
    <header class="prof-top px">
    <div class="bigava" ${org?`style="background:${org.col}"`:""}>${org?esc(org.ini):uiFill("user")}</div>
    <h2>${loggedIn()?esc(S.userName):"Здравей!"}</h2><small>${loggedIn()?(org?"Организатор":"Потребител")+" · "+esc(S.email):"Влез, за да запазваш места и да оставяш оценки"}</small></header>`;
  if(!loggedIn())return head+`<div class="px"><div class="menu" style="padding:16px">${loginBtns}</div><div class="menu" style="margin-top:14px">
    ${mrow("grid","Моите интереси",esc(interestsSummary()),"data-interests")}
    ${mrow("pin","Любими локации",esc(city().name),"data-loc")}
    ${mrow("grid","Политика за поверителност","Какви данни пазим и защо","data-policy")}</div>
    <p class="sample">Организатор ли си? Регистрирай се като организатор и публикувай събития безплатно.</p></div>`;
  const pendBan=u.status==="pending"?`<div class="pendban">${ui("clock")}<span><b>Профилът чака одобрение</b><br>Администратор ще потвърди регистрацията ти. Дотогава можеш да разглеждаш, но не и да ${org?"публикуваш събития":"запазваш места и да оценяваш"}.</span></div>`:"";
  const ur=unreadUser();
  return head+`<div class="px">${pendBan}<div class="menu">
    ${org?mrow("chart","Организаторски панел","Събития и записани","data-screen=\"dash\""):""}
    ${org?mrow("plus","Публикувай събитие",freeNow()?"Безплатно до "+freeDate():"Безплатно, "+feeAmt()+" € на дошъл посетител","data-newev"):""}
    ${mrow("grid","Моите интереси","(категории и възраст) "+esc(interestsSummary()),"data-interests")}
    ${mrow("pin","Любими локации",esc(favC),"data-loc")}
    ${mrow("bell","Известия","Нови събития и напомняния","data-togglenotif",`<span class="sw${u.notif?" on":""}" role="switch" aria-checked="${u.notif}"></span>`)}
    ${mrow("ticket","Моите резервации",S.bookings.length+" запазени места","data-gosaved")}
    ${mrow("history","История на посещенията","Минали събития и оценки","data-screen=\"history\"")}
    ${mrow("bell","Съобщения",ur?ur+" нов отговор от екипа":"Пиши на екипа на Joyli","data-inbox",ur?`<span class="cntb">${ur}</span>${ui("right")}`:undefined)}
    ${mrow("grid","Моите данни и поверителност","Какво пазим, изтриване на профила","data-mydata")}
    ${mrow("logout","Изход от профила","","data-logout","")}
  </div></div>`;
}

/* ================= ЕКРАНИ НА ЦЯЛ ЕКРАН ================= */
function welcomeHTML(){
  const t=wT(0);
  return `<div class="welcome2"><div class="px wtop"><div class="appicon">${ui("cal","i",2.2)}<span class="spark"></span></div><div class="brandname" aria-hidden="true">Joyli</div>
   <div id="wtext"><h1>${t[0]}<br>${t[1]}</h1><p>${t[2]}</p></div></div>
   <div class="wslides" id="wslides">${[0,1,2].map(i=>`<div class="wslide">${welcomeImg(i)}</div>`).join("")}</div>
   <div class="wcard px"><div class="dots" id="wdots"><i class="on"></i><i></i><i></i></div>
   <button type="button" class="btn block" data-start>Започни ${ui("arrow")}</button>
   <p class="hint">Вече имаш профил? <button type="button" data-auth="login" class="lnk">Вход</button></p><p class="hint" style="margin-top:-6px"><button type="button" class="lnk" data-policy style="font-weight:600;color:var(--muted)">Политика за поверителност</button></p></div></div>`;
}
const WTITLES=[["Събития","в България","Открий интересни събития за теб и твоето семейство в цялата страна."],["Всичко","около теб","Виж на картата какво се случва в твоя квартал днес и през уикенда."],["Едно докосване","и си вътре","Запази място, остави оценка и следи любимите си организатори."]];
function interestsHTML(step){
  const ob=S.ob;
  if(step===0)return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><div class="prog" aria-label="Стъпка 1 от 2"><i style="width:50%"></i></div><button type="button" class="link" data-obskip>Пропусни</button></div>
   <div class="px"><h1 class="ititle">Какви събития<br>те интересуват?</h1><p class="isub">Можеш да избереш повече от една категория.</p>
   <div class="igrid">${PICKS.map(p=>`<button type="button" class="itile${ob.picks.includes(p.key)?" on":""}" data-pick="${p.key}" aria-pressed="${ob.picks.includes(p.key)}" style="--tc:var(--t-${p.key})"><span class="tic">${uiFill2(p.icon)}</span><span>${p.label}</span><span class="ck2">${ui("check","i",3)}</span></button>`).join("")}</div></div>
   <div class="foot px"><button type="button" class="btn block" data-obnext>Продължи</button></div>`;
  return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><div class="prog" aria-label="Стъпка 2 от 2"><i style="width:100%"></i></div><button type="button" class="link" data-obdone>Пропусни</button></div>
   <div class="px"><h1 class="ititle">За каква възраст търсиш?</h1><p class="isub">${ob.picks.includes("kids")?"Избери възрастта на децата. Може и няколко.":"Избери за кого са събитията. Може и няколко."}</p>
   <div class="agecards">${CATS.map(c=>`<button type="button" class="agecard${ob.ages.includes(c.key)?" on":""}" data-obage="${c.key}" aria-pressed="${ob.ages.includes(c.key)}"><div class="ac">${cover("ob"+c.key,c.key,c.icon,{small:true})}</div><div class="at"><b>${c.label}</b><small>${c.sub}</small></div><span class="ck2">${ui("check","i",3)}</span></button>`).join("")}</div></div>
   <div class="foot px"><button type="button" class="btn block" data-obdone>Покажи моите събития</button></div>`;
}
let rateVal=0;
function eventHTML(id){
  const e=findEv(id);if(!e)return `<div class="bar px"><button type="button" class="icon-btn plain" data-back>${ui("back")}</button><h1>Няма такова събитие</h1></div>`;
  const d=new Date(e.start),end=new Date(d.getTime()+e.dur*6e4),O=ORGS[e.org]||{name:"",ini:"?",col:"#2B7A73",bio:""},rs=reviewsOf(e),mine=S.bookings.includes(e.id),p=userPos();
  const km=e.city===S.city?dist(p.lat,p.lng,e.lat,e.lng):null,mr=S.myReviews[e.id];rateVal=mr?mr.stars:0;
  const bc=bookedCount(e),left=e.cap?Math.max(0,e.cap-bc):null,orgRs=allEvents().filter(x=>x.org===e.org).flatMap(reviewsOf),fol=S.follows.includes(e.org);
  const maps=`https://www.google.com/maps/search/?api=1&query=${e.lat.toFixed(5)},${e.lng.toFixed(5)}`;
  const own=ownsEvent(e);
  let cta;
  if(e.cancelled)cta=`<button type="button" class="btn block" disabled>Събитието е отменено</button>`;
  else if(!upcoming(e))cta=`<button type="button" class="btn block" disabled>Събитието приключи</button>`;
  else if(e.ext)cta=`<a class="btn block" href="${esc(e.ext)}" target="_blank" rel="noopener">Запази място при организатора ${ui("arrow")}</a><p class="hint" style="text-align:center;margin:6px 0 0">Записването става на сайта на ${esc(O.name||"организатора")}.</p>`;
  else if(e.booking)cta=mine?`<div class="btnrow"><button type="button" class="btn ghost" data-unbook="${e.id}">Откажи</button><button type="button" class="btn" disabled style="opacity:1">${ui("check")} Запазено · код ${bookCode(e.id,S.me)}</button></div>`:`<button type="button" class="btn block" data-book="${e.id}" ${left===0?"disabled":""}>${left===0?"Няма свободни места":"Запази място "+ui("arrow")}</button>`;
  else cta=`<a class="btn block" href="${maps}" target="_blank" rel="noopener">Свободен вход · Как да стигна ${ui("nav")}</a>`;
  return `<div class="ev-hero">${eventArt(e,{small:true})}<div class="cbtns"><button type="button" class="cbtn" data-back aria-label="Назад">${ui("back")}</button><span class="sp"></span><button type="button" class="cbtn" data-share="${e.id}" aria-label="Сподели">${ui("share")}</button>${heartBtn(e,"cbtn")}</div></div>
  <div class="ev-card px">
    <h1>${esc(e.title)}</h1>
    <div class="chips"><span class="chip-a${evAges(e).length>1?" multi":""}">${e.ageL||catOf(e.cat).label}</span><span class="chip-t">${typeOf(e.type).label}</span>${e.cancelled?`<span class="tg warn">Отменено</span>`:""}</div>
    ${e.updatedAt&&mine&&!e.cancelled?`<p class="hint"><span class="tg">Обновено</span> Организаторът промени детайлите. Провери часа и мястото.</p>`:""}
    <div class="info">
      <div>${ui("cal")}<span>${longDate(d)}${e.repeat?`<small>Повтаря се ${WEVERY[d.getDay()]}</small>`:""}</span></div>
      <div>${ui("clock")}<span>${hm(d)} – ${hm(end)}</span></div>
      <div>${ui("pin")}<span>${esc(e.venue)}<small>${esc(e.address||"")}${e.address?", ":""}кв. ${esc(e.area)}, ${esc(cityName(e.city))}</small></span>${km!=null?`<em>${fmtKm(km)}</em>`:""}</div>
      <div>${ui("euro")}<span>${price(e.price)}</span></div>
      ${e.booking?`<div>${ui("people")}<span>${left} свободни от ${e.cap} места<div class="bar2"><i style="width:${Math.round(bc/e.cap*100)}%"></i></div></span></div>`:""}
    </div>
    <p class="desc">${esc(e.desc)}</p>
    ${isAdmin()?`<div class="box"><b style="font-size:14px">Админ · <span class="tg ${MODL[modOf(e)][1]}">${MODL[modOf(e)][0]}</span></b><div class="btnrow"><button type="button" class="btn sm" data-edit="${e.id}">${ui("edit")} Редактирай</button><button type="button" class="btn ghost sm" data-dup="${e.id}">Копирай</button>${modOf(e)!=="approved"?`<button type="button" class="btn ghost sm" data-mod="approve" data-id="${e.id}">Одобри</button>`:`<button type="button" class="btn ghost sm" data-mod="hide" data-id="${e.id}">Скрий</button>`}</div></div>`:""}
    ${own&&e.mod&&e.mod!=="approved"?`<p class="hint"><span class="tg ${MODL[e.mod][1]}">${MODL[e.mod][0]}</span> ${e.mod==="pending"?"Обявата ще се вижда, след като администратор я одобри.":esc(e.modNote||"")}</p>`:""}
    ${own?`<div class="box"><b style="font-size:14px">Това е твое събитие</b><div class="btnrow"><button type="button" class="btn sm" data-edit="${e.id}">${ui("edit")} Редактирай</button>${e.cancelled?`<button type="button" class="btn ghost sm" data-restore="${e.id}">Възстанови</button>`:`<button type="button" class="btn ghost sm" data-screen="dash">Записани и такси</button>`}</div></div>`:""}
    <div class="orgrow"><button type="button" class="open" data-orgpage="${e.org}"><div class="ava" style="background:${O.col}">${esc(O.ini)}</div><div style="min-width:0"><b>${esc(O.name)}</b><div class="hint">${orgRs.length?`<span class="stars">★</span> ${dec(avg(orgRs))} · ${orgRs.length} оценки`:"Организатор"}</div></div></button>
      ${isExt(e.org)?"":`<button type="button" class="btn ${fol?"":"line "}sm" data-follow="${e.org}">${fol?"Следваш":"Следвай"}</button>`}</div>
    <div style="display:grid;gap:10px"><div class="sec" style="margin:4px 0 0"><h2>Оценки</h2>${rs.length?`<span><span class="stars">${starStr(avg(rs))}</span> <b>${dec(avg(rs))}</b></span>`:""}</div>
      <div class="rate-pick" id="ratePick" role="group" aria-label="Твоята оценка">${[1,2,3,4,5].map(i=>`<button type="button" data-rate="${i}" class="${i<=rateVal?"on":""}" aria-label="${i} звезди">★</button>`).join("")}</div>
      <textarea id="rText" placeholder="Как мина? Сподели с другите." maxlength="300" aria-label="Коментар">${mr?esc(mr.text):""}</textarea>
      <button type="button" class="btn ghost" data-review="${e.id}">${mr?"Обнови оценката":"Публикувай оценка"}</button>
      ${rs.length?rs.slice().reverse().map((r,i)=>`<div class="review" style="animation-delay:${i*60}ms"><b>${esc(r.name)}</b> <span class="stars">${starStr(r.stars)}</span><div>${esc(r.text||"")}</div></div>`).join(""):`<p class="hint">Бъди първият, който оценява.</p>`}
    </div>
  </div>
  <div class="foot px">${cta}</div>`;
}
function filtersHTML(){
  const F=S.FD,n=filterEvents(F).length;
  const whenBtns=[["all","Всички дни"],["today","Днес"],["sat","Тази събота"],["sun","Тази неделя"],["we","Този уикенд"]];
  return `<div class="bar wide px"><button type="button" class="icon-btn plain" data-back aria-label="Затвори">${ui("x")}</button><h1>Филтри</h1><button type="button" class="link" data-fclear>Изчисти</button></div>
  <div class="px fsec">
    <h3 style="margin-top:6px">Възраст</h3>
    <div class="agegrid"><button type="button" class="agebtn${F.ages.length?"":" on"}" data-fage="all">Всички</button>${CATS.map(c=>`<button type="button" class="agebtn${F.ages.includes(c.key)?" on":""}" data-fage="${c.key}" aria-pressed="${F.ages.includes(c.key)}">${c.label}${F.ages.includes(c.key)?ui("check","i",3):""}</button>`).join("")}</div>
    <h3>Дата</h3>
    <div class="dlist">${whenBtns.map(([k,l])=>`<button type="button" class="drow${F.when===k?" on":""}" data-fwhen="${k}" aria-pressed="${F.when===k}">${ui("cal")}<span>${l}</span>${F.when===k?`<span class="dck">${ui("check","i",3)}</span>`:""}</button>`).join("")}<button type="button" class="drow${F.when==="date"?" on":""}" data-screen="date">${ui("cal")}<span>${F.when==="date"&&F.date?shortDate(new Date(F.date+"T12:00")):"Избери дата"}</span>${F.when==="date"?`<span class="dck">${ui("check","i",3)}</span>`:ui("right")}</button></div>
    <h3>Вид събитие</h3>
    <div class="checks">${TYPES.map(t=>`<button type="button" class="ck${F.types.includes(t.key)?" on":""}" data-ftype="${t.key}" role="checkbox" aria-checked="${F.types.includes(t.key)}"><span class="box2">${F.types.includes(t.key)?ui("check","i",3.2):""}</span>${t.label}${ui(t.icon,"i ti")}</button>`).join("")}</div>
    <h3>Разстояние и цена</h3>
    <button type="button" class="toggle" data-fnear>Само около мен <span class="sw${F.near?" on":""}"></span></button>
    ${F.near?`<label class="radius"><span>Радиус</span><input id="fRadius" type="range" min="1" max="15" step="1" value="${S.radius}"><output id="fRadiusOut">${S.radius} км</output></label>`:""}
    <button type="button" class="toggle" data-ffree>Само безплатни <span class="sw${F.free?" on":""}"></span></button>
    <button type="button" class="toggle" data-fpop>Подреди по популярност <span class="sw${F.popular?" on":""}"></span></button>
  </div>
  <div class="foot px"><button type="button" class="btn block" data-fapply id="fApply">Покажи резултатите (${n})</button></div>`;
}
function dateHTML(){
  const tgt=S.screens.some(s=>s.name==="filters")?S.FD:S.F;
  if(!S.cal){const b=tgt.date?new Date(tgt.date+"T12:00"):new Date();S.cal={y:b.getFullYear(),m:b.getMonth(),sel:tgt.when==="date"?tgt.date:null,mode:tgt.when==="date"?"date":tgt.when}}
  const{y,m}=S.cal,first=new Date(y,m,1),off=(first.getDay()+6)%7,days=new Date(y,m+1,0).getDate(),prevDays=new Date(y,m,0).getDate();
  const has=new Set(liveEvents().filter(e=>e.city===S.city&&upcoming(e)).map(e=>ymd(e.start)));
  const we=weekendDays().map(x=>ymd(today.getTime()+x*864e5)),tY=ymd(today),tm=ymd(today.getTime()+864e5);
  const selSet=S.cal.mode==="today"?[tY]:S.cal.mode==="tom"?[tm]:S.cal.mode==="we"?we:S.cal.sel?[S.cal.sel]:[];
  let cells="";
  for(let i=0;i<off;i++)cells+=`<button type="button" class="out" disabled>${prevDays-off+1+i}</button>`;
  for(let d=1;d<=days;d++){const k=y+"-"+pad2(m+1)+"-"+pad2(d),past=new Date(y,m,d)<today;cells+=`<button type="button" data-day="${k}" class="${k===tY?"today ":""}${selSet.includes(k)?"sel ":""}${has.has(k)?"has":""}" ${past?"disabled":""} aria-label="${d} ${ML[m]}${has.has(k)?", има събития":""}">${d}</button>`}
  const tail=(7-(off+days)%7)%7;for(let i=1;i<=tail;i++)cells+=`<button type="button" class="out" disabled>${i}</button>`;
  return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>Избор на дата</h1><span></span></div>
  <div class="px"><div class="calhead"><button type="button" class="icon-btn plain" data-calm="-1" aria-label="Предишен месец">${ui("back")}</button><b>${MN[m]} ${y}</b><button type="button" class="icon-btn plain" data-calm="1" aria-label="Следващ месец">${ui("right")}</button></div>
  <div class="cal">${["Пн","Вт","Ср","Чт","Пт","Сб","Нд"].map(w=>`<span class="wd">${w}</span>`).join("")}${cells}</div>
  <p class="hint" style="margin-top:10px">Точка под датата значи, че има събития в ${esc(city().name)}.</p>
  <div class="quickd">${[["today","Днес"],["tom","Утре"],["we","Този уикенд"]].map(([k,l])=>`<button type="button" class="${S.cal.mode===k?"on":""}" data-calq="${k}">${ui("cal")}${l}</button>`).join("")}</div></div>
  <div class="foot px"><button type="button" class="btn block" data-capply>Приложи дата</button></div>`;
}
function orgPageHTML(o){
  const O=ORGS[o];if(!O)return"";
  const evs=withDist(liveEvents().filter(e=>e.org===o&&upcoming(e))).sort((a,b)=>new Date(a.start)-new Date(b.start)),rs=allEvents().filter(e=>e.org===o).flatMap(reviewsOf),fol=S.follows.includes(o);
  const here=evs.filter(e=>e.city===S.city),else_=evs.filter(e=>e.city!==S.city);
  return `<header class="band prof-top px"><button type="button" class="icon-btn" data-back aria-label="Назад" style="position:absolute;left:max(14px,env(safe-area-inset-left,0px));top:12px">${ui("back")}</button>
   <div class="bigava" style="background:${O.col};color:#fff">${esc(O.ini)}</div><h2>${esc(O.name)}</h2><small>${rs.length?`★ ${dec(avg(rs))} · ${rs.length} оценки`:"Още няма оценки"}</small>
   ${isExt(o)?"":`<button type="button" class="btn ${fol?"white":"ghost"} sm" data-follow="${o}" style="margin-top:6px">${fol?uiFill("heart")+" Следваш":ui("heart")+" Следвай"}</button>`}</header>
  <div class="px"><div class="panel" style="margin-top:-22px;position:relative"><span>${esc(O.bio)}</span><div class="stats"><div class="stat"><b>${evs.length}</b><span>предстоящи</span></div><div class="stat"><b>${rs.length?dec(avg(rs)):"–"}</b><span>средна оценка</span></div><div class="stat"><b>${new Set(evs.map(e=>e.city)).size}</b><span>града</span></div></div></div>
  <div class="sec"><h2>В ${esc(city().name)}</h2><span class="hint">${here.length}</span></div><div class="rows">${here.length?here.map(rowHTML).join(""):emptyBox("Няма предстоящи събития в този град.")}</div>
  ${else_.length?`<div class="sec"><h2>В други градове</h2><span class="hint">${else_.length}</span></div><div class="rows">${else_.slice(0,6).map(rowHTML).join("")}</div>`:""}<div style="height:24px"></div></div>`;
}
const orgEvents=()=>{const o=myOrg();if(!o)return[];return allEvents().filter(e=>e.org===o)};
const ownsEvent=e=>loggedIn()&&S.role==="org"&&e.org===myOrg();
function attendees(e){return LIVE.attendees[e.id]||[]}
const fees=()=>orgEvents().reduce((n,e)=>n+attendees(e).filter(a=>a.st==="attended").length,0);
function dashHTML(){
  const O=ORGS[myOrg()];if(!O)return"";
  const evs=orgEvents().filter(e=>new Date(e.start).getTime()+e.dur*6e4>Date.now()-864e5).sort((a,b)=>new Date(a.start)-new Date(b.start)),active=evs.filter(e=>!e.cancelled);
  const n=fees(),tb=active.reduce((s,e)=>s+(e.booking?attendees(e).length:0),0);
  return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>Организаторски панел</h1><span></span></div>
  <div class="px" style="display:grid;gap:12px;padding-bottom:28px">
   <div class="panel"><div style="display:flex;gap:12px;align-items:center"><div class="ava" style="background:${O.col}">${esc(O.ini)}</div><div><b>${esc(O.name)}</b><div class="hint">${esc(city().name)}</div></div></div>
    <div class="stats"><div class="stat"><b>${active.length}</b><span>активни събития</span></div><div class="stat"><b>${tb}</b><span>резервации</span></div><div class="stat"><b>${feeSum(orgEvents())} €</b><span>${freeNow()?"такса · безплатно до "+freeDate():"такса за плащане"}</span></div></div>
    ${freeNow()?`<div class="pendban" style="margin:0;background:color-mix(in srgb,var(--ok) 12%,var(--surface));border-color:color-mix(in srgb,var(--ok) 35%,var(--line))">${ui("check")}<span><b>Без такси до ${freeDate()}</b><br>${feeNote()}</span></div>`:`<p class="hint">${feeNote()}</p>`}
    <button type="button" class="btn block" data-newev>${ui("plus")} Публикувай събитие</button></div>
   ${evs.map(e=>{const d=new Date(e.start),at=attendees(e);return `<div class="dash"><div class="th">${eventArt(e,{small:true})}</div>
    <div style="min-width:0;display:grid;gap:4px"><b>${esc(e.title)}</b><span class="ri">${ui("cal")}<span>${whenShort(d)} · ${esc(e.area)}</span></span><span>${e.mod==="pending"?`<span class="tg pend">Чака одобрение</span>`:""}${e.mod==="rejected"?`<span class="tg warn">Отказано</span>`:""}${e.mod==="hidden"?`<span class="tg warn">Скрито от администратор</span>`:""}${e.cancelled?`<span class="tg warn">Отменено</span>`:""}${e.updatedAt?`<span class="tg">Редактирано</span>`:""}<span class="tg">${e.ageL||catOf(e.cat).short}</span></span>${e.mod==="rejected"&&e.modNote?`<span class="hint">Причина: ${esc(e.modNote)}</span>`:""}</div>
    <div class="full btnrow"><button type="button" class="btn ghost sm" data-open="${e.id}">Виж</button><button type="button" class="btn ghost sm" data-edit="${e.id}">${ui("edit")} Редактирай</button>${e.cancelled?`<button type="button" class="btn ghost sm" data-restore="${e.id}">Възстанови</button>`:`<button type="button" class="btn ghost sm" data-cancelask="${e.id}">Отмени</button>`}</div>
    <div class="full box" id="ca-${e.id}" hidden><span class="hint">Сигурен ли си? Събитието изчезва от търсенето, а записаните ще видят, че е отменено.</span><div class="btnrow"><button type="button" class="btn sm" data-cancel="${e.id}">Да, отмени</button><button type="button" class="btn ghost sm" data-cancelno="${e.id}">Не</button></div></div>
    <div class="full">${e.cancelled?"":e.booking?(at.length?at.map(a=>`<div class="att"><span>${e.repeat&&a.when?whenShort(new Date(a.when))+" · ":""}${esc(a.name)} · <b class="code">${a.code}</b> · <span class="st ${a.st}">${a.st==="attended"?(feeFor(a)?"дойде · "+feeFor(a)+" €":"дойде"):a.st==="no_show"?"не дойде":"очаква се"}</span></span><span style="display:flex;gap:6px"><button type="button" class="btn sm" data-att="${a.id}" data-v="attended">Дойде</button><button type="button" class="btn ghost sm" data-att="${a.id}" data-v="no_show">Не дойде</button></span></div>`).join(""):`<p class="hint">Още няма резервации.</p>`):`<p class="hint">Свободен вход, без резервации и без такса.</p>`}</div></div>`}).join("")||emptyBox(`Нямаш събития в ${esc(city().name)}. Публикувай първото.`)}
</div>`;
}
function historyHTML(){
  const evs=withDist(allEvents().filter(e=>S.bookings.includes(e.id)&&!upcoming(e)));
  const rated=withDist(allEvents().filter(e=>S.myReviews[e.id]));
  return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>История</h1><span></span></div>
  <div class="px"><div class="sec" style="margin-top:4px"><h2>Посетени събития</h2></div><div class="rows">${evs.length?evs.map(rowHTML).join(""):emptyBox("Тук ще се появят събитията, на които си запазил място, след като минат.")}</div>
  <div class="sec"><h2>Моите оценки</h2></div><div class="rows">${rated.length?rated.map(rowHTML).join(""):emptyBox("Още не си оценил събитие.")}</div><div style="height:24px"></div></div>`;
}

function uiFill2(k){return `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${UI[k]}</svg>`}

/* ================= АДМИН: ДАННИ ================= */
const isAdmin=()=>loggedIn()&&S.role==="admin";
S.adm={tab:"overview",ev:"pending",reg:"pending",q:"",city:"all",lim:30,rej:null};
Object.defineProperty(S,"msgs",{get:()=>LIVE.threads});

/* ================= СЪДЪРЖАНИЕ (CMS) ================= */
const cmsV=(k,d)=>(S.cms[k]!==undefined&&S.cms[k]!=="")?S.cms[k]:d;
const wT=i=>[cmsV("w"+i+"a",WTITLES[i][0]),cmsV("w"+i+"b",WTITLES[i][1]),cmsV("w"+i+"p",WTITLES[i][2])];
const bT=k=>cmsV("b_"+k+"_t",catOf(k).banner),bS=k=>cmsV("b_"+k+"_s",catOf(k).bsub);
const homeSub=()=>cmsV("home_sub","Нека открием следващото ти любимо събитие.");
const welcomeImg=i=>S.cms["wimg"+i]?`<img src="${S.cms["wimg"+i]}" alt="">`:splashArt(i);
const bannerImg=c=>S.cms["bimg_"+c.key]?`<img src="${S.cms["bimg_"+c.key]}" alt="">`:cover("bn"+c.key,c.key,c.icon,{right:true,big:true});
function readImage(file,maxW,cb){const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const sc=Math.min(1,maxW/im.width),cv=document.createElement("canvas");cv.width=Math.round(im.width*sc);cv.height=Math.round(im.height*sc);cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);cb(cv.toDataURL("image/jpeg",.75))};im.onerror=()=>toast("Файлът не е снимка. Опитай с JPG или PNG.");im.src=rd.result};rd.readAsDataURL(file)}

/* ================= ТАКСИ ================= */
const FREE_DEF="2027-02-14";
const freeUntil=()=>cmsV("free_until",FREE_DEF);
const feeAmt=()=>Math.max(0,+cmsV("fee","1")||0);
const freeNow=()=>Date.now()<new Date(freeUntil()+"T23:59:59").getTime();
const freeDate=()=>{const d=new Date(freeUntil()+"T12:00");return d.getDate()+" "+ML[d.getMonth()]+" "+d.getFullYear()};
const curFee=()=>freeNow()?0:feeAmt();
const freeEndTs=()=>new Date(freeUntil()+"T23:59:59").getTime();
const feeFor=a=>0;
const feeSum=evs=>LIVE.myFees||0;
const feeNote=()=>freeNow()?`Публикуването и резервациите са напълно безплатни до ${freeDate()}. След това: ${feeAmt()} € за всеки посетител, който е запазил място и е дошъл.`:`Публикуването е безплатно. Плащаш ${feeAmt()} € само за посетител, който е запазил място през приложението и е дошъл. Отбележи присъствието след събитието.`;

/* ================= АДМИН: ПОМОЩНИ ================= */
const modOf=e=>e.mod||"approved";
const MODL={pending:["Чака одобрение","pend"],approved:["Одобрено","ok"],rejected:["Отказано","warn"],hidden:["Скрито","warn"]};
const STL={pending:["Чака одобрение","pend"],approved:["Одобрен","ok"],rejected:["Отказан","warn"],blocked:["Блокиран","warn"]};
const ago=t=>{const m=Math.round((Date.now()-t)/6e4);if(m<1)return"сега";if(m<60)return"преди "+m+" мин";const h=Math.round(m/60);if(h<24)return"преди "+h+" ч";const d=Math.round(h/24);return"преди "+d+(d===1?" ден":" дни")};
const pendEvents=()=>allEvents().filter(e=>modOf(e)==="pending");
const pendUsers=()=>LIVE.admin.users.filter(u=>u.status==="pending"&&u.role!=="admin");
const unreadAdmin=()=>S.msgs.filter(m=>m.ua).length;
const myThreads=()=>S.msgs.filter(m=>m.from===S.me).sort((a,b)=>b.items[b.items.length-1].at-a.items[a.items.length-1].at);
const unreadUser=()=>myThreads().filter(m=>m.uu).length;
const roleL=r=>r==="org"?"Организатор":r==="admin"?"Админ":"Потребител";
function totalAttended(){return LIVE.admin.totals.attended||0}
function totalFees(){return +LIVE.admin.totals.fees||0}
function userAva(u){const nm=u.name||u.full_name||"?",o=u.role==="org"?ORGS[u.orgId||u.id]:null;return `<div class="ava" style="background:${o?o.col:"var(--brand)"};width:44px;height:44px;border-radius:14px">${esc(o?o.ini:(nm.replace(/[^А-Яа-яA-Za-z]/g,"")[0]||"?").toUpperCase())}</div>`}

/* ================= АДМИН: ЕКРАНИ ================= */
function adminHTML(){
  const A=S.adm,pe=pendEvents().length,pu=pendUsers().length,um=unreadAdmin();
  const tabs=[["overview","Обзор",0],["events","Обяви",pe],["users","Регистрации",pu],["msgs","Съобщения",um],["cast","Известия",0],["content","Съдържание",0]];
  const head=`<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>Админ панел</h1><span></span></div>
   <div class="px"><div class="pills" role="tablist">${tabs.map(([k,l,n])=>`<button type="button" role="tab" aria-selected="${A.tab===k}" class="pill tabp${A.tab===k?" on":""}" data-atab="${k}">${l}${n?` <em class="cnt">${n}</em>`:""}</button>`).join("")}</div></div>`;
  let body="";
  if(A.tab==="overview"||A.tab==="events")body=`<button type="button" class="btn block" data-newev style="margin-bottom:14px">${ui("plus")} Публикувай събитие</button>`;
  if(A.tab==="overview"){
    const users=LIVE.admin.users.filter(u=>u.role==="user").length,orgs=LIVE.admin.users.filter(u=>u.role==="org").length,live=liveEvents().filter(upcoming).length;
    body+=`<div class="tiles">
      <button type="button" class="tile hot" data-atab="events"><b>${pe}</b><span>обяви чакат одобрение</span></button>
      <button type="button" class="tile hot" data-atab="users"><b>${pu}</b><span>регистрации за потвърждение</span></button>
      <button type="button" class="tile hot" data-atab="msgs"><b>${um}</b><span>непрочетени съобщения</span></button>
      <div class="tile"><b>${live}</b><span>активни събития</span></div>
      <div class="tile"><b>${users} / ${orgs}</b><span>потребители / организатори</span></div>
      ${freeNow()?`<button type="button" class="tile" data-atab="content"><b>0 €</b><span>такси · безплатно до ${freeDate()}</span></button>`:`<div class="tile"><b>${totalFees()} €</b><span>такси от ${totalAttended()} дошли посетители</span></div>`}</div>
     <div class="sec"><h2>Чака одобрение</h2><button type="button" data-atab="events">Всички</button></div>
     <div class="rows">${pendEvents().slice(0,3).map(admEvRow).join("")||emptyBox("Няма обяви за одобрение.")}</div>
     <div class="sec"><h2>Нови регистрации</h2><button type="button" data-atab="users">Всички</button></div>
     <div class="rows">${pendUsers().slice(0,3).map(admUserRow).join("")||emptyBox("Няма чакащи регистрации.")}</div>`;
  }
  if(A.tab==="events"){
    const fl=[["pending","Чакащи"],["approved","Одобрени"],["rejected","Отказани"],["hidden","Скрити"],["all","Всички"]];
    let l=allEvents().filter(e=>A.ev==="all"||modOf(e)===A.ev).filter(e=>A.city==="all"||e.city===A.city);
    const q=A.q.trim().toLowerCase();if(q)l=l.filter(e=>(e.title+" "+(ORGS[e.org]?.name||"")+" "+e.venue).toLowerCase().includes(q));
    l.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)||new Date(a.start)-new Date(b.start));
    body+=`<div class="agegrid" style="margin-bottom:10px">${fl.map(([k,lb])=>`<button type="button" class="agebtn${A.ev===k?" on":""}" data-aev="${k}">${lb}${k==="pending"&&pendEvents().length?` (${pendEvents().length})`:""}</button>`).join("")}</div>
     <div class="row2" style="margin-bottom:12px"><input type="text" id="aQ" placeholder="Търси заглавие или организатор" value="${esc(A.q)}" aria-label="Търсене на обяви"><label class="field" style="display:block"><select id="aCity" aria-label="Град"><option value="all">Всички градове</option>${CITIES.map(c=>`<option value="${c.id}"${A.city===c.id?" selected":""}>${esc(c.name)}</option>`).join("")}</select></label></div>
     <div class="count">${l.length} обяви</div>
     <div class="rows" id="aEvList">${l.slice(0,A.lim).map(admEvRow).join("")||emptyBox("Няма обяви в този списък.")}</div>
     ${l.length>A.lim?`<button type="button" class="btn ghost block" data-amore style="margin-top:12px">Покажи още ${Math.min(30,l.length-A.lim)}</button>`:""}`;
  }
  if(A.tab==="users"){
    const fl=[["pending","Чакащи"],["approved","Одобрени"],["rejected","Отказани"],["blocked","Блокирани"],["all","Всички"]];
    const l=LIVE.admin.users.filter(u=>u.role!=="admin"&&(A.reg==="all"||u.status===A.reg));
    body=`<div class="agegrid" style="margin-bottom:12px">${fl.map(([k,lb])=>`<button type="button" class="agebtn${A.reg===k?" on":""}" data-areg="${k}">${lb}${k==="pending"&&pendUsers().length?` (${pendUsers().length})`:""}</button>`).join("")}</div>
     <p class="hint" style="margin-bottom:12px">Новите профили могат да разглеждат, но запазват места, оценяват и публикуват едва след одобрение.</p>
     <div class="rows">${l.map(admUserRow).join("")||emptyBox("Няма профили в този списък.")}</div>`;
  }
  if(A.tab==="msgs"){
    const l=S.msgs.slice().sort((a,b)=>(b.ua-a.ua)||b.items[b.items.length-1].at-a.items[a.items.length-1].at);
    body=`<div class="rows">${l.map(m=>{const u=whoIs(m.from),last=m.items[m.items.length-1];return `<article class="row"><button type="button" class="open thr" data-thread="${m.id}">${userAva(u)}<div class="rb"><b>${esc(m.subject)}${m.ua?' <i class="udot" aria-label="непрочетено"></i>':""}</b><span class="ri"><span>${esc(u.name)} · ${roleL(u.role)}</span></span><span class="hint snip">${last.by==="admin"?"Ти: ":""}${esc(last.text)}</span><span class="hint">${ago(last.at)}${m.status==="closed"?" · решено":""}</span></div></button></article>`}).join("")||emptyBox("Още няма съобщения.")}</div>`;
  }
  if(A.tab==="cast")body=castHTML();
  if(A.tab==="content"){
    const fld=(k,lbl,def,ta)=>`<label>${lbl}${ta?`<textarea data-cms="${k}" maxlength="200" placeholder="${esc(def)}">${esc(S.cms[k]||"")}</textarea>`:`<input type="text" data-cms="${k}" maxlength="60" placeholder="${esc(def)}" value="${esc(S.cms[k]||"")}">`}</label>`;
    const imgCtl=(k,prev)=>`<div class="upl"><div class="prev wide">${prev}</div><div class="btnrow" style="flex:1"><label class="btn ghost sm" style="cursor:pointer">${ui("plus")} Качи снимка<input type="file" accept="image/*" data-cmsimg="${k}" hidden></label>${S.cms[k]?`<button type="button" class="btn ghost sm" data-cmsreset="${k}">Върни илюстрацията</button>`:""}</div></div>`;
    body=`${policyAdminHTML()}<div class="sec"><h2>Такси за организатори</h2></div>
     <div class="panel form"><span class="hint">${freeNow()?`<span class="tg ok">Безплатен период</span> Таксата не се начислява до ${freeDate()} включително.`:`<span class="tg pend">Таксата е включена</span> ${feeAmt()} € на дошъл посетител.`}</span>
      <div class="row2"><label>Безплатно до<input type="date" id="feeUntil" value="${esc(freeUntil())}"></label><label>Такса след това (€)<input type="number" id="feeAmt" min="0" step="0.5" value="${feeAmt()}"></label></div>
      <span class="hint">Важи за всички организатори. Посещенията в безплатния период остават без такса и след като той свърши.</span></div>
     <p class="hint" style="margin:14px 0 6px">Промените се запазват веднага. Празно поле показва текста по подразбиране (сивият текст).</p>
     <div class="sec"><h2>Начален екран</h2><button type="button" data-preview-welcome>Преглед</button></div>
     <div style="display:grid;gap:12px">${[0,1,2].map(i=>`<div class="panel form"><b>Слайд ${i+1}</b>${imgCtl("wimg"+i,welcomeImg(i))}${fld("w"+i+"a","Заглавие, първи ред",WTITLES[i][0])}${fld("w"+i+"b","Заглавие, втори ред",WTITLES[i][1])}${fld("w"+i+"p","Текст",WTITLES[i][2],true)}</div>`).join("")}</div>
     <div class="sec"><h2>Начало</h2></div>
     <div class="panel form">${fld("home_sub","Текст под поздрава","Нека открием следващото ти любимо събитие.",true)}</div>
     <div class="sec"><h2>Банери по възраст</h2></div>
     <div style="display:grid;gap:12px">${CATS.map(c=>`<div class="panel form"><b>${c.label} · ${c.sub}</b>${imgCtl("bimg_"+c.key,bannerImg(c))}${fld("b_"+c.key+"_t","Заглавие",c.banner)}${fld("b_"+c.key+"_s","Подзаглавие",c.bsub)}</div>`).join("")}</div>
     <div class="sec"><h2>Снимки на събития</h2></div>
     <p class="hint">Снимката на всяко събитие се сменя от „Обяви“ → „Редактирай“.</p>`;
  }
  return head+`<div class="px" style="padding-bottom:30px">${body}</div>`;
}
function admEvRow(e){
  const m=modOf(e),O=ORGS[e.org]||{name:"?"},d=new Date(e.start),A=S.adm;
  return `<div class="dash"><div class="th">${eventArt(e,{small:true})}</div>
   <div style="min-width:0;display:grid;gap:3px"><b>${esc(e.title)}</b><span class="ri">${ui("user")}<span>${esc(O.name)}</span></span><span class="ri">${ui("cal")}<span>${whenShort(d)} · ${esc(cityName(e.city))}</span></span>
   <span><span class="tg ${MODL[m][1]}">${MODL[m][0]}</span>${e.cancelled?`<span class="tg warn">Отменено от организатора</span>`:""}${e.sample?`<span class="tg">пример</span>`:""}${e.createdAt?`<span class="hint" style="display:inline">${ago(e.createdAt)}</span>`:""}</span></div>
   ${e.modNote&&m==="rejected"?`<p class="full hint">Причина: ${esc(e.modNote)}</p>`:""}
   <div class="full btnrow">${m!=="approved"?`<button type="button" class="btn sm" data-mod="approve" data-id="${e.id}">${ui("check")} Одобри</button>`:""}${m==="pending"?`<button type="button" class="btn ghost sm" data-rejask="${e.id}">Откажи</button>`:""}${m==="approved"?`<button type="button" class="btn ghost sm" data-mod="hide" data-id="${e.id}">Скрий</button>`:""}<button type="button" class="btn ghost sm" data-edit="${e.id}">${ui("edit")} Редактирай</button><button type="button" class="btn ghost sm" data-open="${e.id}">Виж</button></div>
   ${A.rej===e.id?`<div class="full box"><label class="form"><span class="hint">Причина за отказа (организаторът ще я види)</span><input type="text" id="rejWhy" maxlength="140" value="Липсва информация за мястото и възрастта."></label><div class="btnrow"><button type="button" class="btn sm" data-mod="reject" data-id="${e.id}">Откажи обявата</button><button type="button" class="btn ghost sm" data-rejno>Назад</button></div></div>`:""}
  </div>`;
}
function admUserRow(u){
  const st=u.status||"approved",when=Date.parse(u.created_at),th=S.msgs.find(m=>m.from===u.id);
  return `<div class="dash" style="grid-template-columns:44px 1fr">${userAva(u)}
   <div style="min-width:0;display:grid;gap:3px"><b>${esc(u.full_name||"Без име")}</b><span class="hint" style="overflow-wrap:anywhere">${esc(u.email)}</span>
   <span><span class="tg">${roleL(u.role)}</span><span class="tg ${STL[st][1]}">${STL[st][0]}</span><span class="hint" style="display:inline">регистриран ${ago(when)}</span></span>
   ${u.role==="org"?`<span class="hint">${u.events} обяви</span>`:`<span class="hint">${u.bookings} резервации · ${u.reviews} оценки</span>`}</div>
   <div class="full btnrow">${st!=="approved"&&st!=="blocked"?`<button type="button" class="btn sm" data-ureg="approve" data-uid="${u.id}">${ui("check")} Потвърди</button>`:""}${st==="pending"?`<button type="button" class="btn ghost sm" data-ureg="reject" data-uid="${u.id}">Откажи</button>`:""}${st==="approved"?`<button type="button" class="btn ghost sm" data-ureg="block" data-uid="${u.id}">Блокирай</button>`:""}${st==="blocked"?`<button type="button" class="btn ghost sm" data-ureg="approve" data-uid="${u.id}">Отблокирай</button>`:""}${th?`<button type="button" class="btn ghost sm" data-thread="${th.id}">Съобщения</button>`:""}</div></div>`;
}
function threadHTML(id){
  const m=S.msgs.find(x=>x.id===id);if(!m)return"";
  const admin=isAdmin(),u=whoIs(m.from);
  return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>${esc(m.subject)}</h1>${admin?`<button type="button" class="link" data-thrclose="${m.id}">${m.status==="closed"?"Отвори":"Решено"}</button>`:"<span></span>"}</div>
  <div class="px">${admin?`<div class="orgrow" style="margin-bottom:12px">${userAva(u)}<div style="min-width:0"><b>${esc(u.name)}</b><div class="hint">${roleL(u.role)} · ${esc(u.email)} · <span class="tg ${STL[u.status||"approved"][1]}">${STL[u.status||"approved"][0]}</span></div></div></div>`:`<p class="hint" style="margin-bottom:12px">Разговор с екипа на Joyli</p>`}
   <div class="thread">${m.items.map(it=>{const mine=admin?it.by==="admin":it.by==="user";return `<div class="bub${mine?" me":""}"><div>${esc(it.text)}</div><small>${it.by==="admin"?"Екипът на Joyli":esc(u.name)} · ${ago(it.at)}</small></div>`}).join("")}</div>
   ${m.status==="closed"?`<p class="hint" style="text-align:center;margin:12px 0">Разговорът е отбелязан като решен. Ново съобщение ще го отвори отново.</p>`:""}</div>
  <div class="foot px"><form class="reply" id="replyForm" data-tid="${m.id}"><textarea id="replyText" rows="2" placeholder="${admin?"Отговори на "+esc(u.name.split(" ")[0])+"...":"Напиши съобщение..."}" aria-label="Съобщение" maxlength="600"></textarea><button type="submit" class="btn" aria-label="Изпрати">${ui("nav")}</button></form></div>`;
}
function inboxHTML(){
  const l=myThreads();
  return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>Съобщения</h1><span></span></div>
  <div class="px"><div class="panel" style="margin-bottom:14px"><b>Пиши на екипа на Joyli</b><span class="hint">Въпроси за резервации, такси, регистрация или проблем с приложението. Отговаряме в рамките на работния ден.</span><button type="button" class="btn block" data-newmsg>${ui("plus")} Ново съобщение</button></div>
  <div class="rows">${l.map(m=>{const last=m.items[m.items.length-1];return `<article class="row"><button type="button" class="open thr" data-thread="${m.id}" style="grid-template-columns:44px 1fr"><div class="ava" style="background:var(--brand);width:44px;height:44px;border-radius:14px">${ui("bell")}</div><div class="rb"><b>${esc(m.subject)}${m.uu?' <i class="udot" aria-label="нов отговор"></i>':""}</b><span class="hint snip">${last.by==="admin"?"Екипът: ":"Ти: "}${esc(last.text)}</span><span class="hint">${ago(last.at)}${m.status==="closed"?" · решено":""}</span></div></button></article>`}).join("")||emptyBox("Още нямаш съобщения.")}</div><div style="height:24px"></div></div>`;
}
function openNewMsg(){
  const subj=["Въпрос за събитие","Проблем с резервация","Такси и фактури","Регистрация и профил","Предложение","Друго"];
  openSheet(`${sheetHead("Ново съобщение","Ще отговорим тук, в „Съобщения“.")}
   <form class="form" id="msgForm" novalidate><label class="field">Тема<select id="mSub">${subj.map(s=>`<option>${s}</option>`).join("")}</select></label>
   <label>Съобщение<textarea id="mText" maxlength="600" placeholder="Опиши накратко въпроса си."></textarea></label><span class="hint">Не пиши лични данни като телефон, адрес или данни за карта.</span><p class="err" id="mErr" hidden></p>
   <button type="submit" class="btn block">Изпрати</button></form>`);
}
function adminProfileMenu(){
  const pe=pendEvents().length,pu=pendUsers().length,um=unreadAdmin(),b=n=>n?`<span class="cntb">${n}</span>${ui("right")}`:ui("right");
  return `${mrow("chart","Админ панел","Обзор на приложението","data-admin=\"overview\"")}
   ${mrow("cal","Обяви за събития",pe?pe+" чакат одобрение":"Няма чакащи","data-admin=\"events\"",b(pe))}
   ${mrow("people","Регистрации",pu?pu+" чакат потвърждение":"Няма чакащи","data-admin=\"users\"",b(pu))}
   ${mrow("bell","Съобщения",um?um+" непрочетени":"Всички са прочетени","data-admin=\"msgs\"",b(um))}
   ${mrow("nav","Изпрати известие","До един профил, град или всички","data-admin=\"cast\"")}
   ${mrow("edit","Текстове и снимки","Начален екран, банери, начало","data-admin=\"content\"")}
   ${mrow("logout","Изход от профила","","data-logout","")}`;
}

function checkAdminHash(){}

/* ================= АДМИН: ДЕЙСТВИЯ ================= */
function adminClick(ds,t,ev){
  if(policyClick(ds)||castClick(ds,t)||dataClick(ds))return true;
  if(ds.admin){closeSheet();S.adm.tab=ds.admin;S.adm.rej=null;push("admin");return true}
  if(ds.atab){S.adm.tab=ds.atab;S.adm.rej=null;S.adm.lim=30;renderScreen();$("#scr").scrollTop=0;return true}
  if(ds.aev){S.adm.ev=ds.aev;S.adm.lim=30;renderScreen();return true}
  if(ds.areg){S.adm.reg=ds.areg;renderScreen();return true}
  if(ds.amore!==undefined){S.adm.lim+=30;renderScreen();return true}
  if(ds.rejask){S.adm.rej=ds.rejask;renderScreen();setTimeout(()=>{const i=$("#rejWhy");if(i){i.focus();i.select()}},50);return true}
  if(ds.rejno!==undefined){S.adm.rej=null;renderScreen();return true}
  if(ds.mod){if(!isAdmin())return true;const id=ds.id;
    const f={mod_status:ds.mod==="approve"?"approved":ds.mod==="reject"?"rejected":"hidden"};if(ds.mod==="reject")f.mod_note=($("#rejWhy")?.value||"").trim()||null;
    const[x,y]=evXY(ev);S.adm.rej=null;
    act(()=>q(sb.from("events").update(f).eq("id",id)),{reload:["events"],ok:ds.mod==="approve"?"Обявата е одобрена и вече се вижда в приложението":ds.mod==="reject"?"Обявата е отказана. Организаторът получи известие.":"Обявата е скрита"}).then(r=>{if(r&&ds.mod==="approve")sparkle(x,y)});return true}
  if(ds.ureg){if(!isAdmin())return true;const u=LIVE.admin.users.find(x=>x.id===ds.uid);if(!u)return true;
    const st=ds.ureg==="approve"?"approved":ds.ureg==="reject"?"rejected":"blocked",[x,y]=evXY(ev);
    act(()=>q(sb.from("profiles").update({status:st}).eq("id",u.id)),{reload:["admin","orgs"],ok:st==="approved"?`${u.full_name} е потвърден`:st==="rejected"?`Регистрацията на ${u.full_name} е отказана`:`${u.full_name} е блокиран`}).then(r=>{if(r&&st==="approved")sparkle(x,y)});return true}
  if(ds.thread){closeSheet();const m=S.msgs.find(x=>x.id===ds.thread);push("thread",{id:ds.thread});setTimeout(()=>{const s=$("#scr");if(s)s.scrollTop=s.scrollHeight},30);
    if(m){const admin=isAdmin(),fld=admin?"unread_admin":"unread_user";if(admin?m.ua:m.uu){if(admin)m.ua=false;else m.uu=false;sb.from("threads").update({[fld]:false}).eq("id",m.id).then(()=>{})}}return true}
  if(ds.thrclose){const m=S.msgs.find(x=>x.id===ds.thrclose);const ns=m.status==="closed"?"open":"closed";act(()=>q(sb.from("threads").update({status:ns}).eq("id",m.id)),{reload:["threads"],ok:ns==="closed"?"Отбелязано като решено":"Разговорът е отворен отново"});return true}
  if(ds.inbox!==undefined){if(need("open",null,"Влез, за да пишеш на екипа."))return true;push("inbox");return true}
  if(ds.newmsg!==undefined){openNewMsg();return true}
  if(ds.cmsreset){const k=ds.cmsreset;act(()=>q(sb.from("app_content").delete().eq("key",k)),{reload:["content"],ok:"Върната е илюстрацията по подразбиране"});return true}
  if(ds.previewWelcome!==undefined){push("welcome");return true}
  return false;
}
document.addEventListener("submit",ev=>{
  if(ev.target.id==="replyForm"){ev.preventDefault();const txt=$("#replyText").value.trim();if(!txt){toast("Напиши съобщение.");return}
    const tid=ev.target.dataset.tid,admin=isAdmin();
    act(()=>q(sb.from("messages").insert({thread_id:tid,sender_id:LIVE.me.id,body:txt})),{reload:["threads"],ok:admin?"Отговорът е изпратен":"Съобщението е изпратено"}).then(()=>{const s=$("#scr");if(s)s.scrollTop=s.scrollHeight})}
  if(ev.target.id==="msgForm"){ev.preventDefault();const txt=$("#mText").value.trim();if(txt.length<5){const p=$("#mErr");p.textContent="Напиши поне няколко думи.";p.hidden=false;return}
    const subject=$("#mSub").value;
    act(async()=>{const t=await q(sb.from("threads").insert({user_id:LIVE.me.id,subject}).select("id").single());await q(sb.from("messages").insert({thread_id:t.id,sender_id:LIVE.me.id,body:txt}));return t.id},{reload:["threads"],ok:"Изпратено. Ще ти отговорим тук."}).then(id=>{if(id&&id!==true){closeSheet();push("thread",{id})}})}
});
let cmsT=0;
const cmsSave=(k,v)=>v?q(sb.from("app_content").upsert({key:k,value:v,updated_at:new Date().toISOString()})):q(sb.from("app_content").delete().eq("key",k));
const cmsPend={};
document.addEventListener("input",ev=>{const k=ev.target.dataset&&ev.target.dataset.cms;if(!k)return;const v=ev.target.value.trim();if(v)LIVE.content[k]=v;else delete LIVE.content[k];cmsPend[k]=v;clearTimeout(cmsT);cmsT=setTimeout(()=>{const p=Object.assign({},cmsPend);Object.keys(cmsPend).forEach(x=>delete cmsPend[x]);act(()=>Promise.all(Object.entries(p).map(([a,b])=>cmsSave(a,b))),{ok:"Запазено"})},800)});
document.addEventListener("change",ev=>{
  const k=ev.target.dataset&&ev.target.dataset.cmsimg;if(k&&ev.target.files[0])readImage(ev.target.files[0],1200,url=>{act(async()=>{const u=await uploadImage(url,"content");await cmsSave(k,u)},{reload:["content"],ok:"Снимката е сменена"})});
  if(ev.target.id==="feeUntil"&&ev.target.value){const v=ev.target.value;act(()=>q(sb.from("app_settings").update({free_until:v,updated_at:new Date().toISOString()}).eq("id",1)),{reload:["settings"]}).then(r=>{if(r)toast(freeNow()?"Безплатно до "+freeDate():"Безплатният период е приключил")})}
  if(ev.target.id==="feeAmt"){const v=Math.max(0,+ev.target.value||0);act(()=>q(sb.from("app_settings").update({fee_eur:v,updated_at:new Date().toISOString()}).eq("id",1)),{reload:["settings"],ok:"Таксата е "+v+" € на посетител"})}
  if(ev.target.id==="aCity"){S.adm.city=ev.target.value;S.adm.lim=30;renderScreen()}
});
let aqT=0;
document.addEventListener("input",ev=>{if(ev.target.id!=="aQ")return;S.adm.q=ev.target.value;clearTimeout(aqT);aqT=setTimeout(()=>{renderScreen();const i=$("#aQ");if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}},300)});

/* ================= ИЗВЕСТИЯ (от базата) ================= */
S.cast={target:"all_users",city:S.city,one:null,q:""};
const bookCode=(eid)=>(bookingOf(eid)||{}).code||"";
const bookersOf=id=>{const e=findEv(id);return e?Array.from({length:bookedCount(e)}):[]};
// известията създава сървърът (тригери в базата); тук нищо не се праща
function notify(){} function onBooked(){} function onUnbooked(){} function onEventChanged(){}
const NICON={booking_new:"ticket",booking_cancel:"x",booked_ok:"check",event_changed:"edit",event_cancelled:"x",reminder:"clock",mod:"check",account:"check",reply:"bell",broadcast:"bell"};
const myNotifs=()=>LIVE.notifs.map(n=>({id:n.id,icon:NICON[n.kind]||"bell",t:n.title,s:n.body||"",at:Date.parse(n.created_at),read:n.read,link:n.thread_id?{thread:n.thread_id}:n.event_id?{ev:n.event_id}:null}));
function reminders(){
  if(!loggedIn())return[];const out=[];
  allEvents().filter(e=>S.bookings.includes(e.id)&&!e.cancelled&&upcoming(e)&&dayDiff(e.start)<=1).forEach(e=>{const d=new Date(e.start);out.push({icon:"clock",t:`${dayDiff(d)===0?"Днес":"Утре"}: ${e.title}`,s:`${hm(d)} · ${e.venue}, ${e.area} · код ${bookCode(e.id)}`,link:{ev:e.id},live:1})});
  return out;
}
function notifications(){
  if(!loggedIn())return[];
  const out=[];
  if(isAdmin()){const pe=pendEvents().length,pu=pendUsers().length,um=unreadAdmin();if(pe)out.push({icon:"cal",t:pe+" обяви чакат одобрение",s:"Админ панел → Обяви",link:{admin:"events"},live:1});if(pu)out.push({icon:"people",t:pu+" нови регистрации",s:"Потвърди или откажи профилите",link:{admin:"users"},live:1});if(um)out.push({icon:"bell",t:um+" непрочетени съобщения",s:"От потребители и организатори",link:{admin:"msgs"},live:1})}
  return out.concat(reminders(),myNotifs());
}
const unreadNotifs=()=>loggedIn()?myNotifs().filter(n=>!n.read).length+reminders().length+(isAdmin()?pendEvents().length+pendUsers().length+unreadAdmin():0):0;
function notifRow(n){const l=n.link||{},attr=l.admin?`data-admin="${l.admin}"`:l.thread?`data-thread="${l.thread}"`:l.ev?`data-open="${l.ev}"`:"";
  return `<button type="button" class="nrow${n.read===false?" unread":""}" ${attr}><span class="mi">${ui(n.icon||"bell")}</span><span><b>${esc(n.t)}</b><br><span class="hint">${esc(n.s||"")}</span>${n.at?`<br><span class="hint">${ago(n.at)}</span>`:""}</span></button>`}
function openNotif(){
  const l=notifications();
  openSheet(`${sheetHead("Известия","")}
   ${!loggedIn()?`<p class="hint">Влез, за да получаваш напомняния за запазените си места.</p>${loginBtns}`:l.length?`<div class="nlist">${l.map(notifRow).join("")}</div>`:`<p class="hint">Няма известия. Тук ще виждаш напомняния за запазените си места, промени по тях и съобщения от екипа.${S.role==="org"?" Като организатор ще виждаш и всяко ново записване.":""}</p>`}`);
  if(loggedIn()&&LIVE.notifs.some(n=>!n.read)){LIVE.notifs.forEach(n=>n.read=true);sb.from("notifications").update({read:true}).eq("user_id",LIVE.me.id).eq("read",false).then(()=>renderTab())}
}

/* ================= АДМИН: ИЗПРАЩАНЕ ================= */
const CAST_T=[["one","Конкретен потребител или организатор"],["city_users","Потребителите в град"],["city_orgs","Организаторите в град"],["all_users","Всички потребители"],["all_orgs","Всички организатори"],["all","Всички"]];
function inCity(u,c){if(u.home_city===c||(u.fav_cities||[]).includes(c))return true;return u.role==="org"&&allEvents().some(e=>e.org===u.id&&e.city===c)}
function castRecipients(){
  const C=S.cast,acc=LIVE.admin.users.filter(u=>u.role!=="admin"&&u.status==="approved");
  if(C.target==="one")return acc.filter(u=>u.id===C.one);
  return acc.filter(u=>C.target==="all"||(C.target==="all_users"&&u.role==="user")||(C.target==="all_orgs"&&u.role==="org")||(C.target==="city_users"&&u.role==="user"&&inCity(u,C.city))||(C.target==="city_orgs"&&u.role==="org"&&inCity(u,C.city)));
}
const castLabelOf=(t,c,one)=>t==="one"?(LIVE.admin.users.find(u=>u.id===one)?.full_name||"Един профил"):t==="city_users"?"Потребителите в "+cityName(c):t==="city_orgs"?"Организаторите в "+cityName(c):(CAST_T.find(x=>x[0]===t)||["",t])[1];
const castLabel=()=>castLabelOf(S.cast.target,S.cast.city,S.cast.one);
function castHTML(){
  const C=S.cast,n=castRecipients().length;
  const qq=C.q.trim().toLowerCase(),matches=LIVE.admin.users.filter(u=>u.role!=="admin"&&u.status==="approved"&&(!qq||((u.full_name||"")+" "+u.email).toLowerCase().includes(qq))).slice(0,8);
  return `<div class="panel form">
    <b>До кого</b>
    <div class="dlist">${CAST_T.map(([k,l])=>`<button type="button" class="drow${C.target===k?" on":""}" data-ctarget="${k}" aria-pressed="${C.target===k}">${ui(k==="one"?"user":k.includes("org")?"chart":k==="all"?"people":"user")}<span>${l}</span>${C.target===k?`<span class="dck">${ui("check","i",3)}</span>`:""}</button>`).join("")}</div>
    ${C.target.startsWith("city")?`<label class="field">Град<select id="cCity">${CITIES.map(c=>`<option value="${c.id}"${C.city===c.id?" selected":""}>${esc(c.name)}</option>`).join("")}</select></label>`:""}
    ${C.target==="one"?`<label>Търси по име или имейл<input type="text" id="cQ" value="${esc(C.q)}" placeholder="име или имейл"></label><div class="pickl">${matches.map(u=>`<button type="button" class="pickp${C.one===u.id?" on":""}" data-cone="${u.id}">${userAva(u)}<span><b>${esc(u.full_name||"Без име")}</b><br><span class="hint">${roleL(u.role)} · ${esc(u.email)}</span></span>${C.one===u.id?ui("check","i",3):""}</button>`).join("")||`<p class="hint">Няма съвпадения.</p>`}</div>`:""}
    <label>Заглавие<input type="text" id="cTitle" maxlength="70" placeholder="напр. Нови събития този уикенд"></label>
    <label>Текст<textarea id="cBody" maxlength="300" placeholder="Кратко съобщение до получателите."></textarea></label>
    <p class="hint" id="cCount"><b style="color:var(--ink)">Ще получат: ${n} ${n===1?"профил":"профила"}</b> · ${esc(castLabel())}</p>
    <p class="err" id="cErr" hidden></p>
    <button type="button" class="btn block" data-csend>${ui("nav")} Изпрати известието</button>
  </div>
  <div class="sec"><h2>Изпратени</h2></div>
  <div class="rows">${LIVE.admin.casts.map(c=>`<div class="dash" style="grid-template-columns:40px 1fr"><span class="mi" style="width:40px;height:40px;border-radius:12px;background:var(--brand-soft);color:var(--brand);display:grid;place-items:center">${ui("bell")}</span><div style="min-width:0;display:grid;gap:2px"><b>${esc(c.title)}</b><span class="hint">${esc(c.body)}</span><span class="hint">${esc(castLabelOf(c.label,c.city))} · ${c.count} получатели · ${ago(c.at)}</span></div></div>`).join("")||emptyBox("Още не си изпращал известия.")}</div>`;
}
function castClick(ds,t){
  if(ds.ctarget){S.cast.target=ds.ctarget;renderScreen();return true}
  if(ds.cone){S.cast.one=ds.cone;renderScreen();return true}
  if(ds.csend!==undefined){const err=m=>{const p=$("#cErr");p.textContent=m;p.hidden=false};
    const title=$("#cTitle").value.trim(),body=$("#cBody").value.trim(),C=S.cast;
    if(!title){err("Напиши заглавие.");return true}if(!body){err("Напиши текст на известието.");return true}
    if(C.target==="one"&&!C.one){err("Избери получател.");return true}
    act(()=>q(sb.rpc("admin_broadcast",{p_target:C.target,p_title:title,p_body:body,p_city:C.target.startsWith("city")?C.city:null,p_user:C.target==="one"?C.one:null})),{reload:["admin"]})
      .then(n=>{if(n!==false)toast(`Изпратено до ${n} ${n===1?"профил":"профила"}`)});return true}
  return false;
}
let cqT=0;
document.addEventListener("input",ev=>{if(ev.target.id==="cQ"){S.cast.q=ev.target.value;clearTimeout(cqT);cqT=setTimeout(()=>{renderScreen();const i=$("#cQ");if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}},250)}});
document.addEventListener("change",ev=>{if(ev.target.id==="cCity"){S.cast.city=ev.target.value;renderScreen()}});

/* ================= МОИТЕ ДАННИ ================= */
function myDataHTML(){
  const u=U(),org=u.role==="org";
  const rows=[["Имейл","за вход и за да ти пишем при нужда",esc(S.email)],[org?"Име на организацията":"Име или прякор","показва се на организатора, при който запазиш място",esc(u.name)],["Интереси и любими градове","за да подредим събитията за теб",esc(interestsSummary())],["Запазени места и любими","за да ти напомним и организаторът да те очаква",u.bookings.length+" места, "+u.favs.length+" любими"],["Оценки","видими за всички с прякора ти",Object.keys(u.myReviews).length+" оценки"],["Съобщения с екипа","само ти и администраторът",S.msgs.filter(m=>m.from===S.me).length+" разговора"]];
  return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>Моите данни</h1><span></span></div>
  <div class="px" style="display:grid;gap:14px;padding-bottom:28px">
   <div class="panel"><b>Какво пазим за теб</b>${rows.map(r=>`<div class="drow" style="cursor:default;align-items:flex-start"><span style="display:grid;gap:2px"><b style="font-size:14.5px">${r[0]}</b><span class="hint">${r[1]}</span></span><span class="hint" style="text-align:right;max-width:45%;overflow-wrap:anywhere">${r[2]}</span></div>`).join("")}</div>
   <div class="panel"><b>Какво не пазим</b><span class="hint">Местоположението ти остава само на телефона и не се изпраща. Не искаме телефон, адрес, рождена дата, снимка или данни за карта. Нямаме реклами и не следим какво правиш в приложението.</span></div>
   <div class="panel"><b>Колко време пазим</b><span class="hint">Резервациите се трият 12 месеца след събитието, а известията след 90 дни. Всичко останало стои, докато не изтриеш профила си.</span></div>
   <button type="button" class="btn ghost block" data-policy>Прочети Политиката за поверителност</button>
   ${u.polAt?`<p class="hint" style="text-align:center">Прие версия ${esc(u.polVer)} на ${new Date(u.polAt).toLocaleDateString("bg-BG")}</p>`:""}
   ${u.role==="admin"?"":`<div class="panel"><b>Изтриване на профила</b><span class="hint">Изтрива завинаги профила, резервациите, оценките, любимите, известията и съобщенията ти.${org?" Събитията ти се премахват от приложението.":""}</span>
    <button type="button" class="btn line block" data-delask>Изтрий профила ми</button>
    <div class="box" id="delBox" hidden><span class="hint"><b style="color:var(--warn)">Това не може да се върне.</b> Сигурен ли си?</span><div class="btnrow"><button type="button" class="btn sm" data-delgo style="background:var(--warn)">Да, изтрий всичко</button><button type="button" class="btn ghost sm" data-delno>Не</button></div></div></div>`}
  </div>`;
}
function deleteMyAccount(){
  act(async()=>{await q(sb.rpc("delete_my_account"));await sb.auth.signOut();LIVE.me=null;S.screens=[];S.tab="home"},{reload:["me","events"],ok:"Профилът и всички данни са изтрити."}).then(()=>scrollTo(0,0));
}
function dataClick(ds){
  if(ds.mydata!==undefined){push("mydata");return true}
  if(ds.delask!==undefined){$("#delBox").hidden=false;return true}
  if(ds.delno!==undefined){$("#delBox").hidden=true;return true}
  if(ds.delgo!==undefined){deleteMyAccount();return true}
  return false;
}

/* ================= ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ ================= */
const polVer=()=>cmsV("pol_ver","1.0");
const polDate=()=>cmsV("pol_date","15 ноември 2026");
const ctl=k=>cmsV("ctl_"+k,{name:"[Име и фамилия]",email:"[Имейл адрес]"}[k]);
const needsPolicy=()=>loggedIn()&&S.role!=="admin"&&U().polVer!==polVer();
function policyBody(){
  const P=(h,body)=>`<section class="pol-s"><h2>${h}</h2>${body}</section>`;
  const li=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
  return `
  <p class="pol-meta">Последна актуализация: ${esc(polDate())} · версия ${esc(polVer())}</p>
  <p>Поверителността на твоите данни е важна за нас. Затова събираме само информацията, която е необходима за нормалната работа на приложението.</p>
  ${P("1. Кой отговаря за данните?",`<p>Администратор на личните данни е:</p><p>Име: <b>${esc(ctl("name"))}</b><br>Имейл за контакт: <b>${esc(ctl("email"))}</b></p><p>За всички въпроси относно личните ти данни можеш да се свържеш с нас на посочения имейл.</p>`)}
  ${P("2. Какви данни събираме?",`<p>При регистрация изискваме единствено:</p>${li(["Имейл адрес.","Първо име или прякор."])}
   <p>В зависимост от използваните функции можем да съхраняваме информация за резервации, любими събития, оценки и предпочитания.</p>
   <p>Ако разрешиш известията, съхраняваме и идентификатор на устройството, издаден от Apple или Google, за да ти ги изпращаме. Той не съдържа името или имейла ти.</p>
   <p>За сигурността и работата на приложението може да се обработват и ограничени технически данни, например IP адрес.</p>
   <p>Местоположението ти не се изпраща до нас. Разстоянието до събитията се изчислява на твоя телефон.</p>
   <p>Не изискваме ЕГН, телефонен номер, домашен адрес или данни за банкова карта.</p>`)}
  ${P("3. За какво използваме данните?",`<p>Използваме ги единствено за:</p>${li(["Създаване и управление на профила.","Резервиране на места за събития.","Изпращане на важна информация за резервациите.","Подобряване на работата и сигурността на приложението."])}
   <p>Данните, необходими за предоставяне на услугата, се обработват на основание изпълнение на договор. Данните, необходими за защита и сигурност на приложението, могат да се обработват на основание законен интерес.</p>
   <p>Не продаваме личните ти данни и не ги предоставяме за рекламни цели. Не вземаме решения за теб единствено по автоматичен начин.</p>`)}
  ${P("4. Кой има достъп до данните?",`<p>Организаторите получават само информацията, необходима за управление на направените при тях резервации.</p>
   <p>Оценките и коментарите, които оставяш, се виждат от другите потребители заедно с името или прякора ти.</p>
   <p>За техническата работа на приложението използваме външни доставчици на услуги, които могат да обработват ограничени данни при необходимост и при приложимите гаранции за защита: Supabase (база данни и вход, със сървъри в ЕС), Expo, Apple и Google (изпращане на известия).</p>
   <p>Някои от тях са компании от САЩ. Предаването на данни към тях става при стандартни договорни клаузи, одобрени от Европейската комисия, или по Рамката за защита на данните между ЕС и САЩ.</p>
   <p>Не предоставяме лични данни на други лица, освен когато това е необходимо за услугата или се изисква по закон.</p>`)}
  ${P("5. Деца",`<p>Приложението е предназначено за родители, настойници и пълнолетни организатори.</p><p>Регистрацията е разрешена само на лица над 18 години, включително навършилите 18 години.</p><p>Не изискваме лични данни за децата, които посещават събитията.</p>`)}
  ${P("6. Колко дълго пазим данните?",`<p>Съхраняваме данните за профила, докато той е активен.</p>
   <p>Информацията за резервации и други действия се пази само за периода, необходим за предоставяне на услугата, разрешаване на възникнали въпроси или изпълнение на законови задължения. Резервациите изтриваме автоматично 12 месеца след събитието, а известията след 90 дни.</p>
   <p>При изтриване на профила премахваме данните, за които вече няма основание да бъдат съхранявани.</p>`)}
  ${P("7. Какви са твоите права?",`<p>Имаш право да поискаш:</p>${li(["Достъп до личните си данни.","Корекция на неточна информация.","Изтриване на профила и данните, когато е приложимо.","Ограничаване на обработването или възражение срещу него.","Преносимост на данните, когато е приложимо."])}
   <p>Можеш да упражниш правата си, като се свържеш с нас на посочения имейл. Профила си можеш да изтриеш и сам: Профил → Моите данни и поверителност → Изтрий профила ми.</p>
   <p>Имаш право и да подадеш жалба до Комисията за защита на личните данни: www.cpdp.bg.</p>`)}
  ${P("8. Сигурност",`<p>Използваме подходящи технически мерки за защита на информацията от неоторизиран достъп, загуба или злоупотреба.</p>`)}
  ${P("9. Промени в политиката",`<p>При необходимост можем да актуализираме тази политика.</p><p>При съществени промени ще уведомяваме потребителите чрез приложението или по имейл.</p><p>Актуалната версия винаги ще бъде достъпна в приложението.</p>`)}`;
}
function policyHTML(){return `<div class="bar px"><button type="button" class="icon-btn plain" data-back aria-label="Назад">${ui("back")}</button><h1>Поверителност</h1><span></span></div>
  <article class="px pol">${`<h1 class="pol-h">Политика за поверителност</h1>`+policyBody()}<div style="height:30px"></div></article>`}
function openPolicyGate(){
  openSheet(`<div class="sheet-head"><div><h2>${U().polVer?"Обновихме политиката за поверителност":"Политика за поверителност"}</h2><p class="hint">За да продължиш, прегледай и приеми версия ${esc(polVer())} от ${esc(polDate())}.</p></div></div>
   <div class="pol-sum" style="margin:0"><b>Накратко</b><ul><li>Искаме само имейл и име или прякор.</li><li>Местоположението ти остава на телефона.</li><li>Можеш да изтриеш профила си по всяко време.</li></ul></div>
   <button type="button" class="btn line block" data-policy>Прочети цялата политика</button>
   <label class="check"><input type="checkbox" id="polOk"> Прочетох Политиката за поверителност и я приемам.</label>
   <p class="err" id="polErr" hidden></p>
   <div class="btnrow"><button type="button" class="btn ghost" data-polno>Изход</button><button type="button" class="btn" data-polyes>Продължи</button></div>`);
  $("#sbg").dataset.locked="1";
}
function acceptPolicy(){return act(()=>q(sb.rpc("accept_policy")),{reload:["me"]})}
function policyClick(ds){
  if(ds.policy!==undefined){if(sheetOpen()){S.polReturn=1;$("#sheetRoot").hidden=true}push("policy");return true}
  if(ds.polyes!==undefined){if(!$("#polOk").checked){const p=$("#polErr");p.textContent="Отбележи, че приемаш политиката, за да продължиш.";p.hidden=false;return true}
    acceptPolicy().then(r=>{if(r){closeSheet();renderAll();toast("Благодарим! Политиката е приета.")}});return true}
  if(ds.polno!==undefined){act(async()=>{await sb.auth.signOut();S.screens=[];S.tab="home";closeSheet()},{reload:["me","events"],ok:"Излезе от профила. Можеш да влезеш отново по всяко време."});return true}
  if(ds.polbump!==undefined){const parts=polVer().split(".").map(Number),nv=parts[0]+"."+((parts[1]||0)+1),d=new Date(),nd=d.getDate()+" "+ML[d.getMonth()]+" "+d.getFullYear();
    act(()=>q(sb.from("app_settings").update({policy_version:nv,policy_date:nd,updated_at:new Date().toISOString()}).eq("id",1)),{reload:["settings"],ok:"Публикувана е версия "+nv+". Всички ще я приемат при следващото влизане."});return true}
  return false;
}
function policyAdminHTML(){
  const f=(k,l)=>`<label>${l}<input type="text" data-cms="ctl_${k}" maxlength="120" placeholder="${esc(ctl(k))}" value="${esc(S.cms["ctl_"+k]||"")}"></label>`;
  const acc=LIVE.admin.users.filter(u=>u.role!=="admin"),ok=acc.filter(u=>u.policy_version===polVer()).length;
  return `<div class="sec"><h2>Политика за поверителност</h2><button type="button" data-policy>Преглед</button></div>
   <div class="panel form"><span class="hint">Текуща версия <b style="color:var(--ink)">${esc(polVer())}</b> от ${esc(polDate())} · приета от ${ok} от ${acc.length} профила</span>
    ${f("name","Администратор на данните: име и фамилия")}${f("email","Имейл за контакт")}
    <span class="hint">Показват се в т. 1 от политиката.</span>
    <button type="button" class="btn ghost block" data-polbump>Публикувай нова версия (всички приемат отново)</button></div>`;
}

/* ================= ВРЪЗКА СЪС SUPABASE ================= */
const ERR_BG=[
  [/Invalid login credentials/i,"Грешен имейл или парола."],
  [/Email not confirmed/i,"Потвърди имейла си от писмото, което ти изпратихме, и опитай пак."],
  [/User already registered|already been registered/i,"Вече има профил с този имейл. Влез от раздел „Вход“."],
  [/Password should be at least/i,"Паролата е твърде кратка."],
  [/rate limit|too many/i,"Твърде много опити. Изчакай малко и опитай пак."],
  [/Failed to fetch|NetworkError|network/i,"Няма връзка с интернет. Провери връзката и опитай пак."],
  [/JWT|session/i,"Сесията изтече. Влез отново."],
  [/ext_url|ext_org|repeat_weekly|occurs_at|age_min|age_max|schema cache/i,"Базата не е обновена. Пусни обновленията (стъпки 4, 5 и 6) от „Joyli SQL“ и опитай пак."],
  [/Bucket not found/i,"Липсва хранилището за снимки в Supabase."],
  [/row-level security/i,"Нямаш права за това действие."],
  [/payload too large|exceeded the maximum/i,"Снимката е твърде голяма."]
];
function bgErr(e){const m=(e&&(e.message||e.error_description||e.msg))||String(e||"");for(const[re,t]of ERR_BG)if(re.test(m))return t;
  // съобщенията от базата вече са на български (raise exception)
  if(/[А-Яа-я]/.test(m))return m.replace(/^.*?:\s*/,"").trim();return "Нещо се обърка. Опитай пак след малко."+(m?" ("+m.slice(0,90)+")":"")}
async function q(p){const{data,error}=await p;if(error)throw error;return data}
let busyN=0;
function busy(on){busyN+=on?1:-1;document.body.classList.toggle("busy",busyN>0)}
// изпълнява действие, показва грешка на български, презарежда и прерисува
async function act(fn,{ok,reload=[],silent}={}){
  busy(true);
  try{const r=await fn();if(reload.length)await Promise.all(reload.map(k=>LOAD[k]()));renderAll();if(ok)toast(ok);return r??true}
  catch(e){console.error(e);if(!silent)toast(bgErr(e));return false}
  finally{busy(false)}
}

/* ---------- зареждане ---------- */
const LOAD={
  async settings(){const r=await q(sb.from("app_settings").select("*").eq("id",1).maybeSingle());if(r)LIVE.settings=Object.assign(LIVE.settings,r)},
  async content(){const rows=await q(sb.from("app_content").select("key,value"));LIVE.content={};rows.forEach(r=>{if(r.value!=null)LIVE.content[r.key]=r.value})},
  async orgs(){const rows=await q(sb.from("organizers_public").select("id,name,bio,avatar_url"));Object.keys(ORGS).forEach(k=>delete ORGS[k]);
    rows.forEach(o=>{ORGS[o.id]=orgEntry(o.id,o.name,o.bio,o.avatar_url)});
    if(LIVE.me&&LIVE.me.role==="org"&&!ORGS[LIVE.me.id])ORGS[LIVE.me.id]=orgEntry(LIVE.me.id,LIVE.me.org_name||LIVE.me.full_name,LIVE.me.org_bio,LIVE.me.avatar_url);
    LIVE.admin.users.forEach(u=>{if(u.role==="org"&&!ORGS[u.id])ORGS[u.id]=orgEntry(u.id,u.full_name)});
    LIVE.events.forEach(e=>{if(e.extOrg&&!ORGS[e.org])ORGS[e.org]=orgEntry(e.org,e.extOrg.trim())})},
  async events(){const since=new Date(Date.now()-2*864e5).toISOString();
    const[one,wk]=await Promise.all([q(sb.from("events").select("*").gte("starts_at",since).order("starts_at").limit(3000)),
      q(sb.from("events").select("*").eq("repeat_weekly",true).lt("starts_at",since).limit(1000)).catch(()=>[])]);
    const rows=one.concat(wk);
    const st=await q(sb.from("event_stats").select("event_id,taken,rating,reviews"));LIVE.stats={};st.forEach(s=>LIVE.stats[s.event_id]=s);
    // моите минали резервации също трябва да се виждат (история)
    LIVE.events=rows.map(mapEv)},
  async reviews(eid){const rows=await q(sb.from("reviews_public").select("rating,comment,created_at,name,mine").eq("event_id",eid).order("created_at"));
    LIVE.reviews[eid]=rows.map(r=>({name:r.name||"Посетител",stars:r.rating,text:r.comment||"",mine:r.mine}))},
  async me(){const{data:{session}}=await sb.auth.getSession();
    if(!session){LIVE.me=null;LIVE.email=null;S.email=null;LIVE.bookings=[];LIVE.favs=[];LIVE.follows=[];LIVE.myReviews={};LIVE.notifs=[];LIVE.threads=[];return}
    const uid=session.user.id;LIVE.email=S.email=session.user.email;
    const p=await q(sb.from("profiles").select("*").eq("id",uid).maybeSingle());LIVE.me=p;if(!p)return;
    const[bk,fv,fl,rv]=await Promise.all([
      q(sb.from("bookings").select("id,event_id,status,code,created_at,occurs_at").eq("user_id",uid)).catch(()=>q(sb.from("bookings").select("id,event_id,status,code,created_at").eq("user_id",uid))),
      q(sb.from("favorites").select("event_id").eq("user_id",uid)),
      q(sb.from("follows").select("organizer_id").eq("user_id",uid)),
      q(sb.from("reviews").select("event_id,rating,comment").eq("user_id",uid))]);
    LIVE.bookings=bk;LIVE.favs=fv.map(x=>x.event_id);LIVE.follows=fl.map(x=>x.organizer_id);
    LIVE.myReviews={};rv.forEach(r=>LIVE.myReviews[r.event_id]={name:p.full_name,stars:r.rating,text:r.comment||""});
    // минали събития с моя резервация, които не са в основния списък
    const missing=[...new Set(bk.map(b=>b.event_id))].filter(id=>!findEv(id));
    if(missing.length){const rows=await q(sb.from("events").select("*").in("id",missing));LIVE.events=LIVE.events.concat(rows.map(mapEv))}
    await Promise.all([LOAD.notifs(),LOAD.threads()]);
    if(p.role==="org")await LOAD.myFees();
    if(p.role==="admin")await LOAD.admin()},
  async notifs(){if(!LIVE.me)return;LIVE.notifs=await q(sb.from("notifications").select("*").eq("user_id",LIVE.me.id).order("created_at",{ascending:false}).limit(100))},
  async threads(){if(!LIVE.me)return;
    let tq=sb.from("threads").select("*").order("updated_at",{ascending:false}).limit(200);if(LIVE.me.role!=="admin")tq=tq.eq("user_id",LIVE.me.id);
    const ts=await q(tq);const ids=ts.map(t=>t.id);
    const ms=ids.length?await q(sb.from("messages").select("id,thread_id,from_admin,body,created_at").in("thread_id",ids).order("created_at")):[];
    LIVE.threads=ts.map(t=>({id:t.id,from:t.user_id,subject:t.subject,status:t.status,ua:t.unread_admin,uu:t.unread_user,
      items:ms.filter(m=>m.thread_id===t.id).map(m=>({by:m.from_admin?"admin":"user",text:m.body,at:Date.parse(m.created_at)}))})).filter(t=>t.items.length)},
  async myFees(){const rows=await q(sb.from("organizer_fees").select("attendees,total_eur").eq("organizer_id",LIVE.me.id));LIVE.myFees=rows.reduce((s,r)=>s+(+r.total_eur||0),0)},
  async attendees(eid){const rows=await q(sb.rpc("event_attendees",{p_event:eid}));LIVE.attendees[eid]=rows.map(r=>({id:r.booking_id,name:r.name||"Посетител",code:r.code,st:r.status,when:r.occurs_at||null}))},
  async admin(){const[us,tot,cs]=await Promise.all([q(sb.rpc("admin_users")),q(sb.rpc("admin_totals")),q(sb.from("broadcasts").select("*").order("created_at",{ascending:false}).limit(50))]);
    LIVE.admin.users=us;LIVE.admin.totals=(tot&&tot[0])||{attended:0,fees:0};LIVE.admin.casts=cs.map(c=>({at:Date.parse(c.created_at),title:c.title,body:c.body,label:c.target,count:c.recipients}))},
  async all(){await Promise.all([LOAD.settings(),LOAD.content()]);await LOAD.me();await LOAD.orgs();await LOAD.events();if(LIVE.me&&LIVE.me.role==="org")await LOAD.orgs()}
};

/* ---------- помощни за изгледите ---------- */
const bookingOf=id=>LIVE.bookings.find(b=>b.event_id===id&&b.status!=="cancelled"&&curBk(b))||LIVE.bookings.find(b=>b.event_id===id&&curBk(b));
function whoIs(id){if(LIVE.me&&id===LIVE.me.id)return{name:LIVE.me.full_name,role:LIVE.me.role,status:LIVE.me.status,email:LIVE.email};
  const u=LIVE.admin.users.find(x=>x.id===id);return u?{name:u.full_name,role:u.role,status:u.status,email:u.email}:{name:"Потребител",role:"user",status:"approved",email:""}}
async function uploadImage(dataUrl,folder){
  if(!dataUrl||!dataUrl.startsWith("data:"))return dataUrl||null;
  const blob=await (await fetch(dataUrl)).blob();
  const path=`${folder}/${LIVE.me.id}/${Date.now()}.jpg`;
  await q(sb.storage.from("images").upload(path,blob,{contentType:"image/jpeg",upsert:false}));
  return sb.storage.from("images").getPublicUrl(path).data.publicUrl;
}
async function saveProfile(fields){await q(sb.from("profiles").update(fields).eq("id",LIVE.me.id));Object.assign(LIVE.me,fields)}

/* ================= ИНСТАЛИРАНЕ НА ТЕЛЕФОНА (PWA) ================= */
const isStandalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
let deferredPrompt=null;
addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;if(S.tab==="home")renderTab()});
function installTip(){
  if(isStandalone()||saved.tipOff)return"";
  if(isIOS())return `<div class="install-tip">${ui("share")}<span><b>Добави Joyli към началния екран</b><br>В Safari натисни „Сподели“ и после „Добави към начален екран“. Така Joyli се отваря като приложение и може да ти изпраща напомняния.</span><button type="button" data-tipoff aria-label="Скрий">${ui("x")}</button></div>`;
  if(deferredPrompt)return `<div class="install-tip">${ui("plus")}<span><b>Инсталирай Joyli</b><br>С иконка на телефона, отваря се като приложение.</span><button type="button" class="btn sm" data-install style="color:#fff;margin-left:auto">Инсталирай</button></div>`;
  return"";
}
document.addEventListener("click",e=>{
  if(e.target.closest("[data-tipoff]")){saved.tipOff=1;persist();renderTab()}
  if(e.target.closest("[data-install]")&&deferredPrompt){deferredPrompt.prompt();deferredPrompt.userChoice.finally(()=>{deferredPrompt=null;renderTab()})}
});
if("serviceWorker" in navigator&&location.protocol==="https:")addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
/* ---------- автоматично обновяване ----------
   При всяко връщане към приложението (и на всеки 5 минути) проверява дали има нова версия.
   Ако има, презарежда сама, освен ако човекът попълва формуляр в момента. */
let updPending=false;
async function checkUpdate(){
  if(typeof JOYLI_BUILD==="undefined"||location.protocol!=="https:")return;
  try{const r=await fetch("version.txt?t="+Date.now(),{cache:"no-store"});if(!r.ok)return;
    const v=(await r.text()).trim();if(v&&v!==JOYLI_BUILD){updPending=true;applyUpdate()}}catch(e){}
}
function applyUpdate(){
  if(!updPending)return;
  const typing=$("#sheetRoot")&&$("#sheetRoot").querySelector("form,textarea");
  if(typing&&document.visibilityState==="visible")return; // изчакваме да затвори формуляра
  try{navigator.serviceWorker&&navigator.serviceWorker.getRegistration().then(g=>g&&g.update())}catch(e){}
  location.reload();
}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")checkUpdate();else applyUpdate()});
setInterval(()=>{checkUpdate();applyUpdate()},5*60*1000);
addEventListener("load",()=>setTimeout(checkUpdate,3000));

/* ================= КАРТА: местене, мащаб, избор на пин ================= */
const MV={};let mapDragged=false;
function mapEls(){const w=document.getElementById("mapwrap");if(!w)return null;const svg=w.querySelector('svg[data-map="main"]');return svg?{w,svg}:null}
function sizeMap(){const m=mapEls();if(!m)return;const top=m.w.getBoundingClientRect().top,nav=document.querySelector("nav.tabs").offsetHeight;m.w.style.height=Math.max(340,Math.round(innerHeight-top-nav))+"px"}
function applyView(){const m=mapEls(),v=MV[S.city];if(!m||!v)return;m.svg.setAttribute("viewBox",`${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${v.h.toFixed(2)}`);const k=(v.w/v.base).toFixed(4);
  m.svg.querySelectorAll(".sc").forEach(el=>el.setAttribute("transform",`translate(${el.dataset.x} ${el.dataset.y}) scale(${(k*(+el.dataset.s||1)).toFixed(4)})`))}
function clampView(v){const g=geom(city());let cx=v.x+v.w/2,cy=v.y+v.h/2;cx=Math.min(g.W*1.1,Math.max(-g.W*.1,cx));cy=Math.min(g.H*1.1,Math.max(-g.H*.1,cy));v.x=cx-v.w/2;v.y=cy-v.h/2}
const limW=(v,w)=>Math.min(v.base*1.2,Math.max(v.base/7,w));
function zoomTo(newW,px,py){const m=mapEls(),v=MV[S.city];if(!m||!v)return;const r=m.svg.getBoundingClientRect();newW=limW(v,newW);
  const fx=(px-r.left)/r.width,fy=(py-r.top)/r.height,sx=v.x+fx*v.w,sy=v.y+fy*v.h,a=v.h/v.w;v.w=newW;v.h=newW*a;v.x=sx-fx*v.w;v.y=sy-fy*v.h;clampView(v);applyView()}
function animView(t){const v=MV[S.city];if(!v)return;const f={x:v.x,y:v.y,w:v.w,h:v.h};if(reduced()){Object.assign(v,t);clampView(v);applyView();return}
  const t0=performance.now();const step=n=>{const p=Math.min(1,(n-t0)/280),e=1-Math.pow(1-p,3);["x","y","w","h"].forEach(k=>v[k]=f[k]+(t[k]-f[k])*e);applyView();if(p<1)requestAnimationFrame(step);else{clampView(v);applyView()}};requestAnimationFrame(step)}
function zoomCenter(f){if(hasL()&&LM){f>1?LM.zoomIn():LM.zoomOut();return}const v=MV[S.city];if(!v)return;const w=limW(v,v.w/f),h=w*v.h/v.w;animView({x:v.x+v.w/2-w/2,y:v.y+v.h/2-h/2,w,h})}
function centerOn(px,py,w){const v=MV[S.city];if(!v)return;w=limW(v,w??v.w);const h=w*v.h/v.w;animView({x:px-w/2,y:py-h/2,w,h})}
function centerMe(){if(hasL()&&LM){locate();return}const g=geom(city()),p=userPos(),[ux,uy]=proj(g,p.lat,p.lng),v=MV[S.city];if(v)centerOn(ux,uy,Math.min(v.w,v.base/2.4))}
function selectPin(id){
  if(hasL()&&LM){S.sel=id;lmSelect(id);return}
  S.sel=id;const m=mapEls();if(!m)return;
  m.svg.querySelectorAll(".pin").forEach(p=>p.classList.toggle("sel",p.dataset.pin===id));
  const el=m.svg.querySelector(`[data-pin="${id}"]`);if(el)el.parentNode.appendChild(el);
  const e=findEv(id);if(e)withDist([e]);
  document.getElementById("peek").innerHTML=e?rowHTML(e):"";document.getElementById("mapctl").style.bottom=e?"138px":"16px";
  // ако пинът е скрит под картичката, премести картата малко нагоре
  if(el){const r=el.getBoundingClientRect(),w=m.w.getBoundingClientRect(),v=MV[S.city];if(r.bottom>w.bottom-140||r.top<w.top+60){centerOn(+el.dataset.x,+el.dataset.y+v.h*.12)}}
}
function bindMap(svg){
  if(svg._bound)return;svg._bound=1;const pts=new Map();let moved=0,pinch=null;
  svg.addEventListener("pointerdown",e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===1){moved=0;mapDragged=false}
    if(pts.size===2){const[a,b]=[...pts.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,w:MV[S.city].w}}});
  svg.addEventListener("pointermove",e=>{const prev=pts.get(e.pointerId);if(!prev)return;const cur={x:e.clientX,y:e.clientY};pts.set(e.pointerId,cur);const v=MV[S.city],r=svg.getBoundingClientRect();
    if(pts.size===1){const dx=cur.x-prev.x,dy=cur.y-prev.y;moved+=Math.abs(dx)+Math.abs(dy);if(moved>6){mapDragged=true;svg.classList.add("drag");v.x-=dx/r.width*v.w;v.y-=dy/r.height*v.h;clampView(v);applyView()}}
    else if(pts.size===2&&pinch){mapDragged=true;const[a,b]=[...pts.values()],d=Math.hypot(a.x-b.x,a.y-b.y)||1;zoomTo(pinch.w*pinch.d/d,(a.x+b.x)/2,(a.y+b.y)/2)}});
  const end=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size){svg.classList.remove("drag");setTimeout(()=>{mapDragged=false},60)}};
  ["pointerup","pointercancel","pointerleave"].forEach(t=>svg.addEventListener(t,end));
  svg.addEventListener("wheel",e=>{e.preventDefault();zoomTo(MV[S.city].w*Math.exp(e.deltaY*.0016),e.clientX,e.clientY)},{passive:false});
  svg.addEventListener("dblclick",e=>{e.preventDefault();const v=MV[S.city],r=svg.getBoundingClientRect();centerOn(v.x+(e.clientX-r.left)/r.width*v.w,v.y+(e.clientY-r.top)/r.height*v.h,v.w/1.8)});
}
function mapInit(){
  if(hasL()){lmMain();return}
  const m=mapEls();if(!m)return;sizeMap();
  const r=m.w.getBoundingClientRect(),asp=r.height/r.width,g=geom(city());let v=MV[S.city];
  if(!v){let w=g.W*.92,h=w*asp;if(h<g.H*.92){h=g.H*.92;w=h/asp}v={x:g.W/2-w/2,y:g.H/2-h/2,w,h,base:w};MV[S.city]=v}
  else{const cx=v.x+v.w/2,cy=v.y+v.h/2;v.h=v.w*asp;v.x=cx-v.w/2;v.y=cy-v.h/2}
  applyView();bindMap(m.svg);
  if(!S.mapHintShown){S.mapHintShown=1;toast("Влачи картата с пръст, увеличавай с два пръста или с „+“")}
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-mz],[data-mme]");if(!b)return;if(b.dataset.mz)zoomCenter(b.dataset.mz==="in"?1.7:1/1.7);else centerMe()});
addEventListener("resize",()=>{if(S.tab==="map"&&!S.screens.length)mapInit()});

/* ================= ИСТИНСКА КАРТА (Leaflet + OpenStreetMap) =================
   Ако библиотеката не се зареди (няма интернет до CDN), остава старата схематична карта. */
const hasL=()=>typeof window.L!=="undefined"&&!!window.L.map;
const isDark=()=>{const t=document.documentElement.dataset.theme;return t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches)};
function tiles(){const t=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {maxZoom:19,className:isDark()?"tiles-dark":"",attribution:'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'});return t}
const cityCenter=c=>{const la=c.areas.map(a=>a[1]),ln=c.areas.map(a=>a[2]);return[(Math.min(...la)+Math.max(...la))/2,(Math.min(...ln)+Math.max(...ln))/2]};
const areaIdx=(c,lat,lng)=>{let bi=0,bd=1e9;c.areas.forEach((a,i)=>{const d=dist(lat,lng,a[1],a[2]);if(d<bd){bd=d;bi=i}});return bi};
function pinIcon(e,sel){return L.divIcon({className:"lpin"+(sel?" sel":""),iconSize:[34,46],iconAnchor:[17,45],
  html:`<svg viewBox="-19 -48 38 50" width="34" height="46" data-pin="${e.id}" role="button" tabindex="0" aria-label="${esc(e.title)}"><path style="fill:var(--t-${e.type})" d="M0 0 C-8 -11 -17 -17 -17 -28 A17 17 0 1 1 17 -28 C17 -17 8 -11 0 0z" stroke="#fff" stroke-width="2.5"/><g transform="translate(-9.5 -37.5) scale(.8)" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${UI[typeOf(e.type).icon]}</g></svg>`})}
const meIcon=()=>L.divIcon({className:"lme",iconSize:[22,22],iconAnchor:[11,11],html:"<i></i>"});
const dropIcon=()=>L.divIcon({className:"lpin sel",iconSize:[34,46],iconAnchor:[17,45],html:`<svg viewBox="-19 -48 38 50" width="34" height="46"><path style="fill:var(--brand)" d="M0 0 C-8 -11 -17 -17 -17 -28 A17 17 0 1 1 17 -28 C17 -17 8 -11 0 0z" stroke="#fff" stroke-width="2.5"/><circle cx="0" cy="-28" r="6" fill="#fff"/></svg>`});

/* ---------- основната карта (раздел „Карта“) ---------- */
let LM=null,LMel=null,LMlayer=null,LMcity=null,LMm={};
function lmSize(){const w=document.getElementById("mapwrap");if(!w)return;const top=w.getBoundingClientRect().top,nav=document.querySelector("nav.tabs");w.style.height=Math.max(340,Math.round(innerHeight-top-(nav?nav.offsetHeight:0)))+"px"}
function lmMain(){
  const slot=document.getElementById("lslot");if(!slot)return;
  if(!LM){LMel=document.createElement("div");LMel.className="lmap";
    LM=L.map(LMel,{zoomControl:false,attributionControl:true,minZoom:9});tiles().addTo(LM);LM.attributionControl.setPrefix(false);LMlayer=L.layerGroup().addTo(LM);
    LM.on("dragstart zoomstart",()=>{mapDragged=true});LM.on("moveend zoomend",()=>setTimeout(()=>{mapDragged=false},80))}
  slot.appendChild(LMel);lmSize();LM.invalidateSize();
  if(LMcity!==S.city){LM.setView(cityCenter(city()),12);LMcity=S.city}
  lmDraw();
  if(!S.mapHintShown){S.mapHintShown=1;toast("Влачи картата с пръст и увеличавай с два пръста")}
}
function lmDraw(){
  if(!LM)return;LMlayer.clearLayers();LMm={};
  const p=userPos();
  if(S.F.near)L.circle([p.lat,p.lng],{radius:S.radius*1000,color:"#0E5551",className:"lrad",weight:1.5,fillOpacity:.07,interactive:false}).addTo(LMlayer);
  if(S.posSrc!=="area")L.marker([p.lat,p.lng],{icon:meIcon(),interactive:false,keyboard:false,zIndexOffset:-100}).addTo(LMlayer);
  (S.mapList||[]).forEach(e=>{if(!isFinite(e.lat)||!isFinite(e.lng))return;
    LMm[e.id]=L.marker([e.lat,e.lng],{icon:pinIcon(e,S.sel===e.id),keyboard:false,zIndexOffset:S.sel===e.id?1000:0}).addTo(LMlayer)});
}
function lmSelect(id){
  Object.entries(LMm).forEach(([k,m])=>{const e=findEv(k);if(e){m.setIcon(pinIcon(e,k===id));m.setZIndexOffset(k===id?1000:0)}});
  const e=findEv(id);if(e)withDist([e]);
  const pk=document.getElementById("peek");if(pk)pk.innerHTML=e?rowHTML(e):"";const ct=document.getElementById("mapctl");if(ct)ct.style.bottom=e?"138px":"16px";
  if(e&&LMm[id])LM.panInside(LMm[id].getLatLng(),{paddingTopLeft:[20,70],paddingBottomRight:[20,170]});
}

/* ---------- „Къде си?“: докосни картата, за да посочиш мястото си ---------- */
let LP=null;
function lmPick(){
  const el=document.getElementById("locLmap");if(!el)return;if(LP){LP.remove();LP=null}
  const p=userPos(),c=city();
  LP=L.map(el,{zoomControl:false,attributionControl:true});tiles().addTo(LP);LP.attributionControl.setPrefix(false);
  LP.setView(S.posSrc==="area"?cityCenter(c):[p.lat,p.lng],S.posSrc==="area"?12:14);
  const me=L.marker([p.lat,p.lng],{icon:meIcon(),interactive:false,opacity:S.posSrc==="area"?0:1}).addTo(LP);
  const rc=L.circle([p.lat,p.lng],{radius:S.radius*1000,color:"#0E5551",className:"lrad",weight:1.5,fillOpacity:.07,interactive:false}).addTo(LP);LP._rc=rc;
  LP.on("click",ev=>{S.pos={lat:ev.latlng.lat,lng:ev.latlng.lng,city:S.city};S.posSrc="pin";persist();me.setLatLng(ev.latlng);me.setOpacity(1);rc.setLatLng(ev.latlng);
    const h=el.parentNode.querySelector(".maphint");if(h)h.textContent="Ти си тук: "+nearestArea(userPos());renderTab()});
  setTimeout(()=>LP&&LP.invalidateSize(),350);
}

/* ---------- адрес → точно място (OpenStreetMap / Nominatim) ---------- */
const GEO={};
async function geocode(addr,c){
  const clean=String(addr).replace(/№\s*/g,"").replace(/\s+/g," ").trim();if(!clean)return null;
  const key=c.id+"|"+clean.toLowerCase();if(key in GEO)return GEO[key];
  const ctr=cityCenter(c),base="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=bg&accept-language=bg&";
  const tries=[base+"q="+encodeURIComponent(clean+", "+c.name+", България"),
    base+"street="+encodeURIComponent(clean.replace(/^(ул\.|улица|бул\.|булевард|пл\.|площад)\s*/i,""))+"&city="+encodeURIComponent(c.name)];
  for(const u of tries){
    const r=await fetch(u,{headers:{Accept:"application/json"}});if(!r.ok)throw new Error("geocode "+r.status);
    const hit=(await r.json()).find(h=>dist(ctr[0],ctr[1],+h.lat,+h.lon)<30);
    if(hit)return GEO[key]={lat:+hit.lat,lng:+hit.lon,label:String(hit.display_name||"").split(",").slice(0,3).join(",")};
  }
  return GEO[key]=null;
}

/* ---------- малка карта във формата за събитие ---------- */
let LF=null;
function lmForm(getCity,onPick){
  const el=document.getElementById("fMap");if(!el)return null;if(LF){LF.remove();LF=null}
  const c=getCity(),pt=newEv.pt;
  LF=L.map(el,{zoomControl:false,attributionControl:true});tiles().addTo(LF);LF.attributionControl.setPrefix(false);
  LF.setView(pt?[pt.lat,pt.lng]:cityCenter(c),pt?16:12);
  let mk=pt?L.marker([pt.lat,pt.lng],{icon:dropIcon(),interactive:false}).addTo(LF):null;
  LF.on("click",ev=>onPick(ev.latlng.lat,ev.latlng.lng,"Мястото е посочено на картата."));
  LF.place=(lat,lng,zoom)=>{if(mk)mk.setLatLng([lat,lng]);else mk=L.marker([lat,lng],{icon:dropIcon(),interactive:false}).addTo(LF);LF.setView([lat,lng],zoom||Math.max(LF.getZoom(),16))};
  LF.recenter=()=>{if(mk){mk.remove();mk=null}LF.setView(cityCenter(getCity()),12)};
  setTimeout(()=>LF&&LF.invalidateSize(),350);
  return LF;
}
// при отваряне: ако човекът вече е разрешил локацията, я обновяваме тихо (може да се е преместил)
addEventListener("load",()=>{try{if(S.posSrc==="gps"&&navigator.permissions)navigator.permissions.query({name:"geolocation"}).then(r=>{if(r.state==="granted")locate(true)}).catch(()=>{})}catch(e){}});

/* ================= РЕНДЕР ================= */
const TABS={home:renderHome,events:renderEvents,map:renderMap,saved:renderSaved,profile:renderProfile};
function renderTab(){
  $("#main").innerHTML=TABS[S.tab]();
  document.querySelectorAll("nav.tabs button").forEach(b=>{const on=b.dataset.tab===S.tab;b.classList.toggle("on",on);b.setAttribute("aria-current",on?"page":"false");b.querySelector("svg").outerHTML=(on?uiFill:ui)(b.dataset.icon)});
  const n=S.bookings.length+S.favs.filter(f=>!S.bookings.includes(f)).length,bd=$("#savedBadge");bd.hidden=!n;bd.textContent=n;
  setupCarousel("hero","dots",null);
  if(S.tab==="map")mapInit();
}
const SCREENS={policy:()=>policyHTML(),mydata:()=>myDataHTML(),admin:()=>adminHTML(),thread:s=>threadHTML(s.id),inbox:()=>inboxHTML(),welcome:()=>welcomeHTML(),interests:s=>interestsHTML(s.step),event:s=>eventHTML(s.id),filters:()=>filtersHTML(),date:()=>dateHTML(),orgpage:s=>orgPageHTML(s.id),dash:()=>dashHTML(),history:()=>historyHTML()};
let lastKey="";
function renderScreen(){
  const top=S.screens[S.screens.length-1],root=$("#screenRoot");
  if(!top){root.innerHTML="";lastKey="";document.body.style.overflow="";return}
  const key=top.name+(top.id||"")+(top.step??""),old=$("#scr"),same=key===lastKey,st=same&&old?old.scrollTop:0;
  root.innerHTML=`<div class="screen${top.name==="welcome"?" fade":""}" id="scr" ${same?'style="animation:none"':""}>${SCREENS[top.name](top)}</div>`;
  if(same)$("#scr").scrollTop=st;
  lastKey=key;document.body.style.overflow="hidden";
  if(top.name==="welcome")setupCarousel("wslides","wdots",i=>{const t=wT(i);$("#wtext").innerHTML=`<h1>${t[0]}<br>${t[1]}</h1><p>${t[2]}</p>`});
}
function renderAll(){const y=scrollY;renderTab();renderScreen();scrollTo(0,y)}
function push(name,o={}){S.screens.push(Object.assign({name},o));renderScreen()}
function pop(){S.screens.pop();renderScreen();renderTab();if(S.polReturn){S.polReturn=0;$("#sheetRoot").hidden=false}}
function goTab(t){S.tab=t;S.screens=[];closeSheet();renderAll();scrollTo(0,0);if(t==="map")mapInit()}

let carTimers={};
function setupCarousel(id,dotsId,onChange){
  clearInterval(carTimers[id]);const h=document.getElementById(id);if(!h)return;
  const slides=[...h.children],dots=[...document.getElementById(dotsId).children];if(slides.length<2)return;
  let cur=0;
  h.addEventListener("scroll",()=>{const i=Math.round(h.scrollLeft/(slides[0].offsetWidth+(parseFloat(getComputedStyle(h).columnGap)||0)));if(i!==cur){cur=i;dots.forEach((d,j)=>d.classList.toggle("on",j===i));onChange&&onChange(i)}},{passive:true});
  h.addEventListener("pointerdown",()=>clearInterval(carTimers[id]),{once:true});
  if(reduced())return;
  carTimers[id]=setInterval(()=>{if(!document.body.contains(h)){clearInterval(carTimers[id]);return}const w=slides[0].offsetWidth+(parseFloat(getComputedStyle(h).columnGap)||0);h.scrollTo({left:((cur+1)%slides.length)*w,behavior:"smooth"})},4200);
}

/* ================= ЛИСТОВЕ ================= */
function openSheet(html){$("#sheetRoot").innerHTML=`<div class="sheet-bg" id="sbg"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div><div class="in">${html}</div></div></div>`}
function closeSheet(){$("#sheetRoot").innerHTML="";$("#sheetRoot").hidden=false}
const sheetOpen=()=>!!$("#sbg");
const sheetHead=(t,sub)=>`<div class="sheet-head"><div><h2>${t}</h2>${sub?`<p class="hint">${sub}</p>`:""}</div><button type="button" class="x" data-close aria-label="Затвори">${ui("x")}</button></div>`;

function openLocation(msg){
  const u=U(),favs=loggedIn()?u.favCities:[],isFavC=favs.includes(S.city);
  openSheet(`${sheetHead("Къде си?","Избери град и посочи мястото си на картата.")}
   ${favs.length?`<div><span class="hint" style="font-weight:800">Любими локации</span><div class="citygrid" style="margin-top:8px">${favs.map(id=>`<button type="button" class="cchip${id===S.city?" on":""}" data-citypick="${id}">${uiFill("heart")}${esc(cityName(id))}</button>`).join("")}</div></div>`:""}
   <div class="citygrid">${CITIES.filter(c=>!favs.includes(c.id)).map(c=>`<button type="button" class="cchip${c.id===S.city?" on":""}" data-citypick="${c.id}">${esc(c.name)}</button>`).join("")}</div>
   ${loggedIn()?`<button type="button" class="btn ${isFavC?"ghost":"line"} sm" data-favcity style="justify-self:start">${isFavC?uiFill("heart")+" "+esc(city().name)+" е в любими":ui("heart")+" Добави "+esc(city().name)+" в любими"}</button>`:""}
   <button type="button" class="btn block" data-gps>${ui("locate")} Намери ме автоматично</button>
   ${msg?`<p class="err">${esc(msg)}</p>`:""}
   <div class="minimap" id="locMap">${hasL()?`<div class="lmini" id="locLmap"></div>`:mapSVG({radius:true,kind:"pick"})}<div class="maphint">${S.posSrc==="area"?"Докосни картата, за да посочиш къде си":"Ти си тук: "+esc(nearestArea(userPos()))}</div></div>
   <p class="hint">${ui("check","i",2.4)} Местоположението остава само на телефона ти. Не го изпращаме и не го пазим.</p>
   <label class="radius"><span>Около мен</span><input id="radius2" type="range" min="1" max="15" step="1" value="${S.radius}"><output id="radiusOut2">${S.radius} км</output></label>
   <button type="button" class="btn ghost block" data-close>Готово</button>`);
  if(hasL())lmPick();
}
function openNotifOld(){
  const l=notifications();if(U().justApproved){U().justApproved=false;persist()}
  openSheet(`${sheetHead("Известия",U().notif?"":"Известията са изключени от Профил.")}
   ${!loggedIn()?`<p class="hint">Влез, за да получаваш напомняния за запазените си места.</p>${loginBtns}`:l.length?l.map(n=>`<button type="button" class="nrow" ${n.admin?`data-admin="${n.admin}"`:n.thread?`data-thread="${n.thread}"`:n.none?"":`data-open="${n.id}"`} style="border:0;border-bottom:1px solid var(--line);background:none;text-align:left;width:100%"><span class="mi">${ui(n.icon)}</span><span><b>${esc(n.t)}</b><br><span class="hint">${esc(n.s)}</span></span></button>`).join(""):`<p class="hint">Няма нови известия. Тук ще виждаш напомняния за запазени места, промени от организатори и нови събития от тези, които следваш.</p>`}`);
}
function openSettings(){
  openSheet(`${sheetHead("Настройки")}
   <div class="panel" style="box-shadow:none;background:var(--sunk)"><b>${esc(S.userName)}</b><span class="hint">${esc(S.email)} · ${S.role==="org"?"организатор":S.role==="admin"?"администратор":"потребител"}</span>
   ${S.role!=="admin"?`<label class="form"><span class="hint">${S.role==="org"?"Име на организацията":"Име или прякор"}</span><input type="text" id="uname" value="${esc(S.userName)}" maxlength="30"></label>`:""}</div>
   <button type="button" class="btn line block" data-logout>${ui("logout")} Изход от профила</button>
   `);
}

/* ================= ФОРМА ЗА СЪБИТИЕ ================= */
let newEv={icon:"paint",photo:null};
function openEventForm(editId,dupId){
  const ex=editId?findEv(editId):null,src=ex||(dupId?findEv(dupId):null);
  if(ex&&!ownsEvent(ex)&&!isAdmin()){toast("Можеш да редактираш само свои събития.");return}
  // админът публикува от името на външен организатор (с линк за записване)
  const adm=isAdmin()&&(!ex||!!ex.extOrg||ex.owner===LIVE.me.id);
  let c=src?CITIES.find(x=>x.id===src.city):city();
  newEv={icon:src?src.icon:"paint",photo:src?src.photo||null:null,pt:src&&isFinite(src.lat)?{lat:src.lat,lng:src.lng}:null,moved:!ex&&!!src,exact:!!src};
  const sd=src?new Date(src.start):new Date(today.getTime()+864e5+10.5*36e5);
  const v=src?{...src}:{title:"",cat:"k37",amin:3,amax:7,type:"workshop",area:c.areas[0][0],address:"",price:0,dur:60,cap:20,booking:!adm,desc:""};
  const booked=ex?bookedCount(ex):0;
  const areaOpts=()=>c.areas.map((a,i)=>`<option value="${i}"${a[0]===v.area?" selected":""}>${esc(a[0])}</option>`).join("");
  openSheet(`${sheetHead(ex?"Редакция на събитие":dupId?"Копие на събитие":"Ново събитие",ex&&booked?booked+" души са запазили място. Ще видят, че събитието е обновено.":ex?"":adm?"Публикува се веднага, без одобрение.":"Публикуването е безплатно.")}
  <form class="form" id="evForm" novalidate>
    ${adm?`<label>Организатор<input type="text" id="fOrg" maxlength="80" value="${esc(src&&src.extOrg||"")}" placeholder="напр. Куклен театър „Приказка“"></label>
    <label>Линк за запазване на място<input type="url" id="fExt" inputmode="url" value="${esc(src&&src.ext||"")}" placeholder="https://… (сайт или страница на организатора)"></label>
    <p class="hint" style="margin:-4px 0 0">Посетителите ще отиват на този линк, за да запазят място. Остави празно при свободен вход.</p>
    <label class="field">Град<select id="fCity">${CITIES.map(x=>`<option value="${x.id}"${x.id===c.id?" selected":""}>${esc(x.name)}</option>`).join("")}</select></label>`:""}
    <label>Заглавие<input type="text" id="fTitle" maxlength="80" value="${esc(v.title)}" placeholder="напр. Куклен театър „Пинокио“"></label>
    <div class="row2"><label>Възраст от (г.)<input type="number" id="fAmin" inputmode="numeric" min="0" max="98" value="${v.amin??(AGE_R[v.cat]||[3])[0]}"></label><label>до (г.)<input type="number" id="fAmax" inputmode="numeric" min="0" max="99" value="${(v.amax??(AGE_R[v.cat]||[0,7])[1])>=99?"":(v.amax??(AGE_R[v.cat]||[0,7])[1])}" placeholder="без граница"></label></div>
    <p class="hint" id="fAgeHint" style="margin:-4px 0 0"></p>
    <div class="row2"><label class="field">Вид<select id="fType">${TYPES.map(t=>`<option value="${t.key}"${t.key===v.type?" selected":""}>${t.label}</option>`).join("")}</select></label></div>
    <div><span class="hint" style="font-weight:700">Корица</span>
      <div class="upl" style="margin-top:6px"><div class="prev" id="fPrev"></div><label class="btn ghost sm" style="cursor:pointer">Качи снимка<input type="file" id="fPhoto" accept="image/*" hidden></label><button type="button" class="btn ghost sm" id="fNoPhoto" hidden>Махни снимката</button></div>
      <div class="icopick" id="icoPick" style="margin-top:8px"></div></div>
    <label>Място (зала, клуб, парк)<input type="text" id="fVenue" maxlength="60" value="${esc(src?src.venue:(ORGS[myOrg()]?.name||""))}"></label>
    <div class="row2"><label class="field"><span id="fAreaL">Квартал (${esc(c.name)})</span><select id="fArea">${areaOpts()}</select></label><label>Адрес<input type="text" id="fAddr" maxlength="80" value="${esc(v.address||"")}" placeholder="ул. Шипка 12"></label></div>
    <div style="display:grid;gap:8px">${hasL()?`<div class="minimap"><div class="lmini sm" id="fMap"></div><div class="maphint" id="fGeoHint"></div></div>`:`<p class="hint" id="fGeoHint"></p>`}
      <button type="button" class="btn ghost sm" id="fFind" style="justify-self:start">${ui("pin")} Намери адреса на картата</button></div>
    <div class="row2"><label>Дата<input type="date" id="fDate" value="${ymd(sd)}"></label><label>Час<input type="time" id="fTime" value="${hm(sd)}"></label></div>
    <label class="check"><input type="checkbox" id="fRep"${v.repeat?" checked":""}> <span id="fRepL">Повтаря се ${WEVERY[sd.getDay()]}</span></label>
    <div class="row2"><label>Цена (€)<input type="number" id="fPrice" min="0" step="1" value="${v.price}"></label><label>Продължителност (мин)<input type="number" id="fDur" min="15" step="15" value="${v.dur}"></label></div>
    ${adm?"":`<label class="check"><input type="checkbox" id="fBook"${v.booking?" checked":""}> Позволи запазване на място</label>
    <label>Брой места<input type="number" id="fCap" min="1" value="${v.cap||12}"${v.booking?"":" disabled"}></label>`}
    <label>Описание<textarea id="fDesc" maxlength="600" placeholder="Какво ще правят, какво да вземат, за кого е подходящо.">${esc(v.desc)}</textarea></label>
    <p class="err" id="fErr" hidden></p>
    <button type="submit" class="btn block">${ex?"Запази промените":"Публикувай"}</button>
  </form>`);
  const drawPrev=()=>{const t=$("#fType").value;$("#fPrev").innerHTML=newEv.photo?`<img src="${newEv.photo}" alt="">`:cover("new"+newEv.icon,t,newEv.icon,{small:true});
    $("#icoPick").innerHTML=ART_KEYS.map(k=>`<button type="button" data-ico="${k}" class="${!newEv.photo&&newEv.icon===k?"on":""}" aria-label="Илюстрация ${k}">${cover("pick"+k,t,k,{small:true})}</button>`).join("");$("#fNoPhoto").hidden=!newEv.photo};
  drawPrev();
  $("#fType").addEventListener("change",drawPrev);
  const ageRead=()=>{const a=parseInt($("#fAmin").value,10),bv=$("#fAmax").value.trim(),b=bv===""?99:parseInt(bv,10);return{a,b,ok:Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&a<=98&&b>=a&&b<=99}};
  const ageHint=()=>{const r=ageRead(),h=$("#fAgeHint");if(!r.ok){h.textContent="Въведи възраст от–до в години. За възрастни: от 18, „до“ остави празно.";return}
    const ks=agesFor(r.a,r.b);h.textContent=`Етикет „${ageLabel(r.a,r.b)}“ · ще се вижда в ${ks.length>1?"групите":"групата"}: ${ks.map(k=>catOf(k).short).join(", ")}`};
  ["#fAmin","#fAmax"].forEach(s=>$(s).addEventListener("input",ageHint));ageHint();
  $("#fDate").addEventListener("change",e=>{const p=e.target.value.split("-").map(Number);if(p.length===3)$("#fRepL").textContent="Повтаря се "+WEVERY[new Date(p[0],p[1]-1,p[2]).getDay()]});
  $("#icoPick").addEventListener("click",ev=>{const b=ev.target.closest("[data-ico]");if(!b)return;ev.stopPropagation();newEv.icon=b.dataset.ico;newEv.photo=null;drawPrev()});
  $("#fNoPhoto").addEventListener("click",ev=>{ev.stopPropagation();newEv.photo=null;drawPrev()});
  $("#fPhoto").addEventListener("change",ev=>{const f=ev.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const W=1200,sc=Math.min(1,W/im.width),cv=document.createElement("canvas");cv.width=Math.round(im.width*sc);cv.height=Math.round(im.height*sc);cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);newEv.photo=cv.toDataURL("image/jpeg",.75);drawPrev()};im.onerror=()=>toast("Файлът не е снимка. Опитай с JPG или PNG.");im.src=rd.result};rd.readAsDataURL(f)});
  if(!adm)$("#fBook").addEventListener("change",e=>{$("#fCap").disabled=!e.target.checked});
  // точно място: търсене на адреса или докосване на картата
  const geoHint=m=>{const h=$("#fGeoHint");if(h)h.textContent=m};
  const setPt=(lat,lng,msg)=>{newEv.pt={lat,lng};newEv.moved=true;newEv.exact=true;$("#fArea").value=String(areaIdx(c,lat,lng));geoHint(msg);if(LF)LF.place(lat,lng)};
  geoHint(newEv.pt&&src?(ex?"Мястото на събитието е отбелязано. Ако смениш адреса, ще го потърсим отново.":"Мястото е копирано от събитието."):hasL()?"Въведи адрес и натисни „Намери адреса на картата“ или докосни картата.":"Въведи адрес и натисни „Намери адреса на картата“.");
  if(hasL())lmForm(()=>c,setPt);
  $("#fAddr").addEventListener("input",()=>{newEv.exact=false});
  const findAddr=async()=>{const ad=$("#fAddr").value.trim();if(!ad){geoHint("Първо въведи адрес.");return null}
    geoHint("Търсим адреса…");try{const g=await geocode(ad,c);if(g){setPt(g.lat,g.lng,"Намерено: "+g.label);return g}geoHint("Не открихме този адрес в "+c.name+". Провери улицата и номера"+(hasL()?" или докосни картата.":"."));return null}
    catch(e){geoHint("Търсенето на адреса не работи в момента."+(hasL()?" Докосни картата, за да посочиш мястото.":""));return false}};
  $("#fFind").addEventListener("click",ev=>{ev.stopPropagation();findAddr()});
  if(adm)$("#fCity").addEventListener("change",e=>{c=CITIES.find(x=>x.id===e.target.value);v.area=c.areas[0][0];$("#fArea").innerHTML=areaOpts();$("#fAreaL").textContent=`Квартал (${c.name})`;
    newEv.pt=null;newEv.moved=false;newEv.exact=false;if(LF)LF.recenter()});
  $("#evForm").addEventListener("submit",async ev=>{
    ev.preventDefault();
    const err=m=>{const p=$("#fErr");p.textContent=m;p.hidden=false};
    const title=$("#fTitle").value.trim();if(!title)return err("Въведи заглавие на събитието.");
    const ag=ageRead();if(!ag.ok)return err("Провери възрастта: „от“ трябва да е между 0 и 98, а „до“ да е по-голямо или празно.");
    if(!$("#fDate").value||!$("#fTime").value)return err("Избери дата и час.");
    if($("#fAddr").value.trim()&&!newEv.exact){const sb2=ev.target.querySelector("button[type=submit]");sb2.disabled=true;const g=await findAddr();sb2.disabled=false;
      if(g===null)return err("Не открихме адреса на картата. Провери улицата и номера"+(hasL()?" или докосни картата, за да посочиш мястото.":"."))}
    const a=c.areas[+$("#fArea").value];
    const[y,mo,da]=$("#fDate").value.split("-").map(Number),[hh,mm]=$("#fTime").value.split(":").map(Number),start=new Date(y,mo-1,da,hh,mm);
    if(start.getTime()<Date.now()-36e5&&(!ex||start.getTime()!==new Date(ex.start).getTime()))return err("Датата е в миналото. Избери бъдещ ден и час.");
    let extOrg=null,extUrl=null;
    if(adm){extOrg=$("#fOrg").value.trim();extUrl=$("#fExt").value.trim();
      if(!extOrg)return err("Въведи името на организатора.");
      if(extUrl&&!/^https?:\/\//i.test(extUrl))extUrl="https://"+extUrl;
      if(extUrl&&!/^https?:\/\/[^\s.]+\.[^\s]+$/i.test(extUrl))return err("Линкът не изглежда правилен. Копирай го от адресната лента на сайта.")}
    const book=adm?false:$("#fBook").checked,cap=book?Math.max(1,+$("#fCap").value||10):null;
    if(ex&&book&&cap<booked)return err(`Вече има ${booked} записани. Местата не може да са по-малко от тях.`);
    if(ex&&!book&&booked)return err(`Има ${booked} записани. Остави резервациите включени или първо ги уведоми.`);
    if(title.length<3)return err("Заглавието трябва да е поне 3 знака.");
    const f={title,age:agesFor(ag.a,ag.b)[0],age_min:ag.a,age_max:ag.b,type:$("#fType").value,icon:newEv.icon,venue:$("#fVenue").value.trim()||null,address:$("#fAddr").value.trim()||null,description:$("#fDesc").value.trim()||null,price_eur:Math.max(0,+$("#fPrice").value||0),booking:book,duration_min:Math.max(15,+$("#fDur").value||60),capacity:cap,starts_at:start.toISOString()};if($("#fRep").checked)f.repeat_weekly=true;else if(ex&&ex.repeat)f.repeat_weekly=false;
    if(adm)Object.assign(f,{ext_org:extOrg,ext_url:extUrl||null,city_id:c.id});
    if(newEv.moved&&newEv.pt)Object.assign(f,{area:a[0],lat:newEv.pt.lat,lng:newEv.pt.lng});
    else if(!ex||a[0]!==ex.area||c.id!==ex.city){const r=rng(Date.now());Object.assign(f,{area:a[0],lat:a[1]+(r()-.5)*.006,lng:a[2]+(r()-.5)*.008})}
    const btn=ev.target.querySelector("button[type=submit]");btn.disabled=true;
    act(async()=>{
      f.photo_url=newEv.photo?await uploadImage(newEv.photo,"events"):null;
      if(ex)await q(sb.from("events").update(f).eq("id",ex.id));
      else await q(sb.from("events").insert(Object.assign({organizer_id:LIVE.me.id,city_id:c.id},adm?{mod_status:"approved"}:{},f)));
    },{reload:["events"]}).then(r=>{btn.disabled=false;if(!r)return;closeSheet();renderAll();
      if(ex)toast(booked?`Промените са запазени. Записаните (${booked}) получиха известие.`:"Промените са запазени");
      else{confetti(innerWidth/2,innerHeight/3);toast(adm?"Публикувано. Вече се вижда в приложението.":"Изпратено за одобрение. Ще се появи в приложението, щом администратор го одобри.")}});
  });
}

/* ================= ВХОД ================= */
let authRole="user";
function openAuth(mode,msg){
  const reg=mode==="register";
  openSheet(`${sheetHead(reg?"Нов профил":"Вход",msg?esc(msg):"")}
   <div class="seg2" role="tablist"><button type="button" class="${reg?"":"on"}" data-auth="login">Вход</button><button type="button" class="${reg?"on":""}" data-auth="register">Регистрация</button></div>
   <form class="form" id="authForm" novalidate>
     ${reg?`<div class="rolepick" role="group" aria-label="Тип профил"><button type="button" data-arole="user" class="${authRole==="user"?"on":""}"><b>Потребител</b><small>Търся събития, запазвам места</small></button><button type="button" data-arole="org" class="${authRole==="org"?"on":""}"><b>Организатор</b><small>Публикувам събития безплатно</small></button></div>
     <label><span id="aNameL">${authRole==="org"?"Име на организацията":"Име или прякор"}</span><input type="text" id="aName" maxlength="40" autocomplete="nickname"></label><span class="hint" id="aNameH">${authRole==="org"?"Показва се на обявите ти.":"Вижда го само организаторът, при който запазиш място. Не е нужно истинското ти име."}</span>`:""}
     <label>Имейл<input type="text" id="aEmail" inputmode="email" autocomplete="email" maxlength="80"></label>
     <label>Парола<input type="password" id="aPw" autocomplete="${reg?"new-password":"current-password"}" maxlength="64"></label>
     <p class="err" id="aErr" hidden></p>
     ${reg?`<label class="check pcheck"><input type="checkbox" id="aPol"> <span>Навърших 18 години, прочетох <button type="button" class="lnk" data-policy>Политиката за поверителност</button> и я приемам.</span></label>`:""}
     <button type="submit" class="btn block">${reg?"Създай профил":"Влез"}</button>
   </form>
   ${reg?"":`<p class="hint" style="text-align:center"><button type="button" class="lnk" data-forgot>Забравена парола?</button></p>`}
   <p class="hint"><button type="button" class="lnk" data-policy>Политика за поверителност</button></p>`);
  $("#authForm").addEventListener("submit",ev=>{
    ev.preventDefault();
    const err=m=>{const p=$("#aErr");p.textContent=m;p.hidden=false};
    const email=$("#aEmail").value.trim().toLowerCase(),pw=$("#aPw").value;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return err("Въведи валиден имейл, например ime@primer.bg.");
    if(Date.now()<(loginLock[email]||0))return err("Твърде много опити. Опитай пак след няколко минути.");
    const btn=ev.target.querySelector("button[type=submit]");btn.disabled=true;const done=()=>{btn.disabled=false};
    if(reg){
      const name=$("#aName").value.trim();
      if(!name){done();return err(authRole==="org"?"Въведи името на организацията.":"Въведи името си.")}
      if(pw.length<8){done();return err("Паролата трябва да е поне 8 знака.")}
      if(!$("#aPol").checked){done();return err("За да създадеш профил, отбележи, че приемаш Политиката за поверителност.")}
      busy(true);
      sb.auth.signUp({email,password:pw,options:{emailRedirectTo:location.origin+location.pathname,data:{full_name:name,role:authRole,policy_version:polVer()}}}).then(async({data,error})=>{
        busy(false);done();if(error)return err(bgErr(error));
        if(data.user&&Array.isArray(data.user.identities)&&!data.user.identities.length)return err("Вече има профил с този имейл. Влез от раздел „Вход“.");
        if(!data.session){openSheet(`${sheetHead("Провери имейла си")}<p>Изпратихме писмо до <b>${esc(email)}</b>. Отвори линка в него, за да потвърдиш профила, и после влез.</p><p class="hint">Не го виждаш? Провери папка „Спам“ или „Промоции“.</p><button type="button" class="btn block" data-auth="login">Към вход</button>`);return}
        await afterLogin(true);
      });
    }else{
      busy(true);
      sb.auth.signInWithPassword({email,password:pw}).then(async({error})=>{
        busy(false);done();
        if(error){loginFails[email]=(loginFails[email]||0)+1;if(loginFails[email]>=5){loginLock[email]=Date.now()+5*6e4;loginFails[email]=0}return err(bgErr(error))}
        loginFails[email]=0;await afterLogin(false,err);
      });
    }
  });
}
const loginFails={},loginLock={};
async function afterLogin(isNew,err){
  busy(true);try{await LOAD.all()}catch(e){busy(false);toast(bgErr(e));return}busy(false);
  const st=LIVE.me&&LIVE.me.status;
  if(st==="rejected"||st==="blocked"){await sb.auth.signOut();await LOAD.me();const m=st==="rejected"?"Регистрацията ти е отказана от администратор. Пиши ни, ако смяташ, че е грешка.":"Профилът е блокиран от администратор.";if(err)err(m);else toast(m);renderAll();return}
  S.seenWelcome=true;
  if(!S.interests&&S.guestInterests&&LIVE.me){LIVE.me.interests=Object.assign({set:true},S.guestInterests);saveProfile({interests:LIVE.me.interests}).catch(()=>{})}
  persist();closeSheet();
  const p=S.pending;S.pending=null;
  S.screens=S.screens.filter(s=>s.name!=="welcome"&&s.name!=="interests");
  if(S.role==="admin"){S.screens=[];S.tab="profile";renderAll();S.adm.tab="overview";push("admin");toast("Здравей! Влезе като администратор.");return}
  renderAll();
  toast(isNew?(S.role==="org"?`Профилът е създаден и чака одобрение. Добре дошъл, ${S.userName}!`:`Добре дошъл, ${S.userName}!`):`Здравей, ${S.userName}!`);
  if(p){if(p.type==="newEv"){if(S.role==="org")openEventForm()}else if(p.id&&!S.screens.some(s=>s.name==="event"&&s.id===p.id))openEvent(p.id)}
  else if(isNew){confetti(innerWidth/2,innerHeight/3);if(!S.interests)setTimeout(startOb,500)}
  signInPolicyCheck();
}
function signInPolicyCheck(){if(needsPolicy())setTimeout(openPolicyGate,60)}
function need(type,id,msg){if(loggedIn()){const st=U().status;if(["book","review","newEv"].includes(type)&&st&&st!=="approved"){toast(st==="pending"?"Профилът ти чака одобрение от администратор. Ще можеш да го направиш след потвърждение.":"Профилът ти не е активен. Пиши ни от Профил → Съобщения.");return true}return false}S.pending={type,id};openAuth("login",msg);return true}
function startOb(){const I=S.interests;S.ob={picks:I?I.picks.slice():[],ages:I?I.ages.slice():[]};push("interests",{step:0})}
function finishOb(){const I={picks:S.ob.picks.slice(),ages:S.ob.ages.slice()};if(loggedIn()){LIVE.me.interests=Object.assign({set:true},I);saveProfile({interests:LIVE.me.interests}).catch(e=>toast(bgErr(e)))}else S.guestInterests=I;S.seenWelcome=true;persist();S.screens=[];S.tab="home";closeSheet();renderAll();scrollTo(0,0);confetti(innerWidth/2,innerHeight/3);toast("Готово! Подредихме събитията по твоите интереси.")}
function setTarget(fn){const t=S.screens.some(s=>s.name==="filters")?S.FD:S.F;fn(t)}

/* ================= КЛИКОВЕ ================= */
document.addEventListener("click",ev=>{
  const pickMap=ev.target.closest('svg[data-map="pick"]');
  if(pickMap){const q=mapPoint(pickMap,ev);if(q){S.pos={lat:q.lat,lng:q.lng,city:S.city};S.posSrc="pin";persist();openLocation();renderAll()}return}
  const pinEl=ev.target.closest("[data-pin]");
  if(pinEl){if(mapDragged)return;selectPin(pinEl.dataset.pin);return}
  const t=ev.target.closest("button,a,#sbg");if(!t)return;
  if(t.id==="sbg"){if(ev.target===t&&!t.dataset.locked)closeSheet();return}
  const ds=t.dataset;
  if(adminClick(ds,t,ev))return;
  if(ds.tab){goTab(ds.tab);return}
  if(ds.back!==undefined){if(S.screens[S.screens.length-1]?.name==="date")S.cal=null;pop();return}
  if(ds.close!==undefined){closeSheet();renderAll();return}
  if(ds.open){closeSheet();openEvent(ds.open);return}
  if(ds.screen){if(ds.screen==="date")S.cal=null;push(ds.screen);if(ds.screen==="dash")loadDash();return}
  if(ds.orgpage){push("orgpage",{id:ds.orgpage});return}
  // начало
  if(ds.banner){S.F=Object.assign(defaultF(),{ages:[ds.banner]});goTab("events");return}
  if(ds.quick){const F=defaultF();if(ds.quick==="we")F.when="we";else if(ds.quick==="today")F.when="today";else if(ds.quick==="popular")F.popular=true;else if(ds.quick==="near")F.near=true;else if(ds.quick==="free")F.free=true;else if(ds.quick==="fy"&&S.interests){F.ages=interestAges().slice();F.types=S.interests.picks.filter(k=>k!=="kids")}S.F=F;goTab("events");return}
  if(ds.notif!==undefined){openNotif();return}
  if(ds.loc!==undefined){openLocation();return}
  if(ds.citypick){S.city=ds.citypick;S.posSrc="area";S.sel=null;persist();if(loggedIn()&&LIVE.me.home_city!==S.city)saveProfile({home_city:S.city}).catch(()=>{});openLocation();renderAll();return}
  if(ds.favcity!==undefined){const fc=U().favCities,n=fc.includes(S.city)?fc.filter(x=>x!==S.city):fc.concat(S.city);act(()=>saveProfile({fav_cities:n})).then(()=>openLocation());return}
  if(ds.gps!==undefined){locate();return}
  // филтри
  if(ds.filters!==undefined){S.FD=JSON.parse(JSON.stringify(S.F));push("filters");return}
  if(ds.unpill){const k=ds.unpill,F=S.F;if(k==="when"){F.when="all";F.date=null}else if(k.startsWith("age:"))F.ages=F.ages.filter(x=>x!==k.slice(4));else if(k.startsWith("type:"))F.types=F.types.filter(x=>x!==k.slice(5));else if(k==="q")F.q="";else F[k]=false;renderTab();return}
  if(ds.fage==="all"){S.FD.ages=[];renderScreen();return}
  if(ds.fage){const a=S.FD.ages;S.FD.ages=a.includes(ds.fage)?a.filter(x=>x!==ds.fage):a.concat(ds.fage);renderScreen();return}
  if(ds.ftype){const a=S.FD.types;S.FD.types=a.includes(ds.ftype)?a.filter(x=>x!==ds.ftype):a.concat(ds.ftype);renderScreen();return}
  if(ds.fwhen){S.FD.when=ds.fwhen;S.FD.date=null;renderScreen();return}
  if(ds.fnear!==undefined){S.FD.near=!S.FD.near;renderScreen();return}
  if(ds.ffree!==undefined){S.FD.free=!S.FD.free;renderScreen();return}
  if(ds.fpop!==undefined){S.FD.popular=!S.FD.popular;renderScreen();return}
  if(ds.fclear!==undefined){S.FD=defaultF();renderScreen();return}
  if(ds.fclearAll!==undefined){S.F=defaultF();renderTab();return}
  if(ds.fapply!==undefined){S.F=S.FD;S.screens.pop();if(S.tab!=="map")S.tab="events";renderAll();scrollTo(0,0);return}
  // календар
  if(ds.calm){let{y,m}=S.cal;m+= +ds.calm;if(m<0){m=11;y--}if(m>11){m=0;y++}S.cal.y=y;S.cal.m=m;renderScreen();return}
  if(ds.day){S.cal.sel=ds.day;S.cal.mode="date";renderScreen();return}
  if(ds.calq){S.cal.mode=ds.calq;S.cal.sel=null;renderScreen();return}
  if(ds.capply!==undefined){const c=S.cal;setTarget(F=>{if(c.mode==="date"&&c.sel){F.when="date";F.date=c.sel}else if(["today","tom","we"].includes(c.mode)){F.when=c.mode;F.date=null}});S.cal=null;S.screens.pop();renderAll();return}
  // интереси
  if(ds.start!==undefined){S.seenWelcome=true;persist();startOb();return}
  if(ds.interests!==undefined){startOb();return}
  if(ds.pick){const a=S.ob.picks;S.ob.picks=a.includes(ds.pick)?a.filter(x=>x!==ds.pick):a.concat(ds.pick);t.classList.toggle("on");t.setAttribute("aria-pressed",S.ob.picks.includes(ds.pick));return}
  if(ds.obage){const a=S.ob.ages;S.ob.ages=a.includes(ds.obage)?a.filter(x=>x!==ds.obage):a.concat(ds.obage);t.classList.toggle("on");t.setAttribute("aria-pressed",S.ob.ages.includes(ds.obage));return}
  if(ds.obnext!==undefined){if(S.ob.picks.includes("kids")&&!S.ob.ages.length)S.ob.ages=[];push("interests",{step:1});return}
  if(ds.obdone!==undefined||ds.obskip!==undefined){finishOb();return}
  // профил
  if(ds.auth){openAuth(ds.auth);return}
  if(ds.arole){authRole=ds.arole;document.querySelectorAll("[data-arole]").forEach(b=>b.classList.toggle("on",b===t));const l=$("#aNameL");if(l)l.textContent=authRole==="org"?"Име на организацията":"Име или прякор";const h=$("#aNameH");if(h)h.textContent=authRole==="org"?"Показва се на обявите ти.":"Вижда го само организаторът, при който запазиш място. Не е нужно истинското ти име.";return}
  if(ds.forgot!==undefined){openForgot();return}
  if(ds.logout!==undefined){const n=S.userName;act(async()=>{await sb.auth.signOut();S.pending=null;S.screens=[];closeSheet();S.tab="home"},{reload:["me","events","orgs"],ok:`Довиждане, ${n}! Излезе от профила.`}).then(()=>scrollTo(0,0));return}
  if(ds.settings!==undefined){openSettings();return}
  if(ds.togglenotif!==undefined){const v=!U().notif;act(()=>saveProfile({notify:v}),{ok:v?"Известията са включени":"Известията са изключени"});return}
  if(ds.gosaved!==undefined){S.savedTab="events";goTab("saved");return}
  if(ds.savedtab){S.savedTab=ds.savedtab;renderTab();return}
  // действия със събития
  if(ds.fav){if(need("open",ds.fav,"Влез, за да запазваш любими събития."))return;
    const on=isFav(ds.fav),eid=ds.fav;LIVE.favs=on?LIVE.favs.filter(x=>x!==eid):LIVE.favs.concat(eid);
    (on?sb.from("favorites").delete().eq("user_id",LIVE.me.id).eq("event_id",eid):sb.from("favorites").insert({user_id:LIVE.me.id,event_id:eid})).then(({error})=>{if(error){toast(bgErr(error));LOAD.me().then(renderAll)}});
    document.querySelectorAll(`[data-fav="${ds.fav}"]`).forEach(b=>{b.classList.toggle("on",!on);b.innerHTML=!on?uiFill("heart"):ui("heart");b.setAttribute("aria-pressed",!on)});
    if(!on){const[x,y]=evXY(ev);sparkle(x,y)}toast(on?"Премахнато от запазени":"Запазено в любими");
    if(S.tab==="saved")renderTab();else{const n=S.bookings.length+S.favs.filter(f=>!S.bookings.includes(f)).length,bd=$("#savedBadge");bd.hidden=!n;bd.textContent=n}return}
  if(ds.follow){if(need("open",null,"Влез, за да следиш организатори."))return;const oid=ds.follow,on=S.follows.includes(oid),nm=(ORGS[oid]||{}).name||"организатора";if(!on){const[x,y]=evXY(ev);sparkle(x,y)}
    act(()=>q(on?sb.from("follows").delete().eq("user_id",LIVE.me.id).eq("organizer_id",oid):sb.from("follows").insert({user_id:LIVE.me.id,organizer_id:oid})),{reload:["me"],ok:on?"Вече не следваш "+nm:"Следваш "+nm});return}
  if(ds.book){if(need("book",ds.book,"Влез, за да запазиш място. Ще те върнем към събитието."))return;const eid=ds.book,[x,y]=evXY(ev),old=LIVE.bookings.find(b=>b.event_id===eid&&curBk(b));
    act(()=>q(old?sb.from("bookings").update({status:"booked"}).eq("id",old.id):sb.from("bookings").insert({event_id:eid,user_id:LIVE.me.id})),{reload:["me","events"]}).then(r=>{if(r){confetti(x,y);toast(`Мястото е запазено. Кодът ти е ${bookCode(eid)}. Очакваме те!`)}});return}
  if(ds.unbook){const b=bookingOf(ds.unbook);if(!b)return;act(()=>q(sb.from("bookings").update({status:"cancelled"}).eq("id",b.id)),{reload:["me","events"],ok:"Резервацията е отказана"});return}
  if(ds.rate){rateVal=+ds.rate;document.querySelectorAll("#ratePick button").forEach(b=>b.classList.toggle("on",+b.dataset.rate<=rateVal));return}
  if(ds.review){if(need("review",ds.review,"Влез, за да оставиш оценка."))return;if(!rateVal){toast("Избери от 1 до 5 звезди");return}
    const eid=ds.review,stars=rateVal,txt=$("#rText").value.trim()||null,[x,y]=evXY(ev);
    act(async()=>{await q(sb.from("reviews").upsert({event_id:eid,user_id:LIVE.me.id,rating:stars,comment:txt}));await LOAD.reviews(eid)},{reload:["me","events"],ok:"Оценката е публикувана"}).then(r=>{if(r&&stars>=4)sparkle(x,y)});return}
  if(ds.share){const e=findEv(ds.share),d=new Date(e.start),txt=`${e.title} · ${whenShort(d)} · ${e.venue}, ${cityName(e.city)} · ${price(e.price)}`;
    try{navigator.clipboard.writeText(txt).then(()=>toast("Копирано. Постави го в съобщение."),()=>toast(txt))}catch(_){toast(txt)}return}
  // организатор
  if(ds.newev!==undefined){if(need("newEv",null,"Влез като организатор, за да публикуваш."))return;if(S.role!=="org"&&!isAdmin()){toast("Публикуването е за профили на организатори.");return}openEventForm();return}
  if(ds.edit){openEventForm(ds.edit);return}
  if(ds.dup){openEventForm(null,ds.dup);return}
  if(ds.att){if(S.role!=="org"&&S.role!=="admin")return;const bid=ds.att,v=ds.v,eid=Object.keys(LIVE.attendees).find(k=>LIVE.attendees[k].some(a=>a.id===bid));
    act(async()=>{await q(sb.from("bookings").update({status:v}).eq("id",bid));if(eid)await LOAD.attendees(eid);if(S.role==="org")await LOAD.myFees()},{ok:v==="attended"?(curFee()?`Отбелязано: дойде (+${curFee()} € такса)`:"Отбелязано: дойде"):"Отбелязано: не дойде"});return}
  if(ds.cancelask){const b=$("#ca-"+ds.cancelask);if(b)b.hidden=false;return}
  if(ds.cancelno){const b=$("#ca-"+ds.cancelno);if(b)b.hidden=true;return}
  if(ds.cancel||ds.restore){const id=ds.cancel||ds.restore,e=findEv(id);if(!e||(!ownsEvent(e)&&!isAdmin()))return;const n=bookedCount(e);
    act(()=>q(sb.from("events").update({cancelled:!!ds.cancel}).eq("id",id)),{reload:["events"],ok:(ds.cancel?"Събитието е отменено":"Събитието е възстановено")+(n?`. Записаните (${n}) получиха известие.`:"")}).then(()=>closeSheet());return}
});
document.addEventListener("submit",ev=>{if(ev.target.id==="searchForm"){ev.preventDefault();const q=$("#q").value.trim();S.F=Object.assign(defaultF(),{q});goTab("events")}});
document.addEventListener("keydown",ev=>{
  if(ev.key==="Escape"){if(sheetOpen()){if($("#sbg").dataset.locked)return;closeSheet();renderAll()}else if(S.screens.length&&S.screens[S.screens.length-1].name!=="welcome")pop()}
  if((ev.key==="Enter"||ev.key===" ")&&ev.target.dataset&&ev.target.dataset.pin){ev.preventDefault();selectPin(ev.target.dataset.pin)}
});
let rT=0;
document.addEventListener("input",ev=>{
  const id=ev.target.id;
  if(id==="radius2"||id==="fRadius"){S.radius=+ev.target.value;persist();const o=$(id==="radius2"?"#radiusOut2":"#fRadiusOut");if(o)o.textContent=S.radius+" км";
    if(LP&&LP._rc)LP._rc.setRadius(S.radius*1000);
    const g=geom(city());document.querySelectorAll(".m-rad").forEach(c=>c.setAttribute("r",(S.radius*g.pxKm).toFixed(1)));
    if(id==="fRadius"){const n=filterEvents(S.FD).length;$("#fApply").textContent=`Покажи ${n} ${n===1?"събитие":"събития"}`}
    clearTimeout(rT);rT=setTimeout(()=>{if(!sheetOpen()&&!S.screens.length)renderAll()},400)}
  if(id==="uname"){const v=ev.target.value.trim();if(!v)return;clearTimeout(rT);rT=setTimeout(()=>{const f=S.role==="org"?{full_name:v,org_name:v}:{full_name:v};act(()=>saveProfile(f),{reload:S.role==="org"?["orgs"]:[],ok:"Името е запазено"})},700)}
});
function locate(quiet){
  const fail=m=>{if(quiet)return;$("#toastRoot").innerHTML="";openLocation(m)};
  if(!navigator.geolocation){fail("Това устройство не дава локация. Докосни картата, за да посочиш къде си.");return}
  if(!quiet)toast("Търсим местоположението ти…");
  try{navigator.geolocation.getCurrentPosition(p=>{
      const lat=p.coords.latitude,lng=p.coords.longitude;let best=CITIES[0],bd=1e9;
      CITIES.forEach(c=>c.areas.forEach(a=>{const d=dist(lat,lng,a[1],a[2]);if(d<bd){bd=d;best=c}}));
      if(bd>40){fail("Намерихме те, но не си близо до град от списъка. Избери град ръчно.");return}
      S.city=best.id;S.pos={lat,lng,city:best.id};S.posSrc="gps";persist();if(loggedIn()&&LIVE.me.home_city!==best.id)saveProfile({home_city:best.id}).catch(()=>{});if(!quiet){closeSheet();toast("Намерихме те в "+best.name)}renderAll();if(LM&&S.tab==="map")LM.setView([lat,lng],Math.max(LM.getZoom(),15));
    },e=>fail(e&&e.code===1?"Не разреши достъп до местоположението. Можеш да го разрешиш от настройките на браузъра или да докоснеш картата, за да посочиш къде си.":"Не успяхме да намерим местоположението ти. Докосни картата, за да посочиш къде си."),{timeout:15000,maximumAge:30000,enableHighAccuracy:true});
  }catch(_){fail("Локацията не е достъпна тук. Докосни картата, за да посочиш къде си.")}
}

/* ================= СЪБИТИЕ, ПАНЕЛ, ПАРОЛА ================= */
function openEvent(id){push("event",{id});LOAD.reviews(id).then(()=>{const t=S.screens[S.screens.length-1];if(t&&t.name==="event"&&t.id===id)renderScreen()}).catch(()=>{})}
function loadDash(){const evs=orgEvents().filter(e=>e.booking);busy(true);Promise.all(evs.map(e=>LOAD.attendees(e.id))).then(()=>LOAD.myFees()).then(()=>renderScreen()).catch(e=>toast(bgErr(e))).finally(()=>busy(false))}
function openForgot(){
  openSheet(`${sheetHead("Забравена парола","Ще ти изпратим линк за нова парола.")}
   <form class="form" id="forgotForm" novalidate><label>Имейл<input type="text" id="fgEmail" inputmode="email" autocomplete="email"></label><p class="err" id="fgErr" hidden></p><button type="submit" class="btn block">Изпрати линк</button></form>`);
}
function openNewPassword(){
  openSheet(`${sheetHead("Нова парола","Въведи новата си парола.")}
   <form class="form" id="newPwForm" novalidate><label>Нова парола<input type="password" id="npw" autocomplete="new-password"></label><label>Повтори паролата<input type="password" id="npw2" autocomplete="new-password"></label><p class="err" id="npErr" hidden></p><button type="submit" class="btn block">Запази паролата</button></form>`);
}
document.addEventListener("submit",ev=>{
  if(ev.target.id==="forgotForm"){ev.preventDefault();const em=$("#fgEmail").value.trim().toLowerCase(),er=$("#fgErr");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){er.textContent="Въведи валиден имейл.";er.hidden=false;return}
    act(()=>q(sb.auth.resetPasswordForEmail(em,{redirectTo:location.origin+location.pathname})),{ok:"Ако имаш профил с този имейл, изпратихме ти линк за нова парола."}).then(r=>{if(r)closeSheet()})}
  if(ev.target.id==="newPwForm"){ev.preventDefault();const a=$("#npw").value,b=$("#npw2").value,er=$("#npErr");
    if(a.length<8){er.textContent="Паролата трябва да е поне 8 знака.";er.hidden=false;return}if(a!==b){er.textContent="Паролите не съвпадат.";er.hidden=false;return}
    act(()=>q(sb.auth.updateUser({password:a})),{reload:["me"],ok:"Паролата е сменена."}).then(r=>{if(r)closeSheet()})}
});
sb.auth.onAuthStateChange((event)=>{if(event==="PASSWORD_RECOVERY")setTimeout(openNewPassword,300)});

/* ================= СТАРТ ================= */
document.body.classList.add("loading");
renderTab();
if(!CFG.supabaseUrl||/ТВОЯТ|YOUR/i.test(CFG.supabaseUrl)){openSheet(`${sheetHead("Липсва връзка с базата")}<p>Попълни адреса и ключа на Supabase във файла <b>config.js</b>.</p>`)}
else LOAD.all().then(()=>{
  LIVE.ready=true;document.body.classList.remove("loading");
  const st=LIVE.me&&LIVE.me.status;
  if(st==="rejected"||st==="blocked"){sb.auth.signOut().then(()=>LOAD.me()).then(renderAll);toast(st==="rejected"?"Регистрацията ти е отказана.":"Профилът е блокиран.")}
  renderAll();
  if(!S.seenWelcome&&!loggedIn())push("welcome");else signInPolicyCheck();
}).catch(e=>{console.error(e);document.body.classList.remove("loading");toast(bgErr(e))});
// обновяване на известията и данните на всеки 60 секунди, докато приложението е отворено
setInterval(()=>{if(document.hidden||!LIVE.ready)return;Promise.all([LOAD.events(),loggedIn()?LOAD.me():null]).then(()=>{if(!sheetOpen()&&!S.screens.some(s=>["filters","date"].includes(s.name)))renderTab()}).catch(()=>{})},60000);

})();
