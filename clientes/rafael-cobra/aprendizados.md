# Aprendizados — Rafael Cobra

Log do que funciona e do que não funciona com este cliente.

| Data | Aprendizado / decisão | Origem |
| ---------- | --------------------- | ------ |
| 2026-08-06 | **Os canvases dele foram preenchidos com ajuda de IA.** Ele mesmo sinaliza ("vou colocar 2 observações que o agente colocou"). Tratar como material endossado pelo cliente, **não** como palavra dele — sobretudo preços e nomes de método. | Material de onboarding |
| 2026-08-06 | **Preços do canvas são chute do agente de IA**, não valores praticados. Não usar como base de oferta antes de confirmar. | `contexto/fontes/` |
| 2026-08-06 | **"®" em "Método Cobra®" / "Método Cobra Authority®" não tem registro confirmado no INPI.** Foi retirado na versão preenchida. Publicar indicação de marca registrada sem registro é risco jurídico. | Decisão da sessão |
| 2026-08-06 | **"MétodoCobra" já existe como destaque no Instagram dele** — a sugestão do agente pode não ser nome novo. Verificar antes de tratar como criação. | Prints do Instagram |
| 2026-08-06 | **Decisão "qual produto entra primeiro" NÃO deve ser tomada pela Simple sozinha.** O Rafael pediu explicitamente uma conversa ("não quero colocar o carro na frente dos bois"), e o Carlos reservou a reunião de segunda para isso. Análise pronta, decisão em aberto. | Áudio do Rafael + WhatsApp do Carlos |
| 2026-08-06 | **A empolgação dele está no Produto 2; a competência demonstrada está no Produto 1.** No áudio, o P1 é "tranquilo de preencher" (competência) e o P2 é "muito muito bom mesmo" (desejo). Ignorar qualquer um dos dois lados custa caro — o primeiro em execução, o segundo em resultado. | Áudio do Rafael |
| 2026-08-06 | **"Fácil de vender" ≠ "rápido de lançar".** Ele acha que o P2 dá "bom e rápido"; a análise sugere que o P2 é o mais **lento** de lançar (público não existe na base dele), ainda que possa ser mais fácil de vender. Distinção a levar para a reunião. | Análise da sessão |
| 2026-08-06 | **O ICP do P1 não pode ser tratado como carente.** Ela é executiva/médica/advogada e explicitamente não quer ser vista como "desesperada" ou "que aceita migalhas". Promessa de conquista colide com o status dela **e** com o mecanismo dele. | Canvas P1 (cliente ideal) |
| 2026-08-06 | **O ICP do P2 tem resistência ética a marketing.** Termos como "máquina de aquisição" e "escala" (que estão nos nomes dos módulos) podem afastar na comunicação de topo, mesmo funcionando dentro do produto. Testar. | Canvas P2 (cliente ideal) |
| 2026-08-06 | **Prova social esbarra em sigilo profissional.** Ele é psicanalista; "casos reais de transformação" não podem virar página de vendas sem alinhamento ético. Confirmar formação/registro — psicólogo registrado tem resolução de publicidade do CFP. | Análise da sessão |
| 2026-08-06 | **Concorrentes vieram só por categoria, sem nenhum nome.** Levantar nomes na reunião — saber contra quem se compara muda oferta e preço. | Canvas P1 e P2 |
| 2026-08-06 | **Upload no Drive: `create_file` com `contentMimeType: "text/html"` converte direto para Google Doc nativo formatado** (títulos, negrito, listas e tabelas reais). Não precisa de navegador nem do passo "Abrir com Google Docs" — isso contraria o playbook antigo da skill. **Ressalva: emoji literal no HTML corrompe no upload** (👀 vira `ð`) — usar descrição em texto. | Operação validada nesta conta |
| 2026-08-06 | **O MCP do Drive não tem update/edit, só `create_file`.** Não dá para editar um Doc existente no lugar: o caminho é ler o original e subir uma versão nova, deixando o original intacto. | Limitação da ferramenta |
