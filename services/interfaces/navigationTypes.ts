import { StackNavigationProp } from '@react-navigation/stack';

export type ScreenNavigationProp = StackNavigationProp<any, 'any'>;

 type Props = {
  navigation: ScreenNavigationProp;
};
export {Props}

export interface CategoryStyles {
  [category: string]: object;
}