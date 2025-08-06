'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/forms/FormField';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import {
  Menu,
  Plus,
  Edit,
  Trash2,
  Move,
  ExternalLink,
  Link,
  FileText,
  Users,
  Settings,
  Home,
  Info,
  Phone,
  Briefcase,
  BookOpen,
  Save,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

// Validation schemas
const menuItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().min(1, 'URL is required'),
  target: z.enum(['_self', '_blank']),
  icon: z.string().optional(),
  order: z.number(),
  parentId: z.string().optional(),
  isActive: z.boolean(),
  isVisible: z.boolean(),
});

type MenuItem = z.infer<typeof menuItemSchema> & {
  id: string;
  children?: MenuItem[];
};

interface NavigationManagerProps {
  className?: string;
}

export default function NavigationManager({
  className = '',
}: NavigationManagerProps) {
  const [activeMenu, setActiveMenu] = useState<'main' | 'footer' | 'mobile'>(
    'main'
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      title: 'Home',
      url: '/',
      target: '_self',
      icon: 'Home',
      order: 1,
      isActive: true,
      isVisible: true,
    },
    {
      id: '2',
      title: 'About',
      url: '/about',
      target: '_self',
      icon: 'Info',
      order: 2,
      isActive: true,
      isVisible: true,
      children: [
        {
          id: '2-1',
          title: 'Our Story',
          url: '/about/vision-mission',
          target: '_self',
          icon: 'FileText',
          order: 1,
          parentId: '2',
          isActive: true,
          isVisible: true,
        },
        {
          id: '2-2',
          title: 'Leadership',
          url: '/about/leadership',
          target: '_self',
          icon: 'Users',
          order: 2,
          parentId: '2',
          isActive: true,
          isVisible: true,
        },
      ],
    },
    {
      id: '3',
      title: 'Services',
      url: '/services',
      target: '_self',
      icon: 'Briefcase',
      order: 3,
      isActive: true,
      isVisible: true,
      children: [
        {
          id: '3-1',
          title: 'EPC Services',
          url: '/services/epc',
          target: '_self',
          icon: 'Settings',
          order: 1,
          parentId: '3',
          isActive: true,
          isVisible: true,
        },
        {
          id: '3-2',
          title: 'Operations & Maintenance',
          url: '/services/om',
          target: '_self',
          icon: 'Settings',
          order: 2,
          parentId: '3',
          isActive: true,
          isVisible: true,
        },
      ],
    },
    {
      id: '4',
      title: 'Projects',
      url: '/projects',
      target: '_self',
      icon: 'BookOpen',
      order: 4,
      isActive: true,
      isVisible: true,
    },
    {
      id: '5',
      title: 'Contact',
      url: '/contact',
      target: '_self',
      icon: 'Phone',
      order: 5,
      isActive: true,
      isVisible: true,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      title: '',
      url: '',
      target: '_self',
      icon: '',
      order: 1,
      isActive: true,
      isVisible: true,
    },
  });

  const handleAddItem = () => {
    form.reset();
    setShowAddModal(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      url: item.url,
      target: item.target,
      icon: item.icon || '',
      order: item.order,
      parentId: item.parentId,
      isActive: item.isActive,
      isVisible: item.isVisible,
    });
    setShowEditModal(true);
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMenuItems(prev => {
        const removeItem = (items: MenuItem[]): MenuItem[] => {
          return items.filter(item => {
            if (item.id === itemId) return false;
            if (item.children) {
              item.children = removeItem(item.children);
            }
            return true;
          });
        };
        return removeItem(prev);
      });

      toast.success('Menu item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete menu item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveItem = async (data: z.infer<typeof menuItemSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingItem) {
        // Update existing item
        setMenuItems(prev => {
          const updateItem = (items: MenuItem[]): MenuItem[] => {
            return items.map(item => {
              if (item.id === editingItem.id) {
                return { ...item, ...data };
              }
              if (item.children) {
                item.children = updateItem(item.children);
              }
              return item;
            });
          };
          return updateItem(prev);
        });
        toast.success('Menu item updated successfully');
      } else {
        // Add new item
        const newItem: MenuItem = {
          id: Date.now().toString(),
          ...data,
        };
        setMenuItems(prev => [...prev, newItem]);
        toast.success('Menu item added successfully');
      }

      setShowAddModal(false);
      setShowEditModal(false);
      setEditingItem(null);
    } catch (error) {
      toast.error('Failed to save menu item');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className='border border-gray-200 rounded-lg mb-2'>
        <div
          className={`flex items-center justify-between p-3 ${
            level > 0 ? 'ml-6' : ''
          }`}
        >
          <div className='flex items-center space-x-3'>
            {hasChildren && (
              <button
                onClick={() => toggleExpanded(item.id)}
                className="text-gray-600 hover:text-white"
              >
                {isExpanded ? (
                  <ChevronDown className='w-4 h-4' />
                ) : (
                  <ChevronRight className='w-4 h-4' />
                )}
              </button>
            )}

            <div className='flex items-center space-x-2'>
              {item.icon && (
                <div className="w-4 h-4 text-white">
                  {/* Icon placeholder */}
                  <div className='w-4 h-4 bg-gray-200 rounded'></div>
                </div>
              )}
              <span className="font-medium text-white">{item.title}</span>
              {item.target === '_blank' && (
                <ExternalLink className="w-3 h-3 text-white" />
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-white">
              <span className='bg-gray-100 px-2 py-1 rounded'>{item.url}</span>
              {!item.isVisible && (
                <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs'>
                  Hidden
                </span>
              )}
              {!item.isActive && (
                <span className='bg-red-100 text-red-800 px-2 py-1 rounded text-xs'>
                  Inactive
                </span>
              )}
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleEditItem(item)}
            >
              <Edit className='w-3 h-3' />
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleDeleteItem(item.id)}
              disabled={isLoading}
            >
              <Trash2 className='w-3 h-3' />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className='border-t border-gray-200'>
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const menus = [
    { id: 'main', label: 'Main Navigation', icon: Menu },
    { id: 'footer', label: 'Footer Navigation', icon: Menu },
    { id: 'mobile', label: 'Mobile Navigation', icon: Menu },
  ] as const;

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Navigation Manager
            </h2>
            <p className="text-sm text-white">
              Manage site navigation menus and menu items
            </p>
          </div>
          <Button onClick={handleAddItem}>
            <Plus className='w-4 h-4 mr-2' />
            Add Menu Item
          </Button>
        </div>
      </div>

      {/* Menu Tabs */}
      <div className='border-b border-gray-200'>
        <nav className='flex space-x-8 px-6'>
          {menus.map(menu => {
            const Icon = menu.icon;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenu(menu.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeMenu === menu.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className='w-4 h-4' />
                <span>{menu.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className='p-6'>
        <div className='mb-4'>
          <h3 className="text-lg font-medium text-white">
            {menus.find(m => m.id === activeMenu)?.label}
          </h3>
          <p className="text-sm text-white">
            Drag and drop to reorder menu items. Click the arrow to
            expand/collapse submenus.
          </p>
        </div>

        {/* Menu Items List */}
        <div className='space-y-2'>
          {menuItems.length === 0 ? (
            <div className="text-center py-8 text-white">
              <Menu className="w-12 h-12 mx-auto mb-4 text-white" />
              <p>No menu items found</p>
              <p className='text-sm'>Click "Add Menu Item" to get started</p>
            </div>
          ) : (
            menuItems.map(item => renderMenuItem(item))
          )}
        </div>
      </div>

      {/* Add Menu Item Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title='Add Menu Item'
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSaveItem)}
            className='space-y-4'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                name='title'
                label='Title'
                placeholder='Enter menu item title'
              />
              <FormField name='url' label='URL' placeholder='/page-url' />
              <FormField
                name='target'
                label='Target'
                type='select'
                options={[
                  { value: '_self', label: 'Same Window' },
                  { value: '_blank', label: 'New Window' },
                ]}
              />
              <FormField
                name='icon'
                label='Icon'
                placeholder='Icon name (optional)'
              />
              <FormField name='order' label='Order' type='number' />
            </div>

            <div className='space-y-3'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  {...form.register('isActive')}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label className="ml-2 text-sm text-white">
                  Active - Enable this menu item
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  {...form.register('isVisible')}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label className="ml-2 text-sm text-white">
                  Visible - Show this menu item to users
                </label>
              </div>
            </div>

            <div className='flex justify-end space-x-3'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                <Save className='w-4 h-4 mr-2' />
                {isLoading ? 'Saving...' : 'Add Item'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>

      {/* Edit Menu Item Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title='Edit Menu Item'
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSaveItem)}
            className='space-y-4'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                name='title'
                label='Title'
                placeholder='Enter menu item title'
              />
              <FormField name='url' label='URL' placeholder='/page-url' />
              <FormField
                name='target'
                label='Target'
                type='select'
                options={[
                  { value: '_self', label: 'Same Window' },
                  { value: '_blank', label: 'New Window' },
                ]}
              />
              <FormField
                name='icon'
                label='Icon'
                placeholder='Icon name (optional)'
              />
              <FormField name='order' label='Order' type='number' />
            </div>

            <div className='space-y-3'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  {...form.register('isActive')}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label className="ml-2 text-sm text-white">
                  Active - Enable this menu item
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  {...form.register('isVisible')}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label className="ml-2 text-sm text-white">
                  Visible - Show this menu item to users
                </label>
              </div>
            </div>

            <div className='flex justify-end space-x-3'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                <Save className='w-4 h-4 mr-2' />
                {isLoading ? 'Saving...' : 'Update Item'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
}
