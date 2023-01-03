//IF TERNÁRIO
{idade >= 18 ? (
    <>
        <br />
        <span>Maior de idade</span>
    </>
) : (
    <span>Menor de idade</span>
)

}

//LOOPING
const pessoas = [
    {
        nome 'loh',
        idade: 24
    },
    {
        nome 'lah',
        idade:24
    },
    {
        nome 'luh',
        idade: 24
    }
];

{pessoas.map(({nome, idade}, index) => {
   return <Pessoa 
        nome={nome} 
        idade={idade}
        key = {index}
    /> 
})}

//ENV - VARIAVEIS DE AMBIENTE

//ESTILIZAÇAO
