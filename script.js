/* ============================================================
   0. КОНСТАНТЫ И УТИЛИТЫ
   ============================================================ */
const SAVE_VERSION = 4;
const $ = id => document.getElementById(id);
const getItem = id => items.find(i => i.id === id);

const SLOT_LABELS = {
    weapon:'ОРУЖИЕ', helmet:'ШЛЕМ', chest:'БРОНЯ',
    legs:'ПОНОЖИ', boots:'БОТИНКИ', shield:'ЩИТ'
};

/* ============================================================
   1. ДАННЫЕ (Сеттинг: Мембрана 2087)
   ============================================================ */
const hero = {
    level: 1, xp: 0, xpToNext: 5000, unspentPoints: 0, skillPoints: 0,
    str: 0, agi: 0, sta: 0,
    hp: 200, maxHp: 200, damage: 100,
    critChance: 0, critDamage: 100, evade: 0,
    silver: 0, gold: 0, diamonds: 0, keys: 0,
    inventory: [], equipment: [], consumables: { potion: 3 },
    skills: [],
    pet: null,
    achievements: [],
    dailyClaimedDate: null,
    lastPlayed: Date.now(),
    towerFloor: 1, towerRecord: 0
};

const bosses = [
    { id:'boss-1', name:'Споровик-разведчик', levelRequired:1, hp:500, damage:5, archetype:'mage',
      reward:{xp:50,silver:50,gold:5}, image:'images/boss_spore.png',
      description:'Ядовитый гриб из Нижнего Яруса.', intro:'Споровик выпускает облако спор.' },
    { id:'boss-2', name:'Грибной матёрый', levelRequired:5, hp:1200, damage:8, archetype:'tank',
      reward:{xp:150,silver:150,gold:15}, image:'images/boss_fungus.png',
      description:'Притворяется мёртвым, пока не подойдёшь.', intro:'Куча гниющих листьев начинает шевелиться.' },
    { id:'boss-3', name:'Жук-броненосец', levelRequired:10, hp:2000, damage:12, archetype:'tank',
      reward:{xp:300,silver:300,gold:30}, image:'images/boss_beetle.png',
      description:'Панцирь отражает 80% урона.', intro:'Лязг хитина эхом разносится по туннелю.' },
    { id:'boss-4', name:'Слизень-металлоед', levelRequired:15, hp:3000, damage:15, archetype:'berserk',
      reward:{xp:500,silver:500,gold:50}, image:'images/boss_slime.png',
      description:'Пожирает металл и снаряжение.', intro:'Слизень переваривает чей-то экзоскелет.' },
    { id:'boss-5', name:'Мать-паучиха', levelRequired:20, hp:4000, damage:18, archetype:'berserk',
      reward:{xp:800,silver:800,gold:80}, image:'images/boss_spider.png',
      description:'Спавнит паучат, неуязвима, пока они живы.', intro:'Из темноты доносится шорох тысяч лап.' },
    { id:'boss-6', name:'Небоскрёб-улей', levelRequired:25, hp:6000, damage:22, archetype:'mage',
      reward:{xp:1200,silver:1200,gold:120}, image:'images/boss_hive.png',
      description:'Здание, проросшее грибницей.', intro:'Огромная тень накрывает сектор.' },
    { id:'boss-7', name:'Заражённый Титан', levelRequired:30, hp:10000, damage:30, archetype:'tank',
      reward:{xp:3000,silver:3000,gold:300}, image:'images/boss_infected.png',
      description:'Полубосс-катастрофа. Смывает всё на пути.', intro:'Земля дрожит. Приближается гигант.' },
    { id:'boss-8', name:'Титан-слизень', levelRequired:35, hp:15000, damage:45, archetype:'berserk',
      reward:{xp:5000,silver:5000,gold:500}, image:'images/boss_titan.png',
      description:'Слизистая гора, поглощающая свет.', intro:'Прилив слизи накрывает арену.' },
];

