/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTM_ID?: string;
  readonly VITE_LEADS_ENDPOINT?: string;
  readonly VITE_WHATSAPP?: string;
  readonly VITE_AGENDAMENTO_URL?: string;
  readonly VITE_COMUNIDADE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
