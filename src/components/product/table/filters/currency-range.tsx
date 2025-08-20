"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

//TODO - refactor this to a more generic component

type Props = {
  selectAction: (value: number[]) => void;
};

const CurrencyRange = ({ selectAction }: Props) => {
  const [sliderValue, setSliderValue] = useState([0, 10]);
  return (
    <div
      className="flex h-[150px] w-full items-center justify-around px-3 flex-col"
      aria-hidden="true"
    >
      <Slider
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
        min={0}
        max={1000}
        aria-label="Range"
      />
      <Button
        className="w-full text-xs"
        variant="outline"
        disabled={sliderValue[1] === 0}
        onClick={() => {
          if (sliderValue !== undefined) {
            selectAction(sliderValue);
          }
        }}
      >
        {sliderValue[1] === 0 ? (
          "No filter applied"
        ) : (
          <div className="flex justify-center items-center gap-2">
            ${sliderValue[0]} - ${sliderValue[1]}
          </div>
        )}
      </Button>
    </div>
  );
};

export default CurrencyRange;
