import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, TextInput } from 'react-native';
import { z } from 'zod';
import { Card } from '@/components/Card';
import { Chart } from '@/components/Chart';
import { FormField } from '@/components/FormField';
import { WarningBanner } from '@/components/WarningBanner';
import { suggestSubstitutions } from '@/services/nutritionAiService';
import { addDailyLog, listDailyLogs } from '@/services/logsService';
import { movingAverage } from '@/utils/calculators';

const schema = z.object({
  weightKg: z.coerce.number().optional(),
  waistCm: z.coerce.number().optional(),
  steps: z.coerce.number().optional(),
  sleepHours: z.coerce.number().optional(),
  rpe: z.coerce.number().min(1).max(10),
  mood: z.string().optional(),
  notes: z.string().optional()
});

export default function DailyScreen() {
  const [logs, setLogs] = useState<any[]>([]);
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [foodQuery, setFoodQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<ReturnType<typeof suggestSubstitutions> | null>(null);
  const { control, handleSubmit, reset } = useForm({ resolver: zodResolver(schema), defaultValues: { rpe: 5 } });

  const reload = () => listDailyLogs().then(setLogs).catch(console.error);
  useEffect(() => {
    reload();
  }, []);

  const addPhoto = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!image.canceled) setPhotoUri(image.assets[0].uri);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner />
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700', marginBottom: 8 }}>IA educacional de substituição alimentar</Text>
        <Text style={{ color: '#d1d5db', marginBottom: 8 }}>
          Digite um alimento para obter opções de substituição com quantidades proporcionais de macronutrientes.
        </Text>
        <TextInput
          value={foodQuery}
          onChangeText={setFoodQuery}
          placeholder="Ex.: arroz branco cozido"
          placeholderTextColor="#9ca3af"
          style={{ backgroundColor: '#374151', color: '#fff', borderRadius: 8, padding: 10, marginBottom: 8 }}
        />
        <Pressable
          style={{ backgroundColor: '#4b5563', borderRadius: 8, padding: 10 }}
          onPress={() => setAiResponse(suggestSubstitutions(foodQuery))}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Buscar substituições</Text>
        </Pressable>
        <Text style={{ color: '#fca5a5', marginTop: 8 }}>
          Informação educacional. Não altera prescrição ou conduta clínica individual.
        </Text>
        {!!aiResponse && (
          <>
            <Text style={{ color: '#93c5fd', marginTop: 10 }}>
              Referência: {aiResponse.base?.food ?? 'alimento não encontrado na base local'}
            </Text>
            {aiResponse.suggestions.map((item) => (
              <Text key={item.food} style={{ color: '#d1d5db', marginTop: 6 }}>
                • {item.food}: {item.suggestedGrams} g (P {item.macrosEstimated.protein}g / C {item.macrosEstimated.carbs}g / G{' '}
                {item.macrosEstimated.fats}g / {item.macrosEstimated.kcal} kcal)
              </Text>
            ))}
          </>
        )}
      </Card>

      <Card>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Novo log diário</Text>
        <FormField control={control} name="weightKg" label="Peso (kg)" keyboardType="numeric" />
        <FormField control={control} name="waistCm" label="Cintura (cm)" keyboardType="numeric" />
        <FormField control={control} name="steps" label="Passos" keyboardType="numeric" />
        <FormField control={control} name="sleepHours" label="Sono (h)" keyboardType="numeric" />
        <FormField control={control} name="rpe" label="RPE (1-10)" keyboardType="numeric" />
        <FormField control={control} name="mood" label="Humor (opcional)" />
        <FormField control={control} name="notes" label="Notas" multiline numberOfLines={3} />
        <Pressable style={{ backgroundColor: '#4b5563', borderRadius: 8, padding: 10, marginBottom: 8 }} onPress={addPhoto}>
          <Text style={{ color: '#fff' }}>{photoUri ? 'Foto selecionada' : 'Adicionar foto (opcional)'}</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: '#2563eb', borderRadius: 8, padding: 10 }}
          onPress={handleSubmit(async (values) => {
            await addDailyLog({ ...values, date: new Date().toISOString(), photoUri });
            reset({ rpe: 5 });
            setPhotoUri(undefined);
            reload();
          })}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Salvar</Text>
        </Pressable>
      </Card>

      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Tendência de peso (média móvel 7 dias)</Text>
        <Chart values={movingAverage(logs.map((l) => l.weight_kg).filter(Boolean).reverse())} />
      </Card>
    </ScrollView>
  );
}
