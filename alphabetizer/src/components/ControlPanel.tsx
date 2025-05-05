import React from 'react';
import OptionGroup from './OptionGroup';
import ToggleButton from './ToggleButton';
import Select from './Select';
import Checkbox from './Checkbox';
import { SortOrder, SortType, SeparatorType, FormatType, TextProcessingOptions } from '../utils/textProcessor';

interface ControlPanelProps {
  options: TextProcessingOptions;
  onChange: (options: Partial<TextProcessingOptions>) => void;
  onProcess: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ options, onChange, onProcess }) => {
  const sortTypeOptions = [
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'length', label: 'By Length' },
    { value: 'random', label: 'Random' },
  ];

  const separatorOptions = [
    { value: 'newline', label: 'New Line' },
    { value: 'comma', label: 'Comma' },
    { value: 'space', label: 'Space' },
    { value: 'tab', label: 'Tab' },
    { value: 'custom', label: 'Custom' },
  ];

  const formatOptions = [
    { value: 'none', label: 'None' },
    { value: 'number', label: 'Numbered List' },
    { value: 'bullet', label: 'Bullet Points' },
    { value: 'custom', label: 'Custom Prefix' },
  ];

  return (
    <div className="bg-white rounded-md border border-gray-300 p-4 mb-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Options</h2>
      
      <OptionGroup title="Sort Direction">
        <ToggleButton
          label="A → Z"
          isActive={options.sortOrder === 'asc'}
          onClick={() => onChange({ sortOrder: 'asc' })}
        />
        <ToggleButton
          label="Z → A"
          isActive={options.sortOrder === 'desc'}
          onClick={() => onChange({ sortOrder: 'desc' })}
        />
      </OptionGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Sort Type"
          options={sortTypeOptions}
          value={options.sortType}
          onChange={(value) => onChange({ sortType: value as SortType })}
        />

        <Select
          label="Format Output"
          options={formatOptions}
          value={options.formatType}
          onChange={(value) => onChange({ formatType: value as FormatType })}
        />
      </div>

      {options.formatType === 'custom' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Prefix
          </label>
          <input
            type="text"
            value={options.customPrefix}
            onChange={(e) => onChange({ customPrefix: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter custom prefix..."
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Select
          label="Input Separator"
          options={separatorOptions}
          value={options.inputSeparator}
          onChange={(value) => onChange({ inputSeparator: value as SeparatorType })}
        />

        <Select
          label="Output Separator"
          options={separatorOptions}
          value={options.outputSeparator}
          onChange={(value) => onChange({ outputSeparator: value as SeparatorType })}
        />
      </div>

      {options.inputSeparator === 'custom' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Input Separator
          </label>
          <input
            type="text"
            value={options.customInputSeparator}
            onChange={(e) => onChange({ customInputSeparator: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter custom separator..."
          />
        </div>
      )}

      {options.outputSeparator === 'custom' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Output Separator
          </label>
          <input
            type="text"
            value={options.customOutputSeparator}
            onChange={(e) => onChange({ customOutputSeparator: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter custom separator..."
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-6">
        <Checkbox
          label="Case Sensitive"
          checked={options.caseSensitive}
          onChange={(checked) => onChange({ caseSensitive: checked })}
        />
        <Checkbox
          label="Remove Duplicates"
          checked={options.removeDuplicates}
          onChange={(checked) => onChange({ removeDuplicates: checked })}
        />
        <Checkbox
          label="Trim Lines"
          checked={options.trimLines}
          onChange={(checked) => onChange({ trimLines: checked })}
        />
        <Checkbox
          label="Remove Empty Lines"
          checked={options.removeEmptyLines}
          onChange={(checked) => onChange({ removeEmptyLines: checked })}
        />
        <Checkbox
          label="Ignore Punctuation"
          checked={options.ignorePunctuation}
          onChange={(checked) => onChange({ ignorePunctuation: checked })}
        />
        <Checkbox
          label="Ignore 'A', 'An', 'The'"
          checked={options.ignoreLeadingArticles}
          onChange={(checked) => onChange({ ignoreLeadingArticles: checked })}
        />
      </div>

      <div className="mt-6">
        <button
          onClick={onProcess}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Process Text
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;