import React from 'react';

const RadioGroup = ({ value, onValueChange, className, children }) => {
  return (
    <div className={className} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onChange: () => onValueChange(child.props.value)
          });
        }
        return child;
      })}
    </div>
  );
};

const RadioGroupItem = ({ value, id, checked, onChange, className }) => {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2 ${className}`}
    />
  );
};

export { RadioGroup, RadioGroupItem };