const items = [
    // ================= ОРУЖИЕ (weapon) =================
    { id:'w1', name:'Ржавый тесак', type:'weapon', damageBonus:15, price:{silver:800,gold:0}, rarity:'common', image:'images/w_rusty.png' },
    { id:'w2', name:'Шокер-резак', type:'weapon', damageBonus:30, price:{silver:1500,gold:300}, rarity:'common', image:'images/w_shocker.png' },
    { id:'w3', name:'Игломёт', type:'weapon', damageBonus:40, critChanceBonus:3, price:{silver:2500,gold:500}, rarity:'rare', image:'images/w_needler.png' },
    { id:'w4', name:'Плазменный тесак', type:'weapon', damageBonus:60, price:{silver:5000,gold:1000}, rarity:'rare', image:'images/w_plasma.png' },
    { id:'w5', name:'Симбиотический хлыст', type:'weapon', damageBonus:75, critChanceBonus:5, price:{silver:7500,gold:1500}, rarity:'epic', image:'images/w_whip.png' },
    { id:'w6', name:'Кислотный распылитель', type:'weapon', damageBonus:85, price:{silver:10000,gold:2000}, rarity:'epic', image:'images/w_acid.png' },
    { id:'w7', name:'Рельсотрон', type:'weapon', damageBonus:120, critChanceBonus:10, price:{silver:25000,gold:5000}, rarity:'legendary', image:'images/w_rail.png' },

    // ================= ШЛЕМЫ (helmet) =================
    { id:'h1', name:'Тканевая маска', type:'helmet', hpBonus:15, price:{silver:500,gold:0}, rarity:'common', image:'images/h_cloth.png' },
    { id:'h2', name:'Фильтр-маска', type:'helmet', hpBonus:30, price:{silver:1500,gold:300}, rarity:'common', image:'images/h_filter.png' },
    { id:'h3', name:'Шлем "Хитин"', type:'helmet', hpBonus:50, evadeBonus:2, price:{silver:3500,gold:700}, rarity:'rare', image:'images/h_chitin.png' },
    { id:'h4', name:'Тактический визор', type:'helmet', hpBonus:70, critChanceBonus:3, price:{silver:6000,gold:1200}, rarity:'rare', image:'images/h_visor.png' },
    { id:'h5', name:'Шлем "Грибница"', type:'helmet', hpBonus:120, evadeBonus:5, price:{silver:15000,gold:3000}, rarity:'epic', image:'images/h_fungus.png' },

    // ================= БРОНЯ (chest) =================
    { id:'c1', name:'Кевларовый жилет', type:'chest', hpBonus:40, price:{silver:2000,gold:400}, rarity:'common', image:'images/c_kevlar.png' },
    { id:'c2', name:'Кольчуга из чешуи', type:'chest', hpBonus:70, evadeBonus:2, price:{silver:4000,gold:800}, rarity:'rare', image:'images/c_scales.png' },
    { id:'c3', name:'Симбиотическая броня', type:'chest', hpBonus:100, price:{silver:6000,gold:1200}, rarity:'rare', image:'images/c_symbiont.png' },
    { id:'c4', name:'Броня "Мембрана"', type:'chest', hpBonus:150, price:{silver:12000,gold:2400}, rarity:'epic', image:'images/c_membrane.png' },
    { id:'c5', name:'Экзоскелет "Титан"', type:'chest', hpBonus:250, price:{silver:30000,gold:6000}, rarity:'legendary', image:'images/c_titan.png' },

    // ================= ПОНОЖИ (legs) =================
    { id:'l1', name:'Штаны выжившего', type:'legs', hpBonus:20, price:{silver:1000,gold:200}, rarity:'common', image:'images/l_survivor.png' },
    { id:'l2', name:'Поножи "Броненосец"', type:'legs', hpBonus:45, price:{silver:3000,gold:600}, rarity:'rare', image:'images/l_beetle.png' },
    { id:'l3', name:'Механические протезы', type:'legs', hpBonus:80, evadeBonus:2, price:{silver:8000,gold:1600}, rarity:'epic', image:'images/l_mech.png' },

    // ================= БОТИНКИ (boots) =================
    { id:'b1', name:'Тканевые обмотки', type:'boots', evadeBonus:1, price:{silver:500,gold:0}, rarity:'common', image:'images/b_wraps.png' },
    { id:'b2', name:'Ботинки-присоски', type:'boots', evadeBonus:3, price:{silver:2000,gold:400}, rarity:'common', image:'images/b_suction.png' },
    { id:'b3', name:'Прыжковые ботинки', type:'boots', evadeBonus:6, price:{silver:6000,gold:1200}, rarity:'rare', image:'images/b_jump.png' },

    // ================= ЩИТЫ (shield) =================
    { id:'s1', name:'Барьер-пластина', type:'shield', hpBonus:30, evadeBonus:1, price:{silver:1500,gold:300}, rarity:'common', image:'images/s_barrier.png' },
    { id:'s2', name:'Панцирь черепахи', type:'shield', hpBonus:60, evadeBonus:1, price:{silver:3500,gold:700}, rarity:'rare', image:'images/s_shell.png' },
    { id:'s3', name:'Энергощит', type:'shield', hpBonus:100, evadeBonus:5, price:{silver:10000,gold:2000}, rarity:'epic', image:'images/s_energy.png' },
];

// ВНИМАНИЕ: Здесь был дубликат, я его удалил. Теперь массив один.
const consumables = [
    { id:'potion-small', name:'Антидот', key:'potion_small', heal:0.3, price:{silver:300}, image:'images/potion_green.png' },
    { id:'potion-big', name:'Стимулятор', key:'potion_big', heal:0.7, price:{silver:1000}, image:'images/potion_red.png' },
    { id:'potion-stim', name:'Стим-пак', key:'potion_stim', heal:1.0, price:{silver:2500}, image:'images/potion_blue.png' }
];

const skills = [
    { id:'rage', name:'Ярость', desc:'+15% урона при HP < 30%', cost:3 },
    { id:'vampire', name:'Симбиоз', desc:'5% урона возвращается в HP', cost:4 },
    { id:'thick_skin', name:'Хитиновая кожа', desc:'+20% максимального HP', cost:3 },
    { id:'double_hit', name:'Двойной разряд', desc:'15% шанс ударить дважды', cost:5 },
    { id:'parry', name:'Энергоблок', desc:'10% шанс отразить удар', cost:4 }
];

const achievements = [
    { id:'first_blood', name:'Первая зачистка', desc:'Убей первого босса', reward:{silver:200}, check:() => defeatedBosses.length >= 1 },
    { id:'collector', name:'Экипирован', desc:'Надень 3 предмета', reward:{diamonds:1}, check:() => hero.equipment.length >= 3 },
    { id:'titan_slayer', name:'Убийца титанов', desc:'Убей Титана-слизня', reward:{diamonds:5}, check:() => defeatedBosses.includes('boss-8') },
    { id:'rich', name:'Кредитный рейтинг', desc:'Накопи 10 000 серебра', reward:{diamonds:2}, check:() => hero.silver >= 10000 }
];

