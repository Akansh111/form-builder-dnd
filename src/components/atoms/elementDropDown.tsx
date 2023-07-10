import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { memo } from 'react';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';
import { Small } from '../ui/small';

function ElementDropDown({ path }: { path: string }) {
  const removeEntity = useTemplate((s) => s.removeEntity);
  const setSelectedEntity = useTemplate((s) => s.setSelectedEntity);

  const menuItems = [
    {
      label: 'Edit',
      icon: <Edit2 className='w-4 h-4' />,
      onClick: () => {
        setSelectedEntity(path);
      },
    },
    {
      label: 'Remove',
      icon: <Trash2 className='w-4 h-4 text-red-500 ' />,
      onClick: () => removeEntity(path),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='ghost' size='icon'>
          <MoreVertical className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuItems.map((item, index) => {
          return (
            <DropdownMenuItem key={index} onClick={item.onClick} className='cursor-pointer'>
              <Small>
                {item.icon}
                <span>{item.label}</span>
              </Small>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ElementDropDown);
