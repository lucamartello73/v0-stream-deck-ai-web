"use client";

import { useState, useEffect } from "react";
import { ButtonConfig, ActionType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ButtonEditorProps {
  button: ButtonConfig | null;
  onSave: (button: ButtonConfig) => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function ButtonEditor({
  button,
  onSave,
  onDelete,
  onClose,
}: ButtonEditorProps) {
  const [label, setLabel] = useState("");
  const [actionType, setActionType] = useState<ActionType>("open_url");
  const [url, setUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [payloadTemplate, setPayloadTemplate] = useState("");

  useEffect(() => {
    if (button) {
      setLabel(button.label);
      setActionType(button.actionType);
      setUrl(button.url || "");
      setWebhookUrl(button.webhookUrl || "");
      setPayloadTemplate(button.payloadTemplate || "");
    }
  }, [button]);

  if (!button) {
    return (
      <div className="w-80 bg-gray-800 p-6 flex items-center justify-center">
        <p className="text-gray-400 text-center">
          Seleziona un tasto per modificarlo
        </p>
      </div>
    );
  }

  const handleSave = () => {
    const updatedButton: ButtonConfig = {
      ...button,
      label,
      actionType,
      url: actionType === "open_url" ? url : undefined,
      webhookUrl: actionType === "run_webhook" ? webhookUrl : undefined,
      payloadTemplate: actionType === "run_webhook" ? payloadTemplate : undefined,
    };
    onSave(updatedButton);
  };

  return (
    <div className="w-80 bg-gray-800 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white font-bold text-lg">Editor Tasto</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="label" className="text-white">
          Etichetta
        </Label>
        <Input
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="bg-gray-700 text-white border-gray-600"
          placeholder="Nome del tasto"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="actionType" className="text-white">
          Tipo Azione
        </Label>
        <Select value={actionType} onValueChange={(value) => setActionType(value as ActionType)}>
          <SelectTrigger className="bg-gray-700 text-white border-gray-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open_url">Apri URL</SelectItem>
            <SelectItem value="run_webhook">Esegui Webhook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {actionType === "open_url" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="url" className="text-white">
            URL
          </Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-gray-700 text-white border-gray-600"
            placeholder="https://example.com"
          />
        </div>
      )}

      {actionType === "run_webhook" && (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="webhookUrl" className="text-white">
              Webhook URL
            </Label>
            <Input
              id="webhookUrl"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
              placeholder="https://api.example.com/webhook"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="payload" className="text-white">
              Payload JSON
            </Label>
            <Textarea
              id="payload"
              value={payloadTemplate}
              onChange={(e) => setPayloadTemplate(e.target.value)}
              className="bg-gray-700 text-white border-gray-600 min-h-[100px]"
              placeholder='{"key": "value"}'
            />
          </div>
        </>
      )}

      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleSave}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Salva
        </Button>
        <Button
          onClick={onDelete}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          Elimina
        </Button>
      </div>
    </div>
  );
}
