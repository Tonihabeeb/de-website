'use client';

import React, { useState, useEffect } from 'react';
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
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useForm as useSimpleForm } from 'react-hook-form';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [menus, setMenus] = useState<{ id: string; name: string }[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);
  const [showDeleteMenuModal, setShowDeleteMenuModal] = useState(false);
  const createMenuForm = useSimpleForm<{ name: string }>({ defaultValues: { name: '' } });

  // Load all menus on mount
  useEffect(() => {
    async function fetchMenus() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/navigation');
        const data = await res.json();
        if (data && data.length > 0) {
          setMenus(data.map((m: any) => ({ id: m.id, name: m.name })));
          setSelectedMenuId(data[0].id);
          setMenuItems(JSON.parse(data[0].items_json));
          setMenuId(data[0].id);
        } else {
          setMenus([]);
          setSelectedMenuId(null);
          setMenuItems([]);
          setMenuId(null);
        }
      } catch (err) {
        setError('Failed to load navigation menus');
        setMenus([]);
        setSelectedMenuId(null);
        setMenuItems([]);
        setMenuId(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);

  // When selectedMenuId changes, load that menu
  useEffect(() => {
    if (!selectedMenuId) return;
    async function fetchMenu() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/navigation/${selectedMenuId}`);
        const data = await res.json();
        if (data && data.items_json) {
          setMenuItems(JSON.parse(data.items_json));
          setMenuId(data.id);
        } else {
          setMenuItems([]);
          setMenuId(selectedMenuId);
        }
      } catch (err) {
        setError('Failed to load navigation menu');
        setMenuItems([]);
        setMenuId(selectedMenuId);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, [selectedMenuId]);

  // Save menu to backend
  async function saveMenuToBackend(items: MenuItem[]) {
    if (!menuId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/navigation/${menuId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items_json: JSON.stringify(items) }),
      });
      if (!res.ok) throw new Error('Failed to save menu');
      toast.success('Navigation menu saved');
    } catch (err) {
      setError('Failed to save navigation menu');
      toast.error('Failed to save navigation menu');
    } finally {
      setLoading(false);
    }
  }

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
      let newItems: MenuItem[];
      if (editingItem) {
        // Update existing item
        newItems = (function updateItem(items: MenuItem[]): MenuItem[] {
          return items.map(item => {
            if (item.id === editingItem.id) {
              return { ...item, ...data };
            }
            if (item.children) {
              item.children = updateItem(item.children);
            }
            return item;
          });
        })(menuItems);
      } else {
        // Add new item
        const newItem: MenuItem = {
          id: Date.now().toString(),
          ...data,
        };
        newItems = [...menuItems, newItem];
      }
      setMenuItems(newItems);
      await saveMenuToBackend(newItems);
      setShowAddModal(false);
      setShowEditModal(false);
      setEditingItem(null);
      toast.success(editingItem ? 'Menu item updated successfully' : 'Menu item added successfully');
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
                className='text-gray-400 hover:text-gray-text'
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
                <div className='w-4 h-4 text-gray-400'>
                  {/* Icon placeholder */}
                  <div className='w-4 h-4 bg-gray-200 rounded'></div>
                </div>
              )}
              <span className='font-medium text-primary'>{item.title}</span>
              {item.target === '_blank' && (
                <ExternalLink className='w-3 h-3 text-gray-400' />
              )}
            </div>

            <div className='flex items-center space-x-2 text-sm text-gray-500'>
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

  // Helper to find and move an item in a tree
  function moveItemInTree(tree: MenuItem[], source: { droppableId: string; index: number }, destination: { droppableId: string; index: number }): MenuItem[] {
    // Flatten tree to list with parent references
    function flatten(items: MenuItem[], parentId: string | null = null, path: string[] = []): any[] {
      return items.flatMap((item, idx) => [
        { ...item, parentId, path: [...path, String(idx)] },
        ...(item.children ? flatten(item.children, item.id, [...path, String(idx)]) : []),
      ]);
    }
    const flat = flatten(tree);
    const sourceItem = flat.find(i => i.id === source.droppableId);
    const destItem = flat.find(i => i.id === destination.droppableId);
    // Remove from source
    function remove(items: MenuItem[], id: string): [MenuItem | null, MenuItem[]] {
      let removed: MenuItem | null = null;
      const filtered = items.filter(item => {
        if (item.id === id) {
          removed = item;
          return false;
        }
        if (item.children) {
          const [childRemoved, newChildren] = remove(item.children, id);
          if (childRemoved) removed = childRemoved;
          item.children = newChildren;
        }
        return true;
      });
      return [removed, filtered];
    }
    const [removed, withoutSource] = remove(tree, source.droppableId);
    if (!removed) return tree;
    // Insert into destination
    function insert(items: MenuItem[], id: string | null, index: number, item: MenuItem): MenuItem[] {
      if (id === null) {
        const arr = [...items];
        arr.splice(index, 0, item);
        return arr;
      }
      return items.map(i => {
        if (i.id === id) {
          const arr = i.children ? [...i.children] : [];
          arr.splice(index, 0, item);
          return { ...i, children: arr };
        }
        if (i.children) {
          return { ...i, children: insert(i.children, id, index, item) };
        }
        return i;
      });
    }
    return insert(withoutSource, destination.droppableId === 'menu' ? null : destination.droppableId, destination.index, removed);
  }

  // Recursive render for nested droppables
  function renderMenuTree(items: MenuItem[], parentDroppableId: string = 'menu', level = 0) {
    return (
      <Droppable droppableId={parentDroppableId} type='MENU'>
        {(provided: any) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={`space-y-2 ml-${level * 4}`}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(providedDraggable: any) => (
                  <div ref={providedDraggable.innerRef} {...providedDraggable.draggableProps} {...providedDraggable.dragHandleProps}>
                    {renderMenuItem(item, level)}
                    {item.children && item.children.length > 0 && renderMenuTree(item.children, item.id, level + 1)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  // Drag-and-drop handler
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newTree = moveItemInTree(menuItems, result.source, result.destination);
    setMenuItems(newTree);
    saveMenuToBackend(newTree);
  };

  // Create menu handler
  async function handleCreateMenu(data: { name: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, items_json: '[]' }),
      });
      if (!res.ok) throw new Error('Failed to create menu');
      const newMenu = await res.json();
      setMenus(prev => [...prev, { id: newMenu.id, name: newMenu.name }]);
      setSelectedMenuId(newMenu.id);
      setMenuItems([]);
      setMenuId(newMenu.id);
      setShowCreateMenuModal(false);
      createMenuForm.reset();
      toast.success('Menu created');
    } catch (err) {
      setError('Failed to create menu');
      toast.error('Failed to create menu');
    } finally {
      setLoading(false);
    }
  }

  // Delete menu handler
  async function handleDeleteMenu() {
    if (!selectedMenuId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/navigation/${selectedMenuId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete menu');
      setMenus(prev => prev.filter(m => m.id !== selectedMenuId));
      // Select another menu or clear selection
      if (menus.length > 1) {
        const nextMenu = menus.find(m => m.id !== selectedMenuId);
        setSelectedMenuId(nextMenu ? nextMenu.id : null);
      } else {
        setSelectedMenuId(null);
        setMenuItems([]);
        setMenuId(null);
      }
      setShowDeleteMenuModal(false);
      toast.success('Menu deleted');
    } catch (err) {
      setError('Failed to delete menu');
      toast.error('Failed to delete menu');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-semibold text-primary'>
              Navigation Manager
            </h2>
            <p className='text-sm text-gray-text mt-1'>
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
            const Icon = Menu; // Assuming Menu icon is always used for tabs
            return (
              <button
                key={menu.id}
                onClick={() => setSelectedMenuId(menu.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedMenuId === menu.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className='w-4 h-4' />
                <span>{menu.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className='p-6'>
        {/* Menu selector */}
        <div className='flex justify-between items-center mb-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Select Menu</label>
            <select
              value={selectedMenuId || ''}
              onChange={e => setSelectedMenuId(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {menus.map(menu => (
                <option key={menu.id} value={menu.id}>{menu.name}</option>
              ))}
            </select>
          </div>
          <div className='flex gap-2'>
            <Button onClick={() => setShowCreateMenuModal(true)} variant='secondary'>New Menu</Button>
            {selectedMenuId && <Button onClick={() => setShowDeleteMenuModal(true)} variant='secondary' className='text-red-600'>Delete Menu</Button>}
          </div>
        </div>

        {/* Menu Items List */}
        <DragDropContext
          onDragEnd={result => {
            if (!result.destination) return;
            if (result.source.droppableId === result.destination.droppableId && result.source.index === result.destination.index) return;
            const newTree = moveItemInTree(menuItems, result.source, result.destination);
            setMenuItems(newTree);
            saveMenuToBackend(newTree);
          }}
        >
          {renderMenuTree(menuItems)}
        </DragDropContext>
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
                <label className='ml-2 text-sm text-gray-700'>
                  Active - Enable this menu item
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  {...form.register('isVisible')}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label className='ml-2 text-sm text-gray-700'>
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
                <label className='ml-2 text-sm text-gray-700'>
                  Active - Enable this menu item
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  {...form.register('isVisible')}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label className='ml-2 text-sm text-gray-700'>
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

      {/* Create Menu Modal */}
      <Modal isOpen={showCreateMenuModal} onClose={() => setShowCreateMenuModal(false)} title='Create New Menu'>
        <FormProvider {...createMenuForm}>
          <form onSubmit={createMenuForm.handleSubmit(handleCreateMenu)} className='space-y-4'>
            <FormField name='name' label='Menu Name' placeholder='e.g. Footer Navigation' />
            <div className='flex justify-end gap-2'>
              <Button type='button' variant='secondary' onClick={() => setShowCreateMenuModal(false)}>Cancel</Button>
              <Button type='submit'>Create</Button>
            </div>
          </form>
        </FormProvider>
      </Modal>

      {/* Delete Menu Modal */}
      <Modal isOpen={showDeleteMenuModal} onClose={() => setShowDeleteMenuModal(false)} title='Delete Menu?'>
        <div className='mb-4'>Are you sure you want to delete this menu? This cannot be undone.</div>
        <div className='flex justify-end gap-2'>
          <Button type='button' variant='secondary' onClick={() => setShowDeleteMenuModal(false)}>Cancel</Button>
          <Button type='button' variant='secondary' onClick={handleDeleteMenu}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
