'use client';

import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import MobileItem from './MobileItem';

const MobileSidebar = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((routeItem) => (
        <MobileItem
          key={routeItem.label}
          href={routeItem.href}
          icon={routeItem.icon}
          active={routeItem.active}
          onClick={routeItem.onClick}
        />
      ))}
    </div>
  );
};
export default MobileSidebar;
