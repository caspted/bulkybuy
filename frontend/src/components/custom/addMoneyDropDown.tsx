import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AddMoneyDropdownProps {
  onAddMoney: (amount: number) => void;
}

export const AddMoneyDropdown: React.FC<AddMoneyDropdownProps> = ({ onAddMoney }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMoney(amount);
    setAmount(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Add money</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-6 w-48">
        <form onSubmit={handleSubmit} className="p-4">
          <label className="block mb-2">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              min="0"
            />
          </label>
          <Button type="submit">Add</Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
