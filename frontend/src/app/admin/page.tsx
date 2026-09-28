"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Database,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Building,
  Scale,
  Calendar,
  Layers,
  Search,
  Filter,
} from "lucide-react";

export default function AdminPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [jurisdiction, setJurisdiction] = useState("India");
  const [category, setCategory] = useState("AYUSH Regulations");
  const [authority, setAuthority] = useState("Ministry of AYUSH");
  const [citation, setCitation] = useState("");
  const [version, setVersion] = useState("Current (2024)");
  const [file, setFile] = useState<File | null>(null);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const data = await api.getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Docs error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setUploading(true);
    setUploadSuccess(null);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("jurisdiction", jurisdiction);
      formData.append("category", category);
      formData.append("authority", authority);
      formData.append("official_citation", citation);
      formData.append("version", version);
      formData.append("file", file);

      const res = await api.uploadDocument(formData);
      setUploadSuccess(res.message);
      setTitle("");
      setCitation("");
      setFile(null);
      fetchDocs();
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-eco p-6 sm:p-8 rounded-3xl border border-[#c8d9c5]/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#e2ede0] text-[#5a9330] flex items-center justify-center border border-[#c2d8be] shadow-sm">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#143825]">Admin Legal Sources & Ingestion</h1>
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#e2ede0] text-[#143825] border border-[#c2d8be]">
                Hybrid RAG Corpus
              </span>
            </div>
            <p className="text-xs text-[#5e7164] mt-0.5">
              Upload PDF gazette notifications and manage verified statutory references indexed across BM25 and Qdrant.
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#5e7164] block">Total Statutory Corpora</span>
          <span className="text-lg font-black text-[#143825] font-mono">{documents.length} Indexed Texts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="glass-eco rounded-3xl p-6 sm:p-7 border border-[#c8d9c5]/80 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#c8d9c5]/60">
            <Upload className="w-4 h-4 text-[#5a9330]" />
            <h3 className="text-sm font-bold text-[#143825]">Ingest Legal Document / PDF</h3>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#143825] mb-1">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Gazette Notification S.O. 1234(E)"
                className="w-full text-xs px-3.5 py-2.5 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#143825] mb-1">Jurisdiction</label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                >
                  <option value="India">🇮🇳 India</option>
                  <option value="International">🌐 International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143825] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                >
                  <option value="AYUSH Regulations">AYUSH Regulations</option>
                  <option value="Patents & IPR">Patents & IPR</option>
                  <option value="Biodiversity & ABS">Biodiversity & ABS</option>
                  <option value="FSSAI Regulations">FSSAI Regulations</option>
                  <option value="International Treaties">International Treaties</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143825] mb-1">Issuing Authority</label>
              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                placeholder="e.g. National Biodiversity Authority"
                className="w-full text-xs px-3.5 py-2.5 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143825] mb-1">Official Statutory Citation</label>
              <input
                type="text"
                value={citation}
                onChange={(e) => setCitation(e.target.value)}
                placeholder="e.g. Act No. 18 of 2003, Section 6(1)"
                className="w-full text-xs px-3.5 py-2.5 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143825] mb-1">Select File (PDF or Text)</label>
              <input
                type="file"
                accept=".pdf,.txt,.json,.md"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-[#5e7164] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#e2ede0] file:text-[#143825] hover:file:bg-[#d5e7d2] cursor-pointer"
                required
              />
            </div>

            {uploadSuccess && (
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#2d5c1e] bg-[#eef6ec] p-3 rounded-2xl border border-[#c2d8be]">
                <CheckCircle className="w-4 h-4 text-[#5a9330] shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full py-3 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold shadow-md shadow-[#5a9330]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {uploading ? "Extracting & Vector Indexing..." : "Upload & Re-Index Hybrid RAG"}
            </button>
          </form>
        </div>

        {/* Existing Legal Corpora Table */}
        <div className="lg:col-span-2 glass-eco rounded-3xl p-6 sm:p-7 border border-[#c8d9c5]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#c8d9c5]/60">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#5a9330]" />
              <h3 className="text-sm font-bold text-[#143825]">Active Indexed Legal Documents</h3>
            </div>
            <span className="text-xs text-[#5e7164]">Total: {documents.length}</span>
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {loading ? (
              <div className="text-center py-20 text-[#5e7164] text-xs">
                Loading legal corpus database...
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-16 text-[#5e7164] text-xs">
                No documents found.
              </div>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-white/80 border border-[#c8d9c5]/80 text-xs space-y-2 hover:border-[#5a9330]/60 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="font-bold text-[#143825] text-xs">{doc.title}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            doc.jurisdiction === "India"
                              ? "bg-[#eef6ec] text-[#2d5c1e] border-[#c2d8be]"
                              : "bg-[#f4f6f5] text-[#143825] border-[#c8d9c5]"
                          }`}
                        >
                          {doc.jurisdiction}
                        </span>
                        <span className="text-[10px] bg-[#e2ede0] text-[#143825] px-2 py-0.5 rounded-full border border-[#c2d8be]">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#5e7164] mt-0.5">{doc.official_citation}</p>
                    </div>

                    <span className="text-[10px] font-mono text-[#5e7164] bg-white px-2 py-0.5 rounded-full border border-[#c8d9c5]">
                      {doc.doc_id}
                    </span>
                  </div>

                  <p className="text-[#4a6152] text-[11px] line-clamp-2 leading-relaxed">
                    {doc.summary}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#5e7164] pt-1.5 border-t border-[#c8d9c5]/50">
                    <span>Authority: <strong className="text-[#143825]">{doc.authority}</strong></span>
                    <span>Version: <strong className="text-[#143825]">{doc.version}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
