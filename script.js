/* ============================================================
   ДАННЫЕ ГЕРОЯ
   ============================================================ */
const hero = {
    level: 1,
    xp: 0,
    xpToNext: 5000,
    unspentPoints: 0,
    str: 0,
    agi: 0,
    sta: 0,
    hp: 200,
    maxHp: 200,
    damage: 100,
    critChance: 0,
    critDamage: 100,
    evade: 0,
    silver: 0,
    gold: 0,
    diamonds: 0,
    // Купленные предметы (id)
    inventory: [],
    // Надетые предметы (id)
    equipment: []
};

/* ============================================================
   БОССЫ
   ============================================================ */
const bosses = [
    { id: 'boss-1', name: 'Крыса-мутант', levelRequired: 1, hp: 500, damage: 3, reward: { xp: 50, silver: 50, gold: 5 }, image: 'images/boss_rat.png', description: 'Грызун из подземелий.' },
    { id: 'boss-2', name: 'Гигантская паучиха', levelRequired: 5, hp: 1000, damage: 6, reward: { xp: 150, silver: 150, gold: 15 }, image: 'images/boss_spider.png', description: 'Плетёт сети.' },
    { id: 'boss-3', name: 'Скелет-воин', levelRequired: 10, hp: 1500, damage: 8, reward: { xp: 300, silver: 300, gold: 30 }, image: 'images/boss_skeleton.png', description: 'Восставший из мёртвых.' },
    { id: 'boss-4', name: 'Гоблин-шаман', levelRequired: 15, hp: 2000, damage: 10, reward: { xp: 500, silver: 500, gold: 50 }, image: 'images/boss_goblin.png', description: 'Колдует тёмную магию.' },
    { id: 'boss-5', name: 'Орк-вождь', levelRequired: 20, hp: 2500, damage: 12, reward: { xp: 800, silver: 800, gold: 80 }, image: 'images/boss_orc.png', description: 'Громила с дубиной.' },
    { id: 'boss-6', name: 'Минотавр', levelRequired: 25, hp: 3000, damage: 15, reward: { xp: 1200, silver: 1200, gold: 120 }, image: 'images/boss_minotaur.png', description: 'Охраняет лабиринт.' },
    { id: 'boss-7', name: 'Древний дракон', levelRequired: 30, hp: 5000, damage: 20, reward: { xp: 3000, silver: 3000, gold: 300 }, image: 'images/boss.png', description: 'Страж подземелья.' }
];

/* ============================================================
   ПРЕДМЕТЫ
   ============================================================ */
const items = [
    { id: 'item-1', name: 'Деревянная дубинка', type: 'weapon', damageBonus: 30, price: { silver: 1500, gold: 300 }, image: 'images/weapon_wooden_club.jpg' },
    { id: 'item-2', name: 'Железный меч', type: 'weapon', damageBonus: 50, price: { silver: 3000, gold: 600 }, image: 'images/weapon_iron_sword.jpg' },
    { id: 'item-3', name: 'Каменный меч', type: 'weapon', damageBonus: 70, price: { silver: 5000, gold: 1000 }, image: 'images/weapon_stone_sword.jpg' },
    { id: 'item-4', name: 'Золотой меч', type: 'weapon', damageBonus: 100, price: { silver: 10000, gold: 2000 }, image: 'images/weapon_golden_sword.jpg' },
    { id: 'item-5', name: 'Копьё', type: 'weapon', damageBonus: 40, price: { silver: 2000, gold: 400 }, image: 'images/weapon_spear.jpg' },
    { id: 'item-6', name: 'Кинжал', type: 'weapon', damageBonus: 20, critChanceBonus: 5, price: { silver: 2500, gold: 500 }, image: 'images/weapon_dagger.jpg' },
    { id: 'item-7', name: 'Кожаный шлем', type: 'helmet', hpBonus: 30, price: { silver: 1500, gold: 300 }, image: 'images/armor_leather_helmet.png' },
    { id: 'item-8', name: 'Железный шлем', type: 'helmet', hpBonus: 60, price: { silver: 3000, gold: 600 }, image: 'images/armor_iron_helmet.png' },
    { id: 'item-9', name: 'Кожаный нагрудник', type: 'chest', hpBonus: 50, price: { silver: 2500, gold: 500 }, image: 'images/armor_leather_chest.png' },
    { id: 'item-10', name: 'Железный нагрудник', type: 'chest', hpBonus: 100, price: { silver: 5000, gold: 1000 }, image: 'images/armor_iron_chest.png' },
    { id: 'item-11', name: 'Железные поножи', type: 'legs', hpBonus: 25, price: { silver: 1200, gold: 240 }, image: 'images/armor_iron_legs.png' },
    { id: 'item-12', name: 'Кожаные ботинки', type: 'boots', evadeBonus: 2, price: { silver: 1000, gold: 200 }, image: 'images/armor_leather_boots.png' },
    { id: 'item-13', name: 'Деревянный щит', type: 'shield', hpBonus: 20, evadeBonus: 1, price: { silver: 1800, gold: 360 }, image: 'images/armor_wooden_shield.png' },
    { id: 'item-14', name: 'Железный щит', type: 'shield', hpBonus: 50, evadeBonus: 3, price: { silver: 4000, gold: 800 }, image: 'images/armor_iron_shield.png' }
];

