import React from 'react';
import {
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Switch,
} from '@chakra-ui/react';

const DynamicForm = ({
  config = {},
  values = {},
  onChange,
  onSave,
  onCancel,
  saveText = '保存',
  cancelText = '取消',
}) => {
  const handleChange = (key, value) => {
    onChange?.({ ...values, [key]: value });
  };

  const renderField = (key, defaultValue) => {
    const currentValue = values[key] ?? defaultValue;

    if (typeof defaultValue === 'boolean') {
      return (
        <FormControl key={key} display="flex" alignItems="center">
          <FormLabel mb="0" flex="1">{key}</FormLabel>
          <Switch
            isChecked={currentValue}
            onChange={(e) => handleChange(key, e.target.checked)}
          />
        </FormControl>
      );
    }

    if (typeof defaultValue === 'number') {
      return (
        <FormControl key={key}>
          <FormLabel>{key}</FormLabel>
          <Input
            type="number"
            value={currentValue || ''}
            onChange={(e) => handleChange(key, Number(e.target.value))}
            placeholder={`输入 ${key}`}
          />
        </FormControl>
      );
    }

    if (typeof defaultValue === 'string') {
      const isLongText = defaultValue.length > 100;
      const InputComponent = isLongText ? Textarea : Input;
      
      return (
        <FormControl key={key}>
          <FormLabel>{key}</FormLabel>
          <InputComponent
            value={currentValue || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={`输入 ${key}`}
            rows={isLongText ? 3 : undefined}
          />
        </FormControl>
      );
    }

    return null;
  };

  return (
    <VStack spacing={4}>
      {Object.entries(config).map(([key, defaultValue]) => 
        renderField(key, defaultValue)
      )}
      
      <HStack spacing={3} width="100%" justify="flex-end">
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button colorScheme="blue" onClick={onSave}>
          {saveText}
        </Button>
      </HStack>
    </VStack>
  );
};

export default DynamicForm;