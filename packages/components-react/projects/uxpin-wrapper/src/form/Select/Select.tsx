import { DummySelect, DummySelectProps, dummySelectPropsKeys } from '../../dummy/DummySelect';
import { PSelectWrapperProps, SelectWrapper } from '../../lib/components/SelectWrapper/SelectWrapper';
import { partitionProps } from '../../form-utils';

export type SelectProps = PSelectWrapperProps & DummySelectProps;

export const Select = (props: SelectProps): JSX.Element => {
  const [dummySelectProps, wrapperProps] = partitionProps<SelectProps, DummySelectProps>(props, dummySelectPropsKeys);

  return (
    <SelectWrapper {...wrapperProps}>
      <DummySelect {...dummySelectProps} />
    </SelectWrapper>
  );
};
