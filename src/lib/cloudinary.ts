import { createHash } from "crypto";

// Dossiers Cloudinary autorisés pour les uploads du back-office.
export const UPLOAD_FOLDERS = {
  projects: "im-g-creatif/projets",
  profile: "im-g-creatif/profil",
} as const;

export type UploadFolder = keyof typeof UPLOAD_FOLDERS;

export type UploadSignature =
  | { ok: true; cloudName: string; apiKey: string; timestamp: number; signature: string; folder: string }
  | { ok: false; error: string };

function config() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret };
}

// Signature Cloudinary : paramètres triés par nom, joints par « & », suivis du secret, puis SHA-1.
function sign(params: Record<string, string | number>, secret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(payload + secret).digest("hex");
}

export function signUpload(folderKey: UploadFolder): UploadSignature {
  const cfg = config();
  if (!cfg) return { ok: false, error: "Cloudinary n'est pas configuré (variables CLOUDINARY_* manquantes dans .env)." };
  const folder = UPLOAD_FOLDERS[folderKey];
  if (!folder) return { ok: false, error: "Dossier d'upload inconnu." };

  const timestamp = Math.round(Date.now() / 1000);
  const signature = sign({ folder, timestamp }, cfg.apiSecret);
  return { ok: true, cloudName: cfg.cloudName, apiKey: cfg.apiKey, timestamp, signature, folder };
}

// N'accepte que les images servies par Cloudinary (next.config n'autorise que ce domaine).
export function isCloudinaryUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}

// Retrouve le public_id à partir de l'URL. Seules les images des dossiers du site sont concernées,
// pour ne jamais supprimer le logo ou d'autres fichiers du compte.
function publicIdFromUrl(url: string) {
  const match = url.match(/\/image\/upload\/(?:.*?\/)?v\d+\/(.+)\.[a-z0-9]+$/i);
  const id = match?.[1];
  if (!id || !Object.values(UPLOAD_FOLDERS).some((f) => id.startsWith(`${f}/`))) return null;
  return id;
}

// Supprime une image de Cloudinary. Un échec n'empêche pas l'action en cours.
export async function deleteCloudinaryImage(url: string | null | undefined) {
  const cfg = config();
  const publicId = url ? publicIdFromUrl(url) : null;
  if (!cfg || !publicId) return;

  const timestamp = Math.round(Date.now() / 1000);
  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: cfg.apiKey,
    signature: sign({ public_id: publicId, timestamp }, cfg.apiSecret),
  });

  try {
    await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/image/destroy`, { method: "POST", body });
  } catch (error) {
    console.warn("Suppression Cloudinary impossible :", error);
  }
}