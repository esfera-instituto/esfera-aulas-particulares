"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const NIVEIS = [
  { value: "fundamental_1", label: "Ensino Fundamental I" },
  { value: "fundamental_2", label: "Ensino Fundamental II" },
  { value: "medio", label: "Ensino Médio" },
  { value: "superior", label: "Ensino Superior" },
];

const MODALIDADES = [
  { value: "online", label: "On-line" },
  { value: "espaco_esfera", label: "Espaço ESFERA" },
  { value: "domicilio", label: "Domicílio" },
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

const INSTITUICOES_FUNDAMENTAL_MEDIO = [
  "Colégio Dante",
  "Colégio São Luís",
  "Colégio Bandeirantes",
  "Colégio Magno",
  "Colégio Rio Branco",
  "Colégio Mackenzie",
  "Colégio Etapa",
  "Colégio Objetivo",
  "Colégio Anglo",
  "Colégio Poliedro",
  "Colégio CPV",
  "Colégio Santa Marcelina",
  "Colégio Porto Seguro",
  "Colégio Santa Cruz",
  "Colégio Saint Paul",
  "Colégio Vértice",
  "Outros",
];

const INSTITUICOES_SUPERIOR = [
  "FGV SP",
  "IBMEC",
  "INSPER",
  "PUC SP",
  "Mackenzie",
  "USP",
  "FEI",
  "Mauá",
  "Outros",
];

function getInstituicoes(nivel: string) {
  if (nivel === "superior") return INSTITUICOES_SUPERIOR;
  return INSTITUICOES_FUNDAMENTAL_MEDIO;
}

const VALOR_HORA: Record<string, Record<string, number>> = {
  online: { fundamental_1: 150, fundamental_2: 160, medio: 170, superior: 200 },
  espaco_esfera: {
    fundamental_1: 170,
    fundamental_2: 180,
    medio: 200,
    superior: 220,
  },
  domicilio: {
    fundamental_1: 200,
    fundamental_2: 210,
    medio: 220,
    superior: 250,
  },
};

const DESCONTO_ACOMPANHAMENTO = 5;

const TAMANHOS_PACOTE = [
  { horas: 6, desconto: 3, validade: 45 },
  { horas: 10, desconto: 5, validade: 60 },
  { horas: 20, desconto: 8, validade: 90 },
];

const descontosGrupo = [
  { qtd: "2 alunos", desconto: "5%" },
  { qtd: "3 alunos", desconto: "10%" },
  { qtd: "4 ou mais alunos", desconto: "15%" },
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarCep(value: string) {
  const n = value.replace(/\D/g, "").slice(0, 8);
  return n.length > 5 ? `${n.slice(0, 5)}-${n.slice(5)}` : n;
}

type SimNao = "sim" | "nao" | "";

export default function InvestimentoPage() {
  // Calculadora
  const [nivel, setNivel] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [formaContratacao, setFormaContratacao] = useState("");
  const [pacoteHoras, setPacoteHoras] = useState<number | null>(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const ETAPAS = [
    "Dados pessoais",
    "Endereço",
    "Instituição",
    "Responsável",
    "Revisão",
  ];

  // Dados pessoais
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [cepErro, setCepErro] = useState("");

  // Instituição
  const [matriculadoInstituicao, setMatriculadoInstituicao] =
    useState<SimNao>("");
  const [anoSerie, setAnoSerie] = useState("");
  const [cursoSuperior, setCursoSuperior] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [instituicaoOutro, setInstituicaoOutro] = useState("");
  const [fazCursinhoExterno, setFazCursinhoExterno] = useState<SimNao>("");
  const [cursinhoNome, setCursinhoNome] = useState("");
  const [cursinhoModalidade, setCursinhoModalidade] = useState<
    "online" | "presencial" | ""
  >("");

  // Responsável
  const [respEhAluno, setRespEhAluno] = useState(false);
  const [respNome, setRespNome] = useState("");
  const [respParentesco, setRespParentesco] = useState("");
  const [respCpf, setRespCpf] = useState("");
  const [respTelefone, setRespTelefone] = useState("");
  const [respEmail, setRespEmail] = useState("");
  const [respMesmoEndereco, setRespMesmoEndereco] = useState(true);
  const [respCep, setRespCep] = useState("");
  const [respRua, setRespRua] = useState("");
  const [respNumero, setRespNumero] = useState("");
  const [respComplemento, setRespComplemento] = useState("");
  const [respBairro, setRespBairro] = useState("");
  const [respCidade, setRespCidade] = useState("");
  const [respEstado, setRespEstado] = useState("");
  const [buscandoCepResp, setBuscandoCepResp] = useState(false);
  const [cepErroResp, setCepErroResp] = useState("");

  // Interesse
  const [ehAlunoNovo, setEhAlunoNovo] = useState<boolean | null>(null);
  const [alunoExistenteNome, setAlunoExistenteNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  const valorHora =
    nivel && modalidade ? VALOR_HORA[modalidade]?.[nivel] || 0 : 0;

  function selecionarOpcao(forma: string, horas: number | null = null) {
    setFormaContratacao(forma);
    setPacoteHoras(horas);
    setMostrarFormulario(true);
    setEtapa(0);
  }

  async function buscarCep(cepLimpo: string, tipo: "aluno" | "responsavel") {
    const setBuscando = tipo === "aluno" ? setBuscandoCep : setBuscandoCepResp;
    const setErroLocal = tipo === "aluno" ? setCepErro : setCepErroResp;
    const setRuaAlvo = tipo === "aluno" ? setRua : setRespRua;
    const setBairroAlvo = tipo === "aluno" ? setBairro : setRespBairro;
    const setCidadeAlvo = tipo === "aluno" ? setCidade : setRespCidade;
    const setEstadoAlvo = tipo === "aluno" ? setEstado : setRespEstado;

    setBuscando(true);
    setErroLocal("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (data.erro) {
        setErroLocal("CEP não encontrado.");
        setBuscando(false);
        return;
      }
      setRuaAlvo(data.logradouro || "");
      setBairroAlvo(data.bairro || "");
      setCidadeAlvo(data.localidade || "");
      setEstadoAlvo(data.uf || "");
    } catch {
      setErroLocal("Não foi possível buscar o CEP. Preencha manualmente.");
    } finally {
      setBuscando(false);
    }
  }

  function handleCepChange(value: string) {
    const f = formatarCep(value);
    setCep(f);
    setCepErro("");
    if (f.replace(/\D/g, "").length === 8)
      buscarCep(f.replace(/\D/g, ""), "aluno");
  }

  function handleCepRespChange(value: string) {
    const f = formatarCep(value);
    setRespCep(f);
    setCepErroResp("");
    if (f.replace(/\D/g, "").length === 8)
      buscarCep(f.replace(/\D/g, ""), "responsavel");
  }

  function toggleRespEhAluno() {
    if (!respEhAluno) {
      setRespNome(nome);
      setRespCpf(cpf);
      setRespTelefone(telefone);
      setRespEmail(email);
      setRespMesmoEndereco(true);
    }
    setRespEhAluno(!respEhAluno);
  }

  function validarEtapa(): string {
    if (etapa === 0) {
      if (!nome || !telefone) return "Informe seu nome e telefone.";
    }
    if (etapa === 3 && !respEhAluno) {
      if (!respNome) return "Informe o nome do(a) responsável.";
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

  async function enviarSolicitacao() {
    setErro("");
    if (ehAlunoNovo === null) {
      setErro("Informe se já é aluno(a) da ESFERA.");
      return;
    }
    setEnviando(true);

    const enderecoResp = respMesmoEndereco
      ? {
          resp_cep: cep,
          resp_rua: rua,
          resp_numero: numero,
          resp_complemento: complemento,
          resp_bairro: bairro,
          resp_cidade: cidade,
          resp_estado: estado,
        }
      : {
          resp_cep: respCep,
          resp_rua: respRua,
          resp_numero: respNumero,
          resp_complemento: respComplemento,
          resp_bairro: respBairro,
          resp_cidade: respCidade,
          resp_estado: respEstado,
        };

    const { error } = await supabase.from("solicitacoes_interesse").insert({
      nome,
      cpf: cpf || null,
      data_nascimento: dataNascimento || null,
      email: email || null,
      telefone: telefone || null,
      cep: cep || null,
      rua: rua || null,
      numero: numero || null,
      complemento: complemento || null,
      bairro: bairro || null,
      cidade: cidade || null,
      estado: estado || null,
      matriculado_instituicao:
        matriculadoInstituicao === "sim"
          ? true
          : matriculadoInstituicao === "nao"
            ? false
            : null,
      nivel: nivel || null,
      ano_serie: anoSerie || null,
      curso_superior: cursoSuperior || null,
      instituicao:
        (instituicao === "Outros" ? instituicaoOutro : instituicao) || null,
      faz_cursinho_externo:
        fazCursinhoExterno === "sim"
          ? true
          : fazCursinhoExterno === "nao"
            ? false
            : null,
      cursinho_nome: cursinhoNome || null,
      cursinho_modalidade: cursinhoModalidade || null,
      resp_e_aluno: respEhAluno,
      resp_nome: respEhAluno ? nome : respNome,
      resp_parentesco: respParentesco || null,
      resp_cpf: respEhAluno ? cpf : respCpf,
      resp_telefone: respEhAluno ? telefone : respTelefone,
      resp_email: respEhAluno ? email : respEmail,
      resp_mesmo_endereco: respMesmoEndereco,
      ...enderecoResp,
      eh_aluno_novo: ehAlunoNovo,
      aluno_existente_nome: !ehAlunoNovo ? alunoExistenteNome || null : null,
      nivel_interesse: nivel || null,
      modalidade_interesse: modalidade || null,
      forma_contratacao: formaContratacao || null,
      pacote_horas: pacoteHoras,
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
            ✓ Recebemos sua solicitação! Em breve entraremos em contato para
            confirmar disponibilidade e formalizar a contratação.
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
            Invista no seu aprendizado
          </p>
        </div>

        {!mostrarFormulario && (
          <>
            <div className="rounded-2xl px-5 py-4 bg-white/10 border border-white/10 mb-6">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                Simule o seu investimento
              </p>
              <div className="flex flex-col gap-3 mb-4">
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="text-gray-800">
                    Selecione o nível de ensino
                  </option>
                  {NIVEIS.map((n) => (
                    <option
                      key={n.value}
                      value={n.value}
                      className="text-gray-800"
                    >
                      {n.label}
                    </option>
                  ))}
                </select>
                <select
                  value={modalidade}
                  onChange={(e) => setModalidade(e.target.value)}
                  className={selectClass}
                >
                  <option value="" className="text-gray-800">
                    Selecione a modalidade
                  </option>
                  {MODALIDADES.map((m) => (
                    <option
                      key={m.value}
                      value={m.value}
                      className="text-gray-800"
                    >
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {valorHora > 0 && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => selecionarOpcao("avulsa")}
                    className="text-left rounded-xl px-4 py-3 border bg-white/5 border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Aula pontual</span>
                      <span className="text-sm font-semibold text-white">
                        {formatarMoeda(valorHora)}/h
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => selecionarOpcao("acompanhamento")}
                    className="text-left rounded-xl px-4 py-3 border bg-white/5 border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">
                        Acompanhamento regular
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {formatarMoeda(
                          valorHora * (1 - DESCONTO_ACOMPANHAMENTO / 100),
                        )}
                        /h
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">
                      -{DESCONTO_ACOMPANHAMENTO}% · mín. 2h/semana, 2 meses
                    </p>
                  </button>

                  {TAMANHOS_PACOTE.map((p) => {
                    const valorHoraEfetivo = valorHora * (1 - p.desconto / 100);
                    return (
                      <button
                        key={p.horas}
                        onClick={() => selecionarOpcao("pacote", p.horas)}
                        className="text-left rounded-xl px-4 py-3 border bg-white/5 border-white/10 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">
                            Pacote de {p.horas}h
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {formatarMoeda(valorHoraEfetivo)}/h
                          </span>
                        </div>
                        <p className="text-xs text-white/40 mt-0.5">
                          -{p.desconto}% · total{" "}
                          {formatarMoeda(valorHoraEfetivo * p.horas)} · validade{" "}
                          {p.validade} dias
                        </p>
                      </button>
                    );
                  })}
                  <p className="text-xs text-white/40 mt-1">
                    Toque numa opção para iniciar sua solicitação de interesse.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setMostrarFormulario(true)}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium py-3 rounded-lg transition-all mb-6"
            >
              Já sei o que quero — preencher meus dados
            </button>

            <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                Desconto para aulas em grupo
              </p>
              <div className="flex flex-col gap-2">
                {descontosGrupo.map((d) => (
                  <div
                    key={d.qtd}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/70">{d.qtd}</span>
                    <span className="text-white font-medium">
                      -{d.desconto}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                Regras dos descontos
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Os descontos de pacote, acompanhamento, aulas em grupo e
                condições promocionais não são cumulativos. Quando houver mais
                de uma condição aplicável, prevalecerá o maior desconto.
              </p>
            </div>

            <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-8">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                Formas de pagamento
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                PIX, boleto, cartão de débito ou crédito (parcelamento em até 3x
                sem juros para valores a partir de R$ 1.500,00). Pacotes são
                pagos antecipadamente. Todos os pagamentos são feitos
                diretamente ao ESFERA — nunca ao professor ou à professora.
              </p>
            </div>
          </>
        )}

        {mostrarFormulario && (
          <div className="rounded-2xl px-5 py-5 bg-white/10 border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-xs text-white/50 hover:text-white/80"
              >
                ← voltar à simulação
              </button>
              <span className="text-xs text-white/40">
                {ETAPAS[etapa]} ({etapa + 1}/{ETAPAS.length})
              </span>
            </div>

            {formaContratacao && (
              <p className="text-xs text-white/50 mb-4 bg-white/5 rounded-lg px-3 py-2">
                Interesse:{" "}
                <span className="text-white">
                  {formaContratacao === "avulsa" && "Aula pontual"}
                  {formaContratacao === "acompanhamento" &&
                    "Acompanhamento regular"}
                  {formaContratacao === "pacote" && `Pacote de ${pacoteHoras}h`}
                  {nivel &&
                    ` — ${NIVEIS.find((n) => n.value === nivel)?.label}`}
                  {modalidade &&
                    ` — ${MODALIDADES.find((m) => m.value === modalidade)?.label}`}
                </span>
              </p>
            )}

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
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="CPF"
                  className={inputClass}
                />
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Telefone / WhatsApp *"
                  className={inputClass}
                />
              </div>
            )}

            {etapa === 1 && (
              <div className="flex flex-col gap-3">
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
                <p className="text-xs text-white/60">
                  Está matriculado(a) em colégio ou faculdade?
                </p>
                <div className="flex gap-2">
                  {(["sim", "nao"] as SimNao[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setMatriculadoInstituicao(v)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm border ${matriculadoInstituicao === v ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                    >
                      {v === "sim" ? "Sim" : "Não"}
                    </button>
                  ))}
                </div>

                {matriculadoInstituicao === "sim" && (
                  <>
                    {nivel !== "superior" && (
                      <input
                        type="text"
                        value={anoSerie}
                        onChange={(e) => setAnoSerie(e.target.value)}
                        placeholder="Ano/Série"
                        className={inputClass}
                      />
                    )}
                    {nivel === "superior" && (
                      <input
                        type="text"
                        value={cursoSuperior}
                        onChange={(e) => setCursoSuperior(e.target.value)}
                        placeholder="Curso"
                        className={inputClass}
                      />
                    )}
                    <select
                      value={instituicao}
                      onChange={(e) => setInstituicao(e.target.value)}
                      className={selectClass}
                    >
                      <option value="" className="text-gray-800">
                        Selecione a instituição
                      </option>
                      {getInstituicoes(nivel).map((i) => (
                        <option key={i} value={i} className="text-gray-800">
                          {i}
                        </option>
                      ))}
                    </select>
                    {instituicao === "Outros" && (
                      <input
                        type="text"
                        value={instituicaoOutro}
                        onChange={(e) => setInstituicaoOutro(e.target.value)}
                        placeholder="Especifique a instituição"
                        className={inputClass}
                      />
                    )}
                  </>
                )}

                {matriculadoInstituicao === "nao" && (
                  <>
                    <p className="text-xs text-white/60 mt-2">
                      Faz algum cursinho fora do ESFERA?
                    </p>
                    <div className="flex gap-2">
                      {(["sim", "nao"] as SimNao[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setFazCursinhoExterno(v)}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm border ${fazCursinhoExterno === v ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                        >
                          {v === "sim" ? "Sim" : "Não"}
                        </button>
                      ))}
                    </div>
                    {fazCursinhoExterno === "sim" && (
                      <>
                        <input
                          type="text"
                          value={cursinhoNome}
                          onChange={(e) => setCursinhoNome(e.target.value)}
                          placeholder="Qual cursinho?"
                          className={inputClass}
                        />
                        <div className="flex gap-2">
                          {(["online", "presencial"] as const).map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setCursinhoModalidade(v)}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm border ${cursinhoModalidade === v ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                            >
                              {v === "online" ? "Online" : "Presencial"}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {etapa === 3 && (
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={toggleRespEhAluno}
                  className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg border ${respEhAluno ? "bg-white/20 border-white/40 text-white" : "text-white/60 border-white/10"}`}
                >
                  <span>{respEhAluno ? "✓" : "○"}</span> O responsável sou eu
                  mesmo(a)
                </button>

                {!respEhAluno && (
                  <>
                    <input
                      type="text"
                      value={respNome}
                      onChange={(e) => setRespNome(e.target.value)}
                      placeholder="Nome do(a) responsável *"
                      className={inputClass}
                    />
                    <select
                      value={respParentesco}
                      onChange={(e) => setRespParentesco(e.target.value)}
                      className={selectClass}
                    >
                      <option value="" className="text-gray-800">
                        Grau de parentesco
                      </option>
                      <option value="pai" className="text-gray-800">
                        Pai
                      </option>
                      <option value="mae" className="text-gray-800">
                        Mãe
                      </option>
                      <option value="avo" className="text-gray-800">
                        Avô/Avó
                      </option>
                      <option value="tio" className="text-gray-800">
                        Tio/Tia
                      </option>
                      <option value="irmao" className="text-gray-800">
                        Irmão/Irmã
                      </option>
                      <option value="conjuge" className="text-gray-800">
                        Cônjuge
                      </option>
                      <option value="outro" className="text-gray-800">
                        Outro
                      </option>
                    </select>
                    <input
                      type="text"
                      value={respCpf}
                      onChange={(e) => setRespCpf(e.target.value)}
                      placeholder="CPF do(a) responsável"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={respTelefone}
                      onChange={(e) => setRespTelefone(e.target.value)}
                      placeholder="Telefone do(a) responsável"
                      className={inputClass}
                    />
                    <input
                      type="email"
                      value={respEmail}
                      onChange={(e) => setRespEmail(e.target.value)}
                      placeholder="E-mail do(a) responsável"
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() => setRespMesmoEndereco(!respMesmoEndereco)}
                      className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg border ${respMesmoEndereco ? "bg-white/20 border-white/40 text-white" : "text-white/60 border-white/10"}`}
                    >
                      <span>{respMesmoEndereco ? "✓" : "○"}</span> Mesmo
                      endereço do(a) aluno(a)
                    </button>

                    {!respMesmoEndereco && (
                      <>
                        <input
                          type="text"
                          value={respCep}
                          onChange={(e) => handleCepRespChange(e.target.value)}
                          placeholder="CEP"
                          maxLength={9}
                          className={inputClass}
                        />
                        {buscandoCepResp && (
                          <p className="text-xs text-white/40">
                            Buscando endereço...
                          </p>
                        )}
                        {cepErroResp && (
                          <p className="text-xs text-red-400">{cepErroResp}</p>
                        )}
                        <input
                          type="text"
                          value={respRua}
                          onChange={(e) => setRespRua(e.target.value)}
                          placeholder="Rua"
                          className={inputClass}
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={respNumero}
                            onChange={(e) => setRespNumero(e.target.value)}
                            placeholder="Número"
                            className={inputClass}
                          />
                          <input
                            type="text"
                            value={respComplemento}
                            onChange={(e) => setRespComplemento(e.target.value)}
                            placeholder="Complemento"
                            className={inputClass}
                          />
                        </div>
                        <input
                          type="text"
                          value={respBairro}
                          onChange={(e) => setRespBairro(e.target.value)}
                          placeholder="Bairro"
                          className={inputClass}
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={respCidade}
                            onChange={(e) => setRespCidade(e.target.value)}
                            placeholder="Cidade"
                            className={inputClass}
                          />
                          <select
                            value={respEstado}
                            onChange={(e) => setRespEstado(e.target.value)}
                            className={selectClass}
                          >
                            <option value="" className="text-gray-800">
                              UF
                            </option>
                            {ESTADOS.map((uf) => (
                              <option
                                key={uf}
                                value={uf}
                                className="text-gray-800"
                              >
                                {uf}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {etapa === 4 && (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-white/60 mb-1">
                  Já é aluno(a) da ESFERA?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEhAlunoNovo(false)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm border ${ehAlunoNovo === false ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                  >
                    Já sou aluno(a)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEhAlunoNovo(true)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm border ${ehAlunoNovo === true ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/60"}`}
                  >
                    Sou novo(a)
                  </button>
                </div>
                {ehAlunoNovo === false && (
                  <input
                    type="text"
                    value={alunoExistenteNome}
                    onChange={(e) => setAlunoExistenteNome(e.target.value)}
                    placeholder="Seu nome já cadastrado"
                    className={inputClass}
                  />
                )}
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={3}
                  placeholder="Alguma informação adicional? (opcional)"
                  className={inputClass}
                />

                <div className="bg-white/5 rounded-lg px-3 py-2 text-xs text-white/60 mt-1">
                  <p>
                    <span className="text-white">{nome || "—"}</span> ·{" "}
                    {telefone || "sem telefone"}
                  </p>
                  <p>
                    {rua
                      ? `${rua}, ${numero || "s/n"} — ${cidade}/${estado}`
                      : "endereço não informado"}
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
                  onClick={enviarSolicitacao}
                  disabled={enviando}
                  className="flex-1 bg-[#1566A0] hover:bg-[#1A7FBA] text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {enviando ? "Enviando..." : "Enviar solicitação"}
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
