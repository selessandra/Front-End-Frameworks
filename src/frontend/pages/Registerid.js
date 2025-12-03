import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Registerid.css';

const API_URL = process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL;

const RegisterId = () => {
    const [clashId, setClashId] = useState('');
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Simulando o global.usuario do React Native
    const idUsuario = window.usuario?.id_usuario;

    // 🔒 Bloqueia caracteres inválidos e força maiúsculo
    const handleChangeClashId = (e) => {
        const text = e.target.value;
        const formatted = text.replace(/[^a-zA-Z0-9]/g, "");
        setClashId(formatted.toUpperCase());
    };

    // Simulação do carregamento de fontes
    useEffect(() => {
        // Em React web, geralmente carregamos fontes via CSS ou Web Font Loader
        // Aqui simulamos que as fontes estão carregadas
        setFontsLoaded(true);
    }, []);

    const handleRegisterId = async () => {
        if (!clashId.trim())
            return alert("Digite seu ID do Clash Royale!");

        if (clashId.length < 8)
            return alert("ID inválido — o Clash ID deve ter pelo menos 8 caracteres.");

        if (!idUsuario)
            return alert("Erro: usuário não encontrado. Faça o login novamente.");

        try {
            setLoading(true);

            const resp = await axios.post(`${API_URL}/jogador/cadastrar`, {
                idUsuario,
                clashId
            });

            // Atualiza o usuário global
            if (window.usuario) {
                window.usuario.nome = resp.data.nome;
            }

            alert("Jogador cadastrado com sucesso!");
            // Navegação em React web - ajuste conforme sua roteador (React Router, Next.js, etc.)
            window.location.href = '/';

        } catch (err) {
            if (err.response?.data?.error) alert(err.response.data.error);
            else alert("Erro ao cadastrar jogador!");
        }

        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleRegisterId();
        }
    };

    if (!fontsLoaded) {
        return <div className="loading">Carregando fontes...</div>;
    }

    return (
        <div className="container">
            <div className="image-background">
                <div className="viewcontainer">
                    
                    <div className="header">
                        <div className="text">Veasy</div>
                    </div>

                    <div className="forms">
                        <div className="textocontainer">Registro</div>

                        <div className="campos">Clash Id:</div>
                        <input
                            type="text"
                            className="field"
                            placeholder="JGCUU99V2"
                            value={clashId}
                            onChange={handleChangeClashId}
                            onKeyPress={handleKeyPress}
                            autoComplete="off"
                            spellCheck="false"
                            style={{ textTransform: 'uppercase' }}
                        />

                        <button
                            className="button"
                            onClick={handleRegisterId}
                            disabled={loading}
                            style={{ marginTop: '64px' }}
                        >
                            {loading ? "Validando..." : "Confirmar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterId;