import { useMemo } from 'react'

import type { Encounter } from '@/models/entities'

interface CardSectionProps {
  measures: Encounter['measures']
}

export function CardMeasuresSection({ measures }: CardSectionProps) {
  const data = useMemo(
    () => ({
      Altura: measures?.height,
      Peso: measures?.weight,
      IMC: measures?.bmi,
      'Circunferência abdominal': measures?.abdominal_circumference,
      Temperatura: measures?.temperature,
      'Frequência cardíaca': measures?.heart_rate,
      'Frequência de Pulso': measures?.pulse_rate,
      'Frequência respiratória': measures?.respiratory_rate,
      'Hemoglobina glicada': measures?.glycated_hemoglobin,
      Glicemia: measures?.blood_glucose,
      'Pressão Sistótica': measures?.systolic_pressure,
      'Pressão Diastólica': measures?.diastolic_pressure,
      'Saturação de Oxigênio': measures?.oxygen_saturation,
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
      {Object.values(data).every((value) => !value) ? (
        <span className="text-sm text-typography-blue-gray-200">
          Não há registro de informações
        </span>
      ) : (
        <div className="grid grid-cols-4">
          {Object.entries(data).map(([key, value], index) =>
            value ? (
              <p key={index} className="text-sm text-typography-blue-gray-200">
                {key}: <span>{value}</span>
              </p>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}
