window.SITE_I18N = {
  en: {
    strings: {
      title: 'Sarmento7 — Roblox Developer',
      description: 'Rafael Sarmento: combat, abilities and game systems for Roblox. Demos, implementation decisions and Luau code.',
      ogDescription: 'Combat, abilities and systems in Luau. Gameplay demos and case studies.',
      skip: 'Skip to content', homeLabel: 'Sarmento7 — home', navLabel: 'Main navigation',
      home: 'Home', projects: 'Projects', code: 'Code', about: 'About', contactAction: 'Get in touch',
      languageLabel: 'Language', githubLabel: 'Sarmento’s GitHub', openMenu: 'Open menu', closeMenu: 'Close menu',
      puppetLabel: 'Pull the character. Use the arrow keys to move and Escape to release.',
      avatarAlt: 'Sarmento7’s front-facing avatar with blue hair, a Black Adam shirt, jeans and gray sneakers',
      dragHint: 'Drag the character', eyebrow: 'Roblox Developer · Programming',
      heroDescription: 'I build <strong>combat, abilities and game systems</strong> for Roblox. I work on gameplay logic, client–server communication and UI integration.',
      heroCta: 'See the combat in action', gameSystems: 'Game systems', scrollCue: 'The work comes first',
      featuredKicker: 'Featured project', featuredLine1: 'Katana combat.', featuredLine2: 'Sensei Kaito’s dojo.',
      featuredDescription: 'From training dummies to a duel with Sensei Kaito: combos, defense and abilities in a dojo, with live damage and hit feedback.',
      featuredWatchLabel: 'Watch Katana combat', featuredAlt: 'Sarmento7 fighting Sensei Kaito with a katana in the dojo',
      featuredVideoLabel: 'Watch the training and duel', featuredCode: 'Explore the decisions and code', moreProjects: 'More projects',
      demoKicker: 'Demos', demoLine1: 'Combat, worlds', demoLine2: 'and experiments.', myArtStation: 'My ArtStation',
      filtersLabel: 'Filter projects', filterAll: 'All', filterSystems: 'Systems', filterGameplay: 'Mechanics', filterGames: 'Games',
      noScript: 'Browse the projects on <a href="https://www.artstation.com/sarmentomendes">ArtStation</a>.',
      studiesKicker: 'Two systems from the katana project', studiesLine1: 'Combat and Iai.', studiesLine2: 'Implementation notes.',
      studyIntro: 'How I organized combat and Iai.<br>With code from the project.', repoLink: 'Systems package on GitHub',
      aboutKicker: 'Behind the code', aboutLine2: 'On Roblox, Sarmento7.',
      aboutP1: 'My Roblox projects cover combat, abilities, interfaces and experiments in environment generation. In the katana project, I went beyond attacks: I wrote the combat services, Iai, the sensei AI and the duel flow.',
      aboutP2: 'I like separating responsibilities. The NPC and player share the combat services; the Iai path calculation is also shared by client and server. These choices make the rules easier to follow and adjust.',
      aboutP3: 'I’m looking to collaborate on programming mechanics and systems for Roblox, from a prototype through integration with the rest of the game.',
      skill1: 'Gameplay mechanics', skill1Text: 'Combos, defense, abilities, physics and NPC behavior.',
      skill2: 'System architecture', skill2Text: 'Shared services, combat state and server logic.', skill2Label: 'Client–server · Modules',
      skill3: 'UI and integration', skill3Text: 'Connecting player actions, data and visual responses.', skill3Label: 'UI · HTML, CSS and JavaScript',
      contactKicker: 'Contact', contactLine1: 'Roblox programming.', contactLine2: 'Get in touch.',
      contactText: 'Get in touch to build a mechanic, integrate a system<br class="desktop-br"> or collaborate on a Roblox project.',
      emailLabel: 'Email', copyEmail: 'Copy email', emailHint: 'Tell me about the project and what you need to implement.',
      copyDiscord: 'Copy Discord username', discordHint: 'Copy the username and add me on Discord.', backTop: 'Back to top', closeProject: 'Close project',
      source: 'View on ArtStation', sourceCode: 'View code on GitHub', mediaYouTube: 'Open on YouTube', mediaDownload: 'Download demo',
      chapterLabel: 'Jump to a mechanic', chapterCombo: 'Combos', chapterIai: 'Iai', chapterDuel: 'Sensei duel', chapterParry: 'Parry',
      caseProblem: 'The problem', caseContribution: 'My implementation', caseDecision: 'Decisions and behavior', caseResult: 'What you can verify', caseLimits: 'Limits of this version',
      fileDownload: 'Download the original module ↗', watchDemo: 'Watch the gameplay demo', checkGitHub: 'Explore the package on GitHub',
      watch: 'Watch {title}', preview: 'Preview of {title}', demoTitle: 'Demo: {title}', studyBadge: 'Includes a case study',
      demoOne: 'demo', demoMany: 'demos', copiedEmail: 'Email copied!', copiedDiscord: 'Discord copied: {value}', copyFail: 'Select and copy: {value}',
      musicRegion: 'Background music', musicPlay: 'Play music', musicPause: 'Pause music', musicSettings: 'Music settings', musicClose: 'Close music settings', musicVolume: 'Volume', musicLoading: 'Loading…', musicReady: 'Press play to listen at low volume.', musicPlaying: 'Anything · Adrianne Lenker. Pauses when you open a demo.', musicPaused: 'Paused. Press play to continue.', musicError: 'Could not play the music. Try again.'
    },
    projects: {
      katana: { title: 'Katana combat', label: 'Combat · R6', caption: 'Training combos and parrying Sensei Kaito in a duel.', description: 'I programmed the combat, Iai, Sensei Kaito’s AI and the duel flow for R6. In this version, you can train on dummies and fight the sensei in the dojo. Combos, defense and abilities use the same services for players and NPCs.', tags: ['Luau', 'Combat', 'Client–server'], sourceLabel: 'View code on GitHub' },
      backrooms: { title: 'Procedural Backrooms', label: 'Procedural generation', caption: 'A room and corridor prototype inspired by the Backrooms.', description: 'I made a Backrooms prototype with environment generation in Roblox. This version shows the room and corridor layout inside Studio.', tags: ['Roblox Studio', 'Environments', 'Procedural'] },
      maps: { title: 'Random map selection', label: 'Maps and UI', caption: 'Random map selection connected to the UI.', description: 'I developed a system that picks a random map and displays the selection in the UI. The recording shows this version running inside Roblox Studio.', tags: ['Maps', 'UI', 'Luau'] },
      ranking: { title: 'Ranking and progression', label: 'Player progression', caption: 'A prototype for progressing between ranks.', description: 'I implemented a rank progression prototype. Here I show how rank changes work and how they are presented to the player.', tags: ['Ranking', 'Progression', 'Roblox'] },
      powers: { title: 'Physics and abilities', label: 'Abilities', caption: 'An ability prototype with physical interactions.', description: 'I built this ability prototype with physical interactions in Roblox. The recording shows the powers and physics during gameplay.', tags: ['Abilities', 'Physics', 'Prototype'] },
      physics: { title: 'Physics experiments', label: 'Prototyping', caption: 'One of my physics tests in Roblox.', description: 'This is a physics test I made in Roblox Studio. The recording captures the experiment and in-game interactions during prototyping.', tags: ['Physics', 'Tests', 'Roblox'] },
      games: { title: 'Dojo: training and duels', label: 'Training · AI · UI', caption: 'Training targets and a duel with Sensei Kaito in the katana project.', description: 'I integrated combat, Sensei Kaito’s AI and the duel flow into a dojo with training targets. I test attacks and defense on the dummies; in the duel, the sensei reacts to hits. The UI tracks health, damage, hit counts and stun. This recording is a companion demo of the katana project.', tags: ['Training targets', 'Combat AI', 'UI'] }
    },
    studies: {
      combat: {
        title: 'Combat: one set of rules for players and NPCs',
        problem: 'An attack can start and become invalid before it lands: the character may be parried or stunned during the animation. Resolving damage at the initial click ignores that state change.',
        contribution: 'I implemented a four-hit M1 combo, heavy attack, defense, parry and dash through services shared by players and NPCs. The server decides the hit outcome; the client handles input and effects.',
        decision: 'ComboService checks the state again at impact, after the animation delay. CombatResolver resolves hits in an explicit order: parry, guard break, block and direct damage. A new stun never shortens one that is already active.',
        result: 'I used the same combat services for the player and sensei. The demo moves from training dummies to the duel, with hit counts, damage, stun and parry feedback in the UI.',
        limits: 'This version is for R6. The modules need the experience’s animations and configuration. I adjust the parry window, damage and range through CombatConfig.',
        flow: ['Player input', 'Server validation', 'Hitbox', 'Hit outcome'],
        codeExplanation: 'Original excerpt: the attribute changes only when the new stun ends later. This prevents a short effect from canceling a longer one.'
      },
      iai: {
        title: 'Iai: pass through the target, stop before the wall',
        problem: 'The fast Iai dash needs to end at the same point on the client and server. It also needs to pass through a combatant without leaving the character stuck in them or inside a wall.',
        contribution: 'I implemented a shared path calculation. Range scales with charge; the endpoint is adjusted when it overlaps a combatant, then limited by the clear distance to a wall.',
        decision: 'IaiPath is used on both sides of the connection. It reuses DashMotion’s wall check and combines the pass-through adjustment with that limit. The cut happens after the dash, and the server checks whether the target is still near the line when damage is applied.',
        result: 'I shared the distance calculation between client and server to keep the dash and cut on the same path. If the target leaves the line before damage is applied, the server discards that hit.',
        limits: 'The pass-through adjustment is limited to three iterations and uses a fixed clearance distance. The wall limit takes priority over that adjustment. Target checks are mostly horizontal: this solution is specific to the movement and combat in this project.',
        flow: ['Attack charge', 'Target adjustment', 'Wall limit', 'Revalidated cut'],
        codeExplanation: 'Original excerpt: desired range increases with charge. The function returns the smaller of the adjusted pass-through distance and the clear distance, respecting the wall.'
      }
    }
  },
  'pt-BR': {
    strings: {
      title: 'Sarmento7 — Desenvolvedor Roblox', description: 'Rafael Sarmento: programação de combate, habilidades e sistemas para Roblox. Demonstrações, decisões de implementação e código em Luau.', ogDescription: 'Combate, habilidades e sistemas em Luau. Demonstrações e estudos de caso.',
      skip: 'Pular para o conteúdo', homeLabel: 'Sarmento7 — início', navLabel: 'Navegação principal',
      home: 'Início', projects: 'Projetos', code: 'Código', about: 'Sobre', contactAction: 'Fale comigo', languageLabel: 'Idioma', githubLabel: 'GitHub de Sarmento', openMenu: 'Abrir menu', closeMenu: 'Fechar menu',
      puppetLabel: 'Puxar personagem. Use as setas para mover e Escape para soltar.', avatarAlt: 'Skin frontal de Sarmento7, com cabelo azul, camiseta Black Adam, jeans e tênis cinza', dragHint: 'Arraste o personagem', eyebrow: 'Desenvolvedor Roblox · Programação',
      heroDescription: 'Programo <strong>combate, habilidades e sistemas</strong> para Roblox. Trabalho na lógica de jogo, na comunicação entre cliente e servidor e na integração com a interface.', heroCta: 'Veja o combate em ação', gameSystems: 'Sistemas de jogo', scrollCue: 'Primeiro, o trabalho',
      featuredKicker: 'Projeto em destaque', featuredLine1: 'Combate de katana.', featuredLine2: 'Dojo do Sensei Kaito.', featuredDescription: 'Dos bonecos de treino ao duelo com o Sensei Kaito: combos, defesa e habilidades em um dojo, com feedback de dano e acertos em tempo real.', featuredWatchLabel: 'Assistir Combate de katana', featuredAlt: 'Sarmento7 enfrentando o Sensei Kaito com a katana no dojo', featuredVideoLabel: 'Assistir ao treino e ao duelo', featuredCode: 'Veja as decisões e o código', moreProjects: 'Mais projetos',
      demoKicker: 'Demonstrações', demoLine1: 'Combate, ambientes', demoLine2: 'e experimentos.', myArtStation: 'Meu ArtStation', filtersLabel: 'Filtrar projetos', filterAll: 'Todos', filterSystems: 'Sistemas', filterGameplay: 'Mecânicas', filterGames: 'Jogos', noScript: 'Veja os projetos no <a href="https://www.artstation.com/sarmentomendes">ArtStation</a>.',
      studiesKicker: 'Dois sistemas do projeto de katana', studiesLine1: 'Combate e Iai.', studiesLine2: 'Decisões no código.', studyIntro: 'Como organizei o combate e o Iai.<br>Com código do projeto.', repoLink: 'Pacote de sistemas no GitHub',
      aboutKicker: 'Quem programa', aboutLine2: 'No Roblox, Sarmento7.',
      aboutP1: 'Meus projetos de Roblox passam por combate, habilidades, interfaces e experimentos de geração de ambientes. No projeto de katana, por exemplo, fui além do ataque: escrevi os serviços de combate, o Iai, a IA do sensei e o fluxo do duelo.',
      aboutP2: 'Gosto de separar responsabilidades. O NPC e o jogador compartilham os serviços de combate; o cálculo de trajetória do Iai também é compartilhado entre cliente e servidor. São escolhas que tornam as regras mais fáceis de acompanhar e ajustar.',
      aboutP3: 'Procuro colaborar na programação de mecânicas e sistemas para Roblox, desde um protótipo até a integração com o restante do jogo.',
      skill1: 'Mecânicas de jogo', skill1Text: 'Combos, defesa, habilidades, física e comportamento de NPCs.', skill2: 'Organização dos sistemas', skill2Text: 'Serviços compartilhados, estado de combate e lógica de servidor.', skill2Label: 'Cliente–servidor · Módulos', skill3: 'Interface e integração', skill3Text: 'Conectar ações do jogador, dados e respostas visuais.', skill3Label: 'UI · HTML, CSS e JavaScript',
      contactKicker: 'Contato', contactLine1: 'Programação para Roblox.', contactLine2: 'Fale comigo.', contactText: 'Me chame para desenvolver uma mecânica, integrar um sistema<br class="desktop-br"> ou colaborar na programação de um projeto Roblox.', emailLabel: 'E-mail', copyEmail: 'Copiar e-mail', emailHint: 'Escreva sobre o projeto e o que você precisa implementar.', copyDiscord: 'Copiar usuário do Discord', discordHint: 'Copie o usuário e me adicione no Discord.', backTop: 'Voltar ao topo', closeProject: 'Fechar projeto',
      source: 'Ver no ArtStation', sourceCode: 'Ver código no GitHub', mediaYouTube: 'Abrir no YouTube', mediaDownload: 'Baixar demonstração',
      chapterLabel: 'Ir direto para uma mecânica', chapterCombo: 'Combos', chapterIai: 'Iai', chapterDuel: 'Duelo com o sensei', chapterParry: 'Parry',
      caseProblem: 'O problema', caseContribution: 'Minha implementação', caseDecision: 'Decisões e funcionamento', caseResult: 'O que é demonstrável', caseLimits: 'Limites desta versão', fileDownload: 'Baixar o módulo original ↗', watchDemo: 'Ver a demonstração de gameplay', checkGitHub: 'Conferir o pacote no GitHub', watch: 'Assistir {title}', preview: 'Prévia de {title}', demoTitle: 'Demonstração: {title}', studyBadge: 'Com estudo de caso', demoOne: 'demonstração', demoMany: 'demonstrações', copiedEmail: 'E-mail copiado!', copiedDiscord: 'Discord copiado: {value}', copyFail: 'Selecione e copie: {value}',
      musicRegion: 'Música de fundo', musicPlay: 'Tocar música', musicPause: 'Pausar música', musicSettings: 'Ajustes da música', musicClose: 'Fechar ajustes da música', musicVolume: 'Volume', musicLoading: 'Carregando…', musicReady: 'Toque para ouvir em volume baixo.', musicPlaying: 'Anything · Adrianne Lenker. Pausa ao abrir uma demonstração.', musicPaused: 'Pausada. Toque para continuar.', musicError: 'Não foi possível tocar a música. Tente novamente.'
    }
  }
};
