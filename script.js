/**
 * SARIF TACHAMO PORTFOLIO V4.0 — INTERACTIVE ENGINE + FULL CRUD ADMIN
 */

document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    initCanvases();
    initLoadingSequence();
    window.addEventListener('sys-ready', () => {
        initTerminal();
        initAnimations();
        initNavigation();
        initAdminPortal();
        initThreatMonitor();
        renderAll();
        initContactForm();
    });
});

/* ═══════════════════════════════════════════════════════════
   DATABASE LAYER
═══════════════════════════════════════════════════════════ */
const DB = {
    get: k => JSON.parse(localStorage.getItem(k) || 'null'),
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    list: k => JSON.parse(localStorage.getItem(k) || '[]'),
    add: (k, r) => { const l = DB.list(k); r.id = Date.now(); l.push(r); DB.set(k, l); return r; },
    update: (k, r) => { DB.set(k, DB.list(k).map(x => x.id === r.id ? r : x)); },
    remove: (k, id) => { DB.set(k, DB.list(k).filter(x => x.id !== id)); }
};

/* ═══════════════════════════════════════════════════════════
   DEFAULT DATA
═══════════════════════════════════════════════════════════ */
function initStorage() {
    if (!DB.get('portfolio_profile')) DB.set('portfolio_profile', {
        name: 'SARIF TACHAMO',
        role: 'Cybersecurity Expert | Researcher | AI/ML Enthusiast | Web Developer',
        bio: 'Cybersecurity-focused computer engineering undergraduate with hands-on experience in ethical hacking, penetration testing, cryptography, and secure web/app development. Skilled in designing encrypted platforms, cyber threat simulations, and system automation tools. Adept at combining AI/ML techniques with cybersecurity solutions to enhance threat detection and defense.',
        email: 'sariftachamo.job@gmail.com', phone: '+977-9840531722',
        location: 'Bhaktapur, Nepal', linkedin: '#', github: '#'
    });

    if (!DB.list('portfolio_projects').length) DB.set('portfolio_projects', [
        { id: 1, title: 'Asymmetric Cryptographic Platform', category: 'offensive', desc: 'RSA-2048 + AES-256-GCM messaging with TTL self-destruction.', tech: 'Python, Flask, PyCryptodome', link: '' },
        { id: 2, title: 'LSB Steganography Engine', category: 'offensive', desc: 'Hiding payloads in pixels with Zlib compression.', tech: 'Python, Pillow, Zlib', link: '' },
        { id: 3, title: 'Neural Nepali Recognizer', category: 'defensive', desc: 'Ran2Dev model for Nepali character recognition (95% acc).', tech: 'AI/ML, LeNet-5', link: '' },
        { id: 4, title: 'DoS Simulator', category: 'offensive', desc: 'Differentiating UDP/DNS amp and TLS/JA3 compute attacks.', tech: 'Python, Scapy', link: '' },
        { id: 5, title: 'Employee Management System', category: 'defensive', desc: 'GPS-validated attendance & automated payroll engine.', tech: 'Flask, Supabase, PostgreSQL', link: '' }
    ]);

    if (!DB.list('portfolio_experience').length) DB.set('portfolio_experience', [
        { id: 1, role: 'CYBERSECURITY ENGINEER', org: 'INDEPENDENT / INTERN PROJECTS', date: '2023 - PRESENT', details: 'Developed secure architectures, encrypted platforms, and cyber threat simulations.', metrics: 'Haversine GPS-validated attendance\nLSB Steganography Engine w/ Zlib\nDoS Simulation: UDP/DNS & TLS/JA3' },
        { id: 2, role: 'PEER TECHNICAL MENTOR', org: 'KHWOPA ENGINEERING COLLEGE', date: '2023 - 2024', details: 'Guided student projects and conducted security-focused workshops.', metrics: 'Mentored junior students in PenTesting\nSecure Coding workshops\nTechnical system design guidance' }
    ]);

    if (!DB.list('portfolio_education').length) DB.set('portfolio_education', [
        { id: 1, degree: 'B.Sc. in Computer Engineering', school: 'Khwopa Engineering College', date: '2021 - 2025', gpa: '3.0/4.0' },
        { id: 2, degree: '+2 Science', school: 'Khwopa Secondary School', date: '2018 - 2019', gpa: '2.85/4.0' },
        { id: 3, degree: 'SEE', school: 'Prabhat Secondary School', date: '2018', gpa: '3.35/4.0' }
    ]);

    if (!DB.list('portfolio_certs').length) DB.set('portfolio_certs', [
        { id: 1, name: 'CyberSecurity Workshop', issuer: 'Global IOT Nepal' },
        { id: 2, name: 'Generative AI Fundamentals', issuer: 'Databricks' },
        { id: 3, name: 'AI/ML Workshop', issuer: 'KEC' },
        { id: 4, name: 'CyberSecurity Workshop', issuer: 'Security Pal' }
    ]);

    if (!DB.list('portfolio_skills').length) DB.set('portfolio_skills', [
        { id: 1, category: 'PROGRAMMING', tags: 'Python, JavaScript, TypeScript, HTML/CSS, SQL' },
        { id: 2, category: 'CYBER_SECURITY', tags: 'Kali Linux, PenTesting, Cryptography, Network Traffic Analysis, Threat Modeling' },
        { id: 3, category: 'FRAMEWORKS_TOOLS', tags: 'Flask, Next.js, Tkinter, PyCryptodome, Cloudflare, Git' },
        { id: 4, category: 'AI_ML', tags: 'LeNet-5, Ensemble Models, Character Recognition' }
    ]);

    if (!DB.list('portfolio_blogs').length) DB.set('portfolio_blogs', [
        { id: 1, title: 'Bypassing EDR with Reflective Injection', date: '2026-03-10', category: 'offensive', summary: 'Techniques for evading endpoint detection using reflective DLL injection.' },
        { id: 2, title: 'Zero Trust vs Legacy VPN', date: '2026-03-05', category: 'defensive', summary: 'Comparing modern zero-trust architectures against traditional VPN solutions.' }
    ]);
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC PORTFOLIO RENDERERS
═══════════════════════════════════════════════════════════ */
function renderAll() {
    renderProfile(); renderSkills(); renderExperience();
    renderEducation(); renderCerts(); renderProjects(); renderBlogs();
}

function renderProfile() {
    const p = DB.get('portfolio_profile'); if (!p) return;
    const $ = s => document.querySelector(s);
    if ($('.decrypting')) { $('.decrypting').textContent = p.name; $('.decrypting').setAttribute('data-text', p.name); }
    if ($('.hero-role')) $('.hero-role').textContent = '> ' + p.role;
    if ($('.hero-contact')) $('.hero-contact').textContent = `${p.email} | ${p.phone} | ${p.location}`;
    if ($('#about-summary')) $('#about-summary').textContent = p.bio;
    if ($('#dossier-name')) $('#dossier-name').textContent = p.name;   // querySelector with # works
    const dname = document.getElementById('dossier-name');
    if (dname) dname.textContent = p.name;
    const social = document.getElementById('social-links');
    if (social) social.innerHTML = `<a href="${p.linkedin}" class="neon-text-cyan">LinkedIn</a> | <a href="${p.github}" class="neon-text-cyan">GitHub</a>`;
    const emailEl = document.getElementById('contact-email');
    if (emailEl) emailEl.textContent = p.email;
    const phoneEl = document.getElementById('contact-phone');
    if (phoneEl) phoneEl.textContent = p.phone;
    const locEl = document.getElementById('contact-location');
    if (locEl) locEl.textContent = p.location;
}

function renderSkills() {
    const c = document.getElementById('skills-grid'); if (!c) return;
    c.innerHTML = DB.list('portfolio_skills').map(s => `
        <div class="glass-card">
            <h3 class="neon-text-cyan">${s.category}</h3>
            <div class="tech-tags">${s.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div>
        </div>`).join('');
}

function renderExperience() {
    const c = document.getElementById('experience-list'); if (!c) return;
    c.innerHTML = DB.list('portfolio_experience').map(e => `
        <div class="experience-card glass-card" style="margin-bottom:1.5rem">
            <div class="exp-header" style="display:flex;justify-content:space-between">
                <h4 class="neon-text">${e.role}</h4><span class="tag">[${e.date}]</span>
            </div>
            <p class="neon-text-cyan">${e.org}</p>
            <p style="font-size:.85rem;margin-top:.5rem;opacity:.8">${e.details}</p>
            <div style="margin-top:.8rem;display:flex;flex-direction:column;gap:.3rem">
                ${(e.metrics || '').split('\n').map(m => m.trim() ? `<span style="font-size:.75rem;opacity:.6">> ${m.trim()}</span>` : '').join('')}
            </div>
        </div>`).join('');
}

function renderEducation() {
    const c = document.getElementById('education-list'); if (!c) return;
    c.innerHTML = DB.list('portfolio_education').map(e => `
        <div class="experience-card glass-card" style="margin-bottom:1.5rem">
            <div class="exp-header" style="display:flex;justify-content:space-between">
                <h4 class="neon-text">${e.degree}</h4><span class="tag">[${e.date}]</span>
            </div>
            <p class="neon-text-cyan">${e.school}</p>
            <p style="font-size:.8rem;opacity:.7">GPA: ${e.gpa}</p>
        </div>`).join('');
}

function renderCerts() {
    const c = document.getElementById('certs-list'); if (!c) return;
    c.innerHTML = DB.list('portfolio_certs').map(cert => `
        <li>> ${cert.name} — <span style="opacity:.6">${cert.issuer}</span></li>`).join('');
}

function renderProjects(filter = 'all') {
    const c = document.getElementById('projects-grid'); if (!c) return;
    const all = DB.list('portfolio_projects');
    const items = filter === 'all' ? all : all.filter(p => p.category === filter);
    c.style.opacity = '0';
    setTimeout(() => {
        c.innerHTML = items.length ? items.map(p => `
            <div class="glass-card stagger-item" data-category="${p.category}">
                <h3 class="neon-text-cyan">${p.title}</h3>
                <p>${p.desc}</p>
                <div class="tech-tags">${p.tech.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div>
                ${p.link ? `<a href="${p.link}" target="_blank" class="neon-text-cyan" style="font-size:.8rem;display:block;margin-top:.5rem">> VIEW_PAYLOAD</a>` : ''}
            </div>`).join('') : `<p style="opacity:.5;font-size:.9rem">> NO_PAYLOADS_FOUND_IN_SECTOR</p>`;
        c.style.opacity = '1'; c.style.transition = 'opacity .3s ease';
    }, 200);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        };
    });
}

