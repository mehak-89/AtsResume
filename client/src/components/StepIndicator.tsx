interface StepIndicatorProps {
  currentStep: number;
  steps: { id: number; label: string }[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  // Generate step items and connectors separately to avoid using fragments
  const renderStepItems = () => {
    return steps.map((step) => (
      <div className="flex flex-col items-center" key={`step-${step.id}`}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStep >= step.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
          } font-semibold`}
        >
          {step.id}
        </div>
        <span className="text-xs mt-2 font-medium">{step.label}</span>
      </div>
    ));
  };

  const renderConnectors = () => {
    return steps.slice(0, -1).map((step, index) => (
      <div 
        className="h-1 flex-grow mx-2 bg-gray-200 relative" 
        key={`connector-${index}`}
      >
        <div
          className="absolute inset-0 bg-primary"
          style={{
            width: currentStep > step.id ? "100%" : currentStep === step.id ? "50%" : "0%",
          }}
        ></div>
      </div>
    ));
  };

  // Combine steps and connectors in alternating order
  const renderCombinedElements = () => {
    const elements = [];
    const stepItems = renderStepItems();
    const connectors = renderConnectors();

    for (let i = 0; i < stepItems.length; i++) {
      elements.push(stepItems[i]);
      if (i < connectors.length) {
        elements.push(connectors[i]);
      }
    }

    return elements;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {renderCombinedElements()}
      </div>
    </div>
  );
}
