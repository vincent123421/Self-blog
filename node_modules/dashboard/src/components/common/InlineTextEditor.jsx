import React, { useState, useRef, useEffect } from 'react';
import { Text as ChakraText, Input, Textarea } from '@chakra-ui/react';

const InlineTextEditor = ({
  value,
  onChange,
  placeholder = '点击编辑',
  multiline = false,
  textProps = {},
  inputProps = {},
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const inputRef = useRef(null);

  const startEdit = () => {
    if (disabled) return;
    setIsEditing(true);
    setTempValue(value || '');
  };

  const saveEdit = () => {
    if (tempValue !== value && onChange) {
      onChange(tempValue);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTempValue(value || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    const InputComponent = multiline ? Textarea : Input;
    return (
      <InputComponent
        ref={inputRef}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={saveEdit}
        onKeyDown={handleKeyDown}
        className="no-drag"
        {...inputProps}
      />
    );
  }

  return (
    <ChakraText
      onClick={startEdit}
      cursor={disabled ? 'default' : 'text'}
      _hover={disabled ? {} : { bg: 'gray.100', borderRadius: 'md' }}
      transition="all 0.2s"
      px={2}
      py={1}
      display="inline-block"
      {...textProps}
    >
      {value || placeholder}
    </ChakraText>
  );
};

export default InlineTextEditor;