function renderBlogs() {
    const c = document.getElementById('blog-grid'); if (!c) return;
    c.innerHTML = DB.list('portfolio_blogs').map(b => `
        <div class="glass-card stagger-item">
            <h3 class="neon-text-cyan">${b.title}</h3>
            <p style="font-size:.75rem;opacity:.5;margin-bottom:.5rem">${b.date} · <span class="tag">${b.category}</span></p>
            <p style="font-size:.85rem;opacity:.8">${b.summary}</p>
        </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════
   LOADING SEQUENCE (4-PHASE)
═══════════════════════════════════════════════════════════ */
function initLoadingSequence() {
    const screen = document.getElementById('loading-screen');
    const p0 = document.getElementById('phase-0'), p1 = document.getElementById('phase-1'),
        p2 = document.getElementById('phase-2'), p3 = document.getElementById('phase-3');
    const mCanvas = document.getElementById('matrix-bg'), nCanvas = document.getElementById('network-bg');
    let loadCompleted = false;
    const fallbackTimeout = setTimeout(forceComplete, 20000);

    if (mCanvas) mCanvas.classList.add('hidden');
    if (nCanvas) nCanvas.classList.add('hidden');

    p0.classList.remove('hidden');
    const p0Bar = document.getElementById('phase-0-bar');
    p0Bar.style.width = '0%';
    setTimeout(() => { p0Bar.style.transition = 'width 1s linear'; p0Bar.style.width = '100%'; }, 500);
    setTimeout(() => {
        p0.classList.add('exit');
        setTimeout(() => { p0.classList.add('hidden'); startPhase1(); }, 800);
    }, 1800);

    function forceComplete() {
        if (loadCompleted) return;
        loadCompleted = true;
        if (p0) p0.classList.add('hidden');
        if (p1) p1.classList.add('hidden');
        if (p2) p2.classList.add('hidden');
        if (p3) p3.classList.add('hidden');
        screen.style.opacity = '0';
        screen.style.display = 'none';
        document.body.classList.remove('loading');
        if (mCanvas) mCanvas.classList.remove('hidden');
        if (nCanvas) nCanvas.classList.remove('hidden');
        window.dispatchEvent(new CustomEvent('sys-ready'));
    }

    function startPhase1() {
        p1.classList.remove('hidden');
        const main = document.getElementById('reveal-main'), sub = document.getElementById('reveal-sub'), final = document.getElementById('reveal-final');
        main.style.color = 'var(--neon-green)'; sub.style.color = 'var(--neon-green)';
        final.classList.add('hidden'); final.innerHTML = '';
        const text1 = "I CAN SEE YOU!!!";
        main.innerHTML = text1.split('').map(c => `<span class="reveal-char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
        const chars = main.querySelectorAll('.reveal-char');
        chars.forEach((ch, i) => setTimeout(() => ch.classList.add('active'), i * 100));
        const stage1Duration = chars.length * 100 + 800;
        setTimeout(() => {
            sub.classList.add('animate-pulse');
            typeSubtext("AND", 60, () => {
                setTimeout(() => {
                    typeSubtext("I WILL FIND YOU ANYWHERE AND ANYHOW,", 60, () => {
                        setTimeout(() => {
                            typeSubtext("NO MATTER WHAT YOU DO OR WHERE YOU HIDE,", 60, () => {
                                setTimeout(() => {
                                    typeSubtext("I WILL CATCH YOU AND DESTROY YOU !!!", 60, () => {
                                        setTimeout(() => {
                                            sub.classList.remove('animate-pulse');
                                            final.classList.remove('hidden');
                                            const pulseBg = document.querySelector('.green-pulse-bg');
                                            pulseBg.style.animationDuration = '1.5s';
                                            pulseBg.style.background = 'radial-gradient(circle,rgba(0,255,65,0.2) 0%,rgba(0,0,0,0) 70%)';
                                            typeCustomText(final, "SYSTEM DETECTED", 50, () => { setTimeout(startPhase2, 1500); });
                                        }, 800);
                                    });
                                }, 600);
                            });
                        }, 600);
                    });
                }, 600);
            });
        }, stage1Duration);
    }

    function typeCustomText(el, text, speed, cb) {
        el.innerHTML = ''; let i = 0;
        const iv = setInterval(() => { el.innerHTML += text[i]; i++; if (i >= text.length) { clearInterval(iv); if (cb) cb(); } }, speed);
    }

    function startPhase2() {
        p1.classList.add('hidden'); p2.classList.remove('hidden');
        const term = document.getElementById('boot-terminal'), bar = document.getElementById('boot-progress');
        const lines = ['INITIALIZE_FIREWALL,BYPASS_AUTH_PROTOCOL,INJECT_PAYLOAD,TRACE_IP_ORIGIN,DEPLOY_BACKDOOR'];
        let idx = 0;
        function pushLine() {
            if (idx >= lines.length) return;
            const line = document.createElement('div'); line.className = 'boot-line';
            line.innerHTML = `<span>> ${lines[idx]}</span><span class="line-status busy">[BUSY]</span>`;
            term.appendChild(line);
            const status = line.querySelector('.line-status');
            setTimeout(() => { status.textContent = '[OK]'; status.className = 'line-status ok'; idx++; setTimeout(pushLine, 100); }, 400);
        }
        pushLine();
        let prog = 0;
        const iv = setInterval(() => { prog += 2; bar.style.width = prog + '%'; if (prog >= 100) { clearInterval(iv); setTimeout(startPhase3, 800); } }, 80);
    }

    function startPhase3() {
        p2.classList.add('hidden'); p3.classList.remove('hidden');
        const msg = document.getElementById('welcome-msg');
        animateDecrypt(msg);
        setTimeout(() => { msg.classList.add('focused'); setTimeout(completeLoad, 1500); }, 1500);
    }

    function typeSubtext(text, speed, cb) {
        const sub = document.getElementById('reveal-sub'); sub.innerHTML = ''; let i = 0;
        const iv = setInterval(() => { sub.innerHTML += text[i]; i++; if (i >= text.length) { clearInterval(iv); if (cb) cb(); } }, speed);
    }

    function completeLoad() {
        if (loadCompleted) return;
        loadCompleted = true;
        clearTimeout(fallbackTimeout);
        screen.style.opacity = '0';
        setTimeout(() => {
            screen.style.display = 'none'; document.body.classList.remove('loading');
            if (mCanvas) mCanvas.classList.remove('hidden');
            if (nCanvas) nCanvas.classList.remove('hidden');
            window.dispatchEvent(new CustomEvent('sys-ready'));
        }, 1000);
    }
}

