"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Modalidade =
  | "particulares"
  | "vestibulares"
  | "plantao"
  | "psicopedagogia";

const DISCIPLINAS: Record<string, string[]> = {
  fundamental: [
    "Matemática",
    "Língua Portuguesa",
    "Ciências",
    "Física",
    "Química",
    "Biologia",
    "História",
    "Geografia",
    "Língua Inglesa",
    "Outros",
  ],
  medio: [
    "Matemática",
    "Física",
    "Química",
    "Biologia",
    "Língua Portuguesa",
    "Língua Inglesa",
    "História",
    "Geografia",
    "Filosofia",
    "Outros",
  ],
  superior: [
    "Matemática Elementar",
    "Cálculo",
    "Vetores e Geometria Analítica",
    "Álgebra Linear",
    "Programação",
    "Otimização Linear",
    "Otimização Não Linear",
    "Matemática Financeira",
    "Estatística",
    "Equações Diferenciais",
    "Contabilidade",
    "Microeconomia",
    "Macroeconomia",
    "Econometria",
    "Outros",
  ],
};

const INSTITUICOES = [
  "Universidade de São Paulo (USP)",
  "Universidade Estadual de Campinas (UNICAMP)",
  "Universidade Estadual Paulista (UNESP)",
  "Universidade Federal de São Paulo (UNIFESP)",
  "Universidade Federal de São Carlos (UFSCAR)",
  "Universidade Federal de Viçosa",
  "Fundação Getúlio Vargas (FGV)",
  "Instituto de Ensino e Pesquisa (INSPER)",
  "Instituto Tecnológico da Aeronáutica (ITA)",
  "Universidade Federal de Minas Gerais (UFMG)",
  "Outros",
];

const CURSOS = [
  "Bacharelado em Matemática",
  "Licenciatura em Matemática",
  "Bacharelado em Física",
  "Licenciatura em Física",
  "Bacharelado em Letras",
  "Licenciatura em Letras",
  "Bacharelado em Química",
  "Licenciatura em Química",
  "Bacharelado em Biologia",
  "Licenciatura em Biologia",
  "Bacharelado em Filosofia",
  "Licenciatura em Filosofia",
  "Bacharelado em Sociologia",
  "Licenciatura em Sociologia",
  "Bacharelado em História",
  "Licenciatura em História",
  "Bacharelado em Geografia",
  "Licenciatura em Geografia",
  "Bacharelado em Ciências Econômicas",
  "Bacharelado em Administração de Empresas",
  "Bacharelado em Ciências Contábeis",
  "Bacharelado em Ciências Atuariais",
  "Bacharelado em Engenharia Civil",
  "Bacharelado em Engenharia Mecânica",
  "Bacharelado em Engenharia de Produção",
  "Bacharelado em Engenharia Elétrica",
  "Bacharelado em Engenharia de Infraestrutura",
  "Bacharelado em Engenharia da Computação",
  "Bacharelado em Ciência de Dados",
  "Bacharelado em Ciência da Computação",
  "Outros",
];

const ESTADOS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const TARIFAS: Record<string, Record<string, number>> = {
  online: { fundamental_1: 60, fundamental_2: 65, medio: 70, superior: 85 },
  presencial: { fundamental_1: 70, fundamental_2: 75, medio: 85, superior: 90 },
};

const NIVEIS_TARIFA = [
  { value: "fundamental_1", label: "Ensino Fundamental I" },
  { value: "fundamental_2", label: "Ensino Fundamental II" },
  { value: "medio", label: "Ensino Médio" },
  { value: "superior", label: "Ensino Superior" },
];

const VALOR_DESLOCAMENTO = 15;
const VALOR_INTERNET = 15;

