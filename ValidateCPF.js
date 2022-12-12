function ValidaCPF(cpfEnviado){
    Object.defineProperty(this, "cpfLimpo",{
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        },
    })
}

ValidaCPF.prototype.valida = function(){
    if(typeof this.cpfLimpo === "undefined") return false;
    if(this.cpfLimpo.length  !== 11) return false;
    if(this.isSequencia()) return false;
    
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCPF = cpfParcial + digito1 + digito2;

    return novoCPF === this.cpfLimpo;
}

ValidaCPF.prototype.criaDigito = function(cpfParcial){
    const CpfArray = Array.from(cpfParcial)
    let regressivo = CpfArray.length + 1;
    
    let total = CpfArray.reduce((previous, current) => {
        previous += (regressivo * Number(current));
        regressivo--

        return previous 
    }, 0)

   const digito = 11 - (total % 11);

   return digito > 9 ? 0 : digito;
}

ValidaCPF.prototype.isSequencia = function(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
}

const cpf = new ValidaCPF("077.131.365-92")

if(cpf.valida()){
    console.log('CPF Válido');
}else{
    console.log('CPF Inválido')
}