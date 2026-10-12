# Sarmento7 — Desenvolvedor Roblox

Portfólio em HTML, CSS e JavaScript, com estilos, fontes e imagens incluídos. Não precisa instalar dependências nem executar um build.

## Revisão 10 — música compacta e capas

No celular, o controle de música ocupa 90 × 46 px, com ícones para tocar/pausar e abrir os ajustes. Os dois botões mantêm uma área de toque de 44 px e nomes acessíveis traduzidos; a legenda do avatar fica livre. No desktop, os rótulos continuam visíveis.

Backrooms usa um recorte de 672 × 378 pixels da captura original, em vez de 448 × 252: uma área 50% mais larga, sem incluir painéis do Studio. As seis capas externas continuam usando suas fontes locais de 1280 × 720. Os recortes agora são desenhados diretamente no tamanho de apresentação, sem ampliar uma camada já reduzida por transformações CSS, e não há zoom adicional ao passar o mouse. A gravação de Backrooms disponível no YouTube chega a 720p; o enquadramento preserva o detalhe que existe nessa fonte.

## Revisão 9 — música de fundo

O MP3 de “Anything”, de Adrianne Lenker, fornecido pelo autor está incluído em `assets/music/anything.mp3`. O botão no canto inferior direito começa e pausa a reprodução; os ajustes mostram a faixa e um controle de volume de 0% a 30%, inicialmente em 8%. A faixa toca em repetição e começa apenas com um clique. Ao abrir qualquer demonstração ou sair da aba, a música pausa e só volta com outro clique. Fechar os ajustes mantém o botão de pausa acessível. Os controles acompanham o idioma EN / PT-BR. Não depende de um player externo para a música.

## Revisão 8 — enquadramentos das capas

As seis capas de vídeos externos têm enquadramentos individuais em 16:9 que deixam de fora os menus, painéis laterais e a área de saída do Roblox Studio. O enquadramento de Backrooms foca nas salas; os demais preservam a seleção de mapas, os personagens, os efeitos e a interface do jogo. As imagens originais permanecem no pacote: o recorte é feito na apresentação, sem recriar o conteúdo das cenas. As capas também ficam alinhadas pelo topo dos cards.

## Identidade visual da skin

O fundo usa carvão e tons de azul, com amarelo no raio da marca, no fio e nos botões. O brilho roxo foi retirado. A galeria tem duas colunas no desktop, imagens maiores, separadores simples e um card amplo para o dojo; no celular, fica em uma coluna. Os títulos de destaque, projetos, código e contato foram substituídos por textos diretos nos dois idiomas. O destaque agora se chama “Combate de katana. Dojo do Sensei Kaito.” / “Katana combat. Sensei Kaito’s dojo.”

## Dojo, treino e duelo

O card antes chamado “Sistemas de jogo” agora se chama “Dojo: treino e duelo” / “Dojo: training and duels”. O título, a legenda, as etiquetas e a descrição explicam os alvos de treino, a IA do Sensei Kaito, o fluxo do duelo e o feedback da interface. O texto identifica a gravação como uma demonstração complementar do projeto de katana.

## Demonstração e textos

O destaque, a galeria e os dois estudos de caso abrem o vídeo local de katana fornecido pelo autor. O player começa no treino, aos 0:11, e oferece atalhos para combos (0:11), Iai (0:28), duelo (1:03) e parry (1:18). A indicação “PARRY!” aparece por volta de 1:19 na gravação. As descrições dos sete projetos foram reescritas em primeira pessoa nos dois idiomas, sem atribuir um algoritmo específico aos sistemas antigos.

## Inglês e PT-BR

O site abre em **inglês** na primeira visita, independentemente do idioma do navegador. O seletor **EN / PT-BR** no cabeçalho muda os textos, projetos, estudos de caso, avisos, descrições acessíveis e metadados. A escolha é salva no navegador para as próximas visitas. Se o armazenamento estiver indisponível, o seletor continua funcionando e a próxima visita começa em inglês.

## Demonstração de katana corrigida

