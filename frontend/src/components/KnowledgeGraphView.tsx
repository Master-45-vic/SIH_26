"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Share2,
  Filter,
  Info,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle,
  FileText,
  Shield,
  Layers
} from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: string;
  properties: Record<string, any>;
  x?: number;
  y?: number;
}

interface Edge {
  source: string;
  target: string;
  relation: string;
  label: string;
}

export const KnowledgeGraphView: React.FC<{ selectedPlant?: string }> = ({ selectedPlant = "all" }) => {
  const [activePlant, setActivePlant] = useState(selectedPlant);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);

  const fetchGraph = async (plant: string) => {
    setLoading(true);
    try {
      const data = await api.getKnowledgeGraph(plant === "all" ? undefined : plant);
      
      // Calculate responsive tier layout
      const typeTierOrder: Record<string, number> = {
        Plant: 0,
        TraditionalKnowledge: 1,
        Patent: 2,
        ABS: 3,
        Regulation: 4,
      };

      const typeColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
        Plant: { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-800", dot: "#10b981" },
        TraditionalKnowledge: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-800", dot: "#f59e0b" },
        Patent: { bg: "bg-indigo-50", border: "border-indigo-300", text: "text-indigo-800", dot: "#6366f1" },
        ABS: { bg: "bg-teal-50", border: "border-teal-300", text: "text-teal-800", dot: "#0d9488" },
        Regulation: { bg: "bg-sky-50", border: "border-sky-300", text: "text-sky-800", dot: "#0284c7" },
      };

      // Group nodes by tier
      const tierBuckets: Record<number, Node[]> = { 0: [], 1: [], 2: [], 3: [], 4: [] };
      data.nodes.forEach((n: Node) => {
        const tier = typeTierOrder[n.type] ?? 0;
        tierBuckets[tier].push(n);
      });

      // Assign coordinates
      const width = 1100;
      const height = 650;
      const tierX = [80, 310, 540, 770, 1000];

      const positionedNodes: Node[] = [];
      Object.keys(tierBuckets).forEach((tierStr) => {
        const tier = Number(tierStr);
        const bucket = tierBuckets[tier];
        const stepY = height / (bucket.length + 1);
        bucket.forEach((node, idx) => {
          positionedNodes.push({
            ...node,
            x: tierX[tier],
            y: stepY * (idx + 1),
          });
        });
      });

      setNodes(positionedNodes);
      setEdges(data.edges);
      if (positionedNodes.length > 0 && !selectedNode) {
        setSelectedNode(positionedNodes[0]);
      }
    } catch (err) {
      console.error("Knowledge graph fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph(activePlant);
  }, [activePlant]);

  const getNodePos = (id: string) => {
    const n = nodes.find((node) => node.id === id);
    return n ? { x: n.x || 0, y: n.y || 0 } : null;
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "Plant": return { fill: "#ecfdf5", stroke: "#10b981", text: "#065f46" };
      case "TraditionalKnowledge": return { fill: "#fffbeb", stroke: "#f59e0b", text: "#92400e" };
      case "Patent": return { fill: "#eef2ff", stroke: "#6366f1", text: "#3730a3" };
      case "ABS": return { fill: "#f0fdfa", stroke: "#0d9488", text: "#115e59" };
      case "Regulation": return { fill: "#f0f9ff", stroke: "#0284c7", text: "#075985" };
      default: return { fill: "#f8fafc", stroke: "#94a3b8", text: "#334155" };
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Top Header & Filter Controls */}
      <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Ayurveda Regulatory Knowledge Graph</h3>
            <p className="text-xs text-slate-500">
              Interactive statutory lineage: Plant → Traditional Knowledge → Patent → ABS → Regulation
            </p>
          </div>
        </div>

        {/* Plant Filter Buttons */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-inner">
          {["all", "turmeric", "neem", "ashwagandha", "brahmi"].map((plant) => (
            <button
              key={plant}
              onClick={() => setActivePlant(plant)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                activePlant === plant
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {plant === "all" ? "All Herbs" : plant}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-700 px-1">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
            title="Reset"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Graph Area + Details Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[580px]">
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-3 bg-slate-900/5 relative overflow-auto p-4 flex items-center justify-center border-r border-slate-100">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full mx-auto mb-3"></div>
              <p className="text-xs font-semibold text-slate-500">Loading statutory knowledge graph...</p>
            </div>
          ) : (
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                transition: "transform 0.2s ease-out",
                width: 1100,
                height: 650,
              }}
              className="relative"
            >
              <svg width={1100} height={650} className="absolute inset-0 pointer-events-none">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="7"
                    markerHeight="5"
                    refX="6"
                    refY="2.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 7 2.5, 0 5" fill="#94a3b8" />
                  </marker>
                  <marker
                    id="arrowhead-active"
                    markerWidth="7"
                    markerHeight="5"
                    refX="6"
                    refY="2.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 7 2.5, 0 5" fill="#0284c7" />
                  </marker>
                </defs>

                {/* Render Edges */}
                {edges.map((edge, idx) => {
                  const s = getNodePos(edge.source);
                  const t = getNodePos(edge.target);
                  if (!s || !t) return null;

                  const isConnectedToSelected =
                    selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

                  const midX = (s.x + t.x) / 2;
                  const midY = (s.y + t.y) / 2;
                  const path = `M ${s.x + 60} ${s.y} C ${midX} ${s.y}, ${midX} ${t.y}, ${t.x - 60} ${t.y}`;

                  return (
                    <g key={idx}>
                      <path
                        d={path}
                        fill="none"
                        stroke={isConnectedToSelected ? "#0284c7" : "#cbd5e1"}
                        strokeWidth={isConnectedToSelected ? 2.5 : 1.5}
                        strokeDasharray={edge.relation.includes("BAR") || edge.relation.includes("REVOKED") ? "4 3" : undefined}
                        markerEnd={isConnectedToSelected ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                        className="transition-colors duration-200"
                      />
                      {/* Edge Label */}
                      <text
                        x={midX}
                        y={midY - 6}
                        fill={isConnectedToSelected ? "#0369a1" : "#64748b"}
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                        className="font-sans select-none"
                      >
                        {edge.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Render Nodes as Interactive HTML Elements */}
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const colors = getNodeColor(node.type);

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      left: (node.x || 0) - 70,
                      top: (node.y || 0) - 32,
                      width: 140,
                    }}
                    className={`absolute p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm ${
                      isSelected
                        ? "ring-3 ring-sky-500 shadow-lg scale-105 z-20"
                        : "hover:scale-102 hover:shadow-md z-10"
                    }`}
                    style-border={{ borderColor: colors.stroke }}
                  >
                    <div
                      className="rounded-xl p-2 border"
                      style={{
                        backgroundColor: colors.fill,
                        borderColor: isSelected ? "#0284c7" : colors.stroke,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                          style={{ color: colors.text, backgroundColor: "rgba(255,255,255,0.7)" }}
                        >
                          {node.type}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.stroke }}
                        />
                      </div>
                      <h4
                        className="text-[11px] font-bold leading-tight line-clamp-2"
                        style={{ color: colors.text }}
                      >
                        {node.label}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Node Details Panel */}
        <div className="p-6 bg-white flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {selectedNode.type} Node
                </span>
                <span className="text-[11px] text-slate-400 font-mono">ID: {selectedNode.id}</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedNode.label}</h4>
                <p className="text-xs text-slate-500 mt-0.5">Statutory & Monograph Metadata</p>
              </div>

              {/* Dynamic Properties */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
                {Object.entries(selectedNode.properties).map(([k, v]) => (
                  <div key={k} className="border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      {k.replace(/_/g, " ")}
                    </span>
                    <span className="text-slate-800 font-medium leading-relaxed">{String(v)}</span>
                  </div>
                ))}
              </div>

              {/* Connected Lineage Relations */}
              <div>
                <h5 className="text-xs font-bold text-slate-800 mb-2">Connected Knowledge Links</h5>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {edges
                    .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((e, idx) => {
                      const isOutgoing = e.source === selectedNode.id;
                      const otherId = isOutgoing ? e.target : e.source;
                      const otherNode = nodes.find((n) => n.id === otherId);
                      return (
                        <div
                          key={idx}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="p-2 rounded-xl bg-sky-50/70 border border-sky-200/70 text-[11px] text-sky-900 flex items-center justify-between cursor-pointer hover:bg-sky-100 transition-colors"
                        >
                          <div>
                            <span className="font-bold">{isOutgoing ? "➔ " : "⬅ "} {e.label}</span>
                            <p className="text-slate-500 text-[10px]">{otherNode?.label}</p>
                          </div>
                          <span className="text-[9px] bg-white px-1.5 py-0.5 rounded font-bold border border-sky-200 text-sky-700">
                            {otherNode?.type}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Info className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">Click any node in the graph to inspect legal lineage and patent links.</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center space-x-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Synced with TKDL & Indian Patents Act 1970</span>
          </div>
        </div>
      </div>
    </div>
  );
};
