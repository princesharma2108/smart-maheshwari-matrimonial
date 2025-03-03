// project-imports
import applications from './applications';
import widget from './widget';
import formsTables from './forms-tables';
import chartsMap from './charts-map';
import pages from './pages';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [widget, applications, formsTables, chartsMap, pages]
};

export default menuItems;
