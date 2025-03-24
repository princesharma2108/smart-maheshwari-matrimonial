// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import { handlerCustomerDialog } from 'api/customer';
import { NavActionType } from 'config';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SupportIcon from '@mui/icons-material/Support';
import InfoIcon from '@mui/icons-material/Info';
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
  TrendUp,
  FilterSearch
} from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';
import LatestMatches from 'pages/apps/latestMatches/latestMatches';
import AdvancedSearch from 'pages/apps/advancedSearch/advancedSearch';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SubscriptionPlan from 'pages/apps/subscriptionPlan/subscriptionPlan';
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
  latestMatches: TrendUp,
  advancedSearch: FilterSearch,
  appFeedback: FeedbackIcon,
  contactSupport: SupportIcon,
  aboutUs: InfoIcon,
  subscriptionPlan: CardMembershipIcon
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id=" " />,
  icon: icons.applications,
  type: 'group',
  children: [
    // {
    //   id: 'latestMatches',
    //   title: <FormattedMessage id="Latest Matches" />,
    //   type: 'item',
    //   icon: icons.latestMatches,
    //   url: '/apps/latestMatches/latestMatches',
    //   breadcrumbs: true
    // },
    {
      id: 'advancedSearch',
      title: <FormattedMessage id="Advanced Search" />,
      type: 'item',
      icon: icons.advancedSearch,
      url: '/apps/advancedSearch/advancedSearch',
      breadcrumbs: true
    },
    {
      id: 'editProfile',
      title: <FormattedMessage id="Edit Profile" />,
      type: 'item',
      icon: icons.profile,
      url: '/apps/editProfile/editProfile/personalDetailsEdit',
      //link: '/apps/profiles/account/:tab',
      breadcrumbs: false
    },
    // {
    //   id: 'appFeedback',
    //   title: <FormattedMessage id="App Feedback" />,
    //   type: 'item',
    //   icon: icons.appFeedback,
    //   url: '/apps/appFeedback/appFeedback',
    //   breadcrumbs: true
    // },
    {
      id: 'subscriptionPlan',
      title: <FormattedMessage id="Subscription Plan" />,
      type: 'item',
      icon: icons.subscriptionPlan,
      url: '/apps/subscriptionPlan/subscriptionPlan',
      breadcrumbs: true
    },
    {
      id: 'aboutUs',
      title: <FormattedMessage id="About us" />,
      type: 'item',
      icon: icons.aboutUs,
      url: '/apps/aboutUs/aboutUs',
      breadcrumbs: true
    }
    // {
    //   id: 'contactSupport',
    //   title: <FormattedMessage id="Contact Support" />,
    //   type: 'item',
    //   icon: icons.contactSupport,
    //   url: '/apps/contactSupport/contactSupport',
    //   breadcrumbs: true
    // }
  ]
};

export default applications;
