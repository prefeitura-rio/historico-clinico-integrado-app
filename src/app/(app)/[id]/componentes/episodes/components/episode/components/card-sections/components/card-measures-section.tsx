import { useMemo } from 'react'

import type { Encounter } from '@/models/entities'

interface CardSectionProps {
  measures: Encounter['measures']
}

export function CardMeasuresSection({ measures }: CardSectionProps) {
  const data = useMemo(
    () => ({
      Altura: {
        value: measures?.height,
        unit: 'cm',
      },
      Peso: {
        value: measures?.weight,
        unit: 'kg',
      },
      IMC: {
        value: measures?.bmi,
        unit: 'kg/m²',
      },
      'Circunferência abdominal': {
        value: measures?.abdominal_circumference,
        unit: 'cm',
      },
      Temperatura: {
        value: measures?.temperature,
        unit: '°C',
      },
      'Frequência cardíaca': {
        value: measures?.heart_rate,
        unit: 'bpm',
      },
      'Ritmo de Pulso': {
        value: measures?.pulse_rate,
        unit: null,
      },
      'Frequência respiratória': {
        value: measures?.respiratory_rate,
        unit: 'rpm',
      },
      'Hemoglobina glicada': {
        value: measures?.glycated_hemoglobin,
        unit: '%',
      },
      Glicemia: {
        value: measures?.blood_glucose,
        unit: 'mg/dL',
      },
      'Pressão Sistólica': {
        value: measures?.systolic_pressure,
        unit: 'mmHg',
      },
      'Pressão Diastólica': {
        value: measures?.diastolic_pressure,
        unit: 'mmHg',
      },
      'Saturação de Oxigênio': {
        value: measures?.oxygen_saturation,
        unit: '%',
      },
    }),
    [measures],
  )

  return (
    <div
      className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-sm font-medium text-typography-dark-blue">
        Parâmetros Biométricos
      </p>
      {Object.values(data).every((item) => !item.value) ? (
        <span className="text-sm text-typography-blue-gray-200">
          Não há registro de informações
        </span>
      ) : (
        <div className="grid grid-cols-4">
          {Object.entries(data).map(([key, item], index) =>
            item.value ? (
              <p key={index} className="text-sm text-typography-blue-gray-200">
                {key}:{' '}
                <span>
                  {item.value} {item.unit}
                </span>
              </p>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}
