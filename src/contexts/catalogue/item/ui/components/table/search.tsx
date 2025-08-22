"use client";

import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { Input } from "@/contexts/shared/ui/components/shadcn/input";
import { useDebounce } from "@uidotdev/usehooks";
import { Search, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

const ProductSearch = () => {
  const [query, setQuery] = useQueryState("query", parseAsString.withDefault(""));
  const [term, setTerm] = useState<string | null>(query);
  const debouncedQuery = useDebounce(term, 1000);
  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);
  return (
    <div className="relative ">
      <Search className="absolute left-2 top-3 text-muted-foreground size-4" />
      <Input
        className="h-10 pl-8 rounded-xl focus-visible:ring-0"
        placeholder="Search file"
        value={term || ""}
        onChange={(e) => setTerm(e.target.value)}
      />
      {term && (
        <Button
          className="w-6 h-6 absolute right-2 top-2 p-0"
          variant={"ghost"}
          onClick={() => setTerm(null)}
        >
          <X />
        </Button>
      )}
    </div>
  );
};

export default ProductSearch;
