import { Layers, Ruler, Palette } from 'lucide-react';

export function SpecIcon({ label }: { label: string }) {
  if (label === 'Material') return <Layers size={13} />;
  if (label === 'Size') return <Ruler size={13} />;
  return <Palette size={13} />;
}