/* ============================================================
   2. СОСТОЯНИЕ
   ============================================================ */
let defeatedBosses = [];
let currentBoss = null;
let bossHp = 0, bossMaxHp = 0;
let currentShopTab = 'weapon';
let currentInvTab = 'equipment';
let defending = false;
let battleActive = false;
let autoBattle = false;
let autoTimer = null;
let battleSpeed = 1;
let potionCountInBattle = 3;
let towerMode = false;

/* ============================================================
   3. ЗВУК (Web Audio)
   ============================================================ */
let audioCtx = null;
function playSound(type) {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        const now = audioCtx.currentTime;
        if (type === 'hit') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now); osc.stop(now + 0.1);
        } else if (type === 'crit') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
        } else if (type === 'heal') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
        } else if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now); osc.stop(now + 0.05);
        }
    } catch (e) {}
}

/* ============================================================
   4. УТИЛИТЫ
   ============================================================ */
function itemBonusText(item) {
    const p = [];
    if (item.damageBonus) p.push(`+${item.damageBonus} УРН`);
    if (item.hpBonus) p.push(`+${item.hpBonus} HP`);
    if (item.evadeBonus) p.push(`+${item.evadeBonus}% УКЛ`);
    if (item.critChanceBonus) p.push(`+${item.critChanceBonus}% КРИТ`);
    return p.length ? p.join(', ') : '—';
}

function rarityColor(r) {
    return { common:'#9a9a9a', rare:'#3b82f6', epic:'#a855f7', legendary:'#f59e0b' }[r] || '#9a9a9a';
}

function todayStr() { return new Date().toISOString().slice(0,10); }
function openModal(id) { $(id).classList.remove('hidden'); }
function closeModal(id) { $(id).classList.add('hidden'); }

/* ============================================================
   5. ЭКРАНЫ И СТАТЫ
   ============================================================ */
function goToScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
    playSound('click');
    if (id === 'map-screen') renderBosses();
    if (id === 'shop-screen') renderShop();
    if (id === 'inventory-screen') renderInventory();
    if (id === 'skills-screen') renderSkills();
    if (id === 'achievements-screen') renderAchievements();
}

function calcStats() {
    let hpMul = 1;
    if (hero.skills.includes('thick_skin')) hpMul *= 1.2;

    const base = {
        hp: (200 + hero.sta * 20) * hpMul,
        maxHp: (200 + hero.sta * 20) * hpMul,
        damage: 100 + hero.str * 10,
        critChance: Math.min(hero.agi * 0.5, 100),
        critDamage: 100 + hero.agi,
        evade: Math.min(hero.agi * 0.2, 100)
    };
    const bonus = { hp:0, damage:0, evade:0, critChance:0 };
    hero.equipment.forEach(id => {
        const it = getItem(id); if (!it) return;
        if (it.damageBonus) bonus.damage += it.damageBonus;
        if (it.hpBonus) bonus.hp += it.hpBonus;
        if (it.evadeBonus) bonus.evade += it.evadeBonus;
        if (it.critChanceBonus) bonus.critChance += it.critChanceBonus;
    });
    return {
        hp: base.hp + bonus.hp,
        maxHp: base.maxHp + bonus.hp,
        damage: base.damage + bonus.damage,
        critChance: Math.min(base.critChance + bonus.critChance, 100),
        critDamage: base.critDamage,
        evade: Math.min(base.evade + bonus.evade, 100)
    };
}

function updateStats() {
    const s = calcStats();
    const oldMax = hero.maxHp;
    hero.maxHp = s.maxHp;
    hero.damage = s.damage;
    hero.critChance = s.critChance;
    hero.critDamage = s.critDamage;
    hero.evade = s.evade;
    if (hero.hp > hero.maxHp || !hero.hp) hero.hp = hero.maxHp;
    else if (oldMax !== hero.maxHp) hero.hp = Math.min(hero.hp, hero.maxHp);

    // Обновление HUD
    $('hero-level').textContent = hero.level;
    $('left-hero-level').textContent = hero.level;
    $('hero-xp').textContent = hero.xp;
    $('hero-xp-to-next').textContent = hero.xpToNext;
    $('hero-xp-bar').style.width = (hero.xp / hero.xpToNext * 100) + '%';
    $('hero-hp').textContent = hero.maxHp.toFixed(0);
    $('hero-damage').textContent = hero.damage.toFixed(0);
    
    $('hero-silver').textContent = hero.silver;
    $('hero-gold').textContent = hero.gold;
    $('hero-diamonds').textContent = hero.diamonds;
    $('hero-keys').textContent = hero.keys;
    
    $('hero-unspent-points').textContent = hero.unspentPoints;
    $('str').textContent = hero.str;
    $('agi').textContent = hero.agi;
    $('sta').textContent = hero.sta;
    $('skill-points').textContent = hero.skillPoints;

    renderEquipment();
    checkAchievements();
    saveGame();
}

function addStat(stat) {
    if (hero.unspentPoints <= 0) return;
    hero[stat]++;
    hero.unspentPoints--;
    updateStats();
}

function rerollStats() {
    if (hero.diamonds < 3) { alert('Нужно 3 алмаза'); return; }
    hero.diamonds -= 3;
    const total = hero.str + hero.agi + hero.sta;
    hero.unspentPoints += total;
    hero.str = hero.agi = hero.sta = 0;
    updateStats();
}

/* ============================================================
   6. ЭКИПИРОВКА
   ============================================================ */
