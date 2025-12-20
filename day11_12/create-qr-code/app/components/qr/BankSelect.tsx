"use client";

import { BANKS } from "../../lib/banks";

interface BankSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function BankSelect({ value, onChange }: BankSelectProps) {
    return (
        <div className="mb-4">
            <label
                htmlFor="bank-select"
                className="block text-sm font-medium text-[#a1a1aa] mb-2"
            >
                Ngân hàng <span className="text-[#0ea5e9]">*</span>
            </label>
            <select
                id="bank-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full rounded-lg bg-[#27272a] border border-[#3f3f46] text-white focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-colors text-sm p-3 appearance-none cursor-pointer"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2371717a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                }}
            >
                <option value="" className="bg-[#18181b]">-- Chọn ngân hàng --</option>
                {BANKS.map((bank) => (
                    <option key={bank.id} value={bank.bin} className="bg-[#18181b]">
                        {bank.shortName} - {bank.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
