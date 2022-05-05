import React from 'react';

import {
  FieldConfigEditorBuilder,
  FieldOverrideEditorProps,
  FieldType,
  identityOverrideProcessor,
} from '@grafana/data';
import { GraphFieldConfig, StackingConfig, StackingMode } from '@grafana/schema';

// import { HorizontalGroup, RadioButtonGroup, Input, Tooltip, IconButton, graphFieldOptions } from 'src';

import { RadioButtonGroup } from '../../components/Forms/RadioButtonGroup/RadioButtonGroup';
import { IconButton } from '../../components/IconButton/IconButton';
import { Input } from '../../components/Input/Input';
import { HorizontalGroup } from '../../components/Layout/Layout';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { graphFieldOptions } from '../../components/uPlot/config';

export const StackingEditor: React.FC<FieldOverrideEditorProps<StackingConfig, any>> = ({
  value,
  context,
  onChange,
  item,
}) => {
  return (
    <HorizontalGroup>
      <RadioButtonGroup
        value={value?.mode || StackingMode.None}
        options={item.settings.options}
        onChange={(v) => {
          onChange({
            ...value,
            mode: v,
          });
        }}
      />
      {context.isOverride && value?.mode && value?.mode !== StackingMode.None && (
        <Input
          type="text"
          placeholder="Group"
          suffix={
            <Tooltip content="Name of the stacking group" placement="top">
              <IconButton name="question-circle" />
            </Tooltip>
          }
          defaultValue={value?.group}
          onChange={(v) => {
            onChange({
              ...value,
              group: v.currentTarget.value.trim(),
            });
          }}
        />
      )}
    </HorizontalGroup>
  );
};

export function addStackingConfig(
  builder: FieldConfigEditorBuilder<GraphFieldConfig>,
  defaultConfig?: StackingConfig,
  category = ['Graph styles']
) {
  builder.addCustomEditor({
    id: 'stacking',
    path: 'stacking',
    name: 'Stack series',
    category: category,
    defaultValue: defaultConfig,
    editor: StackingEditor,
    override: StackingEditor,
    settings: {
      options: graphFieldOptions.stacking,
    },
    process: identityOverrideProcessor,
    shouldApply: (f) => f.type === FieldType.number,
  });
}
