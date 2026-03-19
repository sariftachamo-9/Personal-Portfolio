/**
 * SARIF TACHAMO PORTFOLIO V4.0 - INTERACTIVE ENGINE
 * Pure Vanilla JS Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize State & Foundations
    initStorage();
    initCanvases();
    initLoadingSequence();

    // 2. Component Initialization (Triggered after loading)
    window.addEventListener('sys-ready', () => {
        initTerminal();
        initAnimations();
        initNavigation();
        initAdminPortal();
        renderDynamicContent();
        initExperience();
        initContactForm();
    });
});

/**
 * 3. PERSISTENCE LAYER (localStorage)
 */
function initStorage() {
    const defaultProjects = [
        { id: 1, title: 'Asymmetric Cryptographic Platform', category: 'offensive', desc: 'RSA-2048 + AES-256-GCM messaging with TTL self-destruction.', tech: ['Python', 'Flask', 'PyCryptodome'] },
        { id: 2, title: 'LSB Steganography Engine', category: 'offensive', desc: 'Hiding payloads in pixels with Zlib compression.', tech: ['Python', 'Pillow', 'Zlib'] },
        { id: 3, title: 'Neural Nepali Recognizer', category: 'defensive', desc: 'Ran2Dev model for Nepali character recognition (95% acc).', tech: ['AI/ML', 'LeNet-5'] },
        { id: 4, title: 'DoS Simulator', category: 'offensive', desc: 'Differentiating UDP/DNS amp and TLS/JA3 compute attacks.', tech: ['Python', 'Scapy'] },
        { id: 5, title: 'Employee Management System', category: 'defensive', desc: 'GPS-validated attendance & automated payroll engine.', tech: ['Flask', 'Supabase', 'PostgreSQL'] }
    ];
    if (!localStorage.getItem('projects')) localStorage.setItem('projects', JSON.stringify(defaultProjects));

    const defaultBlogs = [
        { id: 1, title: 'Bypassing EDR with Reflective Injection', date: '2026-03-10', category: 'offensive' },
        { id: 2, title: 'Zero Trust vs Legacy VPN', date: '2026-03-05', category: 'defensive' }
    ];
    if (!localStorage.getItem('blogs')) localStorage.setItem('blogs', JSON.stringify(defaultBlogs));
}

/**
 * 4. TACTICAL LOADING SEQUENCE (V4.2 - PRECISION 4-PHASE)
 */
