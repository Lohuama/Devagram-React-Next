import { useEffect, useRef } from "react";

export default function UploadImagem({
    className = '',
    setImagem,
    imagemPreview,
    imagemPreviewClassName = '',
    aoSetarReferencia
}){
    const referenciaInput = useRef(null);

    useEffect(() => {
        if(!aoSetarReferencia){
            return;
        }
        aoSetarReferencia(referenciaInput?.current)

    }, [referenciaInput?.current]);

    const abrirSeletorArquivos = () => {
        referenciaInput?.current?.click();
    }
    const aoAlterarImagem = () => {

        if(!referenciaInput?.current?.files?.length){
            return;
        }
        const arquivo = referenciaInput?.current?.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
           setImagem({
                preview: fileReader.result,
                arquivo
           })
            
        }
    }
    return(
        <div className={`uploadImagemContainer ${className}`} onClick={abrirSeletorArquivos}>
            
            {imagemPreview && (
                <div className="imagemPreviewContainer">
                    <img 
                        src={imagemPreview}
                        alt='imagem preview'
                        className={imagemPreviewClassName}
                    />
                </div>
            )}
            <input 
                ref={referenciaInput} 
                type='file' 
                className="oculto" 
                accept="image/*"
                onChange={aoAlterarImagem}
            />
        </div>
        
    );
}