const SLOT_LABELS = {
    weapon: 'ОРУЖИЕ', helmet: 'ШЛЕМ', chest: 'НАГРУДНИК',
    legs: 'ПОНОЖИ', boots: 'БОТИНКИ', shield: 'ЩИТ'
};

/* ============================================================
   СОСТОЯНИЕ БОЯ
   ============================================================ */
let defeatedBosses = [];
let currentBoss = null;
let bossHp = 0, bossMaxHp = 0;

/* ============================================================
   ВСПОМОГАТЕЛЬНЫЕ
   ============================================================ */
function getItem(id) { return items.find(i => i.id === id); }

function itemBonusText(item) {
    const parts = [];
    if (item.damageBonus) parts.push(`+${item.damageBonus} урона`);
    if (item.hpBonus) parts.push(`+${item.hpBonus} HP`);
    if (item.evadeBonus) parts.push(`+${item.evadeBonus}% уклонение`);
    if (item.critChanceBonus) parts.push(`+${item.critChanceBonus}% крит`);
    return parts.join(', ') || '—';
}

/* ============================================================
   ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
   ============================================================ */
function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if (screenId === 'map-screen') renderBosses();
    if (screenId === 'shop-screen') renderShop();
    if (screenId === 'inventory-screen') renderInventory();
}

/* ============================================================
   СТАТЫ
   ============================================================ */
