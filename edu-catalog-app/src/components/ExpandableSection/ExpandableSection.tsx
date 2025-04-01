import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Toggler from '@/components/Toggler/Toggler'; // Assuming you have a Toggler component

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    } else if (contentRef.current) {
      contentRef.current.style.height = '-40px';
    }
  }, [isOpen]);

  return (
    <div className="card bg-base-300 shadow-xl w-full">
      {/* This will toggle the content when clicked */}
      <div className="card-body cursor-pointer" onClick={toggleDropdown}>
        <h2 className={clsx('card-title text-lg font-bold flex justify-between', { 'text-primary': isOpen })}>
          {title}
          <Toggler toggled={isOpen} />
        </h2>
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ height: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        // Prevent toggling when clicking inside the content area
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-4 px-10 pb-10">{children}</div>
      </div>
    </div>
  );
};

export default ExpandableSection;
