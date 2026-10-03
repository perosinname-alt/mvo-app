import { createContext, ReactNode, useContext, useState } from "react";

export type Transaction = {
  id: string;
  label: string;
  amount: number; // positive = money in, negative = money out
  date: string;
};

type WalletContextType = {
  balance: number;
  transactions: Transaction[];
  topUp: (amount: number, method: string) => void;
  withdraw: (amount: number, method: string) => boolean;
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    label: "Dalab — Xalwo Kismaayo",
    amount: -14,
    date: "Maanta, 10:02 AM",
  },
  { id: "2", label: "Ku shub Wallet-ka", amount: 20, date: "Shalay, 4:30 PM" },
  {
    id: "3",
    label: "Abaalmarin Referral",
    amount: 2,
    date: "2 maalmood ka hor",
  },
];

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(25);
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);

  function topUp(amount: number, method: string) {
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        label: `Ku shub — ${method}`,
        amount,
        date: "Hadda",
      },
      ...prev,
    ]);
  }

  function withdraw(amount: number, method: string): boolean {
    if (amount > balance) return false;
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        label: `Ka bixid — ${method}`,
        amount: -amount,
        date: "Hadda",
      },
      ...prev,
    ]);
    return true;
  }

  return (
    <WalletContext.Provider value={{ balance, transactions, topUp, withdraw }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used inside a WalletProvider");
  }
  return context;
}
