import { REGEXP_ONLY_DIGITS } from 'input-otp'

import {
  InputOTP as InputOTPRoot,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

interface InputOTPProps {
  value: string | undefined
  onChange: (value: string) => void
}

export function InputOTP({ value, onChange }: InputOTPProps) {
  return (
    <InputOTPRoot
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      value={value}
      onChange={onChange}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTPRoot>
  )
}