/* ═══════════════════════════════════════════════════════════
   TERMINAL ENGINE
═══════════════════════════════════════════════════════════ */
function initTerminal() {
    const input = document.getElementById('terminal-input'), output = document.getElementById('terminal-output'), body = document.getElementById('terminal-body');

    const commands = {
        help: () => 'AVAILABLE_COMMANDS:\nhelp - Show this help menu\nls - List directory contents\ncat [file] - Read file contents\nclear - Clear terminal screen\nstatus - Check system health\nadmin - Access control gate\nwhoami - Current operative info\nuptime - System uptime details\nthreats - Active threat monitor\nprojects - Project summary feed\nnmap - Network recon scan\nvuln-scan - Vulnerability assessment\nneofetch - System overview\nlogs - System event logs',
        ls: () => 'RECON_LOGS  PAYLOADS  INTEL_FEED  CORE_ASSETS  THREAT_MONITOR  id_rsa.pub',
        clear: () => { output.innerHTML = ''; return null; },
        'cat bio': () => { const p = DB.get('portfolio_profile'); return p ? `SUBJECT: ${p.name}\nROLE: ${p.role}\nSTATUS: ACTIVE\nLOCATION: ${p.location}` : 'BIO_NOT_FOUND'; },
        'cat payloads': () => '1. RSA-2048-GEN\n2. LSB-STEGO-v2\n3. JA3-BYPASS-TOOL\n4. NEURAL-NEP-RECON',
        'cat logs': () => '[2024-05-03 14:22] SSH LOGIN SUCCESS: 192.168.1.1\n[2024-05-03 16:45] BLOCKING_IP: 220.181.x.x (DDoS_ATTEMPT)\n[2024-05-03 17:01] FIREWALL_RULE_UPDATED: Port 443 active',
        status: () => 'SYSTEM_STATUS: NOMINAL // ALL_NODES_ACTIVE // SIGNAL: SECURE // THREAT_LEVEL: LOW',
        admin: () => { toggleView('admin'); return 'REDIRECTING_TO_CONTROL_GATE...'; },
        whoami: () => 'root@sarif-sec:~$ OPERATIVE_LEVEL: ALPHA-7 // CLEARANCE: TOP_SECRET',
        uptime: () => `SYSTEM_UPTIME: 247 DAYS // LAST_RESTART: 2024-01-01 // KERNEL: SARIF_OS_4.0`,
        threats: () => 'ACTIVE_THREATS: 3 // BLOCKED_ATTEMPTS: 2,847 // DEFENSE_STATUS: NOMINAL',
        projects: () => 'TOTAL_PROJECTS: 5 // OFFENSIVE: 2 // DEFENSIVE: 2 // RESEARCH: 1',
        nmap: () => 'Starting Nmap 7.92...\nNmap scan report for bhaktapur.local\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http\n443/tcp open https\nNmap done: 1 IP address scanned.',
        'vuln-scan': () => 'INITIATING_VULN_SCAN...\n[##########] 100%\nRESULTS: 0 CRITICAL, 0 HIGH, 1 MEDIUM (Outdated SSL Header)\nSTATUS: SYSTEM_SECURE',
        neofetch: () => `
        <span class="neon-text-cyan">      .---.      </span> <span class="neon-text">OS:</span> Sarif-OS v4.0.1
        <span class="neon-text-cyan">     /     \\     </span> <span class="neon-text">Host:</span> Cyber_Neural_Link_v7
        <span class="neon-text-cyan">    | () () |    </span> <span class="neon-text">Kernel:</span> 5.15.0-72-generic
        <span class="neon-text-cyan">     \\  ^  /     </span> <span class="neon-text">Shell:</span> bash 5.1.16
        <span class="neon-text-cyan">      |||||      </span> <span class="neon-text">CPU:</span> Neural-NPU (8) @ 4.2GHz
        <span class="neon-text-cyan">      '|||'      </span> <span class="neon-text">Memory:</span> 1.2GB / 32GB
        `,
        sudo: (args) => {
            if (!args) return 'usage: sudo [command]';
            return `[sudo] password for root: ********** \nACCESS_GRANTED. EXECUTING: ${args}`;
        }
    };

    input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const fullVal = input.value.trim();
        const val = fullVal.toLowerCase();

        let response;
        if (val.startsWith('sudo ')) {
            response = commands.sudo(fullVal.substring(5));
        } else if (commands[val]) {
            response = commands[val]();
        } else if (val.startsWith('cat ')) {
            response = commands[val] ? commands[val]() : `FILE_NOT_FOUND: ${fullVal.substring(4)}`;
        } else {
            response = `COMMAND_NOT_FOUND: ${val}`;
        }

        if (val !== 'clear') {
            const line = document.createElement('p');
            line.innerHTML = `<span class="prompt">root@sarif:~#</span> ${input.value}`;
            output.appendChild(line);
            if (response) {
                const res = document.createElement('div');
                res.className = 'terminal-response';
                if (val === 'help') {
                    res.classList.add('help-response');
                    output.appendChild(res);
                    typeTerminalLines(response.split('\n'), res);
                } else {
                    res.innerHTML = response.replace(/\n/g, '<br>');
                    output.appendChild(res);
                }
            }
        }
        input.value = '';
        body.scrollTop = body.scrollHeight;
    });

    typeTerminal('> SECURE_SESSION_STARTED\n> TYPE "HELP" TO BEGIN_RECON');
}

