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
    equipment: []
};

const bosses = [
    { id: 'boss-1', name: 'Крыса-мутант', levelRequired: 1, hp: 500, damage: 3, reward: { xp: 50, silver: 50, gold: 5 }, image: 'images/boss_rat.png', description: 'Грызун из подземелий.' },
    { id: 'boss-2', name: 'Гигантская паучиха', levelRequired: 5, hp: 1000, damage: 6, reward: { xp: 150, silver: 150, gold: 15 }, image: 'images/boss_spider.png', description: 'Плетёт сети.' },
    { id: 'boss-3', name: 'Скелет-воин', levelRequired: 10, hp: 1500, damage: 8, reward: { xp: 300, silver: 300, gold: 30 }, image: 'images/boss_skeleton.png', description: 'Восставший из мёртвых.' },
    { id: 'boss-4', name: 'Гоблин-шаман', levelRequired: 15, hp: 2000, damage: 10, reward: { xp: 500, silver: 500, gold: 50 }, image: 'images/boss_goblin.png', description: 'Колдует тёмную магию.' },
    { id: 'boss-5', name: 'Орк-вождь', levelRequired: 20, hp: 2500, damage: 12, reward: { xp: 800, silver: 800, gold: 80 }, image: 'images/boss_orc.png', description: 'Громила с дубиной.' },
    { id: 'boss-6', name: 'Минотавр', levelRequired: 25, hp: 3000, damage: 15, reward: { xp: 1200, silver: 1200, gold: 120 }, image: 'images/boss_minotaur.png', description: 'Охраняет лабиринт.' },
    { id: 'boss-7', name: 'Древний дракон', levelRequired: 30, hp: 5000, damage: 20, reward: { xp: 3000, silver: 3000, gold: 300 }, image: 'images/boss.png', description: 'Страж подземелья.' }
];

let defeatedBosses = JSON.parse(localStorage.getItem('defeatedBosses')) || [];

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

function updateStats() {
    const stats = calcStats();
    hero.hp = stats.hp;
    hero.maxHp = stats.maxHp;
    hero.damage = stats.damage;
    hero.critChance = stats.critChance;
    hero.critDamage = stats.critDamage;
    hero.evade = stats.evade;

    document.getElementById('hero-level').textContent = hero.level;
    document.getElementById('hero-xp').textContent = hero.xp;
    document.getElementById('hero-xp-to-next').textContent = hero.xpToNext;
    document.getElementById('hero-xp-bar').style.width = (hero.xp / hero.xpToNext) * 100 + '%';
    document.getElementById('hero-unspent-points').textContent = hero.unspentPoints;
    document.getElementById('hero-hp').textContent = hero.hp.toFixed(1);
    document.getElementById('hero-damage').textContent = hero.damage.toFixed(1);
    document.getElementById('hero-crit-chance').textContent = (hero.critChance * 100).toFixed(1) + '%';
    document.getElementById('hero-crit-damage').textContent = (hero.critDamage).toFixed(1) + '%';
    document.getElementById('hero-evade').textContent = (hero.evade * 100).toFixed(1) + '%';
    document.getElementById('hero-silver').textContent = hero.silver;
    document.getElementById('hero-gold').textContent = hero.gold;
    document.getElementById('hero-diamonds').textContent = hero.diamonds;
    renderEquipment();
}

function addStat(stat) {
    if (hero.unspentPoints > 0) {
        hero[stat]++;
        hero.unspentPoints--;
        updateStats();
    } else {
        addLog('Нет свободных очков');
    }
}

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startBattle(bossIndex) {
    const boss = bosses[bossIndex];
    hero.hp = hero.maxHp;
    boss.hp = boss.maxHp;
    document.getElementById('hero-battle-hp').textContent = hero.hp.toFixed(1);
    document.getElementById('hero-battle-max-hp').textContent = hero.maxHp.toFixed(1);
    document.getElementById('boss-battle-hp').textContent = boss.hp.toFixed(1);
    document.getElementById('boss-battle-max-hp').textContent = boss.maxHp.toFixed(1);
    document.getElementById('hero-hp-bar').style.width = '100%';
    document.getElementById('boss-hp-bar').style.width = '100%';
    document.getElementById('battle-log').innerHTML = '';
    document.getElementById('attack-button').textContent = 'АТАКА';
    goToScreen('battle-screen');
}