function equippedIdInSlot(type) {
    return hero.equipment.find(id => {
        const it = getItem(id);
        return it && it.type === type;
    });
}

function renderEquipment() {
    document.querySelectorAll('.equip-slot').forEach(slot => {
        const type = slot.dataset.slot;
        const id = equippedIdInSlot(type);
        if (id) {
            const it = getItem(id);
            slot.classList.remove('empty');
            slot.style.borderColor = rarityColor(it.rarity);
            slot.style.backgroundImage = `url('${it.image}')`;
            slot.innerHTML = `<div class="slot-bonus">${itemBonusText(it)}</div>`;
            slot.title = it.name;
        } else {
            slot.classList.add('empty');
            slot.style.borderColor = '#444';
            slot.style.backgroundImage = 'none';
            slot.innerHTML = '';
            slot.title = SLOT_LABELS[type];
        }
    });
}

function openEquipModal(type) {
    openModal('equip-modal');
    $('modal-slot-name').textContent = SLOT_LABELS[type] || type.toUpperCase();
    renderModalItems(type);
}
function closeEquipModal() { closeModal('equip-modal'); }

function renderModalItems(type) {
    const box = $('modal-items');
    box.innerHTML = '';
    const equippedId = equippedIdInSlot(type);
    if (equippedId) {
        const it = getItem(equippedId);
        const d = document.createElement('div');
        d.className = 'modal-item';
        d.style.borderColor = rarityColor(it.rarity);
        d.innerHTML = `
            <img src="${it.image}" class="item-img" onerror="this.style.display='none'">
            <h3>${it.name}</h3>
            <p>${itemBonusText(it)}</p>
            <button onclick="unequipItem('${type}')">СНЯТЬ</button>`;
        box.appendChild(d);
    }
    const available = hero.inventory.filter(id => {
        const it = getItem(id);
        return it && it.type === type;
    });
    if (!equippedId && available.length === 0) {
        const d = document.createElement('div');
        d.textContent = 'Нет предметов';
        d.style.color = '#bbb';
        box.appendChild(d);
        return;
    }
    available.forEach(id => {
        const it = getItem(id);
        const d = document.createElement('div');
        d.className = 'modal-item';
        d.style.borderColor = rarityColor(it.rarity);
        d.innerHTML = `
            <img src="${it.image}" class="item-img" onerror="this.style.display='none'">
            <h3>${it.name}</h3>
            <p>${itemBonusText(it)}</p>
            <button onclick="equipItem('${id}')">НАДЕТЬ</button>`;
        box.appendChild(d);
    });
}

function equipItem(itemId) {
    const item = getItem(itemId);
    if (!item) return;
    const old = equippedIdInSlot(item.type);
    if (old) {
        hero.equipment = hero.equipment.filter(id => id !== old);
        hero.inventory.push(old);
    }
    hero.inventory = hero.inventory.filter(id => id !== itemId);
    hero.equipment.push(itemId);
    updateStats();
    closeEquipModal();
    renderInventory();
}

function unequipItem(type) {
    const id = equippedIdInSlot(type);
    if (!id) return;
    hero.equipment = hero.equipment.filter(x => x !== id);
    hero.inventory.push(id);
    updateStats();
    closeEquipModal();
    renderInventory();
}

/* ============================================================
   7. МАГАЗИН
   ============================================================ */
function todaysDeal() { return items[new Date().getDate() % items.length]; }

function renderShop() {
    document.querySelectorAll('.shop-tab').forEach(t =>
        t.classList.toggle('active', t.dataset.type === currentShopTab)
    );
    const dd = $('daily-deal');
    const deal = todaysDeal();
    dd.innerHTML = `
        <div class="deal-card">
            <b>ТОВАР ДНЯ:</b> ${deal.name} <span style="color:var(--gold)">−30%</span>
            <button onclick="buyItem('${deal.id}', true)">КУПИТЬ</button>
        </div>`;

    const grid = $('shop-grid');
    grid.innerHTML = '';

    if (currentShopTab === 'potion') {
        consumables.forEach(c => {
            const owned = hero.consumables[c.key] || 0;
            const d = document.createElement('div');
            d.className = 'shop-item';
            d.innerHTML = `
                <img src="${c.image}" class="item-img" onerror="this.style.display='none'">
                <h3>${c.name}</h3>
                <p>${c.heal ? 'Восст. ' + (c.heal*100) + '% HP' : ''}</p>
                <div class="price"><img src="images/coin_silver.png" class="price-icon" onerror="this.style.display='none'">${c.price.silver}</div>
                <p class="owned-label">В наличии: ${owned}</p>
                <button onclick="buyConsumable('${c.key}', ${c.price.silver})">КУПИТЬ</button>`;
            grid.appendChild(d);
        });
        return;
    }

    items.filter(i => i.type === currentShopTab).forEach(item => {
        const owned = hero.inventory.includes(item.id) || hero.equipment.includes(item.id);
        const equipped = hero.equipment.includes(item.id);
        const d = document.createElement('div');
        d.className = 'shop-item' + (owned ? ' bought' : '');
        d.style.borderColor = rarityColor(item.rarity);
        d.innerHTML = `
            <img src="${item.image}" class="item-img" onerror="this.style.display='none'">
            <h3>${item.name}</h3>
            <p>${itemBonusText(item)}</p>
            <div class="price">
                <img src="images/coin_silver.png" class="price-icon" onerror="this.style.display='none'">${item.price.silver}
                <img src="images/coin_gold.png" class="price-icon" onerror="this.style.display='none'">${item.price.gold}
            </div>
            ${owned
                ? `<div class="owned-label">${equipped ? 'НАДЕТО' : 'В СУМКЕ'}</div>`
                : `<button onclick="buyItem('${item.id}')">КУПИТЬ</button>`}`;
        grid.appendChild(d);
    });
}

