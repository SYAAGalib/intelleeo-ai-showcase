import { useState, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  onAddNew?: (newItem: string) => void;
}

export const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select items...',
  onAddNew,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);
  const [newItem, setNewItem] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setShowAddNew(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  const removeValue = (option: string) => {
    onChange(value.filter((v) => v !== option));
  };

  const handleAddNew = () => {
    if (newItem.trim() && onAddNew) {
      onAddNew(newItem.trim());
      onChange([...value, newItem.trim()]);
      setNewItem('');
      setShowAddNew(false);
      setSearchTerm('');
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={cn(
          'flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer',
          open && 'ring-2 ring-ring ring-offset-2'
        )}
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            value.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  removeValue(item);
                }}
              >
                {item}
                <X className="h-3 w-3" />
              </Badge>
            ))
          )}
        </div>
        <ChevronsUpDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
      </div>

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-popover border rounded-md shadow-md max-h-60 overflow-auto">
          <div className="p-2 border-b sticky top-0 bg-popover">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="p-1">
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded hover:bg-accent',
                  value.includes(option) && 'bg-accent'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option);
                }}
              >
                <div
                  className={cn(
                    'h-4 w-4 border rounded flex items-center justify-center',
                    value.includes(option) && 'bg-primary border-primary'
                  )}
                >
                  {value.includes(option) && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <span className="text-sm">{option}</span>
              </div>
            ))}
            {filteredOptions.length === 0 && !showAddNew && (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No items found
              </div>
            )}
          </div>
          {onAddNew && (
            <div className="p-2 border-t bg-popover">
              {showAddNew ? (
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <Input
                    placeholder="Enter new item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNew();
                      }
                    }}
                    className="h-8"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleAddNew} className="h-8 px-2">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddNew(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add new item
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