function attack() {
    // Hero attack
    let damage = hero.damage;
    if (Math.random() < hero.critChance / 100) {
        damage = damage * (2 + hero.critDamage / 100);
        document.getElementById('battle-log').innerHTML += '<div>КРИТ! ' + damage.toFixed(1) + ' урона</div>';
    } else {
        document.getElementById('battle-log').innerHTML += '<div>Герой атакует: ' + damage.toFixed(1) + ' урона</div>';
    }
    boss.hp -= damage;
    document.getElementById('boss-battle-hp').textContent = boss.hp.toFixed(1);
    document.getElementById('boss-hp-bar').style.width = (boss.hp / boss.maxHp) * 100 + '%';

    // Boss attack
    if (Math.random() > hero.evade / 100) {
        hero.hp -= boss.damage;
        document.getElementById('battle-log').innerHTML += '<div>Босс атакует: ' + boss.damage + ' урона</div>';
        document.getElementById('hero-battle-hp').textContent = hero.hp.toFixed(1);
        document.getElementById('hero-hp-bar').style.width = (hero.hp / hero.maxHp) * 100 + '%';
    } else {
        document.getElementById('battle-log').innerHTML += '<div>Герой уклоняется!</div>';
    }

    // Check win/lose
    if (boss.hp <= 0) {
        document.getElementById('battle-log').innerHTML += `<div>ПОБЕДА! ${boss.name} повержен.</div>`;
        document.getElementById('battle-log').innerHTML += '<div><img src="images/reward_chest.png" class="reward-icon" onerror="this.style.display=\'none\'"></div>';
        document.getElementById('battle-log').innerHTML += `<div>Награда: ${boss.reward.xp} XP, ${boss.reward.silver} серебра, ${boss.reward.gold} золота</div>`;
        gainXP(boss.reward.xp);
        gainCurrency(boss.reward.silver, boss.reward.gold);
        defeatedBosses.push(boss.id);
        localStorage.setItem('defeatedBosses', JSON.stringify(defeatedBosses));
        goToScreen('main-screen');
    } else if (hero.hp <= 0) {
        document.getElementById('battle-log').innerHTML += '<div>ПОРАЖЕНИЕ. Герой пал.</div>';
        document.getElementById('attack-button').textContent = 'В ГЛАВНОЕ МЕНЮ';
        document.getElementById('attack-button').onclick = () => goToScreen('main-screen');
    }

    // Auto-scroll log
    const log = document.getElementById('battle-log');
    log.scrollTop = log.scrollHeight;
}

function gainXP(amount) {
    hero.xp += amount;
    if (hero.xp >= hero.xpToNext) {
        hero.level++;
        hero.xp -= hero.xpToNext;
        hero.xpToNext = Math.floor(5000 * Math.pow(1.5, hero.level - 1));
        hero.unspentPoints += 5;
        hero.diamonds += 1;
        addLog('УРОВЕНЬ ПОВЫШЕН! Уровень ' + hero.level + '. +5 очков, +1 алмаз.');
    }
    updateStats();
}

function gainCurrency(silver, gold) {
    hero.silver += silver;
    hero.gold += gold;
    updateStats();
}

function buyItem(itemId, currency) {
    const item = items.find(i => i.id === itemId);
    if (hero.equipment.includes(item.name)) {
        addLog(item.name + ' уже куплен.');
        return;
    }
    if (currency === 'silver' && hero.silver >= item.price.silver) {
        hero.silver -= item.price.silver;
    } else if (currency === 'gold' && hero.gold >= item.price.gold) {
        hero.gold -= item.price.gold;
    } else {
        addLog('Недостаточно ' + currency);
        return;
    }
    hero.equipment.push(item.name);
    addLog('Куплено: ' + item.name);
    updateStats();
    renderShop();
}

