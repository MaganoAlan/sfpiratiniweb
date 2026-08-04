//@ts-nocheck
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./PdfUploader.css";
import { storage } from "../../main";

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [mat, setMat] = useState("");
  const [evaluationDate, setEvaluationDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [error, setError] = useState("");

  function dateMask(value: any) {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{4})\d+?$/, "$1");
  }

  // Função para lidar com a seleção do arquivo
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile);
    // Validação do tipo de arquivo
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Por favor, selecione um arquivo PNG válido");
      setFile(null);
    }
  };

  // Função para fazer upload do PDF
  const handleUpload = async (e: any) => {
    e.preventDefault();

    // Validações
    if (!mat) {
      setError("A matrícula é obrigatória");
      return;
    }

    if (!evaluationDate) {
      setError("A data é obrigatória");
      return;
    }

    if (!file) {
      setError("Selecione um arquivo!");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");
    let dataFormatada = new Date(evaluationDate).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
    dataFormatada = dataFormatada.replaceAll("/", ".");
    try {
      // Criar caminho no storage
      //@ts-ignore
      const filename = file.name;
      const path = `avaliações/${mat}/${dataFormatada}/${filename}`;
      console.log("path", path);
      const storageRef = ref(storage, path);

      // Iniciar upload
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Monitorar progresso
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgress(progress);
        },
        (error) => {
          console.error("Erro no upload:", error);
          setError("Erro ao fazer upload. Tente novamente.");
          setUploading(false);
        },
        async () => {
          // Upload concluído
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadURL(url);
          setUploading(false);
          setProgress(100);

          // Limpar formulário
          setFile(null);
          setMat("");
          setEvaluationDate("");

          // Reset do input file
          const fileInput = document.getElementById("pdfInput");
          //@ts-ignore
          if (fileInput) fileInput.value = "";

          alert("Upload concluído com sucesso!");
        },
      );
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao fazer upload. Tente novamente.");
      setUploading(false);
    }
  };

  // Função para limpar o formulário
  const handleClear = () => {
    setFile(null);
    setMat("");
    setEvaluationDate("");
    setError("");
    setProgress(0);
    setDownloadURL("");
    const fileInput = document.getElementById("pdfInput");
    //@ts-ignore
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="pdf-uploader-container">
      <h2>Upload de Avaliação</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-group">
          <label htmlFor="matricula">Matrícula do Aluno:</label>
          <input
            type="text"
            id="matricula"
            value={mat}
            onChange={(e) => setMat(e.target.value)}
            placeholder="Digite a matrícula"
            disabled={uploading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="data">Data da Avaliação:</label>
          <input
            type="date"
            id="data"
            value={evaluationDate}
            onChange={(e) => setEvaluationDate(e.target.value)}
            disabled={uploading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pdfInput">Selecione o PNG:</label>
          <input
            type="file"
            id="pdfInput"
            accept=".png,image/png"
            onChange={handleFileChange}
            disabled={uploading}
            required
          />
          {file && (
            <div className="file-info">
              <span className="label-arquivo">📄 {file.name}</span>
              <span className="file-size">
                ({(file.size / 1024).toFixed(2)} KB)
              </span>
            </div>
          )}
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        {uploading && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        )}

        {downloadURL && (
          <div className="success-message">
            ✅ Upload concluído!
            <a
              href={downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              className="download-link"
            >
              Ver arquivo
            </a>
          </div>
        )}

        <div className="button-group">
          <button
            type="submit"
            disabled={uploading || !file}
            className="btn-upload"
          >
            {uploading ? "Enviando..." : "Fazer Upload"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={uploading}
            className="btn-clear"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PdfUploader;
