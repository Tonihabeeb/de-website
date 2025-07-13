import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'technicalSpecs',
  title: 'Technical Specifications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Specification Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Generator', value: 'generator'},
          {title: 'Air Compressor', value: 'air-compressor'},
          {title: 'Water System', value: 'water-system'},
          {title: 'Physical Dimensions', value: 'physical-dimensions'},
          {title: 'Performance Metrics', value: 'performance-metrics'},
          {title: 'System Integration', value: 'system-integration'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specifications',
      title: 'Technical Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Specification Name',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
            {
              name: 'unit',
              title: 'Unit',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'image',
      title: 'Component Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'diagram',
      title: 'Technical Diagram',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}) 