function calcStats() {
    const baseStats = {
        hp: 200 + hero.sta * 20,
        maxHp: 200 + hero.sta * 20,
        damage: 100 + hero.str * 10,
        critChance: Math.min(hero.agi * 0.5, 100),
        critDamage: 100 + hero.agi * 1,
        evade: Math.min(hero.agi * 0.2, 100)
    };

    const equipmentStats = hero.equipment.reduce((acc, itemName) => {
        const item = items.find(i => i.name === itemName);
        if (item) {
            if (item.damageBonus) acc.damage += item.damageBonus;
            if (item.hpBonus) acc.hp += item.hpBonus;
            if (item.evadeBonus) acc.evade += item.evadeBonus;
            if (item.critChanceBonus) acc.critChance += item.critChanceBonus;
        }
        return acc;
    }, { hp: 0, damage: 0, evade: 0, critChance: 0 });

    return {
        hp: baseStats.hp + equipmentStats.hp,
        maxHp: baseStats.maxHp + equipmentStats.hp,
        damage: baseStats.damage + equipmentStats.damage,
        critChance: baseStats.critChance + equipmentStats.critChance,
        critDamage: baseStats.critDamage,
        evade: baseStats.evade + equipmentStats.evade
    };
}

function renderEquipment() {
    const slots = document.querySelectorAll('.equipment-slot');
    slots.forEach(slot => {
        slot.classList.add('empty');
        slot.textContent = '';
        slot.innerHTML = '';
        slot.classList.remove('slot-equipped');
    });

    hero.equipment.forEach(itemName => {
        const item = items.find(i => i.name === itemName);
        const slot = document.querySelector('.equipment-slot[data-slot="' + item.type + '"]');
        if (slot) {
            slot.classList.remove('empty');
            slot.classList.add('slot-equipped');
            slot.textContent = itemName;
            slot.innerHTML = `
                <img src="${item.image}" alt="${itemName}" class="equip-img" onerror="this.style.display='none'">
                <div class="slot-name">${itemName}</div>
                <div class="slot-bonus">${itemBonusText(item)}</div>
            `;
        }
    });
}

function openEquipModal(slot) {
    document.getElementById('equip-modal').classList.remove('hidden');
    document.getElementById('modal-slot-name').textContent = slot.dataset.slot.toUpperCase();
    renderModalItems(slot.dataset.slot);
}

function closeEquipModal() {
    document.getElementById('equip-modal').classList.add('hidden');
}

