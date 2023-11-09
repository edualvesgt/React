import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';

const TestePage = () => {
    // Definindo estados iniciais para n1, n2 e total
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [total, setTotal] = useState();

    // Função para lidar com o cálculo ao pressionar o botão "Calcular"
    function handleCalcular(e) {
        e.preventDefault();
        // Calculando a soma dos números n1 e n2 e atualizando o estado total
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

    return (
        <div>
            {/* Renderização do componente Header */}
            <Header />

            {/* Título da página */}
            <h1>Pagina de Poc's</h1>

            {/* Título da seção da calculadora */}
            <h2>Calculator</h2>

            {/* Formulário para entrada de dados e cálculo */}
            <form onSubmit={handleCalcular}>
                {/* Input para o primeiro número (n1) */}
                <Input
                    type="number"
                    placeholder="Digite o numero"
                    name="n1"
                    id="n1"
                    value={n1}
                    onChange={(e) => { setN1(e.target.value) }}
                />

                <br /><br />

                {/* Input para o segundo número (n2) */}
                <Input
                    type="number"
                    placeholder="Digite o numero"
                    name="n2"
                    id="n2"
                    value={n2}
                    onChange={(e) => { setN2(e.target.value) }}
                />

                <br /><br />

                {/* Botão "Calcular" para acionar o cálculo */}
                <Button
                    textButton="Calcular"
                    type="submit"
                />
            </form>

            <br />

            {/* Exibição do resultado total após o cálculo */}
            <span> Total : <strong > {total} </strong></span>
        </div>
    );
};

export default TestePage;
