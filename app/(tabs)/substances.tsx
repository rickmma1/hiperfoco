import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text } from 'react-native';
import { z } from 'zod';
import { Card } from '@/components/Card';
import { FormField } from '@/components/FormField';
import { WarningBanner } from '@/components/WarningBanner';
import { addSubstance, listSubstances } from '@/services/substancesService';

const schema = z.object({
  category: z.enum(['androgenicos_anabolicos', 'glp1_antiobesidade', 'outras_medicacoes']),
  name: z.string().min(2),
  startDate: z.string().min(4),
  endDate: z.string().optional(),
  route: z.string().optional(),
  prescribed: z.string().optional(),
  doseFrequency: z.string().optional(),
  notes: z.string().optional()
});

export default function SubstancesScreen() {
  const [items, setItems] = useState<any[]>([]);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { category: 'outras_medicacoes', prescribed: 'não' }
  });

  const reload = () => listSubstances().then(setItems).catch(console.error);
  useEffect(() => {
    reload();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner text="Registro para consulta. Este app não fornece orientação de uso." />
      <Card>
        <Text style={{ color: '#fca5a5' }}>Doses não são usadas em cálculos e não devem guiar decisões.</Text>
        <FormField control={control} name="category" label="Categoria" />
        <FormField control={control} name="name" label="Nome" />
        <FormField control={control} name="startDate" label="Data início" />
        <FormField control={control} name="endDate" label="Data fim (opcional)" />
        <FormField control={control} name="route" label="Via (oral/injetável/outro)" />
        <FormField control={control} name="prescribed" label="Prescrito? (sim/não)" />
        <FormField control={control} name="doseFrequency" label="Dose/frequência (texto opcional)" />
        <FormField control={control} name="notes" label="Observações" />
        <Pressable
          style={{ backgroundColor: '#2563eb', borderRadius: 8, padding: 10 }}
          onPress={handleSubmit(async (values) => {
            await addSubstance({ ...values, prescribed: values.prescribed === 'sim' });
            reset();
            reload();
          })}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Salvar registro</Text>
        </Pressable>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Histórico</Text>
        {items.map((item) => (
          <Text style={{ color: '#d1d5db' }} key={item.id}>
            {item.category} - {item.name} ({item.start_date})
          </Text>
        ))}
      </Card>
    </ScrollView>
  );
}
