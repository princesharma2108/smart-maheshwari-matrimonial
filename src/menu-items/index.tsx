// project-imports
import applications from './applications';
import widget from './widget';
import pages from './pages';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [applications]
};

export default menuItems;
