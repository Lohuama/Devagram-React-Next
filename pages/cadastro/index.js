import { useState } from "react";
import Image from "next/image"
import Link from "next/link";

import {validarEmail, validarSenha, validarNome, validarConfirmacaoSenha} from '../../utils/validadores'
import Botao from "../../componentes/botao";
import InputPublico from "../../componentes/inputPublico";
import UploadImagem from '../../componentes/uploadImagem'
import UsuarioService from '../../services/UsuarioService';

import imagemLogo from '../../public/images/logo.svg'
import imagemUsuarioAtivo from '../../public/images/usuarioAtivo.svg'
import imagemEnvelope from '../../public/images/envelope.svg'
import imagemChave from '../../public/images/chave.svg'
import imagemAvatar from '../../public/images/avatar.svg'

const usuarioService = new UsuarioService();

export default function Cadastro(){
    const [imagem, setImagem] = useState(null)
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    const validarFormulario = () => {
        return(
            validarNome(nome) && validarSenha(senha) && validarEmail(email) && validarConfirmacaoSenha(senha, confirmacaoSenha)
        )
    }
    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true)

        try {
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nome);
            corpoReqCadastro.append("email", email);
            corpoReqCadastro.append("senha", senha);

            if(imagem?.arquivo){
                corpoReqCadastro.append("file", imagem.arquivo);
            }

            await usuarioService.cadastro(corpoReqCadastro)
            alert("Sucesso!")
        } catch (error) {
            alert(
                "Erro ao cadastrar usuário. " + error?.response?.data?.erro
            )
        }

        setEstaSubmetendo(false);
    }
    
    return(
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                
                <Image 
                    src={imagemLogo}
                    alt='logotipo'
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <UploadImagem 
                        imagemPreview = {imagem?.preview || imagemAvatar.src}
                        imagemPreviewClassName = 'avatar avatarPreview'
                        setImagem = {setImagem}
                    />
                    <InputPublico 
                        imagem={imagemUsuarioAtivo}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa de pelo menos 2 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                     <InputPublico 
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O e-mail informado não é inválido!"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />
                    <InputPublico 
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={(e => setSenha(e.target.value))}
                        valor={senha}
                        mensagemValidacao="Precisa de pelo menos 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />
                    <InputPublico 
                        imagem={imagemChave}
                        texto="Confirmação da Senha"
                        tipo="password"
                        aoAlterarValor={(e => setConfirmacaoSenha(e.target.value))}
                        valor={confirmacaoSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={confirmacaoSenha && !validarConfirmacaoSenha(senha, confirmacaoSenha)}
                    />
                    <Botao 
                        tipo='submit'
                        texto='Cadastrar'
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora!</Link>
                </div>

            </div>
        </section>
    )
}