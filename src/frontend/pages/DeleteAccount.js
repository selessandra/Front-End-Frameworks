import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import '../assets/DeleteAccount.css'; // Importa o CSS separado

const background = require('../assets/images/backgroundweb.jpg');

function DeleteAccount() {
	const [senha, setSenha] = useState('');
	const [showSenha, setShowSenha] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleDelete = async () => {
		if (!senha.trim()) {
			alert('Digite sua senha antes.');
			return;
		}

		try {
			setLoading(true);
			
			// Substitua esta chamada pela sua API web
			 const response = await fetch('http://localhost:3001/usuarios/delete-with-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({ password: senha })
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Erro ao excluir conta');
			}

			localStorage.removeItem('token');
			localStorage.removeItem('usuario');
			localStorage.removeItem('playerPhoto');

			alert('Conta excluída com sucesso!');
			navigate('/');
		} catch (error) {
			alert(error.message || 'Erro ao excluir conta');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="delete-account-container">
			<div 
				className="delete-account-background"
				style={{ backgroundImage: `url(${background})` }}
			>
				<div className="delete-account-overlay" />
				
				<button 
					onClick={() => navigate(-1)}
					className="delete-account-back-button back-button"
				>
					<FiArrowLeft className="delete-account-back-icon" />
				</button>

				<main className="delete-account-main-content">
					<div className="delete-account-header">
						<h1 className="delete-account-logo">
							<span className="delete-account-logo-gradient">CLASH</span>
							<span className="delete-account-logo-highlight">HUB</span>
						</h1>
						<p className="delete-account-subtitle">Excluir conta</p>
					</div>

					<div className="delete-account-card">
						<div className="delete-account-card-header">
							<h2 className="delete-account-card-title">Excluir Conta</h2>
							<p className="delete-account-card-subtitle">
								Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
							</p>
						</div>

						<div className="delete-account-form-container">
							<div className="delete-account-input-group">
								<label className="delete-account-input-label">Confirme sua senha:</label>
								<div className="delete-account-password-input-wrapper">
									<input
										type={showSenha ? "text" : "password"}
										placeholder="Digite sua senha"
										value={senha}
										onChange={(e) => setSenha(e.target.value)}
										className="delete-account-input"
										disabled={loading}
									/>
									<button
										type="button"
										onClick={() => setShowSenha(!showSenha)}
										className="delete-account-toggle-password-button toggle-password-button"
										disabled={loading}
									>
										{showSenha ? 
											<FiEyeOff className="delete-account-toggle-icon" /> : 
											<FiEye className="delete-account-toggle-icon" />
										}
									</button>
								</div>
							</div>

							<div className="delete-account-warning-box">
								<p className="delete-account-warning-text">
									⚠️ Após excluir sua conta, você perderá acesso a todos os seus dados, histórico e configurações.
								</p>
							</div>

							<div className="delete-account-actions-container">
								<button 
									onClick={handleDelete}
									disabled={loading || !senha.trim()}
									className="delete-account-delete-button delete-button"
									style={{
										opacity: (loading || !senha.trim()) ? 0.6 : 1,
										cursor: (loading || !senha.trim()) ? 'not-allowed' : 'pointer'
									}}
								>
									<span className="delete-account-button-text">
										{loading ? 'Excluindo...' : 'Excluir minha conta'}
									</span>
								</button>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default DeleteAccount;