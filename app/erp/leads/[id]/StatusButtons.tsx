"use client";

type Props = {
  leadId: string;
};

export default function StatusButtons({ leadId }: Props) {
  async function atualizarStatus(status: string) {
    const response = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      alert("Erro ao atualizar status.");
      return;
    }

    window.location.reload();
  }

  async function converterEmAluno() {
    const response = await fetch(`/api/leads/${leadId}/converter`, {
      method: "POST",
    });

    if (!response.ok) {
      alert("Erro ao converter lead em aluno.");
      return;
    }

    alert("Lead convertido em aluno com sucesso!");
    window.location.reload();
  }

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => atualizarStatus("em_contato")}>
        Em atendimento
      </button>

      <button
        onClick={() => atualizarStatus("convertido")}
        style={{ marginLeft: 10 }}
      >
        Convertido
      </button>

      <button
        onClick={() => atualizarStatus("perdido")}
        style={{ marginLeft: 10 }}
      >
        Perdido
      </button>

      <button
        onClick={converterEmAluno}
        style={{
          marginLeft: 10,
          backgroundColor: "green",
          color: "white",
        }}
      >
        Converter em aluno
      </button>
    </div>
  );
}