function buyItem(itemId, discounted = false) {
    const item = getItem(itemId);
    if (!item) return;
    if (hero.inventory.includes(itemId) || hero.equipment.includes(itemId)) return;
    let silverCost = item.price.silver * (discounted ? 0.7 : 1);
    if (hero.silver >= silverCost) hero.silver -= silverCost;
    else if (hero.gold >= item.price.gold) hero.gold -= item.price.gold;
    else { alert('Недостаточно средств'); return; }
    hero.inventory.push(itemId);
    playSound('click');
    updateStats();
    renderShop();
}

function buyConsumable(key, price) {
    if (hero.silver < price) { alert('Недостаточно серебра'); return; }
    hero.silver -= price;
    hero.consumables[key] = (hero.consumables[key] || 0) + 1;
    updateStats();
    renderShop();
}

/* ============================================================
   8. ИНВЕНТАРЬ
   ============================================================ */
function renderInventory() {
    document.querySelectorAll('.inv-tab').forEach(t =>
        t.classList.toggle('active', t.dataset.tab === currentInvTab)
    );
    const grid = $('inventory-grid');
    const empty = $('inventory-empty');
    grid.innerHTML = '';

    if (currentInvTab === 'equipment') {
        if (hero.inventory.length === 0) { empty.classList.remove('hidden'); return; }
        empty.classList.add('hidden');
        hero.inventory.forEach(id => {
            const it = getItem(id); if (!it) return;
            const d = document.createElement('div');
            d.className = 'inventory-item';
            d.style.borderColor = rarityColor(it.rarity);
            d.innerHTML = `
                <img src="${it.image}" class="item-img" onerror="this.style.display='none'">
                <h3>${it.name}</h3>
                <p class="item-type">${SLOT_LABELS[it.type]}</p>
                <p>${itemBonusText(it)}</p>
                <button onclick="equipItem('${it.id}')">НАДЕТЬ</button>
                <button class="sell-btn" onclick="sellItem('${it.id}')">ПРОДАТЬ</button>`;
            grid.appendChild(d);
        });
    } else if (currentInvTab === 'consumable') {
        empty.classList.add('hidden');
        Object.entries(hero.consumables).forEach(([key, count]) => {
            if (!count) return;
            const c = consumables.find(x => x.key === key);
            if (!c) return;
            const d = document.createElement('div');
            d.className = 'inventory-item';
            d.innerHTML = `
                <img src="${c.image}" class="item-img" onerror="this.style.display='none'">
                <h3>${c.name}</h3>
                <p>В наличии: <b>${count}</b></p>`;
            grid.appendChild(d);
        });
    } else if (currentInvTab === 'keys') {
        empty.classList.add('hidden');
        const d = document.createElement('div');
        d.className = 'inventory-item';
        d.innerHTML = `
            <img src="images/key.png" class="item-img" onerror="this.style.display='none'">
            <h3>Ключи: ${hero.keys}</h3>
            <p>3 ключа = 1 предмет</p>
            <button onclick="openChest()" ${hero.keys < 3 ? 'disabled' : ''}>ОТКРЫТЬ</button>`;
        grid.appendChild(d);
    }
}

function sellItem(id) {
    const it = getItem(id);
    if (!it) return;
    const price = Math.floor(it.price.silver * 0.5);
    hero.silver += price;
    hero.inventory = hero.inventory.filter(x => x !== id);
    updateStats();
    renderInventory();
}

function openChest() {
    if (hero.keys < 3) return;
    hero.keys -= 3;
    const pool = items.filter(i => !hero.inventory.includes(i.id) && !hero.equipment.includes(i.id));
    if (pool.length === 0) { alert('Все предметы собраны!'); hero.keys += 3; return; }
    const reward = pool[Math.floor(Math.random() * pool.length)];
    hero.inventory.push(reward.id);
    alert(`Из сундука выпал: ${reward.name}!`);
    updateStats();
    renderInventory();
}

/* ============================================================
   9. НАВЫКИ / ДОСТИЖЕНИЯ
   ============================================================ */
function renderSkills() {
    const grid = $('skills-grid');
    grid.innerHTML = '';
    skills.forEach(sk => {
        const learned = hero.skills.includes(sk.id);
        const d = document.createElement('div');
        d.className = 'skill-card' + (learned ? ' learned' : '');
        d.innerHTML = `
            <h3>${sk.name}</h3>
            <p>${sk.desc}</p>
            <p class="skill-cost">${learned ? 'ИЗУЧЕНО' : 'Цена: ' + sk.cost}</p>
            ${learned ? '' : `<button onclick="learnSkill('${sk.id}')" ${hero.skillPoints < sk.cost ? 'disabled' : ''}>ИЗУЧИТЬ</button>`}`;
        grid.appendChild(d);
    });
}

function learnSkill(id) {
    const sk = skills.find(s => s.id === id);
    if (!sk || hero.skills.includes(id)) return;
    if (hero.skillPoints < sk.cost) return;
    hero.skillPoints -= sk.cost;
    hero.skills.push(id);
    updateStats();
    renderSkills();
}

