import { useEffect, useRef, type InputHTMLAttributes } from "react";
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> { indeterminate?: boolean }
export function Checkbox({ indeterminate, ...props }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = Boolean(indeterminate); }, [indeterminate]);
  return <input {...props} ref={ref} type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-gray-900" />;
}
