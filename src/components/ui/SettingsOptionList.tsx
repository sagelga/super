"use client";

import React, { ReactNode } from "react";
import "./SettingsOptionList.style.css";

export interface SettingsOption {
  id: string;
  label: string;
  description?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface SettingsOptionListProps {
  options: SettingsOption[];
  ariaLabel?: string;
}

const SettingsOptionList: React.FC<SettingsOptionListProps> = ({
  options,
  ariaLabel,
}) => {
  return (
    <div className="settings-option-list" role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.id}
          className={`settings-option ${option.isActive ? "active" : ""} ${
            option.disabled ? "disabled" : ""
          }`}
          onClick={option.onClick}
          disabled={option.disabled}
          aria-pressed={option.isActive}
        >
          {option.leading && (
            <span className="settings-option-leading">{option.leading}</span>
          )}
          {option.description ? (
            <span className="settings-option-content">
              <span className="settings-option-label">{option.label}</span>
              <span className="settings-option-description">
                {option.description}
              </span>
            </span>
          ) : (
            <span className="settings-option-label">{option.label}</span>
          )}
          {option.trailing && (
            <span className="settings-option-trailing">
              {option.trailing}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SettingsOptionList;
