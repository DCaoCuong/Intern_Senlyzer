"use client";

import { BANKS } from "../lib/banks";

interface BankSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function BankSelect({ value, onChange }: BankSelectProps) {
    return (
        <div className="mb-4">
            <label
                htmlFor="bank-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
                Ngân hàng thụ hưởng <span className="text-red-500">(*)</span>
            </label>
            <select
                id="bank-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white sm:text-sm p-2 border"
            >
                <option value="">-- Chọn ngân hàng nèo--</option>
                {BANKS.map((bank) => (
                    <option key={bank.id} value={bank.bin}>
                        {bank.shortName} - {bank.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