function initLoadingSequence() {
    const screen = document.getElementById('loading-screen');
    const p0 = document.getElementById('phase-0');
    const p1 = document.getElementById('phase-1');
    const p2 = document.getElementById('phase-2');
    const p3 = document.getElementById('phase-3');

    // Hide main canvases during premium iframe loading
    const mCanvas = document.getElementById('matrix-bg');
    const nCanvas = document.getElementById('network-bg');
    if (mCanvas) mCanvas.classList.add('hidden');
    if (nCanvas) nCanvas.classList.add('hidden');

    // --- Phase 0: Shock Intro (1.8s) ---
    p0.classList.remove('hidden');
    const p0Bar = document.getElementById('phase-0-bar');
    p0Bar.style.width = '0%';

    // Bar Delay: 0.5s, Duration: 1s
    setTimeout(() => {
        p0Bar.style.transition = 'width 1s linear';
        p0Bar.style.width = '100%';
    }, 500);

    // End Phase 0 at 1.8s
    setTimeout(() => {
        p0.classList.add('exit');
        setTimeout(() => {
            p0.classList.add('hidden');
            startPhase1();
        }, 800); // Wait for exit animation
    }, 1800);

    function startPhase1() {
        p1.classList.remove('hidden');
        const main = document.getElementById('reveal-main');
        const sub = document.getElementById('reveal-sub');
        const final = document.getElementById('reveal-final');

        // Reset states
        main.style.color = 'var(--neon-green)';
        sub.style.color = 'var(--neon-green)';
        final.classList.add('hidden');
        final.innerHTML = '';

        // Stage 1: "i can you" (100ms stagger)
        const text1 = "i can you";
        main.innerHTML = text1.split('').map(c => `<span class="reveal-char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
        const chars = main.querySelectorAll('.reveal-char');
        chars.forEach((char, i) => setTimeout(() => char.classList.add('active'), i * 100));

        const stage1Duration = chars.length * 100 + 800;

        setTimeout(() => {
            // Stage 2: "and" (60ms typing)
            sub.classList.add('animate-pulse');
            typeSubtext("and", 60, () => {
                setTimeout(() => {
                    // Stage 3: "i will find you anywhere and anyhow," (60ms typing)
                    typeSubtext("i will find you anywhere and anyhow,", 60, () => {
                        setTimeout(() => {
                            // Stage 4: "no matter what you do" (60ms typing)
                            typeSubtext("no matter what you do", 60, () => {
                                setTimeout(() => {
                                    // Stage 5: "and where you hide" (60ms typing)
                                    typeSubtext("and where you hide", 60, () => {
                                        setTimeout(() => {
                                            // Stage 6: "system detected" (Separately below, 50ms)
                                            sub.classList.remove('animate-pulse');
                                            final.classList.remove('hidden');

                                            // Intensify Pulse BG
                                            const pulseBg = document.querySelector('.green-pulse-bg');
                                            pulseBg.style.animationDuration = '1.5s';
                                            pulseBg.style.background = 'radial-gradient(circle, rgba(0, 255, 65, 0.2) 0%, rgba(0, 0, 0, 0) 70%)';

                                            typeCustomText(final, "system detected", 50, () => {
                                                setTimeout(startPhase2, 1500);
                                            });
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

    function typeCustomText(el, text, speed, callback) {
        el.innerHTML = '';
        let i = 0;
        const interval = setInterval(() => {
            el.innerHTML += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
    }

    function startPhase2() {
        p1.classList.add('hidden');
        p2.classList.remove('hidden');

        const term = document.getElementById('boot-terminal');
        const bar = document.getElementById('boot-progress');
        const lines = [
            'LOAD_SYSTEM_KERNEL',
            'SYNC_NEURAL_LINK',
            'ESCALATE_PRIVILEGES',
            'ESTABLISH_SOCKET'
        ];

        let lineIdx = 0;
        function pushLine() {
            if (lineIdx >= lines.length) return;
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.innerHTML = `<span>> ${lines[lineIdx]}</span><span class="line-status busy">[BUSY]</span>`;
            term.appendChild(line);

            const status = line.querySelector('.line-status');
            setTimeout(() => {
                status.textContent = '[OK]';
                status.className = 'line-status ok';
                lineIdx++;
                setTimeout(pushLine, 100);
            }, 400);
        }
        pushLine();

        // Progress Bar (80ms ticks)
        let prog = 0;
        const int = setInterval(() => {
            prog += 2;
            bar.style.width = prog + '%';
            if (prog >= 100) {
                clearInterval(int);
                setTimeout(startPhase3, 800);
            }
        }, 80);
    }

    function startPhase3() {
        p2.classList.add('hidden');
        p3.classList.remove('hidden');

        const msg = document.getElementById('welcome-msg');
        animateDecrypt(msg); // Use existing decrypt logic

        // Letter spacing transition (1em -> 0.4em)
        setTimeout(() => {
            msg.classList.add('focused');
            setTimeout(completeLoad, 1500);
        }, 1500);
    }

    function typeSubtext(text, speed, callback) {
        const sub = document.getElementById('reveal-sub');
        sub.innerHTML = '';
        let i = 0;
        const interval = setInterval(() => {
            sub.innerHTML += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
    }

    function completeLoad() {
        screen.style.opacity = '0';
        setTimeout(() => {
            screen.style.display = 'none';
            document.body.classList.remove('loading');

            // Re-show main canvases for the portfolio view
            const mCanvas = document.getElementById('matrix-bg');
            const nCanvas = document.getElementById('network-bg');
            if (mCanvas) mCanvas.classList.remove('hidden');
            if (nCanvas) nCanvas.classList.remove('hidden');

            window.dispatchEvent(new CustomEvent('sys-ready'));
        }, 1000);
    }
}

/**
 * 5. TERMINAL ENGINE
 */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const body = document.getElementById('terminal-body');

    const commands = {
        help: () => 'AVAILABLE_COMMANDS: help, ls, cat bio, clear, status, admin',
        ls: () => 'RECON_LOGS  PAYLOADS  INTEL_FEED  CORE_ASSETS',
        clear: () => { output.innerHTML = ''; return null; },
        'cat bio': () => 'SUBJECT: SARIF TACHAMO // ROLE: Cybersecurity Researcher // STATUS: ACTIVE // SECTOR: Computer Engineering',
        status: () => 'SYSTEM_STATUS: NOMINAL // ALL_NODES_ACTIVE // SIGNAL: SECURE',
        admin: () => {
            toggleView('admin');
            return 'REDIRECTING_TO_CONTROL_GATE...';
        }
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim().toLowerCase();
            const response = commands[val] ? commands[val]() : `COMMAND_NOT_FOUND: ${val}`;

            if (val !== 'clear') {
                const line = document.createElement('p');
                line.innerHTML = `<span class="prompt">root@sarif:~#</span> ${input.value}`;
                output.appendChild(line);
                if (response) {
                    const res = document.createElement('p');
                    res.className = 'neon-text-cyan';
                    res.textContent = response;
                    output.appendChild(res);
                }
            }
            input.value = '';
            body.scrollTop = body.scrollHeight;
        }
    });

    typeTerminal('> SECURE_SESSION_STARTED\n> TYPE "HELP" TO BEGIN_RECON');
}

