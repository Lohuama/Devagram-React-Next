import { useState } from "react";
import InputPublico from "../inputPublico";
import Image from "next/image";
import Botao from '../botao'
import Link from "next/link";
import imagemEnvelope from '../../public/images/envelope.svg'
import imagemChave from '../../public/images/chave.svg'
import imagemLogo from '../../public/images/logo.svg'

export default function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">
                <Image 
                    src={imagemLogo}
                    alt='logotipo'
                    layout="fill"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form>
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
                    <Botao 
                        texto="Login"
                        tipo="submit"
                        desabilitado={false}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Não posuui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora!</Link>
                </div>

            </div>
        </section>
    );
}