function typeTerminalLines(lines, container) {
    let i = 0;
    function next() {
        if (i >= lines.length) return;
        const lineEl = document.createElement('div');
        lineEl.className = 'terminal-line-item';
        container.appendChild(lineEl);

        // Trigger CSS transition
        setTimeout(() => lineEl.classList.add('active'), 10);

        // Decrypt effect
        const text = lines[i];
        const chars = '!@#$%^&*()_+1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let iterations = 0;

        const interval = setInterval(() => {
            lineEl.textContent = text.split('')
                .map((char, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');

            if (iterations >= text.length) {
                clearInterval(interval);
                i++;
                setTimeout(next, 50); // Delay between lines
            }
            iterations += 1 / 2;
        }, 30);
    }
    next();
}

function typeTerminal(text) {
    const output = document.getElementById('terminal-output'); let i = 0;
    const iv = setInterval(() => { output.innerHTML += text[i] === '\n' ? '<br>' : text[i]; i++; if (i >= text.length) clearInterval(iv); }, 30);
}

/* ═══════════════════════════════════════════════════════════
   CANVASES
═══════════════════════════════════════════════════════════ */
function initCanvases() {
    const mCanvas = document.getElementById('matrix-bg'), nCanvas = document.getElementById('network-bg');
    const mCtx = mCanvas.getContext('2d'), nCtx = nCanvas.getContext('2d');
    function resize() { mCanvas.width = nCanvas.width = window.innerWidth; mCanvas.height = nCanvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    // Characters: Katakana + Alphanumeric + Symbols
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const alphabet = katakana + latin + nums + symbols;
    const fontSize = 24;
    const columns = Math.floor(mCanvas.width / fontSize);
    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));
    const speeds = Array(columns).fill(1).map(() => Math.random() * .5 + .5);
    function drawMatrix() {
        mCtx.fillStyle = 'rgba(0,0,0,0.05)'; mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
        mCtx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            const x = i * fontSize, y = drops[i] * fontSize;
            if (Math.random() > .98) { mCtx.shadowBlur = 4; mCtx.shadowColor = 'rgba(255,255,255,.1)'; mCtx.fillStyle = 'rgba(192,224,192,.5)'; }
            else { mCtx.shadowBlur = 0; mCtx.fillStyle = 'rgba(0,92,12,.3)'; }
            mCtx.fillText(text, x, y);
            if (y > mCanvas.height && Math.random() > .975) drops[i] = 0;
            drops[i] += speeds[i];
        }
        mCtx.shadowBlur = 0;
    }
    const particles = Array(60).fill().map(() => ({ x: Math.random() * nCanvas.width, y: Math.random() * nCanvas.height, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5 }));
    function drawNetwork() {
        nCtx.clearRect(0, 0, nCanvas.width, nCanvas.height); nCtx.strokeStyle = 'rgba(0,229,255,.1)';
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > nCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > nCanvas.height) p.vy *= -1;
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j], d = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (d < 150) { nCtx.beginPath(); nCtx.moveTo(p.x, p.y); nCtx.lineTo(p2.x, p2.y); nCtx.stroke(); }
            }
        });
        requestAnimationFrame(drawNetwork);
    }
    setInterval(drawMatrix, 40); drawNetwork();
}

