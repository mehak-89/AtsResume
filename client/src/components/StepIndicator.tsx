interface StepIndicatorProps {
  currentStep: number;
  steps: { id: number; label: string }[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <>
            <div className="flex flex-col items-center" key={step.id}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                } font-semibold`}
              >
                {step.id}
              </div>
              <span className="text-xs mt-2 font-medium">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-1 flex-grow mx-2 bg-gray-200 relative">
                <div
                  className="absolute inset-0 bg-primary"
                  style={{
                    width: currentStep > step.id ? "100%" : currentStep === step.id ? "50%" : "0%",
                  }}
                ></div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
