"use client";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import "../styles/login.css";

export default function RecoverPassword() {
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await requestPasswordReset(email);

      if (res.success) {
        setMsg("Se ha enviado un enlace a tu correo para restablecer la contraseña.");
      } else {
        setMsg(res.message || "Error al solicitar recuperación");
      }
    } catch (err: any) {
      setMsg(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <main className="content-wrapper">
        <div className="container">
          <h2 className="form-title">Recuperar Contraseña</h2>

          {msg && <div className="info-box">{msg}</div>}

          <form onSubmit={handleSubmit} className="form-content active">

            <div className="form-group">
              <label>Correo Electrónico</label>
              <div className="input-wrap">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Procesando..." : "Enviar Enlace"}
            </button>

            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Link href="/login" className="link-button">Volver al login</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
