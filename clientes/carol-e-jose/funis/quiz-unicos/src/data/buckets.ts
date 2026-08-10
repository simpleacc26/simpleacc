// Mapeamento leve bucket <-> slug de URL, separado da DiagnosticoPage para
// permitir carregar essa página sob demanda (lazy) sem puxar todo o conteúdo
// dos diagnósticos no bundle inicial.

export const BUCKET_SLUGS: Record<string, string> = {
  "Refém da Operação": "refem-da-operacao",
  "Time sem Dono": "time-sem-dono",
  "Consolidado mas Estagnado": "estagnado",
  "O Frustrado": "frustrado",
};

const SLUG_TO_BUCKET: Record<string, string> = Object.fromEntries(
  Object.entries(BUCKET_SLUGS).map(([bucket, slug]) => [slug, bucket])
);

export function getSlugFromBucket(bucket: string): string {
  return BUCKET_SLUGS[bucket] ?? "refem-da-operacao";
}

export function getBucketFromSlug(slug: string): string | null {
  return SLUG_TO_BUCKET[slug] ?? null;
}