function checkAchievements() {
    achievements.forEach(a => {
        if (hero.achievements.includes(a.id)) return;
        try {
            if (a.check()) {
                hero.achievements.push(a.id);
                if (a.reward.silver) hero.silver += a.reward.silver;
                if (a.reward.diamonds) hero.diamonds += a.reward.diamonds;
                setTimeout(() => alert(`Достижение: ${a.name}!`), 100);
            }
        } catch (e) {}
    });
}

function renderAchievements() {
    const grid = $('ach-grid');
    grid.innerHTML = '';
    achievements.forEach(a => {
        const unlocked = hero.achievements.includes(a.id);
        const d = document.createElement('div');
        d.className = 'ach-card' + (unlocked ? ' unlocked' : '');
        d.innerHTML = `
            <h3>${a.name}</h3>
            <p>${a.desc}</p>
            <p class="ach-reward">${a.reward.silver ? '+' + a.reward.silver + ' серебра' : ''}${a.reward.diamonds ? '+' + a.reward.diamonds + ' 💎' : ''}</p>
            <p>${unlocked ? 'ПОЛУЧЕНО' : 'НЕ ПОЛУЧЕНО'}</p>`;
        grid.appendChild(d);
    });
}

/* ============================================================
   10. КАРТА
   ============================================================ */
function renderBosses() {
    const list = $('boss-list');
    list.innerHTML = '';

    const daily = $('daily-boss-banner');
    const claimedToday = hero.dailyClaimedDate === todayStr();
    if (!claimedToday) {
        daily.innerHTML = `
            <div class="daily-banner">
                <b>АНОМАЛИЯ ДНЯ</b> — ×3 награда!
                <button onclick="startDailyBattle()">СРАЗИТЬСЯ</button>
            </div>`;
    } else {
        daily.innerHTML = '<div class="daily-banner claimed">Аномалия уже зачищена. Жди завтра.</div>';
    }

    bosses.forEach((boss, index) => {
        const locked = hero.level < boss.levelRequired;
        const defeated = defeatedBosses.includes(boss.id);
        const row = document.createElement('div');
        row.className = 'boss-node' + (locked ? ' locked' : '') + (defeated ? ' defeated' : '');
        
        // Позиционирование на карте (примерное, для визуала)
        row.style.left = (15 + (index % 3) * 30) + '%';
        row.style.top = (20 + Math.floor(index / 3) * 35) + '%';

        row.innerHTML = `
            <div class="node-marker">
                <img src="${boss.image}" class="boss-thumb" onerror="this.style.display='none'">
            </div>
            <div class="node-info">
                <h3>${boss.name}</h3>
                <p>УР. ${boss.levelRequired}</p>
            </div>
            ${locked ? '<span class="badge locked-badge">🔒</span>' : 
              defeated ? '<span class="badge defeated-badge">✔</span>' : 
              `<button class="btn-fight" onclick="startBattle(${index})">БОЙ</button>`}
        `;
        list.appendChild(row);
    });
}

/* ============================================================
   11. БАШНЯ
   ============================================================ */
function currentTowerBoss() {
    const floor = hero.towerFloor;
    return {
        id: 'tower-' + floor, name: 'Страж ' + floor,
        hp: 500 + floor * 400, damage: 3 + floor * 2, archetype: ['tank','berserk','mage'][floor % 3],
        reward: { xp: 100 * floor, silver: 100 * floor, gold: floor * 5 },
        image: 'images/boss_hive.png', description: 'Бесконечная башня.', intro: 'Страж этажа преграждает путь.'
    };
}

function renderTower() {
    $('tower-floor').textContent = hero.towerFloor;
    $('tower-boss-name').textContent = currentTowerBoss().name;
    $('tower-record').textContent = hero.towerRecord;
}

function startTowerBattle() {
    towerMode = true;
    beginBattle(currentTowerBoss());
}

/* ============================================================
   12. БОЙ
   ============================================================ */
function beginBattle(boss) {
    currentBoss = boss;
    bossMaxHp = boss.hp;
    bossHp = boss.hp;
    hero.hp = hero.maxHp;
    defending = false;
    battleActive = true;
    potionCountInBattle = 3;

    $('hero-battle-hp').textContent = hero.hp.toFixed(0);
    $('hero-battle-max-hp').textContent = hero.maxHp.toFixed(0);
    $('hero-hp-bar').style.width = '100%';
    $('boss-name-battle').textContent = boss.name;
    $('boss-img-battle').src = boss.image;
    $('boss-battle-hp').textContent = bossHp.toFixed(0);
    $('boss-battle-max-hp').textContent = bossMaxHp.toFixed(0);
    $('boss-hp-bar').style.width = '100%';
    $('battle-log').innerHTML = '';
    $('potion-count').textContent = potionCountInBattle;

    addBattleLog(`<b>${boss.name}</b>`);
    if (boss.intro) addBattleLog(`<i>${boss.intro}</i>`);

    goToScreen('battle-screen');
}

function startBattle(index) {
    const boss = bosses[index];
    if (!boss || hero.level < boss.levelRequired) return;
    towerMode = false;
    beginBattle({ ...boss, baseIndex: index });
}

function startDailyBattle() {
    beginBattle({
        id: 'daily', name: 'Заражённый Титан', hp: 4000, damage: 18, archetype: 'mage',
        reward: { xp: 2000, silver: 2000, gold: 200 }, image: 'images/boss_infected.png',
        intro: 'Гигантская туша перекрывает проход.', dailyMultiplier: 3
    });
    towerMode = false;
}

