"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  capacity: string;
  status: 'planned' | 'construction' | 'operational';
  description: string;
  progress?: number;
}

const projects: Project[] = [
  {
    id: 'zakho',
    name: 'Zakho 100MW',
    location: 'Zakho, Duhok Governorate',
    coordinates: [37.1431, 42.6819],
    capacity: '100 MW',
    status: 'planned',
    description: 'Major KPP power plant planned for northern Iraq, providing clean energy to the Kurdistan region.',
    progress: 0
  },
  {
    id: 'soran',
    name: 'Soran 100MW',
    location: 'Soran, Erbil Governorate',
    coordinates: [36.6534, 44.5444],
    capacity: '100 MW',
    status: 'planned',
    description: 'Strategic KPP installation serving the Soran district with continuous renewable power.',
    progress: 0
  },
  {
    id: 'raparin',
    name: 'Raparin 50MW',
    location: 'Raparin, Sulaymaniyah Governorate',
    coordinates: [35.5611, 45.4408],
    capacity: '50 MW',
    status: 'construction',
    description: 'KPP power plant under construction, bringing clean energy to the Raparin region.',
    progress: 35
  },
  {
    id: 'garmian',
    name: 'Garmian 50MW',
    location: 'Garmian, Sulaymaniyah Governorate',
    coordinates: [34.7500, 45.5000],
    capacity: '50 MW',
    status: 'planned',
    description: 'Planned KPP facility to serve the Garmian region with sustainable power generation.',
    progress: 0
  }
];

const statusColors = {
  planned: 'bg-yellow-500',
  construction: 'bg-orange-500',
  operational: 'bg-green-500'
};

const statusLabels = {
  planned: 'Planned',
  construction: 'Under Construction',
  operational: 'Operational'
};

export default function ProjectMap() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Simplified map coordinates for Iraq (approximate bounding box)
  const mapViewBox = "0 0 400 300";
  
  // Iraq outline coordinates (simplified)
  const iraqOutline = "M 50 50 L 350 50 L 350 250 L 50 250 Z";

  // Convert lat/lng to map coordinates (simplified projection)
  const projectToMapCoords = (lat: number, lng: number): [number, number] => {
    // Simple linear mapping for demo
    const x = 50 + (lng - 42) * 100;
    const y = 250 - (lat - 35) * 100;
    return [Math.max(50, Math.min(350, x)), Math.max(50, Math.min(250, y))];
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 shadow-lg">
        <svg
          viewBox={mapViewBox}
          className="w-full h-auto"
          style={{ minHeight: '400px' }}
        >
          {/* Iraq outline */}
          <path
            d={iraqOutline}
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="2"
            className="transition-colors duration-200"
          />
          
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid)" />
          
          {/* Project markers */}
          {projects.map((project) => {
            const [x, y] = projectToMapCoords(...project.coordinates);
            const isHovered = hoveredProject === project.id;
            const isSelected = selectedProject?.id === project.id;
            
            return (
              <g key={project.id}>
                {/* Connection lines to show project relationships */}
                {isSelected && (
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    x1="200"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                )}
                
                {/* Project marker */}
                <motion.g
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Marker background */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 12 : 8}
                    fill={statusColors[project.status]}
                    stroke="#fff"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                  
                  {/* Status indicator */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 6 : 4}
                    fill="#fff"
                    className="transition-all duration-200"
                  />
                  
                  {/* Project label */}
                  <text
                    x={x}
                    y={y + 25}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-700"
                    style={{ fontSize: '10px' }}
                  >
                    {project.name}
                  </text>
                  
                  {/* Capacity label */}
                  <text
                    x={x}
                    y={y + 35}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                    style={{ fontSize: '8px' }}
                  >
                    {project.capacity}
                  </text>
                </motion.g>
              </g>
            );
          })}
          
          {/* Map title */}
          <text x="200" y="20" textAnchor="middle" className="text-lg font-bold fill-gray-800">
            KPP Projects in Iraq
          </text>
        </svg>

        {/* Project information panel */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-6 max-w-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-primary">{selectedProject.name}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-600 hover:text-gray-700 transition-colors"
                  aria-label="Close project details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Location:</span>
                  <p className="text-sm text-gray-800">{selectedProject.location}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Capacity:</span>
                  <p className="text-sm text-gray-800">{selectedProject.capacity}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[selectedProject.status]}`}></div>
                    <span className="text-sm text-gray-800">{statusLabels[selectedProject.status]}</span>
                  </div>
                </div>
                
                {selectedProject.progress !== undefined && selectedProject.progress > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Progress:</span>
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedProject.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-primary h-2 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-gray-600">{selectedProject.progress}%</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Description:</span>
                  <p className="text-sm text-gray-800 mt-1">{selectedProject.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${statusColors[project.status]}`}></div>
              <div>
                <h4 className="font-semibold text-sm text-gray-800">{project.name}</h4>
                <p className="text-xs text-gray-600">{project.capacity}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-gray-600">Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <span className="text-sm text-gray-600">Under Construction</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Operational</span>
        </div>
      </div>
    </div>
  );
} 