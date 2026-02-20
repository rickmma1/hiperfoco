import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text } from 'react-native';
import { z } from 'zod';
import { Card } from '@/components/Card';
import { FormField } from '@/components/FormField';
import { WarningBanner } from '@/components/WarningBanner';
import { getProfile, saveProfile } from '@/services/profileService';

const schema = z.object({
  heightCm: z.coerce.number().min(100),
  weightKg: z.coerce.number().min(30),
  age: z.coerce.number().optional(),
  sex: z.enum(['masculino', 'feminino']).optional(),
  bodyFat: z.coerce.number().optional(),
  activityLevel: z.enum(['sedentario', 'leve', 'moderado', 'alto', 'atleta']),
  trainingDays: z.coerce.number().min(0).max(7),
  goal: z.enum(['perder gordura', 'manter', 'ganhar massa', 'performance']),
  restingHr: z.coerce.number().optional(),
  waistCm: z.coerce.number().optional(),
  baselineBp: z.string().optional()
});

export default function ProfileScreen() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { activityLevel: 'sedentario', trainingDays: 3, goal: 'manter' }
  });

  useEffect(() => {
    getProfile().then((p) => {
      if (!p) return;
      reset({
        heightCm: p.height_cm,
        weightKg: p.weight_kg,
        age: p.age,
        sex: p.sex,
        bodyFat: p.body_fat,
        activityLevel: p.activity_level,
        trainingDays: p.training_days,
        goal: p.goal,
        restingHr: p.resting_hr,
        waistCm: p.waist_cm,
        baselineBp: p.baseline_bp
      });
    });
  }, [reset]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner />
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>Perfil</Text>
        <FormField control={control} name="heightCm" label="Altura (cm)" keyboardType="numeric" />
        <FormField control={control} name="weightKg" label="Peso (kg)" keyboardType="numeric" />
        <FormField control={control} name="age" label="Idade (opcional)" keyboardType="numeric" />
        <FormField control={control} name="sex" label="Sexo (masculino/feminino)" />
        <FormField control={control} name="bodyFat" label="% Gordura (opcional)" keyboardType="numeric" />
        <FormField control={control} name="activityLevel" label="Atividade" />
        <FormField control={control} name="trainingDays" label="Dias de treino por semana" keyboardType="numeric" />
        <FormField control={control} name="goal" label="Objetivo" />
        <FormField control={control} name="restingHr" label="FC repouso (opcional)" keyboardType="numeric" />
        <FormField control={control} name="waistCm" label="Cintura (opcional)" keyboardType="numeric" />
        <FormField control={control} name="baselineBp" label="PA baseline (opcional)" />

        <Pressable
          style={{ backgroundColor: '#2563eb', borderRadius: 8, padding: 10, marginTop: 8 }}
          onPress={handleSubmit(async (data) => {
            await saveProfile(data as any);
          })}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Salvar perfil</Text>
        </Pressable>
      </Card>
      <Card>
        <Link href="/(tabs)/substances" style={{ color: '#93c5fd' }}>
          Ir para Substâncias & Medicações
        </Link>
        <Link href="/(tabs)/export" style={{ color: '#93c5fd', marginTop: 8 }}>
          Ir para Preparação/Exportação
        </Link>
      </Card>
    </ScrollView>
  );
}
