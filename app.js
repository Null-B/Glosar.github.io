/* ────────────────────────────────────────────────────────────────────────
   app.js – Glossary application
   - Persistent storage via localStorage
   - Alphabetical grouping
   - Live search with highlight
   - Add / edit / delete entries
   ──────────────────────────────────────────────────────────────────────── */

'use strict';

// ── Default seed data ────────────────────────────────────────────────────────
const SEED = [
  {
    term: 'API',
    definition:
      'Application Programming Interface – eine definierte Schnittstelle, über die Softwarekomponenten miteinander kommunizieren. APIs legen fest, welche Funktionen aufgerufen werden können und welche Datenformate dabei verwendet werden.',
    category: 'Informatik',
  },
  {
    term: 'Algorithmus',
    definition:
      'Eine endliche Folge von klar definierten Schritten zur Lösung einer Aufgabe oder Klasse von Aufgaben. Algorithmen bilden die Grundlage jeder Software.',
    category: 'Informatik',
  },
  {
    term: 'Agile',
    definition:
      'Agile Softwareentwicklung bezeichnet Vorgehensmodelle, die auf iterativer Entwicklung, enger Zusammenarbeit und schneller Anpassung an Änderungen basieren (z. B. Scrum, Kanban).',
    category: 'Methoden',
  },
  {
    term: 'Backend',
    definition:
      'Der serverseitige Teil einer Anwendung, der Daten verarbeitet, Geschäftslogik ausführt und über eine API mit dem Frontend kommuniziert.',
    category: 'Webentwicklung',
  },
  {
    term: 'Branch',
    definition:
      'In der Versionsverwaltung (z. B. Git) ein paralleler Entwicklungszweig, der unabhängige Änderungen am Code ermöglicht, ohne den Hauptzweig zu beeinflussen.',
    category: 'Versionsverwaltung',
  },
  {
    term: 'CI/CD',
    definition:
      'Continuous Integration / Continuous Delivery – Praxis der häufigen, automatisierten Integration von Code-Änderungen und deren Bereitstellung in Produktionsumgebungen.',
    category: 'DevOps',
  },
  {
    term: 'Container',
    definition:
      'Eine standardisierte Software-Einheit, die Code und alle seine Abhängigkeiten bündelt, sodass die Anwendung in verschiedenen Umgebungen zuverlässig läuft (z. B. Docker).',
    category: 'DevOps',
  },
  {
    term: 'CSS',
    definition:
      'Cascading Style Sheets – eine Stylesheet-Sprache zur Beschreibung des Aussehens von HTML-Dokumenten. CSS kontrolliert Layout, Farben, Schriften und Animationen.',
    category: 'Webentwicklung',
  },
  {
    term: 'Datenbank',
    definition:
      'Ein organisiertes System zur Speicherung, Verwaltung und Abfrage strukturierter Daten. Man unterscheidet zwischen relationalen (SQL) und nicht-relationalen (NoSQL) Datenbanken.',
    category: 'Informatik',
  },
  {
    term: 'Debugging',
    definition:
      'Der Prozess des Auffindens und Behebens von Fehlern (Bugs) in einem Computerprogramm.',
    category: 'Entwicklung',
  },
  {
    term: 'Framework',
    definition:
      'Ein strukturierter Rahmen aus Bibliotheken, Konventionen und Werkzeugen, der Entwicklern eine Grundstruktur für die Erstellung von Anwendungen bietet (z. B. React, Django, Spring).',
    category: 'Entwicklung',
  },
  {
    term: 'Frontend',
    definition:
      'Der clientseitige Teil einer Webanwendung, der im Browser des Nutzers läuft und die Benutzeroberfläche darstellt.',
    category: 'Webentwicklung',
  },
  {
    term: 'Git',
    definition:
      'Ein verteiltes Versionsverwaltungssystem, das Änderungen am Quellcode verfolgt und Zusammenarbeit mehrerer Entwickler an einem Projekt ermöglicht.',
    category: 'Versionsverwaltung',
  },
  {
    term: 'HTTP',
    definition:
      'Hypertext Transfer Protocol – das Protokoll für die Übertragung von Daten im World Wide Web. HTTPS ist die verschlüsselte Variante.',
    category: 'Netzwerk',
  },
  {
    term: 'IDE',
    definition:
      'Integrated Development Environment – eine Entwicklungsumgebung, die Editor, Compiler, Debugger und weitere Werkzeuge in einer Anwendung vereint (z. B. VS Code, IntelliJ).',
    category: 'Werkzeuge',
  },
  {
    term: 'JSON',
    definition:
      'JavaScript Object Notation – ein leichtgewichtiges, textbasiertes Datenaustauschformat, das für Menschen leicht lesbar und für Maschinen leicht parsbar ist.',
    category: 'Datenformate',
  },
  {
    term: 'Kubernetes',
    definition:
      'Ein Open-Source-System zur Automatisierung von Bereitstellung, Skalierung und Verwaltung containerisierter Anwendungen.',
    category: 'DevOps',
  },
  {
    term: 'Library',
    definition:
      'Eine Sammlung wiederverwendbarer Codebausteine, die spezifische Funktionalitäten bereitstellen und in eigene Projekte eingebunden werden können.',
    category: 'Entwicklung',
  },
  {
    term: 'Microservices',
    definition:
      'Ein Architekturstil, bei dem eine Anwendung als Sammlung kleiner, unabhängig einsetzbarer Dienste gebaut wird, die jeweils eine spezifische Geschäftsfunktion erfüllen.',
    category: 'Architektur',
  },
  {
    term: 'Open Source',
    definition:
      'Software, deren Quellcode öffentlich zugänglich ist und die von jedermann genutzt, verändert und weiterverbreitet werden darf.',
    category: 'Konzepte',
  },
  {
    term: 'Pull Request',
    definition:
      'Ein Mechanismus in Git-basierten Plattformen (z. B. GitHub), mit dem Entwickler Änderungen aus einem Branch in einen anderen überführen und dabei Code-Reviews anfordern können.',
    category: 'Versionsverwaltung',
  },
  {
    term: 'Repository',
    definition:
      'Ein zentraler Speicherort für den Quellcode eines Projekts sowie dessen Geschichte und Konfigurationsdateien, verwaltet durch ein Versionsverwaltungssystem.',
    category: 'Versionsverwaltung',
  },
  {
    term: 'REST',
    definition:
      'Representational State Transfer – ein Architekturstil für verteilte Systeme, der zustandslose Kommunikation über Standard-HTTP-Methoden (GET, POST, PUT, DELETE) definiert.',
    category: 'Architektur',
  },
  {
    term: 'Responsive Design',
    definition:
      'Ein Designansatz für Websites, bei dem das Layout flexibel auf verschiedene Bildschirmgrößen und Geräte reagiert.',
    category: 'Webentwicklung',
  },
  {
    term: 'Scrum',
    definition:
      'Ein agiles Rahmenwerk für die Softwareentwicklung mit festen Iterationen (Sprints), definierten Rollen (Product Owner, Scrum Master, Team) und regelmäßigen Zeremonien.',
    category: 'Methoden',
  },
  {
    term: 'SQL',
    definition:
      'Structured Query Language – die Standardsprache zur Verwaltung und Abfrage relationaler Datenbanken.',
    category: 'Datenbanken',
  },
  {
    term: 'UI',
    definition:
      'User Interface – die visuelle Schnittstelle, über die Benutzer mit einer Software interagieren. Umfasst Layouts, Schaltflächen, Formulare und andere visuelle Elemente.',
    category: 'Design',
  },
  {
    term: 'UX',
    definition:
      'User Experience – das gesamte Erlebnis eines Nutzers bei der Interaktion mit einem Produkt, einschließlich Benutzerfreundlichkeit, Zugänglichkeit und Emotionen.',
    category: 'Design',
  },
  {
    term: 'Versionierung',
    definition:
      'Die Verwaltung und Nachverfolgung von Änderungen an Dateien oder Code über die Zeit, um frühere Zustände wiederherstellen zu können.',
    category: 'Entwicklung',
  },
  {
    term: 'Webhook',
    definition:
      'Ein Mechanismus, bei dem eine Anwendung automatisch HTTP-Benachrichtigungen an eine URL sendet, wenn ein bestimmtes Ereignis eintritt.',
    category: 'Netzwerk',
  },
];

// ── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = 'glossar_terms';

function loadTerms() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveTerms(terms) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
  } catch {
    // Silently ignore storage errors (e.g. private mode quota)
  }
}

// ── State ────────────────────────────────────────────────────────────────────
let terms = loadTerms() ?? SEED.slice();

// ── DOM refs ─────────────────────────────────────────────────────────────────
const searchInput   = document.getElementById('search');
const addBtn        = document.getElementById('add-btn');
const formSection   = document.getElementById('form-section');
const formTitle     = document.getElementById('form-title');
const termForm      = document.getElementById('term-form');
const editIndexInput = document.getElementById('edit-index');
const inputTerm     = document.getElementById('input-term');
const inputDef      = document.getElementById('input-def');
const inputCategory = document.getElementById('input-category');
const cancelBtn     = document.getElementById('cancel-btn');
const alphaNav      = document.getElementById('alpha-nav');
const glossaryEl    = document.getElementById('glossary');
const noResults     = document.getElementById('no-results');
const termCount     = document.getElementById('term-count');

// ── Utilities ────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const safeQ   = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escaped.replace(new RegExp(`(${safeQ})`, 'gi'), '<mark>$1</mark>');
}

function normalise(str) {
  return str.trim().toLowerCase();
}

function groupByLetter(list) {
  const groups = {};
  for (const item of list) {
    const letter = item.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(item);
  }
  return groups;
}

