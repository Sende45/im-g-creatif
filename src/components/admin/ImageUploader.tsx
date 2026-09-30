"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useTransition, type DragEvent } from "react";
import { Check, ImagePlus, LoaderCircle, RefreshCw, Trash2, TriangleAlert } from "lucide-react";
import { getUploadSignature } from "@/app/admin/actions";
import type { UploadFolder } from "@/lib/cloudinary";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_MB = 10;

type Props = {
  folder: UploadFolder;
  /** Nom du champ caché : l'URL est envoyée avec le formulaire parent. */
  name?: string;
  defaultValue?: string | null;
  /** Enregistrement immédiat (ex : action serveur) après upload ou suppression. */
  onChange?: (url: string | null) => void | Promise<void>;
  /** Classe Tailwind de ratio, ex : "aspect-[4/3]". */
  aspect?: string;
  label?: string;
  /** Prévient le parent pendant l'envoi (ex : bloquer le bouton du formulaire). */
  onBusyChange?: (busy: boolean) => void;
};

type Status = { kind: "idle" } | { kind: "uploading"; progress: number } | { kind: "saved" } | { kind: "error"; message: string };

// Envoie le fichier à Cloudinary avec XHR pour suivre la progression.
function uploadToCloudinary(file: File, sig: Extract<Awaited<ReturnType<typeof getUploadSignature>>, { ok: true }>, onProgress: (p: number) => void) {
  return new Promise<string>((resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    data.append("api_key", sig.apiKey);
    data.append("timestamp", String(sig.timestamp));
    data.append("signature", sig.signature);
    data.append("folder", sig.folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText || "{}");
      if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) resolve(res.secure_url);
      else reject(new Error(res.error?.message ?? "Cloudinary a refusé l'image."));
    };
    xhr.onerror = () => reject(new Error("Connexion impossible avec Cloudinary. Vérifiez votre connexion internet."));
    xhr.send(data);
  });
}

export default function ImageUploader({ folder, name, defaultValue = null, onChange, aspect = "aspect-[4/3]", label = "Image", onBusyChange }: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(defaultValue);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [dragging, setDragging] = useState(false);
  const [saving, startSaving] = useTransition();
  const busy = status.kind === "uploading" || saving;

  useEffect(() => onBusyChange?.(busy), [busy, onBusyChange]);

  function commit(next: string | null) {
    setUrl(next);
    if (!onChange) return;
    startSaving(async () => {
      try {
        await onChange(next);
        setStatus({ kind: "saved" });
      } catch {
        setStatus({ kind: "error", message: "L'image n'a pas pu être enregistrée. Réessayez." });
      }
    });
  }

  async function handleFile(file: File | undefined) {
    if (!file || busy) return;
    if (!ACCEPTED.includes(file.type)) {
      setStatus({ kind: "error", message: "Format non pris en charge. Utilisez JPG, PNG, WebP ou AVIF." });
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus({ kind: "error", message: `Image trop lourde (${(file.size / 1024 / 1024).toFixed(1)} Mo). Maximum ${MAX_MB} Mo.` });
      return;
    }

    setStatus({ kind: "uploading", progress: 0 });
    try {
      const sig = await getUploadSignature(folder);
      if (!sig.ok) throw new Error(sig.error);
      const secureUrl = await uploadToCloudinary(file, sig, (progress) => setStatus({ kind: "uploading", progress }));
      setStatus(onChange ? { kind: "uploading", progress: 100 } : { kind: "idle" });
      commit(secureUrl);
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "L'upload a échoué." });
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove() {
    if (onChange && !window.confirm("Retirer cette image ? Elle sera aussi supprimée de Cloudinary.")) return;
    setStatus({ kind: "idle" });
    commit(null);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div>
      {name && <input type="hidden" name={name} value={url ?? ""} />}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={busy}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative overflow-hidden rounded-lg border-2 border-dashed transition ${aspect} ${
          dragging ? "border-bordeaux bg-rose-pale" : url ? "border-transparent" : "border-rose-soft bg-rose-pale/50"
        }`}
      >
        {url ? (
          <Image src={url} alt={label} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        ) : (
          <label htmlFor={inputId} className="absolute inset-0 grid cursor-pointer place-items-center p-4 text-center">
            <span>
              <ImagePlus className="mx-auto mb-2 size-7 text-bordeaux" />
              <span className="block text-sm font-semibold text-bordeaux-deep">Téléverser une image</span>
              <span className="block text-xs text-ink/60">Glissez-déposez ou cliquez · JPG, PNG, WebP · {MAX_MB} Mo max</span>
            </span>
          </label>
        )}

        {status.kind === "uploading" && (
          <div className="absolute inset-0 grid place-items-center bg-bordeaux-deep/60 px-6 text-white">
            <div className="w-full max-w-48 text-center text-sm">
              <LoaderCircle className="mx-auto mb-2 size-6 animate-spin" />
              {status.progress < 100 ? `Envoi… ${status.progress} %` : "Enregistrement…"}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/30">
                <div className="h-full bg-white transition-[width]" style={{ width: `${status.progress}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {url && (
          <>
            <label
              htmlFor={inputId}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-rose-soft px-3 py-1.5 text-xs font-semibold text-bordeaux-deep hover:bg-rose-pale ${busy ? "pointer-events-none opacity-50" : ""}`}
            >
              <RefreshCw className="size-3.5" /> Remplacer
            </label>
            <button
              type="button"
              onClick={remove}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="size-3.5" /> Retirer
            </button>
          </>
        )}
        <p role="status" aria-live="polite" className="text-xs">
          {status.kind === "saved" && !saving && (
            <span className="inline-flex items-center gap-1 text-green-700">
              <Check className="size-3.5" /> Enregistré
            </span>
          )}
          {status.kind === "error" && (
            <span className="inline-flex items-center gap-1 text-red-600">
              <TriangleAlert className="size-3.5" /> {status.message}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}