function typeTerminal(text) {
    const output = document.getElementById('terminal-output');
    let i = 0;
    const int = setInterval(() => {
        output.innerHTML += text[i] === '\n' ? '<br>' : text[i];
        i++;
        if (i >= text.length) clearInterval(int);
    }, 30);
}

/**
 * 6. ANIMATIONS & CANVASES
 */
function initCanvases() {
    const mCanvas = document.getElementById('matrix-bg');
    const nCanvas = document.getElementById('network-bg');

    // Matrix Logic
    const mCtx = mCanvas.getContext('2d');
    const nCtx = nCanvas.getContext('2d');

    function resize() {
        mCanvas.width = nCanvas.width = window.innerWidth;
        mCanvas.height = nCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Matrix Rain
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 24;
    const columns = Math.floor(mCanvas.width / fontSize);
    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));
    const speeds = Array(columns).fill(1).map(() => Math.random() * 0.5 + 0.5);

    function drawMatrix() {
        mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
        
        mCtx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Draw character with premium effects
            if (Math.random() > 0.98) {
                // Head of the drop (soft glow)
                mCtx.shadowBlur = 4;
                mCtx.shadowColor = 'rgba(255, 255, 255, 0.1)';
                mCtx.fillStyle = 'rgba(192, 224, 192, 0.5)';
            } else {
                // Normal characters (no glow, very dim)
                mCtx.shadowBlur = 0;
                mCtx.fillStyle = 'rgba(0, 92, 12, 0.3)';
            }

            mCtx.fillText(text, x, y);
            
            if (y > mCanvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += speeds[i];
        }
        mCtx.shadowBlur = 0; // Clear for performance
    }

    // Network Logic
    const particles = Array(60).fill().map(() => ({
        x: Math.random() * nCanvas.width,
        y: Math.random() * nCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    }));

    function drawNetwork() {
        nCtx.clearRect(0, 0, nCanvas.width, nCanvas.height);
        nCtx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > nCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > nCanvas.height) p.vy *= -1;
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const d = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (d < 150) {
                    nCtx.beginPath(); nCtx.moveTo(p.x, p.y); nCtx.lineTo(p2.x, p2.y); nCtx.stroke();
                }
            }
        });
        requestAnimationFrame(drawNetwork);
    }

    setInterval(drawMatrix, 40);
    drawNetwork();
}

function initAnimations() {
    // Decrypting Text Logic
    const decryptElements = document.querySelectorAll('.decrypting');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateDecrypt(entry.target);
            }
        });
    }, { threshold: 0.2 });

    decryptElements.forEach(el => observer.observe(el));

    // Stagger Reveals
    const staggerItems = document.querySelectorAll('.stagger-in');
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    staggerItems.forEach(el => staggerObserver.observe(el));
}