function renderModalItems(slot) {
    const modalItems = document.getElementById('modal-items');
    modalItems.innerHTML = '';

    const equippedItem = hero.equipment.find(itemName => items.find(i => i.name === itemName && i.type === slot));
    if (equippedItem) {
        const item = items.find(i => i.name === equippedItem);
        const itemElement = document.createElement('div');
        itemElement.classList.add('modal-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.style.display='none'">
            <h2>${item.name}</h2>
            <p>Урон: +${item.damageBonus || 0}</p>
            <p>HP: +${item.hpBonus || 0}</p>
            <p>Уклонение: +${item.evadeBonus || 0}%</p>
            <p>Шанс крита: +${item.critChanceBonus || 0}%</p>
            <button onclick="unequipItem('${slot}')">СНЯТЬ</button>
        `;
        modalItems.appendChild(itemElement);
    } else {
        const noItemsElement = document.createElement('div');
        noItemsElement.textContent = 'Нет купленных предметов';
        modalItems.appendChild(noItemsElement);

        const shopButton = document.createElement('button');
        shopButton.textContent = 'В МАГАЗИН';
        shopButton.onclick = () => goToScreen('shop-screen');
        modalItems.appendChild(shopButton);
    }
}

function equipItem(slot, itemId) {
    const item = items.find(i => i.id === itemId);
    hero.equipment = hero.equipment.filter(itemName => items.find(i => i.name === itemName && i.type !== slot));
    hero.equipment.push(item.name);
    updateStats();
    saveGame();
    closeEquipModal();
    renderEquipment();
}

function unequipItem(slot) {
    hero.equipment = hero.equipment.filter(itemName => items.find(i => i.name === itemName && i.type !== slot));
    updateStats();
    saveGame();
    closeEquipModal();
    renderEquipment();
}

document.querySelectorAll('.equip-slot').forEach(slot => {
    slot.addEventListener('click', () => openEquipModal(slot));
});

document.querySelector('.modal-close').addEventListener('click', closeEquipModal);

function itemBonusText(item) {
    let text = '';
    if (item.damageBonus) text += '+50 урона';
    if (item.hpBonus) text += '+30 HP';
    if (item.dodgeBonus) text += '+2% уклонение';
    if (item.critChanceBonus) text += '+5% шанс крита';
    return text;
}

function renderShop() {
    const shopGrid = document.getElementById('shop-grid');
    shopGrid.innerHTML = '';
    items.forEach(item => {
        if (hero.equipment.includes(item.name)) return;
        const itemElement = document.createElement('div');
        itemElement.classList.add('shop-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.style.display='none'">
            <h2>${item.name}</h2>
            <p>Урон: +${item.damageBonus || 0}</p>
            <p>HP: +${item.hpBonus || 0}</p>
            <p>Уклонение: +${item.evadeBonus || 0}%</p>
            <p>Шанс крита: +${item.critChanceBonus || 0}%</p>
            <div class="price">
                <img src="images/coin_silver.png" class="price-icon" onerror="this.style.display='none'"> ${item.price.silver}
                <img src="images/coin_gold.png" class="price-icon" onerror="this.style.display='none'"> ${item.price.gold}
            </div>
            <button onclick="buyItem('${item.id}', 'silver')">КУПИТЬ (серебро)</button>
            <button onclick="buyItem('${item.id}', 'gold')">КУПИТЬ (золото)</button>
        `;
        shopGrid.appendChild(itemElement);
    });
}

function switchShopTab(type) {
    document.querySelectorAll('.shop-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.shop-tab[data-type="${type}"]`).classList.add('active');
    renderShop();
}

document.addEventListener('DOMContentLoaded', () => {
    switchShopTab('weapon');
    renderBosses();
});

function addLog(text) {
    const log = document.getElementById('battle-log');
    log.innerHTML += '<div>' + text + '</div>';
    log.scrollTop = log.scrollHeight;
}

function saveGame() {
    localStorage.setItem('hero', JSON.stringify(hero));
}

function loadGame() {
    const savedHero = localStorage.getItem('hero');
    if (savedHero) {
        Object.assign(hero, JSON.parse(savedHero));
    }
    const savedDefeatedBosses = localStorage.getItem('defeatedBosses');
    if (savedDefeatedBosses) {
        defeatedBosses = JSON.parse(savedDefeatedBosses);
    }
}

loadGame();
updateStats();
renderShop();
function renderBosses() {
    const bossList = document.getElementById('boss-list');
    bossList.innerHTML = '';
    bosses.forEach((boss, index) => {
        const card = document.createElement('div');
        card.classList.add('boss-card');
        if (hero.level < boss.levelRequired) {
            card.classList.add('locked');
        } else if (defeatedBosses.includes(boss.id)) {
            card.classList.add('defeated');
        }
        card.innerHTML = `
            <img src="${boss.image}" alt="${boss.name}" class="boss-img-map" onerror="this.style.display='none'">
            <h2>${boss.name}</h2>
            <div>HP: ${boss.hp}, Урон: ${boss.damage}</div>
            <div>${boss.description}</div>
            <div>Требуемый уровень: ${boss.levelRequired}</div>
            <button class="btn-fight" onclick="startBattle(${index})">СРАЗИТЬСЯ</button>
        `;
        bossList.appendChild(card);
    });
}
