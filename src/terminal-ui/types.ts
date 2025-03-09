export type Styles = {
  borderStyle?: BorderStyle;
  justifyContent?: JustifyContent;
};

export type BorderStyle =
  | 'single'
  | 'double'
  | 'round'
  | 'classic'
  | 'bold'
  | 'singleDouble'
  | 'doubleSingle'
  | 'none';

export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
