import { useState } from "react";
import Image from "next/image"
import Link from "next/link";

import Botao from "../../componentes/botao";
import InputPublico from "../../componentes/inputPublico";
import UploadImagem from '../../componentes/uploadImagem'

import imagemLogo from '../../public/images/logo.svg'
import imagemUsuarioAtivo from '../../public/images/usuarioAtivo.svg'
import imagemEnvelope from '../../public/images/envelope.svg'
import imagemChave from '../../public/images/chave.svg'
import imagemAvatar from '../../public/images/avatar.svg'

export default function Cadastro(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [imagem, setImagem] = useState(null)
    
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
                <form>
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
                    />
                     <InputPublico 
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                    />
                    <InputPublico 
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={(e => setSenha(e.target.value))}
                        valor={senha}
                    />
                    <InputPublico 
                        imagem={imagemChave}
                        texto="Confirmação da Senha"
                        tipo="password"
                        aoAlterarValor={(e => setConfirmacaoSenha(e.target.value))}
                        valor={confirmacaoSenha}
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