function calcStats() {
    const base = {
        hp: 200 + hero.sta * 20,
        maxHp: 200 + hero.sta * 20,
        damage: 100 + hero.str * 10,
        critChance: Math.min(hero.agi * 0.5, 100),
        critDamage: 100 + hero.agi * 1,
        evade: Math.min(hero.agi * 0.2, 100)
    };

    const bonus = { hp: 0, damage: 0, evade: 0, critChance: 0 };
    hero.equipment.forEach(id => {
        const item = getItem(id);
        if (!item) return;
        if (item.damageBonus) bonus.damage += item.damageBonus;
        if (item.hpBonus) bonus.hp += item.hpBonus;
        if (item.evadeBonus) bonus.evade += item.evadeBonus;
        if (item.critChanceBonus) bonus.critChance += item.critChanceBonus;
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
    const stats = calcStats();
    const oldMax = hero.maxHp;
    hero.maxHp = stats.maxHp;
    hero.damage = stats.damage;
    hero.critChance = stats.critChance;
    hero.critDamage = stats.critDamage;
    hero.evade = stats.evade;
    // Если текущее HP больше максимума — подрезаем, иначе восстанавливаем пропорционально
    if (hero.hp > hero.maxHp || oldMax === 0) hero.hp = hero.maxHp;
    else if (hero.hp < hero.maxHp && oldMax !== hero.maxHp) hero.hp = Math.min(hero.hp, hero.maxHp);

    document.getElementById('hero-level').textContent = hero.level;
    document.getElementById('hero-xp').textContent = hero.xp;
    document.getElementById('hero-xp-to-next').textContent = hero.xpToNext;
    document.getElementById('hero-xp-bar').style.width = (hero.xp / hero.xpToNext) * 100 + '%';
    document.getElementById('hero-unspent-points').textContent = hero.unspentPoints;
    document.getElementById('hero-hp').textContent = hero.maxHp.toFixed(1);
    document.getElementById('hero-damage').textContent = hero.damage.toFixed(1);
    document.getElementById('hero-crit-chance').textContent = hero.critChance.toFixed(1) + '%';
    document.getElementById('hero-crit-damage').textContent = hero.critDamage.toFixed(1) + '%';
    document.getElementById('hero-evade').textContent = hero.evade.toFixed(1) + '%';
    document.getElementById('hero-silver').textContent = hero.silver;
    document.getElementById('hero-gold').textContent = hero.gold;
    document.getElementById('hero-diamonds').textContent = hero.diamonds;
    document.getElementById('str').textContent = hero.str;
    document.getElementById('agi').textContent = hero.agi;
    document.getElementById('sta').textContent = hero.sta;
    renderEquipment();
    saveGame();
}

function addStat(stat) {
    if (hero.unspentPoints <= 0) return;
    hero[stat]++;
    hero.unspentPoints--;
    updateStats();
}

/* ============================================================
   ЭКИПИРОВКА (отрисовка)
   ============================================================ */
function renderEquipment() {
    document.querySelectorAll('.equip-slot').forEach(slot => {
        const type = slot.dataset.slot;
        const equippedId = hero.equipment.find(id => {
            const it = getItem(id);
            return it && it.type === type;
        });
        if (equippedId) {
            const item = getItem(equippedId);
            slot.classList.remove('empty');
            slot.classList.add('slot-equipped');
            slot.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="equip-img" onerror="this.style.display='none'">
                <div class="slot-name">${item.name}</div>
                <div class="slot-bonus">${itemBonusText(item)}</div>
            `;
        } else {
            slot.classList.add('empty');
            slot.classList.remove('slot-equipped');
            slot.textContent = SLOT_LABELS[type] || type.toUpperCase();
        }
    });
}

/* ============================================================
   МОДАЛКА ВЫБОРА ПРЕДМЕТА ДЛЯ СЛОТА
   ============================================================ */
function openEquipModal(type) {
    document.getElementById('equip-modal').classList.remove('hidden');
    document.getElementById('modal-slot-name').textContent = SLOT_LABELS[type] || type.toUpperCase();
    renderModalItems(type);
}

function closeEquipModal() {
    document.getElementById('equip-modal').classList.add('hidden');
}

function renderModalItems(type) {
    const container = document.getElementById('modal-items');
    container.innerHTML = '';

    // Надетый сейчас предмет в этот слот
    const equippedId = hero.equipment.find(id => {
        const it = getItem(id);
        return it && it.type === type;
    });

    if (equippedId) {
        const item = getItem(equippedId);
        const div = document.createElement('div');
        div.className = 'modal-item';
        div.innerHTML = `
            <img src="${item.image}" class="item-img" onerror="this.style.display='none'">
            <h3>${item.name}</h3>
            <p>${itemBonusText(item)}</p>
            <button onclick="unequipItem('${type}')">СНЯТЬ</button>
        `;
        container.appendChild(div);
    }

    // Предметы этого типа из инвентаря (кроме надетого)
    const available = hero.inventory.filter(id => {
        const it = getItem(id);
        return it && it.type === type && id !== equippedId;
    });

    if (available.length === 0 && !equippedId) {
        const empty = document.createElement('div');
        empty.textContent = 'Нет предметов этого типа в инвентаре';
        container.appendChild(empty);
        return;
    }

    available.forEach(id => {
        const item = getItem(id);
        const div = document.createElement('div');
        div.className = 'modal-item';
        div.innerHTML = `
            <img src="${item.image}" class="item-img" onerror="this.style.display='none'">
            <h3>${item.name}</h3>
            <p>${itemBonusText(item)}</p>
            <button onclick="equipItem('${id}')">НАДЕТЬ</button>
        `;
        container.appendChild(div);
    });
}

function equipItem(itemId) {
    const item = getItem(itemId);
    if (!item) return;
    // Снимаем текущий предмет этого слота (возвращаем в инвентарь)
    hero.equipment = hero.equipment.filter(id => {
        const it = getItem(id);
        return !(it && it.type === item.type);
    });
    // Убираем предмет из инвентаря и надеваем
    hero.inventory = hero.inventory.filter(id => id !== itemId);
    hero.equipment.push(itemId);
    updateStats();
    closeEquipModal();
    renderInventory();
}

function unequipItem(type) {
    const equippedId = hero.equipment.find(id => {
        const it = getItem(id);
        return it && it.type === type;
    });
    if (!equippedId) return;
    hero.equipment = hero.equipment.filter(id => id !== equippedId);
    if (!hero.inventory.includes(equippedId)) hero.inventory.push(equippedId);
    updateStats();
    closeEquipModal();
    renderInventory();
}

/* ============================================================
   МАГАЗИН
   ============================================================ */
let currentShopTab = 'weapon';

function renderShop() {
    document.querySelectorAll('.shop-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.type === currentShopTab);
    });
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = '';
    const filtered = items.filter(i => i.type === currentShopTab);

    filtered.forEach(item => {
        const owned = hero.inventory.includes(item.id) || hero.equipment.includes(item.id);
        const div = document.createElement('div');
        div.className = 'shop-item' + (owned ? ' bought' : '');
        div.innerHTML = `
            <img src="${item.image}" class="item-img" onerror="this.style.display='none'">
            <h3>${item.name}</h3>
            <p>${itemBonusText(item)}</p>
            <div class="price">
                <img src="images/coin_silver.png" class="price-icon" onerror="this.style.display='none'"> ${item.price.silver}
                <img src="images/coin_gold.png" class="price-icon" onerror="this.style.display='none'"> ${item.price.gold}
            </div>
            ${owned
                ? '<div class="owned-label">КУПЛЕНО</div>'
                : `<button onclick="buyItem('${item.id}')">КУПИТЬ</button>`}
        `;
        grid.appendChild(div);
    });
}

function buyItem(itemId) {
    const item = getItem(itemId);
    if (!item) return;
    if (hero.inventory.includes(itemId) || hero.equipment.includes(itemId)) return;

    // Пытаемся списать: сначала серебро, если хватает; иначе золото
    if (hero.silver >= item.price.silver) {
        hero.silver -= item.price.silver;
    } else if (hero.gold >= item.price.gold) {
        hero.gold -= item.price.gold;
    } else {
        alert('Недостаточно средств');
        return;
    }

    hero.inventory.push(itemId);
    updateStats();
    renderShop();
}

/* ============================================================
   ИНВЕНТАРЬ
   ============================================================ */
function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    const empty = document.getElementById('inventory-empty');
    grid.innerHTML = '';
    if (hero.inventory.length === 0) {
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    hero.inventory.forEach(id => {
        const item = getItem(id);
        if (!item) return;
        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.innerHTML = `
            <img src="${item.image}" class="item-img" onerror="this.style.display='none'">
            <h3>${item.name}</h3>
            <p class="item-type">${SLOT_LABELS[item.type]}</p>
            <p>${itemBonusText(item)}</p>
            <button onclick="equipFromInventory('${item.id}')">НАДЕТЬ</button>
        `;
        grid.appendChild(div);
    });
}

function equipFromInventory(itemId) {
    const item = getItem(itemId);
    if (!item) return;
    // Снимаем текущий из слота
    const oldId = hero.equipment.find(id => {
        const it = getItem(id);
        return it && it.type === item.type;
    });
    if (oldId) hero.inventory.push(oldId);
    hero.equipment = hero.equipment.filter(id => id !== oldId);
    // Надеваем новый
    hero.inventory = hero.inventory.filter(id => id !== itemId);
    hero.equipment.push(itemId);
    updateStats();
    renderInventory();
}

/* ============================================================
   КАРТА / БОССЫ
   ============================================================ */
function renderBosses() {
    const list = document.getElementById('boss-list');
    list.innerHTML = '';
    bosses.forEach((boss, index) => {
        const locked = hero.level < boss.levelRequired;
        const defeated = defeatedBosses.includes(boss.id);
        const row = document.createElement('div');
        row.className = 'boss-row' + (locked ? ' locked' : '') + (defeated ? ' defeated' : '');
        row.innerHTML = `
            <img src="${boss.image}" class="boss-thumb" onerror="this.style.display='none'">
            <div class="boss-info">
                <h3>${boss.name}</h3>
                <p class="boss-desc">${boss.description}</p>
                <p>HP: ${boss.hp} · Урон: ${boss.damage} · Треб. уровень: ${boss.levelRequired}</p>
            </div>
            <div class="boss-status">
                ${defeated ? '<span class="badge defeated-badge">ПОВЕРЖЕН</span>' : ''}
                ${locked ? '<span class="badge locked-badge">ЗАКРЫТ</span>' : ''}
            </div>
            <button class="btn-fight" ${locked ? 'disabled' : ''} onclick="startBattle(${index})">СРАЗИТЬСЯ</button>
        `;
        list.appendChild(row);
    });
}

/* ============================================================
   БОЙ
   ============================================================ */
function startBattle(index) {
    const boss = bosses[index];
    if (hero.level < boss.levelRequired) return;

    currentBoss = boss;
    bossMaxHp = boss.hp;
    bossHp = boss.hp;
    hero.hp = hero.maxHp;

    document.getElementById('hero-battle-hp').textContent = hero.hp.toFixed(1);
    document.getElementById('hero-battle-max-hp').textContent = hero.maxHp.toFixed(1);
    document.getElementById('boss-name-battle').textContent = boss.name;
    document.getElementById('boss-img-battle').src = boss.image;
    document.getElementById('boss-battle-hp').textContent = bossHp.toFixed(1);
    document.getElementById('boss-battle-max-hp').textContent = bossMaxHp.toFixed(1);
    document.getElementById('hero-hp-bar').style.width = '100%';
    document.getElementById('boss-hp-bar').style.width = '100%';

    const log = document.getElementById('battle-log');
    log.innerHTML = '';
    addBattleLog(`Бой начался: ${boss.name}!`);

    const btn = document.getElementById('attack-button');
    btn.textContent = 'АТАКА';
    btn.onclick = attack;

    goToScreen('battle-screen');
}

function addBattleLog(text) {
    const log = document.getElementById('battle-log');
    const div = document.createElement('div');
    div.innerHTML = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function attack() {
    if (!currentBoss) return;

    // Атака героя
    let dmg = hero.damage;
    const isCrit = Math.random() * 100 < hero.critChance;
    if (isCrit) {
        dmg = dmg * (2 + hero.critDamage / 100);
        addBattleLog(`<span class="crit">КРИТ! ${dmg.toFixed(1)} урона</span>`);
    } else {
        addBattleLog(`Герой наносит ${dmg.toFixed(1)} урона`);
    }
    bossHp -= dmg;
    if (bossHp < 0) bossHp = 0;
    document.getElementById('boss-battle-hp').textContent = bossHp.toFixed(1);
    document.getElementById('boss-hp-bar').style.width = (bossHp / bossMaxHp) * 100 + '%';

    if (bossHp <= 0) {
        winBattle();
        return;
    }

    // Атака босса
    if (Math.random() * 100 < hero.evade) {
        addBattleLog('Герой уклоняется от атаки!');
    } else {
        hero.hp -= currentBoss.damage;
        if (hero.hp < 0) hero.hp = 0;
        addBattleLog(`${currentBoss.name} наносит ${currentBoss.damage} урона`);
        document.getElementById('hero-battle-hp').textContent = hero.hp.toFixed(1);
        document.getElementById('hero-hp-bar').style.width = (hero.hp / hero.maxHp) * 100 + '%';
    }

    if (hero.hp <= 0) loseBattle();
}

function winBattle() {
    const boss = currentBoss;
    addBattleLog(`<span class="win">ПОБЕДА! ${boss.name} повержен.</span>`);
    addBattleLog(`Награда: ${boss.reward.xp} XP, ${boss.reward.silver} серебра, ${boss.reward.gold} золота`);

    if (!defeatedBosses.includes(boss.id)) defeatedBosses.push(boss.id);
    hero.silver += boss.reward.silver;
    hero.gold += boss.reward.gold;
    gainXP(boss.reward.xp);

    currentBoss = null;
    const btn = document.getElementById('attack-button');
    btn.textContent = 'В ГЛАВНОЕ МЕНЮ';
    btn.onclick = () => goToScreen('main-screen');
    updateStats();
    saveGame();
}

function loseBattle() {
    addBattleLog('<span class="lose">ПОРАЖЕНИЕ. Герой пал.</span>');
    currentBoss = null;
    const btn = document.getElementById('attack-button');
    btn.textContent = 'В ГЛАВНОЕ МЕНЮ';
    btn.onclick = () => goToScreen('main-screen');
}

/* ============================================================
   ОПЫТ / УРОВЕНЬ
   ============================================================ */
function gainXP(amount) {
    hero.xp += amount;
    while (hero.xp >= hero.xpToNext) {
        hero.xp -= hero.xpToNext;
        hero.level++;
        hero.xpToNext = Math.floor(5000 * Math.pow(1.5, hero.level - 1));
        hero.unspentPoints += 5;
        hero.diamonds += 1;
    }
    updateStats();
}

/* ============================================================
   СОХРАНЕНИЕ / ЗАГРУЗКА
   ============================================================ */
function saveGame() {
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('defeatedBosses', JSON.stringify(defeatedBosses));
}

function loadGame() {
    const savedHero = localStorage.getItem('hero');
    if (savedHero) {
        try { Object.assign(hero, JSON.parse(savedHero)); } catch (e) {}
    }
    // Совместимость со старой версией (equipment хранил имена)
    if (hero.equipment && hero.equipment.length && typeof hero.equipment[0] === 'string' && !hero.equipment[0].startsWith('item-')) {
        hero.equipment = [];
        hero.inventory = [];
    }
    if (!Array.isArray(hero.inventory)) hero.inventory = [];
    if (!Array.isArray(hero.equipment)) hero.equipment = [];

    const savedBosses = localStorage.getItem('defeatedBosses');
    if (savedBosses) {
        try { defeatedBosses = JSON.parse(savedBosses); } catch (e) { defeatedBosses = []; }
    }
}

/* ============================================================
   ИНИЦИАЛИЗАЦИЯ
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateStats();
    renderBosses();
    renderShop();

    // Слоты экипировки
    document.querySelectorAll('.equip-slot').forEach(slot => {
        slot.addEventListener('click', () => openEquipModal(slot.dataset.slot));
    });

    // Вкладки магазина
    document.querySelectorAll('.shop-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            currentShopTab = tab.dataset.type;
            renderShop();
        });
    });

    // Закрытие модалки по клику на фон
    document.getElementById('equip-modal').addEventListener('click', e => {
        if (e.target.id === 'equip-modal') closeEquipModal();
    });
});