const bonusGrupo = [
  { qtd: "2 alunos", bonus: "+10%" },
  { qtd: "3 alunos", bonus: "+15%" },
  { qtd: "4 ou mais alunos", bonus: "+20%" },
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type Formacao = {
  nivel: string;
  curso: string;
  cursoOutro: string;
  instituicao: string;
  instituicaoOutro: string;
  ano: string;
};

const formacaoVazia: Formacao = {
  nivel: "graduacao",
  curso: "",
  cursoOutro: "",
  instituicao: "",
  instituicaoOutro: "",
  ano: "",
};

function formatarCep(value: string) {
  const n = value.replace(/\D/g, "").slice(0, 8);
  return n.length > 5 ? `${n.slice(0, 5)}-${n.slice(5)}` : n;
}

export default function TrabalheConoscoPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const ETAPAS = [
    "Dados básicos",
    "Endereço",
    "Formação",
    "Disciplinas",
    "Revisão",
  ];

  // Dados básicos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState<"regular" | "estagiario">("regular");
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);

  // Endereço/pessoal
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [cepErro, setCepErro] = useState("");

  // Formação
  const [formacoes, setFormacoes] = useState<Formacao[]>([formacaoVazia]);

  // Disciplinas
  const [disciplinas, setDisciplinas] = useState<
    { segmento: string; disciplina: string }[]
  >([]);
  const [outroFundamental, setOutroFundamental] = useState("");
  const [outroMedio, setOutroMedio] = useState("");
  const [outroSuperior, setOutroSuperior] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  const isPsicopedagoga =
    modalidades.includes("psicopedagogia") && modalidades.length === 1;

  function toggleModalidade(m: Modalidade) {
    setModalidades((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );
  }

  function toggleDisciplina(segmento: string, disciplina: string) {
    setDisciplinas((prev) => {
      const existe = prev.some(
        (d) => d.segmento === segmento && d.disciplina === disciplina,
      );
      return existe
        ? prev.filter(
            (d) => !(d.segmento === segmento && d.disciplina === disciplina),
          )
        : [...prev, { segmento, disciplina }];
    });
  }

  function addFormacao() {
    setFormacoes((prev) => [
      ...prev,
      { ...formacaoVazia, nivel: "especializacao" },
    ]);
  }

  function updateFormacao(index: number, field: keyof Formacao, value: string) {
    setFormacoes((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    );
  }

  async function buscarCep(cepLimpo: string) {
    setBuscandoCep(true);
    setCepErro("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepErro("CEP não encontrado.");
        setBuscandoCep(false);
        return;
      }
      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch {
      setCepErro("Não foi possível buscar o CEP. Preencha manualmente.");
    } finally {
      setBuscandoCep(false);
    }
  }

  function handleCepChange(value: string) {
    const f = formatarCep(value);
    setCep(f);
    setCepErro("");
    if (f.replace(/\D/g, "").length === 8) buscarCep(f.replace(/\D/g, ""));
  }

  function validarEtapa(): string {
    if (etapa === 0) {
      if (!nome || !email) return "Informe seu nome e e-mail.";
      if (modalidades.length === 0) return "Selecione ao menos uma modalidade.";
    }
    return "";
  }

  function avancar() {
    const msg = validarEtapa();
    if (msg) {
      setErro(msg);
      return;
    }
    setErro("");
    setEtapa((e) => Math.min(e + 1, ETAPAS.length - 1));
  }

  function voltar() {
    setErro("");
    setEtapa((e) => Math.max(e - 1, 0));
  }

  async function enviar() {
    setErro("");
    setEnviando(true);

    const formacoesValidas = formacoes
      .filter((f) => f.curso)
      .map((f) => ({
        nivel: f.nivel,
        curso: f.curso === "Outros" ? f.cursoOutro : f.curso,
        instituicao:
          f.instituicao === "Outros" ? f.instituicaoOutro : f.instituicao,
        ano: f.ano || null,
      }));

    const todasDisciplinas = [...disciplinas];
    if (outroFundamental)
      todasDisciplinas.push({
        segmento: "fundamental",
        disciplina: outroFundamental,
      });
    if (outroMedio)
      todasDisciplinas.push({ segmento: "medio", disciplina: outroMedio });
    if (outroSuperior)
      todasDisciplinas.push({
        segmento: "superior",
        disciplina: outroSuperior,
      });

    const { error } = await supabase.from("solicitacoes_professor").insert({
      nome,
      email,
      telefone: telefone || null,
      tipo,
      modalidades,
      cpf: cpf || null,
      data_nascimento: dataNascimento || null,
      cep: cep || null,
      rua: rua || null,
      numero: numero || null,
      complemento: complemento || null,
      bairro: bairro || null,
      cidade: cidade || null,
      estado: estado || null,
      formacoes: formacoesValidas.length > 0 ? formacoesValidas : null,
      disciplinas: todasDisciplinas.length > 0 ? todasDisciplinas : null,
      mensagem: mensagem || null,
      status: "pendente",
    });

    setEnviando(false);
    if (error) {
      setErro("Erro ao enviar: " + error.message);
      return;
    }
    setEnviado(true);
  }

  const inputClass =
    "w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50";
  const selectClass = inputClass;

  if (enviado) {
    return (
      <div className="min-h-screen bg-[#08364E] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <p className="text-green-300 text-sm bg-green-500/10 rounded-lg px-4 py-6">
            ✓ Recebemos sua candidatura! Vamos analisar seu perfil e entrar em
            contato em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08364E] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-20 w-20"
          >
            <defs>
              <radialGradient
                id="esferaGrad"
                cx="38%"
                cy="33%"
                r="70%"
                fx="36%"
                fy="30%"
              >
                <stop offset="0%" stopColor="#2A8FC0" />
                <stop offset="30%" stopColor="#1566A0" />
                <stop offset="60%" stopColor="#0A4A7A" />
                <stop offset="85%" stopColor="#083A60" />
                <stop offset="100%" stopColor="#051E3A" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#esferaGrad)" />
          </svg>
          <p className="mt-3 text-lg font-semibold tracking-widest text-white uppercase">
            ESFERA
          </p>
          <p className="mt-3 text-center text-white/70 text-sm leading-relaxed">
            Trabalhe conosco
          </p>
        </div>

        {!mostrarFormulario && (
          <>
            <p className="text-center text-xs text-white/50 mb-4">
              Estes são os valores pagos por hora de aula, por nível e
              modalidade.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {NIVEIS_TARIFA.map((n) => (
                <div
                  key={n.value}
                  className="rounded-2xl px-5 py-4 bg-white/10 border border-white/10"
                >
                  <p className="text-sm font-medium text-white mb-3">
                    {n.label}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">On-line</span>
                      <span className="text-white font-medium">
                        {formatarMoeda(TARIFAS.online[n.value])}
                        <span className="text-white/40 font-normal">/hora</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">
                        Presencial (Espaço ESFERA ou domicílio)
                      </span>
                      <span className="text-white font-medium">
                        {formatarMoeda(TARIFAS.presencial[n.value])}
                        <span className="text-white/40 font-normal">/hora</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                Bônus por aula em grupo
              </p>
              <div className="flex flex-col gap-2">
                {bonusGrupo.map((b) => (
                  <div
                    key={b.qtd}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/70">{b.qtd}</span>
                    <span className="text-white font-medium">{b.bonus}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                Auxílios adicionais
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">
                    Auxílio deslocamento (por sessão presencial)
                  </span>
                  <span className="text-white font-medium">
                    {formatarMoeda(VALOR_DESLOCAMENTO)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">
                    Auxílio internet (aulas on-line)
                  </span>
                  <span className="text-white font-medium">
                    {formatarMoeda(VALOR_INTERNET)}
                    <span className="text-white/40 font-normal">/hora</span>
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mt-3">
                O auxílio deslocamento é calculado por sessão do dia — aulas
                presenciais seguidas, com menos de 4h de intervalo entre elas,
                contam como uma única sessão.
              </p>
            </div>

            <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-6">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                Ciclo de pagamento
              </p>
              <div className="flex flex-col gap-2 text-sm text-white/70 leading-relaxed">
                <p>Aulas do dia 1 ao dia 15 → pagas até o dia 20.</p>
                <p>
                  Aulas do dia 16 ao último dia do mês → pagas até o dia 5 do
                  mês seguinte.
                </p>
              </div>
            </div>

            <button
              onClick={() => setMostrarFormulario(true)}
              className="w-full bg-[#1566A0] hover:bg-[#1A7FBA] text-white font-semibold py-3 rounded-lg transition-all duration-200 mb-8"
            >
              Quero me candidatar
            </button>
          </>
        )}

        {mostrarFormulario && (
          <div className="rounded-2xl px-5 py-5 bg-white/10 border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-xs text-white/50 hover:text-white/80"
              >
                ← voltar aos valores
              </button>
              <span className="text-xs text-white/40">
                {ETAPAS[etapa]} ({etapa + 1}/{ETAPAS.length})
              </span>
            </div>

            {etapa === 0 && (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome completo *"
                  className={inputClass}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail *"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Telefone / WhatsApp"
                  className={inputClass}
                />

                <div>
                  <p className="text-xs text-white/60 mb-2">Tipo</p>
                  <div className="flex gap-2">
                    {(["regular", "estagiario"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTipo(t)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm border ${tipo === t ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                      >
                        {t === "regular" ? "Regular" : "Estagiário(a)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/60 mb-2">
                    Modalidades de interesse *
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {(
                      [
                        ["particulares", "Aulas Particulares"],
                        ["vestibulares", "Vestibulares"],
                        ["plantao", "Plantão"],
                        ["psicopedagogia", "Psicopedagogia"],
                      ] as [Modalidade, string][]
                    ).map(([m, label]) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleModalidade(m)}
                        className={`px-3 py-2 rounded-lg text-sm border ${modalidades.includes(m) ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {etapa === 1 && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="CPF"
                    className={inputClass}
                  />
                  <div className="flex-1">
                    <label className="text-xs text-white/40 mb-1 block">
                      Data de nascimento
                    </label>
                    <input
                      type="date"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => handleCepChange(e.target.value)}
                  placeholder="CEP"
                  maxLength={9}
                  className={inputClass}
                />
                {buscandoCep && (
                  <p className="text-xs text-white/40">Buscando endereço...</p>
                )}
                {cepErro && <p className="text-xs text-red-400">{cepErro}</p>}
                <input
                  type="text"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Rua"
                  className={inputClass}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="Número"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    placeholder="Complemento"
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro"
                  className={inputClass}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Cidade"
                    className={inputClass}
                  />
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className={selectClass}
                  >
                    <option value="" className="text-gray-800">
                      UF
                    </option>
                    {ESTADOS.map((uf) => (
                      <option key={uf} value={uf} className="text-gray-800">
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {etapa === 2 && (
              <div className="flex flex-col gap-3">
                {formacoes.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-2"
                  >
                    <select
                      value={f.nivel}
                      onChange={(e) =>
                        updateFormacao(i, "nivel", e.target.value)
                      }
                      className={selectClass}
                    >
                      <option value="graduacao" className="text-gray-800">
                        Graduação
                      </option>
                      <option value="especializacao" className="text-gray-800">
                        Especialização
                      </option>
                      <option value="mestrado" className="text-gray-800">
                        Mestrado
                      </option>
                      <option value="doutorado" className="text-gray-800">
                        Doutorado
                      </option>
                    </select>
                    <select
                      value={f.curso}
                      onChange={(e) =>
                        updateFormacao(i, "curso", e.target.value)
                      }
                      className={selectClass}
                    >
                      <option value="" className="text-gray-800">
                        Selecione o curso
                      </option>
                      {CURSOS.map((c) => (
                        <option key={c} value={c} className="text-gray-800">
                          {c}
                        </option>
                      ))}
                    </select>
                    {f.curso === "Outros" && (
                      <input
                        type="text"
                        value={f.cursoOutro}
                        onChange={(e) =>
                          updateFormacao(i, "cursoOutro", e.target.value)
                        }
                        placeholder="Especifique o curso"
                        className={inputClass}
                      />
                    )}
                    <select
                      value={f.instituicao}
                      onChange={(e) =>
                        updateFormacao(i, "instituicao", e.target.value)
                      }
                      className={selectClass}
                    >
                      <option value="" className="text-gray-800">
                        Selecione a instituição
                      </option>
                      {INSTITUICOES.map((inst) => (
                        <option
                          key={inst}
                          value={inst}
                          className="text-gray-800"
                        >
                          {inst}
                        </option>
                      ))}
                    </select>
                    {f.instituicao === "Outros" && (
                      <input
                        type="text"
                        value={f.instituicaoOutro}
                        onChange={(e) =>
                          updateFormacao(i, "instituicaoOutro", e.target.value)
                        }
                        placeholder="Especifique a instituição"
                        className={inputClass}
                      />
                    )}
                    <input
                      type="number"
                      value={f.ano}
                      onChange={(e) => updateFormacao(i, "ano", e.target.value)}
                      placeholder="Ano de conclusão"
                      className={inputClass}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFormacao}
                  className="text-xs text-white/60 hover:text-white text-left"
                >
                  + Adicionar outra formação
                </button>
              </div>
            )}

            {etapa === 3 && (
              <div className="flex flex-col gap-4">
                {isPsicopedagoga ? (
                  <p className="text-sm text-white/60">
                    Psicopedagogia — atendimento clínico, sem disciplinas
                    específicas.
                  </p>
                ) : (
                  (["fundamental", "medio", "superior"] as const).map((seg) => (
                    <div key={seg}>
                      <p className="text-xs text-white/60 mb-2">
                        {seg === "fundamental"
                          ? "Ensino Fundamental"
                          : seg === "medio"
                            ? "Ensino Médio"
                            : "Ensino Superior"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {DISCIPLINAS[seg]
                          .filter((d) => d !== "Outros")
                          .map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => toggleDisciplina(seg, d)}
                              className={`px-3 py-1.5 rounded-lg text-xs border ${disciplinas.some((x) => x.segmento === seg && x.disciplina === d) ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                            >
                              {d}
                            </button>
                          ))}
                      </div>
                      <input
                        type="text"
                        value={
                          seg === "fundamental"
                            ? outroFundamental
                            : seg === "medio"
                              ? outroMedio
                              : outroSuperior
                        }
                        onChange={(e) =>
                          seg === "fundamental"
                            ? setOutroFundamental(e.target.value)
                            : seg === "medio"
                              ? setOutroMedio(e.target.value)
                              : setOutroSuperior(e.target.value)
                        }
                        placeholder="Outros (especifique)"
                        className={`${inputClass} mt-2`}
                      />
                    </div>
                  ))
                )}
              </div>
            )}

            {etapa === 4 && (
              <div className="flex flex-col gap-3">
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={3}
                  placeholder="Conte um pouco sobre sua experiência (opcional)"
                  className={inputClass}
                />
                <div className="bg-white/5 rounded-lg px-3 py-2 text-xs text-white/60">
                  <p>
                    <span className="text-white">{nome || "—"}</span> ·{" "}
                    {email || "sem e-mail"}
                  </p>
                  <p>
                    {modalidades.length > 0
                      ? modalidades.join(", ")
                      : "nenhuma modalidade selecionada"}
                  </p>
                </div>
              </div>
            )}

            {erro && <p className="text-red-400 text-xs mt-3">{erro}</p>}

            <div className="flex gap-2 mt-4">
              {etapa > 0 && (
                <button
                  onClick={voltar}
                  className="flex-1 border border-white/20 text-white/70 py-2 rounded-lg text-sm hover:bg-white/5"
                >
                  Voltar
                </button>
              )}
              {etapa < ETAPAS.length - 1 ? (
                <button
                  onClick={avancar}
                  className="flex-1 bg-[#1566A0] hover:bg-[#1A7FBA] text-white py-2 rounded-lg text-sm font-medium"
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={enviar}
                  disabled={enviando}
                  className="flex-1 bg-[#1566A0] hover:bg-[#1A7FBA] text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {enviando ? "Enviando..." : "Enviar candidatura"}
                </button>
              )}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-white/30">
          © ESFERA Aulas Particulares · Alameda Casa Branca, 393 · Jardim
          Paulista, São Paulo · CNPJ 65.277.896/0001-04
        </p>
      </div>
    </div>
  );
}
