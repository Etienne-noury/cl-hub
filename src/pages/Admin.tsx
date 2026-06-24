import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runImport = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('import-rna');
      if (error) throw error;
      setResult(data);
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-6">Admin — Imports</h1>
      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Import RNA (Répertoire National des Associations)</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Télécharge, filtre les associations sportives et insère dans clubs_enriched.
          </p>
        </div>
        <Button onClick={runImport} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lancer l'import RNA complet
        </Button>

        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <strong>Erreur :</strong> {error}
          </div>
        )}

        {result && (
          <div className="rounded-md border bg-muted/30 p-4 text-sm space-y-2">
            <div><strong>Importés :</strong> {result.imported}</div>
            <div><strong>Ignorés :</strong> {result.skipped}</div>
            {result.nextOffset != null && (
              <div><strong>Next offset :</strong> {result.nextOffset} / {result.totalLines}</div>
            )}
            {result.errors?.length > 0 && (
              <div>
                <strong>Erreurs :</strong>
                <ul className="list-disc pl-5">
                  {result.errors.map((e: string, i: number) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
            <pre className="text-xs overflow-auto mt-2">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </Card>
    </div>
  );
}