/* ═══════════════════════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════════════════════ */
function initAnimations() {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); animateDecrypt(e.target); } }), { threshold: .2 });
    document.querySelectorAll('.decrypting').forEach(el => obs.observe(el));
    const obs2 = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: .1 });
    document.querySelectorAll('.stagger-in').forEach(el => obs2.observe(el));
}
function animateDecrypt(el) {
    const orig = el.getAttribute('data-text') || el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let it = 0;
    const iv = setInterval(() => {
        el.textContent = orig.split('').map((c, i) => i < it ? orig[i] : chars[Math.floor(Math.random() * chars.length)]).join('');
        if (it >= orig.length) clearInterval(iv);
        it += 1 / 3;
    }, 40);
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════ */
function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            if (e.target.id === 'admin-trigger') return;
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   ADMIN PORTAL — LOGIN
═══════════════════════════════════════════════════════════ */
function initAdminPortal() {
    const trigger = document.getElementById('admin-trigger'), logout = document.getElementById('logout-btn');
    if (trigger) trigger.addEventListener('click', () => toggleView('admin'));
    if (logout) logout.addEventListener('click', () => toggleView('portfolio'));
    document.getElementById('admin-login-form').addEventListener('submit', e => {
        e.preventDefault();
        const pass = document.getElementById('admin-pass').value;
        const fb = document.getElementById('login-feedback');
        if (pass === 'AdmiN@369') {
            fb.innerHTML = '<span class="status-online"></span> ACCESS_GRANTED';
            setTimeout(() => {
                document.getElementById('admin-login').classList.add('hidden');
                document.getElementById('admin-dashboard').classList.remove('hidden');
                initAdminDashboard();
            }, 800);
        } else {
            fb.innerHTML = '<span style="color:var(--neon-red)">ACCESS_DENIED_INVALID_KEY</span>';
        }
    });
}

/* ═══════════════════════════════════════════════════════════
   ADMIN — SECTION SCHEMAS
═══════════════════════════════════════════════════════════ */
const SCHEMAS = {
    projects: {
        key: 'portfolio_projects', label: 'PROJECT',
        fields: [
            { k: 'title', l: 'Title', t: 'text' },
            { k: 'category', l: 'Category', t: 'select', options: ['offensive', 'defensive'] },
            { k: 'desc', l: 'Description', t: 'textarea' },
            { k: 'tech', l: 'Technologies (comma-sep)', t: 'text' },
            { k: 'link', l: 'Project Link (optional)', t: 'text' }
        ],
        display: r => `${r.title}`
    },
    experience: {
        key: 'portfolio_experience', label: 'EXPERIENCE',
        fields: [
            { k: 'role', l: 'Role/Title', t: 'text' },
            { k: 'org', l: 'Organization', t: 'text' },
            { k: 'date', l: 'Date Range', t: 'text' },
            { k: 'details', l: 'Details', t: 'textarea' },
            { k: 'metrics', l: 'Key Metrics (one per line)', t: 'textarea' }
        ],
        display: r => `${r.role} @ ${r.org}`
    },
    education: {
        key: 'portfolio_education', label: 'EDUCATION',
        fields: [
            { k: 'degree', l: 'Degree / Program', t: 'text' },
            { k: 'school', l: 'Institution', t: 'text' },
            { k: 'date', l: 'Date / Year', t: 'text' },
            { k: 'gpa', l: 'GPA', t: 'text' }
        ],
        display: r => `${r.degree} — ${r.school}`
    },
    certs: {
        key: 'portfolio_certs', label: 'CERT',
        fields: [
            { k: 'name', l: 'Certificate Name', t: 'text' },
            { k: 'issuer', l: 'Issuer', t: 'text' }
        ],
        display: r => `${r.name} — ${r.issuer}`
    },
    skills: {
        key: 'portfolio_skills', label: 'SKILL_CATEGORY',
        fields: [
            { k: 'category', l: 'Category Name', t: 'text' },
            { k: 'tags', l: 'Tags (comma-sep)', t: 'text' }
        ],
        display: r => `${r.category}`
    },
    blogs: {
        key: 'portfolio_blogs', label: 'BLOG_POST',
        fields: [
            { k: 'title', l: 'Title', t: 'text' },
            { k: 'date', l: 'Date (YYYY-MM-DD)', t: 'text' },
            { k: 'category', l: 'Category', t: 'select', options: ['offensive', 'defensive', 'research'] },
            { k: 'summary', l: 'Summary', t: 'textarea' }
        ],
        display: r => `${r.title}`
    }
};

/* ═══════════════════════════════════════════════════════════
   ADMIN — DASHBOARD TABS
═══════════════════════════════════════════════════════════ */
function initAdminDashboard() {
    const tabs = ['PROFILE', 'PROJECTS', 'EXPERIENCE', 'EDUCATION', 'CERTS', 'SKILLS', 'BLOGS', 'EXPORT'];
    const nav = document.getElementById('admin-tab-nav');
    nav.innerHTML = tabs.map((t, i) => `<button class="admin-nav-tab${i === 0 ? ' active' : ''}" data-tab="${t.toLowerCase()}">[${t}]</button>`).join('');
    nav.querySelectorAll('.admin-nav-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            nav.querySelectorAll('.admin-nav-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderAdminSection(btn.dataset.tab);
        });
    });
    renderAdminSection('profile');
}

