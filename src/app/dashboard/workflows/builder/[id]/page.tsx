"use client";

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  Panel,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Play, 
  Save, 
  Sparkles, 
  Plus, 
  Trash2, 
  Settings2, 
  ChevronRight,
  Zap,
  Activity,
  GitBranch,
  Bot
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'input', 
    data: { label: 'New Lead Trigger' }, 
    position: { x: 250, y: 50 },
    className: 'bg-emerald-500/10 border-emerald-500 text-emerald-700 font-bold'
  },
];

const initialEdges: Edge[] = [];

const nodePalette = [
  { type: 'TRIGGER', label: 'Trigger', icon: Zap, color: 'text-amber-500' },
  { type: 'ACTION', label: 'Action', icon: Activity, color: 'text-blue-500' },
  { type: 'CONDITION', label: 'Condition', icon: GitBranch, color: 'text-purple-500' },
  { type: 'AI_STEP', label: 'AI Insight', icon: Bot, color: 'text-emerald-500' },
];

export default function WorkflowBuilder({ params }: { params: { id: string } }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
      style: { strokeWidth: 2 }
    }, eds)),
    [setEdges]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const addNode = (type: string, label: string) => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      type: type === 'TRIGGER' ? 'input' : type === 'CONDITION' ? 'default' : 'output',
      data: { label: label },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      className: 'bg-card border-border shadow-sm font-medium'
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden rounded-xl border bg-background shadow-lg">
      {/* Left Panel: Palette */}
      <div className="w-64 border-r bg-slate-50/50 p-4 dark:bg-slate-900/50">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Node Palette</h3>
        <div className="space-y-3">
          {nodePalette.map((item) => (
            <div
              key={item.type}
              className="group flex cursor-grab items-center justify-between rounded-lg border bg-card p-3 shadow-sm transition-all hover:border-primary hover:shadow-md"
              onClick={() => addNode(item.type, item.label)}
            >
              <div className="flex items-center">
                <item.icon className={`mr-3 h-4 w-4 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <Plus className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="relative flex-1 bg-slate-100 dark:bg-slate-950">
        <div className="absolute left-4 top-4 z-10 flex space-x-2">
          <Input 
            className="h-9 w-64 bg-background/80 backdrop-blur-md focus-visible:ring-primary" 
            defaultValue="New Workflow Architect" 
          />
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md">DRAFT</Badge>
        </div>

        <div className="absolute right-4 top-4 z-10 flex space-x-2">
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-md" onClick={() => setIsSimulating(!isSimulating)}>
            <Play className={`mr-2 h-4 w-4 ${isSimulating ? 'text-emerald-500 fill-emerald-500' : ''}`} />
            {isSimulating ? 'Stop Sim' : 'Dry Run'}
          </Button>
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-md">
            <Sparkles className="mr-2 h-4 w-4 text-emerald-500" />
            AI Suggest
          </Button>
          <Button size="sm" className="shadow-md">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background color="#cbd5e1" gap={20} />
          <Controls />
          <MiniMap className="bg-background border shadow-xl rounded-lg" />
          
          {isSimulating && (
            <Panel position="bottom-center" className="bg-emerald-500 text-white px-4 py-2 rounded-full shadow-2xl flex items-center animate-pulse">
              <Activity className="mr-2 h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Simulation Mode Active</span>
            </Panel>
          )}
        </ReactFlow>
      </div>

      {/* Right Panel: Properties */}
      <div className="w-80 border-l bg-slate-50/50 p-4 dark:bg-slate-900/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Properties</h3>
          <Settings2 className="h-4 w-4 text-muted-foreground" />
        </div>

        {selectedNode ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Node Label</label>
              <Input defaultValue={selectedNode.data.label} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Config (JSON)</label>
              <textarea 
                className="w-full h-32 rounded-md border bg-card p-2 text-xs font-mono"
                placeholder='{ "key": "value" }'
              />
            </div>
            <Button variant="destructive" size="sm" className="w-full" onClick={() => {
              setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
              setSelectedNode(null);
            }}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Node
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="rounded-full bg-muted p-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground max-w-[150px]">
              Select a node on the canvas to edit its properties and configuration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}