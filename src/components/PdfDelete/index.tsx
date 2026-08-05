//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import "./delete.css";
import { storage } from "../../main";
import Loader from "../Loader";
import { Calendar, Eye, Trash } from "phosphor-react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export const PdfDelete = () => {
  const [file, setFile] = useState(null);
  const [mat, setMat] = useState("");
  const [evaluationDate, setEvaluationDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");

  const firestore = getFirestore();

  // Carregar lista de arquivos
  const loadFiles = async () => {
    if (!mat) return;

    setLoading(true);
    try {
      const listRef = ref(storage, `avaliações/${mat}`);
      const res = await listAll(listRef);

      const filePromises = res.prefixes.map(async (folderRef) => {
        const folderFiles = await listAll(folderRef);
        const filesList = await Promise.all(
          folderFiles.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              name: itemRef.name,
              url: url,
              date: folderRef.name,
              fullPath: itemRef.fullPath,
            };
          }),
        );
        return filesList;
      });

      const allFiles = await Promise.all(filePromises);
      setFiles(allFiles.flat());
    } catch (error) {
      console.error("Erro ao carregar arquivos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para carregar arquivos quando a matrícula mudar
  useEffect(() => {
    if (mat && mat.length >= 3) {
      loadFiles();
    } else {
      setFiles([]);
    }
  }, [mat]);

  // FUNÇÃO PARA DELETAR ARQUIVO
  const handleDelete = async (filePath, fileName) => {
    // Confirmar exclusão
    if (
      !window.confirm(`Tem certeza que deseja deletar o arquivo "${fileName}"?`)
    ) {
      return;
    }

    setLoading(true);
    try {
      // Criar referência do arquivo no storage
      const fileRef = ref(storage, filePath);

      // Verificar se o arquivo existe
      try {
        await getDownloadURL(fileRef);
      } catch (error) {
        if (error.code === "storage/object-not-found") {
          setError("Arquivo não encontrado no servidor");
          setLoading(false);
          return;
        }
        throw error;
      }

      // Deletar o arquivo
      await deleteObject(fileRef);

      // Remover da lista local
      setFiles((prevFiles) => prevFiles.filter((f) => f.fullPath !== filePath));

      alert(`Arquivo "${fileName}" deletado com sucesso!`);
    } catch (error) {
      console.error("Erro ao deletar arquivo:", error);
      setError("Erro ao deletar o arquivo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  async function getMat() {
    const studentRef = collection(firestore, "alunos");
    const q = query(studentRef, where("matricula", "==", mat));
    let response: any = [];
    const res = await getDocs(q);
    res.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    });
    setStudentName(response[0]?.nome);
    console.log("response", response);
  }
  useEffect(() => {
    getMat();
  }, [mat]);

  return (
    <div className="pdf-uploader-container">
      <form className="upload-form">
        <div className="form-group">
          <label htmlFor="matricula">Matrícula do Aluno:</label>
          <div className="search-group">
            <input
              className="mat-inpt"
              type="text"
              id="matricula"
              value={mat}
              onChange={(e) => setMat(e.target.value)}
              placeholder="Digite a matrícula"
              disabled={uploading}
              required
            />
          </div>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}
      </form>

      {/* Lista de arquivos */}
      {files.length > 0 && (
        <div className="files-list">
          <div className="files-title">{studentName || "Aluno"}</div>
          <div className="files-title">{files.length} avaliação(ões)</div>
          {loading && <p>Carregando...</p>}

          {/* Agrupar por data */}
          {[...new Set(files.map((f) => f.date))].map((date) => (
            <div key={date} className="date-group">
              <div className="date-header">
                <h4 className="files-title">
                  <Calendar /> Data: {date}
                </h4>
              </div>

              {files
                .filter((f) => f.date === date)
                .map((file, index) => (
                  <div key={index} className="file-item">
                    {/* <span className="file-name">📄 {file.name}</span> */}
                    <div className="file-actions">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-view"
                      >
                        <Eye size={22} color="#ffffff" />
                      </a>
                      <button
                        onClick={() => handleDelete(file.fullPath, file.name)}
                        className="btn-delete"
                        disabled={loading}
                      >
                        <Trash size={20} color="#ffffff" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {loading && <Loader />}

      {mat && files.length === 0 && !loading && (
        <div className="no-files">
          <p>Nenhum arquivo encontrado para esta matrícula.</p>
        </div>
      )}
    </div>
  );
};
