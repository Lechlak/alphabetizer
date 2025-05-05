export type SortOrder = 'asc' | 'desc';
export type SortType = 'alphabetical' | 'length' | 'random';
export type SeparatorType = 'newline' | 'comma' | 'space' | 'tab' | 'custom';
export type FormatType = 'none' | 'number' | 'bullet' | 'custom';

export interface TextProcessingOptions {
  sortOrder: SortOrder;
  sortType: SortType;
  caseSensitive: boolean;
  removeDuplicates: boolean;
  trimLines: boolean;
  ignorePunctuation: boolean;
  ignoreLeadingArticles: boolean;
  removeEmptyLines: boolean;
  reverseLines: boolean;
  inputSeparator: SeparatorType;
  outputSeparator: SeparatorType;
  customInputSeparator: string;
  customOutputSeparator: string;
  formatType: FormatType;
  customPrefix: string;
}

const defaultOptions: TextProcessingOptions = {
  sortOrder: 'asc',
  sortType: 'alphabetical',
  caseSensitive: false,
  removeDuplicates: false,
  trimLines: true,
  ignorePunctuation: false,
  ignoreLeadingArticles: false,
  removeEmptyLines: true,
  reverseLines: false,
  inputSeparator: 'newline',
  outputSeparator: 'newline',
  customInputSeparator: ',',
  customOutputSeparator: ',',
  formatType: 'none',
  customPrefix: '',
};

const getSeparator = (type: SeparatorType, customSeparator: string): string => {
  switch (type) {
    case 'newline':
      return '\n';
    case 'comma':
      return ',';
    case 'space':
      return ' ';
    case 'tab':
      return '\t';
    case 'custom':
      return customSeparator;
    default:
      return '\n';
  }
};

const sortText = (lines: string[], options: TextProcessingOptions): string[] => {
  let result = [...lines];

  if (options.sortType === 'random') {
    return result.sort(() => Math.random() - 0.5);
  }

  if (options.sortType === 'length') {
    result.sort((a, b) => a.length - b.length);
  } else {
    // Default to alphabetical
    result.sort((a, b) => {
      let textA = a;
      let textB = b;

      if (!options.caseSensitive) {
        textA = textA.toLowerCase();
        textB = textB.toLowerCase();
      }

      if (options.ignoreLeadingArticles) {
        // Remove leading "a", "an", "the" for sorting
        textA = textA.replace(/^(a|an|the)\s+/i, '');
        textB = textB.replace(/^(a|an|the)\s+/i, '');
      }

      if (options.ignorePunctuation) {
        // Remove punctuation for sorting
        textA = textA.replace(/[^\w\s]/g, '');
        textB = textB.replace(/[^\w\s]/g, '');
      }

      return textA.localeCompare(textB);
    });
  }

  if (options.sortOrder === 'desc') {
    result.reverse();
  }

  return result;
};

const formatLines = (lines: string[], options: TextProcessingOptions): string[] => {
  return lines.map((line, index) => {
    switch (options.formatType) {
      case 'number':
        return `${index + 1}. ${line}`;
      case 'bullet':
        return `• ${line}`;
      case 'custom':
        return `${options.customPrefix}${line}`;
      default:
        return line;
    }
  });
};

export const processText = (text: string, options: TextProcessingOptions = defaultOptions): string => {
  if (!text) return '';

  // Split text based on input separator
  const separator = getSeparator(options.inputSeparator, options.customInputSeparator);
  let lines = text.split(separator);

  // Process lines
  if (options.trimLines) {
    lines = lines.map(line => line.trim());
  }

  if (options.removeEmptyLines) {
    lines = lines.filter(line => line.length > 0);
  }

  // Sort lines
  lines = sortText(lines, options);

  // Remove duplicates if needed
  if (options.removeDuplicates) {
    const seen = new Set<string>();
    lines = lines.filter(line => {
      const item = options.caseSensitive ? line : line.toLowerCase();
      if (seen.has(item)) {
        return false;
      }
      seen.add(item);
      return true;
    });
  }

  // Reverse lines if needed (after sorting and removing duplicates)
  if (options.reverseLines) {
    lines.reverse();
  }

  // Format lines
  lines = formatLines(lines, options);

  // Join with output separator
  const outputSeparator = getSeparator(options.outputSeparator, options.customOutputSeparator);
  return lines.join(outputSeparator);
};

export { defaultOptions };