function renderAdminSection(tab) {
    const content = document.getElementById('admin-tab-content');
    if (tab === 'profile') { content.innerHTML = buildProfileForm(); bindProfileForm(); return; }
    if (tab === 'export') { content.innerHTML = buildExportTab(); bindExportTab(); return; }
    const schema = SCHEMAS[tab]; if (!schema) return;
    content.innerHTML = buildCrudTab(schema);
    bindCrudTab(schema);
}

/* ─── PROFILE FORM ─── */
function buildProfileForm() {
    const p = DB.get('portfolio_profile') || {};
    const f = (k, l, v, t = 'text') => `<div class="input-wrapper"><span class="input-label">[${l}]</span>${t === 'textarea' ? `<textarea id="pf-${k}" rows="3">${v || ''}</textarea>` : `<input type="text" id="pf-${k}" value="${v || ''}">`}</div>`;
    return `<h3 class="neon-text-cyan" style="margin-bottom:1.5rem">> PROFILE_EDITOR</h3>
    <form class="cyber-form" id="profile-form" style="max-width:600px">
        ${f('name', 'Full Name', p.name)} ${f('role', 'Role / Headline', p.role)}
        ${f('bio', 'Bio', p.bio, 'textarea')} ${f('email', 'Email', p.email)}
        ${f('phone', 'Phone', p.phone)} ${f('location', 'Location', p.location)}
        ${f('linkedin', 'LinkedIn URL', p.linkedin)} ${f('github', 'GitHub URL', p.github)}
        <button type="submit" class="btn-cyber">[ SAVE_PROFILE ]</button>
    </form>
    <div id="profile-status" style="margin-top:1rem;font-size:.8rem;color:var(--neon-green)"></div>`;
}
function bindProfileForm() {
    document.getElementById('profile-form').addEventListener('submit', e => {
        e.preventDefault();
        const keys = ['name', 'role', 'bio', 'email', 'phone', 'location', 'linkedin', 'github'];
        const data = {}; keys.forEach(k => data[k] = document.getElementById('pf-' + k).value.trim());
        DB.set('portfolio_profile', data); renderProfile();
        const st = document.getElementById('profile-status');
        st.textContent = '> PROFILE_UPDATED_OK';
        setTimeout(() => st.textContent = '', 3000);
    });
}

