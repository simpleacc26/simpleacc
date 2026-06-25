/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL?: string;
  readonly VITE_WHATSAPP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