function addBattleLog(html) {
    const log = $('battle-log');
    const d = document.createElement('div');
    d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
}

function playerAction(action) {
    if (!battleActive || !currentBoss) return;
    if (autoBattle && action !== 'auto') return;

    if (action === 'attack') doAttack(1, 'АТАКА');
    else if (action === 'heavy') {
        if (Math.random() < 0.25) {
            addBattleLog('<span class="lose">Тяжёлый удар промахнулся!</span>');
            bossTurn();
        } else doAttack(1.8, 'ТЯЖЁЛЫЙ УДАР');
    }
    else if (action === 'defend') {
        defending = true;
        addBattleLog('Герой встаёт в защиту.');
        bossTurn();
    }
    else if (action === 'potion') {
        if (potionCountInBattle <= 0) return;
        hero.hp = Math.min(hero.maxHp, hero.hp + hero.maxHp * 0.3);
        potionCountInBattle--;
        $('potion-count').textContent = potionCountInBattle;
        updateBattleBars();
        addBattleLog('<span class="win">Зелье восстановило HP!</span>');
        playSound('heal');
        bossTurn();
    }
}

function doAttack(multiplier, label) {
    let dmg = hero.damage * multiplier;
    if (hero.skills.includes('rage') && hero.hp < hero.maxHp * 0.3) dmg *= 1.15;

    const isCrit = Math.random() * 100 < hero.critChance;
    if (isCrit) {
        dmg *= (2 + hero.critDamage / 100);
        addBattleLog(`<span class="crit">${label}! КРИТ ${dmg.toFixed(0)}</span>`);
        playSound('crit');
    } else {
        addBattleLog(`${label}: ${dmg.toFixed(0)} урона`);
        playSound('hit');
    }
    showDamagePopup(dmg.toFixed(0), isCrit);

    if (hero.skills.includes('double_hit') && Math.random() < 0.15) {
        const extra = dmg * 0.7;
        addBattleLog(`<span class="crit">Двойной удар! +${extra.toFixed(0)}</span>`);
        dmg += extra;
    }
    if (hero.skills.includes('vampire')) {
        const heal = dmg * 0.05;
        hero.hp = Math.min(hero.maxHp, hero.hp + heal);
        addBattleLog(`<span class="win">Симбиоз: +${heal.toFixed(0)} HP</span>`);
    }

    bossHp = Math.max(0, bossHp - dmg);
    updateBattleBars();
    shakeBoss();

    if (bossHp <= 0) { winBattle(); return; }
    bossTurn();
}

function bossTurn() {
    if (!currentBoss || bossHp <= 0) return;

    if (bossHp < bossMaxHp * 0.5 && !currentBoss.enraged) {
        currentBoss.enraged = true;
        addBattleLog('<span class="crit">БОСС В ЯРОСТИ!</span>');
    }

    let bossDmg = currentBoss.damage;
    if (currentBoss.enraged) bossDmg *= 1.5;

    const evadeChance = currentBoss.archetype === 'mage' ? hero.evade * 0.5 : hero.evade;
    if (Math.random() * 100 < evadeChance) {
        addBattleLog('<span class="win">Уклонение!</span>');
        return;
    }
    if (hero.skills.includes('parry') && Math.random() < 0.1) {
        addBattleLog('<span class="win">ПАРИРОВАНИЕ!</span>');
        const reflect = bossDmg * 0.5;
        bossHp = Math.max(0, bossHp - reflect);
        updateBattleBars();
        if (bossHp <= 0) { winBattle(); return; }
        return;
    }

    if (defending) {
        bossDmg *= 0.3;
        defending = false;
        addBattleLog('Защита поглотила часть урона.');
    }

    hero.hp = Math.max(0, hero.hp - bossDmg);
    updateBattleBars();
    addBattleLog(`${currentBoss.name} наносит ${bossDmg.toFixed(0)}`);

    if (hero.hp <= 0) loseBattle();
}

function updateBattleBars() {
    $('hero-battle-hp').textContent = hero.hp.toFixed(0);
    $('hero-hp-bar').style.width = (hero.hp / hero.maxHp * 100) + '%';
    $('boss-battle-hp').textContent = bossHp.toFixed(0);
    $('boss-hp-bar').style.width = (bossHp / bossMaxHp * 100) + '%';
}

function shakeBoss() {
    const img = $('boss-img-battle');
    img.classList.remove('hit');
    void img.offsetWidth;
    img.classList.add('hit');
}

