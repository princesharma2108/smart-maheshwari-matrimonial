// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import { handlerCustomerDialog } from 'api/customer';
import { NavActionType } from 'config';

// assets
import {
  Add,
  Link1,
  KyberNetwork,
  Messages2,
  Calendar1,
  Kanban,
  Profile2User,
  Bill,
  UserSquare,
  ShoppingBag,
  TrendUp
} from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';
import LatestMatches from 'pages/apps/latestMatches/latestMatches';

// icons
const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag,
  add: Add,
  link: Link1,
  latestMatches: TrendUp
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id=" " />,
  icon: icons.applications,
  type: 'group',
  children: [
    {
      id: 'latestMatches',
      title: <FormattedMessage id="Latest Matches" />,
      type: 'item',
      icon: icons.latestMatches,
      url: '/apps/latestMatches/latestMatches',
      breadcrumbs: true
    },
    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'item',
      icon: icons.profile,
      url: '/apps/profiles/account/step1',
      link: '/apps/profiles/account/:tab',
      breadcrumbs: false
    }
  ]
};

export default applications;