/* ─── GENERIC CRUD TAB ─── */
function buildCrudTab(schema) {
    const records = DB.list(schema.key);
    const listHtml = records.length
        ? records.map(r => `
            <div class="admin-record-row">
                <span class="admin-record-label">> ${schema.display(r)}</span>
                <div class="admin-record-actions">
                    <button class="btn-cyber micro edit-btn" data-id="${r.id}">[ EDIT ]</button>
                    <button class="btn-cyber micro red del-btn"  data-id="${r.id}">[ DEL ]</button>
                </div>
            </div>`).join('')
        : `<p style="opacity:.4;font-size:.8rem">> NO_RECORDS_FOUND</p>`;
    return `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
            <h3 class="neon-text-cyan">> ${schema.label}_MANAGER</h3>
            <button class="btn-cyber micro add-btn">[ + ADD_NEW ]</button>
        </div>
        <div id="crud-list">${listHtml}</div>
        <div id="crud-form-area" style="margin-top:2rem;display:none"></div>`;
}

function buildCrudForm(schema, rec = null) {
    const v = k => rec ? (rec[k] !== undefined ? rec[k] : '') : '';
    const fields = schema.fields.map(f => {
        let inp;
        if (f.t === 'textarea') inp = `<textarea id="cf-${f.k}" rows="3">${v(f.k)}</textarea>`;
        else if (f.t === 'select') inp = `<select id="cf-${f.k}" class="admin-select">${f.options.map(o => `<option value="${o}"${v(f.k) === o ? ' selected' : ''}>${o}</option>`).join('')}</select>`;
        else inp = `<input type="text" id="cf-${f.k}" value="${v(f.k)}">`;
        return `<div class="input-wrapper"><span class="input-label">[${f.l}]</span>${inp}</div>`;
    }).join('');
    return `<hr style="border-color:var(--glass-border);margin-bottom:1.5rem">
    <h4 class="neon-text-cyan" style="margin-bottom:1rem">> ${rec ? 'EDIT' : 'ADD'}_${schema.label}</h4>
    <form class="cyber-form" id="crud-form" style="max-width:600px">
        ${fields}
        <div style="display:flex;gap:1rem">
            <button type="submit" class="btn-cyber">[ ${rec ? 'UPDATE' : 'CREATE'} ]</button>
            <button type="button" id="cancel-form-btn" class="btn-cyber" style="border-color:rgba(0,255,65,.2);color:rgba(0,255,65,.3)">[ CANCEL ]</button>
        </div>
    </form>
    <div id="crud-status" style="margin-top:.8rem;font-size:.8rem;color:var(--neon-green)"></div>`;
}

function bindCrudTab(schema) {
    const formArea = document.getElementById('crud-form-area');
    const listEl = document.getElementById('crud-list');
    const tabKey = schema.key.replace('portfolio_', '');

    document.querySelector('.add-btn').addEventListener('click', () => {
        formArea.innerHTML = buildCrudForm(schema, null);
        formArea.style.display = 'block';
        bindCrudForm(schema, null, tabKey);
    });

    listEl.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const rec = DB.list(schema.key).find(r => r.id === +btn.dataset.id);
            formArea.innerHTML = buildCrudForm(schema, rec);
            formArea.style.display = 'block';
            bindCrudForm(schema, rec, tabKey);
        });
    });

    listEl.querySelectorAll('.del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!confirm(`Delete this ${schema.label}?`)) return;
            DB.remove(schema.key, +btn.dataset.id);
            renderAll();
            renderAdminSection(tabKey);
        });
    });
}

function bindCrudForm(schema, existing, tabKey) {
    const formArea = document.getElementById('crud-form-area');
    document.getElementById('cancel-form-btn').addEventListener('click', () => { formArea.style.display = 'none'; });
    document.getElementById('crud-form').addEventListener('submit', e => {
        e.preventDefault();
        const data = {}; schema.fields.forEach(f => { data[f.k] = document.getElementById('cf-' + f.k).value.trim(); });
        if (existing) { data.id = existing.id; DB.update(schema.key, data); }
        else { DB.add(schema.key, data); }
        renderAll();
        renderAdminSection(tabKey);
    });
}

/* ─── EXPORT / IMPORT ─── */
function buildExportTab() {
    return `<h3 class="neon-text-cyan" style="margin-bottom:1.5rem">> DATA_EXPORT_IMPORT</h3>
    <div style="display:flex;flex-direction:column;gap:1.5rem">
        <div class="glass-card" style="padding:1.5rem">
            <h4 class="neon-text" style="margin-bottom:.8rem">> EXPORT_ALL_DATA</h4>
            <p style="font-size:.8rem;opacity:.6;margin-bottom:1rem">Download a complete backup of all portfolio data as JSON.</p>
            <button class="btn-cyber" id="export-btn">[ DOWNLOAD_BACKUP ]</button>
        </div>
        <div class="glass-card" style="padding:1.5rem">
            <h4 class="neon-text" style="margin-bottom:.8rem">> IMPORT_DATA</h4>
            <p style="font-size:.8rem;opacity:.6;margin-bottom:1rem">Restore data from a JSON backup file. This overwrites current data.</p>
            <input type="file" id="import-file" accept=".json" style="color:var(--neon-green);margin-bottom:1rem;display:block;font-family:var(--font-main)">
            <button class="btn-cyber" id="import-btn">[ LOAD_BACKUP ]</button>
            <div id="import-status" style="margin-top:.8rem;font-size:.8rem;color:var(--neon-green)"></div>
        </div>
    </div>`;
}
function bindExportTab() {
    document.getElementById('export-btn').addEventListener('click', () => {
        const keys = ['portfolio_profile', 'portfolio_projects', 'portfolio_experience', 'portfolio_education', 'portfolio_certs', 'portfolio_skills', 'portfolio_blogs'];
        const data = {}; keys.forEach(k => { data[k] = DB.get(k) || DB.list(k); });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
        a.download = 'portfolio_backup.json'; a.click();
    });
    document.getElementById('import-btn').addEventListener('click', () => {
        const file = document.getElementById('import-file').files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            try {
                const data = JSON.parse(e.target.result);
                Object.keys(data).forEach(k => DB.set(k, data[k]));
                renderAll();
                document.getElementById('import-status').textContent = '> IMPORT_SUCCESSFUL — portfolio updated!';
            } catch { document.getElementById('import-status').textContent = '> ERROR: invalid JSON file.'; }
        };
        reader.readAsText(file);
    });
}

