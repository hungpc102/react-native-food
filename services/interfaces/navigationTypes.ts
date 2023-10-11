import { StackNavigationProp } from '@react-navigation/stack';

// Bạn có thể định nghĩa kiểu trực tiếp trong props nếu cần
type Props = {
  navigation: StackNavigationProp<any, 'any'>;
};

export  {Props}


export interface CategoryStyles {
  [category: string]: object;
}