function showDamagePopup(text, crit) {
    const container = $('damage-popups');
    const el = document.createElement('div');
    el.className = 'damage-popup' + (crit ? ' crit' : '');
    el.textContent = text;
    container.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

/* ============================================================
   13. КОНЕЦ БОЯ
   ============================================================ */
function winBattle() {
    battleActive = false;
    stopAuto();
    const boss = currentBoss;
    const mult = boss.dailyMultiplier || 1;
    
    addBattleLog(`<span class="win">ПОБЕДА!</span>`);

    if (!towerMode && boss.id && !boss.id.startsWith('tower') && boss.id !== 'daily') {
        if (!defeatedBosses.includes(boss.id)) defeatedBosses.push(boss.id);
    }
    hero.silver += boss.reward.silver * mult;
    hero.gold += boss.reward.gold * mult;
    if (Math.random() < 0.4) hero.keys++;
    gainXP(boss.reward.xp * mult);

    if (boss.id === 'daily') hero.dailyClaimedDate = todayStr();
    if (towerMode) { hero.towerFloor++; if (hero.towerFloor > hero.towerRecord) hero.towerRecord = hero.towerFloor; }

    showResult(true, { xp: boss.reward.xp * mult, silver: boss.reward.silver * mult, gold: boss.reward.gold * mult });
    updateStats();
}

function loseBattle() {
    battleActive = false;
    stopAuto();
    addBattleLog('<span class="lose">ПОРАЖЕНИЕ.</span>');
    if (towerMode) hero.towerFloor = 1;
    showResult(false, {});
}

function showResult(win, rewards) {
    $('result-title').textContent = win ? 'СЕКТОР ЗАЧИЩЕН' : 'СМЕРТЬ';
    $('result-title').style.color = win ? '#00ff88' : '#ff5c78';
    if (win) {
        $('result-body').innerHTML = `
            <p>+${rewards.xp} XP</p>
            <p>+${rewards.silver} серебра</p>
            <p>+${rewards.gold} золота</p>`;
    } else {
        $('result-body').innerHTML = '<p>Ты не смог выжить. Прокачайся и вернись.</p>';
    }
    const again = $('result-again');
    again.onclick = () => {
        closeModal('result-modal');
        if (towerMode) startTowerBattle();
        else if (win && currentBoss && currentBoss.baseIndex !== undefined) startBattle(currentBoss.baseIndex);
        else goToScreen('map-screen');
    };
    $('result-map').onclick = () => { closeModal('result-modal'); goToScreen('map-screen'); };
    $('result-menu').onclick = () => { closeModal('result-modal'); goToScreen('main-screen'); };
    openModal('result-modal');
}

function fleeBattle() {
    battleActive = false;
    stopAuto();
    currentBoss = null;
    goToScreen('map-screen');
}

/* ============================================================
   14. АВТОБОЙ / СКОРОСТЬ
   ============================================================ */
function toggleAuto() {
    autoBattle = !autoBattle;
    $('auto-btn').textContent = 'АВТО: ' + (autoBattle ? 'ВКЛ' : 'ВЫКЛ');
    if (autoBattle) {
        autoTimer = setInterval(() => {
            if (!battleActive) { stopAuto(); return; }
            playerAction('attack');
        }, 500 / battleSpeed);
    } else stopAuto();
}
function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
    autoBattle = false;
    $('auto-btn').textContent = 'АВТО: ВЫКЛ';
}
function cycleSpeed() {
    battleSpeed = battleSpeed === 1 ? 2 : battleSpeed === 3 ? 1 : 3;
    $('speed-btn').textContent = '×' + battleSpeed;
}

/* ============================================================
   15. ОПЫТ / СОХРАНЕНИЕ
   ============================================================ */
function gainXP(amount) {
    hero.xp += amount;
    while (hero.xp >= hero.xpToNext) {
        hero.xp -= hero.xpToNext;
        hero.level++;
        hero.xpToNext = Math.floor(5000 * Math.pow(1.5, hero.level - 1));
        hero.unspentPoints += 5;
        hero.skillPoints += 1;
        hero.diamonds += 1;
    }
}

function saveGame() {
    hero.version = SAVE_VERSION;
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('defeatedBosses', JSON.stringify(defeatedBosses));
}

function loadGame() {
    const saved = localStorage.getItem('hero');
    if (saved) {
        try { Object.assign(hero, JSON.parse(saved)); } catch (e) {}
    }
    if (!Array.isArray(hero.inventory)) hero.inventory = [];
    if (!Array.isArray(hero.equipment)) hero.equipment = [];
    if (!Array.isArray(hero.skills)) hero.skills = [];
    if (!Array.isArray(hero.achievements)) hero.achievements = [];
    if (!hero.consumables) hero.consumables = { potion: 3 };

    const sb = localStorage.getItem('defeatedBosses');
    if (sb) { try { defeatedBosses = JSON.parse(sb) || []; } catch (e) { defeatedBosses = []; } }
    
    if (!saved) { hero.silver = 500; hero.gold = 100; }
}

function exportSave() { $('save-text').value = localStorage.getItem('hero') || ''; }
function importSave() {
    try {
        localStorage.setItem('hero', $('save-text').value);
        location.reload();
    } catch (e) { alert('Ошибка импорта'); }
}

/* ============================================================
   16. DEBUG / INIT
   ============================================================ */
function dbgAddMoney() { hero.silver += 10000; updateStats(); }
function dbgAddLevels() { for (let i = 0; i < 5; i++) gainXP(hero.xpToNext); updateStats(); }
function dbgWinBoss() { if (currentBoss) { bossHp = 0; winBattle(); } }
function dbgReset() { localStorage.clear(); location.reload(); }

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateStats();
    renderBosses();
    renderShop();
    renderTower();

    if (new URLSearchParams(location.search).get('debug') === '1') {
        $('debug-panel').classList.remove('hidden');
    }

    document.querySelectorAll('.equip-slot').forEach(slot =>
        slot.addEventListener('click', () => openEquipModal(slot.dataset.slot))
    );
    document.querySelectorAll('.shop-tab').forEach(tab =>
        tab.addEventListener('click', () => { currentShopTab = tab.dataset.type; renderShop(); })
    );
    document.querySelectorAll('.inv-tab').forEach(tab =>
        tab.addEventListener('click', () => { currentInvTab = tab.dataset.tab; renderInventory(); })
    );
    $('equip-modal').addEventListener('click', e => {
        if (e.target.id === 'equip-modal') closeEquipModal();
    });
});