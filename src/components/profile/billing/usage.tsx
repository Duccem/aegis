import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PLAN_DATA = {
  free: {
    ai_completions: {
      limit: 10000,
      disabled: false,
      unlimited: false,
    },
    organization_members: {
      limit: 5,
      disabled: false,
      unlimited: false,
    },
    products_created: {
      limit: 50,
      disabled: false,
      unlimited: false,
    },
    invoice_sent: {
      limit: 50,
      disabled: false,
      unlimited: false,
    },
  },
  pro: {
    ai_completions: {
      limit: 100000,
      disabled: false,
      unlimited: true,
    },
    organization_members: {
      limit: 20,
      disabled: false,
      unlimited: false,
    },
    products_created: {
      limit: 500,
      disabled: false,
      unlimited: false,
    },
    invoice_sent: {
      limit: 1000,
      disabled: false,
      unlimited: false,
    },
  },
} as const;

interface UsageItemProps {
  label: string;
  current: number;
  max: number;
  unit?: string;
  period?: string;
  percentage?: number;
  unlimited?: boolean;
  disabled?: boolean;
}

function CircularProgress({ value }: { value: number }) {
  return (
    <div className="relative h-6 w-6 flex items-center justify-center">
      <svg className="h-6 w-6" viewBox="0 0 36 36">
        {/* Background circle */}
        <circle className="stroke-muted fill-none" cx="18" cy="18" r="16" strokeWidth="4" />
        {/* Progress circle */}
        <circle
          className="stroke-primary fill-none"
          cx="18"
          cy="18"
          r="16"
          strokeWidth="4"
          strokeDasharray={`${value * 0.01 * 100.53} 100.53`}
          strokeDashoffset="0"
          transform="rotate(-90 18 18)"
        />
      </svg>
    </div>
  );
}

function UsageItem({
  label,
  current,
  max,
  unit,
  period,
  percentage,
  unlimited,
  disabled,
}: UsageItemProps) {
  // Calculate percentage if not explicitly provided
  const calculatedPercentage =
    percentage !== undefined ? percentage : Math.min((current / max) * 100, 100);

  // Format values differently based on whether we have a unit or not
  let formattedCurrent: string;
  let formattedMax: string;

  if (unit) {
    // For values with units (like GB), show the decimal value
    formattedCurrent = current.toFixed(1).replace(/\.0$/, "");
    formattedMax = max.toFixed(1).replace(/\.0$/, "");
  } else {
    // For counts without units, use k formatting for large numbers
    formattedCurrent = current >= 1000 ? `${(current / 1000).toFixed(1)}k` : current.toString();

    if (max >= 1000000) {
      // If max is large, format it as well
      formattedMax = `${(max / 1000000).toFixed(0)}M`;
    } else if (max >= 1000) {
      formattedMax = `${(max / 1000).toFixed(0)}k`;
      // If max is very large, format it as millions
    } else {
      formattedMax = max.toString();
    }
  }

  return (
    <div className="flex items-center justify-between py-3 px-4">
      <div className="flex items-center gap-4">
        <CircularProgress value={disabled ? 0 : unlimited ? 0 : calculatedPercentage} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {unlimited && !disabled && <span className="text-sm text-muted-foreground">Ilimitados</span>}
      {!unlimited && !disabled && (
        <div className="text-sm text-muted-foreground">
          {formattedCurrent} / {formattedMax} {unit} {period && <span>per {period}</span>}
        </div>
      )}
      {disabled && (
        <div className="text-sm text-muted-foreground">
          <span className="line-through">
            {formattedCurrent} / {formattedMax} {unit}
          </span>{" "}
          (Mejora tu plan para desbloquear)
        </div>
      )}
    </div>
  );
}

export function Usage({
  meters,
  plan,
}: {
  plan: string;
  meters: {
    organizationMembers?: number;
    aiCompletions?: number;
    productsCreated?: number;
    invoiceSent?: number;
  };
}) {
  //const data = getPlanData(meters, plan);
  const planData = PLAN_DATA[plan as keyof typeof PLAN_DATA];
  return (
    <div>
      <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Usage</h2>
      <Card className="divide-y rounded-none bg-transparent">
        <UsageItem
          label="AI completions"
          current={meters.aiCompletions || 0}
          max={planData.ai_completions.limit}
          disabled={planData.ai_completions.disabled}
          unlimited={planData.ai_completions.unlimited}
          period="month"
        />
        <UsageItem
          label="Invoices sent"
          current={meters.invoiceSent || 0}
          max={planData.invoice_sent.limit}
          disabled={planData.invoice_sent.disabled}
          unlimited={planData.invoice_sent.unlimited}
          period="month"
        />
        <UsageItem
          label="Products"
          current={meters.productsCreated || 0}
          max={planData.products_created.limit}
          disabled={planData.products_created.disabled}
          unlimited={planData.products_created.unlimited}
        />
        <UsageItem
          label="Organization members"
          current={meters.organizationMembers || 0}
          max={planData.organization_members.limit}
          disabled={planData.organization_members.disabled}
          unlimited={planData.organization_members.unlimited}
        />
      </Card>
    </div>
  );
}

export function UsageSkeleton() {
  // Define labels to use for keys instead of array indices
  const skeletonItems = [
    "users",
    "connections",
    // "storage",
    "inbox",
    "invoices",
  ];

  return (
    <div>
      <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Usage</h2>

      <Card className="divide-y rounded-none">
        {skeletonItems.map((item) => (
          <div key={item} className="flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </Card>
    </div>
  );
}