/* ═══════════════════════════════════════════════════════════
   MISC HELPERS
═══════════════════════════════════════════════════════════ */
function toggleView(view) {
    const portfolio = document.getElementById('portfolio-view');
    const admin = document.getElementById('admin-view');
    const nav = document.querySelector('.cyber-nav');
    const fab = document.getElementById('admin-trigger');
    if (view === 'admin') {
        portfolio.classList.add('hidden'); admin.classList.remove('hidden');
        nav.classList.add('hidden'); if (fab) fab.classList.add('hidden');
    } else {
        portfolio.classList.remove('hidden'); admin.classList.add('hidden');
        nav.classList.remove('hidden'); if (fab) fab.classList.remove('hidden');
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form'), status = document.getElementById('contact-status');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        status.innerHTML = '<p class="neon-text-cyan">> INITIATING_SECURE_PHASE... [WAIT]</p>';
        setTimeout(() => { status.innerHTML = '<p class="neon-text">> SIGNAL_ESTABLISHED_OPERATIVE_WILL_RESPOND_SHORTLY</p>'; form.reset(); }, 1500);
    });
}

/* ═══════════════════════════════════════════════════════════
   THREAT MONITOR ANIMATIONS
═══════════════════════════════════════════════════════════ */
function initThreatMonitor() {
    const canvas = document.getElementById('threat-map-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('map-container');

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const target = { x: canvas.width * 0.72, y: canvas.height * 0.45, name: 'BHAKTAPUR' };
    const sources = [
        { x: canvas.width * 0.82, y: canvas.height * 0.35, name: 'CHINA', code: 'CN' },
        { x: canvas.width * 0.60, y: canvas.height * 0.25, name: 'RUSSIA', code: 'RU' },
        { x: canvas.width * 0.50, y: canvas.height * 0.35, name: 'EUROPE', code: 'EU' },
        { x: canvas.width * 0.15, y: canvas.height * 0.40, name: 'USA', code: 'US' },
        { x: canvas.width * 0.25, y: canvas.height * 0.75, name: 'LATAM', code: 'BR' },
        { x: canvas.width * 0.85, y: canvas.height * 0.80, name: 'AUSTRALIA', code: 'AU' }
    ];

    let attacks = [];
    let impacts = [];

    function spawnAttack() {
        const source = sources[Math.floor(Math.random() * sources.length)];
        attacks.push({
            source,
            progress: 0,
            speed: 0.003 + Math.random() * 0.007,
            color: Math.random() > 0.4 ? 'var(--neon-red)' : 'var(--neon-yellow)',
            arcHeight: Math.random() * 100 - 50
        });
        const countEl = document.getElementById('active-vector-count');
        if (countEl) countEl.textContent = `${attacks.length} ACTIVE_VECTORS`;
    }

    function drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Grid Background
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Draw Target (Bhaktapur)
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff41';
        ctx.fillStyle = '#00ff41';
        ctx.beginPath(); ctx.arc(target.x, target.y, 4, 0, Math.PI * 2); ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(target.x, target.y, 10 + Math.sin(Date.now() / 300) * 5, 0, Math.PI * 2);
        ctx.stroke();

        // Draw Source Points
        sources.forEach(s => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath(); ctx.arc(s.x, s.y, 2, 0, Math.PI * 2); ctx.fill();
            ctx.font = '8px monospace';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillText(s.code, s.x + 5, s.y - 5);
        });

        // Animate Attacks
        attacks = attacks.filter(a => {
            a.progress += a.speed;
            if (a.progress >= 1) {
                impacts.push({ x: target.x, y: target.y, r: 0, o: 1 });
                return false;
            }

            const dx = target.x - a.source.x;
            const dy = target.y - a.source.y;
            const cx = a.source.x + dx * a.progress;
            const cy = a.source.y + dy * a.progress - Math.sin(a.progress * Math.PI) * a.arcHeight;

            ctx.strokeStyle = a.color;
            ctx.setLineDash([2, 4]);
            ctx.beginPath();
            ctx.moveTo(a.source.x, a.source.y);
            ctx.quadraticCurveTo(
                a.source.x + dx / 2,
                a.source.y + dy / 2 - a.arcHeight * 2,
                cx, cy
            );
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = a.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = a.color;
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;

            return true;
        });

        // Animate Impacts
        impacts = impacts.filter(i => {
            i.r += 1.5;
            i.o -= 0.02;
            ctx.strokeStyle = `rgba(0, 255, 65, ${i.o})`;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2); ctx.stroke();
            return i.o > 0;
        });

        requestAnimationFrame(drawMap);
    }

    setInterval(spawnAttack, 2500);
    drawMap();

    // Stats Updates
    const log = document.getElementById('event-log');
    let count = 2847;
    setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        if (log) log.textContent = count.toLocaleString() + ' ATTACKS_BLOCKED';
    }, 3000);

    let uptime = 99.97;
    setInterval(() => {
        uptime = Math.max(99.90, uptime + (Math.random() - 0.5) * 0.01);
        const el = Array.from(document.querySelectorAll('.status-label')).find(x => x.textContent.includes('UPTIME'));
        if (el && el.nextElementSibling) el.nextElementSibling.textContent = uptime.toFixed(2) + '% UPTIME';
    }, 8000);
}
