
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Protocolo de Hipertrofia Feminina", layout="wide")

st.title("💪 Protocolo de Hipertrofia Feminina")
st.markdown("**Objetivo:** Hipertrofia com ênfase em membros inferiores | Ciclo com Masteron 150mg/semana")

# Botões de menu
st.sidebar.title("📋 Menu")
opcao = st.sidebar.radio("Escolha uma seção:", [
    "Dashboard Geral",
    "Treino da Semana",
    "Dieta com Macros",
    "Cardápio Interativo",
    "Receitas Fit",
    "Suplementação",
    "Exames e Monitoramento"
])

# Abas principais
if opcao == "Dashboard Geral":
    st.header("📊 Visão Geral")
    st.metric("Kcal/dia", "1995 kcal")
    st.metric("Proteína", "198g")
    st.metric("Carboidrato", "195g")
    st.metric("Gordura", "55g")

elif opcao == "Treino da Semana":
    st.header("🏋️‍♀️ Treino Periodizado (4 Semanas)")
    aba = st.selectbox("Selecione a semana:", ["Semana 1", "Semana 2", "Semana 3", "Semana 4 (Deload)"])
    treino_df = pd.read_excel("dados.xlsx", sheet_name=aba.replace(" ", "_"))
    st.dataframe(treino_df)

elif opcao == "Dieta com Macros":
    st.header("🍽️ Plano Alimentar com Macronutrientes")
    dieta_df = pd.read_excel("dados.xlsx", sheet_name="Dieta")
    st.dataframe(dieta_df)

elif opcao == "Cardápio Interativo":
    st.header("🧾 Variações por Refeição")
    cardapio_df = pd.read_excel("dados.xlsx", sheet_name="Cardapio Variado")
    st.dataframe(cardapio_df)

elif opcao == "Receitas Fit":
    st.header("🥗 Receitas Fit na Airfryer")
    receitas_df = pd.read_excel("dados.xlsx", sheet_name="Receitas Fit")
    st.dataframe(receitas_df)

elif opcao == "Suplementação":
    st.header("💊 Suplementação Diária")
    sup_df = pd.read_excel("dados.xlsx", sheet_name="Suplementos")
    st.dataframe(sup_df)

elif opcao == "Exames e Monitoramento":
    st.header("🩸 Exames Recomendados")
    exames_df = pd.read_excel("dados.xlsx", sheet_name="Exames")
    st.dataframe(exames_df)
    st.info("Faça os exames antes, na 6ª semana e ao final do protocolo.")