function animateDecrypt(el) {
    const originalText = el.getAttribute('data-text') || el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let iteration = 0;
    const interval = setInterval(() => {
        el.textContent = originalText.split('').map((char, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 40);
}

/**
 * 7. ADMIN PORTAL LOGIC
 */
function initAdminPortal() {
    const loginForm = document.getElementById('admin-login-form');
    const trigger = document.getElementById('admin-trigger');
    const logout = document.getElementById('logout-btn');

    trigger.addEventListener('click', () => toggleView('admin'));
    logout.addEventListener('click', () => toggleView('portfolio'));

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('admin-pass').value;
        const feedback = document.getElementById('login-feedback');

        // Simulated JWT/Security Signal
        console.log("%c [AUTH_GATE] INITIATING_HANDSHAKE... ", "color: #0FF; border: 1px solid #0FF;");

        if (pass === 'AdmiN@369') {
            feedback.innerHTML = '<span class="status-online"></span> ACCESS_GRANTED';
            setTimeout(() => {
                document.getElementById('admin-login').classList.add('hidden');
                document.getElementById('admin-dashboard').classList.remove('hidden');
                loadAdminData();
                initCharts();
                startLiveLogs();
            }, 800);
        } else {
            feedback.innerHTML = '<span style="color:var(--neon-red)">ACCESS_DENIED_INVALID_KEY</span>';
        }
    });
}

function startLiveLogs() {
    const logEl = document.getElementById('admin-live-logs');
    if (!logEl) return;
    const events = [
        'AUTHENTICATION_HANDSHAKE_SUCCESSFUL',
        'NODES_SYNCHRONIZED_BY_C2',
        'TRAFFIC_FILTERED_BEYOND_THRESHOLD',
        'UNAUTHORIZED_IP_DETECTED_BLOCKED',
        'PAYLOAD_HEARTBEAT_NOMINAL',
        'ENCRYPTION_LAYER_ROTATED'
    ];
    setInterval(() => {
        const line = document.createElement('p');
        line.style.fontSize = '0.7rem';
        line.style.opacity = '0.6';
        line.innerHTML = `<span style="color:var(--neon-green)">[${new Date().toLocaleTimeString()}]</span> > ${events[Math.floor(Math.random() * events.length)]}`;
        logEl.prepend(line);
        if (logEl.children.length > 15) logEl.lastChild.remove();
    }, 2000);
}

function loadAdminData() {
    const pList = document.getElementById('admin-project-list');
    const projects = JSON.parse(localStorage.getItem('projects'));
    pList.innerHTML = projects.map(p => `
        <div class="admin-list-item glass-card" style="margin-bottom: 0.5rem; padding: 0.5rem 1rem;">
            <span>${p.title}</span>
            <button onclick="deleteProject(${p.id})" class="btn-cyber micro red">[ DELETE ]</button>
        </div>
    `).join('');
}

window.deleteProject = (id) => {
    let projects = JSON.parse(localStorage.getItem('projects'));
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
    loadAdminData();
    renderDynamicContent();
};

function initExperience() {
    const list = document.getElementById('experience-list');
    const experience = [
        { 
            role: 'CYBERSECURITY ENGINEER', 
            org: 'INDEPENDENT / INTERN PROJECTS', 
            date: '[2023 - PRESENT]', 
            metrics: [
                'Enforced GPS-validated attendance (Haversine)',
                'LSB Steganography Engine w/ Zlib',
                'DoS Simulation: UDP/DNS & TLS/JA3'
            ],
            details: 'Developed secure architectures, encrypted platforms, and cyber threat simulations.'
        },
        { 
            role: 'PEER TECHNICAL MENTOR', 
            org: 'KHWOPA ENGINEERING COLLEGE', 
            date: '[2023 - 2024]', 
            metrics: [
                'Mentored junior students in PenTesting',
                'Conducted Secure Coding workshops',
                'Provided technical system design guidance'
            ],
            details: 'Guided student projects and conducted security-focused workshops.'
        }
    ];
    list.innerHTML = experience.map(exp => `
        <div class="experience-card glass-card" style="margin-bottom: 1.5rem;">
            <div class="exp-header" style="display:flex; justify-content:space-between;">
                <h4 class="neon-text">${exp.role}</h4>
                <span class="tag">${exp.date}</span>
            </div>
            <p class="neon-text-cyan">${exp.org}</p>
            <p style="font-size:0.85rem; margin-top:0.5rem; opacity:0.8;">${exp.details}</p>
            <div class="exp-metrics" style="margin-top:0.8rem; display:flex; flex-direction:column; gap:0.3rem;">
                ${exp.metrics.map(m => `<span style="font-size:0.75rem; opacity:0.6;">> ${m}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.innerHTML = '<p class="neon-text-cyan">> INITIATING_SECURE_PHASE... [WAIT]</p>';
        setTimeout(() => {
            status.innerHTML = '<p class="neon-text">> SIGNAL_ESTABLISHED_OPERATIVE_WILL_RESPOND_SHORTLY</p>';
            form.reset();
        }, 1500);
    });
}

function toggleView(view) {
    const portfolio = document.getElementById('portfolio-view');
    const admin = document.getElementById('admin-view');
    const nav = document.querySelector('.cyber-nav');

    if (view === 'admin') {
        portfolio.classList.add('hidden');
        admin.classList.remove('hidden');
        nav.classList.add('hidden');
    } else {
        portfolio.classList.remove('hidden');
        admin.classList.add('hidden');
        nav.classList.remove('hidden');
    }
}

function initCharts() {
    const ctx = document.getElementById('admin-metrics-chart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'THREAT_TRAFFIC',
                data: [5, 12, 45, 10, 23, 70],
                borderColor: '#00FF41',
                backgroundColor: 'rgba(0, 255, 65, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#00FF41' } } },
            scales: {
                x: { ticks: { color: '#00FF41' } },
                y: { ticks: { color: '#00FF41' } }
            }
        }
    });
}

/**
 * 8. DYNAMIC CONTENT RENDERING
 */
function renderDynamicContent() {
    const pContainer = document.getElementById('projects-grid');
    const projects = JSON.parse(localStorage.getItem('projects'));

    pContainer.innerHTML = projects.map(p => `
        <div class="glass-card stagger-item">
            <h3 class="neon-text-cyan">${p.title}</h3>
            <p>${p.desc}</p>
            <div class="tech-tags">
                ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.target.id === 'admin-trigger') return;
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}
