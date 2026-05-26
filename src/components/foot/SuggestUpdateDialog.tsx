import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitSuggestion } from '@/lib/api/foot';
import { Loader2 } from 'lucide-react';

const schema = z.object({
  prix_adulte: z.coerce.number().min(0).max(10000).optional().or(z.literal('').transform(() => undefined)),
  prix_enfant: z.coerce.number().min(0).max(10000).optional().or(z.literal('').transform(() => undefined)),
  niveau_ligue: z.string().trim().max(100).optional(),
  horaires_text: z.string().trim().max(1000).optional(),
  telephone: z.string().trim().max(30).optional(),
  site_web: z.string().trim().url({ message: 'URL invalide' }).max(255).optional().or(z.literal('').transform(() => undefined)),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataEsId: string;
  nom: string;
  ville: string;
}

export function SuggestUpdateDialog({ open, onOpenChange, dataEsId, nom, ville }: Props) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await submitSuggestion({
        data_es_id: dataEsId,
        nom,
        ville,
        prix_adulte: values.prix_adulte ?? null,
        prix_enfant: values.prix_enfant ?? null,
        niveau_ligue: values.niveau_ligue || null,
        horaires_text: values.horaires_text || null,
        telephone: values.telephone || null,
        site_web: values.site_web || null,
      });
      toast({ title: 'Merci !', description: 'Votre suggestion a été enregistrée.' });
      reset();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast({ title: 'Erreur', description: "Impossible d'enregistrer la suggestion.", variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Suggérer une mise à jour</DialogTitle>
          <DialogDescription>
            Aidez-nous à améliorer la fiche de <strong>{nom}</strong>. Votre suggestion sera relue
            avant publication.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="prix_adulte">Prix licence adulte (€)</Label>
              <Input id="prix_adulte" type="number" step="1" {...register('prix_adulte')} />
              {errors.prix_adulte && <p className="text-xs text-destructive mt-1">{String(errors.prix_adulte.message)}</p>}
            </div>
            <div>
              <Label htmlFor="prix_enfant">Prix licence enfant (€)</Label>
              <Input id="prix_enfant" type="number" step="1" {...register('prix_enfant')} />
              {errors.prix_enfant && <p className="text-xs text-destructive mt-1">{String(errors.prix_enfant.message)}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="niveau_ligue">Niveau / ligue</Label>
            <Input id="niveau_ligue" placeholder="ex: Régional 1, Départemental 2..." {...register('niveau_ligue')} />
          </div>

          <div>
            <Label htmlFor="horaires_text">Horaires d'entraînement</Label>
            <Textarea
              id="horaires_text"
              rows={3}
              placeholder="ex: Mardi 18h-20h, Jeudi 18h-20h, Samedi matin..."
              {...register('horaires_text')}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="telephone">Téléphone</Label>
              <Input id="telephone" type="tel" {...register('telephone')} />
            </div>
            <div>
              <Label htmlFor="site_web">Site web</Label>
              <Input id="site_web" type="url" placeholder="https://..." {...register('site_web')} />
              {errors.site_web && <p className="text-xs text-destructive mt-1">{String(errors.site_web.message)}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Annuler
            </Button>
            <Button type="submit" disabled={submitting} className="gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Envoyer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
