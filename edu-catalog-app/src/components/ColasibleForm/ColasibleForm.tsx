import React from 'react';
import ExpandableSection from '../ExpandableSection/ExpandableSection';

interface CollapsibleFormProps {
  title: string;
  children: React.ReactNode;
  actionName?: string;
  onSubmit: () => void;
}

const CollapsibleForm: React.FC<CollapsibleFormProps> = ({ title, children, actionName, onSubmit }) => {
  return (
    <ExpandableSection title={title}>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        {children}
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          {actionName || 'Submit'}
        </button>
      </form>
    </ExpandableSection>
  );
};

export default CollapsibleForm;
