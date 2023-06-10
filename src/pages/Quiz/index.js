import React, { useState } from 'react';
import { Perguntas } from '../../data/perguntas';
import './styles.css';

export default function Quiz() {
  const questions = Perguntas ?? [];
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [showPontuacao, setShowPontuacao] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [showDica, setShowDica] = useState(false); // Novo estado para controlar a exibição da dica

  function proximaPergunta(correta) {
    const nextQuestion = perguntaAtual + 1;

    if (correta) {
      setPontos(pontos + 1);
    }

    if (nextQuestion < questions.length) {
      setPerguntaAtual(nextQuestion);
    } else {
      setShowPontuacao(true);
    }
  }

  function exibirDica() {
    setShowDica(true);
  }

  return (
    <div className='container'>
      {showPontuacao ? (
        <div className='pontuacao'>
          <span>Sua pontuação é {pontos} de {questions.length}</span>
        </div>
      ) : (
        <>
          <div className='infoPerguntas'>
            <div className='contagemPerguntas'>
              <span>Pergunta {perguntaAtual + 1}/{questions.length}</span>
            </div>
            <div className='pergunta'>{questions[perguntaAtual].pergunta}</div>
          </div>
          <div className='resposta'>
            {questions[perguntaAtual].opcoesResposta.map((opcoesResposta) => (
              <div className='grupoResposta' key={opcoesResposta.alternativa}>
                <span>{opcoesResposta.alternativa}</span>
                <button onClick={() => proximaPergunta(opcoesResposta.correta)}>
                  {opcoesResposta.resposta}
                </button>
              </div>
            ))}
          </div>
          <button className='dica' onClick={exibirDica}>Dica</button>
          {showDica && (
            <div className='dica'>
              Dica: {questions[perguntaAtual].dica}
            </div>
          )}
        </>
      )}
    </div>
  );
}