// ── Render ───────────────────────────────────────────────────────────────────
function render(query = '') {
  const q = normalise(query);

  // Filter
  const filtered = q
    ? terms.filter(
        (t) =>
          normalise(t.term).includes(q) ||
          normalise(t.definition).includes(q) ||
          normalise(t.category ?? '').includes(q),
      )
    : terms.slice();

  // Sort alphabetically
  filtered.sort((a, b) => a.term.localeCompare(b.term, 'de', { sensitivity: 'base' }));

  termCount.textContent = terms.length;

  // No results
  if (filtered.length === 0) {
    glossaryEl.innerHTML = '';
    alphaNav.innerHTML   = '';
    noResults.classList.remove('hidden');
    return;
  }
  noResults.classList.add('hidden');

  const groups = groupByLetter(filtered);
  const letters = Object.keys(groups).sort();

  // Alpha nav
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  alphaNav.innerHTML = alphabet
    .map((l) =>
      letters.includes(l)
        ? `<a href="#letter-${l}" title="${l}">${l}</a>`
        : `<span class="disabled" aria-hidden="true">${l}</span>`,
    )
    .join('');

  // Glossary groups
  glossaryEl.innerHTML = letters
    .map((letter) => {
      const items = groups[letter];
      const cards = items
        .map((item) => {
          const idx = terms.indexOf(item);
          const categoryTag = item.category
            ? `<span class="term-category">${escapeHtml(item.category)}</span>`
            : '';
          return `
          <details class="term-card">
            <summary>
              <span class="term-name">${highlight(item.term, query)}</span>
              ${categoryTag}
              <span class="term-chevron">▶</span>
            </summary>
            <div class="term-body">
              <p>${highlight(item.definition, query)}</p>
              <div class="term-actions">
                <button class="btn-icon" data-action="edit" data-idx="${idx}">✏️ Bearbeiten</button>
                <button class="btn-icon delete" data-action="delete" data-idx="${idx}">🗑️ Löschen</button>
              </div>
            </div>
          </details>`;
        })
        .join('');

      return `
        <div class="alpha-group" id="letter-${letter}">
          <div class="alpha-group-letter">${letter}</div>
          <div class="term-list">${cards}</div>
        </div>`;
    })
    .join('');
}

// ── Form helpers ─────────────────────────────────────────────────────────────
function openForm(editIdx = null) {
  formSection.classList.remove('hidden');
  formTitle.textContent =
    editIdx !== null ? 'Begriff bearbeiten' : 'Neuen Begriff hinzufügen';
  editIndexInput.value = editIdx !== null ? editIdx : '';

  if (editIdx !== null) {
    const t = terms[editIdx];
    inputTerm.value     = t.term;
    inputDef.value      = t.definition;
    inputCategory.value = t.category ?? '';
  } else {
    termForm.reset();
  }

  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  inputTerm.focus();
}

function closeForm() {
  formSection.classList.add('hidden');
  termForm.reset();
  [inputTerm, inputDef].forEach((el) => el.classList.remove('invalid'));
  editIndexInput.value = '';
}

// ── CRUD ─────────────────────────────────────────────────────────────────────
function saveTerm(e) {
  e.preventDefault();

  const termVal = inputTerm.value.trim();
  const defVal  = inputDef.value.trim();
  const catVal  = inputCategory.value.trim();

  let valid = true;
  if (!termVal) { inputTerm.classList.add('invalid'); valid = false; }
  else           inputTerm.classList.remove('invalid');
  if (!defVal)  { inputDef.classList.add('invalid'); valid = false; }
  else           inputDef.classList.remove('invalid');

  if (!valid) return;

  const editIdx = editIndexInput.value !== '' ? parseInt(editIndexInput.value, 10) : null;
  if (editIdx !== null && (isNaN(editIdx) || editIdx < 0 || editIdx >= terms.length)) {
    closeForm();
    return;
  }

  if (editIdx !== null) {
    terms[editIdx] = { term: termVal, definition: defVal, category: catVal || undefined };
  } else {
    terms.push({ term: termVal, definition: defVal, category: catVal || undefined });
  }

  saveTerms(terms);
  closeForm();
  render(searchInput.value);
}

function handleTermAction(idx, action) {
  if (idx < 0 || idx >= terms.length) return;
  if (action === 'edit') {
    openForm(idx);
  } else if (action === 'delete') {
    if (!confirm(`„${escapeHtml(terms[idx].term)}" wirklich löschen?`)) return;
    terms.splice(idx, 1);
    saveTerms(terms);
    render(searchInput.value);
  }
}

// ── Event listeners ──────────────────────────────────────────────────────────
addBtn.addEventListener('click', () => openForm());
cancelBtn.addEventListener('click', closeForm);
termForm.addEventListener('submit', saveTerm);

searchInput.addEventListener('input', () => render(searchInput.value));

// Event delegation for edit/delete buttons inside the glossary
glossaryEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const idx    = parseInt(btn.dataset.idx, 10);
  const action = btn.dataset.action;
  if (!isNaN(idx)) handleTermAction(idx, action);
});

// ── Boot ─────────────────────────────────────────────────────────────────────
render();
