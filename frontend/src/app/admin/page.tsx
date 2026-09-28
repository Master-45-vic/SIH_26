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
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900">Admin Legal Sources & Ingestion</h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-300">
                Hybrid RAG Corpus
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload PDF gazette notifications and manage verified statutory references indexed across BM25 and Qdrant.
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">Total Statutory Corpora</span>
          <span className="text-lg font-black text-purple-700 font-mono">{documents.length} Indexed Texts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Upload className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-900">Ingest Legal Document / PDF</h3>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Gazette Notification S.O. 1234(E)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jurisdiction</label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="India">🇮🇳 India</option>
                  <option value="International">🌐 International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Issuing Authority</label>
              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                placeholder="e.g. National Biodiversity Authority"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Statutory Citation</label>
              <input
                type="text"
                value={citation}
                onChange={(e) => setCitation(e.target.value)}
                placeholder="e.g. Act No. 18 of 2003, Section 6(1)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select File (PDF or Text)</label>
              <input
                type="file"
                accept=".pdf,.txt,.json,.md"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                required
              />
            </div>

            {uploadSuccess && (
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {uploading ? "Extracting & Vector Indexing..." : "Upload & Re-Index Hybrid RAG"}
            </button>
          </form>
        </div>

        {/* Existing Legal Corpora Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900">Active Indexed Legal Documents</h3>
            </div>
            <span className="text-xs text-slate-400">Total: {documents.length}</span>
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {loading ? (
              <div className="text-center py-20 text-slate-400 text-xs">
                Loading legal corpus database...
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                No documents found.
              </div>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2 hover:border-purple-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="font-bold text-slate-900 text-xs">{doc.title}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                            doc.jurisdiction === "India"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }`}
                        >
                          {doc.jurisdiction}
                        </span>
                        <span className="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5">{doc.official_citation}</p>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {doc.doc_id}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                    {doc.summary}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>Authority: <strong className="text-slate-600">{doc.authority}</strong></span>
                    <span>Version: <strong className="text-slate-600">{doc.version}</strong></span>
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
