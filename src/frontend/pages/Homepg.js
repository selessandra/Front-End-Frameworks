import React, { useState } from "react";

function Homepg() {
  const background = "/assets/background.jpg";

  /************************************
   * ESTADO DO CARROSSEL PRO PLAYERS
   ************************************/
  const [proIndex, setProIndex] = useState(0);
  const proDecks = ["Pro 1", "Pro 2", "Pro 3", "Pro 4", "Pro 5"];
  const cardWidth = 300;

  const nextPro = () => {
    if (proIndex < proDecks.length - 1) setProIndex(proIndex + 1);
  };

  const prevPro = () => {
    if (proIndex > 0) setProIndex(proIndex - 1);
  };

  /************************************
   * ESTILOS
   ************************************/
  const styles = {
    page: {
      display: "flex",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "black",
      color: "white",
    },

    column: {
      width: "50%",
      height: "100%",
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 20,
    },

    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.45)",
    },

    // LEFT SIDE
    hometext: {
      fontSize: 32,
      fontWeight: "bold",
      marginTop: 20,
      zIndex: 2,
    },
    userImg: {
      width: 180,
      height: 180,
      borderRadius: "50%",
      backgroundColor: "#ffffff22",
    },
    infoCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      marginTop: 10,
      zIndex: 2,
    },
    name: {
      fontSize: 26,
      fontWeight: "bold",
      color: "white",
    },
    info: {
      fontSize: 18,
    },
    top: {
      fontSize: 18,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 20,
    },
    deckBox: {
      width: "90%",
      height: 150,
      backgroundColor: "rgba(255,255,255,0.25)",
      borderRadius: 12,
      marginTop: 10,
    },

    // RIGHT SIDE
    decksTitle: {
      fontSize: 26,
      fontWeight: "bold",
      marginTop: 20,
      zIndex: 2,
      textAlign: "center",
    },

    // carrossel
    carouselSection: {
      marginTop: 20,
      width: "100%",
      zIndex: 2,
      display: "flex",
      justifyContent: "center",
    },

    carouselContainer: {
      width: "100%",
      maxWidth: 700,
      height: 220,
      position: "relative",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    },

    carouselContent: {
      display: "flex",
      transition: "transform 0.3s ease-in-out",
    },

    card: {
      width: 300,
      height: 200,
      borderRadius: 20,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "white",
    },

    arrowLeft: {
      position: "absolute",
      left: 10,
      fontSize: 38,
      cursor: "pointer",
      zIndex: 10,
      userSelect: "none",
    },
    arrowRight: {
      position: "absolute",
      right: 10,
      fontSize: 38,
      cursor: "pointer",
      zIndex: 10,
      userSelect: "none",
    },

    bottomBarRight: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 80,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      zIndex: 2,
    },
    footerLabel: {
      color: "white",
      fontSize: 14,
      marginTop: 2,
    },
  };

  /************************************
   * RENDERIZAÇÃO
   ************************************/

  return (
    
    <div style={styles.page}>

      {/** =======================================================
       *  LADO ESQUERDO — PERFIL (PERFEITO COMO VOCÊ PEDIU)
       *  ======================================================= */}
      <div
        style={{
          ...styles.column,
          backgroundImage: `url(${background})`,
        }}
      >
        <div style={styles.overlay}></div>

        <h1 style={styles.hometext}>Perfil</h1>

        <div style={styles.infoCenter}>
          <span style={styles.info}>Nv: --</span>
        </div>

        <div style={styles.userImg}></div>

        <div style={styles.infoCenter}>
          <span style={styles.name}> Jogador </span>
          <span style={styles.info}>Clã: --</span>
        </div>

        <div style={styles.infoCenter}>
          <span style={styles.top}>Troféus: -- Vitórias: --</span>
          <span style={styles.top}>Top Troféus: -- Derrotas: --</span>
        </div>

        <span style={styles.sectionTitle}>Top Decks</span>
        <div style={styles.deckBox}></div>
      </div>

      {/** =======================================================
       *  LADO DIREITO — DECKS (FIÉL AO SEU CÓDIGO)
       *  ======================================================= */}
      <div
        style={{
          ...styles.column,
          backgroundImage: `url(${background})`,
        }}
      >
        <div style={styles.overlay}></div>

        {/**----------------------------------------------  
         *  DECKS POPULARES (sem carrossel)
         *----------------------------------------------*/}
        <h2 style={styles.decksTitle}>Decks Populares do Dia</h2>

        <div
          style={{
            width: "90%",
            height: 200,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 20,
            marginTop: 20,
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ color: "white", fontSize: 22, fontWeight: 700 }}>
            Deck Popular do Dia
          </span>
        </div>

        {/**----------------------------------------------  
         *   PRO PLAYER DECKS (carrossel funcional)
         *----------------------------------------------*/}
        <h2 style={{ ...styles.decksTitle, marginTop: 40 }}>
          Pro Player Decks
        </h2>

        <div style={styles.carouselSection}>
          <div style={styles.carouselContainer}>

            {proIndex > 0 && (
              <div style={styles.arrowLeft} onClick={prevPro}>
                ‹
              </div>
            )}

            <div
              style={{
                ...styles.carouselContent,
                width: cardWidth * proDecks.length,
                transform: `translateX(${-proIndex * cardWidth}px)`,
              }}
            >
              {proDecks.map((d) => (
                <div key={d} style={styles.card}>
                  <span style={styles.cardTitle}>{d}</span>
                </div>
              ))}
            </div>

            {proIndex < proDecks.length - 1 && (
              <div style={styles.arrowRight} onClick={nextPro}>
                ›
              </div>
            )}
          </div>
        </div>

        {/** Bottom bar */}
        <div style={styles.bottomBarRight}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "#4B1664" }}>🃏</div>
            <div style={styles.footerLabel}>Decks</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "white" }}>👤</div>
            <div style={styles.footerLabel}>Perfil</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "white" }}>⚙️</div>
            <div style={styles.footerLabel}>Opções</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepg;
