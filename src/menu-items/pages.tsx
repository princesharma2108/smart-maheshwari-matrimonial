// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Book1, I24Support, Security, MessageProgramming, DollarSquare, Airplane } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  page: Book1,
  authentication: Security,
  maintenance: MessageProgramming,
  pricing: DollarSquare,
  contactus: I24Support,
  landing: Airplane
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id=" " />,
  type: 'group',
  icon: icons.page,
  children: [
    {
      id: 'maintenance',
      title: <FormattedMessage id="maintenance" />,
      type: 'collapse',
      icon: icons.maintenance,
      isDropdown: true,
      children: [
        {
          id: 'error-404',
          title: <FormattedMessage id="error-404" />,
          type: 'item',
          url: '/maintenance/404',
          target: true
        },
        {
          id: 'error-500',
          title: <FormattedMessage id="error-500" />,
          type: 'item',
          url: '/maintenance/500',
          target: true
        }
        // {
        //   id: 'coming-soon-collapse',
        //   title: <FormattedMessage id="coming-soon" />,
        //   type: 'collapse',
        //   children: [
        //     {
        //       id: 'coming-soon-1',
        //       title: (
        //         <>
        //           <FormattedMessage id="coming-soon" /> 1
        //         </>
        //       ),
        //       type: 'item',
        //       url: '/maintenance/coming-soon',
        //       target: true
        //     },
        //     {
        //       id: 'coming-soon-2',
        //       title: (
        //         <>
        //           <FormattedMessage id="coming-soon" /> 2
        //         </>
        //       ),
        //       type: 'item',
        //       url: '/maintenance/coming-soon2',
        //       target: true
        //     }
        //   ]
        // },
        // {
        //   id: 'under-construction-collapse',
        //   title: <FormattedMessage id="under-construction" />,
        //   type: 'collapse',
        //   children: [
        //     {
        //       id: 'under-construction-1',
        //       title: (
        //         <>
        //           <FormattedMessage id="under-construction" /> 1
        //         </>
        //       ),
        //       type: 'item',
        //       url: '/maintenance/under-construction',
        //       target: true
        //     },
        //     {
        //       id: 'under-construction-2',
        //       title: (
        //         <>
        //           <FormattedMessage id="under-construction" /> 2
        //         </>
        //       ),
        //       type: 'item',
        //       url: '/maintenance/under-construction2',
        //       target: true
        //     }
        //   ]
        // }
      ]
    },
    {
      id: 'contact-us',
      title: <FormattedMessage id="contact-us" />,
      type: 'item',
      url: '/contact-us',
      icon: icons.contactus,
      target: true
    }
  ]
};

export default pages;
