import { css } from 'styled-components';

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right';

type AlignItems =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end';

export function flexBox(
  jc: JustifyContent = 'center',
  ai: AlignItems = 'center'
) {
  return css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
  `;
}