A demonstração correta é o arquivo `sistemas.mp4` fornecido pelo autor: treino com bonecos e duelo contra o Sensei Kaito. Ela está incluída em `assets/katana-sistemas.mp4`, com a mesma duração e áudio, otimizada para 720p e 30 quadros por segundo. O enquadramento retira as bordas do Roblox Studio. A capa `assets/katana-cover.jpg` foi extraída do duelo nessa gravação. O destaque, a galeria e os botões dos estudos de caso abrem esse mesmo vídeo local, com controles e opção de download.

## Layout e conteúdo

- O combate de katana aparece logo após a primeira tela. A galeria vem antes da biografia e das habilidades.
- Dois estudos de caso, sobre o combate e o Iai, usam o pacote público `4 systems.zip` do repositório https://github.com/sarmento777/Projects. Incluem problema, contribuição, decisões, resultado verificável no código e limitações.
- A janela de código metafórico foi substituída por trechos reais de `CombatResolver.lua` e `IaiPath.lua`. Os módulos completos estão em `assets/code/` e podem ser baixados na página.
- Capas de 1280 × 720, cores preservadas e enquadramentos próximos do conteúdo principal. As legendas explicam o que cada registro mostra.
- Interface em inglês por padrão, com opção de PT-BR, navegação e textos maiores, sem órbitas, números decorativos ou símbolos flutuantes.
- Uma nova imagem frontal da skin, em `assets/avatar-v2.png`, gerada com ImageGen a partir das referências fornecidas. Um fio vetorial acompanha o personagem e reage ao arraste. No celular, o gesto horizontal preserva a rolagem vertical; as setas do teclado e Escape também controlam o avatar. A preferência do sistema por reduzir movimentos é respeitada.

## Publicar no Netlify

1. Extraia o arquivo `sarmento7-netlify-v10.zip`.
2. Acesse https://app.netlify.com/drop e arraste a pasta extraída `sarmento7-site`, que contém `index.html`.
3. O Netlify publicará o site. Você pode alterar o nome do endereço nas configurações do site.

Se conectar a um repositório Git: deixe **Build command** vazio e **Publish directory** como `.`. Se esta pasta estiver dentro de um repositório maior, use `sarmento7-site` como **Base directory**.

## Personalizar

- `content.js`: contatos, vídeos, descrições, enquadramentos e estudos de caso.
- `i18n.js`: traduções de inglês e PT-BR. O conteúdo dos projetos em PT-BR fica em `content.js`; suas versões em inglês ficam em `i18n.js`.
- `index.html`: apresentação, destaque, biografia e contato.
- `style.css`: cores, tamanhos e animações.
- `music.js`: controles e pausa automática da música.
- `assets/`: imagens, fontes, capas e MP3.

Os links de contato também aparecem diretamente no HTML para funcionar sem JavaScript. Ao alterar e-mail ou nome, atualize os dois arquivos.

## Mídias

A imagem frontal usada na abertura é `assets/avatar-v2.png`, gerada com ImageGen. A miniatura pública original do perfil Roblox 3097904644 foi preservada em `assets/avatar.png`. As duas imagens fornecidas foram incluídas em `assets/avatar-pose.png` e `assets/avatar-front.png`.

Os outros seis projetos usam capas e demonstrações das coleções do seu ArtStation:

- https://www.artstation.com/artwork/5eWkrw — Games
- https://www.artstation.com/artwork/DY5mz9 — Game Systems

O ArtStation publica seus vídeos como players do YouTube. Esses seis vídeos são incorporados apenas quando o visitante abre uma demonstração; eles precisam de internet e devem continuar públicos ou não listados. O vídeo de katana está no próprio pacote e será servido pelo Netlify. As capas e imagens também estão salvas localmente.

As fontes locais Manrope e Space Grotesk são distribuídas sob a SIL Open Font License. Os estudos de caso descrevem os módulos do projeto de katana. As outras descrições apresentam o funcionamento e a etapa de protótipo mostrados nas demonstrações.
