import CSVUploader from '@/components/admin/CSVUploader';

export default function Admin() {
  return (
    <div className="container max-w-3xl py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin — Imports</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Import direct des clubs depuis vos fichiers CSV (1 par département). Aucun crédit IA n'est consommé.
        </p>
      </div>
      <CSVUploader />
    </div>
  );
}
