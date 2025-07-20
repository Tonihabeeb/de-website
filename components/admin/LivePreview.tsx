'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, X, Maximize2, Minimize2, RotateCcw, Eye } from 'lucide-react';

interface LivePreviewProps {
  content: string;
  title?: string;
  metaDescription?: string;
  className?: string;
  onClose?: () => void;
}

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const LivePreview: React.FC<LivePreviewProps> = ({
  content,
  title = 'Page Preview',
  metaDescription = '',
  className = '',
  onClose
}) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const deviceConfigs = {
    mobile: {
      width: '375px',
      height: '667px',
      icon: Smartphone,
      label: 'Mobile'
    },
    tablet: {
      width: '768px',
      height: '1024px',
      icon: Tablet,
      label: 'Tablet'
    },
    desktop: {
      width: '100%',
      height: '100%',
      icon: Monitor,
      label: 'Desktop'
    }
  };

  const currentConfig = deviceConfigs[deviceType];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const resetPreview = () => {
    setDeviceType('desktop');
    setIsFullscreen(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center ${className}`}>
      <div className={`bg-white rounded-lg shadow-2xl flex flex-col ${
        isFullscreen ? 'w-full h-full m-0 rounded-none' : 'w-11/12 h-5/6 max-w-6xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            
            {/* Device Selector */}
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
              {Object.entries(deviceConfigs).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={type}
                    onClick={() => setDeviceType(type as DeviceType)}
                    className={`p-2 rounded-md transition-colors ${
                      deviceType === type
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    title={config.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={resetPreview}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Reset Preview"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={handleClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <div
              className={`bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden ${
                deviceType !== 'desktop' ? 'mx-auto' : 'w-full h-full'
              }`}
              style={{
                width: deviceType !== 'desktop' ? currentConfig.width : '100%',
                height: deviceType !== 'desktop' ? currentConfig.height : '100%',
                maxWidth: deviceType !== 'desktop' ? currentConfig.width : 'none',
                maxHeight: deviceType !== 'desktop' ? currentConfig.height : 'none',
              }}
            >
              {/* Device Frame */}
              {deviceType === 'mobile' && (
                <div className="relative">
                  {/* Phone frame */}
                  <div className="absolute inset-0 border-8 border-gray-800 rounded-3xl pointer-events-none z-10"></div>
                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full pointer-events-none z-10"></div>
                </div>
              )}

              {deviceType === 'tablet' && (
                <div className="relative">
                  {/* Tablet frame */}
                  <div className="absolute inset-0 border-4 border-gray-800 rounded-lg pointer-events-none z-10"></div>
                  {/* Home button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-gray-800 rounded-full pointer-events-none z-10"></div>
                </div>
              )}

              {/* Content Area */}
              <div className="relative h-full overflow-auto">
                {/* Browser-like header for desktop */}
                {deviceType === 'desktop' && (
                  <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
                      {title}
                    </div>
                  </div>
                )}

                {/* Page Content */}
                <div className="p-4">
                  {/* Meta information */}
                  {metaDescription && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Meta Description</h4>
                      <p className="text-sm text-blue-700">{metaDescription}</p>
                    </div>
                  )}

                  {/* Content Preview */}
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Device: {currentConfig.label}</span>
              <span>Size: {currentConfig.width} × {currentConfig.height}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;

// Sidebar Preview Component
export function SidebarPreview({ title, content, metaDescription }: LivePreviewProps) {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');

  const deviceSizes = {
    mobile: 'w-full max-w-xs',
    tablet: 'w-full max-w-sm',
    desktop: 'w-full'
  };

  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Preview Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Preview</h3>
          <div className="flex items-center space-x-1">
            {(['mobile', 'tablet', 'desktop'] as DeviceType[]).map((device) => (
              <button
                key={device}
                onClick={() => setDeviceType(device)}
                className={`p-1 rounded transition-colors ${
                  deviceType === device 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {getDeviceIcon(device)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`${deviceSizes[deviceType]} mx-auto`}>
        <div className="bg-white min-h-[400px] border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
            <div>
              <h1 className="text-sm font-bold text-gray-900 truncate">
                {title || 'Page Title'}
              </h1>
              {metaDescription && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {metaDescription}
                </p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-4">
            {content ? (
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: content.length > 500 
                    ? content.substring(0, 500) + '...' 
                    : content 
                }}
              />
            ) : (
              <div className="text-center py-8">
                <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No content yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 